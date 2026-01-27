# SI-NSA SRP Data Collection App

Cross-platform data collection application for Systematic Regional Program (SRP) activities.

[![Build Android APK](https://github.com/YOUR_USERNAME/si-nsa-srp/actions/workflows/android-build.yml/badge.svg)](https://github.com/YOUR_USERNAME/si-nsa-srp/actions/workflows/android-build.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📱 Features

### Phase 1 (Current)
- ✅ **Locality Details Form** - Track community information and activities
- ✅ **Individual Records** - Manage basic information on community members
- ✅ **Children's Classes** - Record children's class activities (Grades 1-6)
- ✅ **Junior Youth Groups** - Track junior youth activities and books
- ✅ **Study Circles** - Manage study circle participants and courses
- ✅ **Offline-first** - All data stored locally on device
- ✅ **Export to JSON** - Backup and share data easily
- ✅ **Cross-platform** - Android, iOS, and Windows support

### Coming Soon (Phase 2)
- 🔄 Regional and Cluster hierarchy
- 🔄 Cycles tracking (3-month activity cycles)
- 🔄 Reports and analytics
- 🔄 Data synchronization between devices
- 🔄 Cloud backup options

## 🚀 Quick Start

### For Users

#### Android
1. Download the latest APK from [Releases](https://github.com/YOUR_USERNAME/si-nsa-srp/releases)
2. Install on your Android device
3. Open the app and start collecting data!

#### Windows
1. Download the installer from [Releases](https://github.com/YOUR_USERNAME/si-nsa-srp/releases)
2. Run the installer
3. Launch SI-NSA SRP from your Start Menu

#### Web (PWA)
Visit: [https://YOUR_USERNAME.github.io/si-nsa-srp](https://YOUR_USERNAME.github.io/si-nsa-srp)

## 💻 Development Setup

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

**For Android development:**
- Android Studio ([Download](https://developer.android.com/studio))
- Java JDK 17 ([Download](https://www.oracle.com/java/technologies/downloads/))

**For iOS development (macOS only):**
- Xcode 14+ ([Download from App Store](https://apps.apple.com/app/xcode/id497799835))
- CocoaPods (`sudo gem install cocoapods`)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/si-nsa-srp.git
cd si-nsa-srp
Install dependencies
npm install
Copy environment file
cp .env.example .env
# Edit .env with your configuration
Start development server
npm start
Your browser will open to http://localhost:3000
Building for Production
Web Build
npm run build
Output: build/ folder
Android Build
First time setup:
npm run cap:add:android
Build APK:
# Sync web assets to Android
npm run cap:sync:android

# Open in Android Studio
npm run cap:open:android

# Or build directly (requires Android SDK)
npm run android:build
Find APK at: android/app/build/outputs/apk/release/
iOS Build (macOS only)
First time setup:
npm run cap:add:ios
Build app:
# Sync web assets to iOS
npm run cap:sync:ios

# Open in Xcode
npm run cap:open:ios
Then build in Xcode (⌘+B)
Windows Build (Electron)
npm run electron-build
Find installer in: dist/ folder
🤖 GitHub Actions CI/CD
This project uses GitHub Actions for automated builds:
Android APK - Built on every push to main and develop
Windows Installer - Built on push to main (coming soon)
iOS App - Built on push to main (coming soon)
Download builds from:
Actions tab (artifacts)
Releases page (tagged releases)
📁 Project Structure
si-nsa-srp/
├── .github/workflows/    # GitHub Actions CI/CD
├── public/              # Static files
├── src/
│   ├── components/      # React components
│   ├── utils/          # Utilities & helpers
│   ├── hooks/          # Custom React hooks
│   └── App.js          # Main application
├── android/            # Android native project
├── ios/               # iOS native project
└── build/             # Production build
🛠️ Tech Stack
Frontend: React 18
Styling: Tailwind CSS
Icons: Lucide React
Mobile: Capacitor 5
Desktop: Electron 28
Storage: localStorage API
Build: React Scripts, Gradle, Xcode
📊 Data Collection Forms
The app includes 7 data collection forms based on SRP 3.1 specifications:
Locality Details - Community infrastructure and activities
Basic Information - Individual records
Children & Junior Youth - Progress tracking
Youth & Adults - Course completion
Children's Classes - Class management
Junior Youth Groups - Group activities
Study Circles - Study circle records
🔒 Data Privacy
All data is stored locally on your device
No cloud synchronization (Phase 1)
Export data as JSON for manual backup
No personal information leaves your device
🤝 Contributing
Contributions are welcome! Please follow these steps:
Fork the repository
Create a feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
📧 Contact
Project Link: https://github.com/YOUR_USERNAME/si-nsa-srp
Issues: https://github.com/YOUR_USERNAME/si-nsa-srp/issues
🙏 Acknowledgments
Based on the Statistical Report Program 3.1 Reference Guide
Built for the Bahá'í community
Special thanks to all contributors
📖 Documentation
SRP 3.1 Reference Guide
User Manual (coming soon)
API Documentation (coming soon)
Made with ❤️ for the SI-NSA community
---

## **10. `LICENSE`**
MIT License
Copyright (c) 2024 SI-NSA
Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR DEALINGS IN THE
SOFTWARE.
---

## 🎯 Quick Setup Checklist

After creating these files:

```bash
# 1. Initialize git (if not done)
git init

# 2. Install dependencies
npm install

# 3. Create .env from example
cp .env.example .env

# 4. Test the app
npm start

# 5. Commit everything
git add .
git commit -m "Initial Phase 1 setup with all config files"
git push origin main