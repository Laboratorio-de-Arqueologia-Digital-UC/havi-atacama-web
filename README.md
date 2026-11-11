# Sitio web de HAVI Atacama

Este es el sitio público, en español e inglés, del proyecto «Motifs Across Media: AI Analysis of Prehispanic Atacama Visual Systems». Es un sitio estático: se compila en una carpeta de archivos HTML, CSS e imágenes que cualquier servidor web puede publicar, sin base de datos ni servidor de aplicaciones.

## Para el equipo: cómo editar el sitio

El contenido se edita desde el navegador con [Pages CMS](https://app.pagescms.org), sin tocar código.

1. Entra a https://app.pagescms.org con tu cuenta de GitHub, o con el enlace de invitación que te llegó por correo.
2. Abre el proyecto `havi-atacama-web`.
3. En el menú de la izquierda elige qué editar:
   - **Avances (noticias):** crea una noticia con «Add an entry».
   - **Equipo:** una ficha por persona, con su foto cuadrada.
   - **Hitos:** el cronograma y el estado de cada entregable.
   - **Recursos:** publicaciones, datos, código y talleres, a medida que existan.
   - **Páginas** y **Portada:** los textos fijos.
   - **Sitio:** el correo de contacto, la frase de financiamiento y las instituciones.
4. Llena cada campo en **español y en inglés**. Los obligatorios están marcados.
5. Presiona **Save**. Uno o dos minutos después, el cambio queda compilado.

Algunas reglas:

- **Imágenes:** súbelas en JPG, con un máximo de unos 3000 px de lado. El sitio genera versiones livianas automáticamente. Cada imagen necesita su descripción para lectores de pantalla y su crédito.
- **Mapas y modelos 3D:** en «Mapas y modelos 3D incrustados», elige ArcGIS o Sketchfab y pega el enlace público. Solo se aceptan enlaces `https` de arcgis.com o sketchfab.com. El mapa debe estar compartido como público en ArcGIS Online y mostrar las ubicaciones con el nivel de detalle que defina el inventario.
- **Borradores:** una noticia marcada como «Borrador» no se publica.
- **Si falta un campo obligatorio,** la compilación falla y el sitio publicado no cambia. El error aparece en la pestaña *Actions* del repositorio.

## Estructura

| Carpeta | Contenido |
| --- | --- |
| `src/content/` | Todo el contenido editable, en archivos YAML (uno por noticia, persona, hito, etc.) |
| `src/content.config.ts` | Los campos obligatorios y su validación |
| `src/assets/media/` | Imágenes del contenido |
| `src/pages/[lang]/` | Las páginas; cada una existe en `/es/` y `/en/` |
| `src/components/` | Componentes: realce DStretch, figuras, incrustaciones, etc. |
| `src/lib/i18n.ts` | Textos fijos de la interfaz en ambos idiomas |
| `.pages.yml` | Formularios de Pages CMS |
| `.claude/skills/` | Skills de diseño para agentes (ver `.claude/skills/README.md`) |
| `PRODUCT.md`, `DESIGN.md` | Contexto del producto y sistema visual |

## Para desarrollo

Se necesita Node.js 22 o superior.

```bash
npm ci
npm run dev        # http://localhost:4321
npm run build      # compila en dist/
```

Variables de entorno opcionales:

- `BASE_PATH`: subcarpeta de publicación, por ejemplo `/havi-atacama-web/` en GitHub Pages. En el servidor de CENIA, con dominio propio, se deja vacía.
- `SITE_URL`: dominio final, que por ahora es `https://havi-atacama.cenia.cl` (por confirmar).

## Publicación

Cada cambio en la rama `main` ejecuta el flujo `.github/workflows/build.yml`. Este compila el sitio y deja la carpeta lista como un artefacto descargable llamado `sitio-havi-atacama`. Para el servidor de CENIA basta con copiar el contenido de ese artefacto, es decir `dist/`, a la raíz del sitio. Cuando TI de CENIA entregue el acceso, se puede agregar un paso de copia automática (rsync o SFTP) al mismo flujo.

Mientras se define el subdominio, el mismo flujo publica un prototipo en GitHub Pages, en https://laboratorio-de-arqueologia-digital-uc.github.io/havi-atacama-web/. Esa versión se compila con `BASE_PATH=/havi-atacama-web/` y `NO_INDEXAR=true`, por lo que los buscadores no la indexan; la versión para CENIA no lleva esa marca. Para que funcione, en el repositorio debe estar activado Settings → Pages → Source: GitHub Actions. Cuando el sitio pase a CENIA basta con desactivar Pages ahí y borrar el trabajo `prototipo` del flujo.

`npm run build:preview` genera una versión con rutas relativas en `preview/`, que se puede abrir sin servidor y sirve para compartir vistas previas.
