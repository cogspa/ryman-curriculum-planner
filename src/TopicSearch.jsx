import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { buildSearchIndex, searchCurriculum } from './searchIndex.js';

export default function TopicSearch({ customCurriculum, onSelectWeek }) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const searchInputRef = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  const searchIndex = useMemo(() => {
    return buildSearchIndex(customCurriculum);
  }, [customCurriculum]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return searchCurriculum(query, searchIndex).slice(0, 12);
  }, [query, searchIndex]);

  // Global keyboard shortcut to focus search (⌘K or /)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen(true);
        searchInputRef.current?.focus();
      } else if (e.key === '/' && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
        e.preventDefault();
        setIsOpen(true);
        searchInputRef.current?.focus();
      } else if (e.key === 'Escape') {
        setIsOpen(false);
        searchInputRef.current?.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (item) => {
    setIsOpen(false);
    setQuery('');
    if (item.isAnchor && item.weekNum) {
      if (onSelectWeek) onSelectWeek(item.weekNum);
      const target = document.getElementById(`week-${item.weekNum}`);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        target.classList.remove('card-highlight-pulse');
        void target.offsetWidth;
        target.classList.add('card-highlight-pulse');
      }
    }
  };

  const POPULAR_TOPICS = [
    'Notan Light Lab',
    'Pixel Budget',
    'Brush Maker',
    'Symmetry Tool',
    'Panel Lab',
    'Brief Builder',
    'Threshold Notan',
    'Atmospheric Sky',
    'Storyboards',
    'Zoom Link',
    'Dropbox Upload'
  ];

  return (
    <div className="topic-search-container" ref={containerRef}>
      <div className={`topic-search-bar ${isOpen ? 'is-focused' : ''}`}>
        <span className="search-icon">🔍</span>
        <input
          ref={searchInputRef}
          type="text"
          className="topic-search-input"
          placeholder="Search topics, tools, lessons, or assignments... (e.g. 'notan', 'brush', 'pixel', 'camera')"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
            setSelectedIndex(-1);
          }}
          onFocus={() => setIsOpen(true)}
        />
        {query && (
          <button
            className="search-clear-btn"
            onClick={() => {
              setQuery('');
              searchInputRef.current?.focus();
            }}
            title="Clear search"
          >
            ×
          </button>
        )}
        <kbd className="search-shortcut" title="Press ⌘K or / to search">⌘K</kbd>
      </div>

      {isOpen && (
        <div className="topic-search-dropdown">
          {query.trim().length === 0 ? (
            <div className="search-quick-suggestions">
              <div className="search-section-header">
                <span>⚡ POPULAR TOPICS & QUICK JUMPS</span>
              </div>
              <div className="search-tags-row">
                {POPULAR_TOPICS.map((tag) => (
                  <button
                    key={tag}
                    className="search-tag-pill"
                    onClick={() => {
                      setQuery(tag);
                      searchInputRef.current?.focus();
                    }}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="search-no-results">
              <span style={{ fontSize: '24px' }}>🔍</span>
              <p style={{ margin: '8px 0 4px', fontWeight: '600', color: 'var(--ink)' }}>No matching topics found</p>
              <p style={{ margin: 0, fontSize: '13px', color: 'var(--ink-mid)' }}>
                Try searching for general keywords like <em>brush</em>, <em>value</em>, <em>notan</em>, <em>symmetry</em>, or <em>brief</em>.
              </p>
            </div>
          ) : (
            <div className="search-results-list">
              <div className="search-section-header">
                <span>FOUND {results.length} TOPIC{results.length === 1 ? '' : 'S'}</span>
              </div>
              {results.map((item, idx) => {
                const isSelected = selectedIndex === idx;

                const itemContent = (
                  <div className={`search-result-card ${isSelected ? 'is-selected' : ''}`}>
                    <div className="search-result-head">
                      <span className="search-category-badge">{item.category}</span>
                      {item.week && (
                        <span className="search-week-badge">
                          {item.week === 13 ? 'CAPSTONE' : item.week === 'All' ? 'ALL WEEKS' : `WEEK ${item.week}`}
                        </span>
                      )}
                      {item.isExternal && <span className="search-external-badge">EXTERNAL ↗</span>}
                    </div>
                    <h4 className="search-result-title">{item.title}</h4>
                    {item.description && (
                      <p className="search-result-desc">{item.description}</p>
                    )}
                  </div>
                );

                if (item.isExternal) {
                  return (
                    <a
                      key={item.id || idx}
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="search-result-link"
                      onClick={() => handleResultClick(item)}
                    >
                      {itemContent}
                    </a>
                  );
                }

                if (item.isAnchor) {
                  return (
                    <a
                      key={item.id || idx}
                      href={item.url}
                      className="search-result-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleResultClick(item);
                      }}
                    >
                      {itemContent}
                    </a>
                  );
                }

                return (
                  <Link
                    key={item.id || idx}
                    to={item.url}
                    className="search-result-link"
                    onClick={() => handleResultClick(item)}
                  >
                    {itemContent}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
