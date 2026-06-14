# Wierszyki — Polish for Learners (PWA)

A Progressive Web App for learning Polish through traditional nursery rhymes, proverbs, and jokes. Verified content from Wolne Lektury, Wikiźródła, and other Polish sources.

## File structure

```
wierszyki-pwa/
├── index.html              ← the app (with PWA meta tags & service worker registration)
├── manifest.json           ← PWA manifest (declares name, icons, theme, display mode)
├── sw.js                   ← service worker (offline caching)
├── favicon.ico             ← browser tab icon
├── README.md               ← this file
└── icons/
    ├── icon-72.png
    ├── icon-96.png
    ├── icon-128.png
    ├── icon-144.png
    ├── icon-152.png
    ├── icon-192.png
    ├── icon-384.png
    ├── icon-512.png
    ├── icon-maskable-192.png    ← Android adaptive icon
    ├── icon-maskable-512.png    ← Android adaptive icon
    └── apple-touch-icon.png     ← iOS home-screen icon (180x180)
```

## Step 1 — Host the PWA online

PWABuilder needs a publicly accessible HTTPS URL to package your app. The easiest free options:

### Option A: Netlify Drop (no signup needed for the trial)
1. Go to https://app.netlify.com/drop
2. Drag the entire `wierszyki-pwa` folder onto the page
3. You'll get a URL like `https://random-name-12345.netlify.app/`
4. (Optional) Sign in to claim it and set a custom name

### Option B: GitHub Pages
1. Create a new GitHub repository
2. Upload all files from `wierszyki-pwa/`
3. Settings → Pages → Source: deploy from branch `main` → root
4. URL will be `https://<your-username>.github.io/<repo-name>/`

### Option C: Vercel
1. Go to https://vercel.com
2. Sign in and click "New Project"
3. Drag the folder, deploy
4. URL will be `https://wierszyki.vercel.app/` or similar

## Step 2 — Test the PWA before packaging

Open your hosted URL on a desktop browser and check:

- **No console errors** (F12 → Console)
- The page **loads completely** and the app works
- In Chrome DevTools, open **Application → Manifest** — should show all icons and no errors
- **Application → Service Workers** — should show `sw.js` as "activated and is running"
- Try **toggling "Offline"** in Network tab and reload — the app should still work
- (Mobile) Open the URL on a phone and tap the browser menu → "Add to Home Screen" — the icon and name should appear correctly

If anything fails here, fix it before going to PWABuilder.

## Step 3 — Generate the APK with PWABuilder

1. Go to https://www.pwabuilder.com/
2. Paste your hosted URL into the box at the top → **"Start"**
3. PWABuilder will audit your PWA. Aim for green scores on Manifest, Service Worker, and Security.
4. Click **"Package for stores"** → **Android**
5. **Use these settings**:
   - Package ID: `com.wierszyki.app` (or your own reverse-domain name)
   - App name: `Wierszyki`
   - Launcher name: `Wierszyki`
   - Display mode: `Standalone`
   - Theme color: `#1a1208`
   - Background color: `#1a1208`
   - **Signing key**: Choose **"New"** for your first build. PWABuilder will generate one. **Download and save the keystore file (.keystore) and remember the passwords** — you'll need them to update the app later. Losing the keystore means you can't push updates.
6. Click **"Generate"** and download the ZIP
7. Inside the ZIP you'll find:
   - `app-release-signed.apk` — install directly on Android phones (allow "Install from unknown sources")
   - `app-release-bundle.aab` — for uploading to Google Play Store
   - `signing.keystore` — keep this safe!
   - `next-steps.html` — PWABuilder's own guide

## Step 4 — Install the APK on your phone

### Direct install (sideload)
1. Transfer `app-release-signed.apk` to your Android phone (email, Drive, USB, etc.)
2. On the phone, tap the file. Android may warn you about installing from unknown sources — you'll need to enable that for your file manager
3. The app installs and appears in your launcher with the Wierszyki icon

### Google Play Store (for wider distribution)
1. Create a Google Play Developer account (one-time $25 fee)
2. In Play Console, create a new app
3. Upload the `.aab` (Android App Bundle) file
4. Fill in store listing details (description, screenshots, privacy policy)
5. Submit for review

## Updating the app later

When you change content:
1. Update the files in `wierszyki-pwa/`
2. **Increment `CACHE_NAME` in `sw.js`** (e.g. `wierszyki-v1` → `wierszyki-v2`) so users get the new version
3. Re-upload to your host
4. For APK updates: re-run PWABuilder, but **use the SAME keystore file** you saved earlier
5. Increment the version code/name in PWABuilder

## Troubleshooting

**"Microphone doesn't work in the APK / Practice tab is blank"** — The Practice tab uses your phone's built-in speech recognition, which requires (a) microphone permission and (b) an active internet connection on most devices (Polish recognition runs on cloud servers — Google's on Android, Apple's on iOS). On first use, Android will pop up a microphone permission prompt: tap "Allow". If you accidentally denied it, go to Settings → Apps → Wierszyki → Permissions → Microphone → Allow. The feature gracefully tells you when speech recognition isn't supported (e.g. on Firefox).

**"Web Speech API doesn't work in the APK"** — The TTS depends on the device having a Polish voice installed. On Android: Settings → System → Languages & input → Text-to-speech output → install Polish.

**"App shows 'Failed to fetch' on first load"** — The PWA needs to be loaded once while online to cache its assets. After that it works offline.

**"PWABuilder fails the manifest audit"** — Make sure you tested the manifest in DevTools first. Common issues: relative paths not resolving, missing icons, or hosting on `http://` instead of `https://`.

**"Icons look blurry on Android"** — The maskable icons (`icon-maskable-*.png`) handle Android's adaptive icon cropping. They're already included.

## Notes on Google Play submission

If you plan to publish to Google Play, you may need:
- A **privacy policy** URL (required if the app collects any data; Wierszyki only uses localStorage on-device, but Google still asks)
- **Screenshots** (PWABuilder can help generate these, or use a phone)
- **Content rating** (Wierszyki contains some adult-oriented jokes — the PRL political jokes — so rate it appropriately; "Everyone 10+" is probably right)

The PRL political joke about pigs in government, and some of the proverbs, contain mild language and political/historical context. If submitting to Google Play, declare these in the content questionnaire.
