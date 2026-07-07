export type IntegrationState = "operational" | "delayed" | "blocked";

export type IntegrationContract = {
  id: string;
  system: string;
  systemEs: string;
  method: "GET" | "POST" | "PATCH";
  path: string;
  owner: string;
  state: IntegrationState;
  latencyMs: number;
  successRate: string;
};

export type IncidentRecord = {
  id: string;
  title: string;
  titleEs: string;
  severity: "low" | "medium" | "high";
  endpoint: string;
  status: "triage" | "mitigating" | "resolved";
  openedAgo: string;
};

export const integrations: IntegrationContract[] = [
  {
    id: "graph-directory-sync",
    system: "Microsoft Graph directory sync",
    systemEs: "Sincronizacion de directorio Graph",
    method: "POST",
    path: "/api/integrations/graph/users/sync",
    owner: "Identity Platform",
    state: "operational",
    latencyMs: 184,
    successRate: "99.1%",
  },
  {
    id: "erp-invoice-export",
    system: "ERP invoice export",
    systemEs: "Exportacion de facturas ERP",
    method: "PATCH",
    path: "/api/integrations/erp/invoices",
    owner: "Finance Systems",
    state: "delayed",
    latencyMs: 940,
    successRate: "96.4%",
  },
  {
    id: "ticket-routing",
    system: "Support ticket routing",
    systemEs: "Enrutamiento de tickets",
    method: "POST",
    path: "/api/integrations/support/tickets",
    owner: "Customer Ops",
    state: "operational",
    latencyMs: 211,
    successRate: "98.8%",
  },
  {
    id: "vendor-risk-lookup",
    system: "Vendor risk lookup",
    systemEs: "Consulta de riesgo proveedor",
    method: "GET",
    path: "/api/integrations/vendors/risk",
    owner: "Security Operations",
    state: "blocked",
    latencyMs: 0,
    successRate: "Paused",
  },
];

export const incidents: IncidentRecord[] = [
  {
    id: "INC-2407",
    title: "ERP export exceeded latency budget",
    titleEs: "Exportacion ERP excedio latencia",
    severity: "medium",
    endpoint: "/api/integrations/erp/invoices",
    status: "mitigating",
    openedAgo: "18m",
  },
  {
    id: "INC-2408",
    title: "Vendor risk provider returned stale token",
    titleEs: "Proveedor de riesgo retorno token vencido",
    severity: "high",
    endpoint: "/api/integrations/vendors/risk",
    status: "triage",
    openedAgo: "7m",
  },
  {
    id: "INC-2402",
    title: "Ticket route replay completed",
    titleEs: "Reproceso de tickets completado",
    severity: "low",
    endpoint: "/api/integrations/support/tickets",
    status: "resolved",
    openedAgo: "2h",
  },
];

export const contractFields = [
  { name: "requestId", type: "string", required: true },
  { name: "tenantKey", type: "string", required: true },
  { name: "payload", type: "object", required: true },
  { name: "signature", type: "string", required: true },
  { name: "replaySafe", type: "boolean", required: false },
];

export function buildHealthResponse() {
  const degraded = integrations.filter((integration) => integration.state !== "operational");

  return {
    service: "sentinel-api-command",
    mode: "demo",
    status: degraded.length > 0 ? "degraded" : "operational",
    checkedAt: "2026-07-07T16:00:00.000Z",
    integrations: integrations.length,
    degraded: degraded.length,
  };
}
