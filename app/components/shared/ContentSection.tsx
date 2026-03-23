/** Generic content section with consistent spacing and max-width. */
interface ContentSectionProps {
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly id?: string;
}

export function ContentSection({ children, className = '', id }: ContentSectionProps) {
  return (
    <section id={id} className={`py-20 lg:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}
