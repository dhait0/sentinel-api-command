import { StatePill } from "@/components/state-pill";
import type { IncidentRecord } from "@/lib/api-data";

type IncidentStripProps = {
  incident: IncidentRecord;
};

export function IncidentStrip({ incident }: IncidentStripProps) {
  return (
    <article className="incident-strip">
      <div>
        <strong>
          {incident.id} · {incident.title}
        </strong>
        <span>{incident.titleEs}</span>
        <code>{incident.endpoint}</code>
      </div>
      <StatePill state={incident.severity} />
      <StatePill state={incident.status} />
      <small>{incident.openedAgo}</small>
    </article>
  );
}
