import { useState } from 'react';

export default function Payroll({ onNavigate }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = getDaysInMonth(currentMonth);
  const today = new Date().getDate();
  const currentMonthValue = currentMonth.getMonth();
  const currentYear = currentMonth.getFullYear();

  return (
    <div style={{ padding: '24px', maxWidth: '1400px', margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
        <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>💰 Payroll Management</h2>
        <button 
          onClick={() => {
            if (window.confirm('Are you sure you want to go back to Dashboard?')) {
              onNavigate && onNavigate('dashboard');
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
          ← Back to Dashboard
        </button>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button className="btn btn-outline-secondary">📥 Export</button>
          <button className="btn btn-primary">➕ Add Employee</button>
        </div>
      </div>
      
      <div className="card-grid" style={{ marginBottom: '32px' }}>
        <div className="card" style={{ textAlign: 'center', padding: '24px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card-title" style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280', fontWeight: '500' }}>Total Payroll</div>
          <div className="card-value" style={{ fontSize: '28px', fontWeight: '900', color: '#059669', lineHeight: '1.1', marginBottom: '8px', wordBreak: 'break-word' }}>{formatCurrency(847500)}</div>
          <div className="card-action" style={{ fontSize: '12px', marginTop: 'auto', color: '#6b7280' }}>This Month →</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '24px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card-title" style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280', fontWeight: '500' }}>Active Employees</div>
          <div className="card-value" style={{ fontSize: '36px', fontWeight: '900', color: '#2563eb', lineHeight: '1.1', marginBottom: '8px' }}>47</div>
          <div className="card-action" style={{ fontSize: '12px', marginTop: 'auto', color: '#6b7280' }}>View Details →</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '24px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card-title" style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280', fontWeight: '500' }}>Avg Salary</div>
          <div className="card-value" style={{ fontSize: '36px', fontWeight: '900', color: '#7c3aed', lineHeight: '1.1', marginBottom: '8px', wordBreak: 'break-word' }}>{formatCurrency(18032)}</div>
          <div className="card-action" style={{ fontSize: '12px', marginTop: 'auto', color: '#6b7280' }}>Breakdown →</div>
        </div>
        <div className="card" style={{ textAlign: 'center', padding: '24px', minHeight: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <div className="card-title" style={{ fontSize: '14px', marginBottom: '8px', color: '#6b7280', fontWeight: '500' }}>Pending</div>
          <div className="card-value" style={{ fontSize: '36px', fontWeight: '900', color: '#dc2626', lineHeight: '1.1', marginBottom: '8px' }}>3</div>
          <div className="card-action" style={{ fontSize: '12px', marginTop: 'auto', color: '#6b7280' }}>Review →</div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '32px' }}>
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#374151', fontWeight: '600' }}>Employee Payroll Details</h3>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table className="table" id="payroll-table" style={{ margin: 0, border: 'none' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Employee</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Department</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Role</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Salary</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Status</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Last Paid</th>
                  <th style={{ padding: '16px', fontWeight: '600', color: '#374151' }}>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Arvind</td>
                  <td style={{ padding: '16px' }}>Leadership</td>
                  <td style={{ padding: '16px' }}>CEO</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#059669' }}>$45,000</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#10b981'}}>● Paid</span></td>
                  <td style={{ padding: '16px' }}>2026-02-01</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-outline-secondary btn-sm">View</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Ganesh</td>
                  <td style={{ padding: '16px' }}>Web Studio</td>
                  <td style={{ padding: '16px' }}>Product Manager</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#059669' }}>$28,500</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#10b981'}}>● Paid</span></td>
                  <td style={{ padding: '16px' }}>2026-02-01</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-outline-secondary btn-sm">View</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Durga</td>
                  <td style={{ padding: '16px' }}>CMS</td>
                  <td style={{ padding: '16px' }}>Senior Developer</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#059669' }}>$22,000</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#10b981'}}>● Paid</span></td>
                  <td style={{ padding: '16px' }}>2026-02-01</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-outline-secondary btn-sm">View</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Aravind</td>
                  <td style={{ padding: '16px' }}>mall360</td>
                  <td style={{ padding: '16px' }}>Developer</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#dc2626' }}>$18,000</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#f59e0b'}}>● Pending</span></td>
                  <td style={{ padding: '16px' }}>2026-01-01</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-primary btn-sm">Process</button></td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Siri</td>
                  <td style={{ padding: '16px' }}>SIU</td>
                  <td style={{ padding: '16px' }}>Developer</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#059669' }}>$17,500</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#10b981'}}>● Paid</span></td>
                  <td style={{ padding: '16px' }}>2026-02-01</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-outline-secondary btn-sm">View</button></td>
                </tr>
                <tr>
                  <td style={{ padding: '16px', fontWeight: '500' }}>Ravi</td>
                  <td style={{ padding: '16px' }}>Web Sites</td>
                  <td style={{ padding: '16px' }}>Designer</td>
                  <td style={{ padding: '16px', fontWeight: '600', color: '#dc2626' }}>$16,000</td>
                  <td style={{ padding: '16px' }}><span style={{color: '#f59e0b'}}>● Pending</span></td>
                  <td style={{ padding: '16px' }}>2026-01-15</td>
                  <td style={{ padding: '16px' }}><button className="btn btn-primary btn-sm">Process</button></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div>
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#374151', fontWeight: '600' }}>📅 Payroll Calendar</h3>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center', 
              padding: '16px', 
              background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
              color: '#fff'
            }}>
              <button 
                onClick={() => setCurrentMonth(new Date(currentYear, currentMonthValue - 1))}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  borderRadius: '6px', 
                  padding: '8px 12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                ←
              </button>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>
                {monthNames[currentMonthValue]} {currentYear}
              </h4>
              <button 
                onClick={() => setCurrentMonth(new Date(currentYear, currentMonthValue + 1))}
                style={{ 
                  background: 'rgba(255, 255, 255, 0.2)', 
                  border: 'none', 
                  borderRadius: '6px', 
                  padding: '8px 12px',
                  color: '#fff',
                  cursor: 'pointer',
                  fontSize: '16px'
                }}
              >
                →
              </button>
            </div>
            
            <div style={{ padding: '16px' }}>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '4px', 
                marginBottom: '8px' 
              }}>
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} style={{ 
                    textAlign: 'center', 
                    fontSize: '12px', 
                    fontWeight: '600', 
                    color: '#6b7280',
                    padding: '8px 0'
                  }}>
                    {day}
                  </div>
                ))}
              </div>
              
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(7, 1fr)', 
                gap: '4px' 
              }}>
                {days.map((day, index) => (
                  <div
                    key={index}
                    onClick={() => day && setSelectedDate(new Date(currentYear, currentMonthValue, day))}
                    style={{
                      textAlign: 'center',
                      padding: '12px 0',
                      fontSize: '14px',
                      borderRadius: '8px',
                      cursor: day ? 'pointer' : 'default',
                      background: day === today && currentMonthValue === new Date().getMonth() 
                        ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)'
                        : day === selectedDate.getDate() && currentMonthValue === selectedDate.getMonth()
                        ? '#f3f4f6'
                        : 'transparent',
                      color: day === today && currentMonthValue === new Date().getMonth()
                        ? '#fff'
                        : day === selectedDate.getDate() && currentMonthValue === selectedDate.getMonth()
                        ? '#4f46e5'
                        : day ? '#374151' : '#e5e7eb',
                      fontWeight: day === today && currentMonthValue === new Date().getMonth() ? '600' : 'normal',
                      transition: 'all 0.2s ease',
                      border: day === selectedDate.getDate() && currentMonthValue === selectedDate.getMonth() && day !== today
                        ? '2px solid #4f46e5'
                        : 'none'
                    }}
                    onMouseEnter={(e) => {
                      if (day) {
                        e.target.style.transform = 'scale(1.05)';
                        e.target.style.boxShadow = '0 2px 8px rgba(79, 70, 229, 0.2)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (day) {
                        e.target.style.transform = 'scale(1)';
                        e.target.style.boxShadow = 'none';
                      }
                    }}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div style={{ marginTop: '20px', padding: '16px', background: '#f0f9ff', borderRadius: '8px', border: '1px solid #bae6fd' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '600', color: '#0369a1' }}>
              📋 Payroll Schedule
            </h4>
            <div style={{ fontSize: '14px', color: '#0369a1', lineHeight: '1.5' }}>
              <div style={{ marginBottom: '8px' }}>• <strong>15th {monthNames[currentMonthValue]}</strong> - Payroll Processing</div>
              <div style={{ marginBottom: '8px' }}>• <strong>25th {monthNames[currentMonthValue]}</strong> - Salary Disbursement</div>
              <div>• <strong>Last Day {monthNames[currentMonthValue]}</strong> - Tax Filing</div>
            </div>
          </div>
          
          <h3 style={{ fontSize: '20px', marginBottom: '16px', color: '#374151', fontWeight: '600', marginTop: '24px' }}>Department Breakdown</h3>
          <div style={{ background: '#fff', borderRadius: '12px', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <table className="table" style={{ margin: 0, border: 'none' }}>
              <thead>
                <tr style={{ background: '#f8fafc' }}>
                  <th style={{ padding: '12px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Department</th>
                  <th style={{ padding: '12px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Employees</th>
                  <th style={{ padding: '12px', fontWeight: '600', color: '#374151', fontSize: '14px' }}>Total</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>Leadership</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>2</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(65000)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>Web Studio</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>8</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(156000)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>CMS</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>12</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(198000)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>mall360</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>6</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(87000)}</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '12px', fontSize: '14px' }}>SIU</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>7</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>{formatCurrency(91000)}</td>
                </tr>
                <tr>
                  <td style={{ padding: '12px', fontSize: '14px' }}>Web Sites</td>
                  <td style={{ padding: '12px', fontSize: '14px' }}>5</td>
                  <td style={{ padding: '12px', fontSize: '14px', fontWeight: '600' }}>$68,500</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <button className="btn btn-primary" style={{ width: '100%', marginTop: '24px', padding: '12px', fontSize: '16px', fontWeight: '600' }}>
            📊 Generate Payroll Report
          </button>
        </div>
      </div>
    </div>
  );
}

