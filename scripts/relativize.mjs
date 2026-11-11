// Convierte la compilación en una vista previa que funciona sin servidor:
// rutas absolutas → relativas, y enlaces a carpetas → index.html.
// Uso: node scripts/relativize.mjs dist preview
import { cpSync, readdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative, dirname, sep } from 'node:path';

const [origen = 'dist', destino = 'preview'] = process.argv.slice(2);
rmSync(destino, { recursive: true, force: true });
cpSync(origen, destino, { recursive: true });

function archivos(dir) {
  return readdirSync(dir).flatMap((n) => {
    const p = join(dir, n);
    return statSync(p).isDirectory() ? archivos(p) : [p];
  });
}

function aRelativa(desdeArchivo, ruta) {
  const [camino, resto = ''] = ruta.split(/(?=[?#])/);
  let objetivo = camino.replace(/^\//, '');
  if (objetivo === '' || objetivo.endsWith('/')) objetivo += 'index.html';
  let rel = relative(dirname(desdeArchivo), join(destino, objetivo)).split(sep).join('/');
  if (!rel.startsWith('.')) rel = './' + rel;
  return rel + resto;
}

for (const f of archivos(destino)) {
  if (f.endsWith('.html')) {
    let s = readFileSync(f, 'utf8');
    s = s.replace(/(\s(?:href|src|srcset|content|action)=")([^"]*)"/g, (m, attr, val) => {
      const nuevo = val
        .split(',')
        .map((parte) =>
          parte.replace(/(^\s*)(\/(?!\/)[^\s]*)/, (_, esp, ruta) => esp + aRelativa(f, ruta))
        )
        .join(',');
      return attr + nuevo + '"';
    });
    s = s.replace(/url\((\/(?!\/)[^)]+)\)/g, (_, ruta) => `url(${aRelativa(f, ruta)})`);
    s = s.replace(/(content="\d+;\s*url=)(\/(?!\/)[^"]*)"/g, (_, pre, ruta) => `${pre}${aRelativa(f, ruta)}"`);
    writeFileSync(f, s);
  } else if (f.endsWith('.css')) {
    let s = readFileSync(f, 'utf8');
    s = s.replace(/url\((["']?)(\/(?!\/)[^)"']+)\1\)/g, (_, q, ruta) => `url(${q}${aRelativa(f, ruta)}${q})`);
    writeFileSync(f, s);
  }
}
console.log(`Vista previa con rutas relativas en ${destino}/`);
