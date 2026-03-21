const NAV_LINKS = ['核心推演', '應用場景', '技術深度', '實戰案例', '資源中心'] as const;

export function Navbar() {
  return (
    <nav
      className="nav-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
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
              className="nav-link text-mist-blue-gray text-base tracking-[0.08em] transition-all duration-200"
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
          className="cta-ghost rounded-full text-base font-medium text-white tracking-[0.08em]"
          title="預約 AI 智能體模擬演示"
        >
          預約專屬演示
        </button>
      </div>
    </nav>
  );
}
