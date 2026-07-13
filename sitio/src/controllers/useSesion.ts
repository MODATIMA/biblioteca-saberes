import { useEffect, useState } from 'react';
import type { Sesion } from '@/types/sesion';
import { obtenerSesion, cerrarSesion } from '@/services/sesion';

const CLAVE = 'sesion_cache';

function leerCache(): Sesion | null {
  try {
    const raw = sessionStorage.getItem(CLAVE);
    return raw ? (JSON.parse(raw) as Sesion) : null;
  } catch {
    return null;
  }
}

function escribirCache(s: Sesion | null) {
  try {
    if (s) sessionStorage.setItem(CLAVE, JSON.stringify(s));
    else sessionStorage.removeItem(CLAVE);
  } catch {}
}

export function useSesion() {
  const [sesion, setSesion] = useState<Sesion | null>(leerCache);
  const [cargando, setCargando] = useState(() => leerCache() === null);

  useEffect(() => {
    obtenerSesion()
      .then((s) => {
        escribirCache(s);
        setSesion(s);
      })
      .finally(() => setCargando(false));
  }, []);

  async function logout() {
    escribirCache(null);
    await cerrarSesion();
    window.location.href = '/';
  }

  return { sesion, cargando, logout };
}

