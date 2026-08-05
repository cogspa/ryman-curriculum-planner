import Storyboards from '../storyboards-deck/src/Storyboards.jsx';
import { Link } from 'react-router-dom';

export default function StoryboardsDeckPage() {
  return (
    <div style={{ background: '#f5efe1', minHeight: '100vh', paddingBottom: 40 }}>
      <div style={{ maxWidth: 1040, margin: '0 auto', padding: '20px 22px 0 22px' }}>
        <Link to="/week/05/storyboarding-fundamentals" style={{ color: '#8b3a2f', fontWeight: 'bold', textDecoration: 'none', fontFamily: 'monospace', fontSize: 13 }}>
          ← BACK TO STORYBOARDING FUNDAMENTALS
        </Link>
      </div>
      <Storyboards />
    </div>
  );
}
