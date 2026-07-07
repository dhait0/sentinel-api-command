import { contractFields } from "@/lib/api-data";

export function SchemaTable() {
  return (
    <div className="schema-table">
      {contractFields.map((field) => (
        <article key={field.name}>
          <code>{field.name}</code>
          <span>{field.type}</span>
          <strong>{field.required ? "required" : "optional"}</strong>
        </article>
      ))}
    </div>
  );
}
