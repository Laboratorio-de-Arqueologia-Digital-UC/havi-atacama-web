import { marked } from 'marked';

marked.setOptions({ gfm: true, breaks: false });

/** Convierte el texto escrito en el editor (Markdown) a HTML. */
export function md(texto: string | undefined): string {
  if (!texto) return '';
  return marked.parse(texto, { async: false }) as string;
}
