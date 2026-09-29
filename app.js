// parkrun 32 - app logic. Data is saved in this browser only (localStorage).

const STORE_KEY = "parkrun32";
const COLOURS = { done: "#2e9e5b", planned: "#f5a623", todo: "#9aa0a6" };

PARKRUNS.forEach(p => { p.id = p.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"); });
const ALL_COUNTIES = [...COUNTIES.Republic, ...COUNTIES.North];

let state = load();

function load() {
  try {
    const s = JSON.parse(localStorage.getItem(STORE_KEY));
    if (s && s.done && s.planned) return s;
  } catch (e) {}
  return { done: {}, planned: {} };
}
function save() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

// ---------- helpers ----------
function el(tag, props = {}, ...kids) {
  const n = document.createElement(tag);
  for (const [k, v] of Object.entries(props)) {
    if (k === "class") n.className = v;
    else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
    else n.setAttribute(k, v);
  }
  kids.flat().forEach(c => n.append(c));
  return n;
}
const $ = id => document.getElementById(id);

function status(p) {
  if (state.done[p.id]) return "done";
  if (state.planned[p.id]) return "planned";
  return "todo";
}
function countyDone(c) { return PARKRUNS.some(p => p.county === c && state.done[p.id]); }
function inCounty(c) { return PARKRUNS.filter(p => p.county === c); }

function km(a, b) {
  const R = 6371, r = x => x * Math.PI / 180;
  const dLat = r(b.lat - a.lat), dLng = r(b.lng - a.lng);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(r(a.lat)) * Math.cos(r(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
// Rough estimate: straight-line x 1.3 for road winding, then an average speed by distance.
function drive(p) {
  const d = km(GALWAY, p) * 1.3;
  const speed = d < 40 ? 45 : d < 120 ? 65 : 78;
  const mins = Math.round(d / speed * 60 / 5) * 5;
  return { km: Math.round(d / 5) * 5, mins };
}
function fmtDrive(p) {
  const d = drive(p), h = Math.floor(d.mins / 60), m = d.mins % 60;
  return `≈ ${h ? h + " h " : ""}${m} min · ${d.km} km`;
}
function directionsUrl(p) {
  return `https://www.google.com/maps/dir/?api=1&origin=Galway,Ireland&destination=${p.lat},${p.lng}`;
}
function hotelUrl(p, dateStr) {
  const q = new URLSearchParams({ ss: `${p.name}, ${p.county}, Ireland`, group_adults: "2", no_rooms: "1", nflt: "hotelfacility=4" });
  if (dateStr) {
    const d = new Date(dateStr + "T12:00:00");
    const before = new Date(d); before.setDate(d.getDate() - 1);
    const iso = x => x.toISOString().slice(0, 10);
    q.set("checkin", iso(before)); q.set("checkout", iso(d));
  }
  return "https://www.booking.com/searchresults.html?" + q.toString();
}
function fmtDate(s) {
  return new Date(s + "T12:00:00").toLocaleDateString("en-IE", { weekday: "short", day: "numeric", month: "short", year: "numeric" });
}

// ---------- actions ----------
function setDone(p, yes) {
  if (yes) { state.done[p.id] = true; delete state.planned[p.id]; }
  else delete state.done[p.id];
  save(); refresh();
}
function unplan(p) { delete state.planned[p.id]; save(); refresh(); }

const dialog = $("plan-dialog");
let planning = null;
function askPlan(p) {
  planning = p;
  $("plan-title").textContent = `Plan ${p.name} (${p.county})`;
  $("plan-date").value = state.planned[p.id] || "";
  if (dialog.showModal) dialog.showModal(); else dialog.setAttribute("open", "");
}
dialog.addEventListener("close", () => {
  if (dialog.returnValue === "ok" && planning && $("plan-date").value) {
    state.planned[planning.id] = $("plan-date").value;
    delete state.done[planning.id];
    save(); refresh();
  }
  planning = null;
});

// ---------- map ----------
let map, markers = {};
function initMap() {
  if (typeof L === "undefined") { $("map").textContent = "Map could not load (offline?). The other tabs still work."; return; }
  map = L.map("map").setView([53.4, -7.9], 7);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 17, attribution: "&copy; OpenStreetMap contributors"
  }).addTo(map);
  PARKRUNS.forEach(p => {
    markers[p.id] = L.circleMarker([p.lat, p.lng], { radius: 9, weight: 2, color: "#fff", fillOpacity: .95 }).addTo(map);
  });
}
function popup(p) {
  const s = status(p);
  const label = { done: "Done ✔", planned: "Planned " + (state.planned[p.id] ? fmtDate(state.planned[p.id]) : ""), todo: "Not done" }[s];
  return el("div", {},
    el("strong", {}, p.name), el("div", {}, p.county + (p.check ? " (location to be checked)" : "")),
    el("div", {}, label),
    el("div", { class: "popup-actions" },
      el("button", { class: "btn small", onclick: () => setDone(p, s !== "done") }, s === "done" ? "Undo done" : "Mark done"),
      s !== "done" ? el("button", { class: "btn small", onclick: () => askPlan(p) }, "Plan") : ""));
}
function renderMap() {
  if (!map) return;
  PARKRUNS.forEach(p => {
    const m = markers[p.id];
    m.setStyle({ fillColor: COLOURS[status(p)] });
    m.bindPopup(() => popup(p));
  });
}

// ---------- counties ----------
function renderBoard() {
  const board = $("board");
  board.replaceChildren();
  ALL_COUNTIES.forEach(c => {
    const done = countyDone(c), ni = COUNTIES.North.includes(c);
    board.append(el("div", { class: "county" + (done ? " done" : "") },
      el("span", { class: "tick" }, done ? "✅" : "⬜"), c,
      el("small", {}, ni ? "Northern Ireland" : "Republic")));
  });
  const n = ALL_COUNTIES.filter(countyDone).length;
  $("summary").textContent = `${n} of 32 counties`;
}

// ---------- to do ----------
function parkrunCard(p, extra) {
  const s = status(p);
  return el("div", { class: "card" },
    el("div", {}, el("strong", {}, p.name), s === "planned" ? el("span", { class: "tag" }, "planned") : ""),
    el("div", { class: "meta" }, `${p.county} · ${fmtDrive(p)} from Galway`),
    extra || "");
}
function renderTodo() {
  const box = $("todo"); box.replaceChildren();
  const remaining = ALL_COUNTIES.filter(c => !countyDone(c))
    .map(c => ({ c, runs: inCounty(c).sort((a, b) => drive(a).km - drive(b).km) }))
    .sort((a, b) => (a.runs[0] ? drive(a.runs[0]).km : 9e9) - (b.runs[0] ? drive(b.runs[0]).km : 9e9));
  if (!remaining.length) { box.append(el("p", {}, "🎉 All 32 counties done!")); return; }
  remaining.forEach(({ c, runs }) => {
    box.append(el("div", { class: "group-title" }, c, " ", el("small", {}, COUNTIES.North.includes(c) ? "(Northern Ireland)" : "")));
    if (!runs.length) box.append(el("div", { class: "card meta" }, "No parkruns in my list for this county. Check parkrun.ie and add it."));
    runs.forEach(p => box.append(parkrunCard(p, el("div", { class: "actions" },
      el("a", { class: "btn small", href: directionsUrl(p), target: "_blank", rel: "noopener" }, "Directions"),
      el("button", { class: "btn small", onclick: () => askPlan(p) }, state.planned[p.id] ? "Change date" : "Plan"),
      el("button", { class: "btn small", onclick: () => setDone(p, true) }, "Mark done")))));
  });
}

// ---------- planned ----------
function renderPlanned() {
  const box = $("planned"); box.replaceChildren();
  const list = PARKRUNS.filter(p => state.planned[p.id]).sort((a, b) => state.planned[a.id].localeCompare(state.planned[b.id]));
  if (!list.length) { box.append(el("p", { class: "note" }, "Nothing planned yet. Use Plan on the To do tab or the map.")); return; }
  list.forEach(p => {
    const date = state.planned[p.id];
    box.append(el("div", { class: "card" },
      el("div", {}, el("strong", {}, p.name), " · ", p.county),
      el("div", { class: "meta" }, `${fmtDate(date)} · ${fmtDrive(p)} from Galway`),
      el("div", { class: "actions" },
        el("a", { class: "btn small", href: hotelUrl(p, date), target: "_blank", rel: "noopener" }, "🐕 Pet-friendly hotels"),
        el("a", { class: "btn small", href: directionsUrl(p), target: "_blank", rel: "noopener" }, "Directions"),
        el("button", { class: "btn small", onclick: () => askPlan(p) }, "Change date"),
        el("button", { class: "btn small", onclick: () => setDone(p, true) }, "Mark done"),
        el("button", { class: "btn small", onclick: () => unplan(p) }, "Remove"))));
  });
}

// ---------- add: paste ----------
function esc(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
const clean = s => s.toLowerCase().replace(/[‘’`´]/g, "'").replace(/\s+/g, " ");
// Longest names are matched first and removed from the text, so "Tramore Valley" doesn't also match "Tramore".
function findMatches(text) {
  let norm = " " + clean(text) + " ";
  const names = PARKRUNS.flatMap(p => [p.name, ...(p.alias || [])].map(n => ({ p, n: clean(n) })))
    .sort((a, b) => b.n.length - a.n.length);
  const found = new Set();
  names.forEach(({ p, n }) => {
    const re = new RegExp("(^|[^a-z])" + esc(n) + "(?![a-z])", "g");
    if (re.test(norm)) { found.add(p); norm = norm.replace(re, "$1 "); }
  });
  return PARKRUNS.filter(p => found.has(p));
}
function renderMatches(found) {
  const box = $("matches"); box.replaceChildren();
  if (!found.length) { box.append(el("p", { class: "note" }, "No Irish parkruns recognised in that text. Try the manual list below.")); return; }
  const fresh = found.filter(p => !state.done[p.id]);
  box.append(el("p", {}, `Found ${found.length}. ${found.length - fresh.length} already recorded.`));
  const boxes = fresh.map(p => {
    const cb = el("input", { type: "checkbox", checked: "" });
    box.append(el("label", { class: "check-row" }, cb, `${p.name} (${p.county})`));
    return { p, cb };
  });
  if (fresh.length) box.append(el("button", { class: "btn primary", onclick: () => {
    boxes.filter(b => b.cb.checked).forEach(b => { state.done[b.p.id] = true; delete state.planned[b.p.id]; });
    save(); refresh(); box.replaceChildren(el("p", {}, "Added ✔"));
  } }, "Add ticked"));
}
$("find").addEventListener("click", () => renderMatches(findMatches($("paste").value)));

function renderManual() {
  const box = $("manual"); box.replaceChildren();
  ALL_COUNTIES.forEach(c => {
    const runs = inCounty(c);
    if (!runs.length) return;
    box.append(el("div", { class: "manual-county" }, c));
    runs.forEach(p => {
      const cb = el("input", { type: "checkbox", onchange: () => setDone(p, cb.checked) });
      cb.checked = !!state.done[p.id];
      box.append(el("label", { class: "check-row" }, cb, p.name + (p.check ? " (to be checked)" : "")));
    });
  });
}

// ---------- backup ----------
function renderBackup() { $("backup").value = JSON.stringify(state); }
$("restore").addEventListener("click", () => {
  try {
    const s = JSON.parse($("backup").value);
    if (!s || typeof s.done !== "object" || typeof s.planned !== "object") throw 0;
    state = s; save(); refresh();
  } catch (e) { alert("That backup text doesn't look right."); }
});

// ---------- tabs ----------
document.querySelectorAll("nav button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll("nav button, .tab").forEach(x => x.classList.remove("active"));
  b.classList.add("active");
  $("tab-" + b.dataset.tab).classList.add("active");
  if (b.dataset.tab === "map" && map) map.invalidateSize();
}));

function refresh() {
  renderMap(); renderBoard(); renderTodo(); renderPlanned(); renderManual(); renderBackup();
}

initMap();
refresh();
