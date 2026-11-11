import { idiomas } from './i18n';

export function rutasIdioma() {
  return idiomas.map((lang) => ({ params: { lang } }));
}
