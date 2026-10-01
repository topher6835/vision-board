# Privacy and storage

## Quick Session

There is one active Quick Session in the MVP. It must survive accidental closure, crashes, and machine restarts, while remaining temporary and explicitly user-cleared. The intended macOS location is `~/Library/Application Support/Vision Board/Temporary Session/`. Keep manifest, thumbnails, and temporary cached media beneath this one obvious directory where practical. Removing that directory manually is equivalent to clearing the session. The app will later offer **Reveal Temporary Session Folder**.

Do not put active Quick Session state in persistent SQLite or another hidden application database. SQLite is not required for this product direction. Future quit behavior should offer **Keep Session & Quit**, **Clear Session & Quit**, and **Cancel** when a session is active.

Clearing deletes app-managed session data. It is not a promise of forensic secure deletion; OS, filesystem, backup, or storage-device artifacts may exist outside app control.

## Saved galleries (future)

Saved galleries should be user-owned, movable, renameable, manually deletable folders such as `My Session.pmbgallery/`, containing a manifest and, as applicable, thumbnails and media. They should reopen without an internal permanent catalog. They can live on external disks or in hidden/encrypted locations. Avoid OS Recent Documents integration and hidden recent-gallery history by default.

- **References Only:** URLs, source page, metadata, and order; compact, may require internet access.
- **Include Media for Offline Viewing:** copy media when appropriate and possible, retaining source/provenance. Unsupported items may remain references.
- **Hybrid:** a package may contain both local media and references.

The package format is future work; it is not implemented here.

## Future protection

Encrypted/protected packages are only a future possibility. No encryption or secure-deletion guarantee is implemented or promised by this scaffold.
