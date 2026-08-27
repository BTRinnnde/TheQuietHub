# The Quiet Hub — Design and Reusable Component Specification

Cursor should inspect the repository first and reuse the current design system. The goal is an evolution of The Quiet Hub, not a separate editorial microsite.

## 1. Overall visual direction

The upgraded site should feel:

- calm
- spacious
- understated
- credible
- easy to scan
- friendly to students without looking like a productivity app
- consistent from homepage → playlist → article

Avoid:

- neon "brain hack" visuals
- aggressive conversion design
- flashing/attention-seeking animations
- fake neuroscience graphics
- crowded badges
- stock-photo-heavy article layouts
- a completely separate article theme

Keep motion subtle and respect `prefers-reduced-motion`.

## 2. Shared playlist-page components

Prefer reusable components/data rather than manually duplicating ten page templates.

Suggested conceptual modules:

### PlaylistHero
Reuses existing:
- artwork
- title
- existing short description
- existing platform buttons

### UseCaseBlock
Short `When might you choose this?` / listening-context section.

### NoiseDefinition
Only for White/Pink/Brown:
- short definition
- idealized spectrum visual
- comparison copy

### ContentTypeCard
Must contain visible text label:
- `Curated music playlist`
- `The Quiet Hub original soundscape`
- `Curated ambient`

Do not communicate category only through color.

### LearnMoreCard
One or two editorial links. Visually secondary to the streaming actions.

### RelatedPlaylists
Two or three internal playlist links.

### BrownNoiseVariantSelector
Two clear cards:
- standard Brown Noise
- Deep Brown Noise

Each card may expose its own service actions only when the repository contains valid destination URLs.

## 3. Noise illustrations on playlist pages

For White/Pink/Brown pages, generate lightweight **idealized** spectrum diagrams with SVG/HTML/CSS. They are educational illustrations, not measured data.

They should communicate:
- White: flat power per frequency in the idealized definition
- Pink: about −3 dB/octave
- Brown: about −6 dB/octave

Requirements:
- label as `Idealized spectrum`
- accessible text/alt equivalent
- axes or a simple frequency-direction cue
- visually consistent across all three pages
- do not imply listener benefits
- do not use Deep Brown as a fourth scientific noise color

## 4. Shared article shell

Create one article architecture and reuse it across all three pages.

Recommended:
- readable prose width ~680–780 px
- wider breakout area for tables/selectors/figures where helpful
- subtle breadcrumbs if consistent with the site
- strong H1 and short answer high on page
- unobtrusive inline citation styling
- compact references at end
- playlist CTAs visually secondary to scientific text

Do not hide important article content behind JavaScript-only rendering.

## 5. Reusable article components

### PlaylistSelector
Used in all three articles with different sets of playlists. Desktop cards may sit in rows; mobile should stack cleanly.

### EvidenceTable / ComparisonCards
Semantic table on desktop is fine. On mobile, convert to accessible stacked cards if a table becomes cramped. Keep the underlying text semantic and crawlable.

### InlineCitation
Pattern:
`(Author et al., year)` → stable `#ref-id` within page.

Reference title/DOI can link externally. If opening a new tab, use `rel="noopener noreferrer"`.

### FAQ
Visible content. Native `<details>`/`<summary>` or another accessible accordion is acceptable. The content must remain available in HTML and usable by keyboard.

### ResearchDisclosure
Compact note for limitations, commercial transparency and article-specific conflicts where supplied.

## 6. Article 1 unique component: measured spectrum figure

Asset:
`assets/quiet-hub-white-pink-brown-spectrum.png`

Suggested public location:
`/assets/images/articles/quiet-hub-white-pink-brown-spectrum.png`

Alt text:

`Measured frequency spectra of The Quiet Hub white, pink and brown noise recordings, normalized at 1 kHz.`

Caption:

`Measured frequency spectra of representative Quiet Hub noise recordings. Each curve is normalized at 1 kHz so spectral shape can be compared independently of digital level.`

Requirements:
- do not crop axes/legend/labels
- make responsive without blurring excessively
- WebP/AVIF derivative optional if the current build pipeline supports it
- retain a high-quality source
- never add Deep Brown to this figure
- do not convert the source CSV's dBFS values into listener dB SPL
- do not infer sleep/focus efficacy from the graph

A small expandable **How we analyzed the audio** component is appropriate.

## 7. Article 2 unique components

### Felt focus vs measured performance

Accessible two-sided card.

Left:
**How studying feels**
- calm
- motivated
- engaged
- less stressed
- focused

Right:
**How studying performs**
- recall
- comprehension
- accuracy
- reaction time
- sustained attention

Caption:
`Background sound can affect both sides, but not necessarily in the same direction.`

Do not imply that one side is more legitimate than the other.

### Study-sound decision matrix

Use the exact editorial content in Article 2. Present as semantic table or cards.

Use labels such as:
- `A reasonable starting point`
- `May be worth testing`
- `Why`

Never:
- `Best choice`
- `Scientifically optimal`
- `Guaranteed focus`

### The Quiet Hub Study-Sound Test

Three simple steps:
1. Silence
2. Non-musical background
3. Instrumental music

Each:
- suggested 20–30 minute session
- `How did it feel?`
- `How did you perform?`

Explicitly state that this is a practical personal comparison, **not a clinical or validated scientific test**.

## 8. Article 3 unique components

### Music trade-off card

One side: ways music can support the listener (mood, engagement, familiarity, boredom reduction).

Other side: ways it can compete with the task (lyrics, changing-state information, novelty, memory/language interference).

No score or winner.

### Language-competition scale

Display conceptually:

`Silence → non-musical sound → instrumental music → unfamiliar-language lyrics → understandable lyrics`

Labels:
`Lower linguistic competition` → `Higher linguistic competition`

This is a conceptual guide, not a calibrated scientific scale. Do not assign percentages.

### Task × music matrix

Use the exact table from Article 3 and retain the line that these are starting points, not scientifically optimal prescriptions.

### Genre evidence cards

Three cards:
- Peaceful Piano
- Lofi Dreams
- Elegant Jazz

Each should distinguish:
- why it makes sense as background
- what evidence says
- what we cannot say

Do not visually rank the three.

### Study music protocol

Convert the article's practical protocol into clean HTML/cards without changing its scientific caution.

## 9. Accessibility

Across all additions:

- semantic landmarks and headings
- exactly one H1/page
- keyboard-accessible navigation/buttons/accordions
- visible focus states
- sufficient contrast
- descriptive link text
- no hover-only information
- no meaning encoded only by color
- useful alt text
- `<caption>` or accessible naming for data tables
- avoid horizontal page overflow on mobile
- respect reduced motion

## 10. Performance and privacy

- no heavy chart library for simple article visuals
- no research-site iframes
- no third-party media embeds unless already a deliberate site pattern
- optimize existing images using current tooling
- preserve current privacy posture
- reuse existing analytics only
- do not add a new tracker or cookie banner merely for this update

If analytics event tracking already exists, use it; otherwise do not block the launch on bespoke event infrastructure.
