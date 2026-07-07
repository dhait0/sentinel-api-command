import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const outputDir = new URL("../public/screenshots/", import.meta.url);

const endpoints = [
  ["POST", "/api/integrations/graph/users/sync", "Microsoft Graph directory sync", "184ms", "OPR", "#22a06b"],
  ["PATCH", "/api/integrations/erp/invoices", "ERP invoice export", "940ms", "DLY", "#d99a22"],
  ["POST", "/api/integrations/support/tickets", "Support ticket routing", "211ms", "OPR", "#22a06b"],
  ["GET", "/api/integrations/vendors/risk", "Vendor risk lookup", "Paused", "BLK", "#df4b4b"],
];

const incidents = [
  ["INC-2407", "ERP export exceeded latency budget", "MED", "MIT"],
  ["INC-2408", "Vendor risk provider returned stale token", "HIGH", "TRIAGE"],
  ["INC-2402", "Ticket route replay completed", "LOW", "DONE"],
];

function esc(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&apos;");
}

function wrap(text, size) {
  return text.length > size ? `${text.slice(0, size - 1)}…` : text;
}

function endpointRows(width = 870, compact = false) {
  return endpoints
    .map((endpoint, index) => {
      const y = 96 + index * (compact ? 122 : 78);
      return `
        <g transform="translate(0, ${y})">
          <rect width="${width}" height="${compact ? 106 : 64}" fill="#f8f9f3" stroke="#cad1ca" />
          <rect x="18" y="14" width="62" height="36" fill="#111314" />
          <text x="49" y="37" text-anchor="middle" fill="#f8f9f3" font-size="12" font-weight="800">${endpoint[0]}</text>
          <text x="98" y="28" fill="#111314" font-family="monospace" font-size="${compact ? 12 : 14}" font-weight="800">${esc(wrap(endpoint[1], compact ? 24 : 52))}</text>
          <text x="98" y="49" fill="#64706b" font-size="11">${esc(endpoint[2])}</text>
          <text x="${compact ? 98 : width - 150}" y="${compact ? 78 : 38}" fill="#111314" font-size="14" font-weight="800">${endpoint[3]}</text>
          <rect x="${width - 70}" y="18" width="50" height="28" fill="${endpoint[5]}" opacity="0.18" stroke="#26302c" />
          <text x="${width - 45}" y="36" text-anchor="middle" fill="${endpoint[5]}" font-size="11" font-weight="900">${endpoint[4]}</text>
        </g>`;
    })
    .join("");
}

function incidentRows(compact = false) {
  return incidents
    .map((incident, index) => {
      const y = 92 + index * (compact ? 92 : 72);
      const width = compact ? 354 : 870;
      return `
        <g transform="translate(0, ${y})">
          <rect width="${width}" height="${compact ? 76 : 56}" fill="#f8f9f3" stroke="#cad1ca" />
          <text x="18" y="26" fill="#111314" font-size="13" font-weight="800">${incident[0]} · ${esc(wrap(incident[1], compact ? 22 : 58))}</text>
          <text x="18" y="${compact ? 52 : 44}" fill="#2f72e8" font-family="monospace" font-size="11">/api/incidents</text>
          <rect x="${compact ? 238 : 720}" y="16" width="54" height="26" fill="#d99a22" opacity="0.18" stroke="#26302c" />
          <text x="${compact ? 265 : 747}" y="33" text-anchor="middle" fill="#8a570c" font-size="10" font-weight="900">${incident[2]}</text>
          <rect x="${compact ? 296 : 786}" y="16" width="${compact ? 44 : 64}" height="26" fill="#df4b4b" opacity="0.16" stroke="#26302c" />
          <text x="${compact ? 318 : 818}" y="33" text-anchor="middle" fill="#a52828" font-size="10" font-weight="900">${incident[3]}</text>
        </g>`;
    })
    .join("");
}

function desktopSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="1440" height="1180" viewBox="0 0 1440 1180">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(248,249,243,0.05)" />
        </pattern>
      </defs>
      <rect width="1440" height="1180" fill="#101314" />
      <rect width="1440" height="1180" fill="url(#grid)" />
      <g transform="translate(28,28)">
        <rect width="1384" height="216" fill="#e9ece7" stroke="#e9ece7" />
        <text x="28" y="42" fill="#64706b" font-size="12" font-weight="800" letter-spacing="2">SENTINEL API COMMAND</text>
        <text x="28" y="128" fill="#111314" font-size="76" font-weight="900">REST integration control</text>
        <text x="884" y="86" fill="#38413d" font-size="18">English: Contract-first mock APIs for enterprise integrations.</text>
        <text x="884" y="120" fill="#38413d" font-size="18">Español: APIs demo con contratos para integraciones enterprise.</text>
      </g>

      <g transform="translate(28,244)">
        <rect width="346" height="118" fill="#f8f9f3" stroke="#e9ece7" />
        <rect x="346" width="346" height="118" fill="#f8f9f3" stroke="#e9ece7" />
        <rect x="692" width="346" height="118" fill="#f8f9f3" stroke="#e9ece7" />
        <rect x="1038" width="346" height="118" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="22" y="34" fill="#64706b" font-size="11" font-weight="800">SERVICE STATUS / ESTADO</text>
        <text x="22" y="78" fill="#111314" font-size="28" font-weight="900">DEGRADED</text>
        <text x="368" y="34" fill="#64706b" font-size="11" font-weight="800">INTEGRATIONS / INTEGRACIONES</text>
        <text x="368" y="78" fill="#111314" font-size="28" font-weight="900">4</text>
        <text x="714" y="34" fill="#64706b" font-size="11" font-weight="800">DEGRADED / DEGRADADAS</text>
        <text x="714" y="78" fill="#111314" font-size="28" font-weight="900">2</text>
        <text x="1060" y="34" fill="#64706b" font-size="11" font-weight="800">DEMO ENDPOINT</text>
        <text x="1060" y="78" fill="#2f72e8" font-family="monospace" font-size="17" font-weight="900">GET /api/health</text>
      </g>

      <g transform="translate(28,390)">
        <rect width="900" height="432" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="20" y="34" fill="#64706b" font-size="11" font-weight="800" letter-spacing="2">ENDPOINT REGISTRY / REGISTRO</text>
        <text x="20" y="66" fill="#111314" font-size="25" font-weight="900">Mock integration surface</text>
        ${endpointRows(900)}
      </g>

      <g transform="translate(956,390)">
        <rect width="456" height="432" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="20" y="34" fill="#64706b" font-size="11" font-weight="800" letter-spacing="2">REQUEST CONTRACT / CONTRATO</text>
        <text x="20" y="66" fill="#111314" font-size="25" font-weight="900">Signed payload</text>
        <rect x="20" y="96" width="416" height="44" fill="#f8f9f3" stroke="#cad1ca" />
        <text x="36" y="123" fill="#2f72e8" font-family="monospace" font-size="13" font-weight="900">requestId</text>
        <text x="316" y="123" fill="#64706b" font-size="12">required</text>
        <rect x="20" y="140" width="416" height="44" fill="#f8f9f3" stroke="#cad1ca" />
        <text x="36" y="167" fill="#2f72e8" font-family="monospace" font-size="13" font-weight="900">tenantKey</text>
        <text x="316" y="167" fill="#64706b" font-size="12">required</text>
        <rect x="20" y="210" width="416" height="160" fill="#101314" stroke="#26302c" />
        <text x="42" y="246" fill="#d8f8e9" font-family="monospace" font-size="13">{ "requestId": "demo-84f2",</text>
        <text x="42" y="278" fill="#d8f8e9" font-family="monospace" font-size="13">  "tenantKey": "public-demo",</text>
        <text x="42" y="310" fill="#d8f8e9" font-family="monospace" font-size="13">  "signature": "mock-sha256" }</text>
      </g>

      <g transform="translate(28,850)">
        <rect width="900" height="284" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="20" y="34" fill="#64706b" font-size="11" font-weight="800" letter-spacing="2">INCIDENT STREAM / FLUJO</text>
        <text x="20" y="66" fill="#111314" font-size="25" font-weight="900">API operations</text>
        ${incidentRows()}
      </g>
    </svg>`;
}

function mobileSvg() {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" width="390" height="1880" viewBox="0 0 390 1880">
      <defs>
        <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0 L0 0 0 32" fill="none" stroke="rgba(248,249,243,0.05)" />
        </pattern>
      </defs>
      <rect width="390" height="1880" fill="#101314" />
      <rect width="390" height="1880" fill="url(#grid)" />
      <g transform="translate(14,14)">
        <rect width="362" height="300" fill="#e9ece7" stroke="#e9ece7" />
        <text x="18" y="36" fill="#64706b" font-size="10" font-weight="800" letter-spacing="1.7">SENTINEL API COMMAND</text>
        <text x="18" y="100" fill="#111314" font-size="43" font-weight="900">REST</text>
        <text x="18" y="146" fill="#111314" font-size="43" font-weight="900">integration</text>
        <text x="18" y="192" fill="#111314" font-size="43" font-weight="900">control</text>
        <text x="18" y="238" fill="#38413d" font-size="12">English: Contract-first mock APIs.</text>
        <text x="18" y="262" fill="#38413d" font-size="12">Español: APIs demo con contratos.</text>
      </g>

      <g transform="translate(14,334)">
        <rect width="362" height="92" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="30" fill="#64706b" font-size="10" font-weight="800">SERVICE STATUS / ESTADO</text>
        <text x="18" y="66" fill="#111314" font-size="25" font-weight="900">DEGRADED</text>
        <rect y="106" width="362" height="92" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="136" fill="#64706b" font-size="10" font-weight="800">INTEGRATIONS / INTEGRACIONES</text>
        <text x="18" y="172" fill="#111314" font-size="25" font-weight="900">4</text>
        <rect y="212" width="362" height="92" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="242" fill="#64706b" font-size="10" font-weight="800">DEMO ENDPOINT</text>
        <text x="18" y="278" fill="#2f72e8" font-family="monospace" font-size="15" font-weight="900">GET /api/health</text>
      </g>

      <g transform="translate(14,668)">
        <rect width="362" height="620" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="34" fill="#64706b" font-size="10" font-weight="800" letter-spacing="1.5">ENDPOINT REGISTRY / REGISTRO</text>
        <text x="18" y="66" fill="#111314" font-size="24" font-weight="900">Mock integration surface</text>
        ${endpointRows(362, true)}
      </g>

      <g transform="translate(14,1310)">
        <rect width="362" height="342" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="34" fill="#64706b" font-size="10" font-weight="800" letter-spacing="1.5">INCIDENT STREAM / FLUJO</text>
        <text x="18" y="66" fill="#111314" font-size="24" font-weight="900">API operations</text>
        ${incidentRows(true)}
      </g>

      <g transform="translate(14,1674)">
        <rect width="362" height="170" fill="#f8f9f3" stroke="#e9ece7" />
        <text x="18" y="34" fill="#64706b" font-size="10" font-weight="800">REQUEST CONTRACT / CONTRATO</text>
        <rect x="18" y="58" width="326" height="88" fill="#101314" stroke="#26302c" />
        <text x="34" y="91" fill="#d8f8e9" font-family="monospace" font-size="11">{ "requestId": "demo-84f2",</text>
        <text x="34" y="118" fill="#d8f8e9" font-family="monospace" font-size="11">  "signature": "mock-sha256" }</text>
      </g>
    </svg>`;
}

async function main() {
  await mkdir(outputDir, { recursive: true });
  await sharp(Buffer.from(desktopSvg())).png().toFile(
    fileURLToPath(new URL("./sentinel-api-command-home-desktop.png", outputDir)),
  );
  await sharp(Buffer.from(mobileSvg())).png().toFile(
    fileURLToPath(new URL("./sentinel-api-command-home-mobile.png", outputDir)),
  );
}

await main();
