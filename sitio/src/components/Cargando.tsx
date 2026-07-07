export default function Cargando({ texto = 'Cargando…' }: { texto?: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex items-center gap-3 py-16 justify-center text-tierra-600"
    >
      <span
        aria-hidden
        className="inline-block h-4 w-4 rounded-full border-2 border-rio-400 border-t-transparent animate-spin"
      />
      {texto}
    </div>
  );
}
