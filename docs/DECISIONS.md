# Decisions

Chronological ADR-lite record. Dates refer to decisions supplied for this project, not implementation dates.

## 2026-09-30 — Desktop and backend split (locked)

Electron/React/TypeScript/Vite/Tailwind is the desktop stack; Java 21/Spring Boot/Maven is the trusted application layer. Electron owns Chromium/browser-specific behavior. Communicate through a small localhost API, bound to loopback and protected by a per-launch token. Remote pages never receive privileged access. Use `WebContentsView` for the eventual integrated browser.

## 2026-09-30 — Temporary active session (locked)

One active Quick Session lives in one obvious self-contained temporary-session directory and survives crashes/restarts until user-cleared. It is not stored in persistent SQLite. Clearing means deleting managed data and is not forensic secure deletion. Future quit choices are Keep Session & Quit, Clear Session & Quit, Cancel.

## 2026-09-30 — Portable saved galleries (locked direction)

Saved galleries are user-owned movable `.pmbgallery` packages/folders, support references-only, offline media, or hybrid content, and reopen without a hidden permanent internal catalog by default. Avoid OS Recent Documents integration. Format details remain future work.

## 2026-09-30 — Product and UX (locked direction)

The product workflow is Browse → Collect → View → Decide. It is viewing-first and session-first. Use a dominant canvas with Browse, Gallery, and Viewer modes and an overlay collapsible utility tray rather than a permanent sidebar. Apple Photos is a visual reference.

## 2026-09-30 — Initial capture boundary (locked for first slice)

Begin with ordinary HTML images, context-menu capture, source page and direct URL, temporary manifest/cache, tray thumbnail/gallery, remove/clear, and recovery. Video complexity and broad scraping are out of scope.

## Current scaffold assumptions

- Development starts the Java backend as an Electron-managed Maven child process.
- The scaffold API uses fixed loopback port 8765 with a fresh random token per Electron launch.
- Production backend packaging, installer design, and persistent manifest format are not decided here.

## Future possibilities (not commitments or implemented)

Portable `.pmbgallery` details; reference/offline/hybrid persistence; visual `.pmbboard` packages and layout; encrypted/protected storage; additional capture sources after the initial image slice. No permanent gallery catalog is presumed.
