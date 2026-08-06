interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
}

export function Field({ label, id, ...props }: FieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-charcoal ml-1">
        {label}
      </label>
      <input
        id={id}
        {...props}
        className="bg-white border border-sand rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-forest focus:ring-1 focus:ring-forest transition-colors w-full placeholder:text-slate/60"
      />
    </div>
  );
}
