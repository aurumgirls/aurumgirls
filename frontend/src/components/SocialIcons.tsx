// Lucide doesn't ship brand marks, so these are small hand-drawn thin-line
// (1.5px stroke, rounded caps) equivalents matching the rest of the
// iconography so Instagram/Facebook don't clash with the lucide icon set.

export function InstagramIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function FacebookIcon({ size = 18, className }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth={1.5} />
      <path
        d="M14.3 6.8h-1.1c-1 0-1.7.7-1.7 1.7v2.3H9.8v2.1h1.7v5.6h2.2v-5.6h1.8l.3-2.1h-2.1V8.7c0-.4.2-.6.6-.6h1.4z"
        fill="currentColor"
        stroke="none"
      />
    </svg>
  );
}
