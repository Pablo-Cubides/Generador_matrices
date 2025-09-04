// Script simple que convierte un .docx a JSON usando mammoth
const fs = require('fs');
const path = require('path');
const mammoth = require('mammoth');

const kbDir = path.join(__dirname, '..', 'content', 'knowledge');
const out = path.join(kbDir, 'knowledge.json');

async function run() {
  const files = fs.readdirSync(kbDir).filter(f => f.toLowerCase().endsWith('.docx'));
  const result = { fundamentos: [], definiciones: [], ejemplos: {} };

  for (const file of files) {
    const p = path.join(kbDir, file);
    const data = await mammoth.extractRawText({ path: p });
    const text = data.value;
    // Muy simple: separar por encabezados que comienzan en mayúscula y terminan con ':'
    const blocks = text.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
    result.fundamentos.push({ file, text: blocks.slice(0, 10).join('\n\n') });
  }

  fs.writeFileSync(out, JSON.stringify(result, null, 2), 'utf8');
  console.log('Wrote', out);
}

run().catch(err => { console.error(err); process.exit(1); });
