export function IconDistance({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M2 11L7 3L12 11"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M4.5 11H9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconTime({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <circle cx="7" cy="7" r="5.25" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 4V7L9 8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
    </svg>
  );
}

export function IconElevation({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1.5 11L5 5.5L7.5 8.5L12.5 3"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconAlert({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M7 2L12.5 11H1.5L7 2Z"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinejoin="round"
      />
      <path d="M7 6V8.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      <circle cx="7" cy="10" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function IconFilter({ className }: { className?: string }) {
  return (
    <svg className={className} width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
      <path
        d="M1.5 3H12.5M3.5 7H10.5M5.5 11H8.5"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </svg>
  );
}
