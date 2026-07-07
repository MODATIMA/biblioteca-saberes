import { useEffect, useState } from 'react';
import type { EntradaIndice } from '@/types/recurso';
import { obtenerRelacionados } from '@/services/indice';
import TarjetaRecurso from './TarjetaRecurso';

interface Props {
  ids: string[];
}

export default function Relacionados({ ids }: Props) {
  const [items, setItems] = useState<EntradaIndice[] | null>(null);

  useEffect(() => {
    let cancelado = false;
    obtenerRelacionados(ids).then((rs) => {
      if (!cancelado) setItems(rs);
    });
    return () => {
      cancelado = true;
    };
  }, [ids]);

  if (ids.length === 0) return null;
  if (!items) return null;
  if (items.length === 0) {
    return (
      <section>
        <h2 className="font-serif text-xl font-semibold mb-3">Recursos relacionados</h2>
        <p className="text-sm text-tierra-600">
          Este recurso menciona {ids.length} referencia(s) que aún no están publicadas en la
          Biblioteca de Saberes.
        </p>
      </section>
    );
  }

  return (
    <section>
      <h2 className="font-serif text-xl font-semibold mb-3">Recursos relacionados</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {items.map((r) => (
          <TarjetaRecurso key={r.id} recurso={r} compacta />
        ))}
      </div>
    </section>
  );
}
