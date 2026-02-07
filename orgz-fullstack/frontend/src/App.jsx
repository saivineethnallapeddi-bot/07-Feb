import { useState, useRef, useEffect } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import OrgChart from './components/OrgChart';
import ProfilePanel from './components/ProfilePanel';
import Dashboard from './Dashboard';
import Payroll from './Payroll';
import './styles/app.css';
import { orgData } from './api/orgData.js';

export default function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('zorg-theme');
    return saved ? JSON.parse(saved) : false;
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const saved = localStorage.getItem('zorg-current-page');
    // Default directly to org chart view
    return saved || 'orgchart';
  });
  const [filtersOpen, setFiltersOpen] = useState(false);
  const chartApiRef = useRef(null);
  const [filters, setFilters] = useState(() => {
    const saved = localStorage.getItem('zorg-filters');
    return saved ? JSON.parse(saved) : { roles: [], units: [], query: '' };
  });
  const [loginOpen, setLoginOpen] = useState(false);
  const [signupOpen, setSignupOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(() => {
    const saved = localStorage.getItem('zorg-is-admin');
    return saved ? JSON.parse(saved) : false;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    const saved = localStorage.getItem('zorg-is-logged-in');
    return saved ? JSON.parse(saved) : false;
  });
  const [currentUser, setCurrentUser] = useState(() => {
    const saved = localStorage.getItem('zorg-current-user');
    return saved ? JSON.parse(saved) : null;
  });
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [signupForm, setSignupForm] = useState({ name: '', email: '', username: '', password: '', confirmPassword: '' });

  const handleZorgLogoClick = () => {
    // First navigate to company page, then show a loading effect
    setCurrentPage('company');
    setTimeout(() => {
      // Add a loading animation effect
      const contentArea = document.querySelector('.content-area');
      if (contentArea) {
        contentArea.style.opacity = '0.5';
        setTimeout(() => {
          contentArea.style.opacity = '1';
        }, 300);
      }
    }, 100);
  };

  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
  }, [isDark]);
  const roleOptions = ["CEO", "Portfolio Manager", "Product Manager", "Developer"];
  const unitOptions = [
    "Leadership",
    "Business Units",
    "Web Studio",
    "CMS",
    "SIU",
    "mall360",
    "Web Sites",
    "TNS",
    "Productivity Suite",
    "ZSLIDES"
  ];
  const handleExport = () => {
    if (currentPage === 'orgchart') {
      if (chartApiRef.current && chartApiRef.current.exportSVG) {
        chartApiRef.current.exportSVG();
        alert('🎉🔥 SHOCKING EXPORT SUCCESS! 🔥🎉\n\nOrganization chart exported successfully!\n\n✨ SVG file downloaded! ✨');
      } else {
        alert('❌ Org chart data not available for export.\n\nPlease try again.');
      }
      return;
    }
    
    // For other pages, generate and download PDF
    generateAndDownloadPDF();
  };

  const generateAndDownloadPDF = () => {
    try {
      // Get content from current page
      let content = '';
      let title = `Z.ORG ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;
      
      // Create content based on current page
      if (currentPage === 'dashboard') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">📊 Dashboard Overview</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Total Employees</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">47</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Active Projects</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">12</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Departments</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">8</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Performance</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">4.6</p>
              </div>
            </div>
          </div>
        `;
      } else if (currentPage === 'employees') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">👥 Employee Directory</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Department</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Leadership</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CEO</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Senior Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'payroll') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">💰 Complete Payroll Report</h2>
            
            <!-- Summary Cards -->
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Total Payroll</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">$847,500.00</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Active Employees</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #2563eb;">47</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Avg Salary</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #7c3aed;">$18,032</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff; text-align: center;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Pending</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc2626;">3</p>
              </div>
            </div>
            
            <!-- Employee Details Table -->
            <h3 style="color: #1f2937; margin: 20px 0 16px 0; font-size: 18px;">Employee Payroll Details</h3>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Employee ID</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Department</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Salary</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Pay Date</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Status</th>
                  <th style="border: 1px solid #e5e7eb; padding: 10px; text-align: left; font-weight: 600;">Bank Account</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">EMP001</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Arvind</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Leadership</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">CEO</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 600;">$45,000</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">2026-02-01</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;"><span style="color: #059669; font-weight: 600;">Paid</span></td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">****1234</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">EMP002</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Ganesh</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Web Studio</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Product Manager</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 600;">$28,500</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">2026-02-01</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;"><span style="color: #059669; font-weight: 600;">Paid</span></td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">****5678</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">EMP003</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Durga</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">CMS</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Senior Developer</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 600;">$32,000</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">2026-02-01</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;"><span style="color: #059669; font-weight: 600;">Paid</span></td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">****9012</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">EMP004</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Ravi</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Web Studio</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Frontend Developer</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 600;">$25,000</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">2026-02-01</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;"><span style="color: #059669; font-weight: 600;">Paid</span></td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">****3456</td>
                </tr>
                <tr>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">EMP005</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">Sita</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">CMS</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">QA Engineer</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px; font-weight: 600;">$22,000</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">2026-02-01</td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;"><span style="color: #059669; font-weight: 600;">Paid</span></td>
                  <td style="border: 1px solid #e5e7eb; padding: 10px;">****7890</td>
                </tr>
              </tbody>
            </table>
            
            <!-- Summary Statistics -->
            <div style="margin-top: 30px; padding: 16px; background: #f8fafc; border-radius: 8px; border: 1px solid #e5e7eb;">
              <h3 style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px;">Payroll Summary Statistics</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <div>
                  <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;"><strong>Total Employees:</strong> 47</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Active Employees:</strong> 44</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>New Hires (Month):</strong> 3</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;"><strong>Total Payroll:</strong> $847,500</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Avg Salary:</strong> $18,032</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Payroll Date:</strong> Feb 1, 2026</p>
                </div>
                <div>
                  <p style="margin: 0 0 4px 0; color: #6b7280; font-size: 14px;"><strong>Paid Status:</strong> 44 Paid</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Pending Status:</strong> 3 Pending</p>
                  <p style="margin: 0; color: #6b7280; font-size: 14px;"><strong>Next Pay Date:</strong> Feb 28, 2026</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else if (currentPage === 'company') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">🏢 Company Information</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Organization Name</h3>
                <p style="margin: 0; font-size: 18px; font-weight: bold; color: #1f2937;">Z.ORG</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Total Units</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">4</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Unit</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Head</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Employees</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Leadership</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">3</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">12</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">TNS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">6</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'team') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">👥 Team Overview</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Team Members</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">12</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Active Projects</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">8</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ravi</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Frontend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'timesheet') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">⏱️ Time Sheet Report</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Total Hours</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">168</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Submitted</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">12</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Pending</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc2626;">3</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Date</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Project</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Hours</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-01</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Submitted</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-02</td><td style="border: 1px solid #e5e7eb; padding: 12px;">SIU</td><td style="border: 1px solid #e5e7eb; padding: 12px;">7.5</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Draft</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-03</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Submitted</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'performance') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">📈 Performance Review</h2>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Avg Rating</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">4.3</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Reviews Due</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">3</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Goals Met</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">87%</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Promotions</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">2</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Rating</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">4.6</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Excellent</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">4.2</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Good</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ravi</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Frontend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">4.0</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Good</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'recruiting') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">🧲 Recruiting Pipeline</h2>
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Open Positions</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">5</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Active Candidates</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">12</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Interviews</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">3</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h3 style="margin: 0 0 8px 0; color: #6b7280; font-size: 14px;">Offers Extended</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">2</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Candidate</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Position</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Stage</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Applied</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ravi</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Frontend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Interview</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-15</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Sita</td><td style="border: 1px solid #e5e7eb; padding: 12px;">QA Engineer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Screening</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-20</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Rahul</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Backend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Technical</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-25</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'reporting') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">📊 Reports Dashboard</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Total Reports</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #1f2937;">8</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Ready</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #059669;">6</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 10px 0; color: #6b7280;">Processing</h3>
                <p style="margin: 0; font-size: 24px; font-weight: bold; color: #dc2626;">2</p>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Report</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Last Run</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Type</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Headcount by Unit</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-01</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Monthly</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Open Positions</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-28</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Weekly</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Payroll Summary</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-30</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Monthly</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Performance Review</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-25</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Quarterly</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'settings') {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">⚙️ System Settings</h2>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin-bottom: 30px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 16px 0; color: #1f2937;">Appearance</h3>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Theme:</strong> ${isDark ? 'Dark Mode' : 'Light Mode'}</p>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Language:</strong> English</p>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Font Size:</strong> Medium</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
                <h3 style="margin: 0 0 16px 0; color: #1f2937;">Account</h3>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Status:</strong> ${isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Role:</strong> ${currentUser?.role || 'Guest'}</p>
                <p style="margin: 8px 0; color: #6b7280;"><strong>Last Login:</strong> ${new Date().toLocaleDateString()}</p>
              </div>
            </div>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
              <h3 style="margin: 0 0 16px 0; color: #1f2937;">System Information</h3>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px;">
                <div>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Version:</strong> 1.0.0</p>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Environment:</strong> Production</p>
                </div>
                <div>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Database:</strong> Connected</p>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Storage:</strong> 85% Used</p>
                </div>
                <div>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Users:</strong> 47 Active</p>
                  <p style="margin: 8px 0; color: #6b7280;"><strong>Uptime:</strong> 99.9%</p>
                </div>
              </div>
            </div>
          </div>
        `;
      } else {
        content = `
          <div style="margin: 20px;">
            <h2 style="color: #1f2937; margin-bottom: 20px;">📄 ${title}</h2>
            <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; background: #fff;">
              <p style="margin: 0; color: #6b7280;">This page contains important organizational information and data management features.</p>
              <p style="margin: 16px 0 0 0; color: #6b7280;"><strong>Generated:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
          </div>
        `;
      }
      
      // Create HTML content
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #1f2937; font-size: 28px; }
        .header p { margin: 8px 0 0 0; color: #6b7280; font-size: 14px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 11px; }
      </style>
      </head><body>
        <div class="header">
          <h1>🏢 ${title}</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        ${content}
        <div class="footer">© 2026 Z.ORG - Confidential Organization Data | Page 1</div>
      </body></html>`;
      
      // Create a blob and download directly
      const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `ZORG-${currentPage}-${new Date().toISOString().split('T')[0]}.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      alert(`🚀 PDF EXPORT SUCCESS! 🚀\n\n${title} file downloaded successfully!\n\n📄 Open the file and print to PDF! 📄`);
    } catch (error) {
      alert('❌ Error generating PDF. Please try again.');
      console.error('PDF Export Error:', error);
    }
  };
  const toggleTheme = () => setIsDark((d) => !d);
  useEffect(() => {
    document.body.classList.toggle('dark', isDark);
    localStorage.setItem('zorg-theme', JSON.stringify(isDark));
  }, [isDark]);

  useEffect(() => {
    localStorage.setItem('zorg-current-page', currentPage);
  }, [currentPage]);

  useEffect(() => {
    localStorage.setItem('zorg-filters', JSON.stringify(filters));
  }, [filters]);

  useEffect(() => {
    localStorage.setItem('zorg-is-admin', JSON.stringify(isAdmin));
  }, [isAdmin]);

  useEffect(() => {
    localStorage.setItem('zorg-is-logged-in', JSON.stringify(isLoggedIn));
  }, [isLoggedIn]);

  useEffect(() => {
    localStorage.setItem('zorg-current-user', JSON.stringify(currentUser));
  }, [currentUser]);

  const appliedFiltersCount = (filters.roles?.length || 0) + (filters.units?.length || 0) + (filters.query?.trim() ? 1 : 0);

  useEffect(() => {
    // Add body class when on org chart page to prevent scrolling
    if (currentPage === 'orgchart') {
      document.body.classList.add('org-chart-active');
    } else {
      document.body.classList.remove('org-chart-active');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('org-chart-active');
    };
  }, [currentPage]);

  const handleLogin = () => {
    if (loginForm.username.trim() === 'admin' && loginForm.password.trim() === 'admin123') {
      setIsAdmin(true);
      setIsLoggedIn(true);
      setCurrentUser({ name: 'Admin User', username: 'admin', role: 'Administrator' });
      setLoginOpen(false);
      setLoginForm({ username: '', password: '' });
      
      // Show shocking success message and navigate to payroll
      setTimeout(() => {
        alert('🎉🔥 SHOCKING LOGIN SUCCESS! 🔥🎉\n\nWelcome Administrator! Accessing Payroll Management...\n\n✨ Premium Features Unlocked! ✨');
        setCurrentPage('payroll');
      }, 500);
    } else if (loginForm.username.trim() && loginForm.password.trim()) {
      // Regular user login simulation with shocking effects
      setIsLoggedIn(true);
      setCurrentUser({ 
        name: loginForm.username, 
        username: loginForm.username, 
        role: 'Employee' 
      });
      setLoginOpen(false);
      setLoginForm({ username: '', password: '' });
      
      setTimeout(() => {
        alert(`🚀 AMAZING LOGIN! 🚀\n\nWelcome back, ${loginForm.username}!\n\n🎊 You are now logged in as an Employee! 🎊\n\n🌟 Explore the Organization System! 🌟`);
        setCurrentPage('dashboard');
      }, 500);
    } else {
      alert('❌ Please enter both username and password.\n\n💡 Admin: "admin" / "admin123"\n👤 Or create a new account!');
    }
  };

  const handleSignup = () => {
    if (!signupForm.name || !signupForm.email || !signupForm.username || !signupForm.password) {
      alert('❌ Please fill in all fields.');
      return;
    }
    
    if (signupForm.password !== signupForm.confirmPassword) {
      alert('❌ Passwords do not match!');
      return;
    }
    
    if (signupForm.password.length < 6) {
      alert('❌ Password must be at least 6 characters long!');
      return;
    }
    
    // Simulate successful signup with shocking effects
    setIsLoggedIn(true);
    setCurrentUser({ 
      name: signupForm.name, 
      username: signupForm.username, 
      email: signupForm.email,
      role: 'Employee' 
    });
    setSignupOpen(false);
    setSignupForm({ name: '', email: '', username: '', password: '', confirmPassword: '' });
    
    setTimeout(() => {
      alert(`🎉🔥 SHOCKING ACCOUNT CREATED! 🔥🎉\n\nWelcome to Z.ORG, ${signupForm.name}!\n\n✨ Your account is ready! ✨\n\n🚀 Start exploring the organization! 🚀`);
      setCurrentPage('dashboard');
    }, 500);
  };

  const handleLogout = () => {
    setIsAdmin(false);
    setIsLoggedIn(false);
    setCurrentUser(null);
    if (currentPage === 'payroll') setCurrentPage('dashboard');
    alert('👋 You have been logged out successfully.\n\nSee you again soon! 👋');
  };

  const navigateToPage = (page) => {
    // Special navigation for org tree shortcuts coming from sidebar / header.
    // Format: "org:UNIT_NAME"  (e.g., "org:Leadership", "org:Web Studio")
    if (page.startsWith('org:')) {
      const unit = page.slice(4);
      if (!unit || unit === 'ALL') {
        setFilters({ roles: [], units: [], query: '' });
      } else {
        setFilters({ roles: [], units: [unit], query: '' });
      }
      setCurrentPage('orgchart');
      return;
    }

    if (page === 'payroll' && !isAdmin) {
      setLoginOpen(true);
    } else {
      setCurrentPage(page);
    }
  };

  const handleExportPDF = () => {
    try {
      if (currentPage === 'orgchart') {
        const svgString = chartApiRef.current?.getSVGString?.();
        if (!svgString) {
          alert('❌ Org chart data not available for PDF export.\n\nPlease try again.');
          return;
        }
        // Create HTML content for direct download
        const html = `<!doctype html><html><head><meta charset="utf-8"><title>Z.ORG Organization Chart</title>
        <style>
          @page { size: A4 landscape; margin: 10mm; }
          html, body { height: 100%; font-family: 'Inter', sans-serif; }
          body { margin: 0; background: #fff; display: flex; align-items: center; justify-content: center; }
          .header { position: absolute; top: 20px; left: 20px; right: 20px; text-align: center; }
          .header h1 { margin: 0; color: #1f2937; font-size: 24px; }
          .header p { margin: 8px 0 0 0; color: #6b7280; font-size: 14px; }
          .wrap { width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }
          .wrap svg { width: 100%; height: auto; max-height: 70vh; }
          .footer { position: absolute; bottom: 20px; left: 20px; right: 20px; text-align: center; color: #9ca3af; font-size: 12px; }
        </style>
        </head><body>
          <div class="header">
            <h1>🏢 Z.ORG Organization Chart</h1>
            <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
          </div>
          <div class="wrap">${svgString}</div>
          <div class="footer">© 2026 Z.ORG - Confidential Organization Structure</div>
          <script>
            // Auto-open print dialog after page loads
            setTimeout(function(){ 
              window.print(); 
              // Show instructions after print dialog closes
              setTimeout(function() {
                alert('📄 Organization Chart PDF Complete!\\n\\nTo save as PDF:\\n1. Choose "Save as PDF" in print dialog\\n2. Select destination and save\\n\\nFile will be saved to your Downloads folder.');
              }, 2000);
            }, 1000); 
          <\/script>
        </body></html>`;
        
        // Create a temporary window for PDF generation
        const printWindow = window.open('', '_blank', 'width=800,height=600');
        if (!printWindow) {
          alert('❌ Popup blocked! Please allow popups for this site to generate PDF.');
          return;
        }
        
        printWindow.document.write(html);
        printWindow.document.close();
        
        // Wait for content to load, then trigger print dialog
        setTimeout(() => {
          printWindow.print();
          
          // Also create a downloadable HTML file for backup
          const blob = new Blob([html], { type: 'text/html' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `ZORG-orgchart-${new Date().toISOString().split('T')[0]}.html`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          window.URL.revokeObjectURL(url);
          
          // Show success message
          setTimeout(() => {
            alert(`🎉 Organization Chart PDF Generation Started! 🎉\\n\\nOrg chart report is ready!\\n\\n✅ Print dialog opened for PDF\\n✅ HTML file downloaded for backup\\n\\nSave the PDF and keep the HTML file for future access.`);
          }, 500);
          
          // Close the print window after printing
          setTimeout(() => {
            printWindow.close();
          }, 10000);
        }, 1000);
        return;
      }
      
      // Get content from current page
      let content = '';
      let title = `Z.ORG ${currentPage.charAt(0).toUpperCase() + currentPage.slice(1)}`;
      
      // Create content based on current page
      if (currentPage === 'dashboard') {
        content = `
          <div class="card-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 20px 0;">
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Total Employees</div>
              <div style="font-size: 24px; font-weight: bold; color: #1f2937;">47</div>
            </div>
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Active Projects</div>
              <div style="font-size: 24px; font-weight: bold; color: #1f2937;">12</div>
            </div>
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Departments</div>
              <div style="font-size: 24px; font-weight: bold; color: #1f2937;">8</div>
            </div>
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Performance</div>
              <div style="font-size: 24px; font-weight: bold; color: #1f2937;">4.6</div>
            </div>
          </div>
        `;
      } else if (currentPage === 'employees') {
        content = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Department</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Leadership</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CEO</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Senior Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'payroll') {
        content = `
          <div class="card-grid" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 20px 0;">
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Total Payroll</div>
              <div style="font-size: 28px; font-weight: bold; color: #059669;">$847,500.00</div>
            </div>
            <div class="card" style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
              <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Active Employees</div>
              <div style="font-size: 24px; font-weight: bold; color: #2563eb;">47</div>
            </div>
          </div>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Employee</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Department</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Salary</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Leadership</td><td style="border: 1px solid #e5e7eb; padding: 12px;">$45,000</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Paid</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">$28,500</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Paid</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'company') {
        content = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Unit</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Head</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Employees</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Leadership</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">3</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Arvind</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">12</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">TNS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">6</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'team') {
        content = `
          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937; margin-bottom: 16px;">Team Overview</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 20px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Team Members</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">12</div>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Projects</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">8</div>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Active</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'timesheet') {
        content = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Date</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Project</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Hours</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-01</td><td style="border: 1px solid #e5e7eb; padding: 12px;">CMS</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Submitted</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-02</td><td style="border: 1px solid #e5e7eb; padding: 12px;">SIU</td><td style="border: 1px solid #e5e7eb; padding: 12px;">7.5</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Draft</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-03</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Web Studio</td><td style="border: 1px solid #e5e7eb; padding: 12px;">8</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Submitted</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'performance') {
        content = `
          <div style="margin: 20px 0;">
            <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 20px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Avg Rating</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">4.3</div>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Reviews Due</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">3</div>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Goals Met</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">87%</div>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <div style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Promotions</div>
                <div style="font-size: 24px; font-weight: bold; color: #1f2937;">2</div>
              </div>
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="background: #f8fafc;">
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Name</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Role</th>
                  <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Rating</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ganesh</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Product Manager</td><td style="border: 1px solid #e5e7eb; padding: 12px;">4.6</td></tr>
                <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Durga</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">4.2</td></tr>
              </tbody>
            </table>
          </div>
        `;
      } else if (currentPage === 'recruiting') {
        content = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Candidate</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Position</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Stage</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Applied</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Ravi</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Frontend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Interview</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-15</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Sita</td><td style="border: 1px solid #e5e7eb; padding: 12px;">QA Engineer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Screening</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-20</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Rahul</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Backend Developer</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Technical</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-25</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'reporting') {
        content = `
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <thead>
              <tr style="background: #f8fafc;">
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Report</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Last Run</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Status</th>
                <th style="border: 1px solid #e5e7eb; padding: 12px; text-align: left;">Type</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Headcount by Unit</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-02-01</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Monthly</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Open Positions</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-28</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Weekly</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Payroll Summary</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-30</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Monthly</td></tr>
              <tr><td style="border: 1px solid #e5e7eb; padding: 12px;">Performance Review</td><td style="border: 1px solid #e5e7eb; padding: 12px;">2026-01-25</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Ready</td><td style="border: 1px solid #e5e7eb; padding: 12px;">Quarterly</td></tr>
            </tbody>
          </table>
        `;
      } else if (currentPage === 'settings') {
        content = `
          <div style="margin: 20px 0;">
            <h3 style="color: #1f2937; margin-bottom: 16px;">System Settings</h3>
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px;">
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h4 style="margin: 0 0 12px 0; color: #1f2937;">Appearance</h4>
                <p style="margin: 4px 0; color: #6b7280;">Theme: ${isDark ? 'Dark Mode' : 'Light Mode'}</p>
                <p style="margin: 4px 0; color: #6b7280;">Language: English</p>
              </div>
              <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff;">
                <h4 style="margin: 0 0 12px 0; color: #1f2937;">Account</h4>
                <p style="margin: 4px 0; color: #6b7280;">Status: ${isLoggedIn ? 'Logged In' : 'Logged Out'}</p>
                <p style="margin: 4px 0; color: #6b7280;">Role: ${currentUser?.role || 'Guest'}</p>
              </div>
            </div>
          </div>
        `;
      } else {
        content = `<p style="padding: 20px; text-align: center; color: #6b7280;">Content for ${title} page</p>`;
      }
      
      // Create HTML content for direct download
      const html = `<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
      <style>
        @page { size: A4; margin: 12mm; }
        body { font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 0; padding: 20px; }
        .header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #e5e7eb; padding-bottom: 20px; }
        .header h1 { margin: 0; color: #1f2937; font-size: 28px; }
        .header p { margin: 8px 0 0 0; color: #6b7280; font-size: 14px; }
        .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #9ca3af; font-size: 11px; }
        table { width: 100%; border-collapse: collapse; margin: 20px 0; }
        th, td { border: 1px solid #e5e7eb; padding: 12px; text-align: left; }
        th { background: #f8fafc; font-weight: 600; }
        .card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; background: #fff; margin-bottom: 16px; }
        .card-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 16px; margin: 20px 0; }
      </style>
      </head><body>
        <div class="header">
          <h1>🏢 ${title}</h1>
          <p>Generated on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
        </div>
        ${content}
        <div class="footer">© 2026 Z.ORG - Confidential Organization Data | Page 1</div>
        <script>
          // Auto-open print dialog after page loads
          setTimeout(function(){ 
            window.print(); 
            // Show instructions after print dialog closes
            setTimeout(function() {
              alert('📄 PDF Generation Complete!\\n\\nTo save as PDF:\\n1. Choose "Save as PDF" in print dialog\\n2. Select destination and save\\n\\nFile will be saved to your Downloads folder.');
            }, 2000);
          }, 1000); 
        <\/script>
      </body></html>`;
      
      // Create a temporary window for PDF generation
      const printWindow = window.open('', '_blank', 'width=800,height=600');
      if (!printWindow) {
        alert('❌ Popup blocked! Please allow popups for this site to generate PDF.');
        return;
      }
      
      printWindow.document.write(html);
      printWindow.document.close();
      
      // Wait for content to load, then trigger print dialog
      setTimeout(() => {
        printWindow.print();
        
        // Also create a downloadable HTML file for backup
        const blob = new Blob([html], { type: 'text/html' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ZORG-${currentPage}-${new Date().toISOString().split('T')[0]}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
        
        // Show success message
        setTimeout(() => {
          alert(`🎉 PDF Generation Started! 🎉\\n\\n${title} report is ready!\\n\\n✅ Print dialog opened for PDF\\n✅ HTML file downloaded for backup\\n\\nSave the PDF and keep the HTML file for future access.`);
        }, 500);
        
        // Close the print window after printing
        setTimeout(() => {
          printWindow.close();
        }, 10000);
      }, 1000);
    } catch (error) {
      alert('❌ Error generating PDF. Please try again.');
      console.error('PDF Export Error:', error);
    }
  };

  return (
    <div className="app">
      <Sidebar currentPage={currentPage} onNavigate={navigateToPage} />
      <div className="main-content">
        <Header
          searchValue={filters.query}
          onSearchChange={(v) => setFilters((f) => ({ ...f, query: v }))}
          onQuickLinkSelect={navigateToPage}
          onExport={handleExport}
          onExportPDF={handleExportPDF}
          onOpenFilters={() => setFiltersOpen(true)}
          appliedFiltersCount={appliedFiltersCount}
          isDark={isDark}
          onToggleTheme={toggleTheme}
          isAdmin={isAdmin}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          onLogin={() => setLoginOpen(true)}
          onSignup={() => setSignupOpen(true)}
          onLogout={handleLogout}
        />
        <div className="content-area">
          {currentPage === 'orgchart' && (
            <OrgChart onSelect={setSelectedEmployee} apiRef={chartApiRef} filters={filters} />
          )}
          {currentPage === 'dashboard' && (
            <div style={{ padding: 24 }}>
              <Dashboard onNavigate={navigateToPage} />
            </div>
          )}
          {currentPage === 'company' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>🏢 Company Info</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <p style={{ marginTop: 6, marginBottom: 16 }}>Units and heads</p>
              <table className="table" id="company-table">
                <thead>
                  <tr><th>Unit</th><th>Head</th><th>Action</th></tr>
                </thead>
                <tbody>
                  <tr><td>Leadership</td><td>Arvind</td><td><button className="btn btn-outline-secondary btn-sm" onClick={() => { setFilters({ roles: [], units: ['Leadership'], query: '' }); setCurrentPage('orgchart'); }}>View in Org Chart</button></td></tr>
                  <tr><td>Web Studio</td><td>Arvind</td><td><button className="btn btn-outline-secondary btn-sm" onClick={() => { setFilters({ roles: [], units: ['Web Studio'], query: '' }); setCurrentPage('orgchart'); }}>View in Org Chart</button></td></tr>
                  <tr><td>CMS</td><td>Ganesh</td><td><button className="btn btn-outline-secondary btn-sm" onClick={() => { setFilters({ roles: [], units: ['CMS'], query: '' }); setCurrentPage('orgchart'); }}>View in Org Chart</button></td></tr>
                  <tr><td>TNS</td><td>Ganesh</td><td><button className="btn btn-outline-secondary btn-sm" onClick={() => { setFilters({ roles: [], units: ['TNS'], query: '' }); setCurrentPage('orgchart'); }}>View in Org Chart</button></td></tr>
                </tbody>
              </table>
            </div>
          )}
          {currentPage === 'employees' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>👥 Staff</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <div className="card-grid" style={{ marginTop: 16 }}>
                <div className="card">
                  <div className="card-title">Total Employees</div>
                  <div className="card-value">47</div>
                  <div className="card-action">View Details →</div>
                </div>
                <div className="card">
                  <div className="card-title">Active Now</div>
                  <div className="card-value">38</div>
                  <div className="card-action">View Details →</div>
                </div>
                <div className="card">
                  <div className="card-title">New This Month</div>
                  <div className="card-value">5</div>
                  <div className="card-action">View Details →</div>
                </div>
                <div className="card">
                  <div className="card-title">Departments</div>
                  <div className="card-value">8</div>
                  <div className="card-action">View Details →</div>
                </div>
              </div>
            </div>
          )}
          {currentPage === 'settings' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>⚙️ Settings</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <div style={{ marginTop: 24 }}>
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 style={{ marginBottom: 16 }}>Appearance</h3>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
                    <span>Dark Mode</span>
                    <button 
                      className={`btn ${isDark ? 'btn-primary' : 'btn-outline-secondary'}`}
                      onClick={toggleTheme}
                    >
                      {isDark ? 'Enabled' : 'Disabled'}
                    </button>
                  </div>
                </div>
                
                <div className="card" style={{ marginBottom: 16 }}>
                  <h3 style={{ marginBottom: 16 }}>Account</h3>
                  {isLoggedIn ? (
                    <div>
                      <p style={{ marginBottom: 12 }}>Logged in as: <strong>{currentUser?.name || 'User'}</strong></p>
                      <p style={{ marginBottom: 12 }}>Role: <strong>{currentUser?.role || 'Employee'}</strong></p>
                      <button className="btn btn-outline-secondary" onClick={handleLogout}>
                        Logout
                      </button>
                    </div>
                  ) : (
                    <div>
                      <p style={{ marginBottom: 12 }}>Not logged in</p>
                      <button className="btn btn-primary" onClick={() => setLoginOpen(true)}>
                        Login
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="card">
                  <h3 style={{ marginBottom: 16 }}>About</h3>
                  <p style={{ marginBottom: 8 }}>Z.ORG Organization Management System</p>
                  <p style={{ color: '#6b7280', fontSize: '14px' }}>Version 1.0.0</p>
                </div>
              </div>
            </div>
          )}
          {currentPage === 'team' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>👥 My Team</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <div style={{ display: 'flex', gap: 24, marginTop: 16 }}>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: 12, color: '#6b7280' }}>Direct Reports</h3>
                  <div className="card-grid" style={{ marginBottom: 24 }}>
                    <div className="card">
                      <div className="card-title">Team Members</div>
                      <div className="card-value">12</div>
                      <div className="card-action">View All →</div>
                    </div>
                    <div className="card">
                      <div className="card-title">Projects Active</div>
                      <div className="card-value">8</div>
                      <div className="card-action">View Details →</div>
                    </div>
                  </div>
                </div>
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', marginBottom: 12, color: '#6b7280' }}>Team Performance</h3>
                  <div className="card-grid">
                    <div className="card">
                      <div className="card-title">Avg Rating</div>
                      <div className="card-value">4.6</div>
                      <div className="card-action">View Details →</div>
                    </div>
                    <div className="card">
                      <div className="card-title">Tasks Completed</div>
                      <div className="card-value">142</div>
                      <div className="card-action">View Details →</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {currentPage === 'timesheet' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>⏱️ Work Hours</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <table className="table" id="timesheet-table" style={{ marginTop: 12 }}>
                <thead>
                  <tr><th>Date</th><th>Project</th><th>Hours</th><th>Status</th></tr>
                </thead>
                <tbody>
                  <tr><td>2026-02-01</td><td>CMS</td><td>8</td><td>Submitted</td></tr>
                  <tr><td>2026-02-02</td><td>SIU</td><td>7.5</td><td>Draft</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {currentPage === 'performance' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>📈 Appraisal</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <div className="card-grid" style={{ marginTop: 12 }}>
                <div className="card"><div className="card-title">Avg Rating</div><div className="card-value">4.3</div></div>
                <div className="card"><div className="card-title">Reviews Due</div><div className="card-value">3</div></div>
                <div className="card"><div className="card-title">Goals Met</div><div className="card-value">87%</div></div>
                <div className="card"><div className="card-title">Promotions</div><div className="card-value">2</div></div>
              </div>
              <table className="table" id="performance-table" style={{ marginTop: 16 }}>
                <thead><tr><th>Name</th><th>Role</th><th>Rating</th></tr></thead>
                <tbody>
                  <tr><td>Ganesh</td><td>Product Manager</td><td>4.6</td></tr>
                  <tr><td>Durga</td><td>Developer</td><td>4.2</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {currentPage === 'payroll' && (
            <div style={{ padding: 24 }}>
              {isAdmin ? <Payroll onNavigate={navigateToPage} /> : (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ 
                    width: '80px', 
                    height: '80px', 
                    background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    margin: '0 auto 24px auto',
                    boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)'
                  }}>
                    <span style={{ fontSize: '40px', color: '#fff' }}>🔒</span>
                  </div>
                  <h2 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#1f2937' }}>Access Restricted</h2>
                  <p style={{ margin: '16px 0 32px 0', fontSize: '16px', color: '#6b7280', maxWidth: '400px', marginLeft: 'auto', marginRight: 'auto' }}>
                    You must be logged in as an admin to view the Payroll Management system. This area contains sensitive financial information.
                  </p>
                  <button 
                    className="btn btn-primary" 
                    onClick={() => setLoginOpen(true)}
                    style={{ 
                      background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                      border: 'none',
                      padding: '16px 32px',
                      fontSize: '16px',
                      fontWeight: '600',
                      boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
                  >
                    🔐 Login as Admin
                  </button>
                  <div style={{ 
                    marginTop: '24px', 
                    padding: '16px', 
                    background: '#f0f9ff', 
                    border: '1px solid #bae6fd', 
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#0369a1',
                    maxWidth: '300px',
                    marginLeft: 'auto',
                    marginRight: 'auto'
                  }}>
                    <strong>🔑 Admin Credentials:</strong><br/>
                    Username: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin</code><br/>
                    Password: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>
                  </div>
                </div>
              )}
            </div>
          )}
          {currentPage === 'recruiting' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>🧲 Jobs</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <table className="table" id="recruiting-table" style={{ marginTop: 12 }}>
                <thead><tr><th>Candidate</th><th>Position</th><th>Stage</th></tr></thead>
                <tbody>
                  <tr><td>Ravi</td><td>Frontend Developer</td><td>Interview</td></tr>
                  <tr><td>Sita</td><td>QA Engineer</td><td>Screening</td></tr>
                </tbody>
              </table>
            </div>
          )}
          {currentPage === 'reporting' && (
            <div style={{ padding: 24 }}>
              <div style={{ marginBottom: 20, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2 style={{ margin: 0 }}>📊 Reports</h2>
                <button 
                  onClick={() => {
                    if (window.confirm('Are you sure you want to go back to Dashboard?')) {
                      setCurrentPage('dashboard');
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
              <table className="table" id="reporting-table" style={{ marginTop: 12 }}>
                <thead><tr><th>Report</th><th>Last Run</th><th>Status</th></tr></thead>
                <tbody>
                  <tr><td>Headcount by Unit</td><td>2026-02-01</td><td>Ready</td></tr>
                  <tr><td>Open Positions</td><td>2026-01-28</td><td>Ready</td></tr>
                  <tr><td>Payroll Summary</td><td>2026-01-30</td><td>Ready</td></tr>
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      {currentPage === 'orgchart' && selectedEmployee && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '520px',
          maxWidth: '90vw',
          zIndex: 1000,
          pointerEvents: 'none'
        }}>
          <ProfilePanel data={selectedEmployee} onClose={() => setSelectedEmployee(null)} />
        </div>
      )}

      {filtersOpen && (
        <div className="modal-overlay" onClick={() => setFiltersOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Filters</h3>
            </div>
            <div className="modal-body">
              <div className="filter-group">
                <label className="filter-label">Search</label>
                <input 
                  className="filter-input" 
                  type="text" 
                  value={filters.query}
                  onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))}
                  placeholder="Search by name"
                />
              </div>
              <div className="filter-group">
                <label className="filter-label">Roles</label>
                <div className="chips">
                  {roleOptions.map((r) => {
                    const active = filters.roles.includes(r);
                    return (
                      <button
                        key={r}
                        className={`chip ${active ? 'active' : ''}`}
                        onClick={() => setFilters((f) => {
                          const set = new Set(f.roles);
                          if (set.has(r)) set.delete(r); else set.add(r);
                          return { ...f, roles: Array.from(set) };
                        })}
                      >{r}</button>
                    );
                  })}
                </div>
              </div>
              <div className="filter-group">
                <label className="filter-label">Units</label>
                <div className="chips">
                  {unitOptions.map((u) => {
                    const active = filters.units.includes(u);
                    return (
                      <button
                        key={u}
                        className={`chip ${active ? 'active' : ''}`}
                        onClick={() => setFilters((f) => {
                          const set = new Set(f.units);
                          if (set.has(u)) set.delete(u); else set.add(u);
                          return { ...f, units: Array.from(set) };
                        })}
                      >{u}</button>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline-secondary" onClick={() => setFilters({ roles: [], units: [], query: '' })}>Clear</button>
              <div style={{ flex: 1 }} />
              <button className="export-btn" onClick={() => setFiltersOpen(false)}>Apply</button>
            </div>
          </div>
        </div>
      )}
      {loginOpen && (
        <div className="modal-overlay" onClick={() => setLoginOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '400px', width: '90vw' }}>
            <div className="modal-header" style={{ textAlign: 'center', paddingBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px' }}>
                <div style={{ 
                  width: '60px', 
                  height: '60px', 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', 
                  borderRadius: '16px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 8px 32px rgba(79, 70, 229, 0.3)',
                  animation: 'pulse 2s infinite',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onClick={handleZorgLogoClick}
                onMouseOver={(e) => e.target.style.transform = 'scale(1.1)'}
                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                >
                  <span style={{ fontSize: '32px', color: '#fff' }}>Z</span>
                </div>
              </div>
              <h3 style={{ margin: 0, fontSize: '24px', fontWeight: '700', color: '#1f2937' }}>Admin Login</h3>
              <p style={{ margin: '8px 0 0 0', fontSize: '14px', color: '#6b7280' }}>OrgZ Payroll System</p>
            </div>
            <div className="modal-body">
              <div className="filter-group">
                <label className="filter-label">Username</label>
                <input 
                  className="filter-input" 
                  type="text" 
                  value={loginForm.username}
                  onChange={(e) => setLoginForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Enter username"
                  style={{ fontSize: '16px', padding: '12px' }}
                />
              </div>
              <div className="filter-group">
                <label className="filter-label">Password</label>
                <input 
                  className="filter-input" 
                  type="password" 
                  value={loginForm.password}
                  onChange={(e) => setLoginForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Enter password"
                  style={{ fontSize: '16px', padding: '12px' }}
                />
              </div>
              <div style={{ 
                marginTop: '16px', 
                padding: '12px', 
                background: '#f0f9ff', 
                border: '1px solid #bae6fd', 
                borderRadius: '8px',
                fontSize: '13px',
                color: '#0369a1',
                textAlign: 'center'
              }}>
                <strong>🔐 Default Credentials:</strong><br/>
                Username: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin</code><br/>
                Password: <code style={{ background: '#fff', padding: '2px 6px', borderRadius: '4px' }}>admin123</code>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline-secondary" onClick={() => setLoginOpen(false)}>Cancel</button>
              <div style={{ flex: 1 }} />
              <button 
                className="btn btn-primary" 
                onClick={handleLogin}
                style={{ 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  border: 'none',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(79, 70, 229, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🔓 Login
              </button>
            </div>
          </div>
        </div>
      )}
      {signupOpen && (
        <div className="modal-overlay" onClick={() => setSignupOpen(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '380px', width: '90vw' }}>
            <div className="modal-header" style={{ textAlign: 'center', paddingBottom: '4px' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
                <div style={{ 
                  width: '40px', 
                  height: '40px', 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', 
                  borderRadius: '12px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  boxShadow: '0 4px 16px rgba(16, 185, 129, 0.3)',
                  animation: 'pulse 2s infinite'
                }}>
                  <span style={{ fontSize: '20px', color: '#fff' }}>+</span>
                </div>
              </div>
              <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '700', color: '#1f2937' }}>Create Account</h3>
              <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#6b7280' }}>Join Z.ORG</p>
            </div>
            <div className="modal-body">
              <div className="filter-group" style={{ marginBottom: '8px' }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Full Name</label>
                <input 
                  className="filter-input" 
                  type="text" 
                  value={signupForm.name}
                  onChange={(e) => setSignupForm((f) => ({ ...f, name: e.target.value }))}
                  placeholder="Enter your full name"
                  style={{ fontSize: '14px', padding: '8px' }}
                />
              </div>
              <div className="filter-group" style={{ marginBottom: '8px' }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Email</label>
                <input 
                  className="filter-input" 
                  type="email" 
                  value={signupForm.email}
                  onChange={(e) => setSignupForm((f) => ({ ...f, email: e.target.value }))}
                  placeholder="Enter your email"
                  style={{ fontSize: '14px', padding: '8px' }}
                />
              </div>
              <div className="filter-group" style={{ marginBottom: '8px' }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Username</label>
                <input 
                  className="filter-input" 
                  type="text" 
                  value={signupForm.username}
                  onChange={(e) => setSignupForm((f) => ({ ...f, username: e.target.value }))}
                  placeholder="Choose a username"
                  style={{ fontSize: '14px', padding: '8px' }}
                />
              </div>
              <div className="filter-group" style={{ marginBottom: '8px' }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Password</label>
                <input 
                  className="filter-input" 
                  type="password" 
                  value={signupForm.password}
                  onChange={(e) => setSignupForm((f) => ({ ...f, password: e.target.value }))}
                  placeholder="Create a password (min 6 chars)"
                  style={{ fontSize: '14px', padding: '8px' }}
                />
              </div>
              <div className="filter-group" style={{ marginBottom: '8px' }}>
                <label className="filter-label" style={{ fontSize: '12px', marginBottom: '4px' }}>Confirm Password</label>
                <input 
                  className="filter-input" 
                  type="password" 
                  value={signupForm.confirmPassword}
                  onChange={(e) => setSignupForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                  placeholder="Confirm your password"
                  style={{ fontSize: '14px', padding: '8px' }}
                />
              </div>
              <div style={{ 
                marginTop: '8px', 
                padding: '8px', 
                background: '#f0fdf4', 
                border: '1px solid #bbf7d0', 
                borderRadius: '6px',
                fontSize: '11px',
                color: '#166534',
                textAlign: 'center'
              }}>
                <strong>✨ Join our team!</strong><br/>
                Create your account to access the system.
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-outline-secondary" onClick={() => setSignupOpen(false)}>Cancel</button>
              <div style={{ flex: 1 }} />
              <button 
                className="btn btn-primary" 
                onClick={handleSignup}
                style={{ 
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  border: 'none',
                  padding: '12px 24px',
                  fontSize: '16px',
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  transition: 'all 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
                onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
              >
                🚀 Sign Up
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

