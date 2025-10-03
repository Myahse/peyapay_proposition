# front djogana intercaisse

A modern React Native app for cross-platform (iOS & Android) mobile banking and authentication, featuring:
- Custom PIN and OTP flows
- Country and language selection
- Biometric authentication (fingerprint/face)
- Consistent modal and bottom sheet UX

## 🚀 Getting Started

### Prerequisites
- Node.js >= 16.x
- npm >= 8.x or yarn
- Expo CLI (`npm install -g expo-cli`)
- Android Studio/Xcode for device emulation (or a real device)

### Installation
```bash
# Clone the repo
 git clone <your-repo-url>
 cd front-djogana-intercaisse

# Install dependencies
 npm install
# or
yarn install
```

### Running the App
```bash
# Start the Expo dev server
npm start
# or
yarn start
```
- Scan the QR code with your Expo Go app (iOS/Android) or run on an emulator:
  - Press `i` for iOS simulator
  - Press `a` for Android emulator

## 📱 Features & UI
- **PIN & OTP:** Secure flows with animated modals and bottom sheets.
- **Country/Language Picker:** Bottom sheet modals for selection, styled for both iOS and Android.
- **Biometrics:** Uses Expo LocalAuthentication for fingerprint/face unlock.
- **Custom Modals:** All modals and bottom sheets are styled for platform consistency. If you see a "grey bar" or overlay issue, check the modal implementation and background color.

## 🛠️ Project Structure
- `app/screens/` — Main app screens (Splash, Auth, etc.)
- `app/components/ui/shared/` — Shared UI components (modals, pickers, inputs)
- `app/components/modals/` — Modal wrappers
- `assets/flags/` — Country flag images

## 📝 Contributing
1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## ⚠️ Notes
- For best results, use the same modal/bottom sheet component for all overlays.
- If you encounter safe area or overlay issues, check the modal's background and border radius.
- Biometric features require a compatible device or emulator.

---

Feel free to reach out for help or suggestions!
