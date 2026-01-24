# How to Use Profile Settings & Feedback

## Accessing the Features

### 1. Open Profile Menu
- Look for your profile button in the top-right corner (shows your name initial in a circle)
- Click on it to open the dropdown menu

### 2. Available Options

#### 🔐 Change Password
- Opens a modal to change your password
- Requires current password
- New password must be at least 6 characters

#### ⚙️ Settings
**What you'll see:**
- **Appearance Section**: 
  - Three theme cards: ☀️ Light, 🌙 Dark, 🌓 Auto
  - Click any card to select that theme
  - Selected theme will be highlighted with purple gradient
  
- **Notifications Section**:
  - Toggle switch for email notifications
  - Turn on/off to receive updates about portfolios and features
  
- **Account Section**:
  - Displays your registered email (read-only)

**How to use:**
1. Click on Settings from profile dropdown
2. Select your preferred theme (Light/Dark/Auto)
3. Toggle email notifications if desired
4. Click "Save Changes" button
5. Your preferences will be saved and applied immediately

#### 💬 Help & Feedback
**What you'll see:**
- **Quick Help Section** (top):
  - 📖 How to generate
  - 🎨 Customize themes
  - 💾 Save & share
  - ❓ FAQ
  
- **Feedback Form** (bottom):
  - **Type dropdown**: Choose from:
    - General Feedback
    - Report a Bug
    - Feature Request
    - Need Help
  - **Subject field**: Brief description
  - **Message field**: Detailed message (5 rows)
  - **Send Feedback button**: Submit your feedback

**How to use:**
1. Click on Help & Feedback from profile dropdown
2. Browse quick help topics OR
3. Fill out the feedback form:
   - Select feedback type
   - Enter subject
   - Write your message
4. Click "Send Feedback"
5. You'll see a success message

#### 🚪 Logout
- Clears your session and returns to login page

## Visual Guide

```
Profile Button (Top Right)
    ↓ (Click)
Dropdown Menu:
┌─────────────────────────┐
│  [Avatar] Your Name     │
│  your.email@gmail.com   │
├─────────────────────────┤
│ 🔐 Change Password      │
│ ⚙️  Settings            │ ← Click this for theme settings
│ 💬 Help & Feedback      │ ← Click this for feedback form
├─────────────────────────┤
│ 🚪 Logout               │
└─────────────────────────┘
```

## Settings Modal Layout

```
⚙️ Settings                                    ✕
─────────────────────────────────────────────────
Appearance
┌────────┐  ┌────────┐  ┌────────┐
│  ☀️    │  │  🌙    │  │  🌓    │
│ Light  │  │  Dark  │  │  Auto  │
└────────┘  └────────┘  └────────┘

Notifications
[Toggle] Email Notifications
Receive updates about your portfolios and new features

Account
Email: [your.email@gmail.com] (disabled)

─────────────────────────────────────────────────
[Cancel]              [Save Changes]
```

## Help & Feedback Modal Layout

```
💬 Help & Feedback                             ✕
─────────────────────────────────────────────────
📚 Quick Help
┌──────────────┐  ┌──────────────┐
│ 📖 How to    │  │ 🎨 Customize │
│   generate   │  │    themes    │
└──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│ 💾 Save &    │  │ ❓ FAQ       │
│    share     │  │              │
└──────────────┘  └──────────────┘

─────────────────────────────────────────────────
Send us your feedback

Type
[General Feedback ▼]

Subject
[Brief description...]

Message
[Tell us more...
 (5 lines)
]

[Cancel]              [Send Feedback]
```

## Troubleshooting

### Settings not saving?
- Make sure you click "Save Changes" button
- Check browser console for errors
- Ensure backend server is running on port 5000

### Feedback not submitting?
- Fill in all required fields (Type, Subject, Message)
- Check internet connection
- Verify backend server is running

### Theme not changing?
- Theme changes apply to the app's overall appearance
- Portfolio themes are separate (selected in the main page)
- Try refreshing the page after saving

## Backend Requirements

Make sure your backend server is running:
```bash
cd backend
npm start
```

Server should be running on `http://localhost:5000`

Required API endpoints (already implemented):
- GET `/api/user/profile`
- PUT `/api/user/preferences`
- PUT `/api/user/change-password`
- POST `/api/user/feedback`
