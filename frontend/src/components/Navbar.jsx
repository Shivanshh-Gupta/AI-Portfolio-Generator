"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./Navbar.css";

const HIDDEN_ROUTES = ["/login", "/signup"];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef(null);

  // Hide navbar only on login & signup
  if (HIDDEN_ROUTES.includes(pathname)) return null;

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const user = localStorage.getItem("user");

      if (token && user) {
        try {
          const userData = JSON.parse(user);
          setIsLoggedIn(true);
          setUserId(userData.id);
          setUserName(userData.name);
          setUserEmail(userData.email);
        } catch (err) {
          console.log("Invalid user data");
        }
      }
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setShowDropdown(false);
    router.push("/");
  };

  const handleProfileClick = () => {
    if (userId) {
      router.push(`/profile/${userId}`);
      setShowDropdown(false);
    }
  };

  return (
    <>
      <nav className="ngf-navbar">
        <div className="ngf-container">
          <Link href="/" className="ngf-logo">
            🚀 NextgenFolio AI
          </Link>

          <div className="ngf-links">
            <Link href="/" className="ngf-link">
              Home
            </Link>

            {isLoggedIn ? (
              <div className="ngf-user" ref={dropdownRef}>
                <button
                  className="ngf-user-btn"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  <span className="ngf-avatar">
                    {userName?.charAt(0)?.toUpperCase()}
                  </span>
                  <span>{userName}</span>
                  <span className={`dropdown-arrow ${showDropdown ? 'open' : ''}`}>▼</span>
                </button>

                {showDropdown && (
                  <div className="ngf-dropdown animate-slide-down">
                    <div className="dropdown-header">
                      <div className="user-info">
                        <div className="user-avatar-large">
                          {userName?.charAt(0)?.toUpperCase()}
                        </div>
                        <div className="user-details">
                          <div className="user-name">{userName}</div>
                          <div className="user-email">{userEmail}</div>
                        </div>
                      </div>
                    </div>

                    <div className="dropdown-divider"></div>

                    <button onClick={handleProfileClick} className="dropdown-item">
                      <span className="dropdown-icon">📊</span>
                      <span>Profile Dashboard</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowPasswordModal(true);
                        setShowDropdown(false);
                      }}
                      className="dropdown-item"
                    >
                      <span className="dropdown-icon">🔐</span>
                      <span>Change Password</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowSettingsModal(true);
                        setShowDropdown(false);
                      }}
                      className="dropdown-item"
                    >
                      <span className="dropdown-icon">⚙️</span>
                      <span>Settings</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowFeedbackModal(true);
                        setShowDropdown(false);
                      }}
                      className="dropdown-item"
                    >
                      <span className="dropdown-icon">💬</span>
                      <span>Help & Feedback</span>
                    </button>

                    <div className="dropdown-divider"></div>

                    <button onClick={handleLogout} className="dropdown-item logout">
                      <span className="dropdown-icon">🚪</span>
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="ngf-auth">
                <Link href="/login" className="btn-outline">
                  Login
                </Link>
                <Link href="/signup" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>

      {/* Settings Modal */}
      {showSettingsModal && (
        <SettingsModal
          onClose={() => setShowSettingsModal(false)}
          userEmail={userEmail}
        />
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <ChangePasswordModal
          onClose={() => setShowPasswordModal(false)}
        />
      )}

      {/* Feedback Modal */}
      {showFeedbackModal && (
        <FeedbackModal
          onClose={() => setShowFeedbackModal(false)}
        />
      )}
    </>
  );
};

