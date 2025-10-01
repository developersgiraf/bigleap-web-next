"use client";

import { useState } from 'react';
import { useAuth } from '../../../../contexts/AuthContext';
import styles from './dashboard.module.css';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const handleLogout = async () => {
    await logout();
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: '📊' },
    { id: 'blogs', label: 'Blog Posts', icon: '📝' },
    { id: 'portfolio', label: 'Portfolio', icon: '🎨' },
    { id: 'content', label: 'Website Content', icon: '🌐' },
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
                <div className={styles.statIcon}>📝</div>
                <div className={styles.statInfo}>
                  <h3>Blog Posts</h3>
                  <p className={styles.statNumber}>12</p>
                  <p className={styles.statLabel}>Published</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>🎨</div>
                <div className={styles.statInfo}>
                  <h3>Portfolio Items</h3>
                  <p className={styles.statNumber}>24</p>
                  <p className={styles.statLabel}>Projects</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>👥</div>
                <div className={styles.statInfo}>
                  <h3>Page Views</h3>
                  <p className={styles.statNumber}>1,234</p>
                  <p className={styles.statLabel}>This month</p>
                </div>
              </div>
              <div className={styles.statCard}>
                <div className={styles.statIcon}>📧</div>
                <div className={styles.statInfo}>
                  <h3>Inquiries</h3>
                  <p className={styles.statNumber}>56</p>
                  <p className={styles.statLabel}>Pending</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'blogs':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Blog Management</h2>
              <button className={styles.primaryButton}>Add New Post</button>
            </div>
            <div className={styles.placeholder}>
              <p>Blog management interface will be implemented here</p>
            </div>
          </div>
        );
      case 'portfolio':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Portfolio Management</h2>
              <button className={styles.primaryButton}>Add New Project</button>
            </div>
            <div className={styles.placeholder}>
              <p>Portfolio management interface will be implemented here</p>
            </div>
          </div>
        );
      case 'content':
        return (
          <div className={styles.section}>
            <div className={styles.sectionHeader}>
              <h2>Website Content</h2>
              <button className={styles.primaryButton}>Edit Content</button>
            </div>
            <div className={styles.placeholder}>
              <p>Website content management interface will be implemented here</p>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className={styles.section}>
            <h2>Settings</h2>
            <div className={styles.placeholder}>
              <p>Settings interface will be implemented here</p>
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