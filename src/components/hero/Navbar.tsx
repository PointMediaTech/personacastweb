const NAV_LINKS = ['Workflows', 'Persona Lab', 'Strategy Reports', 'Pricing'] as const;

export function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 md:px-10"
      style={{
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        backgroundColor: 'rgba(2, 6, 23, 0.85)',
      }}
    >
      {/* Logo — official PersonaCast logo from public directory */}
      <img
        src="/PersonaCast_Logo.png"
        alt="PersonaCast"
        className="h-8 md:h-9 w-auto"
      />

      {/* Navigation links — hidden on mobile */}
      <ul className="hidden md:flex items-center gap-8">
        {NAV_LINKS.map((link) => (
          <li key={link}>
            <a
              href="#"
              className="text-mist-blue-gray text-sm transition-colors duration-200 hover:text-white"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Action buttons — hidden on mobile */}
      <div className="hidden md:flex items-center gap-3">
        <button
          type="button"
          className="rounded-lg border border-mist-blue-gray px-4 py-2 text-sm text-mist-blue-gray transition-colors duration-200 hover:border-white hover:text-white"
        >
          Login
        </button>
        <button
          type="button"
          className="rounded-lg bg-strategic-blue px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:shadow-[0_0_16px_2px_rgba(255,184,0,0.3)] hover:brightness-110"
        >
          Request Demo
        </button>
      </div>
    </nav>
  );
}
