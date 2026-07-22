import type { EntradaIndice, RecursoCompleto } from '@/types/recurso';
import { obtenerEntrada } from './indice';

// Parser mínimo de frontmatter YAML: solo lo necesario para lectura en runtime.
// (En el build, gray-matter se ejecuta en Node para producir el índice.)
function parseFrontmatter(md: string): { data: Record<string, unknown>; content: string } {
  const coincide = md.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/);
  if (!coincide) return { data: {}, content: md };

  const bloque = coincide[1];
  const contenido = coincide[2];
  const datos: Record<string, unknown> = {};

  const lineas = bloque.split(/\r?\n/);
  let claveActual: string | null = null;
  let listaActual: unknown[] | null = null;
  let objetoActual: Record<string, unknown> | null = null;

  function escalar(s: string): unknown {
    const v = s.trim().replace(/^["']|["']$/g, '');
    if (v === 'true') return true;
    if (v === 'false') return false;
    if (v === 'null' || v === '~' || v === '') return null;
    return v;
  }

  for (const linea of lineas) {
    if (!linea.trim()) continue;

    // Propiedad de objeto dentro de lista (indentada con 4+ espacios)
    const propObj = linea.match(/^(\s{4,})([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_][\w-]*)\s*:\s*(.*)$/);
    if (propObj && objetoActual) {
      objetoActual[propObj[2]] = escalar(propObj[3]);
      continue;
    }

    // Ítem de lista
    const itemLista = linea.match(/^\s{0,3}-\s+(.*)$/);
    if (itemLista && claveActual) {
      if (!listaActual) {
        listaActual = [];
        datos[claveActual] = listaActual;
      }
      // ¿Es el inicio de un mapping? p.ej. `- url: https://…`
      const parMapping = itemLista[1].match(/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_][\w-]*)\s*:\s*(.*)$/);
      if (parMapping) {
        objetoActual = { [parMapping[1]]: escalar(parMapping[2]) };
        listaActual.push(objetoActual);
      } else {
        objetoActual = null;
        listaActual.push(escalar(itemLista[1]));
      }
      continue;
    }

    // Clave raíz
    const par = linea.match(/^([A-Za-zÁÉÍÓÚÜÑáéíóúüñ_][\w-]*)\s*:\s*(.*)$/);
    if (par) {
      claveActual = par[1];
      listaActual = null;
      objetoActual = null;
      const valor = par[2].trim();
      datos[claveActual] = valor === '' ? null : escalar(valor);
    }
  }

  return { data: datos, content: contenido };
}

export async function cargarRecurso(id: string): Promise<RecursoCompleto> {
  const entrada = await obtenerEntrada(id);
  if (!entrada) {
    throw new Error(`Recurso no encontrado: ${id}`);
  }
  const url = `${import.meta.env.BASE_URL}recursos/${entrada.ruta}`;
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`No se pudo cargar el recurso "${id}" (HTTP ${respuesta.status}).`);
  }
  const texto = await respuesta.text();
  const { data, content } = parseFrontmatter(texto);
  return { ...entrada, contenido: content, frontmatter: data } satisfies RecursoCompleto;
}

export function agrupar<T extends EntradaIndice>(
  entradas: T[],
  llave: (e: T) => string | undefined,
): Map<string, T[]> {
  const grupos = new Map<string, T[]>();
  for (const e of entradas) {
    const k = llave(e) ?? '—';
    const lista = grupos.get(k) ?? [];
    lista.push(e);
    grupos.set(k, lista);
  }
  return grupos;
}
