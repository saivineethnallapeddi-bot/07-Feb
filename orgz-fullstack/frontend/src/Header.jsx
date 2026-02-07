import { useState, useEffect } from "react";

export default function Header({ onExport, onExportPDF, onOpenFilters, appliedFiltersCount = 0, isDark, onToggleTheme, searchValue, onSearchChange, onQuickLinkSelect, isAdmin, isLoggedIn, currentUser, onLogin, onSignup, onLogout }) {
  const [quickLinksOpen, setQuickLinksOpen] = useState(false);
  const [showExportPDF, setShowExportPDF] = useState(false);

  // Show Export PDF after search
  useEffect(() => {
    if (searchValue && searchValue.trim().length > 0) {
      setShowExportPDF(true);
    } else {
      setShowExportPDF(false);
    }
  }, [searchValue]);

  // Close quick links when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (quickLinksOpen && !event.target.closest('.quick-links')) {
        setQuickLinksOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [quickLinksOpen]);

  return (
    <header className="header">
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Search people / teams…" 
          className="search-input"
          value={searchValue || ''}
          onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
        />
      </div>
      <div className="header-actions">
        <button className="filter-dropdown" onClick={onOpenFilters}>
          Filters {appliedFiltersCount > 0 ? <span className="badge">{appliedFiltersCount}</span> : null}
        </button>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button className="export-btn" onClick={onExportPDF}>Export</button>
          {showExportPDF && (
            <button 
              className="export-pdf-btn" 
              onClick={onExportPDF}
              style={{
                background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '10px 20px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
                transition: 'all 0.3s ease',
                animation: 'slideIn 0.4s ease-out, pulse 2s ease-in-out infinite',
                position: 'relative'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 6px 20px rgba(220, 38, 38, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 12px rgba(220, 38, 38, 0.3)';
              }}
            >
              📄 Export PDF
            </button>
          )}
        </div>
        
        <button className="quick-links-btn" onClick={onToggleTheme} aria-label="Toggle theme">
          {isDark ? <i className="bi bi-sun"></i> : <i className="bi bi-moon"></i>} Theme
        </button>
        
        {/* User Authentication Section */}
        {isLoggedIn && currentUser ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ 
              padding: '16px 28px', 
              background: isAdmin ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)' : 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '30px',
              color: '#fff',
              fontSize: '16px',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              boxShadow: '0 8px 32px rgba(79, 70, 229, 0.4)',
              border: '3px solid rgba(255, 255, 255, 0.3)',
              position: 'relative',
              overflow: 'hidden',
              minWidth: '200px',
              justifyContent: 'center'
            }}>
              {/* Animated background effect */}
              <div style={{
                position: 'absolute',
                top: '-50%',
                right: '-50%',
                width: '200%',
                height: '200%',
                background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
                animation: 'pulse 3s ease-in-out infinite'
              }}></div>
              
              {/* User icon with animation */}
              <span style={{ 
                fontSize: '20px',
                animation: 'bounce 2s ease-in-out infinite',
                position: 'relative',
                zIndex: 1
              }}>👤</span>
              
              {/* Username */}
              <span style={{ 
                position: 'relative',
                zIndex: 1,
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
              }}>{currentUser.name}</span>
              
              {/* Admin badge with enhanced styling */}
              {isAdmin && (
                <span style={{ 
                  background: 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)',
                  color: '#000000',
                  padding: '6px 14px',
                  borderRadius: '16px',
                  fontSize: '11px',
                  fontWeight: '900',
                  boxShadow: '0 4px 12px rgba(251, 191, 36, 0.4)',
                  border: '2px solid rgba(255, 255, 255, 0.4)',
                  position: 'relative',
                  zIndex: 1,
                  animation: 'glow 2s ease-in-out infinite',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>⭐ ADMIN</span>
              )}
            </div>
            <button 
              onClick={onLogout} 
              style={{
                background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                color: '#ffffff',
                border: 'none',
                padding: '12px 20px',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(239, 68, 68, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(239, 68, 68, 0.4)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(239, 68, 68, 0.3)';
              }}
            >
              🚪 Logout
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <button 
              onClick={() => onLogin && onLogin()}
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                color: '#ffffff',
                border: '2px solid rgba(79, 70, 229, 0.3)',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(79, 70, 229, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(79, 70, 229, 0.4)';
                e.target.style.background = 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(79, 70, 229, 0.3)';
                e.target.style.background = 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)';
              }}
            >
              🔐 Login
            </button>
            <button 
              onClick={() => onSignup && onSignup()}
              style={{
                background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                color: '#ffffff',
                border: '2px solid rgba(16, 185, 129, 0.3)',
                padding: '12px 24px',
                fontSize: '15px',
                fontWeight: '700',
                borderRadius: '12px',
                cursor: 'pointer',
                boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-2px) scale(1.05)';
                e.target.style.boxShadow = '0 8px 24px rgba(16, 185, 129, 0.4)';
                e.target.style.background = 'linear-gradient(135deg, #059669 0%, #047857 100%)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0) scale(1)';
                e.target.style.boxShadow = '0 4px 16px rgba(16, 185, 129, 0.3)';
                e.target.style.background = 'linear-gradient(135deg, #10b981 0%, #059669 100%)';
              }}
            >
              🚀 Sign Up
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
