import React from 'react';
import { Link } from 'react-router-dom';
import LegalDisclaimer from '../LegalDisclaimer.jsx';

export default function Week01Shortcuts() {
  const shortcutGroups = [
    {
      title: 'Brushes',
      items: [
        { key: 'B', action: 'Brush tool' },
        { key: '] / [', action: 'Bigger / smaller brush' },
        { key: 'Shift + ] / Shift + [', action: 'Harder / softer edge' },
        { key: 'F5', action: 'Brush settings' }
      ]
    },
    {
      title: 'Color & Fill',
      items: [
        { key: 'D', action: 'Default colors (black/white)' },
        { key: 'X', action: 'Swap foreground/background' },
        { key: 'Option + Delete (Alt + Backspace)', action: 'Fill with foreground', highlight: true }
      ]
    },
    {
      title: 'Layers & Transform',
      items: [
        { key: 'Shift + Cmd + Option + N (Shift + Ctrl + Alt + N)', action: 'New layer, no dialog' },
        { key: 'Cmd + G (Ctrl + G)', action: 'Group layers' },
        { key: 'Cmd + T (Ctrl + T)', action: 'Free transform' },
        { key: 'Cmd + M (Ctrl + M)', action: 'Curves (use for value/tone instead of grayscale)' }
      ]
    },
    {
      title: 'Selections',
      items: [
        { key: 'L', action: 'Lasso' },
        { key: 'Shift + L', action: 'Cycle lasso types' },
        { key: 'Hold Shift', action: 'Add to selection' },
        { key: 'Hold Option (Alt)', action: 'Subtract from selection' },
        { key: 'Delete', action: 'Undo last segment while drawing lasso' },
        { key: 'Hold Option', action: 'Freehand lasso while drawing' },
        { key: 'Q', action: 'Quick mask mode' }
      ]
    },
    {
      title: 'Pen & Lines',
      items: [
        { key: 'P', action: 'Pen tool' },
        { key: 'Shift + click (with brush)', action: 'Straight line between points' }
      ]
    },
    {
      title: 'Duplicating',
      items: [
        { key: 'Move tool + Option + drag', action: 'Duplicate while dragging (chain with Cmd + T to lay out repeated elements)' }
      ]
    },
    {
      title: 'Navigation',
      subtitle: 'keep your left hand here',
      items: [
        { key: 'Hold Spacebar', action: 'Pan (never reach for H)' },
        { key: 'Spacebar + Cmd', action: 'Zoom in' },
        { key: 'Spacebar + Cmd + Option', action: 'Zoom out' }
      ]
    }
  ];

  return (
    <div style={containerStyle}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <Link to="/week/01" style={backLinkStyle}>
          ← Back to Week 1 Overview
        </Link>
        <Link to="/" style={backLinkStyle}>
          📂 Home Page
        </Link>
      </div>

      <header style={headerStyle}>
        <div style={weekTagStyle}>WEEK 01</div>
        <div style={dateRangeStyle}>SHORTCUTS GUIDE</div>
      </header>

      <h1 style={titleStyle}>Photoshop Shortcuts Cheat Sheet</h1>
      
      <p style={introTextStyle}>
        Here are the keyboard shortcuts used in the first class. We use these all the time—they make the process of painting more efficient, allowing you to keep your "painter hand" on the tablet and use the other hand for shortcuts, instead of digging through the toolbar and menus which slows you down.
      </p>

      <div style={boxStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px' }}>
          <span style={{ fontSize: '20px' }}>🎨</span>
          <h2 style={boxTitleStyle}>Photoshop Shortcuts Cheat Sheet</h2>
        </div>
        <p style={boxSubtitleStyle}>(Mac keys — Windows in parentheses)</p>

        <div style={groupsContainerStyle}>
          {shortcutGroups.map((group, gIdx) => (
            <div key={gIdx} style={groupStyle}>
              <h3 style={groupTitleStyle}>
                {group.title} {group.subtitle && <span style={groupSubtitleStyle}>— {group.subtitle}</span>}
              </h3>
              <div style={listStyle}>
                {group.items.map((item, iIdx) => (
                  <div key={iIdx} style={itemStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <code style={keyStyle}>{item.key}</code>
                      {item.highlight && <span style={{ color: '#d97706', fontSize: '14px' }}>⭐ learn this one</span>}
                    </div>
                    <span style={actionStyle}>{item.action}</span>
                  </div>
                ))}
              </div>
              {group.title === 'Navigation' && (
                <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', background: '#f5efe1', padding: '12px', borderRadius: '8px', border: '1px solid #d4c9a8' }}>
                  <img 
                    src="/platform-navigation-keys.gif" 
                    alt="Navigation keys demo" 
                    style={{ maxWidth: '100%', height: 'auto', borderRadius: '4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }} 
                  />
                </div>
              )}
            </div>
          ))}
        </div>

        <div style={footerCardStyle}>
          <span style={{ fontSize: '18px' }}>💡</span>
          <div>
            <strong>The golden rule:</strong> Right hand stays on the brush, left hand drives the keyboard — never break flow to click a tool icon.
          </div>
        </div>
      </div>

      <LegalDisclaimer style={{ marginTop: '48px' }} />
    </div>
  );
}

// Styles
const containerStyle = {
  maxWidth: '800px',
  margin: '0 auto',
  padding: '48px 32px',
  background: '#f5efe1',
  color: '#2a2418',
  fontFamily: 'Georgia, "Times New Roman", serif',
  lineHeight: 1.6,
  minHeight: '100vh',
};

const backLinkStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  color: '#8b3a2f',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  display: 'inline-block',
};

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  marginBottom: '8px',
  borderBottom: '1px solid #d4c9a8',
  paddingBottom: '8px'
};

const weekTagStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.15em',
  color: '#8b3a2f',
  textTransform: 'uppercase',
};

const dateRangeStyle = {
  fontFamily: 'Menlo, monospace',
  fontSize: '11px',
  letterSpacing: '0.1em',
  color: '#8b3a2f',
};

const titleStyle = {
  fontSize: '32px',
  fontWeight: 400,
  fontStyle: 'italic',
  margin: '16px 0 8px',
  letterSpacing: '-0.01em',
};

const introTextStyle = {
  fontSize: '15px',
  color: '#5c4e37',
  marginBottom: '28px',
};

const boxStyle = {
  background: '#fff',
  border: '2px solid #8b3a2f',
  borderRadius: '12px',
  padding: '28px',
  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
};

const boxTitleStyle = {
  margin: 0,
  fontSize: '18px',
  fontWeight: 'bold',
  color: '#8b3a2f',
  fontFamily: 'Georgia, serif',
};

const boxSubtitleStyle = {
  margin: '0 0 24px 0',
  fontSize: '12px',
  fontFamily: 'Menlo, monospace',
  color: '#6e685e',
};

const groupsContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '24px',
};

const groupStyle = {
  borderBottom: '1px solid #f1eeeb',
  paddingBottom: '16px',
};

const groupTitleStyle = {
  margin: '0 0 12px 0',
  fontSize: '15px',
  fontFamily: 'Georgia, serif',
  fontWeight: 'bold',
  color: '#8b3a2f',
};

const groupSubtitleStyle = {
  fontFamily: 'Georgia, serif',
  fontSize: '13px',
  fontWeight: 'normal',
  fontStyle: 'italic',
  color: '#6e685e',
};

const listStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
};

const itemStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '12px',
};

const keyStyle = {
  fontFamily: 'Menlo, monospace',
  background: '#f5efe1',
  color: '#8b3a2f',
  padding: '3px 8px',
  borderRadius: '4px',
  fontSize: '12px',
  fontWeight: 'bold',
};

const actionStyle = {
  fontSize: '14px',
  color: '#2a2418',
};

const footerCardStyle = {
  marginTop: '28px',
  background: 'rgba(139, 58, 47, 0.05)',
  border: '1px dashed #8b3a2f',
  borderRadius: '8px',
  padding: '16px 20px',
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  fontSize: '13.5px',
  color: '#8b3a2f',
  fontFamily: 'Georgia, serif',
};
