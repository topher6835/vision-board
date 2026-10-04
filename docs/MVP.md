# MVP plan

## First usable slice (planned)

1. Browse a site in the app's isolated Chromium environment.
2. Use the context menu on an ordinary HTML `<img>` to choose **Add to Quick Session**.
3. Record source page URL and direct image URL in temporary session state.
4. Show a thumbnail in the utility tray and a Photos-like gallery.
5. Remove an item, clear the session, and recover the session after restart.

## In scope for the first usable MVP

One active Quick Session; ordinary HTML images; temporary manifest/cache; source and direct image URLs; thumbnail/gallery display; remove/clear; crash and restart recovery; explicit clear semantics.

## Deliberately out of scope

Arbitrary video, blob URLs, HLS/DASH, site-specific adapters, AI/person matching, encryption vault, tags, cloud sync, browser extensions, universal scraping, permanent internal library/catalog, and saved-gallery implementation.

## Near-term milestones

1. **Scaffold — implemented:** Electron/React and Spring Boot startup integration, health endpoint, placeholder screen.
2. **Native browser composition/security spike — next:** prove native browser/tray composition and security boundaries. No capture or session persistence.
3. **Browser shell — future next step:** navigation controls, Browse/Gallery switching, rail/tray UI, and placeholder Quick Session UI. No capture or persistence.
4. **Recoverable Quick Session foundation:** file-based session state, recovery, and clear behavior.
5. **Ordinary public-image capture:** context-menu capture and gallery review.
6. **Evaluate/polish:** assess the workflow and refine usability as appropriate.

The integrated browser profile is planned to persist separately from Quick Session files. Windows remains a target but is not yet validated; macOS is the primary development and validation platform.

## Acceptance criteria for first usable MVP

- A user can add a normal webpage image with one context-menu action and retain its source page and direct URL.
- Captured items appear together in a visual gallery and can be individually removed.
- One explicit clear action deletes app-managed session data.
- The session recovers after normal app closure, a crash, and restart.
- Remote content has no Node/filesystem/backend privilege; browser state is isolated from other browsers.
- No DRM, paywall, or technical-access-control bypass is attempted.
