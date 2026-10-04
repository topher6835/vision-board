# Vision Board

Vision Board is a private, local-first desktop app for collecting media into a temporary viewing session. This repository is at the scaffold stage: it provides a minimal Electron/React shell and a token-gated Spring Boot health endpoint. Media capture and gallery workflows are not implemented.

## Stack

- Desktop: Electron, React, TypeScript, Vite, Tailwind CSS
- Backend: Java 21, Spring Boot, Maven

## Repository

```text
desktop/   Electron main/preload and React renderer
backend/   Spring Boot application and tests
docs/      Product, architecture, privacy, UX, MVP, and decisions
```

## Prerequisites

Install Java 21, Maven 3.9+, Node.js 22.12.0 or newer, and npm. Electron 44.5.1 sets the Node minimum; Vite 8.3.1 and `@vitejs/plugin-react` 6.1.1 also require Node 20.19+ or 22.12+. The commands below have been set up for macOS/Linux shells.

## Development

From the repository root:

```sh
npm install
cd backend && mvn test && cd ..
npm run typecheck
npm run build
npm run dev
```

`npm run dev` starts Vite and Electron. Electron starts `mvn -f backend/pom.xml spring-boot:run`, generates a per-launch random token, passes it to the backend, and waits for the authenticated health endpoint on `127.0.0.1:8765` before opening the renderer. If the backend exits, rejects authentication, or misses the 30-second deadline, Electron shows a native startup error and exits without opening the renderer. On macOS the app remains active when its last window closes; activating it again recreates the window without starting another backend. The Maven process is started in its own process group; app quit or the first `SIGINT`/`SIGTERM` (including Ctrl+C during development) sends that group `SIGTERM` and escalates to `SIGKILL` after two seconds if it remains. A second termination signal force-exits the desktop process and backend group. Maven logs appear in the terminal. The API currently exposes only `GET /api/health`; all `/api/**` routes require the `X-App-Token` header. Do not expose the server on a public interface.

After quitting the development app, check for a remaining backend listener with:

```sh
lsof -nP -iTCP:8765 -sTCP:LISTEN
```

No output means there is no listener on that port. This check looks for any listener using port 8765.

`npm run build` compiles the renderer into `desktop/dist`. Production Java packaging and installer bundling are not configured yet; development startup is the supported integrated path for this scaffold.

## Status

Scaffold only. No integrated browser, capture behavior, Quick Session persistence, or saved gallery implementation exists. See [docs/MVP.md](docs/MVP.md) for the planned first usable slice.
