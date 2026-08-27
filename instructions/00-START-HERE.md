# The Quiet Hub — Master Cursor Implementation Package

Date: 24 August 2026

This folder is the single source package for the next coordinated website update. It combines:

1. the three completed long-form SEO articles;
2. the new `/what-is-the-quiet-hub/` page;
3. expanded content for all ten playlist pages;
4. the Brown Noise two-option treatment;
5. the article index and internal-linking architecture;
6. the original white/pink/brown spectrum asset and raw measurements;
7. SEO, accessibility, analytics, performance and QA requirements.

## Use this package in Cursor

Open the existing The Quiet Hub repository in Cursor, attach this whole folder to the Cursor context, then give Cursor the contents of:

`01-PASTE-THIS-IN-CURSOR.md`

Do not send Cursor the three old article prompts separately. This master prompt supersedes them and tells Cursor to implement the work as one coherent site update.

## Source-of-truth order

If two instructions appear to conflict, use this order:

1. `01-PASTE-THIS-IN-CURSOR.md`
2. `02-SITE-CONTENT-SPEC.md`
3. `03-SEO-AND-INTERNAL-LINKING.md`
4. individual article files in `/articles/`
5. existing repository conventions and current site content

The article wording is editorial source material. Preserve scientific qualifiers. Small formatting edits are fine; strengthening a claim is not.

## Critical rule about streaming links

The current website already contains Spotify, Apple Music and YouTube Music URLs. Cursor must preserve/reuse those existing URLs from the repository.

For the new Deep Brown Noise option, Cursor must search the repository for an existing Deep Brown Noise release/playlist and its platform URLs. **Never invent a streaming URL.** If the URLs genuinely do not exist in the repository, Cursor should implement the page structure without fabricating links and report exactly which URLs are missing.

## Included assets

- `assets/quiet-hub-white-pink-brown-spectrum.png`
- `assets/quiet_hub_noise_analysis.csv`

The spectrum graphic is for Article 1 only and compares White, Pink and Brown Noise. Deep Brown Noise is intentionally excluded.
