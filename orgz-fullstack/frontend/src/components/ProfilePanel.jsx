import { useState } from "react";

const employeeImages = {
  "Arvind": "https://ui-avatars.com/api/?name=Arvind&background=4f46e5&color=fff&size=150&format=png",
  "Ganesh": "https://ui-avatars.com/api/?name=Ganesh&background=7c3aed&color=fff&size=150&format=png", 
  "Durga": "https://ui-avatars.com/api/?name=Durga&background=ec4899&color=fff&size=150&format=png"
};

export default function ProfilePanel({ data, onClose }) {
  const [activeTab, setActiveTab] = useState('details');
  const [imageLoaded, setImageLoaded] = useState(false);
  
  if (!data) {
    return null;
  }

  return (
    <aside className="profile-panel show" style={{
      background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
      border: '3px solid #4f46e5',
      borderRadius: '24px',
      boxShadow: '0 30px 100px rgba(79, 70, 229, 0.5), 0 0 0 1px rgba(79, 70, 229, 0.1)',
      animation: 'slideIn 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
      maxWidth: '480px',
      margin: '20px',
      overflow: 'hidden',
      backdropFilter: 'blur(20px)',
      pointerEvents: 'auto',
      height: 'fit-content',
      maxHeight: '90vh',
      overflowY: 'auto',
      position: 'relative'
    }}>
      <div className="profile-header" style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
        padding: '28px',
        color: '#ffffff',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-50%',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          animation: 'pulse 3s ease-in-out infinite'
        }}></div>
        <h3 style={{
          margin: 0,
          fontSize: '26px',
          fontWeight: '800',
          position: 'relative',
          zIndex: 1,
          textShadow: '0 4px 8px rgba(0,0,0,0.3)',
          letterSpacing: '1px'
        }}>👤 Employee Profile</h3>
        <button 
          className="close-btn" 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            color: '#ffffff',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            fontSize: '24px',
            fontWeight: 'bold',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.3)',
            zIndex: 1
          }}
          onMouseOver={(e) => {
            e.target.style.transform = 'scale(1.15) rotate(90deg)';
            e.target.style.background = 'rgba(239, 68, 68, 0.9)';
            e.target.style.boxShadow = '0 8px 25px rgba(239, 68, 68, 0.5)';
          }}
          onMouseOut={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.boxShadow = '0 6px 20px rgba(0, 0, 0, 0.3)';
          }}
        >
          ×
        </button>
      </div>
      
      <div className="profile-content" style={{ 
          padding: '32px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)',
          backdropFilter: 'blur(10px)',
          borderRadius: '0 0 24px 24px'
        }}>
        <div className="employee-avatar" style={{
          textAlign: 'center',
          marginBottom: '28px',
          position: 'relative'
        }}>
          <div style={{
            position: 'relative',
            display: 'inline-block'
          }}>
            {!imageLoaded && (
              <div style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                backgroundColor: '#f0f0f0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                color: '#6b7280',
                border: '6px solid #4f46e5',
                boxShadow: '0 15px 40px rgba(79, 70, 229, 0.6), 0 0 0 3px rgba(79, 70, 229, 0.2)'
              }}>
                Loading...
              </div>
            )}
            <img 
              src={employeeImages[data.name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4f46e5&color=fff&size=150&format=png`}
              alt={data.name}
              className="avatar-img"
              onLoad={() => setImageLoaded(true)}
              onError={(e) => {
                console.log('Image failed to load, using fallback:', data.name);
                e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(data.name)}&background=4f46e5&color=fff&size=150&format=png`;
                setImageLoaded(true);
              }}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '6px solid #4f46e5',
                boxShadow: '0 15px 40px rgba(79, 70, 229, 0.6), 0 0 0 3px rgba(79, 70, 229, 0.2)',
                objectFit: 'cover',
                transition: 'all 0.4s ease',
                opacity: imageLoaded ? 1 : 0.7,
                backgroundColor: '#f0f0f0'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.08)';
                e.target.style.boxShadow = '0 20px 50px rgba(79, 70, 229, 0.7), 0 0 0 3px rgba(79, 70, 229, 0.3)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)';
                e.target.style.boxShadow = '0 15px 40px rgba(79, 70, 229, 0.6), 0 0 0 3px rgba(79, 70, 229, 0.2)';
              }}
            />
            <div style={{
              position: 'absolute',
              bottom: '10px',
              right: '10px',
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
              borderRadius: '50%',
              border: '4px solid #1e293b',
              boxShadow: '0 6px 16px rgba(16, 185, 129, 0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
              animation: 'pulse 2s ease-in-out infinite'
            }}>
              ✓
            </div>
          </div>
        </div>
        
        <div className="employee-info" style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <h2 className="employee-name" style={{
            margin: '0 0 12px 0',
            fontSize: '36px',
            fontWeight: '900',
            background: 'linear-gradient(135deg, #1f2937 0%, #4f46e5 50%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            letterSpacing: '2px'
          }}>{data.name}</h2>
          <p className="employee-title" style={{
            margin: '0 0 8px 0',
            fontSize: '20px',
            fontWeight: '700',
            color: '#4f46e5',
            textTransform: 'uppercase',
            letterSpacing: '2px'
          }}>{data.title}</p>
          <p className="employee-department" style={{
            margin: 0,
            fontSize: '16px',
            color: '#6b7280',
            fontWeight: '600'
          }}>
            <span style={{
              background: 'linear-gradient(135deg, rgba(79, 70, 229, 0.1) 0%, rgba(124, 58, 237, 0.1) 100%)',
              padding: '8px 20px',
              borderRadius: '25px',
              display: 'inline-block',
              border: '2px solid rgba(79, 70, 229, 0.2)',
              boxShadow: '0 4px 12px rgba(79, 70, 229, 0.1)'
            }}>
              🏢 Engineering Department
            </span>
          </p>
        </div>
        
        <div className="contact-info" style={{
          background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
          borderRadius: '16px',
          padding: '24px',
          marginBottom: '24px',
          border: '1px solid #e2e8f0'
        }}>
          <div className="info-item" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <span className="label" style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>📧 Email:</span>
            <span className="value" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>{`${(data.name || '').toLowerCase().trim().replace(/\s+/g, '.').replace(/[^a-z.]/g, '')}@orgz.com`}</span>
          </div>
          <div className="info-item" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0',
            borderBottom: '1px solid #e2e8f0'
          }}>
            <span className="label" style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>📱 Phone:</span>
            <span className="value" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>+1 (555) 123-4567</span>
          </div>
          <div className="info-item" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '12px 0'
          }}>
            <span className="label" style={{
              fontSize: '14px',
              fontWeight: '600',
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>📍 Location:</span>
            <span className="value" style={{
              fontSize: '14px',
              fontWeight: '500',
              color: '#1f2937',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
              padding: '8px 16px',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>San Francisco, CA</span>
          </div>
        </div>
        
        <div className="tabs" style={{
          display: 'flex',
          background: 'linear-gradient(135deg, #7d7e7fff 0%, #e2e8f0 100%)',
          borderRadius: '12px',
          padding: '4px',
          marginBottom: '24px',
          border: '1px solid #cbd5e1'
        }}>
          <button 
            className={`tab ${activeTab === 'details' ? 'active' : ''}`} 
            onClick={() => setActiveTab('details')}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === 'details' 
                ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                : 'transparent',
              color: activeTab === 'details' ? '#ffffff' : '#6b7280',
              boxShadow: activeTab === 'details' 
                ? '0 4px 12px rgba(79, 70, 229, 0.3)' 
                : 'none'
            }}
          >
            📋 Details
          </button>
          <button 
            className={`tab ${activeTab === 'jobHistory' ? 'active' : ''}`} 
            onClick={() => setActiveTab('jobHistory')}
            style={{
              flex: 1,
              padding: '12px 20px',
              border: 'none',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              background: activeTab === 'jobHistory' 
                ? 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)' 
                : 'transparent',
              color: activeTab === 'jobHistory' ? '#ffffff' : '#6b7280',
              boxShadow: activeTab === 'jobHistory' 
                ? '0 4px 12px rgba(79, 70, 229, 0.3)' 
                : 'none'
            }}
          >
            📈 Job History
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'details' && (
            <div className="details-section">
              <div className="detail-item">
                <span className="detail-label">Employee ID:</span>
                <span className="detail-value">EMP{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Join Date:</span>
                <span className="detail-value">Jan 15, 2022</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Reports To:</span>
                <span className="detail-value">Department Manager</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Team Size:</span>
                <span className="detail-value">5 members</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Salary:</span>
                <span className="detail-value" style={{
                  color: '#10b981',
                  fontWeight: '700',
                  fontSize: '16px'
                }}>$847,500.00</span>
              </div>
            </div>
          )}
          {activeTab === 'jobHistory' && (
            <div className="details-section">
              <div className="detail-item">
                <span className="detail-label">2022 – Present</span>
                <span className="detail-value">{data.title || 'Senior Developer'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">2020 – 2022</span>
                <span className="detail-value">Developer</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">2018 – 2020</span>
                <span className="detail-value">Junior Developer</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">2016 – 2018</span>
                <span className="detail-value">Intern</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
