# Architecture

Sentinel API Command is a Next.js REST API demo with an operations console UI.

## Boundaries

- `app/api/health/route.ts` exposes service health.
- `app/api/integrations/route.ts` exposes mock integration contracts.
- `app/api/incidents/route.ts` exposes mock incident records.
- `lib/api-data.ts` owns typed synthetic data and response builders.
- `components/` owns reusable presentation primitives.

## Safety

All data is synthetic. The project does not include real credentials, internal URLs, customer data, production schemas, or private business logic.
