# The Quiet Hub — Final QA / Definition of Done

Use this after implementation. The update is not complete until the relevant checks pass.

## Architecture and navigation

- [ ] `What is The Quiet Hub?` opens as a real page, not an in-place homepage state.
- [ ] `/what-is-the-quiet-hub/` loads directly and through normal navigation.
- [ ] Browser back/forward behavior is normal.
- [ ] `/articles/` exists and lists exactly the three supplied launch articles.
- [ ] All ten playlist routes continue to resolve.
- [ ] Existing homepage playlist discovery remains simple and usable.

## Playlist pages — shared

- [ ] Existing artwork is preserved unless a real repository asset update is intentional.
- [ ] Existing Spotify URLs are preserved.
- [ ] Existing Apple Music URLs are preserved.
- [ ] Existing YouTube Music URLs are preserved.
- [ ] No platform destination was invented from a guessed ID or slug.
- [ ] Every page identifies its Quiet Hub content type.
- [ ] Every page has useful common-use / listening-context copy.
- [ ] Every page has relevant internal article link(s).
- [ ] Every page has a compact related-sounds path.

## White / Pink / Brown

- [ ] Each explains what the noise color is.
- [ ] Each has a clearly labeled idealized spectrum illustration.
- [ ] The illustration is not presented as proof of a sleep/focus effect.
- [ ] Each compares naturally with the other two colors.
- [ ] Each links to Article 1.
- [ ] No page says one color is proven best.

## Brown Noise two-option experience

- [ ] Standard Brown Noise and Deep Brown Noise are visibly separate choices.
- [ ] Standard Brown is positioned as the somewhat lighter focus/general-background option without a scientific focus claim.
- [ ] Deep Brown is positioned as the deeper sleep/wind-down option without a scientific sleep claim.
- [ ] Deep Brown streaming URLs were found in the repository or explicitly reported missing.
- [ ] No Deep Brown URL was fabricated.
- [ ] Deep Brown was not added to Article 1's spectrum comparison.

## Nature pages

- [ ] Forest is labeled original Quiet Hub content.
- [ ] Creek is labeled curated ambient.
- [ ] Rain is labeled curated ambient.
- [ ] Thunder is labeled curated ambient.
- [ ] Curated ambient copy states the intention to replace with originals gradually.
- [ ] Thunder wording preserves uncertainty and does not claim it helps or harms studying universally.

## Music pages

- [ ] Piano, Jazz and Lofi are labeled curated music playlists.
- [ ] They are described as selections involving independent artists without falsely implying Quiet Hub created all tracks.
- [ ] Each links primarily to Article 3 and secondarily to Article 2 where useful.
- [ ] No music genre is called scientifically best for study.

## Brand transparency page

- [ ] Core line appears prominently: `Background audio designed not to demand your attention.`
- [ ] The three content types are clearly explained.
- [ ] Original soundscape format is described transparently and neutrally.
- [ ] The consecutive ~3-minute-track / no-intentional-fade approach is not described as a streaming loophole.
- [ ] Playback is not promised to be perfectly gapless on every platform/device.
- [ ] Compact playlist overview links to all ten playlists.

## Article 1

- [ ] Final route: `/articles/white-noise-vs-pink-noise-vs-brown-noise/`
- [ ] Inline citations work.
- [ ] Spectrum PNG loads and remains legible.
- [ ] Only White/Pink/Brown are in the measured figure.
- [ ] CSV data are not presented as listener dB SPL.
- [ ] No claim says the measured recordings prove sleep/focus efficacy.
- [ ] Pink-noise section distinguishes continuous pink noise from closed-loop stimulation.
- [ ] Brown-noise evidence is not overstated.
- [ ] Article links to all three relevant playlist pages.

## Article 2

- [ ] Final route: `/articles/best-background-sounds-for-studying/`
- [ ] Music/Nature/Noise pathways appear near the top.
- [ ] Felt-focus vs measured-performance component renders on desktop/mobile.
- [ ] Decision matrix renders cleanly.
- [ ] Three-session self-test is clearly labeled as a personal comparison, not validated science.
- [ ] Nature relaxation evidence is not rewritten as guaranteed attention enhancement.
- [ ] ADHD white/pink findings retain population qualifiers and approximate effect directions.
- [ ] Brown cognitive evidence remains described as sparse.
- [ ] Thunder section retains direct-evidence limitations.
- [ ] Article links to Article 1 and Article 3.

## Article 3

- [ ] Final route: `/articles/does-music-help-you-study/`
- [ ] Lyrics/instrumental distinction is clear.
- [ ] Language-competition scale is labeled conceptual.
- [ ] Task × music matrix remains a set of starting points.
- [ ] Piano/lo-fi/jazz cards do not declare a winner.
- [ ] Kirk et al. 2022 funding/employment/design limitations remain visible.
- [ ] Active musical training is not used as proof for passive listening.
- [ ] Lo-fi anxiety evidence is not converted into grades/learning evidence.
- [ ] No best-BPM claim is added.
- [ ] Silence remains a valid baseline.
- [ ] Article links to Article 1, Article 2 and the three music playlists.

## Internal links

- [ ] Article 1 ↔ White/Pink/Brown.
- [ ] Article 2 ↔ all relevant playlist pages.
- [ ] Article 2 → Article 1 from colored-noise discussion.
- [ ] Article 2 → Article 3 from music discussion.
- [ ] Article 3 ↔ Piano/Lofi/Jazz.
- [ ] Article 3 → Article 2.
- [ ] Article 3 → Article 1 where colored noise is an alternative.
- [ ] No internal link points to a non-existent route.

## SEO

- [ ] Every new page has a unique title.
- [ ] Every new page has a unique meta description.
- [ ] Exactly one H1 per page.
- [ ] Self-canonical on each final route.
- [ ] Sitemap includes the new pages.
- [ ] No accidental `noindex`.
- [ ] No duplicate article content under alternate routes.
- [ ] Structured data validates where used.
- [ ] Open Graph/Twitter metadata uses current project conventions.

## Accessibility / responsive

- [ ] Keyboard navigation works.
- [ ] Focus styles are visible.
- [ ] Accordions/details are accessible.
- [ ] Tables/cards are readable on narrow screens.
- [ ] No horizontal page overflow at common mobile sizes.
- [ ] Illustrations/figures have accessible descriptions.
- [ ] Color is not the only way content type or comparison is communicated.
- [ ] Reduced-motion preference is respected.

## Performance / privacy

- [ ] No unnecessary chart library added.
- [ ] No research-site iframes added.
- [ ] No new analytics provider added.
- [ ] No new cookies introduced merely for these features.
- [ ] Existing analytics still function after navigation/routing changes.
- [ ] Image assets are reasonably optimized.

## Build and final Cursor report

- [ ] Run the repository's normal build/test/lint commands.
- [ ] Test all new routes locally through the server, not by opening HTML files directly if the site uses routed assets/JS.
- [ ] Report all files changed/created.
- [ ] Report final URLs.
- [ ] Report shared components created/reused.
- [ ] Report metadata/canonical/sitemap work.
- [ ] Report internal links added.
- [ ] Report analytics events added, if any.
- [ ] Report any missing Deep Brown platform URL(s).
- [ ] Report any deviation from this package and the reason.
