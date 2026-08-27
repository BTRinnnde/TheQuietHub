# MASTER CURSOR PROMPT — THE QUIET HUB WEBSITE UPGRADE

Implement this entire package as **one coordinated update** to the existing The Quiet Hub website.

Before changing code, inspect the repository and understand:
- routing and directory structure;
- current homepage behavior;
- playlist-page templates/data;
- current playlist artwork and descriptions;
- existing Spotify, Apple Music and YouTube Music URLs;
- current header/footer/navigation;
- CSS/design tokens and responsive patterns;
- any existing article/blog architecture;
- metadata, sitemap, robots and canonical handling;
- analytics/event hooks;
- build/test/lint commands.

Do **not** rebuild the website from scratch. Reuse the existing visual language and components wherever practical. The result should feel like the current Quiet Hub becoming richer and more useful, not a different site pasted onto it.

Read these files within the folder instructions fully before implementation:
1. `02-SITE-CONTENT-SPEC.md`
2. `03-SEO-AND-INTERNAL-LINKING.md`
3. `04-DESIGN-AND-COMPONENT-SPEC.md`
4. all three files in `/articles/`
5. `05-QA-ACCEPTANCE-CHECKLIST.md`

## Product intent

The Quiet Hub is a simple portal for background audio. The clearest brand sentence is:

**Background audio designed not to demand your attention.**

The site should make it easy to choose a type of sound, understand what it is, then continue to Spotify, Apple Music or YouTube Music.

The intended SEO/conversion path is:

**Search → useful Quiet Hub article → relevant Quiet Hub playlist page → streaming-service choice**

Do not bypass the playlist page by sending article CTAs directly to streaming platforms.

---

# A. CHANGE “HOW TO USE THE QUIET HUB” INTO A REAL PAGE

The current “How to use The Quiet Hub” behavior must no longer swap/replace content inside the homepage.

Create a normal, indexable page at:

`/what-is-the-quiet-hub/`

Use the visible navigation label:

**What is The Quiet Hub?**

Update the existing homepage/navigation link so it navigates normally to that route.

If an old hash/state/modal route exists for “How to use”, remove the obsolete interaction without breaking unrelated homepage behavior. If an old standalone URL exists, redirect it to the new route using the project's normal redirect mechanism.

The page content and order are defined in `02-SITE-CONTENT-SPEC.md`.

Important UX decision: do **not** create a long standalone “How to use” section. The site is already intuitive. Keep only the compact one-sentence usage instruction specified in the content file.

---

# B. EXPAND ALL TEN PLAYLIST PAGES

Keep all currently existing playlist-page essentials:
- playlist artwork/illustration;
- playlist name;
- current short description;
- Spotify link;
- Apple Music link;
- YouTube Music link.

Do not replace or invent existing streaming URLs. Preserve the repository values.

After the existing listen/hero area, add the editorial content defined in `02-SITE-CONTENT-SPEC.md` for:
- White Noise
- Pink Noise
- Brown Noise
- Forest Sounds
- Creek Sounds
- Rain Sounds
- Thunder Sounds
- Peaceful Piano
- Elegant Jazz
- Lofi Dreams

Use a shared playlist-page content system so these additions are consistent without becoming repetitive or bloated.

Each page should explain only what is useful for that sound. Avoid turning playlist pages into mini-articles.

## Brown Noise special requirement

The Brown Noise page must show **two Brown Noise listening options**:

1. **Brown Noise** — the somewhat lighter/deeper-background option to try for focus, work or general background use.(This is the existing cover photo and links that are on the brown noise playlist subpage.)
2. **Deep Brown Noise** — the more bass-weighted option positioned for sleep, winding down and listeners who simply prefer a deeper texture. (this is a new album)

This is a listening/positioning distinction, not a scientific superiority claim. Never state that Deep Brown Noise is proven better for sleep or that standard Brown Noise is proven to improve focus.

Search the existing repository/content data for the Deep Brown Noise release and its platform URLs. Reuse them if present. Never fabricate URLs. Look for "Brown-for-sleep" a webp file for the deep brown noise cover photo, and use the following links for their coherent platforms: https://open.spotify.com/album/4h9bkK5WJJVKjLDbJteMWl?si=chhdWSrxRgqhqu4X1DY0Uw https://music.apple.com/no/album/deep-brown-noise-for-sleep-continuous/6792495503 (youtube link is not available - do not show youtube logo when having no link to add to it.)

