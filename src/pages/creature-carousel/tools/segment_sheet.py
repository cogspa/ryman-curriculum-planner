#!/usr/bin/env python3
"""Cut a sheet of figures into transparent, height-normalized specimen PNGs.

    python3 tools/segment_sheet.py sheet.png src/assets/specimens [--height 300] [--bind 9]

--bind is the dilation radius used to bind each figure's loose parts (antennae, spatter)
into one connected component. Raise it if a single figure splits into several crops; lower it
if two neighbours merge. Figures that physically overlap will still merge — the script prints
any crop wider than 1.6x the median so you can spot them.
"""
import argparse, os
import numpy as np
from PIL import Image
from scipy import ndimage


def segment(sheet_path, out_dir, height=300, max_width=420, bind=9, min_px=200, ink_cut=240):
    src = Image.open(sheet_path).convert("RGBA")
    flat = Image.alpha_composite(Image.new("RGBA", src.size, (255, 255, 255, 255)), src).convert("RGB")
    arr = np.asarray(flat)
    lum = arr.astype(np.int16).mean(axis=2)
    ink = lum < ink_cut

    labels, _ = ndimage.label(ndimage.binary_dilation(ink, np.ones((bind * 2 + 1,) * 2, bool)))
    boxes = []
    for i, sl in enumerate(ndimage.find_objects(labels)):
        mask = (labels[sl] == i + 1) & ink[sl]
        if mask.sum() < min_px:
            continue
        boxes.append([sl[1].start, sl[0].start, sl[1].stop, sl[0].stop])
    boxes.sort(key=lambda b: (b[1] // 60, b[0]))  # reading order, row-banded

    # white -> transparent, ink kept as-is
    alpha = np.clip((255.0 - lum) * 1.25, 0, 255)
    alpha[lum >= ink_cut + 7] = 0
    full = Image.fromarray(np.dstack([arr, alpha.astype(np.uint8)]).astype(np.uint8), "RGBA")

    os.makedirs(out_dir, exist_ok=True)
    manifest = []
    for k, (x0, y0, x1, y1) in enumerate(boxes):
        crop = full.crop((x0, y0, x1, y1))
        bbox = crop.split()[3].point(lambda v: 255 if v > 8 else 0).getbbox()
        if bbox:
            crop = crop.crop(bbox)
        scale = min(height / crop.height, max_width / crop.width)
        crop = crop.resize((max(1, round(crop.width * scale)), max(1, round(crop.height * scale))), Image.LANCZOS)
        name = f"specimen-{k + 1:02d}.png"
        crop.save(os.path.join(out_dir, name), optimize=True)
        manifest.append({"file": name, "w": crop.width, "h": crop.height})

    widths = sorted(m["w"] for m in manifest)
    median = widths[len(widths) // 2]
    for m in manifest:
        if m["w"] > median * 1.6:
            print(f"  wide crop, check for a merged pair: {m['file']} ({m['w']}x{m['h']})")
    print(f"wrote {len(manifest)} specimens to {out_dir}")
    return manifest


if __name__ == "__main__":
    p = argparse.ArgumentParser()
    p.add_argument("sheet")
    p.add_argument("out")
    p.add_argument("--height", type=int, default=300)
    p.add_argument("--max-width", type=int, default=420)
    p.add_argument("--bind", type=int, default=9)
    args = p.parse_args()
    segment(args.sheet, args.out, args.height, args.max_width, args.bind)
