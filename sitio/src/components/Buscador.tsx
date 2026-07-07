import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Props {
  destacado?: boolean;
  valorInicial?: string;
}

export default function Buscador({ destacado = false, valorInicial = '' }: Props) {
  const [consulta, setConsulta] = useState(valorInicial);
  const navigate = useNavigate();

  const enviar = (e: FormEvent) => {
    e.preventDefault();
    const q = consulta.trim();
    navigate(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar');
  };

  return (
    <form
      role="search"
      onSubmit={enviar}
      className={[
        'flex w-full items-stretch gap-2 rounded-2xl bg-white shadow-sm ring-1 ring-tierra-200 focus-within:ring-rio-500',
        destacado ? 'p-2' : 'p-1.5',
      ].join(' ')}
    >
      <label htmlFor="buscador-input" className="sr-only">
        Buscar en el Centro de Conocimiento
      </label>
      <span aria-hidden className="flex items-center pl-3 text-tierra-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={destacado ? 'h-6 w-6' : 'h-5 w-5'}
        >
          <circle cx="11" cy="11" r="7" />
          <path d="m21 21-4.35-4.35" />
        </svg>
      </span>
      <input
        id="buscador-input"
        type="search"
        value={consulta}
        onChange={(e) => setConsulta(e.target.value)}
        placeholder={
          destacado
            ? 'Buscar argumentarios, campañas, cuencas, leyes…'
            : 'Buscar en el centro de conocimiento…'
        }
        className={[
          'flex-1 border-0 bg-transparent outline-none placeholder:text-tierra-400',
          destacado ? 'text-lg py-2' : 'text-base py-1.5',
        ].join(' ')}
      />
      <button
        type="submit"
        className={[
          'rounded-xl bg-rio-600 text-white font-semibold hover:bg-rio-700 transition',
          destacado ? 'px-5 py-2 text-base' : 'px-4 py-1.5 text-sm',
        ].join(' ')}
      >
        Buscar
      </button>
    </form>
  );
}
