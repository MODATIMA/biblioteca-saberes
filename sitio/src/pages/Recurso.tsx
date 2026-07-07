import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Cargando from '@/components/Cargando';
import ErrorMensaje from '@/components/ErrorMensaje';
import Metadatos from '@/components/Metadatos';
import Relacionados from '@/components/Relacionados';
import RenderizadorMarkdown from '@/components/RenderizadorMarkdown';
import Etiqueta from '@/components/Etiqueta';
import { buscarCategoria } from '@/types/recurso';
import type { RecursoCompleto } from '@/types/recurso';
import { cargarRecurso } from '@/services/recurso';

export default function Recurso() {
  const { id = '' } = useParams();
  const [recurso, setRecurso] = useState<RecursoCompleto | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setRecurso(null);
    setError(null);
    cargarRecurso(decodeURIComponent(id))
      .then(setRecurso)
      .catch((e) => setError(e.message));
  }, [id]);

  if (error) return <ErrorMensaje mensaje={error} />;
  if (!recurso) return <Cargando texto="Cargando recurso…" />;

  const categoria = buscarCategoria(recurso.tipo);

  return (
    <article className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="min-w-0">
        <nav aria-label="Migas" className="mb-4 text-sm text-tierra-500">
          <Link to="/" className="hover:text-rio-700">
            Inicio
          </Link>
          {categoria && (
            <>
              <span className="mx-2">›</span>
              <Link to={categoria.ruta} className="hover:text-rio-700">
                {categoria.etiquetaPlural}
              </Link>
            </>
          )}
        </nav>

        <header className="mb-6">
          <div className="mb-3 flex flex-wrap gap-2">
            <Etiqueta texto={categoria?.etiqueta ?? recurso.tipo} tipo="tipo" />
            {recurso.estado && <Etiqueta texto={recurso.estado} tipo="estado" />}
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold leading-tight text-tierra-900">
            {recurso.titulo}
          </h1>
          {recurso.resumen && (
            <p className="mt-3 text-lg leading-relaxed text-tierra-700">{recurso.resumen}</p>
          )}
        </header>

        <RenderizadorMarkdown contenido={recurso.contenido} />

        <div className="mt-10 rounded-xl border border-tierra-200 bg-tierra-50 p-4 text-sm text-tierra-600">
          <p>
            Fuente en el repositorio:{' '}
            <code className="rounded bg-white px-1.5 py-0.5 border border-tierra-200">
              recursos/{recurso.ruta}
            </code>
          </p>
          {recurso.fecha_actualizacion && (
            <p className="mt-1">Última actualización: {recurso.fecha_actualizacion}</p>
          )}
        </div>

        <div className="mt-10 space-y-10">
          <Relacionados ids={recurso.relacionados} />
        </div>
      </div>

      <div className="lg:sticky lg:top-32 lg:self-start">
        <Metadatos recurso={recurso} />
      </div>
    </article>
  );
}