Do not add Deep Brown Noise to the three-color research article or its spectrum figure.

---

# C. IMPLEMENT THE THREE-ARTICLE SEO CLUSTER

Create or complete one shared `/articles/` architecture and publish these three pages:

1. `/articles/white-noise-vs-pink-noise-vs-brown-noise/`
2. `/articles/best-background-sounds-for-studying/`
3. `/articles/does-music-help-you-study/`

Use the corresponding Markdown files in `/articles/` as the editorial source.

Create/update `/articles/` as a clean index with exactly these three launch articles. Do not create an empty blog, fake dates, placeholder articles or unrelated posts.

Article roles:
- Article 1 = colored-noise deep dive, sleep + focus, includes first-party spectrum analysis.
- Article 2 = broad studying hub comparing music, nature, noise and silence.
- Article 3 = focused deep dive on music while studying: lyrics, instrumental music, piano, lo-fi and slow jazz.

Use shared article components, styling, citations, FAQ treatment, callouts, selectors and disclosure patterns. Do not independently implement three different article systems.

Preserve inline research citations near the statements they support. Keep scientific uncertainty exactly intact. Never turn `may`, `mixed`, `limited`, `not established` or `reasonable starting point` into `proven`, `best`, `improves` or similar marketing claims.

---

# D. ARTICLE 1 FIRST-PARTY AUDIO FIGURE

Use:

`assets/quiet-hub-white-pink-brown-spectrum.png`

Suggested public path following the repository convention, e.g.:

`/assets/images/articles/quiet-hub-white-pink-brown-spectrum.png`

Alt text:

`Measured frequency spectra of The Quiet Hub white, pink and brown noise recordings, normalized at 1 kHz.`

Caption:

`Measured frequency spectra of representative Quiet Hub noise recordings. Each curve is normalized at 1 kHz so spectral shape can be compared independently of digital level.`

Underlying measurements are in:

`assets/quiet_hub_noise_analysis.csv`

Important:
- the figure compares only White, Pink and Brown Noise;
- Deep Brown Noise is intentionally excluded;
- do not claim the spectra demonstrate sleep/focus efficacy;
- do not convert digital dBFS values to physical listening dB SPL;
- do not call the files scientifically optimized.

A small expandable “How we analyzed the audio” component is appropriate.

---

# E. NOISE-PAGE ILLUSTRATIONS

White, Pink and Brown Noise playlist pages should each contain a lightweight explanatory spectrum illustration in addition to the existing cover image.

Do not use a charting library. Build a simple accessible HTML/CSS/SVG schematic:
- White: approximately flat idealized spectral relationship.
- Pink: downward slope, approximately −3 dB/octave.
- Brown: steeper downward slope, approximately −6 dB/octave.

Clearly label these as **idealized illustrations**, not measurements of the playlist audio.

The measured three-color graphic belongs in Article 1 and should not be misrepresented as the idealized definition graphic.

---

# F. CONTENT TRANSPARENCY

Use the three content types exactly as defined in `02-SITE-CONTENT-SPEC.md`:

### 1. Curated music playlists
Peaceful Piano, Elegant Jazz, Lofi Dreams.
Selections from multiple artists, curated by The Quiet Hub for unobtrusive background listening. If the repository/process clearly confirms the current refresh cadence, it is acceptable to say they are typically refreshed about every two weeks. Otherwise omit a precise cadence.

### 2. The Quiet Hub original soundscapes
White Noise, Pink Noise, Brown Noise, Forest Sounds.
Be transparent about production: long-form continuous audio/soundscape released as a sequence of 35 roughly three-minute tracks with no intentional fades between them, so the sequence is designed to continue smoothly. Do not use wording that makes this sound deceptive or like a streaming loophole. The value proposition is continuous listening.

### 3. Curated ambient
Creek Sounds, Rain Sounds, Thunder Sounds.
Currently curated from sounds by other creators. Quiet Hub's long-term intent is to progressively replace these with original high-quality soundscapes/recordings.

