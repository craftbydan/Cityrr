/** Dark street-grid SVG map with a coloured route path overlay. */

/** 4 path variants — each suggests a different run through a Bangkok-like grid */
const ROUTE_PATHS = [
  // Ekkamai loop — east along Sukhumvit then south into On Nut sois
  "M 44 220 L 44 190 L 110 190 L 110 150 L 200 150 L 200 110 L 290 110 L 290 80 L 355 80",
  // QSNCC riverside — long push south then west along the river
  "M 44 240 L 130 240 L 130 190 L 130 130 L 220 130 L 290 130 L 290 80 L 360 80 L 360 50",
  // Thong Lo evening — north up the soi then arcs east
  "M 60 250 L 60 180 L 120 180 L 180 130 L 260 130 L 320 100 L 355 100",
  // Asok night — tight zigzag through the CBD blocks
  "M 44 230 L 110 230 L 110 170 L 190 170 L 260 120 L 310 120 L 310 70 L 360 70",
];

/** Minor soi positions */
const MINOR_STREETS_H = [50, 110, 160, 210, 260];
const MINOR_STREETS_V = [80, 140, 200, 260, 320];
const MAJOR_STREETS_H = [130, 200];
const MAJOR_STREETS_V = [120, 240];

interface RouteMapProps {
  routeIndex: number;
  primaryColor: string;
  accentColor: string;
}

export default function RouteMap({ routeIndex, primaryColor }: RouteMapProps) {
  const path = ROUTE_PATHS[routeIndex % ROUTE_PATHS.length];

  // Start point from path (first M x y)
  const startMatch = path.match(/^M\s*([\d.]+)\s+([\d.]+)/);
  const startX = startMatch ? parseFloat(startMatch[1]) : 44;
  const startY = startMatch ? parseFloat(startMatch[2]) : 220;

  // End point from path (last pair of numbers)
  const allNums = path.match(/[\d.]+/g) ?? [];
  const endX = parseFloat(allNums[allNums.length - 2]);
  const endY = parseFloat(allNums[allNums.length - 1]);

  return (
    <div className="w-full relative overflow-hidden" style={{ height: "220px", backgroundColor: "#131008" }}>
      <svg
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full"
        aria-label="Route map visualization"
      >
        {/* Base */}
        <rect width="400" height="300" fill="#131008" />

        {/* City blocks (slightly lighter fill) */}
        <rect x="85"  y="65"  width="50" height="45" fill="#181410" />
        <rect x="145" y="65"  width="90" height="45" fill="#181410" />
        <rect x="245" y="65"  width="70" height="45" fill="#181410" />
        <rect x="85"  y="120" width="50" height="40" fill="#181410" />
        <rect x="145" y="120" width="90" height="40" fill="#181410" />
        <rect x="245" y="120" width="70" height="40" fill="#181410" />
        <rect x="85"  y="170" width="50" height="35" fill="#181410" />
        <rect x="145" y="170" width="90" height="35" fill="#181410" />
        <rect x="85"  y="215" width="50" height="40" fill="#181410" />
        <rect x="145" y="215" width="90" height="40" fill="#181410" />
        <rect x="245" y="215" width="70" height="40" fill="#181410" />

        {/* Major streets H */}
        {MAJOR_STREETS_H.map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#252018" strokeWidth="10" />
        ))}
        {/* Major streets V */}
        {MAJOR_STREETS_V.map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#252018" strokeWidth="10" />
        ))}
        {/* Minor streets H */}
        {MINOR_STREETS_H.map((y) => (
          <line key={y} x1="0" y1={y} x2="400" y2={y} stroke="#1E1A14" strokeWidth="5" />
        ))}
        {/* Minor streets V */}
        {MINOR_STREETS_V.map((x) => (
          <line key={x} x1={x} y1="0" x2={x} y2="300" stroke="#1E1A14" strokeWidth="5" />
        ))}

        {/* Route glow (wide, low opacity) */}
        <path
          d={path}
          stroke={primaryColor}
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.18"
        />

        {/* Route line */}
        <path
          d={path}
          stroke={primaryColor}
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.95"
        />

        {/* Start marker */}
        <circle cx={startX} cy={startY} r="6" fill={primaryColor} />
        <circle cx={startX} cy={startY} r="10" fill={primaryColor} opacity="0.2" />

        {/* End marker */}
        <circle cx={endX} cy={endY} r="5" fill="#B5834A" />
        <circle cx={endX} cy={endY} r="9" fill="#B5834A" opacity="0.2" />
      </svg>

      {/* Corner labels */}
      <div className="absolute top-3 left-3">
        <span className="font-metro text-[9px] font-bold tracking-[0.18em] uppercase px-2 py-1"
          style={{ backgroundColor: primaryColor, color: "#0A0806", fontFamily: "var(--font-metro)" }}>
          Start
        </span>
      </div>
      <div className="absolute bottom-3 right-3">
        <span className="font-mono text-[9px] tracking-wider uppercase px-2 py-1"
          style={{ backgroundColor: "#B5834A22", color: "#B5834A", border: "1px solid #B5834A55" }}>
          Café
        </span>
      </div>
    </div>
  );
}
