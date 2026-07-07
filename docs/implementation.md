# Implementation

The project uses Next.js route handlers to expose mock REST endpoints and a server-rendered UI to present the same operating model.

## API routes

- `GET /api/health`
- `GET /api/integrations`
- `GET /api/incidents`

## UI

The UI is intentionally structured like an API command surface:

- service health band
- endpoint registry
- signed request contract
- incident stream
- local smoke-test commands

## Screenshots

Screenshots are generated with Sharp through `scripts/capture-screenshots.mjs`.
