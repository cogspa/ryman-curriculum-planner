/*  PIGMENT INDEX HARVESTER v2
 *  Run in the DevTools console on any instagram.com page while logged in as @cogspa.
 *
 *  What's new vs v1:
 *  - FIXED caption parsing. v1's regex looked for `on Instagram: "..."` which never
 *    matched, so every caption kept the "807 likes, 26 comments - user on DATE:" prefix.
 *    v2 parses that prefix into structured fields instead of losing it.
 *  - Structured records: { url, caption, image, author, username, likes, date, tags }
 *  - Resume: progress checkpoints to localStorage every post. If the tab crashes at
 *    180/239, re-paste the script and it continues where it stopped.
 *  - Retry: 3 attempts with backoff per post before recording a failure.
 *  - Merge: drop your previous pigment-data.json onto `window.PIGMENT_PREV` (see below)
 *    and v2 keeps the old image/caption for any post that fails this run, so a bad
 *    run never makes the dataset worse.
 *
 *  Setup:
 *  1. Paste your URLS array from harvest.js v1 below (unchanged).
 *  2. (Optional, recommended) In the console first run:
 *       window.PIGMENT_PREV = <paste contents of your current pigment-data.json>
 *  3. Paste this whole file, hit Enter. ~5 min. Downloads pigment-data.json (v2 format).
 *
 *  To start over from scratch: localStorage.removeItem('pigment_harvest_ckpt')
 */
(async () => {
  const URLS = window.PIGMENT_URLS || [
    'https://www.instagram.com/p/DcYidIGqqmJ/',
    'https://www.instagram.com/p/DbLsmSnx4Hv/',
    'https://www.instagram.com/p/DcTlbysve2_/',
    'https://www.instagram.com/p/DcLs-T5zlkJ/',
    'https://www.instagram.com/p/DbdnhIoIAVr/',
    'https://www.instagram.com/p/DbJQf0Sss5B/'
  ];
  if (!URLS.length) { console.error('URLS is empty — paste the array from harvest.js v1.'); return; }

  const CKPT_KEY = 'pigment_harvest_ckpt';
  const prev = window.PIGMENT_PREV || {};
  const decode = s => { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; };
  const parseCount = s => {
    if (!s) return null;
    const n = parseFloat(s.replace(/,/g, ''));
    return /k$/i.test(s) ? Math.round(n * 1000) : Math.round(n);
  };

  // "807 likes, 26 comments - user on August 23, 2026: "caption text"."
  // Also handles: no likes ("user on DATE: ..."), no caption ("153 likes, 6 comments - user on DATE")
  const parsePrefix = raw => {
    const out = { likes: null, comments: null, username: null, date: null, caption: raw || '' };
    if (!raw) return out;
    const m = raw.trim().match(
      /^(?:([\d.,]+K?) likes(?:, ([\d.,]+K?) comments)? - )?([A-Za-z0-9._]+) on ([A-Za-z]+ \d{1,2}, \d{4})(?::\s*([\s\S]*))?$/
    );
    if (!m) return out;
    out.likes = parseCount(m[1]);
    out.comments = parseCount(m[2]);
    out.username = m[3];
    out.date = new Date(m[4] + ' 12:00:00').toISOString().slice(0, 10);
    let t = (m[5] || '').trim();
    t = t.replace(/^[“"]/, '').replace(/["”]\.?\s*$/, '').trim();
    out.caption = t;
    return out;
  };

  const tagsFrom = text => {
    const set = new Set((text.match(/#[\p{L}\p{N}_]+/gu) || []).map(t => t.slice(1).toLowerCase()));
    return [...set];
  };

  // resume from checkpoint if one exists
  let out = {}, start = 0;
  try {
    const ck = JSON.parse(localStorage.getItem(CKPT_KEY) || 'null');
    if (ck && ck.total === URLS.length) {
      out = ck.out; start = ck.index;
      console.log(`▶ Resuming from ${start}/${URLS.length}`);
    }
  } catch (e) { /* fresh start */ }

  const fetchPost = async url => {
    const res = await fetch(url, { credentials: 'include' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    const html = await res.text();
    const get = prop => {
      const m = html.match(new RegExp(`<meta property="og:${prop}" content="([^"]*)"`));
      return m ? decode(m[1]) : '';
    };
    const desc = get('description');
    if (!desc && !get('image')) throw new Error('no og tags (login wall?)');
    return { desc, image: get('image'), title: get('title') };
  };

  for (let i = start; i < URLS.length; i++) {
    const url = URLS[i];
    const code = url.split('/p/')[1].replace(/\//g, '');
    let rec = null;

    for (let attempt = 1; attempt <= 3 && !rec; attempt++) {
      try {
        const { desc, image, title } = await fetchPost(url);
        const p = parsePrefix(desc);
        rec = {
          url,
          caption: p.caption,
          image,
          author: title ? title.split(' on Instagram')[0] : '',
          username: p.username,
          likes: p.likes,
          comments: p.comments,
          date: p.date,
          tags: tagsFrom(p.caption),
        };
      } catch (err) {
        if (attempt === 3) {
          const old = prev[code] || {};
          rec = {
            url,
            caption: old.caption || '',
            image: old.image || '',
            author: old.author || '',
            username: old.username || null,
            likes: old.likes ?? null,
            comments: old.comments ?? null,
            date: old.date || null,
            tags: old.tags || [],
            _failed: true,
          };
          console.warn(`${i + 1}/${URLS.length} ✗ ${code} — kept previous data (${err.message})`);
        } else {
          await new Promise(r => setTimeout(r, 1500 * attempt));
        }
      }
    }

    out[code] = rec;
    if (!rec._failed) console.log(`${i + 1}/${URLS.length} ✓ ${code}  ${rec.caption.slice(0, 60)}`);
    localStorage.setItem(CKPT_KEY, JSON.stringify({ total: URLS.length, index: i + 1, out }));
    await new Promise(r => setTimeout(r, 900 + Math.random() * 400));
  }

  localStorage.removeItem(CKPT_KEY);
  const blob = new Blob([JSON.stringify(out, null, 1)], { type: 'application/json' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'pigment-data.json';
  a.click();
  const failed = Object.values(out).filter(r => r._failed).length;
  console.log(`✅ Done — pigment-data.json downloaded. ${failed ? failed + ' posts kept previous data.' : 'All posts fresh.'}`);
})();
