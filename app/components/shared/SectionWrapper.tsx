interface SectionWrapperProps {
  children: React.ReactNode;
  id: string;
  ariaLabel: string;
  className?: string;
}

export function SectionWrapper({
  children,
  id,
  ariaLabel,
  className,
}: SectionWrapperProps) {
  return (
    <section
      id={id}
      aria-label={ariaLabel}
      className={`py-20 lg:py-28 ${className ?? ''}`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">{children}</div>
    </section>
  );
}
