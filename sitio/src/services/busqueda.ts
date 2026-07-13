import Fuse from 'fuse.js';
import type { IFuseOptions } from 'fuse.js';
import type { EntradaIndice, TipoRecurso } from '@/types/recurso';
import { cargarIndice } from './indice';

const opciones: IFuseOptions<EntradaIndice> = {
  includeScore: true,
  ignoreLocation: true,
  threshold: 0.35,
  minMatchCharLength: 2,
  keys: [
    { name: 'titulo', weight: 0.4 },
    { name: 'resumen', weight: 0.25 },
    { name: 'contenidoResumen', weight: 0.15 },
    { name: 'etiquetas', weight: 0.1 },
    { name: 'temas', weight: 0.05 },
    { name: 'territorios', weight: 0.05 },
  ],
};

let fusePromesa: Promise<Fuse<EntradaIndice>> | null = null;

function obtenerFuse(): Promise<Fuse<EntradaIndice>> {
  if (!fusePromesa) {
    fusePromesa = cargarIndice().then((idx) => new Fuse(idx.recursos, opciones));
  }
  return fusePromesa;
}

export interface FiltrosBusqueda {
  tipos?: TipoRecurso[];
  temas?: string[];
  territorios?: string[];
  regiones?: string[];
}

function pasaFiltros(r: EntradaIndice, f: FiltrosBusqueda | undefined): boolean {
  if (!f) return true;
  if (f.tipos?.length && !f.tipos.includes(r.tipo)) return false;
  if (f.temas?.length && !f.temas.some((t) => r.temas.includes(t))) return false;
  if (f.territorios?.length && !f.territorios.some((t) => r.territorios.includes(t))) return false;
  if (f.regiones?.length && !f.regiones.some((reg) => r.region === reg)) return false;
  return true;
}

export async function buscar(
  consulta: string,
  filtros?: FiltrosBusqueda,
): Promise<EntradaIndice[]> {
  const q = consulta.trim();
  if (!q) {
    const idx = await cargarIndice();
    return idx.recursos.filter((r) => pasaFiltros(r, filtros));
  }
  const fuse = await obtenerFuse();
  return fuse
    .search(q)
    .map((res) => res.item)
    .filter((r) => pasaFiltros(r, filtros));
}
