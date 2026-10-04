# Decisions

Chronological ADR-lite record. Dates refer to decisions supplied for this project, not implementation dates.

## 2026-09-30 — Desktop and backend split (locked)

Electron/React/TypeScript/Vite/Tailwind is the desktop stack; Java 21/Spring Boot/Maven is the trusted application layer. Electron owns Chromium/browser-specific behavior. Communicate through a small localhost API, bound to loopback and protected by a per-launch token. Remote pages never receive privileged access. Use `WebContentsView` for the eventual integrated browser.

## 2026-09-30 — Temporary active session (decided direction, not implemented)

One active Quick Session lives in one obvious self-contained temporary-session directory and survives crashes/restarts until user-cleared. It is not stored in persistent SQLite. Clearing means deleting managed data and is not forensic secure deletion. Future quit choices are Keep Session & Quit, Clear Session & Quit, Cancel.

## 2026-09-30 — Portable saved galleries (locked direction)

Saved galleries are user-owned, movable, renameable, manually deletable, and reopenable without a hidden permanent internal catalog by default. They may eventually support references-only, included media, or hybrid content. Metadata should be versionable and internal references portable/relative where applicable. Physical representation and extension remain open; a directory bundle, archive, or other format is future work. A visual Board document is not an MVP feature and has no decided format or extension. Avoid OS Recent Documents integration.

## 2026-09-30 — Product and UX (locked direction)

The product workflow is Browse → Collect → View → Decide. It is viewing-first and session-first. Use a dominant canvas with Browse, Gallery, and Viewer modes and an overlay collapsible utility tray rather than a permanent sidebar. Apple Photos is a visual reference.

## 2026-09-30 — Initial capture boundary (planned first capture slice, not implemented)

Begin with ordinary HTML images, context-menu capture, source page and direct URL, temporary manifest/cache, tray thumbnail/gallery, remove/clear, and recovery. Video complexity and broad scraping are out of scope.

## 2026-10-04 — Shared macOS and Windows target (locked direction)

Target macOS and Windows from one shared codebase. Keep core domain and storage formats platform-neutral; isolate platform-specific paths, process launch/termination, native integration, and distribution behind narrow boundaries. Resolve application-data paths through platform APIs and pass resolved paths to the owning layer. macOS is the primary development and validation platform. Windows is a target, not yet tested or fully supported. Future distribution may produce separate artifacts from the shared source tree.

## 2026-10-04 — Integrated browser profile and trust requirements (decided, not implemented)

Integrated browsing will use a dedicated persistent Chromium profile, separate from trusted UI state, Quick Session files, and the user's normal browser. Site logins/cookies/storage may persist across restarts; do not import normal-browser cookies or keep an application-maintained browsing-history database. Clear Session removes Quick Session files. Clear Browsing Data separately clears the isolated browser profile and may sign the user out.

Remote website content must remain sandboxed in a dedicated WebContentsView/session with context isolation, Node integration disabled, and no privileged preload, filesystem access, backend credentials, or launch token. Explicitly control navigation, popups, external protocols, downloads, and permissions, denying unimplemented capabilities. Privileged IPC is restricted to registered trusted views with sender/frame and argument validation. Prevent remote browser access to the app's loopback endpoint as defense in depth; apply an appropriate CSP to trusted UI. Trusted UI must not navigate to arbitrary remote content.

## 2026-10-04 — Native composition proof before browser shell (decided, not implemented)

Keep the existing trusted BrowserWindow as the starting point. Before building the browser shell, prove native WebContentsView placement and tray composition; CSS stacking cannot be relied upon to overlay a native view. A bounded trusted native child view above the browser is a candidate, with main owning bounds/order/lifecycle; do not use a window-sized transparent overlay that intercepts browser input. Validate hit testing, focus/keyboard, resize/minimum size, Browse/Gallery switching, hidden browser-state retention, and explicit view disposal. Do not lock this candidate until the spike validates it. BaseWindow remains an alternative only if the proof shows a concrete reason.

## Current scaffold assumptions

- Development starts the Java backend as an Electron-managed Maven child process.
- The current development scaffold uses fixed loopback port 8765 with a fresh random token per Electron launch; it may remain through browser-shell work. Before persistence, Java should bind a dynamic loopback port; the readiness protocol is open.
- The current `/api/**` filter requires the token on those paths. Harden authentication to all backend HTTP requests and verify path handling through a real server before protected data endpoints are added. This is preventative hardening, not a claim of a known exploitable bypass.
- The scaffold does not implement integrated browsing, capture, or Quick Session persistence. macOS is the primary validation platform; Windows has not yet been validated.
- Production backend packaging, installer design, and persistent manifest format are not decided here.

## Future Quick Session requirements (decided direction, not implemented)

Keep the file-based/no-SQLite direction. Use recoverable app-data paths resolved through platform APIs; versioned manifests; relative internal paths; generated portable filenames; and original filenames/URLs as metadata where useful. Finish media writes before manifest references are committed. Use safe replacement/atomic-move behavior where supported and define recovery for interrupted writes, corrupt manifests, and orphaned media. Serialize clearing with capture/writes. Manual deletion of the session directory should restore as cleared state; surface deletion/write failures honestly. Do not create a generic storage framework.

Before persistence, establish single-instance/session-writer ownership, stale/dead backend handling, and bounded backend-loss behavior for writes. Java selects/binds a dynamic loopback port; do not select and release it in Electron first.

## Future capture seam (decided direction, not implemented)

Keep capture metadata/provenance distinct from byte acquisition. Java may initially fetch ordinary public HTTP(S) media. Electron may later acquire bytes through the relevant Chromium session when authentication/request context is required; Java accepts, validates, stores media, and records session state. Do not add general cookie export or arbitrary privileged fetch IPC for remote content. Authenticated, blob, and video capture remain future work.

## Future possibilities (not commitments or implemented)

References-only/offline/hybrid gallery behavior; choice of physical gallery representation and extension; visual Board concepts and format; encrypted/protected storage; additional capture sources after the initial image slice. No permanent gallery catalog is presumed.
