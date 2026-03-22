'use client';
/**
 * PersonaCastLogo — SVG recreation of the official PersonaCast logo.
 *
 * Structure: Neural network head silhouette (left) + "PersonaCast" wordmark (right).
 * The head is composed of nodes (circles) and connection lines forming a profile.
 * Colors: Navy (#0A3D7A) for "Persona", Cyan (#00A3E0) for "Cast",
 *         with Insight Gold (#FFB800) accents on key nodes.
 */

interface LogoProps {
  readonly className?: string;
  readonly height?: number;
}

export function PersonaCastLogo({ className = '', height = 32 }: LogoProps) {
  // Aspect ratio ~5:1 from the original logo
  const width = height * 5;

  return (
    <svg
      viewBox="0 0 500 100"
      width={width}
      height={height}
      className={className}
      aria-label="PersonaCast"
      role="img"
    >
      <defs>
        <linearGradient id="logo-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0A3D7A" />
          <stop offset="100%" stopColor="#00A3E0" />
        </linearGradient>
      </defs>

      {/* Neural head — nodes and connections */}
      <g transform="translate(8, 5) scale(0.9)">
        {/* Connection lines — thin, semi-transparent */}
        <g stroke="#8892B0" strokeWidth="0.8" opacity="0.5">
          {/* Outer contour connections */}
          <line x1="45" y1="10" x2="55" y2="5" />
          <line x1="55" y1="5" x2="65" y2="8" />
          <line x1="65" y1="8" x2="72" y2="18" />
          <line x1="72" y1="18" x2="76" y2="30" />
          <line x1="76" y1="30" x2="74" y2="42" />
          <line x1="74" y1="42" x2="70" y2="55" />
          <line x1="70" y1="55" x2="64" y2="65" />
          <line x1="64" y1="65" x2="56" y2="75" />
          <line x1="56" y1="75" x2="52" y2="90" />
          <line x1="42" y1="90" x2="38" y2="78" />
          <line x1="38" y1="78" x2="32" y2="68" />
          <line x1="32" y1="68" x2="26" y2="55" />
          <line x1="26" y1="55" x2="22" y2="40" />
          <line x1="22" y1="40" x2="24" y2="28" />
          <line x1="24" y1="28" x2="30" y2="18" />
          <line x1="30" y1="18" x2="38" y2="12" />
          <line x1="38" y1="12" x2="45" y2="10" />
          {/* Interior cross-connections */}
          <line x1="45" y1="10" x2="60" y2="25" />
          <line x1="55" y1="5" x2="50" y2="30" />
          <line x1="65" y1="8" x2="60" y2="25" />
          <line x1="72" y1="18" x2="60" y2="25" />
          <line x1="60" y1="25" x2="50" y2="30" />
          <line x1="50" y1="30" x2="40" y2="35" />
          <line x1="40" y1="35" x2="48" y2="45" />
          <line x1="48" y1="45" x2="60" y2="40" />
          <line x1="60" y1="40" x2="74" y2="42" />
          <line x1="60" y1="40" x2="55" y2="55" />
          <line x1="55" y1="55" x2="48" y2="45" />
          <line x1="48" y1="45" x2="38" y2="55" />
          <line x1="38" y1="55" x2="26" y2="55" />
          <line x1="55" y1="55" x2="64" y2="65" />
          <line x1="40" y1="35" x2="24" y2="28" />
          <line x1="30" y1="18" x2="50" y2="30" />
          <line x1="50" y1="30" x2="60" y2="40" />
          <line x1="38" y1="55" x2="32" y2="68" />
          <line x1="76" y1="30" x2="60" y2="40" />
        </g>

        {/* Contour nodes */}
        <g>
          {[
            [45, 10], [55, 5], [65, 8], [72, 18], [76, 30], [74, 42],
            [70, 55], [64, 65], [56, 75], [52, 90], [42, 90], [38, 78],
            [32, 68], [26, 55], [22, 40], [24, 28], [30, 18], [38, 12],
          ].map(([cx, cy], i) => (
            <circle
              key={`c${i}`}
              cx={cx}
              cy={cy}
              r="2.5"
              fill="#8892B0"
              opacity="0.8"
            />
          ))}
        </g>

        {/* Interior brain nodes — some gold, some blue */}
        <g>
          <circle cx="60" cy="25" r="3" fill="#FFB800" opacity="0.9" />
          <circle cx="50" cy="30" r="2.5" fill="#769EDB" opacity="0.8" />
          <circle cx="40" cy="35" r="2" fill="#769EDB" opacity="0.7" />
          <circle cx="48" cy="45" r="2.5" fill="#769EDB" opacity="0.8" />
          <circle cx="60" cy="40" r="3" fill="#FFB800" opacity="0.85" />
          <circle cx="55" cy="55" r="2" fill="#769EDB" opacity="0.7" />
          <circle cx="38" cy="55" r="2" fill="#8892B0" opacity="0.6" />
        </g>
      </g>

      {/* Wordmark */}
      <text
        x="110"
        y="64"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="42"
        fill="#0A3D7A"
        letterSpacing="-0.5"
      >
        Persona
      </text>
      <text
        x="338"
        y="64"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="700"
        fontSize="42"
        fill="#00A3E0"
        letterSpacing="-0.5"
      >
        Cast
      </text>
    </svg>
  );
}
