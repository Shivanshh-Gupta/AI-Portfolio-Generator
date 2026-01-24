# 🚀 Share Feature - Developer Quick Reference

## API Endpoints Cheat Sheet

### Share Portfolio
```bash
POST /api/portfolio/share/:id
Headers: Authorization: Bearer <token>
Response: { shareUrl, shareToken, message }
```

### Unshare Portfolio
```bash
POST /api/portfolio/unshare/:id
Headers: Authorization: Bearer <token>
Response: { message }
```

### Get Shared Portfolio (Public)
```bash
GET /api/portfolio/shared/:token
No auth required
Response: { portfolio object }
```

---

## Database Schema Quick Ref

```javascript
Portfolio Schema:
├── isPublic: Boolean (default: false)
├── shareToken: String (unique, sparse)
└── shareCount: Number (default: 0)
```

---

## Frontend Functions

```javascript
// Share a portfolio
sharePortfolio(portfolioId)

// Unshare a portfolio
unsharePortfolio(portfolioId)

// Copy share link
copyShareLink()

// Share current active portfolio
shareCurrentPortfolio()
```

---

## State Variables

```javascript
const [showShareModal, setShowShareModal] = useState(false)
const [shareUrl, setShareUrl] = useState("")
const [currentSharePortfolio, setCurrentSharePortfolio] = useState(null)
```

---

## Routes

```
Frontend Routes:
├── /image                    # Main generator (with share controls)
└── /shared/[token]          # Public portfolio viewer

Backend Routes:
├── POST /api/portfolio/share/:id      # Make public
├── POST /api/portfolio/unshare/:id    # Make private
└── GET /api/portfolio/shared/:token   # View public
```

---

## UI Components Location

```
Share Button:
- Location: frontend/src/app/image/page.jsx
- Line: ~411-417

Share Modal:
- Location: frontend/src/app/image/page.jsx
- Line: ~490-533

Portfolio List (with share buttons):
- Location: frontend/src/app/image/page.jsx
- Line: ~533-560

Public Viewer:
- Location: frontend/src/app/shared/[token]/page.jsx
```

---

## Color Scheme

```css
Share Elements:
- Share Button: from-cyan-500 to-blue-500
- Unshare Button: bg-orange-500/80
- Share Modal Border: border-cyan-500/30
- Public Badge: text-cyan-400
```

---

## Testing URLs

```bash
# Local Development
Frontend: http://localhost:3000
Backend: http://localhost:5000
Share Link: http://localhost:3000/shared/<token>

# API Testing
curl http://localhost:5000/api/portfolio/shared/<token>
```

---

## Common Code Snippets

### Generate Share Token (Backend)
```javascript
const crypto = require('crypto');
portfolio.shareToken = crypto.randomBytes(16).toString('hex');
portfolio.isPublic = true;
await portfolio.save();
```

### Fetch Shared Portfolio (Frontend)
```javascript
const res = await fetch(`http://localhost:5000/api/portfolio/shared/${token}`)
const data = await res.json()
```

### Copy to Clipboard
```javascript
navigator.clipboard.writeText(shareUrl)
alert("Share link copied to clipboard!")
```

---

## Error Codes

```
401 - Unauthorized (no token or invalid token)
403 - Forbidden (not portfolio owner)
404 - Portfolio not found or not public
500 - Server error
```

---

## Environment Variables

```bash
# Backend
PORT=5000
JWT_SECRET=your_secret_key
MONGODB_URI=your_mongodb_connection

# Frontend
NEXT_PUBLIC_API_URL=http://localhost:5000
```

---

## File Modifications Summary

```
Modified:
✓ backend/models/portfolioModel.js       (+13 lines)
✓ backend/routers/portfolioRouter.js     (+83 lines)
✓ frontend/src/app/image/page.jsx        (+120 lines)

Created:
✓ frontend/src/app/shared/[token]/page.jsx
✓ .agent/SHARE_FEATURE_IMPLEMENTATION.md
✓ .agent/SHARE_FEATURE_USER_GUIDE.md
✓ .agent/SHARE_FEATURE_TESTING.md
✓ .agent/README_SHARE_FEATURE.md
```

---

## Quick Debug Commands

```bash
# Check MongoDB for shared portfolios
db.portfolios.find({ isPublic: true })

# Count public portfolios
db.portfolios.countDocuments({ isPublic: true })

# Find portfolio by token
db.portfolios.findOne({ shareToken: "abc123..." })

