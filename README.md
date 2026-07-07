# Project

Sentinel API Command / Comando API Sentinel

## Overview

English: Sentinel API Command is a bilingual REST API operations demo for mock enterprise integrations, endpoint health, request contracts, and incident visibility.

Español: Sentinel API Command es un demo bilingue de operaciones REST API para integraciones enterprise simuladas, salud de endpoints, contratos de request e incidentes.

## Features

- English: Real Next.js API routes / Español: Rutas API reales con Next.js
- English: Mock integration registry / Español: Registro de integraciones simuladas
- English: Health endpoint / Español: Endpoint de salud
- English: Incident stream / Español: Flujo de incidentes
- English: Request contract table / Español: Tabla de contrato de request
- English: Bilingual UI and documentation / Español: UI y documentacion bilingue

## Architecture

English: The project uses Next.js App Router, route handlers under `app/api/`, reusable UI components, and typed mock data in `lib/api-data.ts`.

Español: El proyecto usa Next.js App Router, route handlers en `app/api/`, componentes reutilizables y datos mock tipados en `lib/api-data.ts`.

## Tech Stack

- Next.js
- React
- TypeScript
- REST API route handlers
- ESLint
- Prettier
- Husky
- Sharp screenshot generation

## Installation

```bash
npm install
```

## Running locally

```bash
npm run dev
```

English: Open `http://localhost:3000`.

Español: Abre `http://localhost:3000`.

## Folder structure

```text
app/
app/api/
components/
docs/
lib/
public/
scripts/
README.md
AGENTS.md
package.json
```

## Screenshots

- [Desktop preview](public/screenshots/sentinel-api-command-home-desktop.png)
- [Mobile preview](public/screenshots/sentinel-api-command-home-mobile.png)

## Why this project exists

English: This repository demonstrates REST API thinking, integration contracts, and operational visibility without exposing private enterprise systems.

Español: Este repositorio demuestra criterio REST API, contratos de integracion y visibilidad operativa sin exponer sistemas privados.

## License

MIT
