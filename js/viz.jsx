/* ============================================================
   GENERATIVE VISUALS  —  deterministic abstract tech art
   Drawn as inline SVG, seeded by a string so each project
   gets a stable, distinct motif. Theme: green-on-dark.
   ============================================================ */

/* seeded PRNG (mulberry32) */
function vizRand(seedStr) {
  let h = 1779033703 ^ seedStr.length;
  for (let i = 0; i < seedStr.length; i++) {
    h = Math.imul(h ^ seedStr.charCodeAt(i), 3432918353);
    h = (h << 13) | (h >>> 19);
  }
  let a = h >>> 0;
  return function () {
    a |= 0; a = (a + 0x6D2B79F5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const VIZ_MOTIFS = ["network", "signal", "blocks", "topo", "orbit"];

function VizSVG({ seed, motif }) {
  const W = 320, H = 132;
  const r = vizRand(seed + "|" + motif);
  const G = "#4ade80", G2 = "#34d399", DIM = "#1f6b45";
  const els = [];

  if (motif === "network") {
    const n = 7 + Math.floor(r() * 3);
    const pts = Array.from({ length: n }, () => ({ x: 24 + r() * (W - 48), y: 20 + r() * (H - 40) }));
    // edges to nearest neighbours
    pts.forEach((p, i) => {
      const dists = pts.map((q, j) => ({ j, d: (p.x - q.x) ** 2 + (p.y - q.y) ** 2 })).filter(o => o.j !== i).sort((a, b) => a.d - b.d);
      dists.slice(0, 2).forEach(({ j }) => {
        if (j > i) els.push(<line key={`e${i}-${j}`} x1={p.x} y1={p.y} x2={pts[j].x} y2={pts[j].y} stroke={G} strokeOpacity="0.28" strokeWidth="1" />);
      });
    });
    pts.forEach((p, i) => {
      const big = i % 3 === 0;
      els.push(<circle key={`n${i}`} cx={p.x} cy={p.y} r={big ? 4.5 : 2.6} fill={big ? G : "#0f141b"} stroke={G} strokeWidth="1.4" />);
    });
  } else if (motif === "signal") {
    for (let row = 0; row < 3; row++) {
      const amp = 8 + r() * 16, freq = 1.2 + r() * 2.2, ph = r() * 6, yBase = 34 + row * 32;
      let d = `M 8 ${yBase}`;
      for (let x = 8; x <= W - 8; x += 6) {
        const y = yBase + Math.sin((x / (W - 16)) * Math.PI * 2 * freq + ph) * amp * (1 - row * 0.18);
        d += ` L ${x.toFixed(1)} ${y.toFixed(1)}`;
      }
      els.push(<path key={`s${row}`} d={d} fill="none" stroke={row === 0 ? G : G2} strokeOpacity={0.85 - row * 0.28} strokeWidth={row === 0 ? 1.8 : 1.2} />);
    }
    // ticks
    for (let x = 16; x < W; x += 26) els.push(<line key={`t${x}`} x1={x} y1={H - 12} x2={x} y2={H - 6} stroke={G} strokeOpacity="0.35" strokeWidth="1" />);
  } else if (motif === "blocks") {
    // stacked isometric architecture blocks
    const cols = 4, baseY = H - 24;
    for (let c = 0; c < cols; c++) {
      const h = 18 + Math.floor(r() * 4) * 14;
      const x = 26 + c * 70, w = 46;
      const y = baseY - h;
      els.push(<rect key={`b${c}`} x={x} y={y} width={w} height={h} fill={c % 2 ? "rgba(74,222,128,0.10)" : "rgba(74,222,128,0.05)"} stroke={G} strokeOpacity="0.5" strokeWidth="1" rx="2" />);
      // top face hint
      els.push(<line key={`bl${c}`} x1={x} y1={y + 8} x2={x + w} y2={y + 8} stroke={G} strokeOpacity="0.3" strokeWidth="1" />);
      els.push(<circle key={`bd${c}`} cx={x + w - 8} cy={y + 6} r="1.6" fill={G} />);
    }
    els.push(<line key="ground" x1="10" y1={baseY} x2={W - 10} y2={baseY} stroke={G} strokeOpacity="0.35" strokeWidth="1" />);
  } else if (motif === "topo") {
    // dotted grid with an active path
    const cols = 10, rows = 4, gx = (W - 40) / (cols - 1), gy = (H - 44) / (rows - 1);
    const grid = [];
    for (let ri = 0; ri < rows; ri++) for (let ci = 0; ci < cols; ci++) {
      const x = 20 + ci * gx, y = 22 + ri * gy;
      grid.push({ x, y });
      els.push(<circle key={`g${ri}-${ci}`} cx={x} cy={y} r="1.3" fill={G} fillOpacity="0.22" />);
    }
    let path = "M";
    let ci = 0, ri = Math.floor(r() * rows);
    const seq = [];
    while (ci < cols) { seq.push({ x: 20 + ci * gx, y: 22 + ri * gy }); ri = Math.max(0, Math.min(rows - 1, ri + (r() < 0.5 ? -1 : 1))); ci += 1; }
    seq.forEach((p, i) => { path += `${i ? " L" : ""} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`; });
    els.push(<path key="topopath" d={path} fill="none" stroke={G} strokeWidth="1.8" strokeLinejoin="round" />);
    seq.forEach((p, i) => i % 2 === 0 && els.push(<circle key={`gp${i}`} cx={p.x} cy={p.y} r="2.6" fill="#0f141b" stroke={G} strokeWidth="1.4" />));
  } else { // orbit
    const cx = W / 2, cy = H / 2;
    for (let k = 0; k < 3; k++) {
      const rad = 22 + k * 22;
      els.push(<circle key={`o${k}`} cx={cx} cy={cy} r={rad} fill="none" stroke={G} strokeOpacity={0.35 - k * 0.07} strokeWidth="1" strokeDasharray={k === 1 ? "3 5" : "none"} />);
      const ang = r() * Math.PI * 2;
      els.push(<circle key={`op${k}`} cx={cx + Math.cos(ang) * rad} cy={cy + Math.sin(ang) * rad} r={k === 0 ? 3.5 : 2.4} fill={G} />);
    }
    els.push(<circle key="core" cx={cx} cy={cy} r="5" fill={G} />);
    els.push(<circle key="coreglow" cx={cx} cy={cy} r="9" fill="none" stroke={G} strokeOpacity="0.4" strokeWidth="1" />);
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height="100%" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id={`vg-${seed.replace(/\W/g, "")}-${motif}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#141b24" />
          <stop offset="100%" stopColor="#0e1419" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width={W} height={H} fill={`url(#vg-${seed.replace(/\W/g, "")}-${motif})`} />
      {els}
    </svg>
  );
}

/* public: renders uploaded image if present, else generative motif */
function ProjectViz({ project, index }) {
  if (project.image) {
    return <div className="proj-viz"><img src={project.image} alt={project.name} /></div>;
  }
  const motif = (project.motif && VIZ_MOTIFS.includes(project.motif)) ? project.motif : VIZ_MOTIFS[index % VIZ_MOTIFS.length];
  return (
    <div className="proj-viz gen">
      <VizSVG seed={project.name || ("p" + index)} motif={motif} />
      <span className="viz-tag mono">{motif}</span>
    </div>
  );
}

window.ProjectViz = ProjectViz;
window.VIZ_MOTIFS = VIZ_MOTIFS;
