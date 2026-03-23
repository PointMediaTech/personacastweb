interface GlowFilterProps {
  readonly rgb: string;
  readonly id: string;
  readonly stdDeviation?: number;
  readonly floodOpacity?: number;
}

export function GlowFilter({ rgb, id, stdDeviation = 3, floodOpacity = 0.4 }: GlowFilterProps) {
  return (
    <filter id={id} x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceGraphic" stdDeviation={stdDeviation} result="blur" />
      <feFlood floodColor={`rgb(${rgb})`} floodOpacity={floodOpacity} result="color" />
      <feComposite in="color" in2="blur" operator="in" result="glow" />
      <feMerge>
        <feMergeNode in="glow" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  );
}
