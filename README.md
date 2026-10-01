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

Install Java 21, Maven 3.9+, Node.js 20+, and npm. The commands below have been set up for macOS/Linux shells.

## Development

From the repository root:

```sh
npm install
cd backend && mvn test && cd ..
npm run typecheck
npm run build
npm run dev
```

`npm run dev` starts Vite and Electron. Electron starts `mvn -f backend/pom.xml spring-boot:run`, generates a per-launch random token, passes it to the backend, and waits for the authenticated health endpoint on `127.0.0.1:8765` before opening the renderer. Maven logs appear in the terminal. Closing the app stops the backend process. The API currently exposes only `GET /api/health` and requires the `X-App-Token` header. Do not expose the server on a public interface.

`npm run build` compiles the renderer into `desktop/dist`. Production Java packaging and installer bundling are not configured yet; development startup is the supported integrated path for this scaffold.

## Status

Scaffold only. No integrated browser, capture behavior, Quick Session persistence, or saved gallery implementation exists. See [docs/MVP.md](docs/MVP.md) for the planned first usable slice.
