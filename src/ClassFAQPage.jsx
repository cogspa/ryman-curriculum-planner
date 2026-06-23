import React from 'react';
import { Link } from 'react-router-dom';
import LegalDisclaimer from './LegalDisclaimer.jsx';

export default function ClassFAQPage() {
  return (
    <div className="app">
      <div className="container">
        <div className="assignment-page">
          <Link to="/" className="back-link">← Back to Curriculum</Link>

          <div className="assignment-header" style={{ marginBottom: '40px' }}>
            <img 
              src="https://images.squarespace-cdn.com/content/v1/67806c279fb734295979b37e/9e044490-3bd2-4589-a460-cbabd7c93b35/Ryman_Arts_Logo_No_Tagline.png" 
              alt="Ryman Arts Logo" 
              style={{ height: '48px', marginBottom: '16px', display: 'block' }} 
            />
            <p className="assignment-eyebrow" style={{ color: '#059669', letterSpacing: '0.15em' }}>REVEAL STUDIOS · GLENDALE</p>
            <h1 className="assignment-title" style={{ fontSize: '32px', margin: '10px 0' }}>Class FAQ & Studio Guide</h1>
            <p className="assignment-subtitle" style={{ fontSize: '16px', opacity: 0.85 }}>
              Your complete companion guide to Saturday in-person sessions at Reveal!
            </p>
          </div>

          {/* Section: Time & Scheduling */}
          <section className="assignment-phase" style={{ position: 'relative' }}>
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>⏰</span> Time & Attendance
            </h2>
            <p className="phase-intro">
              Classes run strictly from <strong>10:00 am – 3:30 pm</strong>.
            </p>
            <ul className="phase-list phase-list--accent">
              <li>Please arrive by <strong>9:50 am</strong> so that setup is finished and class can start on time at 10:00.</li>
              <li>A <strong>30-minute lunch break</strong> will be provided, along with several shorter break windows throughout the day.</li>
            </ul>
          </section>

          {/* Section: Location & Coordinates */}
          <section className="assignment-phase">
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>📍</span> Address & Logistics
            </h2>
            <div style={{ background: 'rgba(255,255,255,0.4)', padding: '20px', borderRadius: '8px', border: '1px solid rgba(0,0,0,0.06)', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 10px 0', fontSize: '15px', fontWeight: '600' }}>Reveal Studios Glendale</p>
              <p style={{ margin: '0 0 15px 0', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>1426 Flower Street, Glendale CA 91201</p>
              <a 
                href="https://maps.google.com/?q=1426+Flower+Street,+Glendale+CA+91201" 
                target="_blank" 
                rel="noopener noreferrer"
                className="assignment-arrow assignment-arrow--pill"
                style={{ display: 'inline-block', textDecoration: 'none' }}
              >
                🗺️ VIEW ON GOOGLE MAPS →
              </a>
            </div>
            <p className="phase-sub">🚘 Parking:</p>
            <ul className="phase-list">
              <li>There is plenty of <strong>free street parking</strong> directly in the local area surrounding the studio.</li>
            </ul>
          </section>

          {/* Section: Entrance & Identification */}
          <section className="assignment-phase">
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🚪</span> Studio Entrance
            </h2>
            <p className="phase-intro">
              To enter the building, please <strong>ring the doorbell</strong>.
            </p>
            <p className="phase-note" style={{ margin: '15px 0' }}>
              ⚠️ <strong>Note:</strong> There is no standard brand sign on the outside of the door. Instead, look for a modern, clean glass front featuring a minimalist <strong>word bubble</strong> decal.
            </p>
            
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <p style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.1em', opacity: 0.6, margin: 0, fontWeight: 'bold' }}>Visual Reference: Studio Entrance Front</p>
              <div style={{ overflow: 'hidden', borderRadius: '10px', boxShadow: '0 8px 30px rgba(0,0,0,0.12)', border: '1px solid rgba(0,0,0,0.08)', background: '#fff' }}>
                <img 
                  src="/reveal_studio_entrance.png" 
                  alt="Reveal Studio Entrance with Word Bubble Decal"
                  style={{ width: '100%', height: 'auto', display: 'block', maxHeight: '500px', objectFit: 'cover' }}
                />
              </div>
            </div>
          </section>

          {/* Section: Workstations & Software */}
          <section className="assignment-phase">
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>💻</span> Computer Workstations & Tech
            </h2>
            <p className="phase-intro">
              You will be assigned a designated high-spec computer station equipped with a powerful PC and a professional <strong>dual-monitor configuration</strong>.
            </p>
            <ul className="phase-list phase-list--accent">
              <li>
                <strong>Bringing a personal device?</strong> Use the following local high-speed Wi-Fi details:
                <div style={{ marginTop: '10px', padding: '12px', background: 'rgba(0,0,0,0.03)', borderRadius: '6px', fontFamily: 'var(--font-mono)', fontSize: '13px' }}>
                  <strong>Network:</strong> Blueist <br />
                  <strong>Password:</strong> 619_train
                </div>
              </li>
              <li>
                <strong>Adobe Creative Cloud Login:</strong> Make absolutely sure you have your active Adobe Creative Cloud credentials with you to unlock Photoshop, InDesign, and other CC library workflows.
              </li>
            </ul>
          </section>

          {/* Section: Kitchenette & Food Guidelines */}
          <section className="assignment-phase">
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span>🥗</span> Food, Dining & Kitchenette Rules
            </h2>
            <p className="phase-intro">
              Since local restaurants and grocery stores are not within immediate walking distance and the lunch window is brief, it is <strong>highly recommended to bring your own pre-packed snacks, beverages, and lunch.</strong>
            </p>

            <p className="phase-sub">🍳 Cooking & Refrigeration Facilities:</p>
            <ul className="phase-list">
              <li>A fully equipped kitchenette is available for storage and prep, featuring a <strong>refrigerator, microwave, toaster, toaster oven, and filtered water dispenser</strong> (providing both hot and cold options).</li>
              <li><strong>Courtesy Notice:</strong> Do not consume any drinks stored in the kitchenette, and do not use the K-cups. Those belong strictly to the Reveal staff, not to the program. You are welcome to bring your own K-cups to use in their machine or store your own drinks in the fridge!</li>
              <li><strong>Priscilla-Clean Policy:</strong> Wipe up after yourself in the kitchenette immediately. If you use any shared plates, cups, or utensils, wash them right away. At the end of every Saturday session, the space must look completely pristine, as if we were never there.</li>
            </ul>

            <p className="phase-sub">⚠️ Strict Classroom Restraints:</p>
            <div className="phase-note" style={{ borderLeftColor: '#ef4444', background: 'rgba(239, 68, 68, 0.04)', color: '#b91c1c' }}>
              <strong>Absolutely no eating or drinking is permitted inside the main classroom.</strong> You may not keep beverages adjacent to computer workstations, and snacking while working is prohibited. All food and drinks must be consumed in the kitchenette, the lounge, or outside the building (e.g. at the close-by public park).
            </div>
          </section>

          {/* Section: Good Advice */}
          <section className="assignment-phase" style={{ borderLeftColor: '#059669', background: 'rgba(5, 150, 105, 0.03)' }}>
            <h2 className="phase-title" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669' }}>
              <span>💡</span> Expert Advice & Courtesy
            </h2>
            <ul className="phase-list phase-list--accent">
              <li>🧥 <strong>Bring a sweater:</strong> The studio air conditioning keeps the classroom cold, so dress in warm layers.</li>
              <li>🤝 <strong>Exchange contact details:</strong> Make a point to gather contact details of a few fellow classmates on Day 1 to collaborate or catch up on shared projects.</li>
              <li>🥨 <strong>Bring extra snacks:</strong> Digital learning is hungry work, and sharing delicious treats is the absolute best way to build community and make friends!</li>
              <li>🌟 <strong>Space courtesy:</strong> We are privileged guests at Reveal. They graciously host Ryman Arts because they believe fully in your potential as future creative pioneers! Let's show our deep gratitude by keeping their space super clean, respectful, and organized.</li>
            </ul>
          </section>

          <div className="assignment-footer">
            <Link to="/" className="back-link">← Back to Curriculum</Link>
          </div>
          <LegalDisclaimer style={{ borderTop: 'none', paddingTop: 0 }} />
        </div>
      </div>
    </div>
  );
}