# Check view counts
db.portfolios.find({}, { title: 1, shareCount: 1, isPublic: 1 })
```

---

## Browser Console Debugging

```javascript
// Check if share URL is set
console.log(shareUrl)

// Check current portfolio ID
console.log(currentPortfolioId)

// Test clipboard API
navigator.clipboard.writeText("test").then(() => console.log("Clipboard works!"))

// Check localStorage token
console.log(localStorage.getItem("token"))
```

---

## Performance Tips

```javascript
// Add database index for faster queries
db.portfolios.createIndex({ shareToken: 1 }, { unique: true, sparse: true })
db.portfolios.createIndex({ userId: 1, isPublic: 1 })

// Optimize frontend re-renders
React.memo() for PortfolioPreview component
useMemo() for expensive calculations
```

---

## Security Checklist

- [x] Share tokens are cryptographically secure
- [x] Only owners can share/unshare
- [x] Public endpoint has no sensitive data
- [x] Authorization middleware on protected routes
- [x] Input validation on all endpoints
- [x] Private portfolios not accessible via token

---

## Deployment Notes

```bash
# Production considerations:
1. Use HTTPS for share links
2. Set proper CORS origins
3. Use environment variables
4. Enable rate limiting
5. Add monitoring/logging
6. Set up database backups
```

---

## Useful MongoDB Queries

```javascript
// Get all public portfolios
db.portfolios.find({ isPublic: true })

// Get portfolios with most views
db.portfolios.find({ isPublic: true }).sort({ shareCount: -1 })

// Reset share count (testing)
db.portfolios.updateMany({}, { $set: { shareCount: 0 } })

// Remove all share tokens (testing)
db.portfolios.updateMany({}, { $unset: { shareToken: "" }, $set: { isPublic: false } })
```

---

## Git Commit Messages

```bash
# Example commit messages for this feature:
git commit -m "feat: add portfolio sharing functionality"
git commit -m "feat: add share/unshare endpoints to backend"
git commit -m "feat: create public portfolio viewer page"
git commit -m "feat: add share modal and UI controls"
git commit -m "docs: add comprehensive share feature documentation"
```

---

## VS Code Snippets

```json
{
  "Share Portfolio Function": {
    "prefix": "sharePortfolio",
    "body": [
      "const sharePortfolio = async (portfolioId) => {",
      "  try {",
      "    const res = await fetch(`http://localhost:5000/api/portfolio/share/${portfolioId}`, {",
      "      method: 'POST',",
      "      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }",
      "    })",
      "    const data = await res.json()",
      "    if (res.ok) {",
      "      setShareUrl(data.shareUrl)",
      "      setShowShareModal(true)",
      "    }",
      "  } catch (error) {",
      "    console.error(error)",
      "  }",
      "}"
    ]
  }
}
```

---

## Testing Shortcuts

```bash
# Quick test: Share a portfolio
curl -X POST http://localhost:5000/api/portfolio/share/PORTFOLIO_ID \
  -H "Authorization: Bearer TOKEN"

# Quick test: Get shared portfolio
curl http://localhost:5000/api/portfolio/shared/TOKEN

# Quick test: Unshare
curl -X POST http://localhost:5000/api/portfolio/unshare/PORTFOLIO_ID \
  -H "Authorization: Bearer TOKEN"
```

---

## Keyboard Shortcuts (Suggested)

```
Ctrl/Cmd + Shift + S  - Open share modal
Ctrl/Cmd + C          - Copy share link (when modal open)
Esc                   - Close share modal
```

---

## Browser DevTools Network Tab

```
Look for these requests:
- POST /api/portfolio/share/:id
- POST /api/portfolio/unshare/:id
- GET /api/portfolio/shared/:token

Check:
✓ Status codes (200, 401, 403, 404)
✓ Response payloads
✓ Request headers (Authorization)
✓ Response times
```

---

## Common Gotchas

1. **Token not in localStorage**
   - User needs to login first

2. **CORS errors**
   - Check backend CORS configuration

3. **Share link 404**
   - Verify Next.js dynamic route: `[token]`

4. **View count not updating**
   - Check if `portfolio.save()` is called

5. **Share button not showing**
   - Ensure `currentPortfolioId` is set after save

---

## Quick Links

- [Implementation Doc](./.agent/SHARE_FEATURE_IMPLEMENTATION.md)
- [User Guide](./.agent/SHARE_FEATURE_USER_GUIDE.md)
- [Testing Guide](./.agent/SHARE_FEATURE_TESTING.md)
- [Full README](./.agent/README_SHARE_FEATURE.md)

---

**Keep this handy for quick reference! 📌**
