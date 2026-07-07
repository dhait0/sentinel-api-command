import { StatePill } from "@/components/state-pill";
import type { IntegrationContract } from "@/lib/api-data";

type EndpointRowProps = {
  integration: IntegrationContract;
};

export function EndpointRow({ integration }: EndpointRowProps) {
  return (
    <article className="endpoint-row">
      <div className="method-cell">{integration.method}</div>
      <div className="endpoint-main">
        <strong>{integration.path}</strong>
        <span>
          {integration.system} / {integration.systemEs}
        </span>
      </div>
      <div>
        <small>Owner</small>
        <span>{integration.owner}</span>
      </div>
      <div>
        <small>Latency</small>
        <span>{integration.latencyMs > 0 ? `${integration.latencyMs}ms` : "Paused"}</span>
      </div>
      <div>
        <small>Success</small>
        <span>{integration.successRate}</span>
      </div>
      <StatePill state={integration.state} />
    </article>
  );
}