Do not imply that curated material is original Quiet Hub audio.

---

# G. INTERNAL LINKING

Implement the complete link map from `03-SEO-AND-INTERNAL-LINKING.md`.

Core principle:
- articles link to playlist pages;
- playlist pages link back to relevant articles;
- articles cross-link where genuinely useful;
- `What is The Quiet Hub?` links to the three content groups and all playlist pages in a compact overview;
- no keyword-stuffed duplicate paragraphs.

Article CTAs must never link directly to Spotify/Apple/YouTube Music.

---

# H. SEO AND STRUCTURED DATA

For every new indexable page:
- exactly one H1;
- unique title and meta description;
- self-referencing canonical;
- indexable by default;
- included in sitemap according to existing project conventions;
- sensible Open Graph/Twitter metadata using existing site patterns;
- no duplicate copies under alternate routes.

Articles:
- use `Article` JSON-LD;
- use `BreadcrumbList` where consistent with the site;
- FAQ schema only if it exactly mirrors visible FAQ content and fits current implementation;
- publisher can be The Quiet Hub organization unless the repository already has another editorial convention;
- do not fabricate author credentials, reviewer credentials or peer-review status.

Playlist pages:
- retain current metadata unless the new copy clearly warrants a small, unique improvement;
- do not stuff “sleep”, “study”, “focus” into every title unnaturally.

New brand page recommended metadata is in `03-SEO-AND-INTERNAL-LINKING.md`.

---

# I. ACCESSIBILITY, PERFORMANCE AND PRIVACY

Preserve The Quiet Hub's lightweight nature.

Requirements:
- semantic HTML;
- keyboard-accessible controls;
- visible focus states;
- sufficient contrast;
- meaningful link text;
- no hover-only information;
- tables must remain usable on mobile;
- no important content rendered only to canvas;
- illustrations must have accessible labels/text alternatives;
- no third-party article embeds;
- no heavy chart library;
- no new analytics provider;
- no new advertising/marketing trackers;
- no new cookies merely for this update.

Reuse the existing analytics setup only.

If event tracking already exists, the preferred events are documented in `03-SEO-AND-INTERNAL-LINKING.md`. If the current codebase has no practical event architecture, do not add an entire analytics dependency just to satisfy those optional events.

---

# J. HOMEPAGE / NAVIGATION RESTRAINT

Do not turn the homepage into a long article feed.

Required homepage change:
- replace the current “How to use The Quiet Hub” interaction with a normal link to `/what-is-the-quiet-hub/`.

Article discoverability should be achieved through a small `Articles` / `Guides` entry using the site's existing navigation/footer conventions and through contextual playlist links. If the main navigation is already crowded, prefer a compact footer or secondary navigation entry rather than adding visual clutter.

Do not remove the homepage's core playlist-first purpose.

---

# K. BUILD AND VALIDATION

Before finishing:
1. run the project's available build/test/lint/format checks;
2. verify every new route locally;
3. verify every internal playlist/article link;
4. verify that current Spotify/Apple/YouTube links were not accidentally changed;
5. verify the Deep Brown links if found;
6. verify the spectrum asset loads and is responsive;
7. verify mobile layouts for article tables/cards and playlist content;
8. verify titles/canonicals/sitemap output;
9. verify no accidental `noindex`;
10. verify no duplicated H1s;
11. verify no scientific claim was strengthened during component rendering or metadata writing.

Use `05-QA-ACCEPTANCE-CHECKLIST.md` as the final checklist.

---

# L. FINAL CURSOR REPORT

When implementation is finished, report clearly:
- files created and modified;
- final URLs added;
- shared components created/reused;
- homepage/navigation behavior changed;
- playlist pages expanded;
- how Brown vs Deep Brown was implemented and which existing streaming URLs were used;
- article pages/index created;
- internal links added;
- metadata/canonical/sitemap changes;
- structured data added;
- analytics events added, if any;
- test/build results;
- any missing external URL or repository data;
- any deliberate deviation from this brief and why.

Do not stop after creating scaffolding. The intended result is a deploy-ready implementation of the entire package in one pass.
