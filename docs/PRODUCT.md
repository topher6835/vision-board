# Product

## Thesis

Vision Board tests whether collecting scattered images and videos into a temporary gallery makes browsing and deciding what to keep feel better than managing many tabs or downloading everything first.

## Workflow

**Browse → Collect → View → Decide.** It is viewing-first and session-first, not primarily a downloader, permanent library, or general-purpose browser. The target user finds media across websites, adds individual items to one active Quick Session, views them together, then clears the session or saves references/media.

## Concepts

- **Quick Session (planned):** one active, intentionally temporary collection. It is intended to survive crashes and restarts until explicitly cleared; this is not implemented in the scaffold.
- **Saved gallery (future):** a portable collection owned and managed by the user. It should be movable, renameable, manually deletable, and reopenable without a hidden permanent catalog by default. It may eventually hold references, included media, or a mix. Its physical format and extension are open.

## Platform direction

Vision Board targets macOS and Windows from one shared codebase. Core domain and storage formats remain platform-neutral; platform-specific behavior belongs behind narrow boundaries such as app-data path resolution, process launching/termination, native integration, and distribution. macOS is the primary development and validation platform. Windows is a target, but is not yet tested or fully supported. Future distribution may produce separate platform artifacts. Application-data paths come from platform APIs; any OS-specific path shown in documentation is an example, not a portable contract.

## Implementation status

The current scaffold has a placeholder React screen and token-gated Spring Boot health endpoint. Integrated browsing, isolated browser profiles, capture, Quick Session persistence, and saved galleries are planned and not implemented.

## Future directions

The initial capture slice targets ordinary HTML images. Later possibilities include video, other capture sources, package persistence, and a visual board. These are future directions, not implemented features or commitments to a schedule. The app is not designed to bypass DRM, encryption, paywalls, or technical access controls.
