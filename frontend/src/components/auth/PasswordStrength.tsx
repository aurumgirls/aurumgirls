function getStrength(password: string): { label: string; score: number; color: string } {
  if (!password) return { label: "", score: 0, color: "bg-sand" };
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 1) return { label: "Weak", score: 1, color: "bg-nar" };
  if (score <= 2) return { label: "Fair", score: 2, color: "bg-aurum" };
  if (score === 3) return { label: "Good", score: 3, color: "bg-aurum" };
  return { label: "Strong", score: 4, color: "bg-olive" };
}

export default function PasswordStrength({ password }: { password: string }) {
  const { label, score, color } = getStrength(password);

  return (
    <div className="mt-2">
      <div className="flex items-center gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className={`h-1 flex-1 rounded-pill transition-colors ${i < score ? color : "bg-sand"}`}
          />
        ))}
      </div>
      {label && (
        <p className="text-[11.5px] text-stone mt-1.5">
          Password strength: <span className="font-semibold text-ink">{label}</span>
        </p>
      )}
    </div>
  );
}
