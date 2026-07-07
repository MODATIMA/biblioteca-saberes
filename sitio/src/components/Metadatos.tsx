import type { RecursoCompleto } from '@/types/recurso';
import Etiqueta from './Etiqueta';

interface Props {
  recurso: RecursoCompleto;
}

function Fila({ etiqueta, children }: { etiqueta: string; children: React.ReactNode }) {
  return (
    <div className="grid grid-cols-[max-content_1fr] gap-x-4 py-2 border-b border-tierra-100 last:border-none">
      <dt className="text-xs uppercase tracking-wider text-tierra-500 pt-0.5">{etiqueta}</dt>
      <dd className="text-sm text-tierra-800">{children}</dd>
    </div>
  );
}

export default function Metadatos({ recurso }: Props) {
  return (
    <aside
      aria-label="Metadatos del recurso"
      className="rounded-xl border border-tierra-200 bg-white p-5"
    >
      <h2 className="mb-2 text-sm font-semibold uppercase tracking-widest text-tierra-500">
        Metadatos
      </h2>
      <dl>
        {recurso.autor && <Fila etiqueta="Autoría">{recurso.autor}</Fila>}
        {recurso.estado && <Fila etiqueta="Estado">{recurso.estado}</Fila>}
        {recurso.fecha_actualizacion && (
          <Fila etiqueta="Actualizado">{recurso.fecha_actualizacion}</Fila>
        )}
        {recurso.nivel && <Fila etiqueta="Nivel">{recurso.nivel}</Fila>}
        {recurso.publico.length > 0 && (
          <Fila etiqueta="Público">{recurso.publico.join(', ')}</Fila>
        )}
        {recurso.licencia && <Fila etiqueta="Licencia">{recurso.licencia}</Fila>}

        {recurso.temas.length > 0 && (
          <Fila etiqueta="Temas">
            <div className="flex flex-wrap gap-1.5">
              {recurso.temas.map((t) => (
                <Etiqueta key={t} texto={t} tipo="tema" href={`/buscar?tema=${encodeURIComponent(t)}`} />
              ))}
            </div>
          </Fila>
        )}

        {recurso.territorios.length > 0 && (
          <Fila etiqueta="Territorios">
            <div className="flex flex-wrap gap-1.5">
              {recurso.territorios.map((t) => (
                <Etiqueta
                  key={t}
                  texto={t}
                  tipo="territorio"
                  href={`/buscar?territorio=${encodeURIComponent(t)}`}
                />
              ))}
            </div>
          </Fila>
        )}

        {recurso.etiquetas.length > 0 && (
          <Fila etiqueta="Etiquetas">
            <div className="flex flex-wrap gap-1.5">
              {recurso.etiquetas.map((t) => (
                <Etiqueta key={t} texto={t} tipo="etiqueta" />
              ))}
            </div>
          </Fila>
        )}

        {recurso.fuentes.length > 0 && (
          <Fila etiqueta="Fuentes">
            <ul className="space-y-1 list-disc pl-4">
              {recurso.fuentes.map((f) => (
                <li key={f} className="break-words">
                  {f}
                </li>
              ))}
            </ul>
          </Fila>
        )}
      </dl>
    </aside>
  );
}
