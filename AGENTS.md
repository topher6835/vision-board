# Instructions for coding agents

- Read the relevant files in `docs/` before changing product behavior or architecture.
- Do not invent product requirements. Keep MVP work narrowly scoped to the documented milestones.
- Preserve the privacy and storage guarantees: the active Quick Session is temporary-directory based, not a persistent database; saved galleries are portable user-owned packages without a hidden permanent catalog by default.
- Java is the trusted application/backend layer. Electron owns Chromium, browser sessions, navigation, and browser events.
- Remote content must never receive Node.js, filesystem, or direct backend privileges. Keep context isolation and sandboxing enabled, Node integration disabled, and IPC narrow.
- Do not add persistent histories/databases for temporary sessions, SQLite, dependencies, or speculative features without a demonstrated need.
- Update the relevant docs and `docs/DECISIONS.md` when an architectural decision changes.
- When an important product decision is unclear, stop and ask rather than choosing silently.
- Do not claim forensic secure deletion. “Clear” means deleting app-managed temporary session data.
