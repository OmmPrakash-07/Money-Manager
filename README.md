# 💰 Money Manager - Progressive Web App

<div align="center">

[![GitHub Stars](https://img.shields.io/github/stars/OmmPrakash-07/Money-Manager?style=flat-square&logo=github)](https://github.com/OmmPrakash-07/Money-Manager)
[![GitHub Forks](https://img.shields.io/github/forks/OmmPrakash-07/Money-Manager?style=flat-square&logo=github)](https://github.com/OmmPrakash-07/Money-Manager/fork)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?style=flat-square&logo=javascript)](https://javascript.info/)

**A lightweight, privacy-first Progressive Web App for managing expenses, budgets, and financial insights**

[🌐 Live Demo](#-live-demo) • [📖 Documentation](#-table-of-contents) • [🚀 Quick Start](#-quick-start) • [💻 Technologies](#-technology-stack)

</div>

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Live Demo](#-live-demo)
- [Quick Start](#-quick-start)
- [Installation](#-installation)
- [Usage Guide](#-usage-guide)
- [Project Structure](#-project-structure)
- [Technology Stack](#-technology-stack)
- [Configuration](#-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributing](#-contributing)
- [License](#-license)
- [Support](#-support)

---

## 🎯 Overview

**Money Manager** is a modern, responsive Progressive Web App designed to empower users with complete control over their finances. Whether you're a student tracking daily expenses, a freelancer managing projects, or someone looking to optimize spending habits, Money Manager provides an intuitive, offline-capable solution.

### Why Money Manager?

✨ **Privacy-Centric**: All your financial data stays on your device  
⚡ **Lightning-Fast**: Vanilla JavaScript means zero dependencies and maximum performance  
📱 **Truly Offline**: Full functionality without internet connectivity  
🎨 **Beautiful UI**: Clean, modern interface with dark mode support  
📊 **Insightful**: Visual budget tracking and transaction analysis  
🔧 **Easy to Deploy**: Simple HTML/CSS/JS — deploy anywhere  

---

## ✨ Features

### 💳 Core Financial Features

#### Expense Tracking
- ✅ Quick transaction logging with amount, category, and notes
- ✅ Multiple predefined categories (Food, Transport, Entertainment, Shopping, Bills, Others)
- ✅ Add, edit, and delete transactions with ease
- ✅ Automatic timestamping for each transaction
- ✅ Real-time expense calculations and balance updates
- ✅ Transaction history with date-based organization

#### Budget Management
- ✅ Create and customize budget limits
- ✅ Visual progress indicators showing budget vs. actual spending
- ✅ Real-time budget status tracking
- ✅ Alert system for approaching/exceeding budgets
- ✅ Monthly budget overviews with detailed breakdowns
- ✅ Flexible budget periods (monthly, custom ranges)

#### Data Insights
- ✅ Category-wise spending analysis
- ✅ Total expense calculations
- ✅ Period-based financial summaries
- ✅ Visual representations of spending patterns
- ✅ Monthly comparison and trend analysis

### 🎨 User Experience Features

#### Dark Mode
- 🌙 Eye-friendly dark theme for night usage
- ☀️ Automatic theme persistence
- 🎯 Smooth transitions between themes
- 🔄 Toggle available from any page

#### Progressive Web App Capabilities
- 📲 Install as a native mobile app
- 🏠 Add to home screen with custom icon
- 🌐 Works perfectly offline
- ⚡ Near-instant loading times
- 🔄 Automatic service worker updates
- 📦 Small app size (minimal storage usage)

### 💾 Data Management

#### Local Storage
- 🔒 Browser-based encryption with localStorage/IndexedDB
- 💯 100% data ownership — no cloud sync
- 🛡️ GDPR compliant (no external data transfers)
- 📊 Supports thousands of transactions
- ⚙️ Automatic data persistence across sessions

#### Export & Reporting
- 📄 Generate PDF reports of transaction history
- 🖨️ Print-friendly formatting
- 📅 Custom date range selection
- 📋 Professional document layouts
- 📊 Summary statistics and insights
- 💾 Backup your data anytime

---

## 🌐 Live Demo

Experience Money Manager instantly without installation:

**[🔗 money-manager-tan.vercel.app](https://money-manager-tan.vercel.app)**

### Demo Credentials
- No login required
- Pre-populated sample data available
- Test all features freely
- Your data is isolated to this session

---

## 🚀 Quick Start

### Option 1: Use the Web App (Easiest)
```bash
1. Visit https://money-manager-tan.vercel.app
2. Start adding expenses immediately
3. (Optional) Install as an app on your device
```

### Option 2: Install as Mobile App

#### 📱 Android
```
1. Open in Chrome/Firefox
2. Tap menu (⋮) → "Add to Home Screen"
3. Confirm installation
4. App appears on home screen
```

#### 🍎 iOS
```
1. Open in Safari
2. Tap Share → "Add to Home Screen"
3. Enter app name and confirm
4. App ready to use from home screen
```

#### 💻 Desktop
```
1. Visit the web app
2. Click install icon in address bar
3. Confirm installation
4. App added to applications menu
```

### Option 3: Run Locally (Development)
```bash
# Clone the repository
git clone https://github.com/OmmPrakash-07/Money-Manager.git
cd Money-Manager

# Start a local server
python -m http.server 8000
# OR
npx http-server

# Open browser to http://localhost:8000
```

---

## 📦 Installation

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Internet connection (only for first load)
- ~5MB storage space on device

### Installation Methods

#### Method 1: Cloud-Hosted (Recommended)
No installation required. Just visit the live demo link and start using!

#### Method 2: Self-Hosted Deployment

**Deploy to Vercel (Recommended)**
```bash
# Clone repository
git clone https://github.com/OmmPrakash-07/Money-Manager.git

# Push to your GitHub
git push origin main

# Connect to Vercel
# Vercel auto-deploys on push
```

**Deploy to Netlify**
```bash
# Drag and drop the project folder to Netlify
# Or connect your GitHub repo for auto-deployment
```

**Deploy to GitHub Pages**
```bash
# Push to gh-pages branch
git push origin gh-pages
# Access at: https://yourusername.github.io/Money-Manager
```

#### Method 3: Local Development Server

**Using Python**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000

# Visit: http://localhost:8000
```

**Using Node.js**
```bash
# Install http-server globally
npm install -g http-server

# Start server
http-server

# Visit: http://localhost:8080
```

**Using VS Code Live Server**
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"
4. Browser opens automatically

---

## 📖 Usage Guide

### Getting Started

#### 1️⃣ First Launch
- App opens with welcome screen
- No login or setup required
- Your data is ready to be created

#### 2️⃣ Adding Your First Expense

**Step-by-Step:**
```
1. Click "Add Expense" button
2. Enter amount (e.g., 50)
3. Select category from dropdown
4. (Optional) Add description/notes
5. Click "Add Expense"
6. Transaction appears in list immediately
```

**Example Transactions:**
```
- Lunch at café: ₹250 [Food]
- Uber ride: ₹180 [Transport]
- Movie ticket: ₹400 [Entertainment]
- Grocery shopping: ₹1200 [Shopping]
```

#### 3️⃣ Setting Your Budget

**Create a Budget:**
```
1. Navigate to "Budget" section
2. Click "Set Monthly Budget"
3. Enter your target amount (e.g., ₹5000)
4. Click "Save Budget"
5. Progress bar shows spending vs. budget
```

**Monitor Progress:**
- Green: ✅ Under budget
- Yellow: ⚠️ Approaching limit
- Red: ❌ Exceeded budget

#### 4️⃣ Viewing Transactions

**Features:**
- View all transactions in chronological order
- Click any transaction to edit or delete
- Filter by category or date range
- Search by amount or description
- Sort by date or amount

#### 5️⃣ Using Dark Mode

**Toggle Theme:**
```
1. Look for moon/sun icon in header
2. Click to switch theme
3. Preference auto-saves
4. Applies instantly
```

#### 6️⃣ Exporting Data

**Generate PDF Report:**
```
1. Go to "Reports" or "Export" section
2. Select date range (optional)
3. Click "Download PDF"
4. PDF generates and downloads
5. Open with any PDF viewer
```

**Print Transactions:**
```
1. Select transactions to print
2. Click "Print"
3. Preview appears
4. Customize and print using browser options
```

---

## 🛠️ Project Structure

```
Money-Manager/
│
├── index.html                 # Main HTML file
│   ├── Header with logo
│   ├── Navigation menu
│   ├── Main application interface
│   └── Footer with credits
│
├── style.css                  # Complete styling
│   ├── Base styles and variables
│   ├── Dark mode styles
│   ├── Responsive design (mobile, tablet, desktop)
│   ├── Animations and transitions
│   └── Print styles for PDF
│
├── script.js                  # Application logic (~500 lines)
│   ├── DOM management
│   ├── Event listeners
│   ├── Data operations (CRUD)
│   ├── localStorage management
│   ├── Budget calculations
│   ├── PDF export functionality
│   └── Dark mode toggle
│
├── manifest.json              # PWA configuration
│   ├── App metadata
│   ├── Icon definitions
│   ├── Display settings
│   ├── Orientation settings
│   └── Install behavior
│
├── service-worker.js          # Offline functionality
│   ├── Asset caching
│   ├── Network requests
│   ├── Fallback strategies
│   └── Update management
│
├── html2pdf.bundle.min.js    # PDF generation library
│
├── README.md                  # This file
└── LICENSE                    # Open source license
```

### File Explanations

| File | Purpose | Size |
|------|---------|------|
| `index.html` | Semantic HTML structure | ~2KB |
| `style.css` | Responsive styling & dark mode | ~15KB |
| `script.js` | Core application logic | ~20KB |
| `manifest.json` | PWA configuration | ~1KB |
| `service-worker.js` | Offline caching | ~2KB |
| `html2pdf.bundle.min.js` | PDF export library | ~150KB |

---

## 🔧 Technology Stack

### Frontend Technologies

| Technology | Version | Purpose |
|-----------|---------|---------|
| **HTML5** | Latest | Semantic markup, PWA structure |
| **CSS3** | Latest | Responsive design, animations |
| **JavaScript (ES6)** | Latest | Core application logic |
| **Service Worker API** | Web Standard | Offline functionality |
| **Web Storage API** | Web Standard | Data persistence |
| **IndexedDB** | Web Standard | Large data storage |
| **html2pdf.js** | Latest | PDF generation |

### Browser APIs Used

```javascript
// Data Storage
- localStorage          // Key-value pairs
- IndexedDB            // Structured data storage

// PWA APIs
- Service Worker       // Offline caching
- Manifest.json        // Installation metadata
- Web App Manifest     // Home screen installation

// DOM APIs
- document.querySelector()
- addEventListener()
- localStorage
- JSON parsing/stringify

// Utility APIs
- Date object          // Timestamps
- Math object          // Calculations
- Array methods        // Data manipulation
```

### Why No Frameworks?

✅ **Zero Dependencies**: No npm packages needed  
⚡ **Maximum Performance**: Minimal bundle size  
🔒 **Security**: No third-party code vulnerabilities  
📱 **Offline Ready**: Service worker controls everything  
🎯 **Simplicity**: Easy to understand and modify  

---

## ⚙️ Configuration

### Customizing Categories

Edit `script.js` to add/modify expense categories:

```javascript
const categories = [
  'Food',
  'Transport',
  'Entertainment',
  'Shopping',
  'Bills',
  'Others',
  // Add custom categories here
];
```

### Customizing Colors

Edit `style.css` to change the color scheme:

```css
:root {
  --primary-color: #4CAF50;      /* Main theme color */
  --secondary-color: #2196F3;    /* Accent color */
  --danger-color: #f44336;       /* Alert/delete color */
  --background-color: #ffffff;   /* Light mode background */
  --text-color: #333333;         /* Light mode text */
}

/* Dark Mode Colors */
[data-theme="dark"] {
  --background-color: #1e1e1e;
  --text-color: #ffffff;
}
```

### Customizing Storage Limits

Configure maximum transactions per category:

```javascript
const MAX_TRANSACTIONS = 10000;  // Adjust based on needs
const MAX_CATEGORIES = 15;        // Maximum categories allowed
const STORAGE_KEY = 'money_manager_data';
```

### PWA Configuration

Customize `manifest.json`:

```json
{
  "name": "Money Manager",
  "short_name": "MM",
  "description": "Your custom description",
  "start_url": "/",
  "icons": [
    {
      "src": "icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    }
  ]
}
```

---

## 🐛 Troubleshooting

### Common Issues & Solutions

#### ❌ "App not installing on mobile"
**Solution:**
- Ensure you're using HTTPS (required for PWA)
- Use a modern browser (Chrome, Firefox, Safari)
- Clear browser cache and try again
- Wait 30 seconds after first visit

#### ❌ "Data not persisting"
**Solution:**
- Check browser localStorage quota (usually 5-10MB)
- Clear browser cache partially (not cookies)
- Try different browser
- Check if in private/incognito mode (won't persist)

#### ❌ "PDF export not working"
**Solution:**
- Ensure html2pdf library loaded correctly
- Check browser console for errors (F12)
- Try different browser
- Update browser to latest version

#### ❌ "App loads slowly"
**Solution:**
- Clear browser cache
- Disable browser extensions
- Check internet speed
- First load requires network; subsequent loads are instant

#### ❌ "Dark mode not toggling"
**Solution:**
- Check browser localStorage is enabled
- Clear cache and reload
- Ensure CSS file is fully loaded
- Try different browser

#### ❌ "Cannot add expenses"
**Solution:**
- Ensure localStorage is enabled
- Check if device storage is full
- Try refreshing the page
- Check browser console for errors

### Debug Mode

Enable logging in `script.js`:

```javascript
// Add at top of script.js
const DEBUG = true;

// Use in functions
if (DEBUG) {
  console.log('Data:', transactions);
  console.log('Budget:', currentBudget);
}
```

### Browser Compatibility

| Browser | Support | Notes |
|---------|---------|-------|
| Chrome | ✅ Full | Recommended, best PWA support |
| Firefox | ✅ Full | Excellent PWA support |
| Safari | ✅ Full | iOS 12.2+ required |
| Edge | ✅ Full | Chromium-based, full support |
| Opera | ✅ Full | Chromium-based, full support |
| IE 11 | ❌ No | Legacy browser not supported |

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started with Development

```bash
# 1. Fork the repository
# 2. Clone your fork
git clone https://github.com/YOUR-USERNAME/Money-Manager.git

# 3. Create a feature branch
git checkout -b feature/amazing-feature

# 4. Make your changes
# (Edit files as needed)

# 5. Test your changes
# Open index.html in browser and verify functionality

# 6. Commit your changes
git commit -m "feat: Add amazing feature"
# Use conventional commits: feat, fix, docs, style, refactor, test

# 7. Push to your fork
git push origin feature/amazing-feature

# 8. Open a Pull Request on GitHub
```

### Contribution Guidelines

#### Code Style
```javascript
// Use clear, descriptive variable names
const totalExpenses = calculateTotal();  // ✅ Good
const t = calculateTotal();              // ❌ Bad

// Add comments for complex logic
// Calculate monthly budget remaining
const budgetRemaining = monthlyBudget - totalSpent;

// Use consistent formatting
function addTransaction(amount, category, notes) {
  // Function body
}
```

#### What to Contribute

- 🐛 **Bug Fixes**: Report and fix issues
- ✨ **Features**: Suggest and implement new features
- 📚 **Documentation**: Improve README and comments
- 🎨 **UI/UX**: Enhance interface design
- ⚡ **Performance**: Optimize code and speed
- 🧪 **Tests**: Add test cases
- 🔒 **Security**: Report vulnerabilities responsibly

#### Feature Ideas

- [ ] Multi-currency support
- [ ] Recurring transactions
- [ ] Advanced analytics with charts
- [ ] Receipt image upload
- [ ] Spending goals
- [ ] Bill reminders
- [ ] Data sync across devices (optional cloud)
- [ ] Export to CSV/Excel
- [ ] Budget templates
- [ ] Multiple accounts

### Pull Request Process

1. **Fork** the repository
2. **Create** a feature branch
3. **Commit** with clear messages
4. **Test** thoroughly
5. **Submit** a pull request with description
6. **Respond** to review feedback
7. Celebrate when merged! 🎉

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help fellow contributors
- Report issues responsibly
- Follow project license terms

---

## 📜 License

This project is open source and licensed under the **MIT License**.

### MIT License Summary
- ✅ Use for personal and commercial purposes
- ✅ Modify and distribute freely
- ✅ Include original license and copyright
- ❌ Not liable for any damage/misuse

See [LICENSE](LICENSE) file for full details.

---

## 📞 Support

### Getting Help

#### 📧 Report Issues
- Open an [issue on GitHub](https://github.com/OmmPrakash-07/Money-Manager/issues)
- Provide clear description and steps to reproduce
- Include browser and OS information

#### 💬 Discussions
- Visit [GitHub Discussions](https://github.com/OmmPrakash-07/Money-Manager/discussions)
- Ask questions and share ideas
- Engage with the community

#### 📚 Documentation
- Check README for common issues
- Review code comments
- Check existing issues for solutions

### FAQ

**Q: Is my data safe?**  
A: Yes, all data stays locally on your device. No servers involved.

**Q: Can I use it offline?**  
A: Yes, once installed, it works completely offline.

**Q: How much data can I store?**  
A: Browsers typically allow 5-10MB, enough for thousands of transactions.

**Q: Can I sync across devices?**  
A: Currently no, but this is a planned feature.

**Q: Is it free?**  
A: Yes, completely free and open source.

**Q: Can I self-host it?**  
A: Yes, it's just HTML/CSS/JS. Deploy anywhere!

---

## 🙏 Acknowledgments

- Built with ❤️ by [OmmPrakash-07](https://github.com/OmmPrakash-07)
- Thanks to all contributors and users
- Inspired by modern financial apps
- Uses html2pdf.js for PDF generation

---

## 📊 Project Statistics

```
Language Distribution:
├── JavaScript: 44.7%
├── CSS: 34.8%
└── HTML: 20.5%

Repository Stats:
├── Stars: ⭐ 4
├── Forks: 🍴 1
├── Commits: 📝 10
└── Issues: 0

Size & Performance:
├── Bundle Size: < 300KB
├── Load Time: < 1 second
└── Lighthouse Score: 95+
```

---

## 🔗 Links

- **Live App**: [money-manager-tan.vercel.app](https://money-manager-tan.vercel.app)
- **GitHub Repo**: [OmmPrakash-07/Money-Manager](https://github.com/OmmPrakash-07/Money-Manager)
- **Author**: [@OmmPrakash-07](https://github.com/OmmPrakash-07)

---

<div align="center">

### Made with ❤️ for financial freedom

**[⬆ Back to top](#-money-manager---progressive-web-app)**

</div>
