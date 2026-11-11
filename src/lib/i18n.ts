export const idiomas = ['es', 'en'] as const;
export type Idioma = (typeof idiomas)[number];

export const paginas = [
  { clave: 'inicio', ruta: '', es: 'Inicio', en: 'Home' },
  { clave: 'proyecto', ruta: 'proyecto', es: 'Proyecto', en: 'Project' },
  { clave: 'soportes', ruta: 'soportes', es: 'Soportes', en: 'Media' },
  { clave: 'metodologia', ruta: 'metodologia', es: 'Metodología', en: 'Methods' },
  { clave: 'equipo', ruta: 'equipo', es: 'Equipo', en: 'Team' },
  { clave: 'hitos', ruta: 'hitos', es: 'Hitos', en: 'Milestones' },
  { clave: 'avances', ruta: 'avances', es: 'Avances', en: 'News' },
  { clave: 'recursos', ruta: 'recursos', es: 'Recursos', en: 'Resources' },
  { clave: 'contacto', ruta: 'contacto', es: 'Contacto', en: 'Contact' },
] as const;

const ui = {
  es: {
    saltar: 'Saltar al contenido',
    menu: 'Menú',
    principal: 'Principal',
    idioma: 'Idioma',
    otroIdioma: 'English',
    realce: 'Realce DStretch',
    realceAyuda: 'Izquierda: fotografía natural. Derecha: realce.',
    imagen: 'Imagen',
    cargarMapa: 'Cargar mapa',
    cargarModelo: 'Cargar modelo 3D',
    aviso3ros: 'Se cargará contenido de',
    leerMas: 'Leer más',
    todos: 'Ver todos los avances',
    sinAvances: 'Aún no hay avances publicados.',
    sinRecursos: 'Los recursos se publicarán a medida que el proyecto avance.',
    investigacion: 'Investigación',
    gestion: 'Gestión y apoyo',
    pendiente: 'Pendiente',
    'en-curso': 'En curso',
    cumplido: 'Cumplido',
    contacto: 'Contacto',
    financiamiento: 'Financiamiento',
    publicacion: 'Publicación',
    dataset: 'Datos',
    codigo: 'Código',
    taller: 'Taller',
    presentacion: 'Presentación',
    volver: 'Volver a avances',
    proximo: 'Próximo',
    pasos: 'Cómo trabajamos',
    tresSoportes: 'Las mismas figuras, en tres soportes',
    ultimos: 'Avances',
  },
  en: {
    saltar: 'Skip to content',
    menu: 'Menu',
    principal: 'Main',
    idioma: 'Language',
    otroIdioma: 'Español',
    realce: 'DStretch enhancement',
    realceAyuda: 'Left: natural photograph. Right: enhanced.',
    imagen: 'Image',
    cargarMapa: 'Load map',
    cargarModelo: 'Load 3D model',
    aviso3ros: 'This will load content from',
    leerMas: 'Read more',
    todos: 'See all news',
    sinAvances: 'No news has been published yet.',
    sinRecursos: 'Resources will be published as the project progresses.',
    investigacion: 'Research',
    gestion: 'Management and support',
    pendiente: 'Upcoming',
    'en-curso': 'In progress',
    cumplido: 'Done',
    contacto: 'Contact',
    financiamiento: 'Funding',
    publicacion: 'Publication',
    dataset: 'Data',
    codigo: 'Code',
    taller: 'Workshop',
    presentacion: 'Presentation',
    volver: 'Back to news',
    proximo: 'Next',
    pasos: 'How we work',
    tresSoportes: 'The same figures, on three media',
    ultimos: 'News',
  },
} as const;

export type ClaveUI = keyof (typeof ui)['es'];

export function t(lang: Idioma, clave: ClaveUI): string {
  return ui[lang][clave];
}

/** Campo bilingüe: obj[`${campo}_es`] u obj[`${campo}_en`]. */
export function campo(obj: Record<string, unknown>, nombre: string, lang: Idioma): string {
  return (obj[`${nombre}_${lang}`] as string) ?? '';
}

const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export function ruta(lang: Idioma, ...partes: string[]): string {
  const resto = partes.filter(Boolean).join('/');
  return `${base}/${lang}/${resto ? resto + '/' : ''}`;
}

export function fecha(d: Date, lang: Idioma, opciones: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'long', year: 'numeric' }) {
  return d.toLocaleDateString(lang === 'es' ? 'es-CL' : 'en-GB', { ...opciones, timeZone: 'UTC' });
}

export function mes(aaaamm: string, lang: Idioma) {
  const [a, m] = aaaamm.split('-').map(Number);
  return fecha(new Date(Date.UTC(a, m - 1, 1)), lang, { month: 'short', year: 'numeric' });
}
