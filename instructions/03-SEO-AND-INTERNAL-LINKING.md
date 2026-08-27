# The Quiet Hub — SEO and Internal-Linking Specification

This upgrade should create a small, deliberate topic cluster rather than a generic high-volume blog.

## 1. Information architecture

Primary evergreen routes:

- `/` — playlist portal / homepage
- `/what-is-the-quiet-hub/` — brand and content-transparency page
- `/articles/` — research-guide index
- `/articles/white-noise-vs-pink-noise-vs-brown-noise/`
- `/articles/best-background-sounds-for-studying/`
- `/articles/does-music-help-you-study/`
- ten existing `/playlists/.../` routes

Do not create duplicate article copies under `/blog/`, query-string URLs or alternate slugs.

## 2. Article roles and search intent

### Article 1 — Colored-noise deep dive

URL:
`/articles/white-noise-vs-pink-noise-vs-brown-noise/`

Search intent:
- white noise vs pink noise vs brown noise
- brown noise vs white noise
- pink noise for sleep
- brown noise for focus
- colored noise for sleep/focus

SEO title:
`White Noise vs Pink Noise vs Brown Noise for Sleep & Focus`

Meta description:
`White, pink or brown noise? Compare how they sound, what research says about sleep and focus, and find the background sound that suits you.`

### Article 2 — Broad study-sound hub

URL:
`/articles/best-background-sounds-for-studying/`

Search intent:
- best background sounds for studying
- background noise for studying
- music vs nature sounds vs noise for focus
- sounds for concentration / studying

SEO title:
`Best Background Sounds for Studying: Music, Nature or Noise?`

Meta description:
`What background sound is best for studying? Compare instrumental music, nature sounds and colored noise using research on focus and attention.`

### Article 3 — Music-for-study deep dive

URL:
`/articles/does-music-help-you-study/`

Search intent:
- does music help you study
- best music for studying
- instrumental music for studying
- piano music for studying
- lo-fi for studying
- jazz for studying
- lyrics while studying

SEO title:
`Does Music Help You Study? Piano, Lo-Fi & Jazz Explained`

Meta description:
`Does music help you study? See what research says about lyrics, instrumental music, piano, lo-fi and slow jazz for focus, memory and reading.`

## 3. `/articles/` index

Create one restrained article index containing the three cards only. Do not fabricate placeholder articles.

Recommended metadata:

SEO title:
`Articles | The Quiet Hub`

Meta description:
`Research-led guides to background music, nature sounds, white noise, pink noise and brown noise for studying, focus and sleep.`

Card descriptions:

1. **White Noise vs Pink Noise vs Brown Noise: What the Science Says About Sleep and Focus**
   - `How the three noise colors differ, what the research actually shows, and how to choose between them.`

2. **The Best Background Sounds for Studying: Music, Nature or Noise?**
   - `Compare instrumental music, natural soundscapes, colored noise and silence using research on attention, stress and task performance.`

3. **Does Music Help You Study? The Science Behind Piano, Lo-Fi and Slow Jazz**
   - `What research says about instrumental music, lyrics, piano, lo-fi and jazz while studying.`

## 4. Internal-link map

### Article 1
Must link to:
- White Noise playlist
- Pink Noise playlist
- Brown Noise playlist
- Article 2 where studying/background-sound context naturally expands

### Article 2
Must link to:
- Peaceful Piano
- Elegant Jazz
- Lofi Dreams
- Forest Sounds
- Creek Sounds
- Rain Sounds
- Thunder Sounds
- White Noise
- Pink Noise
- Brown Noise
- Article 1 from the colored-noise section
- Article 3 from the music section

### Article 3
Must link to:
- Peaceful Piano
- Lofi Dreams
- Elegant Jazz
- Article 2 for the broader comparison
- Article 1 where non-musical colored noise is offered as an alternative

### Playlist pages back to articles

White / Pink / Brown:
- primary → Article 1
- secondary, when useful → Article 2

Piano / Lofi / Jazz:
- primary → Article 3
- secondary → Article 2

Forest / Creek / Rain / Thunder:
- primary → Article 2

### Brand page

`/what-is-the-quiet-hub/` links to:
- all ten playlist pages
- `/articles/`

### Article index

`/articles/` links to all three article pages. Each article should also provide a subtle path back to the index if that fits the site pattern.

## 5. Anchor-text guidance

Use descriptive but natural anchors. Vary reciprocal links so the site does not look mechanically keyword-stuffed.

Examples:
- `White vs pink vs brown noise: what the research says`
- `What does research say about background sound for studying?`
- `Does music actually help you study?`
- `Piano, lo-fi and jazz for studying: the evidence`
- `Compare music, nature and noise for studying`
- `Read the full guide to music and studying`

Never use `click here` for meaningful navigation.

## 6. Structured data

Use existing site conventions. Recommended where technically appropriate:

Article pages:
- `Article`
- `BreadcrumbList`

Brand page:
- `WebPage`
- `BreadcrumbList` if the site uses breadcrumbs

Article index:
- `CollectionPage` or the site's existing page type; do not add unnecessary schema solely for markup volume.

FAQ structured data is optional. Only add it when the exact visible FAQ is represented and this matches current search-engine guidance/site conventions. Do not add hidden FAQ content.

Do not fabricate:
- reviewer credentials
- medical expertise
- named editorial experts
- publication history
- author credentials

Publisher/author can be The Quiet Hub organization if that matches the existing site convention.

## 7. Technical SEO acceptance

For every new indexable page:

- unique `<title>`
- unique meta description
- exactly one H1
- self-referencing canonical
- indexable (no accidental `noindex`)
- included in the generated/static sitemap
- linked from at least one normal HTML page
- meaningful heading hierarchy
- no duplicated full article under another URL
- Open Graph/Twitter metadata following existing conventions
- route returns 200 after build/deploy

Preserve any existing trailing-slash convention consistently.

## 8. Content-integrity rules that also matter for SEO

The SEO strategy depends on being more credible than generic "focus hack" content. Do not strengthen cautious scientific wording for keyword density.

Specifically do not claim:

- one noise color is scientifically proven best for sleep or focus;
- brown noise is proven to help ADHD;
- white/pink noise benefits everyone;
- piano, lo-fi or jazz is proven to improve grades;
- nature sound reliably improves academic attention;
- thunder is proven harmful or beneficial for studying;
- the Quiet Hub recordings are scientifically optimized.

Strong, useful search content can say that the evidence is mixed, explain *why*, and still give the reader a practical way to choose.

## 9. Existing-analytics event guidance

Only implement these if the current repository already has a lightweight event-tracking pattern. Reuse the existing analytics function/provider; do not add a dependency just for this.

Preferred event names:

- `article_playlist_click` — article → Quiet Hub playlist page. Suggested metadata: `article_slug`, `playlist_slug`, `placement`.
- `article_reference_click` — user follows a DOI/reference from an article. Suggested metadata: `article_slug`, `reference_id`.
- `playlist_stream_click` — only if an equivalent event is already tracked for Spotify/Apple Music/YouTube Music. Preserve the existing event name if different rather than duplicating it.
- `article_self_test_interaction` — optional for Article 2 only, and only if the three-session component has an actual interaction worth measuring. Do not add fake interaction purely for analytics.

Do not record sensitive user-entered data, and do not introduce cross-site ad tracking.
