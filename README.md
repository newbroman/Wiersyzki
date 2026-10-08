# Wierszyki

A Polish-for-learners progressive web app of traditional nursery rhymes, proverbs, idioms and jokes, each read aloud, explained in English and turned into something to practise speaking, review and quiz.

**Live app:** https://newbroman.github.io/Wiersyzki/

Current version: 1.12.0 (`APP_VERSION` in `index.html`). Note that the repository name is spelled `Wiersyzki`; the app is called Wierszyki.

## Features

### Content

| Section | What is inside |
| --- | --- |
| Rhymes | Traditional nursery rhymes and poems with line-by-line translation, vocabulary, grammar, comprehension questions and cultural notes. Each rhyme opens in tabs: Rhyme, Vocab, Grammar, Practice, Quiz. |
| Sayings | Polish proverbs and folk wisdom, each with its meaning and background. |
| Idioms | 24 everyday figurative phrases with literal translation, real meaning and closest English equivalent, in five themes: Life & luck, Character & habits, Feelings, Talking & persuading, Situations & action. |
| Jokes | *Kawały* organised by theme (Jaś, the doctor, highlanders, PRL-era humour). |
| Quiz | Rhyme quiz (answered by speaking) and a multiple-choice quiz on sayings, idioms and jokes, with categories you can toggle. |

Content is drawn from attested sources (the manifest cites Wolne Lektury and Wikiźródła). Where Polish-language explanations were drafted with machine assistance, they are flagged for native-speaker review before being treated as final.

### Listening and speaking

- Polish text-to-speech with a voice you choose and a speed control.
- Hands-free autoplay: each line Polish, then English, then Polish slowly.
- Pronunciation practice with speech recognition and a closeness score per line.
- "Hear your attempt": play back your own recording next to the model audio.
- Two recognition engines: the browser Web Speech API where available, or OpenAI Whisper (`whisper-1`) with your own API key, used as the fallback for browsers without the Web Speech API (such as Firefox).

### Learning tools

- Review: a Leitner spaced-repetition system (six boxes, intervals of 0, 1, 3, 7, 21 and 60 days) over vocabulary, sayings and idioms.
- Flashcards: tap to flip between Polish and English.
- Progress: day streak, due and mastered counts, memory-strength bars and quiz history.
- Search across all rhymes, sayings, idioms and jokes.
- My stuff: bookmarked items and your own sayings.
- Add your own saying: describe one and it is drafted into structured form via OpenAI (`gpt-4o-mini`) for you to review and save.
- Interface language toggle, English or Polski (the content is always Polish with English).
- Backup and restore of bookmarks, history, custom sayings and settings as a JSON file. The API key is not included.

## Using it

Open the live link in a browser. It is installable (Chrome, Edge, Safari "Add to Home Screen") and works offline once installed, because the service worker caches the app shell. When a new version is deployed, the app shows a "new version" prompt and reloads when you accept. The manifest also defines home-screen shortcuts for Rhymes, Sayings and Quiz.

The first load needs a network connection: React, ReactDOM and Babel standalone are loaded from cdnjs and the font from Google Fonts. Speech recognition needs either a browser with the Web Speech API (Chrome, Edge, Safari) or an OpenAI key.

### Data and privacy

- Progress, bookmarks, custom content and settings are kept in `localStorage` on your device. There is no account and no backend.
- Your OpenAI key (optional, entered in Settings) is stored only in your browser and sent only to OpenAI. It is excluded from backups.
- The Web Speech API may use the browser vendor's cloud service; the Whisper engine sends audio to OpenAI for transcription.

## Project structure

| File | Purpose |
| --- | --- |
| `index.html` | The whole app: React 18 with Babel standalone (no bundler), inline styles, all content and logic |
| `sw.js` | Service worker: offline caching and the update prompt |
| `manifest.json` | PWA manifest (name, icons, theme, shortcuts) |
| `favicon.ico`, `icons/` | Icons |

## Development

There is no build step. Serve the folder with any static server (the service worker needs `http://localhost` or HTTPS, not `file://`):

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

In DevTools, enable Application > Service Workers > "Update on reload" so you always see the latest build.

Release workflow: bump `CACHE_VERSION` in `sw.js` (currently `wierszyki-v9`) on every deploy. If the name is unchanged, installed copies keep serving the old build; changing it triggers the in-app update prompt. Also update `APP_VERSION` in `index.html`.

## Notes

- Deployment is GitHub Pages from the repository root; ship `index.html`, `sw.js`, `manifest.json`, `favicon.ico` and `icons/` together.
- Planned: a native-speaker verification pass over machine-assisted Polish explanations, resolving duplicate content entries, and more idioms, sayings and rhymes.
- Traditional rhymes, proverbs and idioms are traditional or public-domain; the explanations and learning tools are original to this project.

Built by Martin Hollingham.
