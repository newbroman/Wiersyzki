# Wierszyki 🇵🇱

**A Polish-for-learners progressive web app.** Traditional nursery rhymes, proverbs, idioms and jokes — each one read aloud, explained in English, and turned into something you can practise speaking, review and quiz yourself on.

Wierszyki runs entirely in the browser, works offline once installed, and keeps all your progress on your own device.

**Current version:** 1.11.0

---

## What it does

Wierszyki bundles authentic Polish content with the learning tools to actually absorb it:

- **Listen** to native-style text-to-speech with a Polish voice you pick yourself, at a speed you choose.
- **Read along** with line-by-line Polish and English, plus vocabulary notes and cultural background.
- **Speak** each line and get scored on how close you are — then **play your own attempt back** to compare.
- **Review** with a spaced-repetition system that brings back what you miss sooner and what you know later.
- **Quiz** yourself on rhymes (by speaking the answer) or on sayings, idioms and jokes (multiple choice).
- **Track** a daily streak, mastery levels and quiz scores on a progress dashboard.

Everything is bilingual: the **content** is always Polish-with-English, and the **interface** can switch between English and Polski.

---

## Content

| Section | What's inside |
| --- | --- |
| 📖 **Rhymes** | Traditional nursery rhymes and poems, with full line-by-line translation, vocabulary, comprehension questions and cultural notes. |
| 💬 **Sayings** | Polish proverbs and folk wisdom, each with its meaning and the story behind it. |
| 🗣️ **Idioms** | 24 everyday figurative phrases — literal translation, real meaning and closest English equivalent — grouped into five themes (Life & luck, Character & habits, Feelings, Talking & persuading, Situations & action). |
| 😄 **Jokes** | *Kawały* organised by theme — Jaś, the doctor, highlanders, PRL-era humour. |

> **A note on authenticity.** Content is drawn from genuine, attested sources. Where Polish-language explanations were drafted with machine assistance, they are flagged for native-speaker review before being treated as final.

---

## Features

### Listening & speaking
- **Polish text-to-speech** with on-device voice selection and a slow / normal / faster speed control.
- **Hands-free autoplay** — plays each line Polish → English → Polish-slowly, no tapping needed.
- **Pronunciation practice** via speech recognition, with a closeness score per line.
- **Hear your attempt** — play back your own recording right next to the model audio.

### Speech recognition (two engines)
- **Web Speech API** where available (Chrome, Edge, Safari).
- **OpenAI Whisper fallback** for Firefox and other browsers, using your own API key.

### Learning system
- **Review** — a Leitner spaced-repetition system over all vocabulary, sayings and idioms.
- **Flashcards** — browse and flip the whole deck, filter by type, shuffle.
- **Progress** — day streak, due / mastered / learning counts, a memory-strength bar, quiz history.
- **Search** across every rhyme, saying, idiom and joke.
- **My stuff** — your bookmarked items and custom sayings in one place.

### Quizzes
- **Rhyme quiz** — questions about each rhyme, answered by speaking aloud.
- **Sayings, idioms & jokes quiz** — multiple choice; match a phrase to its meaning, or a joke setup to its punchline. Toggle categories on and off.

### Make it yours
- **Add your own saying** — describe one and it's drafted into structured form (via OpenAI) for you to review and save.
- **Interface language** toggle: English / Polski.
- **Backup & restore** — export your saved items, custom sayings and progress to a JSON file, and restore on another device. (Your API key is never included.)

### Progressive web app
- **Installable** and **offline-first** via a service worker.
- **Update prompt** — when a new version is deployed, the app offers a one-tap reload.

---

## Running it locally

Wierszyki is a single static `index.html` plus a service worker — there's no build step.

```bash
git clone <your-repo-url>
cd wierszyki

# Serve it (a plain server is enough; needed for the service worker)
python3 -m http.server 8000
# then open http://localhost:8000
```

> Service workers require `http://localhost` or HTTPS — opening the file with `file://` won't register the worker.

While developing, enable **DevTools → Application → Service Workers → "Update on reload"** so you always get the latest build.

---

## Speech recognition & AI features (bring your own key)

The Whisper fallback, the "add your own saying" generator and the key-test button all use the OpenAI API with **your own key**:

- Add it in **Settings**; it's stored only in your browser's `localStorage`.
- It is sent only to OpenAI, never to any other server.
- It is deliberately **excluded** from backup files.
- Use a personal key — anyone with access to your browser profile can read it.

The Web Speech API engine needs no key. Offline TTS playback needs no key.

---

## Data & privacy

- All progress, bookmarks, custom content and settings live in **`localStorage` on your device** — there is no account and no backend.
- Speech recognition with the Web Speech API may use the browser's cloud service; the Whisper engine sends audio to OpenAI for transcription.
- Recorded audio for "hear your attempt" is kept only in memory for the current attempt and released when you record again.

---

## Project structure

```
index.html        # The entire app — React 18 (via Babel-standalone), inline styles, all content & logic
sw.js             # Service worker: offline caching + update handling
manifest.json     # PWA manifest (name, icons, theme)
icons/            # App icons
```

### Tech stack
- **React 18** + **ReactDOM**, transpiled in-browser with **Babel standalone** (no bundler).
- **Inline styles** throughout, single-file architecture.
- **localStorage** for all persistence.
- **Service worker** for offline use and update prompts.
- **OpenAI API** (Whisper + GPT-4o-mini) for optional, opt-in features.

---

## Deploying

Any static host works — e.g. **GitHub Pages** or **Netlify Drop**.

Ship these together: `index.html`, `sw.js`, `manifest.json`, and the `icons/` folder.

> **Important:** bump `CACHE_VERSION` in `sw.js` on every release. The service worker is cache-versioned, so an unchanged name means installed copies keep serving the old build. Bumping it triggers the in-app "new version — Reload" prompt.

---

## Roadmap

- Native-speaker verification pass over machine-assisted Polish explanations.
- Resolving duplicate content entries.
- More idioms, sayings and rhymes.
- Theme-based grouping and quizzes across more sections.

---

## Credits

Built by [newbroman](https://github.com/newbroman). Polish nursery rhymes, proverbs and idioms are traditional / public-domain; explanations and learning tools are original to this project.
