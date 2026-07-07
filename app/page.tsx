import { EndpointRow } from "@/components/endpoint-row";
import { IncidentStrip } from "@/components/incident-strip";
import { SchemaTable } from "@/components/schema-table";
import { buildHealthResponse, incidents, integrations } from "@/lib/api-data";

const health = buildHealthResponse();

export default function Home() {
  return (
    <main className="api-shell">
      <header className="masthead">
        <div>
          <span>Sentinel API Command</span>
          <h1>REST integration control</h1>
        </div>
        <p>
          English: Contract-first mock APIs for enterprise integrations. Español: APIs demo con
          contratos para integraciones enterprise.
        </p>
      </header>

      <section className="health-band" aria-label="API health">
        <article>
          <small>Service status / Estado</small>
          <strong>{health.status}</strong>
        </article>
        <article>
          <small>Integrations / Integraciones</small>
          <strong>{health.integrations}</strong>
        </article>
        <article>
          <small>Degraded / Degradadas</small>
          <strong>{health.degraded}</strong>
        </article>
        <article>
          <small>Demo endpoint</small>
          <code>GET /api/health</code>
        </article>
      </section>

      <section className="command-grid">
        <div className="endpoint-panel">
          <div className="panel-title">
            <span>Endpoint registry / Registro de endpoints</span>
            <strong>Mock integration surface</strong>
          </div>
          <div className="endpoint-list">
            {integrations.map((integration) => (
              <EndpointRow key={integration.id} integration={integration} />
            ))}
          </div>
        </div>

        <aside className="contract-panel">
          <div className="panel-title">
            <span>Request contract / Contrato</span>
            <strong>Signed payload</strong>
          </div>
          <SchemaTable />
          <pre>{`{
  "requestId": "demo-84f2",
  "tenantKey": "public-demo",
  "signature": "mock-sha256"
}`}</pre>
        </aside>

        <div className="incident-panel">
          <div className="panel-title">
            <span>Incident stream / Flujo de incidentes</span>
            <strong>API operations</strong>
          </div>
          <div className="incident-list">
            {incidents.map((incident) => (
              <IncidentStrip key={incident.id} incident={incident} />
            ))}
          </div>
        </div>

        <aside className="curl-panel">
          <div className="panel-title">
            <span>Local smoke test / Prueba local</span>
            <strong>REST check</strong>
          </div>
          <pre>{`curl http://localhost:3000/api/integrations
curl http://localhost:3000/api/incidents`}</pre>
        </aside>
      </section>
    </main>
  );
}
