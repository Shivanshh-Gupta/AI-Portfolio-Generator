import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../styles/ProfileDashboard.css';

const ProfileDashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, [id]);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(
        `http://localhost:5000/api/user/profile/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setProfile(response.data);
      setFormData({ name: response.data.user.name, email: response.data.user.email });
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:5000/api/user/profile/update/${id}`,
        formData,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setIsEditing(false);
      fetchProfile();
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-dashboard">
      <div className="profile-container">
        <div className="profile-header">
          <h1>My Profile</h1>
          <button
            className="edit-btn"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        {profile && (
          <>
            <div className="profile-info">
              {isEditing ? (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Name:</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label>Email:</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </div>
                  <button className="save-btn" onClick={handleUpdateProfile}>
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="profile-details">
                  <div className="detail-item">
                    <span className="label">Name:</span>
                    <span className="value">{profile.user.name}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Email:</span>
                    <span className="value">{profile.user.email}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Member Since:</span>
                    <span className="value">
                      {new Date(profile.user.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="portfolios-section">
              <div className="section-header">
                <h2>My Portfolios ({profile.totalPortfolios})</h2>
                <button
                  className="create-btn"
                  onClick={() => navigate('/portfolio/create')}
                >
                  + Create Portfolio
                </button>
              </div>

              {profile.portfolios.length > 0 ? (
                <div className="portfolios-grid">
                  {profile.portfolios.map((portfolio) => (
                    <div key={portfolio._id} className="portfolio-card">
                      <h3>{portfolio.title}</h3>
                      <p>{portfolio.description}</p>
                      <div className="card-footer">
                        <span className="date">
                          {new Date(portfolio.createdAt).toLocaleDateString()}
                        </span>
                        <div className="card-actions">
                          <button
                            className="view-btn"
                            onClick={() => navigate(`/portfolio/${portfolio._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="edit-btn-small"
                            onClick={() => navigate(`/portfolio/edit/${portfolio._id}`)}
                          >
                            Edit
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <p>No portfolios yet. Create one to get started!</p>
                  <button
                    className="create-btn-large"
                    onClick={() => navigate('/portfolio/create')}
                  >
                    Create Your First Portfolio
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfileDashboard;
