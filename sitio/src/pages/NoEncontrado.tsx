import { Link } from 'react-router-dom';

export default function NoEncontrado() {
  return (
    <div className="mx-auto max-w-lg text-center py-16">
      <p className="text-xs uppercase tracking-widest text-rio-700">404</p>
      <h1 className="mt-2 font-serif text-3xl font-bold text-tierra-900">Página no encontrada</h1>
      <p className="mt-3 text-tierra-600">
        La ruta que buscas no existe. Quizá el recurso fue movido o su enlace está desactualizado.
      </p>
      <Link
        to="/"
        className="mt-6 inline-block rounded-lg bg-rio-600 px-5 py-2 text-sm font-semibold text-white hover:bg-rio-700"
      >
        Volver al inicio
      </Link>
    </div>
  );
}
