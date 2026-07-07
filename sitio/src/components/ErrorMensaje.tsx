interface Props {
  titulo?: string;
  mensaje: string;
}

export default function ErrorMensaje({ titulo = 'Ocurrió un problema', mensaje }: Props) {
  return (
    <div
      role="alert"
      className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-900"
    >
      <h2 className="font-semibold mb-1">{titulo}</h2>
      <p className="text-sm">{mensaje}</p>
    </div>
  );
}
