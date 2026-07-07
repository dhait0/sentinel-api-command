import type { IntegrationState, IncidentRecord } from "@/lib/api-data";

type StatePillProps = {
  state: IntegrationState | IncidentRecord["severity"] | IncidentRecord["status"];
};

const labels: Record<StatePillProps["state"], string> = {
  operational: "OPR",
  delayed: "DLY",
  blocked: "BLK",
  low: "LOW",
  medium: "MED",
  high: "HIGH",
  triage: "TRIAGE",
  mitigating: "MIT",
  resolved: "DONE",
};

export function StatePill({ state }: StatePillProps) {
  return <span className={`state-pill state-${state}`}>{labels[state]}</span>;
}
