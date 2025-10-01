"use client";

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './dashboard.module.css';
import ServicesManager from './ServicesManager';

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
    { id: 'settings', label: 'Settings', icon: '⚙️' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className={styles.overview}>
            <h2>Dashboard Overview</h2>
            <div className={styles.statsGrid}>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🎨</div>
                <div className={styles.statInfo}>
                  <h3>Services</h3>
                  <p className={styles.statNumber}>12</p>
                  <p className={styles.statLabel}>Active</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>💼</div>
                <div className={styles.statInfo}>
                  <h3>Portfolio Items</h3>
                  <p className={styles.statNumber}>24</p>
                  <p className={styles.statLabel}>Projects</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>�</div>
                <div className={styles.statInfo}>
                  <h3>Blog Posts</h3>
                  <p className={styles.statNumber}>8</p>
                  <p className={styles.statLabel}>Published</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>�</div>
                <div className={styles.statInfo}>
                  <h3>Clients</h3>
                  <p className={styles.statNumber}>65</p>
                  <p className={styles.statLabel}>Total</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'services':
        return <ServicesManager />;
      case 'portfolio':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Portfolio Management</h2>
              <button className={styles.primaryButton}>Add New Project</button>
            </div>
            <div className={styles.placeholder}>
              <p>Portfolio content - Videos, client projects, showcases, and project galleries</p>
            </div>
          </div>
        );
      case 'blog':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Blog Management</h2>
              <button className={styles.primaryButton}>Add New Post</button>
            </div>
            <div className={styles.placeholder}>
              <p>Blog post creation, editing, and content management</p>
            </div>
          </div>
        );
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