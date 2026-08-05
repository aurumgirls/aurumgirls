const inputClass =
  "w-full rounded-sm bg-linen border border-black/15 px-3.5 py-2.5 text-[14px] text-ink placeholder:text-stone/70 outline-none focus:ring-2 focus:ring-aurum focus:border-aurum transition-shadow";

export function TextField({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
  span,
  defaultValue,
  autoComplete,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  span?: "full" | "half";
  defaultValue?: string;
  autoComplete?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div className={span === "full" ? "sm:col-span-2" : undefined}>
      <label htmlFor={name} className="block text-[12.5px] font-semibold text-stone mb-1.5">
        {label}
        {required && <span className="text-nar"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        {...(onChange
          ? { value: value ?? "", onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value) }
          : { defaultValue })}
        autoComplete={autoComplete}
        className={inputClass}
      />
    </div>
  );
}

export function SelectField({
  label,
  name,
  options,
  required = true,
  defaultValue,
}: {
  label: string;
  name: string;
  options: string[];
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-[12.5px] font-semibold text-stone mb-1.5">
        {label}
        {required && <span className="text-nar"> *</span>}
      </label>
      <select
        id={name}
        name={name}
        required={required}
        defaultValue={defaultValue}
        className={inputClass + " appearance-none cursor-pointer"}
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
}