// Settings Modal Component
const SettingsModal = ({ onClose, userEmail }) => {
  const [theme, setTheme] = useState('light');
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Load user preferences
    const loadPreferences = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch('http://localhost:5000/api/user/profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (res.ok) {
          const data = await res.json();
          setTheme(data.preferences?.theme || 'light');
          setEmailNotifications(data.preferences?.emailNotifications ?? true);
        }
      } catch (error) {
        console.error('Error loading preferences:', error);
      }
    };

    loadPreferences();
  }, []);

  useEffect(() => {
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('app-theme', theme);
  }, [theme]);

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/preferences', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ theme, emailNotifications })
      });

      if (res.ok) {
        alert('Settings saved successfully!');
        onClose();
      } else {
        alert('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>⚙️ Settings</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="settings-section">
            <h3>Appearance</h3>
            <div className="setting-item">
              <label>Theme</label>
              <div className="theme-selector">
                <button
                  className={`theme-option ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                >
                  <span className="theme-icon">☀️</span>
                  <span>Light</span>
                </button>
                <button
                  className={`theme-option ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                >
                  <span className="theme-icon">🌙</span>
                  <span>Dark</span>
                </button>
                <button
                  className={`theme-option ${theme === 'auto' ? 'active' : ''}`}
                  onClick={() => setTheme('auto')}
                >
                  <span className="theme-icon">🌓</span>
                  <span>Auto</span>
                </button>
              </div>
            </div>
          </div>

          <div className="settings-section">
            <h3>Notifications</h3>
            <div className="setting-item">
              <label className="toggle-label">
                <input
                  type="checkbox"
                  checked={emailNotifications}
                  onChange={(e) => setEmailNotifications(e.target.checked)}
                />
                <span className="toggle-slider"></span>
                <span>Email Notifications</span>
              </label>
              <p className="setting-description">
                Receive updates about your portfolios and new features
              </p>
            </div>
          </div>

          <div className="settings-section">
            <h3>Account</h3>
            <div className="setting-item">
              <label>Email</label>
              <input type="text" value={userEmail} disabled className="disabled-input" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn-secondary" onClick={onClose}>Cancel</button>
          <button className="btn-primary" onClick={handleSave} disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>
    </div>
  );
};

// Change Password Modal Component
const ChangePasswordModal = ({ onClose }) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (newPassword !== confirmPassword) {
      setError('New passwords do not match');
      return;
    }

    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/change-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ currentPassword, newPassword })
      });

      const data = await res.json();

      if (res.ok) {
        alert('Password changed successfully!');
        onClose();
      } else {
        setError(data.message || 'Failed to change password');
      }
    } catch (error) {
      console.error('Error changing password:', error);
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>🔐 Change Password</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            {error && <div className="error-message">{error}</div>}

            <div className="form-group">
              <label>Current Password</label>
              <input
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                required
                placeholder="Enter current password"
              />
            </div>

            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>

            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Changing...' : 'Change Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Feedback Modal Component
const FeedbackModal = ({ onClose }) => {
  const [feedbackType, setFeedbackType] = useState('feedback');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/user/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ subject, message, type: feedbackType })
      });

      if (res.ok) {
        alert('Thank you for your feedback!');
        onClose();
      } else {
        alert('Failed to submit feedback');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Failed to submit feedback');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay animate-fade-in" onClick={onClose}>
      <div className="modal-content animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💬 Help & Feedback</h2>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="help-section">
              <h3>📚 Quick Help</h3>
              <div className="help-links">
                <a href="#" className="help-link">
                  <span>📖</span> How to generate a portfolio
                </a>
                <a href="#" className="help-link">
                  <span>🎨</span> Customizing themes
                </a>
                <a href="#" className="help-link">
                  <span>💾</span> Saving and sharing portfolios
                </a>
                <a href="#" className="help-link">
                  <span>❓</span> FAQ
                </a>
              </div>
            </div>

            <div className="feedback-section">
              <h3>Send us your feedback</h3>

              <div className="form-group">
                <label>Type</label>
                <select value={feedbackType} onChange={(e) => setFeedbackType(e.target.value)}>
                  <option value="feedback">General Feedback</option>
                  <option value="bug">Report a Bug</option>
                  <option value="feature">Feature Request</option>
                  <option value="help">Need Help</option>
                </select>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                  placeholder="Brief description"
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={5}
                  placeholder="Tell us more..."
                />
              </div>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Sending...' : 'Send Feedback'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Navbar;
