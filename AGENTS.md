# Instructions for coding agents

- Inspect relevant docs and current implementation before editing; work only within the prompt's bounded milestone.
- Do not silently expand scope or invent product/architecture decisions. Stop and surface meaningful ambiguity rather than guessing.
- Do not commit or push unless explicitly instructed.
- Run the requested validation and report changes, commands/results, failures, and deferred or manual checks.
- Preserve the privacy and storage guarantees: the active Quick Session uses an app-managed, clearable directory rather than a persistent database; saved galleries are portable user-owned collections without a hidden permanent catalog by default.
- Java is the trusted application/backend layer. Electron owns Chromium, browser sessions, navigation, and browser events.
- Remote content must never receive Node.js, filesystem, or direct backend privileges. Keep context isolation and sandboxing enabled, Node integration disabled, and IPC narrow.
- macOS and Windows are one-codebase targets; macOS is primary for development and validation, and Windows is not yet validated. Keep platform-specific behavior behind narrow boundaries and obtain application/storage paths from platform APIs.
- Treat integrated browser state, Quick Session files, and trusted UI state as separate. Remote browser content is untrusted.
- Do not add persistent histories/databases for temporary sessions, SQLite, dependencies, or speculative features without a demonstrated need.
- Update relevant docs and `docs/DECISIONS.md` when an architectural decision changes.
- Do not claim forensic secure deletion. “Clear” means deleting app-managed temporary session data.
