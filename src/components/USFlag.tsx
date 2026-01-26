'use client';

interface USFlagProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function USFlag({ className = '', size = 'md' }: USFlagProps) {
  const sizes = {
    sm: { width: 20, height: 14 },
    md: { width: 28, height: 19 },
    lg: { width: 40, height: 27 },
  };

  const { width, height } = sizes[size];

  return (
    <svg
      viewBox="0 0 190 100"
      width={width}
      height={height}
      className={className}
      aria-label="United States Flag"
      role="img"
    >
      {/* Red stripes */}
      <rect width="190" height="100" fill="#B22234" />

      {/* White stripes */}
      <rect y="7.69" width="190" height="7.69" fill="white" />
      <rect y="23.08" width="190" height="7.69" fill="white" />
      <rect y="38.46" width="190" height="7.69" fill="white" />
      <rect y="53.85" width="190" height="7.69" fill="white" />
      <rect y="69.23" width="190" height="7.69" fill="white" />
      <rect y="84.62" width="190" height="7.69" fill="white" />

      {/* Blue canton */}
      <rect width="76" height="53.85" fill="#3C3B6E" />

      {/* Stars - simplified 5x4 grid for clarity at small sizes */}
      <g fill="white">
        {/* Row 1 */}
        <circle cx="9" cy="6" r="2.5" />
        <circle cx="24" cy="6" r="2.5" />
        <circle cx="39" cy="6" r="2.5" />
        <circle cx="54" cy="6" r="2.5" />
        <circle cx="69" cy="6" r="2.5" />
        {/* Row 2 */}
        <circle cx="16" cy="13" r="2.5" />
        <circle cx="31" cy="13" r="2.5" />
        <circle cx="46" cy="13" r="2.5" />
        <circle cx="61" cy="13" r="2.5" />
        {/* Row 3 */}
        <circle cx="9" cy="20" r="2.5" />
        <circle cx="24" cy="20" r="2.5" />
        <circle cx="39" cy="20" r="2.5" />
        <circle cx="54" cy="20" r="2.5" />
        <circle cx="69" cy="20" r="2.5" />
        {/* Row 4 */}
        <circle cx="16" cy="27" r="2.5" />
        <circle cx="31" cy="27" r="2.5" />
        <circle cx="46" cy="27" r="2.5" />
        <circle cx="61" cy="27" r="2.5" />
        {/* Row 5 */}
        <circle cx="9" cy="34" r="2.5" />
        <circle cx="24" cy="34" r="2.5" />
        <circle cx="39" cy="34" r="2.5" />
        <circle cx="54" cy="34" r="2.5" />
        <circle cx="69" cy="34" r="2.5" />
        {/* Row 6 */}
        <circle cx="16" cy="41" r="2.5" />
        <circle cx="31" cy="41" r="2.5" />
        <circle cx="46" cy="41" r="2.5" />
        <circle cx="61" cy="41" r="2.5" />
        {/* Row 7 */}
        <circle cx="9" cy="48" r="2.5" />
        <circle cx="24" cy="48" r="2.5" />
        <circle cx="39" cy="48" r="2.5" />
        <circle cx="54" cy="48" r="2.5" />
        <circle cx="69" cy="48" r="2.5" />
      </g>
    </svg>
  );
}

// Inline SVG string for PDF rendering (react-pdf doesn't support components)
export const USFlagSVG = `
<svg viewBox="0 0 190 100" xmlns="http://www.w3.org/2000/svg">
  <rect width="190" height="100" fill="#B22234"/>
  <rect y="7.69" width="190" height="7.69" fill="white"/>
  <rect y="23.08" width="190" height="7.69" fill="white"/>
  <rect y="38.46" width="190" height="7.69" fill="white"/>
  <rect y="53.85" width="190" height="7.69" fill="white"/>
  <rect y="69.23" width="190" height="7.69" fill="white"/>
  <rect y="84.62" width="190" height="7.69" fill="white"/>
  <rect width="76" height="53.85" fill="#3C3B6E"/>
</svg>
`;
