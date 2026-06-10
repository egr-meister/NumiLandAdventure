# NumiLand Adventure 🌟

A bright, friendly **math learning app for kids**, built with **bare React Native**.
Practice simple calculations, play gentle math games, take a daily challenge, and
track progress — all **offline**, with **no ads, no purchases, and no data collection**.

> All in-app text is in English. The app is portrait-only and targets Android 8+ (API 26+).

---

## ✨ Features

- **Home** with large, rounded section cards and a friendly mascot.
- **Calculator** — `+ − × ÷`, clear, delete, live expression & result.
  - **Kid Mode** (`+ −` only) and **Full Mode** (`+ − × ÷`).
  - Division by zero shows a friendly *"Try another number!"* message.
- **Math Games** — quiz questions with 3 answer options, emoji illustrations,
  and positive feedback (*"Great job!"*, *"Almost! Try again!"*).
- **Difficulty levels** — Easy (1–10, + −), Medium (1–20, + − ×), Hard (up to 50, mixed + ÷).
- **Daily Challenge** — 5 random questions, results (correct / mistakes / success %)
  and a non-gambling reward (star, sticker, medal, trophy) based on your score.
- **Progress** — totals, accuracy, level, daily challenges done, best daily score,
  plus **Reset Progress** with a confirmation dialog.
- **Settings** — Difficulty, Calculator Mode, Sound, Vibration, Theme
  (Sunny / Ocean / Candy / Space), Language, Privacy, About.
- **Local storage** via AsyncStorage. **No network, no login, no tracking.**

---

## 🗂 Project structure

```
NumiLandAdventure/
├── App.js                     # Root: providers + navigation
├── index.js
├── app.json
├── package.json
├── src/
│   ├── components/            # Reusable UI (buttons, cards, mascot, quiz view…)
│   ├── screens/               # Home, Calculator, MathGames, DailyChallenge,
│   │                          # Progress, Settings, Privacy, About
│   ├── navigation/            # React Navigation native stack
│   ├── context/              # AppContext (settings + progress state)
│   ├── storage/              # AsyncStorage persistence layer
│   ├── data/                 # themes, messages, constants
│   ├── utils/                # question generator, calculator engine, helpers
│   ├── theme/                # color themes + sizing tokens
│   └── assets/
├── android/                  # Native Android project (Gradle, signing, proguard)
└── .github/workflows/
    └── android-build.yml     # CI: builds release APK + AAB
```

---

## 🚀 Getting started (local development)

### Prerequisites
- Node.js 18+
- JDK 17
- Android Studio + Android SDK (Platform 34, Build-Tools 34.0.0)
- An Android emulator or a USB device (Android 8+)

### Install & run
```bash
npm install

# Start Metro in one terminal
npm start

# Build & run the debug app in another terminal
npm run android
```

> **Gradle wrapper note:** the binary `android/gradle/wrapper/gradle-wrapper.jar`
> is not committed. The first time you build, either open the `android/` folder
> once in Android Studio (it regenerates the wrapper automatically), or run:
> ```bash
> cd android && gradle wrapper --gradle-version 8.8
> ```
> CI generates it automatically (see below).

---

## 🔐 Generating a release keystore

You need a keystore to sign release builds. Generate one with `keytool` (ships with the JDK):

```bash
keytool -genkeypair -v \
  -keystore release.keystore \
  -alias numiland \
  -keyalg RSA -keysize 2048 -validity 10000 \
  -storepass YOUR_KEYSTORE_PASSWORD \
  -keypass YOUR_KEY_PASSWORD \
  -dname "CN=NumiLand, O=NumiLand, C=US"
```

This creates `release.keystore` with key alias `numiland`.
**Keep this file and the passwords private. Never commit them to a public repo.**

### Local release build
1. Copy `keystore.properties.example` → `android/keystore.properties` and fill it in.
2. Place `release.keystore` in the `android/` folder.
3. Build:
   ```bash
   npm run build:apk   # -> android/app/build/outputs/apk/release/app-release.apk
   npm run build:aab   # -> android/app/build/outputs/bundle/release/app-release.aab
   ```

`android/keystore.properties` and `*.keystore` are already in `.gitignore`.

---

## 🤖 CI: GitHub Actions (automatic APK + AAB)

On every push to `main` (or via **Run workflow**), `.github/workflows/android-build.yml`:

1. Installs Node dependencies (`npm ci`).
2. Sets up JDK 17, Android SDK and Gradle 8.8, then generates the Gradle wrapper.
3. Decodes the keystore from a base64 secret.
4. Builds the **release APK** (`assembleRelease`).
5. Builds the **release AAB** (`bundleRelease`).
6. Uploads both as **workflow artifacts** (`numiland-release-apk`, `numiland-release-aab`).

### Required GitHub Secrets
In your repo: **Settings → Secrets and variables → Actions → New repository secret**.

| Secret name                 | Value                                                        |
|-----------------------------|-------------------------------------------------------------|
| `ANDROID_KEYSTORE_BASE64`   | Base64 of your `release.keystore` (see below)               |
| `ANDROID_KEYSTORE_PASSWORD` | The keystore password (`-storepass`)                        |
| `ANDROID_KEY_ALIAS`         | The key alias (e.g. `numiland`)                             |
| `ANDROID_KEY_PASSWORD`      | The key password (`-keypass`)                               |

### Encode the keystore to base64
```bash
# macOS / Linux
base64 -i release.keystore | tr -d '\n' > keystore.base64.txt

# Linux (alternative)
base64 -w 0 release.keystore > keystore.base64.txt

# Windows (PowerShell)
[Convert]::ToBase64String([IO.File]::ReadAllBytes("release.keystore")) > keystore.base64.txt
```
Open `keystore.base64.txt` and paste its contents as the value of
`ANDROID_KEYSTORE_BASE64`. Then delete `keystore.base64.txt`.

After pushing to `main`, download the signed APK/AAB from the workflow run's
**Artifacts** section.

---

## 🛡 Release build hardening

The release build (`android/app/build.gradle`) enables:
```gradle
minifyEnabled true
shrinkResources true
proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
```
A safe baseline `proguard-rules.pro` keeps React Native, Hermes, AsyncStorage and
native modules working. The goal is standard size reduction and optimization for
the release artifact.

---

## ✅ Google Play readiness

- Safe, child-friendly content; no gambling-style mechanics.
- No ads, no in-app purchases, no personal data collection.
- Works fully offline; progress stored locally only.
- Privacy policy included (`PRIVACY.md`).
- Signed, minified release **AAB** for upload.

---

## 📄 License

Provided as a starter project for educational use. Replace the package name,
icon, and signing keys before publishing your own version.
