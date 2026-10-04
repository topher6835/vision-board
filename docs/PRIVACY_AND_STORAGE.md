# Privacy and storage

## Quick Session

There is one active Quick Session in the MVP. It is intended to survive accidental closure, crashes, and machine restarts, while remaining temporary and explicitly user-cleared; persistence is not implemented in the scaffold. Use recoverable application-data storage, not OS disposable temp storage. Resolve the application root through platform APIs, then pass the resolved path to the appropriate application layer. For example, `~/Library/Application Support/Vision Board/Temporary Session/` is a macOS path illustration only, not a portable contract. Keep a versioned manifest, thumbnails, and cached media beneath the session directory where practical. Removing that directory manually should result in cleared restored state. The app may later offer **Reveal Temporary Session Folder**.

When implemented, use relative internal paths and generated portable local filenames; retain original filenames and URLs as metadata where useful. Finish media writes before committing manifest references. Use a safe replacement/atomic-move strategy where filesystem support permits, and define recovery for interrupted writes, corrupt manifests, and orphaned media. Serialize clearing with capture and writes. Surface deletion and write failures honestly. Do not build a generic storage framework for these requirements.

Do not put active Quick Session state in persistent SQLite or another hidden application database. SQLite is not required for this product direction. Future quit behavior should offer **Keep Session & Quit**, **Clear Session & Quit**, and **Cancel** when a session is active.

Clearing deletes app-managed session data. It is not a promise of forensic secure deletion; OS, filesystem, backup, or storage-device artifacts may exist outside app control.

**Clear Session** removes Quick Session manifest, media, and thumbnails. **Clear Browsing Data** clears the separate Vision Board Chromium profile and may remove cookies, site storage, and cache, signing the user out. Clearing the Quick Session does not clear browser traces. The complete browsing-data UI is future work. Do not maintain an application browsing-history database.

## Integrated browser profile (planned)

The future integrated browser uses a dedicated persistent Chromium profile, isolated from the user's normal browsers, trusted UI state, and Quick Session files. Site cookies, logins, and storage may persist across Vision Board restarts. Never import cookies from the user's normal browser.

## Saved galleries (future)

Saved galleries should be user-owned, movable, renameable, manually deletable, and reopenable without an internal permanent catalog. They may eventually contain a manifest and, as applicable, thumbnails and media. The physical representation and extension remain open; a directory bundle, archive, or another representation is future work. They can live on external disks or in hidden/encrypted locations. Avoid OS Recent Documents integration and hidden recent-gallery history by default. Metadata should be versionable and internal references portable/relative where applicable.

- **References Only:** URLs, source page, metadata, and order; compact, may require internet access.
- **Include Media for Offline Viewing:** copy media when appropriate and possible, retaining source/provenance. Unsupported items may remain references.
- **Hybrid:** a package may contain both local media and references.

The package format is future work; it is not implemented here.

## Future protection

Encrypted/protected packages are only a future possibility. No encryption or secure-deletion guarantee is implemented or promised by this scaffold.
