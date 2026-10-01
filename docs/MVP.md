# MVP plan

## First vertical slice

1. Browse a site in the app's isolated Chromium environment.
2. Use the context menu on an ordinary HTML `<img>` to choose **Add to Quick Session**.
3. Record source page URL and direct image URL in temporary session state.
4. Show a thumbnail in the utility tray and a Photos-like gallery.
5. Remove an item, clear the session, and recover the session after restart.

## In scope for the first usable MVP

One active Quick Session; ordinary HTML images; temporary manifest/cache; source and direct image URLs; thumbnail/gallery display; remove/clear; crash and restart recovery; explicit clear semantics.

## Deliberately out of scope

Arbitrary video, blob URLs, HLS/DASH, site-specific adapters, AI/person matching, encryption vault, tags, cloud sync, browser extensions, universal scraping, permanent internal library/catalog, and saved `.pmbgallery` implementation.

## Stages

1. **Scaffold (current):** Electron/React and Spring Boot startup integration, health endpoint, docs.
2. **Browse and capture:** isolated browser and ordinary-image context-menu capture into the temporary session.
3. **Review:** tray thumbnails and gallery, item removal and clear.
4. **Recovery and polish:** restart recovery, clear/quit choices, usability refinement.
5. **Evaluate:** assess whether collect-view-decide materially improves the scattered-media workflow.

## Acceptance criteria for first usable MVP

- A user can add a normal webpage image with one context-menu action and retain its source page and direct URL.
- Captured items appear together in a visual gallery and can be individually removed.
- One explicit clear action deletes app-managed session data.
- The session recovers after normal app closure, a crash, and restart.
- Remote content has no Node/filesystem/backend privilege; browser state is isolated from other browsers.
- No DRM, paywall, or technical-access-control bypass is attempted.
