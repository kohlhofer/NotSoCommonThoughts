import { writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const KIT = "/Users/alex/.claude/skills/anatomy";
const k = await import(`${KIT}/kit/iso-kit.mjs`);
const G = await import(`${KIT}/kit/lathe.mjs`);
const { kitScript } = await import(`${KIT}/scripts/inline-kit.mjs`);

const HERE = dirname(fileURLToPath(import.meta.url));
const WIDTH = 640;
const HEIGHT = 340;

// ---- world layout (z up, +x along the line, +y toward the front) ----
const BASE = { x: -190, y: -62, w: 372, d: 124, r: 9 };
const BASE_H = 12;
const FOOT_H = 5;
const BELT_Z = 11; // belt top
const BELT = { x0: -168, x1: 98, y0: -8, y1: 8 };
const TILE = 12;
const TILE_H = 2.2;

// The three sources, with their measured rates (candidates per worker-minute).
const HOPPERS = [
  { name: "sparse", label: "Sparse problem setup", x: -150, w: 22, rate: 0.25 },
  { name: "game", label: "Random middlegame", x: -116, w: 30, rate: 1.7 },
  { name: "selfplay", label: "Stockfish self-play", x: -82, w: 22, rate: 0.25 },
];
const HOP_Z0 = 44;
const HOP_Z1 = 62;
const DROP_Y = -38; // hoppers sit behind the main belt, each over its own feeder
const FEED = { y0: -50, y1: -12, half: 7 };
const postX = (h) => h.x + h.w / 2 + 4;
const SCREEN_X = -36;
const PRESS_X = 30;
const BENCH_X = 2;
const SHUTTLE_X = 116;
const RACK_X = 146;
const CELLS = [-27, -9, 9, 27];
// Shredders behind the line; each takes rejects through a slit at belt height.
const BINS = [
  { x: SCREEN_X - 14, y: -58, w: 28, d: 21 },
  { x: PRESS_X - 14, y: -58, w: 28, d: 21 },
];
const BIN_H = 12;
const PRESS_TOP = 70;
const PLUNGER_UP = 14; // plunger rest height above the belt
const DIAL = [PRESS_X + 13, -15];
const DIAL_R = 8.5;
const DIAL_Z = PRESS_TOP + 2;

const HOLO_PT = [PRESS_X - 20, -41];
const P = k.fitProjection(
  [...k.boxCorners(BASE, -BASE_H - FOOT_H, 0), [PRESS_X, -30, PRESS_TOP + 14], [HOLO_PT[0], HOLO_PT[1], PRESS_TOP + 38], [HOPPERS[0].x, -30, HOP_Z1 + 6], [RACK_X + 12, 40, 20]],
  WIDTH,
  HEIGHT,
  { pad: 24, azimuth: 58 },
);

const at = (p) => k.iso(p, P);
const S = (paths, style) => k.solidSvg(paths, style);
const L = (d, style) => k.lineSvg(d, style);
const D = (points, style) => k.dotsSvg(points, style);
const slab = (plan, z, h, style = {}, steps = 3, bevel = 0.4) => S(k.slabOf(plan, z, h, P, steps, bevel), { tone: "mid", ...style });
const cyl = (x, y, r, z, h, style = {}, steps = 24, bevel = 0) => S(k.cylinder(x, y, r, z, h, P, steps, bevel), { tone: "mid", ...style });
const byDepth = (points) => [...points].sort((a, b) => k.depthOf([a[0], a[1], 0], P) - k.depthOf([b[0], b[1], 0], P));
const screws = (points, z) => D(points.map(([x, y]) => at([x, y, z])), { size: 0.45 });

// ---- counters: a housing on a +y face with three digits on its front ----
function counter(id, cx, y, z0, w = 14, h = 7) {
  const out = [];
  out.push(slab({ x: cx - w / 2, y, w, d: 1.8, r: 0.5 }, z0, h, { tone: "lo" }, 2, 0.3));
  const face = y + 1.8;
  const win = [[cx - w / 2 + 1.4, face, z0 + 1.2], [cx + w / 2 - 1.4, face, z0 + 1.2], [cx + w / 2 - 1.4, face, z0 + h - 1.2], [cx - w / 2 + 1.4, face, z0 + h - 1.2]];
  out.push(L(k.pathOf(win.map(at), true), { tone: "mid" }));
  const size = Math.min(h * 0.62, (w - 3) / 1.95);
  out.push(k.faceTextSvg(k.sideMatrix([cx, face], z0 + (h - size * 0.72) / 2, P, "left"), "000", { size, tone: "hi", anchor: "middle" }).replace("<text ", `<text data-count="${id}" `));
  return out.join("");
}

// ---- error lamps: dark until a full feeder refuses a position ----
function errLamp(id, x, y, z) {
  return cyl(x, y, 2.4, z, 1, { tone: "lo" }, 18) + cyl(x, y, 1.7, z + 1, 1.3, { tone: "hi" }, 16) +
    `<path data-part="err${id}" class="pm-lamp pm-lamp-stop" d="${k.slabOf({ x: x - 1.7, y: y - 1.7, w: 3.4, d: 3.4, r: 1.7 }, z + 1, 1.3, P, 6).fill}" style="opacity:0"/>`;
}

// ---- base, ruler, label plate ----
function base() {
  const out = [`<path class="iso-halo" d="${k.haloOf(BASE, -BASE_H - FOOT_H, BASE_H, P)}"/>`];
  for (const [x, y] of byDepth(k.corners(BASE, 20))) {
    out.push(cyl(x, y, 7, -BASE_H - FOOT_H, 1.6, { tone: "lo" }, 28));
    out.push(cyl(x, y, 5.4, -BASE_H - FOOT_H + 1.6, FOOT_H - 1.6, {}, 28));
  }
  out.push(slab(BASE, -BASE_H, BASE_H, {}, 8, 1.6));
  out.push(L(k.planOutline(k.insetPlan(BASE, 5), 0, P), { tone: "lo" }));
  const corners = k.corners(BASE, 10);
  out.push(L(corners.map(([x, y]) => k.ring(x, y, 2.2, 0, P, 16)).join(""), { tone: "lo" }));
  out.push(screws(corners, 0));
  const strip = { x: -60, y: BASE.y + BASE.d - 14, w: 226, d: 7, r: 1 };
  out.push(S(k.slabOf(strip, 0, 0.6, P, 3), { tone: "lo", crease: "none" }));
  const ticks = k.topTicks(strip.x + 4, strip.x + strip.w - 4, 4, 5, strip.y + 0.8, 0.6, [2, 3.6], P);
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(screws([[strip.x + 2, strip.y + 3.5], [strip.x + strip.w - 2, strip.y + 3.5]], 0.6));
  const label = { x: -176, y: BASE.y + BASE.d - 26, w: 44, d: 18, r: 1.5 };
  out.push(S(k.slabOf(label, 0, 0.8, P, 4), { tone: "lo", crease: "none" }));
  out.push(L(k.planOutline(k.insetPlan(label, 1.6), 0.8, P), { tone: "faint" }));
  [[30, 5.5], [22, 9], [26, 12.5]].forEach(([len, dy]) => out.push(L(k.lineOnTop([label.x + 5, label.y + dy], [label.x + 5 + len, label.y + dy], 0.8, P), { tone: "lo", free: true })));
  out.push(screws([[label.x + 2.6, label.y + 2.6], [label.x + label.w - 2.6, label.y + label.d - 2.6]], 0.8));
  return out.join("");
}

// ---- reject bins behind the line: back parts, then front walls ----
const SH_H = 30;
const SLIT = { half: 7.4, z0: BELT_Z - 0.6, z1: BELT_Z + 4.8 };
const faceY = (b) => b.y + b.d;
// The slit as a polygon on the front face, and the housing's screen outline:
// a tile inside the housing shows only through the slit.
const slitPoly = (b) => { const cx = b.x + b.w / 2, y = faceY(b); return [[cx - SLIT.half, y, SLIT.z0], [cx + SLIT.half, y, SLIT.z0], [cx + SLIT.half, y, SLIT.z1], [cx - SLIT.half, y, SLIT.z1]].map(at); };
function shredder(b, i) {
  const out = [];
  const cx = b.x + b.w / 2, fy = faceY(b);
  const plan = { x: b.x, y: b.y, w: b.w, d: b.d, r: 2.5 };
  out.push(`<path class="iso-halo" d="${k.haloOf(plan, 0, 0.1, P)}" style="filter:blur(3px)"/>`);
  out.push(slab(plan, 0, 2, { tone: "lo" }, 4, 0.4));
  const body = k.insetPlan(plan, 1);
  const housing = k.slabOf(body, 2, SH_H - 2, P, 4, 0.8);
  out.push(S(housing, { tone: "mid", inner: L(k.sideSeam(body, SH_H - 5, P, 4), { tone: "faint" }) }));
  // the slit, with the cutters behind it
  const slit = slitPoly(b);
  out.push(`<path class="pm-slot" d="${k.pathOf(slit, true)}"/>`);
  const teeth = (z, phase) => { const pts = []; for (let x = cx - SLIT.half - 2.4, n = 0; x <= cx + SLIT.half + 2.4; x += 1.2, n++) pts.push(at([x, fy - 0.5, z + ((n + phase) % 2 ? 0.8 : -0.8)])); return k.pathOf(pts); };
  out.push(`<clipPath id="slit${i}"><path d="${k.pathOf(slit, true)}"/></clipPath><g clip-path="url(#slit${i})"><g data-part="teeth${i}"><path class="pm-teeth" d="${teeth(BELT_Z + 0.9, 0)}${teeth(BELT_Z + 3.3, 1)}"/></g></g>`);
  // the clip that hides a tile inside the housing except through the slit
  const W = 2000;
  // Only the housing from the slit up can stand in front of a tile; below the slit the table is in front.
  const upper = k.slabOf(body, SLIT.z0, SH_H - SLIT.z0, P, 4).fill;
  out.push(`<clipPath id="shclip${i}"><path clip-rule="evenodd" d="M${-W} ${-W}H${W}V${W}H${-W}Z${upper}${k.pathOf(slit, true)}"/></clipPath>`);
  // infeed table at belt height, from the belt's back rail to the slit
  const table = { x: cx - 8.5, y: fy, w: 17, d: -12 - fy, r: 0.4 };
  out.push(slab(table, 0, BELT_Z, { tone: "lo" }, 2, 0.3));
  out.push(L(k.planOutline(k.insetPlan(table, 1.6), BELT_Z, P, 2), { tone: "faint" }));
  // vent on top and the motor
  const vent = { x: cx - 7, y: b.y + 5, w: 14, d: 9, r: 1 };
  out.push(slab(vent, SH_H, 1.2, {}, 3, 0.3));
  const grille = [];
  for (let x = vent.x + 2.5; x < vent.x + vent.w - 1; x += 2.2) grille.push(k.lineOnTop([x, vent.y], [x, vent.y + vent.d], SH_H + 1.2, P));
  out.push(L(grille.join(""), { tone: "lo" }));
  const mx = b.x + b.w - 4.5, my = b.y + b.d - 5;
  out.push(cyl(mx, my, 2.8, SH_H, 3, {}, 18));
  out.push(L(k.knurl(mx, my, 2.8, SH_H, SH_H + 3, 16, P), { tone: "lo" }));
  out.push(screws([[b.x + 3.5, b.y + 3.5], [b.x + 3.5, b.y + b.d - 3.5]], SH_H));
  out.push(counter("bin" + i, cx - 3.5, fy - 1, SLIT.z1 + 3, 17, 11));
  return out.join("");
}
// Tiles on their way into a shredder: after the housing, clipped by it.
const shredLayers = () => BINS.map((_, i) => `<g data-layer="shred${i}" clip-path="url(#shclip${i})"></g>`).join("");

// ---- rack of four cell trays at the end of the line ----
const trayPlan = (cy) => ({ x: RACK_X - 8, y: cy - 7.5, w: 16, d: 15, r: 1.2 });
// Each tray is drawn whole, farthest first: floor, back and left walls,
// its stack of tiles, then right and front walls.
const TRAY_WALL = 5;
function rack() {
  const out = [];
  const plate = { x: RACK_X - 12, y: -40, w: 26, d: 80, r: 3 };
  out.push(`<path class="iso-halo" d="${k.haloOf(plate, 0, 0.1, P)}" style="filter:blur(3px)"/>`);
  out.push(slab(plate, 0, 3, { tone: "lo" }, 4, 0.5));
  CELLS.forEach((cy, i) => {
    const t = trayPlan(cy);
    out.push(slab(t, 3, 1.4, { tone: "lo" }, 3));
    out.push(slab({ x: t.x, y: t.y, w: t.w, d: 1.6, r: 0.5 }, 4.4, TRAY_WALL, {}, 2));
    out.push(slab({ x: t.x, y: t.y + 1.6, w: 1.6, d: t.d - 3.2, r: 0.5 }, 4.4, TRAY_WALL, {}, 2));
    out.push(`<g data-layer="tray${i}"></g>`);
    out.push(slab({ x: t.x + t.w - 1.6, y: t.y + 1.6, w: 1.6, d: t.d - 3.2, r: 0.5 }, 4.4, TRAY_WALL, {}, 2));
    out.push(slab({ x: t.x, y: t.y + t.d - 1.6, w: t.w, d: 1.6, r: 0.5 }, 4.4, TRAY_WALL, {}, 2));
  });
  const post = { x: RACK_X - 11, y: 41, w: 22, d: 5, r: 1 };
  out.push(slab(post, 0, 16, {}, 3, 0.4));
  out.push(screws([[post.x + 2.5, post.y + 2.5], [post.x + post.w - 2.5, post.y + 2.5]], 16));
  out.push(counter("kept", RACK_X, post.y + post.d, 2.4, 20, 12));
  return out.join("");
}

// ---- posts and frames behind the belt ----
function backFrames() {
  const out = [];
  // hopper posts and arms
  for (const h of HOPPERS) {
    const px = postX(h);
    out.push(cyl(px, DROP_Y, 4.4, 0, 2, { tone: "lo" }, 20));
    out.push(cyl(px, DROP_Y, 2.6, 2, HOP_Z0 + 8, { crease: "none" }, 20));
    out.push(L(k.sideArc(px, DROP_Y, 2.6, 30, P, 12), { tone: "faint" }));
    out.push(cyl(px, DROP_Y, 3.4, HOP_Z0 + 10, 1.4, {}, 20));
  }
  // screen gantry: two back posts and a beam, an arm over the belt
  for (const x of [SCREEN_X - 13, SCREEN_X + 13]) {
    out.push(cyl(x, -24, 4.2, 0, 2, { tone: "lo" }, 20));
    out.push(cyl(x, -24, 2.6, 2, 42, { crease: "none" }, 20));
  }
  out.push(slab({ x: SCREEN_X - 17, y: -28, w: 34, d: 8, r: 1.5 }, 44, 6, {}, 3, 0.5));
  out.push(screws([[SCREEN_X - 13, -24], [SCREEN_X + 13, -24]], 50));
  // press column
  out.push(slab({ x: PRESS_X + 8, y: -36, w: 16, d: 14, r: 2 }, 0, 4, { tone: "lo" }, 3, 0.5));
  out.push(slab({ x: PRESS_X + 10, y: -34, w: 12, d: 10, r: 1.5 }, 4, PRESS_TOP - 4, {}, 3, 0.5));
  out.push(screws([[PRESS_X + 10.5, -22.8], [PRESS_X + 21.5, -22.8]], 4));
  // shuttle rails
  for (const x of [SHUTTLE_X - 7, SHUTTLE_X + 5]) out.push(slab({ x, y: -36, w: 3, d: 72, r: 0.8 }, 0, 4, {}, 2, 0.3));
  for (const y of [-40, 36]) out.push(slab({ x: SHUTTLE_X - 10, y, w: 20, d: 4, r: 1 }, 0, 7, {}, 3, 0.4));
  return out.join("");
}

// ---- feeder belts: one per hopper, running into the main belt ----
function feeders() {
  const out = [];
  for (const h of HOPPERS) {
    const x0 = h.x - FEED.half - 2.2, x1 = h.x + FEED.half;
    for (const y of [FEED.y0 + 6, FEED.y1 - 8]) out.push(slab({ x: x0 - 1, y: y - 2, w: x1 - x0 + 3.2, d: 4, r: 0.8 }, 0, 5, { tone: "lo" }, 2));
    out.push(slab({ x: x0, y: FEED.y0, w: 2.2, d: FEED.y1 - FEED.y0, r: 0.6 }, 5, BELT_Z - 5, {}, 2, 0.3));
    const F = G.frameAlong([h.x - FEED.half, FEED.y0 + 4, BELT_Z - 4], [1, 0, 0]);
    out.push(S(G.disc(0, FEED.half * 2, 4, F, P), { tone: "mid" }));
    out.push(slab({ x: h.x - FEED.half, y: FEED.y0 + 4, w: FEED.half * 2, d: FEED.y1 - FEED.y0 - 4, r: 0.5 }, BELT_Z - 2, 2, { tone: "lo" }, 2));
    const cleats = [];
    for (let y = FEED.y0 + 9; y < FEED.y1 - 2; y += 7) cleats.push(k.lineOnTop([h.x - FEED.half, y], [h.x + FEED.half, y], BELT_Z, P));
    out.push(L(cleats.join(""), { tone: "faint" }));
    out.push(slab({ x: x1, y: FEED.y0, w: 2.2, d: FEED.y1 - FEED.y0, r: 0.6 }, 5, BELT_Z - 5, {}, 2, 0.3));
    out.push(screws([[x0 + 1.1, FEED.y0 + 2], [x1 + 1.1, FEED.y0 + 2]], BELT_Z));
  }
  return out.join("");
}

// ---- the belt ----
function belt() {
  const out = [];
  for (const x of [-160, -110, -60, -10, 40, 90]) {
    out.push(slab({ x: x - 3, y: -12, w: 6, d: 24, r: 1 }, 0, 5, { tone: "lo" }, 2));
  }
  out.push(slab({ x: BELT.x0, y: -12, w: BELT.x1 - BELT.x0, d: 3, r: 0.8 }, 5, BELT_Z - 5, {}, 2, 0.3));
  for (const x of [BELT.x0 + 4, BELT.x1 - 4]) {
    const F = G.frameAlong([x, -9, BELT_Z - 4], [0, 1, 0]);
    out.push(S(G.disc(0, 18, 4, F, P), { tone: "mid" }));
  }
  out.push(slab({ x: BELT.x0 + 4, y: BELT.y0, w: BELT.x1 - BELT.x0 - 8, d: 16, r: 0.6 }, BELT_Z - 2, 2, { tone: "lo" }, 2));
  const cleats = [];
  for (let x = BELT.x0 + 10; x < BELT.x1 - 6; x += 9) cleats.push(k.lineOnTop([x, BELT.y0], [x, BELT.y1], BELT_Z, P));
  out.push(L(cleats.join(""), { tone: "faint" }));
  out.push(slab({ x: BELT.x0, y: 9, w: BELT.x1 - BELT.x0, d: 3, r: 0.8 }, 5, BELT_Z - 5, {}, 2, 0.3));
  out.push(screws([-150, -100, -50, 0, 50].map((x) => [x, 10.5]), BELT_Z));
  return out.join("");
}

// ---- hoppers over the belt ----
function hoppers() {
  const out = [];
  for (const h of HOPPERS) {
    // a square chute a little wider than a tile, with a collar under the hopper
    const chute = { x: h.x - 7.6, y: DROP_Y - 7.6, w: 15.2, d: 15.2, r: 1.2 };
    out.push(S(k.slabOf(chute, BELT_Z + 12, HOP_Z0 - 4 - BELT_Z - 12, P, 3, 0.4), { tone: "mid", inner: L(k.sideSeam(chute, BELT_Z + 16, P, 3), { tone: "faint" }) }));
    out.push(slab(k.insetPlan(chute, -1.4), HOP_Z0 - 4, 4, {}, 3, 0.5));
    out.push(slab({ x: h.x + h.w / 2 - 1, y: DROP_Y - 2, w: postX(h) - h.x - h.w / 2 + 1, d: 4, r: 1 }, HOP_Z0 + 4, 4));
    const plan = { x: h.x - h.w / 2, y: DROP_Y - 11, w: h.w, d: 22, r: 2 };
    out.push(slab(plan, HOP_Z0, HOP_Z1 - HOP_Z0, {}, 4, 0.8));
    out.push(L(k.sideSeam(plan, HOP_Z0 + 5, P, 4), { tone: "faint" }));
    // the lid is a light panel with the source's symbol in the middle
    const hi = HOPPERS.indexOf(h);
    const panel = k.onTop(k.ringOf(k.insetPlan(plan, 2.4), 4), HOP_Z1, P, true);
    out.push(`<path class="pm-panel" d="${panel}"/><path data-part="panelOn${hi}" class="pm-panel-on" d="${panel}" style="opacity:0"/><path data-part="err${hi}" class="pm-panel-err" d="${panel}" style="opacity:0"/>`);
    out.push(`<path data-part="sym${hi}" class="pm-mark" d="${symbolOnTop(hi, h.x, DROP_Y, 6.4, HOP_Z1)}"/>`);
    out.push(screws([[plan.x + 2, plan.y + plan.d - 1.2], [plan.x + plan.w - 2, plan.y + plan.d - 1.2]], HOP_Z0 + 2));
    out.push(counter("h" + hi, h.x, plan.y + plan.d, HOP_Z0 + 3.5, 19, 11.5));
  }
  return out.join("");
}

// ---- screen probe (Stockfish's mate search) ----
function screenArm() {
  const out = [];
  out.push(slab({ x: SCREEN_X - 4, y: -22, w: 8, d: 24, r: 1.2 }, 40, 6, {}, 3, 0.4));
  out.push(cyl(SCREEN_X, 0, 4.5, 34, 6, {}, 24));
  out.push(L(k.knurl(SCREEN_X, 0, 4.5, 35, 39, 24, P), { tone: "lo" }));
  return out.join("");
}
function screenProbe() {
  return cyl(SCREEN_X, 0, 2.6, BELT_Z + 4, 2, {}, 16) + cyl(SCREEN_X, 0, 1.6, BELT_Z + 6, 39 - BELT_Z - 6, { crease: "none" }, 14);
}

// ---- the proof press (the exact solver) ----
// ---- the inspection station (the exact solver) ----
const PINS = 10;
const PIN_R = 5.2;
const EMIT = [PRESS_X - 3, -24];
const HOLO = { c: [PRESS_X - 3, -24], z: PRESS_TOP + 36, size: 34 };
const LAMPS = [[PRESS_X + 19, 5], [PRESS_X + 12, 5]];
const pinAt = (i) => { const a = (i / PINS) * Math.PI * 2; return [PRESS_X + Math.sin(a) * PIN_R, Math.cos(a) * PIN_R]; };
function pressHead() {
  const out = [];
  const head = { x: PRESS_X - 10, y: -34, w: 34, d: 44, r: 2.5 };
  out.push(slab(head, PRESS_TOP - 8, 10, {}, 4, 0.8));
  out.push(L(k.sideSeam(head, PRESS_TOP - 3, P, 4), { tone: "faint" }));
  out.push(screws([[PRESS_X - 7, -31], [PRESS_X + 21, -31], [PRESS_X - 7, 7], [PRESS_X + 21, 7]], PRESS_TOP + 2));
  out.push(cyl(PRESS_X, 0, 4.2, PRESS_TOP - 14, 6, {}, 24));
  out.push(L(k.sideArc(PRESS_X, 0, 4.2, PRESS_TOP - 11, P, 16), { tone: "faint" }));
  // dial: counts the defences checked
  const [x, y] = DIAL;
  out.push(cyl(x, y, DIAL_R, DIAL_Z, 4, { tone: "hi", crease: "lo" }, 48, 0.6));
  out.push(L(k.ring(x, y, DIAL_R - 1.6, DIAL_Z + 4, P, 48), { tone: "lo" }));
  const ticks = k.radialTicks(x, y, DIAL_R - 2, 12, 4, DIAL_Z + 4, [1, 2], P, -Math.PI * 0.75, Math.PI * 1.5 * (12 / 11));
  out.push(L(ticks.minor, { tone: "lo" }), L(ticks.major, { tone: "mid" }));
  out.push(L(k.ring(x, y, 1.2, DIAL_Z + 4, P, 12), { tone: "mid" }));
  // go and reject lamps
  LAMPS.forEach(([lx, ly], i) => {
    out.push(cyl(lx, ly, 2.6, DIAL_Z, 1.2, { tone: "lo" }, 18));
    out.push(cyl(lx, ly, 1.9, DIAL_Z + 1.2, 1.4, { tone: "hi" }, 18));
    out.push(`<path data-part="lamp${i}" class="pm-lamp pm-lamp-${i ? "stop" : "go"}" d="${k.slabOf({ x: lx - 1.9, y: ly - 1.9, w: 3.8, d: 3.8, r: 1.9 }, DIAL_Z + 1.2, 1.4, P, 6).fill}" style="opacity:0"/>`);
  });
  // hologram emitter
  out.push(cyl(EMIT[0], EMIT[1], 4, DIAL_Z, 2, { tone: "lo" }, 24));
  out.push(cyl(EMIT[0], EMIT[1], 2.6, DIAL_Z + 2, 2.4, {}, 20));
  out.push(L(k.ring(EMIT[0], EMIT[1], 1.4, DIAL_Z + 4.4, P, 16), { tone: "hi" }));
  return out.join("");
}
function hologram() {
  const { c, z, size } = HOLO;
  const h = size / 2, sq = size / 8;
  const corners = [[c[0] - h, c[1] - h], [c[0] + h, c[1] - h], [c[0] + h, c[1] + h], [c[0] - h, c[1] + h]];
  const lens = [EMIT[0], EMIT[1], DIAL_Z + 4.4];
  const beams = corners.map(([x, y]) => k.segment(lens, [x, y, z], P)).join("");
  const grid = [];
  for (let i = 1; i < 8; i++) {
    grid.push(k.lineOnTop([c[0] - h + i * sq, c[1] - h], [c[0] - h + i * sq, c[1] + h], z, P));
    grid.push(k.lineOnTop([c[0] - h, c[1] - h + i * sq], [c[0] + h, c[1] - h + i * sq], z, P));
  }
  const shade = [];
  for (let i = 0; i < 8; i++) for (let j = 0; j < 8; j++) if ((i + j) % 2) shade.push(k.onTop([[c[0] - h + i * sq, c[1] - h + j * sq], [c[0] - h + (i + 1) * sq, c[1] - h + j * sq], [c[0] - h + (i + 1) * sq, c[1] - h + (j + 1) * sq], [c[0] - h + i * sq, c[1] - h + (j + 1) * sq]], z, P, true));
  const glyphs = Array.from({ length: 7 }, (_, i) => `<text class="pm-glyph" data-glyph="${i}" text-anchor="middle"></text>`).join("");
  return `<g data-part="holo" class="pm-holo" style="opacity:0"><path class="pm-beam" d="${beams}"/><path class="pm-sq" d="${shade.join("")}"/><path class="pm-grid" d="${grid.join("")}"/><path class="pm-frame" d="${k.onTop(corners, z, P, true)}"/>${glyphs}</g>`;
}
function plunger() {
  const out = [];
  const pins = [...Array(PINS).keys()].sort((a, b) => k.depthOf([...pinAt(a), 0], P) - k.depthOf([...pinAt(b), 0], P));
  const back = pins.filter((i) => k.depthOf([...pinAt(i), 0], P) < k.depthOf([PRESS_X, 0, 0], P));
  const front = pins.filter((i) => !back.includes(i));
  const pin = (i) => { const [x, y] = pinAt(i); return `<g data-pin="${i}">${cyl(x, y, 0.75, 0, 3.4, { tone: "hi", crease: "none" }, 10)}</g>`; };
  out.push(back.map(pin).join(""));
  out.push(cyl(PRESS_X, 0, 1.6, 0, 3.4, { tone: "lo", crease: "none" }, 12));
  out.push(front.map(pin).join(""));
  out.push(cyl(PRESS_X, 0, 7.4, 3, 3, { tone: "hi", lit: true }, 40, 0.4));
  const leds = [...Array(PINS).keys()].map((i) => { const [x, y] = pinAt(i); return [x + (x - PRESS_X) * 0.08, y * 1.08]; });
  out.push(D(leds.map(([x, y]) => at([x, y, 6])), { size: 0.7, tone: "lo" }));
  out.push(leds.map(([x, y], i) => `<circle data-led="${i}" class="pm-led" cx="${at([x, y, 6])[0].toFixed(1)}" cy="${at([x, y, 6])[1].toFixed(1)}" r="1.05" style="opacity:0"/>`).join(""));
  // the stem stands on the head, so it is drawn last
  out.push(cyl(PRESS_X, 0, 2, 6, 38.5, { tone: "hi", lit: true, crease: "none" }, 18));
  return out.join("");
}

// ---- pushers in front of the line (rods along y) ----
function pusherBase(x) {
  const out = [];
  out.push(slab({ x: x - 8, y: 26, w: 16, d: 20, r: 1.5 }, 0, 18, {}, 3, 0.5));
  out.push(screws([[x - 5, 43], [x + 5, 43]], 18));
  return out.join("");
}
function pusher(x) {
  const out = [];
  out.push(slab({ x: x - 7, y: 9, w: 14, d: 3, r: 0.8 }, BELT_Z + 0.6, 6, {}, 2, 0.3));
  out.push(slab({ x: x - 1.4, y: 12, w: 2.8, d: 32, r: 1.2 }, BELT_Z + 2.2, 2.8, { crease: "none" }, 2));
  return out.join("");
}

// ---- Claude's workbench: a vise plate feeding the press ----
// The bench top is level with the belt, and the vise spot lines up with the chute.
const BT = BELT_Z;
const CHUTE_X = BENCH_X + 3;
function bench() {
  const out = [];
  const plate = { x: BENCH_X - 14, y: 24, w: 28, d: 24, r: 2 };
  out.push(`<path class="iso-halo" d="${k.haloOf(plate, 0, 0.1, P)}" style="filter:blur(3px)"/>`);
  for (const [x, y] of byDepth(k.corners(plate, 4))) {
    out.push(cyl(x, y, 3, 0, 1.4, { tone: "lo" }, 16));
    out.push(cyl(x, y, 2, 1.4, BT - 4 - 1.4, { crease: "none" }, 14));
  }
  out.push(slab(plate, BT - 4, 4, {}, 4, 0.6));
  out.push(L(k.planOutline(k.insetPlan(plate, 2.5), BT, P, 3), { tone: "faint" }));
  // chute: level from the bench edge to the belt edge
  out.push(slab({ x: CHUTE_X - 6, y: 12, w: 12, d: 12, r: 0.4 }, BT - 1, 1, { tone: "lo" }, 2));
  out.push(slab({ x: CHUTE_X - 7.6, y: 12, w: 1.6, d: 12, r: 0.4 }, BT, 2, {}, 2));
  const stand = { x: plate.x, y: plate.y + plate.d - 3.5, w: 10, d: 3, r: 0.6 };
  out.push(slab(stand, BT, 11, {}, 2, 0.3));
  out.push(counter("h3", stand.x + stand.w / 2, stand.y + stand.d, BT + 1, 10, 9));
  out.push(errLamp(3, plate.x + plate.w - 3.5, plate.y + 4, BT));
  out.push(`<path class="pm-mark" d="${symbolOnTop(3, plate.x + plate.w - 3.8, plate.y + 14, 2.6, BT)}"/>`);
  // vise jaws and knob, behind the tile's spot
  out.push(slab({ x: CHUTE_X - 8, y: 41, w: 16, d: 3, r: 0.6 }, BT, 4, {}, 2));
  out.push(cyl(CHUTE_X, 46.5, 2.4, BT, 2, {}, 16));
  out.push(L(k.knurl(CHUTE_X, 46.5, 2.4, BT, BT + 2, 14, P), { tone: "lo" }));
  return out.join("");
}
function benchFront() {
  return slab({ x: CHUTE_X + 6, y: 12, w: 1.6, d: 12, r: 0.4 }, BT, 2, {}, 2);
}

// ---- shuttle carriage ----
function shuttle() {
  const out = [];
  out.push(slab({ x: SHUTTLE_X - 9, y: -8, w: 18, d: 16, r: 1.5 }, 4, 3, {}, 3, 0.4));
  out.push(slab({ x: SHUTTLE_X - 7, y: -6, w: 14, d: 12, r: 1 }, 7, 1.2, { tone: "lo" }, 2));
  out.push(screws([[SHUTTLE_X - 7.5, 6.5], [SHUTTLE_X + 7.5, 6.5]], 7));
  return out.join("");
}

// ---- source symbols: triangle, circle, square, diamond ----
const SYMBOLS = [
  (r) => [[0, -r * 1.05], [r * 0.95, r * 0.6], [-r * 0.95, r * 0.6]],
  (r) => k.circleRing(0, 0, r * 0.85, 28),
  (r) => [[-r * 0.75, -r * 0.75], [r * 0.75, -r * 0.75], [r * 0.75, r * 0.75], [-r * 0.75, r * 0.75]],
  (r) => [[0, -r], [r, 0], [0, r], [-r, 0]],
];
const symbolOnTop = (i, cx, cy, r, z) => k.onTop(SYMBOLS[i](r).map(([x, y]) => [cx + x, cy + y]), z, P, true);
const SYMBOL_SVG = [
  "M8 2.5 L14 13 L2 13 Z",
  "M8 2.5 A5.5 5.5 0 1 1 7.99 2.5 Z",
  "M3 3 H13 V13 H3 Z",
  "M8 1.5 L14.5 8 L8 14.5 L1.5 8 Z",
];

// ---- a position tile: a tiny board ----
function tile() {
  const h = TILE / 2;
  const plan = { x: -h, y: -h, w: TILE, d: TILE, r: 0.6 };
  const out = [S(k.slabOf(plan, 0, TILE_H, P, 2, 0.3), { tone: "hi", crease: "lo" })];
  const grid = [];
  for (const v of [-h + 2.5, 0, h - 2.5]) {
    grid.push(k.lineOnTop([v, -h], [v, h], TILE_H, P));
    grid.push(k.lineOnTop([-h, v], [h, v], TILE_H, P));
  }
  out.push(L(grid.join(""), { tone: "faint" }));
  SYMBOLS.forEach((_, i) => out.push(`<path class="pm-sym" data-s="${i}" d="${symbolOnTop(i, 0, 0, 3.4, TILE_H)}"/>`));
  return out.join("");
}
const TILE_SVG = tile();
const POOL = 26;
const tiles = Array.from({ length: POOL }, (_, i) => `<g data-tile="${i}" style="display:none">${TILE_SVG}</g>`).join("");

const needleAt = (share) => {
  const angle = -Math.PI * 0.75 + share * Math.PI * 1.5;
  const [x, y] = DIAL;
  return k.lineOnTop([x - Math.sin(angle) * 1.6, y + Math.cos(angle) * 1.6], [x + Math.sin(angle) * (DIAL_R - 2.4), y - Math.cos(angle) * (DIAL_R - 2.4)], DIAL_Z + 4.2, P);
};

// ---- compute: the CPU that does the hunting ----
const RACK = { x: -188, y: -60, w: 17, d: 62, r: 2 };
const LEDS = Array.from({ length: 8 }, (_, i) => [RACK.x + RACK.w, RACK.y + 9 + i * 6.2, 13]);
function compute() {
  const out = [`<path class="iso-halo" d="${k.haloOf(RACK, 0, 0.1, P)}" style="filter:blur(3px)"/>`];
  out.push(slab(RACK, 0, 3, { tone: "lo" }, 4, 0.5));
  const body = k.insetPlan(RACK, 1.2);
  out.push(S(k.slabOf(body, 3, 18, P, 4, 0.6), { tone: "mid", inner: L(k.sideSeam(body, 8, P, 4), { tone: "faint" }) }));
  for (let i = 0; i < 12; i++) out.push(slab({ x: RACK.x + 2.5, y: RACK.y + 3 + i * 4.9, w: RACK.w - 5, d: 1.4, r: 0.3 }, 21, 6, {}, 2, 0));
  out.push(D(LEDS.map(at), { size: 0.9, tone: "lo" }));
  out.push(`<g data-part="leds" style="opacity:0">${D(LEDS.map(at), { size: 1, tone: "hi" })}</g>`);
  return out.join("");
}
// A cable is a plain wire with a current overlay that lights only while
// its station draws on it.
function cable(id, from, to, via) {
  const pts = [from, ...via, to];
  return k.wireSvg(from, to, { via, tone: "mid", size: 1 }) + `<path data-part="cur-${id}" class="pm-current" d="${k.pathOf(pts)}" style="opacity:0"/>`;
}
function cables() {
  const out = HOPPERS.map((h, i) => {
    const y = -52.5 - i * 2.2, px = postX(h);
    return cable("h" + i, at([RACK.x + RACK.w, y, 4]), at([px, DROP_Y - 4.4, 1]), [at([RACK.x + RACK.w + 3, y, 1]), at([px, y, 1])]);
  });
  // Stockfish's two stations: the mate search and the inspection head
  const sx = SCREEN_X - 13 - 4.2;
  out.push(cable("screen", at([RACK.x + RACK.w, -59.4, 4]), at([sx, -24, 1]), [at([RACK.x + RACK.w + 3, -59.4, 1]), at([sx, -59.4, 1])]));
  out.push(cable("inspect", at([RACK.x + RACK.w, -59.8, 2]), at([PRESS_X + 16, -34.2, 1]), [at([RACK.x + RACK.w + 3, -61.3, 1]), at([PRESS_X + 16, -61.3, 1])]));
  return out.join("");
}

// ---- the token tank that feeds the LLM ----
const TANK = [BENCH_X - 23, 30];
const TANK_R = 5.6, TANK_H = 22;
const glassAt = (z) => at([TANK[0] + TANK_R * Math.cos(98 * Math.PI / 180) * 1.01, TANK[1] + TANK_R * Math.sin(98 * Math.PI / 180) * 1.01, z]);
const GLASS = { b: glassAt(4), t: glassAt(TANK_H - 4) };
function tank() {
  const out = [];
  const [x, y] = TANK;
  out.push(`<path class="iso-halo" d="${k.haloOf({ x: x - 7, y: y - 7, w: 14, d: 14, r: 7 }, 0, 0.1, P)}" style="filter:blur(3px)"/>`);
  out.push(cyl(x, y, TANK_R + 1.4, 0, 1.6, { tone: "lo" }, 32));
  out.push(cyl(x, y, TANK_R, 1.6, TANK_H - 1.6, { crease: "none" }, 40, 0));
  out.push(L(k.sideArc(x, y, TANK_R, 6, P, 24) + k.sideArc(x, y, TANK_R, TANK_H - 6, P, 24), { tone: "faint" }));
  out.push(cyl(x, y, TANK_R - 1.2, TANK_H, 1.4, {}, 32, 0.3));
  out.push(cyl(x, y, 1.8, TANK_H + 1.4, 1.6, {}, 16));
  out.push(`<path class="pm-glass" d="M${GLASS.b[0].toFixed(1)} ${GLASS.b[1].toFixed(1)}L${GLASS.t[0].toFixed(1)} ${GLASS.t[1].toFixed(1)}"/>`);
  out.push(`<path data-part="level" class="pm-level" d="M${GLASS.b[0].toFixed(1)} ${GLASS.b[1].toFixed(1)}L${GLASS.t[0].toFixed(1)} ${GLASS.t[1].toFixed(1)}"/>`);
  out.push(k.faceTextSvg(k.topMatrix([x - 3.4, y + 2.6], TANK_H, P, "x"), "TOKENS", { size: 1.5, tone: "lo" }));
  return out.join("");
}
function hose() {
  const from = at([TANK[0] + TANK_R, TANK[1], TANK_H - 6]), to = at([BRAIN[0] - 3.2, BRAIN[1], BELT_Z + 1.4]);
  const mid = at([(TANK[0] + TANK_R + BRAIN[0] - 3.2) / 2, TANK[1] + 1, BELT_Z + 9]);
  return k.wireSvg(from, to, { via: [mid], tone: "mid", size: 1 }) + `<path data-part="cur-tokens" class="pm-tokens" d="${k.pathOf([from, mid, to])}" style="opacity:0"/>`;
}

// ---- the brain on Claude's bench ----
const BRAIN = [BENCH_X - 8.5, 29, 22.8];
const BRAIN_R = 8;
function brain() {
  const out = [];
  out.push(cyl(BRAIN[0], BRAIN[1], 3.2, BELT_Z, 2.4, {}, 20));
  out.push(cyl(BRAIN[0], BRAIN[1], 2, BELT_Z + 2.4, 2, { crease: "none" }, 14));
  const ball = G.sphereOf(BRAIN, BRAIN_R, P);
  out.push(S(ball, { tone: "mid" }));
  out.push(`<g data-part="brain-on" style="opacity:0">${S(ball, { tone: "hi", lit: true })}</g>`);
  // folds: wavy rings on the visible side, and the midline
  const V = G.viewOf(P);
  const runs = [];
  const trace = (dirOf, n = 120) => {
    let run = [];
    for (let i = 0; i <= n; i++) {
      const d = G.unit3(dirOf(i / n));
      const seen = G.dot3(d, V) > 0.18;
      if (seen) run.push(at(G.add3(BRAIN, G.mul3(d, BRAIN_R))));
      if ((!seen || i === n) && run.length > 1) { runs.push(run); run = []; }
      if (!seen) run = [];
    }
  };
  for (const lat of [0.2, 0.62, 1.0]) trace((t) => { const lon = t * Math.PI * 2; const l = lat + 0.1 * Math.sin(lon * 7 + lat * 5); return [Math.cos(l) * Math.cos(lon), Math.cos(l) * Math.sin(lon), Math.sin(l)]; });
  trace((t) => { const a = t * Math.PI; return [Math.cos(a), 0.06 * Math.sin(a * 9), Math.sin(a)]; }, 60);
  out.push(`<g data-part="folds">${runs.map((r) => L(k.pathOf(r), { tone: "lo", free: true })).join("")}</g>`);
  return out.join("");
}

// ---- callouts, as on a technical drawing ----
const CALLOUTS = [
  { text: "Compute: 8 workers", at: [RACK.x + 8, RACK.y + 52, 27], side: "top" },
  { text: "Sparse setups", at: [HOPPERS[0].x, -1, HOP_Z1], side: "top" },
  { text: "Random middlegames", at: [HOPPERS[1].x, -1, HOP_Z1], side: "top" },
  { text: "Stockfish self-play", at: [HOPPERS[2].x, -1, HOP_Z1], side: "top" },
  { text: "Mate search", at: [SCREEN_X, -24, 50], side: "top" },
  { text: "Exact solver", at: [PRESS_X + 2, -20, PRESS_TOP + 2], side: "top" },
  { text: "Rejects", at: [BINS[1].x + 26, BINS[1].y + 6, BIN_H], side: "top" },
  { text: "Claude composes", at: [BRAIN[0], BRAIN[1] + 2, BRAIN[2] - 2], side: "bottom" },
  { text: "Pusher", at: [SCREEN_X, 36, 12], side: "bottom" },
  { text: "Pick: 4 cells", at: [RACK_X, CELLS[3], 13], side: "bottom" },
];
function callouts() {
  const out = [];
  for (const side of ["top", "bottom"]) {
    const list = CALLOUTS.filter((c) => c.side === side).map((c) => ({ ...c, a: at(c.at), w: c.text.length * 5 + 6 })).sort((a, b) => a.a[0] - b.a[0]);
    list.forEach((c) => (c.x = c.a[0]));
    for (let i = 1; i < list.length; i++) list[i].x = Math.max(list[i].x, list[i - 1].x + (list[i - 1].w + list[i].w) / 2 + 8);
    const right = WIDTH - 10;
    if (list.length) list[list.length - 1].x = Math.min(list[list.length - 1].x, right - list[list.length - 1].w / 2);
    for (let i = list.length - 2; i >= 0; i--) list[i].x = Math.min(list[i].x, list[i + 1].x - (list[i].w + list[i + 1].w) / 2 - 8);
    for (const c of list) {
      const y = side === "top" ? 18 : HEIGHT - 10;
      const knee = side === "top" ? y + 9 : y - 15;
      const from = [c.x, side === "top" ? y + 3 : y - 9];
      const via = Math.abs(c.x - c.a[0]) > 0.5 ? [[c.x, knee]] : [];
      out.push(k.wireSvg(from, c.a, { via, tone: "mid", ends: "to", size: 1.1 }).replace("<path ", '<path data-free="start" '));
      out.push(`<text class="pm-label" x="${c.x.toFixed(1)}" y="${y.toFixed(1)}" text-anchor="middle">${c.text}</text>`);
    }
  }
  return out.join("");
}

// ---- hit areas: press a hopper or the brain ----
function hits() {
  const out = HOPPERS.map((h, i) => `<path class="pm-hit" data-feed="${i}" d="${k.slabOf({ x: h.x - h.w / 2 - 2, y: DROP_Y - 13, w: h.w + 4, d: 26, r: 2 }, BELT_Z + 12, HOP_Z1 - BELT_Z - 10, P).fill}"><title>Drop a ${h.label.toLowerCase()}</title></path>`);
  out.push(`<path class="pm-hit" data-feed="3" d="${k.slabOf({ x: BENCH_X - 14, y: 22, w: 28, d: 26, r: 2 }, 0, 32, P).fill}"><title>Let the LLM compose one</title></path>`);
  return out.join("");
}

const svg = k.figureSvg({
  width: WIDTH,
  height: HEIGHT,
  label:
    "A small production line on a bench. Three hoppers drop chess positions, drawn as tiny boards, onto a belt: sparse problem setups, random middlegames and positions from Stockfish playing itself. A probe screens each position with Stockfish's mate search and a pusher sweeps the failures into a bin. The survivors go under a press, the exact solver, whose dial counts the defences it proves; unsound ones are swept into a second bin. A shuttle sorts the kept positions into four cell trays so no kind of puzzle crowds out the rest. At the front, a small vise bench feeds hand-composed positions straight to the press.",
  body: [
    base(),
    compute(),
    cables(),
    BINS.map(shredder).join(""),
    shredLayers(),
    // sparks fly out of the shredders' tops: in front of them, behind everything nearer
    `<g data-layer="sparks">${Array.from({ length: 36 }, () => '<circle class="pm-spark" r="0.9" style="display:none"/>').join("")}</g>`,
    `<g data-layer="bins"></g>`,
    backFrames(),
    feeders(),
    belt(),
    `<g data-part="shuttle">${shuttle()}</g>`,
    rack(),
    `<g data-layer="feed"></g>`,
    hoppers(),
    `<g data-layer="line">${tiles}</g>`,
    `<g data-part="probe">${screenProbe()}</g>`,
    screenArm(),
    `<g data-part="plunger" transform="${k.translateAlong(P, [0, 0, BELT_Z + PLUNGER_UP])}">${plunger()}</g>`,
    pressHead(),
    hologram(),
    `<path data-part="needle" class="iso-line" data-tone="lit" data-free="start" d="${needleAt(0)}" style="stroke-width:1"/>`,
    `<g data-part="push0">${pusher(SCREEN_X)}</g>`,
    `<g data-part="push1">${pusher(PRESS_X)}</g>`,
    pusherBase(SCREEN_X),
    pusherBase(PRESS_X),
    tank(),
    bench(),
    brain(),
    hose(),
    `<g data-layer="bench"></g>`,
    benchFront(),
    hits(),
  ],
});

const live = `
const P = ${JSON.stringify(P)};
const BELT_Z = ${BELT_Z}, TILE_H = ${TILE_H}, PLUNGER_UP = ${PLUNGER_UP}, HOP_Z0 = ${HOP_Z0};
const HOPPERS = ${JSON.stringify(HOPPERS)};
const SCREEN_X = ${SCREEN_X}, PRESS_X = ${PRESS_X}, BENCH_X = ${BENCH_X}, BELT_END = ${BELT.x1 - 4};
const CHUTE_X = ${CHUTE_X}, SHUTTLE_X = ${SHUTTLE_X}, RACK_X = ${RACK_X}, CELLS = ${JSON.stringify(CELLS)};
const BINS = ${JSON.stringify(BINS)};
const DIAL = ${JSON.stringify(DIAL)}, DIAL_R = ${DIAL_R}, DIAL_Z = ${DIAL_Z};
const needleAt = ${needleAt.toString().replace("k.lineOnTop", "lineOnTop")};
const stage = document.querySelector(".iso-stage");
const svg = stage.querySelector("svg");
const layer = (n) => svg.querySelector('[data-layer="' + n + '"]');
const trayLayers = CELLS.map((_, i) => layer("tray" + i));
const lineLayer = layer("line"), binLayer = layer("bins"), benchLayer = layer("bench"), feedLayer = layer("feed");
const tileEls = [...svg.querySelectorAll("[data-tile]")];
const part = (n) => svg.querySelector('[data-part="' + n + '"]');
const holoEl = part("holo"), lampEls = [part("lamp0"), part("lamp1")];
const pinEls = [...svg.querySelectorAll("[data-pin]")].sort((a, b) => a.dataset.pin - b.dataset.pin);
const ledEls = [...svg.querySelectorAll("[data-led]")].sort((a, b) => a.dataset.led - b.dataset.led);
const glyphEls = [...svg.querySelectorAll("[data-glyph]")];
const HOLO = ${JSON.stringify(HOLO)};
const PIECES = "♚♛♜♝♞♟♔♕♖♗♘";
let holoAt = 0, holoNext = 0, lampAt = [0, 0];
function shuffleHolo() {
  const sq = HOLO.size / 8, h = HOLO.size / 2;
  glyphEls.forEach((el) => {
    const i = Math.floor(Math.random() * 8), j = Math.floor(Math.random() * 8);
    const [x, y] = iso([HOLO.c[0] - h + (i + 0.5) * sq, HOLO.c[1] - h + (j + 0.5) * sq, HOLO.z], P);
    el.setAttribute("x", x.toFixed(1)); el.setAttribute("y", (y + 1.2).toFixed(1));
    el.textContent = PIECES[Math.floor(Math.random() * PIECES.length)];
  });
}
const probe = part("probe"), plungerEl = part("plunger"), needle = part("needle"), shuttleEl = part("shuttle");
const pushEls = [part("push0"), part("push1")], ledEl = part("leds"), brainEl = part("brain-on");
const readout = document.querySelector("[data-readout]");
const still = matchMedia("(prefers-reduced-motion: reduce)");

const SPEED = 46, GAP = 15, PINS_N = ${PINS};
const free = [...tileEls];
const tiles = [];
const binPiles = BINS.map(() => []);
const stacks = CELLS.map(() => []);
const station = { screen: null, press: null, shuttle: null };
const counts = {};
const counterEls = {};
svg.querySelectorAll("[data-count]").forEach((el) => (counterEls[el.dataset.count] = el));
const bump = (id) => { counts[id] = (counts[id] || 0) + 1; const el = counterEls[id]; if (el) el.textContent = String(counts[id] % 1000).padStart(3, "0"); };
let cellNext = 0, leds = 0, brainOn = 0, needleShare = 0, shuttleY = 0, clock = 0;

const place = (t) => t.el.setAttribute("transform", translateAlong(P, [t.x, t.y, t.z]));
const say = (text) => { if (readout.textContent !== text) readout.textContent = text; };
const ease = (s) => s * s * (3 - 2 * s);

function grab() {
  if (!free.length) {
    const pile = [...binPiles, ...stacks].filter((p) => p.length).sort((a, b) => a[0].born - b[0].born)[0];
    if (pile) release(pile.shift());
  }
  return free.shift();
}
function release(t) { t.el.style.display = "none"; lineLayer.appendChild(t.el); free.push(t.el); }

// Each press puts a tile out at once; its fate is drawn when it is made.
const errEls = [0, 1, 2, 3].map((i) => part("err" + i));
const curEls = {};
svg.querySelectorAll("[data-part^='cur-']").forEach((el) => (curEls[el.dataset.part.slice(4)] = el));
const curAt = {};
const levelEl = part("level");
const GLASS = ${JSON.stringify(GLASS)};
const SH_H = ${SH_H};
const FACE = ${JSON.stringify(BINS.map((b) => b.y + b.d))};
const shredLayer = BINS.map((_, i) => layer("shred" + i));
const sparkEls = [...svg.querySelectorAll(".pm-spark")];
const sparks = [];
function burst(bin) {
  const b = BINS[bin], cx = b.x + b.w / 2, cy = b.y + 9.5;
  for (let i = 0; i < 14; i++) {
    const el = sparkEls.find((e) => !e.busy);
    if (!el) break;
    el.busy = true; el.style.display = "";
    const life = 0.55 + Math.random() * 0.5;
    sparks.push({ el, p: [cx + (Math.random() - 0.5) * 12, cy + (Math.random() - 0.5) * 7, SH_H + 1.4], v: [(Math.random() - 0.5) * 30, (Math.random() - 0.5) * 30, 45 + Math.random() * 55], life, max: life });
  }
}
const teethEls = [part("teeth0"), part("teeth1")], shredAt = [0, 0], teethX = [0, 0];
const panelEls = [0, 1, 2].map((i) => part("panelOn" + i)), symEls = [0, 1, 2].map((i) => part("sym" + i)), panelAt = [0, 0, 0];
const errAt = [0, 0, 0, 0];
const buttonsEl = [...document.querySelectorAll("button[data-feed]")];
let tokens = 1;
const LOW = 0.18;
function isFull(source) {
  if (source === 3) return tokens < LOW || tiles.some((o) => o.hand && (o.phase === "compose" || o.phase === "chute"));
  // A feeder holds two tiles on its belt and one waiting in the spout.
  return tiles.filter((o) => o.source === source && (o.phase === "drop" || o.onFeed)).length >= 3;
}
function refuse(source) {
  errAt[source] = 1;
  say(source === 3 ? (tokens < LOW ? "Out of tokens · the tank is refilling" : "The LLM is still composing the last one") : HOPPERS[source].label + " feeder is full · wait for a gap");
  const b = buttonsEl[source];
  if (b) { b.classList.remove("pm-error"); void b.offsetWidth; b.classList.add("pm-error"); clearTimeout(b.errTimer); b.errTimer = setTimeout(() => b.classList.remove("pm-error"), 450); }
  run();
}
function feed(source) {
  if (isFull(source)) return refuse(source);
  const el = grab();
  if (!el) return;
  const hand = source === 3;
  const h = HOPPERS[source];
  const t = { el, source, hand, born: clock, onBelt: false, screened: hand, proved: false, t: 0 };
  if (hand) {
    Object.assign(t, { phase: "compose", x: CHUTE_X, y: 34, z: BELT_Z, sound: true });
    benchLayer.appendChild(el);
    say("LLM composes: an idea, a key, every defence");
  } else {
    const n = 2 + Math.floor(Math.random() * 2);
    Object.assign(t, { phase: "drop", x: h.x, y: DROP_Y, z: MOUTH, n, found: Math.random() < (source === 0 ? 0.45 : 0.32), sound: Math.random() < 0.8 });
    feedLayer.appendChild(el);
    leds = 1;
    panelAt[source] = 1;
    say(h.label + " drops onto the belt");
  }
  t.defences = 2 + Math.floor(Math.random() * 9);
  t.failAt = Math.floor(Math.random() * t.defences);
  t.twoKeys = Math.random() < 0.4;
  bump("h" + source);
  el.dataset.src = source;
  el.style.display = "";
  place(t);
  tiles.push(t);
  run();
}

const MOUTH = BELT_Z + 9.4, DROP_Y = ${DROP_Y}, FEED_STOP = ${FEED.y1 - 4};
const feedRoom = (t, y) => !tiles.some((o) => o !== t && o.onFeed && o.source === t.source && Math.abs(o.y - y) < GAP);
// Room on the belt at x: no tile on the belt within GAP.
const roomAt = (x, self) => !tiles.some((o) => o !== self && o.onBelt && Math.abs(o.x - x) < GAP);
function aheadLimit(t) {
  let limit = BELT_END;
  for (const o of tiles) if (o !== t && o.onBelt && o.x > t.x) limit = Math.min(limit, o.x - GAP);
  if (!t.screened && t.x <= SCREEN_X) limit = Math.min(limit, SCREEN_X);
  if (!t.proved && t.x <= PRESS_X) limit = Math.min(limit, PRESS_X);
  return limit;
}
function toBin(t, bin) {
  t.phase = "push"; t.t = 0; t.bin = bin;
}

function step(dt) {
  clock += dt;
  let lit = 0, pin = -1, dip = 0, lamp = -1, testing = false;
  let probeAt = 0, plungeAt = 0, wantNeedle = 0, pushAt = [0, 0], thinking = false, wantShuttle = 0;
  for (const t of [...tiles]) {
    t.t += dt;
    switch (t.phase) {
      case "compose":
        thinking = true;
        if (t.t > 1.4) { t.phase = "chute"; t.t = 0; t.from = [t.x, t.y, t.z]; say("Hand-composed: straight to the proof"); }
        break;
      case "chute": {
        const s = Math.min(1, t.t / 0.7);
        t.y = t.from[1] + (14 - t.from[1]) * ease(s);
        if (s >= 1 && roomAt(CHUTE_X, t)) { t.onBelt = true; t.phase = "slide"; t.t = 0; lineLayer.appendChild(t.el); }
        break;
      }
      case "slide": {
        const s = Math.min(1, t.t / 0.3);
        t.y = 14 * (1 - ease(s));
        if (s >= 1) { t.y = 0; t.phase = "belt"; }
        break;
      }
      case "drop": {
        const s = Math.min(1, t.t / 0.45);
        const first = !tiles.some((o) => o !== t && o.source === t.source && o.phase === "drop" && o.born < t.born);
        const bottom = first && feedRoom(t, DROP_Y) ? BELT_Z : BELT_Z + 8;
        t.z = MOUTH - (MOUTH - bottom) * s * s;
        if (s >= 1 && bottom === BELT_Z) { t.z = BELT_Z; t.phase = "feed"; t.onFeed = true; }
        break;
      }
      case "feed": {
        // Ride the feeder up to the main belt and wait there for a gap.
        let limit = FEED_STOP;
        for (const o of tiles) if (o !== t && o.onFeed && o.source === t.source && o.y > t.y) limit = Math.min(limit, o.y - GAP);
        t.y = Math.min(limit, t.y + SPEED * dt);
        if (t.y >= FEED_STOP && roomAt(t.x, t)) { t.phase = "merge"; t.t = 0; t.onBelt = true; }
        break;
      }
      case "merge": {
        const s = Math.min(1, t.t / 0.35);
        t.y = FEED_STOP * (1 - ease(s));
        if (s > 0.5) { t.onFeed = false; if (t.el.parentNode !== lineLayer) lineLayer.appendChild(t.el); }
        if (s >= 1) { t.y = 0; t.phase = "belt"; }
        break;
      }
      case "belt": {
        const limit = aheadLimit(t);
        t.x = Math.min(limit, t.x + SPEED * dt);
        if (!t.screened && t.x >= SCREEN_X && !station.screen) { station.screen = t; t.phase = "screen"; t.t = 0; }
        else if (t.screened && !t.proved && t.x >= PRESS_X && !station.press) { station.press = t; t.phase = "press"; t.t = 0; }
        else if (t.proved && t.x >= BELT_END && !station.shuttle) {
          station.shuttle = t; t.phase = "transfer"; t.t = 0; t.onBelt = false; t.cell = cellNext; cellNext = (cellNext + 1) % CELLS.length;
        }
        break;
      }
      case "screen":
        probeAt = Math.sin(Math.PI * Math.min(1, t.t / 1.1));
        if (t.t > 1.1) {
          station.screen = null;
          if (t.found) { t.screened = true; t.phase = "belt"; say("Mate search: a forced mate in " + t.n + " · on to the proof"); }
          else { say("Mate search: no short mate · swept away"); toBin(t, 0); }
        }
        break;
      case "press": {
        // Lower the head, dip one pin per defence, then the verdict.
        const D = t.defences, stop = t.sound ? D : t.failAt;
        const down = 0.45, per = 0.24, verdict = down + (t.sound ? D : stop + 1) * per, end = verdict + 0.75;
        const tt = t.t;
        plungeAt = tt < down ? ease(tt / down) : tt < verdict + 0.35 ? 1 : 1 - ease(Math.min(1, (tt - verdict - 0.35) / 0.4));
        const n = tt < down ? -1 : Math.floor((tt - down) / per);
        lit = Math.max(0, Math.min(stop, n));
        if (tt >= down && tt < verdict) { pin = n % PINS_N; dip = Math.sin(Math.PI * (((tt - down) / per) % 1)); }
        testing = tt < verdict + 0.2;
        wantNeedle = lit / 10;
        if (n >= 0 && n < stop && t.said !== n) { t.said = n; say("Inspection: defence " + (n + 1) + " of " + D + " mated"); }
        if (tt >= verdict) {
          lamp = t.sound ? 0 : 1;
          if (t.said !== "v") { t.said = "v"; say(t.sound ? "Inspection passed: one key, " + D + " defences mated · kept" : (t.twoKeys ? "Inspection failed: a second key also mates" : "Inspection failed: defence " + (stop + 1) + " escapes") + " · swept away"); }
        }
        if (tt > end) {
          station.press = null;
          if (t.sound) { t.proved = true; t.phase = "belt"; }
          else toBin(t, 1);
        }
        break;
      }
      case "push": {
        const s = Math.min(1, t.t / 0.45);
        pushAt[t.bin] = Math.max(pushAt[t.bin], Math.sin(Math.PI * s));
        t.y = -9 * ease(s);
        if (s >= 1) { t.onBelt = false; t.phase = "infeed"; t.t = 0; shredLayer[t.bin].appendChild(t.el); }
        if (s > 0.6) t.onBelt = false;
        break;
      }
      case "infeed": {
        // Level along the table and through the slit; the housing hides it.
        const inside = FACE[t.bin] - 7;
        t.y = Math.max(inside, t.y - SPEED * 0.75 * dt);
        if (t.y <= FACE[t.bin] + 6) shredAt[t.bin] = 1;
        if (t.y <= inside) { t.phase = "rest"; release(t); bump("bin" + t.bin); burst(t.bin); }
        break;
      }
      case "transfer": {
        const s = Math.min(1, t.t / 0.45);
        t.x = BELT_END + (SHUTTLE_X - BELT_END) * ease(s); t.z = BELT_Z + (8.2 - BELT_Z) * s;
        if (s >= 1) { t.phase = "shuttle"; t.t = 0; say("Pick: cell " + (t.cell + 1) + " of 4, spread across kinds"); }
        break;
      }
      case "shuttle": {
        const s = Math.min(1, t.t / 0.8);
        t.y = CELLS[t.cell] * ease(s); wantShuttle = t.y;
        if (s >= 1) { t.phase = "tray"; t.t = 0; }
        break;
      }
      case "tray": {
        const s = Math.min(1, t.t / 0.45);
        wantShuttle = CELLS[t.cell];
        const top = 4.4 + stacks[t.cell].length * TILE_H;
        t.x = SHUTTLE_X + (RACK_X - SHUTTLE_X) * ease(s); t.z = 8.2 + (top - 8.2) * s * s;
        if (s > 0.5 && t.el.parentNode !== trayLayers[t.cell]) trayLayers[t.cell].appendChild(t.el);
        if (s >= 1) { station.shuttle = null; t.phase = "rest"; pile(stacks[t.cell], t, 4, true); bump("kept"); say("Banked · the pack on dxc4 holds 1,010"); }
        break;
      }
    }
    if (t.phase !== "rest") place(t);
  }
  for (let i = tiles.length - 1; i >= 0; i--) if (tiles[i].phase === "rest") tiles.splice(i, 1);
  // current on the lines, and the token tank
  const drawing = { screen: probeAt > 0 ? 1 : 0, inspect: testing ? 1 : 0, tokens: thinking ? 1 : 0 };
  tiles.forEach((o) => { if (o.phase === "drop") drawing["h" + o.source] = 1; });
  for (const id in curEls) {
    curAt[id] = Math.max(drawing[id] || 0, (curAt[id] || 0) - dt * 2.5);
    curEls[id].style.opacity = curAt[id].toFixed(2);
  }
  if (drawing.screen || drawing.inspect) leds = Math.max(leds, 0.8);
  tokens = thinking ? Math.max(0, tokens - dt * 0.16) : Math.min(1, tokens + dt * 0.02);
  const lv = [GLASS.b[0] + (GLASS.t[0] - GLASS.b[0]) * tokens, GLASS.b[1] + (GLASS.t[1] - GLASS.b[1]) * tokens];
  levelEl.setAttribute("d", "M" + GLASS.b[0].toFixed(1) + " " + GLASS.b[1].toFixed(1) + "L" + lv[0].toFixed(1) + " " + lv[1].toFixed(1));
  levelEl.classList.toggle("pm-low", tokens < LOW);
  leds = Math.max(0, leds - dt * 1.2);
  ledEl.style.opacity = (leds * (0.6 + 0.4 * Math.sin(clock * 40))).toFixed(2);
  brainOn += ((thinking ? 1 : 0) - brainOn) * Math.min(1, dt * 6);
  brainEl.style.opacity = (brainOn * (0.75 + 0.25 * Math.sin(clock * 9))).toFixed(2);
  needleShare += (wantNeedle - needleShare) * Math.min(1, dt * 5);
  shuttleY += (wantShuttle - shuttleY) * Math.min(1, dt * 7);
  probe.setAttribute("transform", translateAlong(P, [0, 0, -4 * probeAt]));
  plungerEl.setAttribute("transform", translateAlong(P, [0, 0, BELT_Z + TILE_H + PLUNGER_UP * (1 - plungeAt)]));
  needle.setAttribute("d", needleAt(needleShare));
  buttonsEl.forEach((b, i) => b.classList.toggle("pm-full", isFull(i)));
  panelAt.forEach((v, i) => { panelAt[i] = Math.max(0, v - dt * 1.5); panelEls[i].style.opacity = (0.9 * panelAt[i]).toFixed(2); });
  symEls.forEach((el, i) => el.classList.toggle("pm-mark-on", panelAt[i] > 0.45 || errAt[i] > 0));
  for (let i = sparks.length - 1; i >= 0; i--) {
    const sp = sparks[i];
    sp.life -= dt; sp.v[2] -= 150 * dt;
    for (let a = 0; a < 3; a++) sp.p[a] += sp.v[a] * dt;
    if (sp.life <= 0) { sp.el.busy = false; sp.el.style.display = "none"; sparks.splice(i, 1); continue; }
    const [x, y] = iso(sp.p, P);
    sp.el.setAttribute("cx", x.toFixed(1)); sp.el.setAttribute("cy", y.toFixed(1));
    sp.el.style.opacity = (sp.life / sp.max).toFixed(2);
  }
  shredAt.forEach((v, i) => { if (v > 0) { teethX[i] = (teethX[i] + dt * 9) % 2.4; teethEls[i].setAttribute("transform", translateAlong(P, [teethX[i], 0, 0])); } shredAt[i] = Math.max(0, v - dt * 4); });
  errAt.forEach((v, i) => { errAt[i] = Math.max(0, v - dt * 0.8); errEls[i].style.opacity = errAt[i] > 0 ? (errAt[i] * (Math.sin(clock * 22) > 0 ? 1 : 0.25)).toFixed(2) : "0"; });
  pinEls.forEach((el, i) => el.setAttribute("transform", i === pin ? translateAlong(P, [0, 0, -1.6 * dip]) : ""));
  ledEls.forEach((el, i) => { el.style.opacity = i < lit ? "1" : i === pin ? (0.35 * dip).toFixed(2) : "0"; });
  lampAt = lampAt.map((v, i) => v + ((lamp === i ? 1 : 0) - v) * Math.min(1, dt * (lamp === i ? 14 : 4)));
  lampEls.forEach((el, i) => (el.style.opacity = lampAt[i].toFixed(2)));
  holoAt += ((testing ? 1 : 0) - holoAt) * Math.min(1, dt * 6);
  holoEl.style.opacity = (holoAt * (0.82 + 0.18 * Math.sin(clock * 31))).toFixed(2);
  if (testing && clock > holoNext) { holoNext = clock + 0.085; shuffleHolo(); }
  pushEls.forEach((el, i) => el.setAttribute("transform", translateAlong(P, [0, -14 * pushAt[i], 0])));
  shuttleEl.setAttribute("transform", translateAlong(P, [0, shuttleY, 0]));
  return tiles.length > 0 || tokens < 1 || Object.values(curAt).some((v) => v > 0) || sparks.length > 0 || errAt.some((v) => v > 0) || panelAt.some((v) => v > 0) || shredAt.some((v) => v > 0) || holoAt > 0.01 || lampAt.some((v) => v > 0.01) || leds > 0 || brainOn > 0.01 || Math.abs(needleShare) > 0.002 || Math.abs(shuttleY) > 0.05;
}
function pile(list, t, max, tray) {
  list.push(t);
  if (list.length > max) (tray ? list.splice(0, list.length) : [list.shift()]).forEach(release);
}

let frame = 0, last = 0;
function tick(now) {
  const dt = last ? Math.min((now - last) / 1000, 1 / 20) : 1 / 60;
  last = now;
  const busy = step(still.matches ? 0.25 : dt);
  frame = busy ? requestAnimationFrame(tick) : 0;
}
function run() { if (!frame) { last = 0; frame = requestAnimationFrame(tick); } }
document.querySelectorAll("[data-feed]").forEach((el) => el.addEventListener("click", () => feed(+el.dataset.feed)));
stage.addEventListener("keydown", (e) => { const n = "1234".indexOf(e.key); if (n >= 0) { e.preventDefault(); feed(n); } });
`;

const BUTTONS = [
  ["Sparse setup", "A few pieces round an exposed king"],
  ["Random middlegame", "Pieces and pawns near both kings"],
  ["Stockfish self-play", "A moment from an engine game"],
  ["LLM composes", "An idea worked out by hand"],
];
const CSS = `.pm-led{fill:var(--anatomy-lit)}
.pm-current{fill:none;stroke:var(--anatomy-lit);stroke-width:.9;stroke-linecap:round;stroke-dasharray:1.4 4.2;animation:iso-flow .6s linear infinite}
.pm-tokens{fill:none;stroke:var(--anatomy-lit);stroke-width:1.6;stroke-dasharray:1.6 3.2;animation:iso-flow .9s linear infinite}
.pm-glass{fill:none;stroke:var(--anatomy-shade-0);stroke-width:2.6;stroke-linecap:round}
.pm-level{fill:none;stroke:var(--anatomy-lit);stroke-width:1.4;stroke-linecap:round}
.pm-level.pm-low{stroke:#f85149}
@media (prefers-reduced-motion:reduce){.pm-current,.pm-tokens{animation:none}}
.pm-lamp-go{fill:#3fb950}.pm-lamp-stop{fill:#f85149}
.pm-holo{pointer-events:none}
.pm-holo .pm-beam{fill:none;stroke:var(--anatomy-lit);stroke-width:.4;opacity:.28}
.pm-holo .pm-sq{fill:var(--anatomy-lit);opacity:.1}
.pm-holo .pm-grid{fill:none;stroke:var(--anatomy-lit);stroke-width:.3;opacity:.35}
.pm-holo .pm-frame{fill:var(--anatomy-lit);fill-opacity:.04;stroke:var(--anatomy-lit);stroke-width:.6;opacity:.8}
.pm-glyph{fill:var(--anatomy-lit);font:9.5px/1 "Segoe UI Symbol","Apple Symbols",serif;opacity:.9}
.pm-hit{fill:transparent;cursor:pointer}.pm-hit:hover{fill:var(--anatomy-lit);fill-opacity:.07}
.pm-feed{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px;margin:14px 0 4px}
.pm-feed button{all:unset;box-sizing:border-box;display:flex;flex-direction:column;justify-content:flex-start;cursor:pointer;padding:14px 12px 12px;border:1px solid var(--anatomy-lo);border-radius:10px;color:var(--anatomy-strong);font:500 14px/1.25 ui-sans-serif,system-ui,sans-serif;text-align:left;transition:border-color .15s,background .15s}
.pm-feed button span{display:block;margin-top:6px;color:var(--anatomy-muted);font:12.5px/1.35 ui-sans-serif,system-ui,sans-serif}
.pm-feed button:hover{border-color:var(--anatomy-hi)}
.pm-feed button:active{background:var(--anatomy-face)}
.pm-feed button:focus-visible{outline:2px solid var(--anatomy-hi);outline-offset:2px}
.pm-feed button.pm-claude{border-color:var(--anatomy-mid)}
.pm-sym{display:none;fill:var(--anatomy-lit);stroke:var(--anatomy-paper);stroke-width:.3}
${[0, 1, 2, 3].map((i) => `[data-src="${i}"] .pm-sym[data-s="${i}"]`).join(",")}{display:inline}
.pm-mark{fill:none;stroke:var(--anatomy-hi);stroke-width:1;stroke-linejoin:round}
.pm-mark.pm-mark-on{stroke:var(--anatomy-paper)}
.pm-panel{fill:var(--anatomy-face);stroke:var(--anatomy-lo);stroke-width:.6}
.pm-panel-on{fill:var(--anatomy-lit)}
.pm-panel-err{fill:#f85149}
.pm-slot{fill:#000;fill-opacity:.6;stroke:var(--anatomy-lo);stroke-width:.6}
.pm-spark{fill:#ffa94d}
.pm-teeth{fill:none;stroke:var(--anatomy-mid);stroke-width:.55;stroke-linejoin:round}
.pm-icon{display:block;width:16px;height:16px;margin-bottom:8px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round}
.pm-feed button.pm-full{border-color:rgba(248,81,73,.55)}
.pm-feed button.pm-error{border-color:#f85149;animation:pm-shake .4s}
@keyframes pm-shake{20%{transform:translateX(-4px)}40%{transform:translateX(4px)}60%{transform:translateX(-3px)}80%{transform:translateX(2px)}}
@media (prefers-reduced-motion:reduce){.pm-feed button.pm-error{animation:none}}
@media (max-width:560px){.pm-feed{grid-template-columns:repeat(2,minmax(0,1fr))}}`;
const buttons = `<div class="pm-feed" role="group" aria-label="Feed the line">${BUTTONS.map(([name, rate], i) => `<button type="button" data-feed="${i}"${i === 3 ? ' class="pm-claude"' : ""}><svg class="pm-icon" viewBox="0 0 16 16" aria-hidden="true"><path d="${SYMBOL_SVG[i]}"/></svg>${name}<span>${rate}</span></button>`).join("")}</div>`;

const body = k.plateHtml({
  fig: "Fig 1",
  title: "The puzzle machine",
  hint: "Press a button to feed the line",
  readout: "Waiting for a position",
  keys: [
    { mark: "lit", label: "Inspection head: the exact solver, one probe pin per defence, the only part allowed to say yes" },
    { mark: "raised", label: "Compute block: eight workers driving the three hoppers; middlegames yield 1.7 candidates a worker-minute, the other two 0.25" },
    { mark: "edge", label: "The brain on the bench: the LLM's own compositions, sent straight to the inspection head" },
    { mark: "flat", label: "Four trays: the pick spreads puzzles across cells" },
  ],
  body: `<style>${CSS}</style><div class="iso-stage" tabindex="0" role="group" aria-label="The puzzle machine. Keys 1 to 3 drop a position from a hopper; 4 lets the LLM compose one.">${svg}</div>${buttons}`,
});

// Built for embedding on this blog: the page follows the blog's theme (the
// saved choice, else the system's) and, inside the blog's iframe, its toggle;
// it reports its height so the iframe fits.
const THEME = `<script>(function () {
  var b = document.body;
  function pick() {
    try {
      if (window.parent !== window && window.parent.document) return window.parent.document.documentElement.classList.contains("dark") ? "dark" : "light";
    } catch (e) {}
    var saved = null;
    try { saved = localStorage.getItem("theme"); } catch (e) {}
    return saved === "dark" || (!saved && matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
  }
  function apply() { var t = pick(); b.dataset.theme = t; document.documentElement.style.colorScheme = t; }
  apply();
  try {
    new MutationObserver(apply).observe(window.parent.document.documentElement, { attributes: true, attributeFilter: ["class"] });
  } catch (e) {}
})();</script>`;
const REPORT_HEIGHT = `
const report = () => parent.postMessage({ type: "puzzle-machine-height", height: Math.ceil(document.documentElement.getBoundingClientRect().height) }, "*");
new ResizeObserver(report).observe(document.body);
report();
`;
const OUT = join(HERE, "../../public/figures/puzzle-machine/index.html");
let html = k.pageHtml({ title: "The puzzle machine", theme: "light", body, script: kitScript() + live + REPORT_HEIGHT });
html = html
  .replace('<main class="iso-page">', THEME + '<main class="iso-page">')
  .replace(/\.iso-page\{width:min\(650px,100% - 32px\);margin:64px auto 96px\}/, ".iso-page{width:100%;max-width:650px;margin:0 auto}")
  .replace("body{margin:0;background:var(--anatomy-page);", "body{margin:0;background:transparent;");
if (!html.includes("max-width:650px") || !html.includes("background:transparent")) throw new Error("embed CSS replacements did not apply");
writeFileSync(OUT, html);
console.log("wrote", OUT);
