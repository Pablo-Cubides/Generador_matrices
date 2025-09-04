import fs from 'fs';
import path from 'path';

export default async function Fundamentos() {
  const kbPath = path.join(process.cwd(), 'content', 'knowledge', 'knowledge.json');
  let content = { fundamentos: [] } as any;
  try { content = JSON.parse(fs.readFileSync(kbPath, 'utf8')); } catch (e) { /* ignore */ }

  return (
    <div className="max-w-5xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Fundamentos</h2>
      <div className="grid gap-4">
        {content.fundamentos?.map((f: any, i: number) => (
          <article key={i} className="border p-4 rounded">
            <h3 className="font-bold">{f.file}</h3>
            <p className="text-sm whitespace-pre-wrap mt-2">{f.text.slice(0, 200)}...</p>
          </article>
        ))}
        {(!content.fundamentos || content.fundamentos.length === 0) && (
          <p className="text-muted">No se encontró contenido. Ejecute <code>npm run parse:docx</code> para generar `knowledge.json`.</p>
        )}
      </div>
    </div>
  );
}
