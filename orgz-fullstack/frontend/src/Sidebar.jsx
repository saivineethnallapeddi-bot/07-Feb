export default function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        <div className="logo-icon">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="white" opacity="0.2" />
            <path d="M8 12h16v2H8v-2zm0 4h16v2H8v-2zm0 4h10v2H8v-2z" fill="white" />
          </svg>
        </div>
        <h2>Z.ORG</h2>
      </div>

      <nav className="nav-menu horizontal-nav">
        {/* Dashboard */}
        <div
          className={`nav-item ${currentPage === "dashboard" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("dashboard")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          Dashboard
        </div>

        {/* Company */}
        <div
          className={`nav-item ${currentPage === "company" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("company")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a1 1 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01-.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
          </svg>
          Company
        </div>

        {/* Employees */}
        <div
          className={`nav-item ${currentPage === "employees" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("employees")}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
          </svg>
          Employees
        </div>

        {/* My Team */}
        <div
          className={`nav-item ${currentPage === "team" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("team")}
        >
          <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor">
            <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14.835 15.256a4.375 4.375 0 017.33 0A4.373 4.373 0 0118 17.5V18h-7.5v-.5a4.374 4.374 0 014.335-2.744zM5 6a3 3 0 11-6 0 3 3 0 016 0zM2 8a2 2 0 11-4 0 2 2 0 014 0zM.165 15.256a4.375 4.375 0 017.33 0A4.373 4.373 0 012 17.5V18H2v-.5a4.374 4.374 0 014.335-2.744z" />
          </svg>
          My Team
        </div>

        {/* Org Chart */}
        <div
          className={`nav-item ${currentPage === "orgchart" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("orgchart")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM3 8v6h12V8H3zm2-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1H6a1 1 0 01-1-1V6a1 1 0 011-1zm7 1a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 01-1 1h-2a1 1 0 01-1-1V7z" />
          </svg>
          Org Chart
        </div>

        {/* Time Sheet */}
        <div
          className={`nav-item ${currentPage === "timesheet" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("timesheet")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
          </svg>
          Time Sheet
        </div>

        {/* Performance */}
        <div
          className={`nav-item ${currentPage === "performance" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("performance")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
          </svg>
          Performance
        </div>

        {/* Payroll */}
        <div
          className={`nav-item ${currentPage === "payroll" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("payroll")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" />
          </svg>
          Payroll
        </div>

        {/* Recruiting */}
        <div
          className={`nav-item ${currentPage === "recruiting" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("recruiting")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path d="M4 5a2 2 0 012-2 1 1 0 000 2H6a2 2 0 100 4h2a2 2 0 100 4h2a1 1 0 100 2 2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
          </svg>
          Recruiting
        </div>

        {/* Settings */}
        <div
          className={`nav-item ${currentPage === "settings" ? "active" : ""}`}
          onClick={() => onNavigate && onNavigate("settings")}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path d="M4 5a2 2 0 012-2 1 1 0 000 2H4v10h12V5h-2a1 1 0 100-2 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
            <path d="M7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" />
          </svg>
          Settings
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="user-profile">
          <img
            src="https://ui-avatars.com/api/?name=Z.ORG+Admin&background=4f46e5&color=fff&size=32"
            alt="User"
            className="user-avatar"
          />
          <div className="user-info">
            <div className="user-name">Z.ORG Admin</div>
            <div className="user-role">Org Viewer</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

