# Diseño: dirección C · Realce

La dirección visual viene de DStretch, la herramienta que realza pigmentos que el ojo no ve en el arte rupestre. Es una metáfora del proyecto: la máquina ayuda a ver y la arqueología interpreta. El equipo la eligió entre tres alternativas el 11 de noviembre de 2026.

## Color

Los colores se midieron en las imágenes del proyecto. Están definidos en `src/styles/global.css`.

| Token | Valor | Uso |
| --- | --- | --- |
| `--roca` | `#EDE8E5` | Fondo general (gris de roca claro) |
| `--roca-2` | `#E3DCD8` | Bandas secundarias y fondo de visores |
| `--hollin` | `#24191A` | Texto principal |
| `--gris` | `#5F5150` | Texto secundario, créditos |
| `--magenta` | `#932F52` | Acento 1: nombres de soporte, números de paso, selección |
| `--azul` | `#32667F` | Acento 2: enlaces, banda de evento |
| `--linea` | `#CFC5C1` | Divisores |

Los dos acentos no se usan juntos en el mismo elemento. Todo texto cumple un contraste de al menos 4,5:1 sobre su fondo.

## Tipografía

Se usan dos familias, ambas servidas desde el propio sitio sin depender de Google Fonts:

- **Libre Franklin** (Impallari Type) para títulos, navegación, pies de foto y datos, con peso 800 en los títulos y espaciado negativo.
- **Literata** para el texto de lectura, de 18 px, con una medida de 64 caracteres.

## Composición

- El texto va alineado a la izquierda, con un contenedor de 1280 px como máximo.
- La portada abre con el título y la bajada en dos columnas, seguidos del visor de realce a todo el ancho.
- Las imágenes de los tres soportes se escalonan en altura, en vez de ir en tarjetas idénticas.
- Cada imagen lleva su pie y su crédito.

## Movimiento

Solo hay un momento interactivo: el control de realce de la portada, que responde al usuario. No hay animaciones de entrada por sección. Se respeta `prefers-reduced-motion`.

## A evitar (piso de calidad de Impeccable)

No se usan etiquetas en mayúsculas sobre los títulos, degradados decorativos, tarjetas con la misma sombra, tipografía monoespaciada como adorno ni flechas «→» en los enlaces.
