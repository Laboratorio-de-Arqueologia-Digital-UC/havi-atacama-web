import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Cada texto visible existe en español (_es) e inglés (_en).
// Si falta un campo obligatorio, la compilación falla y el sitio publicado no cambia.

const texto = z.string().min(1);
const opcional = z.string().optional().default('');

const dominiosPermitidos = /(^|\.)(arcgis\.com|sketchfab\.com)$/;

const incrustacion = z.object({
  tipo: z.enum(['arcgis', 'sketchfab']),
  url: z
    .string()
    .url()
    .refine((u) => u.startsWith('https://') && dominiosPermitidos.test(new URL(u).hostname), {
      message: 'Solo se aceptan enlaces https de arcgis.com o sketchfab.com',
    }),
  titulo_es: texto,
  titulo_en: texto,
});

const paginas = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/paginas' }),
  schema: ({ image }) =>
    z.object({
      titulo_es: texto,
      titulo_en: texto,
      bajada_es: opcional,
      bajada_en: opcional,
      cuerpo_es: opcional,
      cuerpo_en: opcional,
      figuras: z
        .array(
          z.object({
            imagen: image(),
            alt_es: texto,
            alt_en: texto,
            pie_es: opcional,
            pie_en: opcional,
            credito: opcional,
          })
        )
        .optional()
        .default([]),
      incrustaciones: z.array(incrustacion).optional().default([]),
    }),
});

const inicio = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/inicio' }),
  schema: ({ image }) =>
    z.object({
      titulo_es: texto,
      titulo_en: texto,
      bajada_es: texto,
      bajada_en: texto,
      descripcion_es: texto,
      descripcion_en: texto,
      realce_natural: image(),
      realce_dstretch: image(),
      realce_alt_es: texto,
      realce_alt_en: texto,
      realce_credito: texto,
      soportes: z
        .array(
          z.object({
            nombre_es: texto,
            nombre_en: texto,
            texto_es: texto,
            texto_en: texto,
            imagen: image(),
            alt_es: texto,
            alt_en: texto,
            credito: texto,
          })
        )
        .length(3),
      pasos: z
        .array(
          z.object({
            titulo_es: texto,
            titulo_en: texto,
            texto_es: texto,
            texto_en: texto,
          })
        )
        .min(1),
    }),
});

const sitio = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/sitio' }),
  schema: z.object({
    nombre: texto,
    correo: z.string().email(),
    financiamiento_es: texto,
    financiamiento_en: texto,
    instituciones: z.array(
      z.object({ nombre: texto, url: z.string().url(), logo: texto })
    ),
  }),
});

const equipo = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/equipo' }),
  schema: ({ image }) =>
    z.object({
      nombre: texto,
      orden: z.number().int(),
      grupo: z.enum(['investigacion', 'gestion']),
      rol_es: texto,
      rol_en: texto,
      institucion: opcional,
      foto: image().optional(),
      bio_es: opcional,
      bio_en: opcional,
    }),
});

const hitos = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/hitos' }),
  schema: z.object({
    fecha: z.string().regex(/^\d{4}-\d{2}$/, 'Usa el formato AAAA-MM'),
    titulo_es: texto,
    titulo_en: texto,
    estado: z.enum(['pendiente', 'en-curso', 'cumplido']),
  }),
});

const avances = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/avances' }),
  schema: ({ image }) =>
    z.object({
      titulo_es: texto,
      titulo_en: texto,
      fecha: z.coerce.date(),
      resumen_es: texto,
      resumen_en: texto,
      cuerpo_es: opcional,
      cuerpo_en: opcional,
      imagen: image().optional(),
      imagen_alt_es: opcional,
      imagen_alt_en: opcional,
      credito: opcional,
      incrustaciones: z.array(incrustacion).optional().default([]),
      borrador: z.boolean().optional().default(false),
    }),
});

const recursos = defineCollection({
  loader: glob({ pattern: '*.yml', base: './src/content/recursos' }),
  schema: z.object({
    titulo_es: texto,
    titulo_en: texto,
    tipo: z.enum(['publicacion', 'dataset', 'codigo', 'taller', 'presentacion']),
    fecha: z.coerce.date(),
    enlace: z.string().url().optional(),
    descripcion_es: opcional,
    descripcion_en: opcional,
  }),
});

export const collections = { paginas, inicio, sitio, equipo, hitos, avances, recursos };
