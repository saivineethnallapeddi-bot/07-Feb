export default function Dashboard({ onNavigate }) {
  return (
    <div>
      <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0 }}>📊 Dashboard</h2>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to go back?')) {
              // Dashboard is the main page, so we'll just show a message
              alert('You are already on the main Dashboard page!');
            }
          }}
          style={{
            background: 'linear-gradient(135deg, #6b7280 0%, #4b5563 100%)',
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
            boxShadow: '0 4px 12px rgba(107, 114, 128, 0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'translateY(-2px) scale(1.05)';
            e.target.style.boxShadow = '0 6px 20px rgba(107, 114, 128, 0.4)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'translateY(0) scale(1)';
            e.target.style.boxShadow = '0 4px 12px rgba(107, 114, 128, 0.3)';
          }}
        >
          ← Back
        </button>
      </div>

      <div className="card-grid">
        <div className="card" onClick={() => onNavigate && onNavigate('orgchart')}>
          <div className="card-title">Employees</div>
          <div className="card-value">28</div>
          <div className="card-action">View Org Chart →</div>
        </div>
        <div className="card" onClick={() => onNavigate && onNavigate('company')}>
          <div className="card-title">Departments</div>
          <div className="card-value">6</div>
          <div className="card-action">Open Company →</div>
        </div>
        <div className="card" onClick={() => onNavigate && onNavigate('recruiting')}>
          <div className="card-title">Open Positions</div>
          <div className="card-value">4</div>
          <div className="card-action">Go to Recruiting →</div>
        </div>
        <div className="card" onClick={() => onNavigate && onNavigate('reporting')}>
          <div className="card-title">Active Reports</div>
          <div className="card-value">5</div>
          <div className="card-action">View Reports →</div>
        </div>
      </div>

      <div style={{ marginTop: 24 }}>
        <h3 style={{ marginBottom: 12 }}>Recent Employees</h3>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Title</th>
              <th>Department</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Durga</td>
              <td>Developer</td>
              <td>CMS</td>
              <td><button className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate && onNavigate('orgchart')}>Open in Org Chart</button></td>
            </tr>
            <tr>
              <td>Bindu</td>
              <td>Developer</td>
              <td>TNS</td>
              <td><button className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate && onNavigate('orgchart')}>Open in Org Chart</button></td>
            </tr>
            <tr>
              <td>Lokesh</td>
              <td>Developer</td>
              <td>ZSLIDES</td>
              <td><button className="btn btn-outline-secondary btn-sm" onClick={() => onNavigate && onNavigate('orgchart')}>Open in Org Chart</button></td>
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
        <button className="export-btn" onClick={() => onNavigate && onNavigate('payroll')}>Go to Payroll</button>
        <button className="quick-links-btn" onClick={() => onNavigate && onNavigate('reporting')}>Go to Reporting</button>
      </div>
    </div>
  );
}
