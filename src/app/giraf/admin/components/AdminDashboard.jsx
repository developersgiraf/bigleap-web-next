"use client";

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './dashboard.module.css';
import ServicesManager from './services/ServicesManager';
import BlogManager from './blog/BlogManager';
import PortfolioManager from './portfolio/PortfolioManager';
import DatabaseManager from './database/DatabaseManager';
import StatCard from './subComponents/statCard/StatCard';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'services', label: 'Services', icon: '🎨' },
    { id: 'portfolio', label: 'Portfolio', icon: '💼' },
    { id: 'blog', label: 'Blog', icon: '📝' },
    { id: 'clients', label: 'Clients', icon: '👥' },
    { id: 'database', label: 'Database', icon: '🗄️' },
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.overview}>
            <h2>Dashboard Overview</h2>
            <div className={styles.statsGrid}>
              <StatCard icon="🎨" title="Services" number={12} label="Active" />
              <StatCard icon="💼" title="Portfolio Items" number={24} label="Projects" />
              <StatCard icon="📝" title="Blog Posts" number={8} label="Published" />
              <StatCard icon="👥" title="Clients" number={65} label="Total" />
            </div>
          </div>
        );
      case 'services':
        return <ServicesManager />;
      case 'portfolio':
        return <PortfolioManager />;
      case 'blog':
        return <BlogManager />;
      case 'clients':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Clients & Testimonials</h2>
              <button className={styles.primaryButton}>Add New Client</button>
            </div>
            <div className={styles.placeholder}>
              <p>Client information, logos, testimonials, and team member profiles</p>
            </div>
          </div>
        );
      case 'database':
        return <DatabaseManager />;
      case 'settings':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Site Settings</h2>
              <button className={styles.primaryButton}>Update Settings</button>
            </div>
            <div className={styles.placeholder}>
              <p>Counter statistics, company info, contact details, and configuration</p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={styles.dashboard}>
      {/* Desktop Sidebar */}
      <div className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h1>BigLeap Admin</h1>
          <p>Welcome, {user?.email}</p>
        </div>
        
        <nav className={styles.navigation}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.navItem} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.navIcon}>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
        
        <div className={styles.sidebarFooter}>
          <div className={styles.userInfo}>
            <p>👤 {user?.displayName || user?.email}</p>
          </div>
          
          {/* Main logout button */}
          <button onClick={handleLogout} className={styles.logoutButton}>
            🚪 LOGOUT
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        {renderContent()}
      </div>

      {/* Mobile Tab Bar */}
      <div className={styles.mobileTabBar}>
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`${styles.mobileTabItem} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            <span className={styles.mobileTabIcon}>{tab.icon}</span>
            <span className={styles.mobileTabLabel}>{tab.label.split(' ')[0]}</span>
          </button>
        ))}
        <button
          className={styles.mobileTabItem}
          onClick={handleLogout}
          title="Logout"
        >
          <span className={styles.mobileTabIcon}>🚪</span>
          <span className={styles.mobileTabLabel}>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;