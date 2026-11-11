/* מדריך אתונה — לוגיקה */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const store = {
  get(k, d) { try { const v = localStorage.getItem("ath_" + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem("ath_" + k, JSON.stringify(v)); } catch (e) { } }
};
const fmt = n => Number(n).toLocaleString("en-US");
const pad = n => String(n).padStart(2, "0");
const dmy = d => pad(d.getDate()) + "/" + pad(d.getMonth() + 1) + "/" + d.getFullYear();
const gmapsDir = (lat, lng) => "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng + "&travelmode=transit";
const gmapsSearch = q => "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(q);
const gmapsPoint = (lat, lng) => "https://www.google.com/maps/search/?api=1&query=" + lat + "," + lng;
function toast(msg, ms = 2600) { const t = document.createElement("div"); t.className = "toast"; t.textContent = msg; document.body.appendChild(t); setTimeout(() => t.remove(), ms); }

const TABS = [
  { id: "map", t: "מפת העיר", i: "🗺️", c: "#1565c0" },
  { id: "sites", t: "אתרים ואטרקציות", i: "🏛️", c: "#c79100" },
  { id: "hotels", t: "מלונות", i: "🏨", c: "#7b3fb3" },
  { id: "transport", t: "תחבורה ציבורית", i: "🚇", c: "#00838f" },
  { id: "rest", t: "מסעדות", i: "🍽️", c: "#c62828" },
  { id: "food", t: "אוכל יווני", i: "🥙", c: "#e65100" },
  { id: "shop", t: "קניות", i: "🛍️", c: "#d81b60" },
  { id: "markets", t: "שווקים", i: "🧺", c: "#2e7d32" },
  { id: "tips", t: "טיפים", i: "💡", c: "#546e7a" },
  { id: "routes", t: "מסלולים", i: "🧭", c: "#3949ab" },
  { id: "events", t: "אירועים", i: "🎭", c: "#ad1457" },
  { id: "info", t: "מידע ומזג אוויר", i: "☀️", c: "#0288d1" }
];
let cur = store.get("tab", "map");
const FAV = new Set(store.get("fav", []));
const HID = new Set(store.get("hid", []));
let CUSTOM = store.get("custom", []);
const F = store.get("filters", {});
function saveFlags() { store.set("fav", [...FAV]); store.set("hid", [...HID]); }
function fget(tab, k, d) { return (F[tab] && F[tab][k] !== undefined) ? F[tab][k] : d; }
function fset(tab, k, v) { F[tab] = F[tab] || {}; F[tab][k] = v; store.set("filters", F); }

/* ===== תמונות מויקיפדיה ===== */
let IMG = store.get("img", {});
function similar(title, q) {
  const w = String(q).toLowerCase().split(/[^a-z0-9]+/).filter(x => x.length > 3);
  const t = String(title).toLowerCase();
  return w.some(x => t.includes(x));
}
async function getWikiImg(title, q) {
  if (title in IMG) return IMG[title];
  let url = "", ok = true;
  try {
    const r = await fetch("https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURIComponent(title.replace(/ /g, "_")));
    if (r.ok) { const j = await r.json(); if (j.type !== "disambiguation" && j.thumbnail) url = j.thumbnail.source.replace(/\/(\d+)px-/, "/640px-"); }
  } catch (e) { ok = false; }
  if (!url && q && ok) {
    try {
      const u = "https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrlimit=1&gsrsearch=" + encodeURIComponent(q) + "&prop=pageimages&piprop=thumbnail&pithumbsize=640";
      const r = await fetch(u); const j = await r.json();
      const pg = j.query && Object.values(j.query.pages)[0];
      if (pg && pg.thumbnail && similar(pg.title, q)) url = pg.thumbnail.source;
    } catch (e) { ok = false; }
  }
  if (ok) { IMG[title] = url; store.set("img", IMG); }
  return url;
}
function ph(wiki, emoji, q) {
  return `<div class="ph" data-wiki="${esc(wiki || "")}" data-q="${esc(q || wiki || "")}"><span class="emo">${emoji}</span></div>`;
}
function hydrate(root = document) {
  $$(".ph[data-wiki]", root).forEach(async el => {
    const w = el.dataset.wiki; if (!w || el.dataset.done) return; el.dataset.done = 1;
    const url = await getWikiImg(w, el.dataset.q);
    if (url) { const im = new Image(); im.alt = ""; im.loading = "lazy"; im.onload = () => { el.appendChild(im); el.insertAdjacentHTML("beforeend", '<span class="cr">ויקיפדיה</span>'); }; im.src = url; }
  });
}
async function heExtract(q, nameHe) {
  try {
    const u = "https://he.wikipedia.org/w/api.php?action=query&format=json&origin=*&generator=search&gsrlimit=1&gsrsearch=" + encodeURIComponent(q) + "&prop=extracts&exintro=1&explaintext=1&exsentences=4";
    const r = await fetch(u); const j = await r.json();
    const pg = j.query && Object.values(j.query.pages)[0];
    if (!pg || !pg.extract) return null;
    const words = (nameHe + " " + q).split(/\s+/).filter(x => x.length > 2);
    if (!words.some(w => pg.title.includes(w))) return null;
    return { title: pg.title, text: pg.extract };
  } catch (e) { return null; }
}

/* ===== כלי UI ===== */
function hero(t, p) { return `<div class="hero"><h2>${t}</h2><p>${p}</p></div>`; }
function chipRow(tab, key, opts, multi = true) {
  const sel = fget(tab, key, multi ? [] : "");
  return `<div class="chips" data-tab="${tab}" data-key="${key}" data-multi="${multi ? 1 : 0}">` + opts.map(o => {
    const on = multi ? sel.includes(o[0]) : sel === o[0];
    return `<button class="chip${on ? " on" : ""}" data-v="${esc(o[0])}">${o[1]}</button>`;
  }).join("") + "</div>";
}
function toggleChip(tab, key, label) {
  const on = fget(tab, key, false);
  return `<button class="chip tgl${on ? " on" : ""}" data-tab="${tab}" data-key="${key}">${label}</button>`;
}
function searchBox(tab, ph) { return `<input type="search" placeholder="${ph}" value="${esc(fget(tab, "q", ""))}" data-q="${tab}">`; }
function bindFilters(root, rerender) {
  $$("input[data-q]", root).forEach(i => i.addEventListener("input", () => { fset(i.dataset.q, "q", i.value); rerender(true); }));
  $$(".chips[data-key]", root).forEach(g => $$(".chip:not(.tgl)", g).forEach(b => b.addEventListener("click", () => {
    const tab = g.dataset.tab, key = g.dataset.key, multi = g.dataset.multi === "1", v = b.dataset.v;
    if (multi) { const s = new Set(fget(tab, key, [])); s.has(v) ? s.delete(v) : s.add(v); fset(tab, key, [...s]); }
    else fset(tab, key, fget(tab, key, "") === v ? "" : v);
    rerender();
  })));
  $$(".chip.tgl", root).forEach(b => b.addEventListener("click", () => { fset(b.dataset.tab, b.dataset.key, !fget(b.dataset.tab, b.dataset.key, false)); rerender(); }));
}
function flagBtns(id) {
  return `<button class="btn l fav${FAV.has(id) ? " on" : ""}" data-fav="${esc(id)}" title="סימון כמועדף">${FAV.has(id) ? "⭐ נבחר" : "☆ סמן"}</button>` +
    `<button class="btn l" data-hide="${esc(id)}" title="הסתרה זמנית">${HID.has(id) ? "👁️ הצג" : "🙈 הסתר"}</button>`;
}
function bindFlags(root, rerender) {
  $$("[data-fav]", root).forEach(b => b.addEventListener("click", () => { const id = b.dataset.fav; FAV.has(id) ? FAV.delete(id) : FAV.add(id); saveFlags(); rerender(true); }));
  $$("[data-hide]", root).forEach(b => b.addEventListener("click", () => { const id = b.dataset.hide; HID.has(id) ? HID.delete(id) : HID.add(id); saveFlags(); rerender(true); }));
}
function passFlags(tab, id) {
  if (fget(tab, "favOnly", false) && !FAV.has(id)) return false;
  if (!fget(tab, "showHid", false) && HID.has(id)) return false;
  return true;
}
const flagsBar = tab => toggleChip(tab, "favOnly", "⭐ המועדפים שלי בלבד") + toggleChip(tab, "showHid", "👁️ הצג גם מוסתרים");
const lnk = (u, t) => u ? `<a href="${esc(u)}" target="_blank" rel="noopener">${t || esc(u.replace(/^https?:\/\/(www\.)?/, ""))}</a>` : "";
function dl(rows) { return `<dl class="info">` + rows.filter(r => r[1]).map(r => `<dt>${r[0]}</dt><dd>${r[1]}</dd>`).join("") + "</dl>"; }

/* ===== מפה ===== */
let MAP = null, MAPLAYERS = {}, MAPBUILT = false;
const MCATS = { sites: ["🏛️", "#c79100", "אתרים"], hotels: ["🏨", "#7b3fb3", "מלונות"], rest: ["🍽️", "#c62828", "מסעדות"], markets: ["🧺", "#2e7d32", "שווקים וקניות"], metro: ["🚇", "#00838f", "תחנות מטרו"], mine: ["📌", "#ef6c00", "המקומות שלי"] };
function mkIcon(cat) { const [e, c] = MCATS[cat]; return L.divIcon({ className: "", html: `<div class="mk" style="background:${c}"><span>${e}</span></div>`, iconSize: [30, 30], iconAnchor: [15, 30], popupAnchor: [0, -28] }); }
function popup(name, sub, lat, lng) { return `<b>${name}</b><br><small>${sub || ""}</small><br><a target="_blank" rel="noopener" href="${gmapsDir(lat, lng)}">🧭 דרכי הגעה</a> · <a target="_blank" rel="noopener" href="${gmapsPoint(lat, lng)}">גוגל מפות</a>`; }
function renderMap(el) {
  el.innerHTML = hero("מפת אתונה", "מפה אינטראקטיבית — לחצו על סמן כדי לראות פרטים ודרך הגעה. סננו לפי סוג המקום.") +
    `<div class="fbar"><div class="chips" id="mapf">${Object.entries(MCATS).map(([k, v]) => `<button class="chip on" data-k="${k}">${v[0]} ${v[2]}</button>`).join("")}</div>
     <div class="chips"><button class="chip" id="locme">📍 המיקום שלי</button><button class="chip" id="allmetro">🚇 קווי מטרו</button><a class="chip" target="_blank" rel="noopener" href="https://www.google.com/maps/@37.9755,23.7348,14z">פתח בגוגל מפות</a></div></div>
     <div id="map"></div><p class="note">מפה: OpenStreetMap. מיקומי תחנות המטרו מקורבים.</p>`;
  if (typeof L === "undefined") { $("#map").innerHTML = '<p style="padding:20px">המפה צריכה חיבור לאינטרנט. השתמשו בקישורי ״גוגל מפות״ בכרטיסים.</p>'; return; }
  if (MAP) { MAP.remove(); MAP = null; }
  MAP = L.map("map", { zoomControl: true }).setView([37.9755, 23.7300], 13);
  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(MAP);
  MAPLAYERS = {};
  Object.keys(MCATS).forEach(k => MAPLAYERS[k] = L.layerGroup().addTo(MAP));
  SITES.filter(s => s.area !== "far").forEach(s => L.marker([s.lat, s.lng], { icon: mkIcon("sites") }).bindPopup(popup(esc(s.he), esc(s.en), s.lat, s.lng)).addTo(MAPLAYERS.sites));
  HOTELS.forEach(h => L.marker([h.lat, h.lng], { icon: mkIcon("hotels") }).bindPopup(popup(esc(h.he), h.stars + "★ · " + esc(h.en), h.lat, h.lng)).addTo(MAPLAYERS.hotels));
  RESTAURANTS.forEach(r => L.marker([r.lat, r.lng], { icon: mkIcon("rest") }).bindPopup(popup(esc(r.he), esc(r.type), r.lat, r.lng)).addTo(MAPLAYERS.rest));
  L.marker([37.9806, 23.7263], { icon: mkIcon("markets") }).bindPopup(popup("שוק ורבקיוס", "שוק מרכזי", 37.9806, 23.7263)).addTo(MAPLAYERS.markets);
  L.marker([37.9763, 23.7243], { icon: mkIcon("markets") }).bindPopup(popup("שוק הפשפשים מונסטיראקי", "קניות ושוק", 37.9763, 23.7243)).addTo(MAPLAYERS.markets);
  Object.entries(ST).filter(([, v]) => v[3]).forEach(([id, v]) => L.marker([v[3], v[4]], { icon: mkIcon("metro") }).bindPopup(popup(esc(v[1]), esc(v[0]) + (v[2] ? " · " + v[2] : ""), v[3], v[4])).addTo(MAPLAYERS.metro));
  CUSTOM.forEach(c => c.lat && L.marker([c.lat, c.lng], { icon: mkIcon("mine") }).bindPopup(popup(esc(c.he), esc(c.addr || ""), c.lat, c.lng)).addTo(MAPLAYERS.mine));
  MAPLAYERS.lines = L.layerGroup();
  Object.entries(LINES).forEach(([n, ln]) => { const pts = ln.st.filter(s => ST[s][3]).map(s => [ST[s][3], ST[s][4]]); L.polyline(pts, { color: ln.color, weight: 5, opacity: .85 }).bindTooltip(ln.he).addTo(MAPLAYERS.lines); });
  $$("#mapf .chip").forEach(b => b.addEventListener("click", () => { b.classList.toggle("on"); const g = MAPLAYERS[b.dataset.k]; b.classList.contains("on") ? g.addTo(MAP) : MAP.removeLayer(g); }));
  $("#allmetro").addEventListener("click", e => { e.target.classList.toggle("on"); e.target.classList.contains("on") ? MAPLAYERS.lines.addTo(MAP) : MAP.removeLayer(MAPLAYERS.lines); });
  $("#locme").addEventListener("click", () => {
    if (!navigator.geolocation) return toast("המכשיר אינו תומך במיקום");
    navigator.geolocation.getCurrentPosition(p => { const ll = [p.coords.latitude, p.coords.longitude]; L.circleMarker(ll, { radius: 9, color: "#fff", weight: 3, fillColor: "#1e88e5", fillOpacity: 1 }).addTo(MAP).bindPopup("אתם כאן").openPopup(); MAP.setView(ll, 15); }, () => toast("לא ניתן לקבל מיקום — אשרו הרשאה במכשיר"));
  });
  setTimeout(() => MAP && MAP.invalidateSize(), 200);
}

/* ===== אתרים ===== */
function siteCard(s) {
  const c = CATS_SITES[s.cat] || { he: "", ico: "📍" };
  const free = !s.paid;
  const eff = ["", "הליכה קלה", "הליכה בינונית", "הליכה ועליות"][s.effort || 1];
  return `<article class="card${HID.has(s.id) ? " hid" : ""}" data-id="${esc(s.id)}">
  ${ph(s.wiki, c.ico, s.wiki)}
  <div class="body"><h3>${esc(s.he)}<small>${esc(s.en)}${s.gr ? " · " + esc(s.gr) : ""}</small></h3>
  <p class="short">${esc(s.short)}</p>
  <div class="row"><span class="tag">${c.ico} ${c.he}</span><span class="tag ${free ? "g" : "o"}">${free ? "חינם" : "בתשלום"}</span><span class="tag p">${eff}</span>${s.kids ? '<span class="tag g">מתאים לילדים</span>' : ""}</div>
  <details data-site="${esc(s.id)}"><summary>הרחבה: היסטוריה, שעות, כרטיסים והגעה</summary>
   <div class="hist"><b>היסטוריה:</b> ${esc(s.hist)}</div><p class="short">${esc(s.long)}</p>
   ${dl([["כתובת", esc(s.addr)], ["טלפון", s.phone ? `<a href="tel:${s.phone.replace(/\s/g, "")}">${esc(s.phone)}</a>` : "לא אומת — פרטים עדכניים בגוגל מפות"], ["אתר", lnk(s.web)], ["שעות", esc(s.hours)], ["מחיר", esc(s.price)], ["ימי חינם", esc(s.free)], ["איפה קונים", esc(s.buy)], ["הזמנה מראש", esc(s.book)], ["איך מגיעים", esc(s.how)]])}
   <div class="acts"><button class="btn l" data-wk="${esc(s.id)}">📖 עוד מויקיפדיה</button><button class="btn l" data-emb="${esc(s.id)}">🗺️ מפה מוטמעת</button></div><div class="wkbox"></div>
  </details>
  <div class="acts">${flagBtns(s.id)}<a class="btn" target="_blank" rel="noopener" href="${gmapsDir(s.lat, s.lng)}">🧭 הגעה</a>${s.web ? `<a class="btn l" target="_blank" rel="noopener" href="${esc(s.web)}">🌐 אתר</a>` : ""}</div></div></article>`;
}
function customCard(c) {
  return `<article class="card" data-id="${esc(c.id)}" style="--cc:#ef6c00"><div class="ph"><span class="emo">📌</span></div><div class="body"><h3>${esc(c.he)}<small>המקום שלי</small></h3>${c.addr ? `<p class="short">${esc(c.addr)}</p>` : ""}${c.note ? `<p class="short">${esc(c.note)}</p>` : ""}<div class="acts"><button class="btn l" data-delc="${esc(c.id)}">🗑️ מחק</button><a class="btn" target="_blank" rel="noopener" href="${gmapsSearch(c.he + " " + (c.addr || "") + " Athens")}">🗺️ גוגל מפות</a></div></div></article>`;
}
function renderSites(el, soft) {
  if (!soft) el.innerHTML = hero("אתרים, אטרקציות ומקומות מעניינים", "כל אתר עם תמונה, תיאור קצר והרחבה (היסטוריה, כתובת, שעות, מחירים, איפה קונים כרטיסים והגעה). הכניסה לאקרופוליס וחלק מהאתרים — לפי חלון זמן.") +
    `<div class="fbar">${searchBox("sites", "חיפוש אתר (עברית / English)")}${chipRow("sites", "cat", Object.entries(CATS_SITES).map(([k, v]) => [k, v.ico + " " + v.he]))}
     <div class="chips">${toggleChip("sites", "freeOnly", "🆓 חינם בלבד")}${toggleChip("sites", "easy", "🦶 בלי הליכה מאומצת")}${toggleChip("sites", "kids", "👨‍👩‍👧 מתאים לילדים")}${toggleChip("sites", "noTrip", "🚫 בלי טיולי יום")}${flagsBar("sites")}<button class="chip" id="addplace">➕ הוסף מקום משלי</button></div></div>
     <div class="count" id="cnt"></div><div class="grid" id="lst"></div><p class="note">${CLOSED_NOTE} מחירים ושעות — אמתו באתר הרשמי לפני ההגעה. תמונות ותקצירים מויקיפדיה.</p>`;
  const q = fget("sites", "q", "").trim().toLowerCase(), cats = fget("sites", "cat", []);
  let list = SITES.filter(s => (!q || (s.he + " " + s.en + " " + s.gr).toLowerCase().includes(q)) && (!cats.length || cats.includes(s.cat)) &&
    (!fget("sites", "freeOnly", false) || !s.paid) && (!fget("sites", "easy", false) || s.effort <= 2) && (!fget("sites", "kids", false) || s.kids) && (!fget("sites", "noTrip", false) || s.cat !== "daytrip") && passFlags("sites", s.id));
  const cs = CUSTOM.filter(c => !q || c.he.toLowerCase().includes(q));
  $("#cnt").textContent = (list.length + cs.length) + " מקומות";
  $("#lst").innerHTML = list.map(siteCard).join("") + cs.map(customCard).join("") || "<p>אין תוצאות — נסו להסיר סינון.</p>";
  $$("#lst .card").forEach(c => c.style.setProperty("--cc", c.style.getPropertyValue("--cc") || "#c79100"));
  hydrate(el); bindFlags(el, renderSitesSoft); if (!soft) bindFilters(el, renderSitesSoft);
  $$("[data-wk]", el).forEach(b => b.onclick = async () => { const s = SITES.find(x => x.id === b.dataset.wk), box = b.closest("details").querySelector(".wkbox"); box.innerHTML = '<p class="short">טוען…</p>'; const r = await heExtract(s.heq || s.he, s.he); box.innerHTML = r ? `<div class="wk"><b>${esc(r.title)}</b><br>${esc(r.text)}<br><a target="_blank" rel="noopener" href="https://he.wikipedia.org/wiki/${encodeURIComponent(r.title)}">לערך המלא בוויקיפדיה</a></div>` : '<p class="short">לא נמצא ערך מתאים או שאין חיבור לאינטרנט.</p>'; });
  $$("[data-emb]", el).forEach(b => b.onclick = () => { const s = SITES.find(x => x.id === b.dataset.emb), box = b.closest("details").querySelector(".wkbox"); box.innerHTML = `<iframe class="mapframe" loading="lazy" src="https://maps.google.com/maps?q=${s.lat},${s.lng}&z=16&output=embed"></iframe>`; });
  $$("[data-delc]", el).forEach(b => b.onclick = () => { if (confirm("למחוק את המקום?")) { CUSTOM = CUSTOM.filter(c => c.id !== b.dataset.delc); store.set("custom", CUSTOM); renderSitesSoft(); } });
  const ap = $("#addplace"); if (ap) ap.onclick = addPlaceDialog;
}
const renderSitesSoft = () => renderSites($("#view"), true);
function addPlaceDialog() {
  const d = document.createElement("dialog");
  d.innerHTML = `<h3>הוספת מקום משלי</h3><div class="f" style="grid-template-columns:1fr"><div><label>שם המקום</label><input id="np1" type="text"></div><div><label>כתובת</label><input id="np2" type="text"></div><div><label>הערה</label><input id="np3" type="text"></div></div><div class="acts" style="margin-top:12px"><button class="btn" id="npok">שמור</button><button class="btn l" id="npno">ביטול</button></div>`;
  document.body.appendChild(d); d.showModal();
  $("#npno", d).onclick = () => { d.close(); d.remove(); };
  $("#npok", d).onclick = () => { const he = $("#np1", d).value.trim(); if (!he) return toast("כתבו שם למקום"); CUSTOM.push({ id: "c" + Date.now(), he, addr: $("#np2", d).value.trim(), note: $("#np3", d).value.trim() }); store.set("custom", CUSTOM); d.close(); d.remove(); renderSitesSoft(); };
}

/* ===== מלונות ===== */
function renderHotels(el, soft) {
  if (!soft) el.innerHTML = hero("מלונות מומלצים (4–5 כוכבים)", "מלונות עם מיקום טוב, שירות ואיכות. המחירים משוערים ללילה לזוג כולל ארוחת בוקר.") +
    `<div class="fbar">${searchBox("hotels", "חיפוש מלון / אזור")}${chipRow("hotels", "stars", [["5", "5 כוכבים ★★★★★"], ["4", "4 כוכבים ★★★★"]])}${chipRow("hotels", "pr", [["lo", "עד €200"], ["mid", "€200–400"], ["hi", "מעל €400"]])}<div class="chips">${flagsBar("hotels")}</div></div><div class="count" id="cnt"></div><div class="grid" id="lst"></div><p class="note">${HOTEL_NOTE}</p>`;
  const q = fget("hotels", "q", "").trim().toLowerCase(), st = fget("hotels", "stars", []), pr = fget("hotels", "pr", []);
  const band = h => h.price[0] < 200 ? "lo" : h.price[0] < 400 ? "mid" : "hi";
  const list = HOTELS.filter(h => (!q || (h.he + h.en + h.area).toLowerCase().includes(q)) && (!st.length || st.includes(String(h.stars))) && (!pr.length || pr.includes(band(h))) && passFlags("hotels", h.id));
  $("#cnt").textContent = list.length + " מלונות";
  $("#lst").innerHTML = list.map(h => `<article class="card${HID.has(h.id) ? " hid" : ""}">${ph(h.wiki, "🏨", h.wiki)}<div class="body"><h3>${esc(h.he)}<small>${esc(h.en)}</small></h3>
   <div class="row"><span class="tag o">${"★".repeat(h.stars)}</span><span class="tag p">${esc(h.area)}</span><span class="tag g">€${fmt(h.price[0])}–${fmt(h.price[1])} ללילה (משוער)</span></div>
   <p class="short"><b>למה מומלץ:</b> ${esc(h.why)}</p>
   ${dl([["כתובת", esc(h.addr)], ["טלפון", h.phone ? `<a href="tel:${h.phone.replace(/\s/g, "")}">${esc(h.phone)}</a>` : "פרטים באתר המלון"], ["אתר", lnk(h.web)], ["מטרו קרוב", esc(h.metro)]])}
   <div class="acts">${flagBtns(h.id)}<a class="btn" target="_blank" rel="noopener" href="${gmapsDir(h.lat, h.lng)}">🧭 הגעה</a><a class="btn l" target="_blank" rel="noopener" href="${gmapsSearch(h.en + " Athens")}">🗺️ במפות</a></div></div></article>`).join("") || "<p>אין תוצאות.</p>";
  $$("#lst .card").forEach(c => c.style.setProperty("--cc", "#7b3fb3"));
  hydrate(el); bindFlags(el, () => renderHotels($("#view"), true)); if (!soft) bindFilters(el, () => renderHotels($("#view"), true));
}

/* ===== תחבורה ===== */
let TMAP = null;
function stationName(id) { const s = ST[id]; return `${s[1]} (${s[0]})`; }
const G = {};
Object.entries(LINES).forEach(([ln, L0]) => L0.st.forEach((s, i) => { G[s] = G[s] || []; if (i > 0) G[s].push({ to: L0.st[i - 1], line: +ln }); if (i < L0.st.length - 1) G[s].push({ to: L0.st[i + 1], line: +ln }); }));
function findRoute(a, b) {
  const key = (s, l) => s + "|" + l, dist = new Map(), prev = new Map(), pq = [[0, a, 0]];
  dist.set(key(a, 0), 0);
  while (pq.length) {
    pq.sort((x, y) => x[0] - y[0]); const [d, s, l] = pq.shift();
    if (d > (dist.get(key(s, l)) ?? 1e9)) continue;
    if (s === b) { const path = []; let k = key(s, l); while (k) { path.unshift(k); k = prev.get(k); } return path.map(k => { const [st, ln] = k.split("|"); return { st, ln: +ln }; }); }
    for (const e of G[s]) { const nd = d + 1 + (l && l !== e.line ? 6 : 0), k = key(e.to, e.line); if (nd < (dist.get(k) ?? 1e9)) { dist.set(k, nd); prev.set(k, key(s, l)); pq.push([nd, e.to, e.line]); } }
  }
  return null;
}
function routeLegs(a, b) {
  if (a === b) return null; const p = findRoute(a, b); if (!p) return null;
  const legs = []; for (let i = 1; i < p.length; i++) { const last = legs[legs.length - 1]; if (last && last.line === p[i].ln) { last.to = p[i].st; last.stops++; } else legs.push({ line: p[i].ln, from: p[i - 1].st, to: p[i].st, stops: 1 }); }
  return legs;
}
function dirOf(leg) { const L0 = LINES[leg.line], i1 = L0.st.indexOf(leg.from), i2 = L0.st.indexOf(leg.to); return i2 > i1 ? L0.to : L0.from; }
function routeHtml(a, b) {
  if (a === b) return "<p>אותה תחנה — אין צורך בנסיעה.</p>";
  const legs = routeLegs(a, b); if (!legs) return "<p>לא נמצא מסלול.</p>";
  const stops = legs.reduce((n, l) => n + l.stops, 0), mins = Math.round(stops * 2.3 + (legs.length - 1) * 5);
  return `<ol style="line-height:1.8;padding:0 20px;margin:6px 0">` + legs.map(l => `<li><b style="color:${LINES[l.line].color}">${LINES[l.line].he}</b> — מ-${stationName(l.from)} ל-${stationName(l.to)} (${l.stops} תחנות), לכיוון ${esc(dirOf(l))}</li>`).join("") + `</ol><p class="tag g">סה״כ ${stops} תחנות · כ-${mins} דקות (משוער, כולל החלפות)</p>`;
}
function routeText(a, b) {
  if (a === b) return "ללכת ברגל מהמלון"; const legs = routeLegs(a, b); if (!legs) return "";
  return legs.map(l => `${LINES[l.line].he}: ${ST[l.from][1]} ← ${ST[l.to][1]}`).join(" ⟵ ");
}
function renderTransport(el) {
  const sub = fget("transport", "sub", "metro");
  el.innerHTML = hero("תחבורה ציבורית ודרכי הגעה", "מטרו, אוטובוסים, טראם, מוניות, השכרת רכב — ומחירים. כרטיס אחד ל-90 דקות תקף בכל אמצעי התחבורה העירוניים.") +
    `<div class="sub">${[["metro", "🚇 מטרו ומפה"], ["other", "🚕 מוניות ואחרים"], ["fares", "💶 כרטיסים ומחירים"], ["route", "🧭 מדריך הגעה"]].map(([k, t]) => `<button class="chip${sub === k ? " on" : ""}" data-s="${k}">${t}</button>`).join("")}</div><div id="tsub"></div>`;
  $$(".sub .chip", el).forEach(b => b.onclick = () => { fset("transport", "sub", b.dataset.s); renderTransport(el); });
  const box = $("#tsub");
  if (sub === "metro") {
    box.innerHTML = `<div id="mmap"></div>
     <div class="legend">${Object.entries(LINES).map(([n, l]) => `<span class="tag" style="background:${l.color};color:#fff">${l.he}: ${esc(l.from)} ← → ${esc(l.to)}</span>`).join("")}</div>
     <div class="box"><h3>הקווים ותחנות הקצה</h3><ul>${Object.entries(LINES).map(([n, l]) => `<li><b style="color:${l.color}">${l.he}</b> — תחנה סופית: <b>${esc(l.from)}</b> ו-<b>${esc(l.to)}</b> (${l.st.length} תחנות)</li>`).join("")}</ul>
     <p>תחנות החלפה: ${Object.entries(INTERCHANGES).map(([k, v]) => `${ST[k][1]} (${v})`).join(" · ")}.</p></div>
     <div class="box"><h3>מידע שימושי</h3><ul><li>שעות: קו 1 כ-05:00–00:15; קווים 2 ו-3 כ-05:30–00:00, בשישי ובשבת מאוחר יותר (ובשבתות פעילות גם 24 שעות בקווים 2 ו-3, לפי מקורות).</li><li>תדירות: כ-5–10 דקות בשעות העומס; לשדה התעופה כל 30 דקות.</li><li>כל תחנות המטרו נגישות, עם מעליות ושילוט באנגלית.</li><li>קו 4 נמצא בבנייה (צפוי להיפתח אחרי 2029) — אינו פעיל בטיול הקרוב.</li></ul></div>
     <h3 style="margin:12px 4px 6px">תחנות עיקריות ומקומות מעניינים סביבן</h3><div class="grid" id="stg"></div>`;
    $("#stg").innerHTML = STATION_INFO.map(si => { const s = ST[si.id]; const lines = Object.entries(LINES).filter(([, l]) => l.st.includes(si.id)).map(([n, l]) => `<span class="tag" style="background:${l.color};color:#fff">${n}</span>`).join(" ");
      return `<article class="card" style="--cc:#00838f">${ph(si.wiki, "🚇", si.wiki)}<div class="body"><h3>${esc(s[1])}<small>${esc(s[0])}${s[2] ? " · " + esc(s[2]) : ""}</small></h3><div class="row">${lines}</div><ul style="margin:4px 0;padding:0 18px;line-height:1.7;font-size:14px">${si.near.map(n => `<li>${esc(n)}</li>`).join("")}</ul>${s[3] ? `<div class="acts"><a class="btn" target="_blank" rel="noopener" href="${gmapsPoint(s[3], s[4])}">📍 במפות</a></div>` : ""}</div></article>`; }).join("");
    hydrate(box);
    if (typeof L !== "undefined") {
      if (TMAP) { TMAP.remove(); TMAP = null; }
      TMAP = L.map("mmap").setView([37.975, 23.74], 11);
      const allPts = []; Object.values(LINES).forEach(l => l.st.filter(s => ST[s][3]).forEach(s => allPts.push([ST[s][3], ST[s][4]])));
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: "© OpenStreetMap" }).addTo(TMAP);
      Object.entries(LINES).forEach(([n, l]) => {
        const pts = l.st.filter(s => ST[s][3]).map(s => [ST[s][3], ST[s][4]]);
        L.polyline(pts, { color: l.color, weight: 6, opacity: .9 }).addTo(TMAP);
        l.st.filter(s => ST[s][3]).forEach(s => L.marker([ST[s][3], ST[s][4]], { icon: L.divIcon({ className: "", html: `<div class="stn" style="background:${l.color}"></div>`, iconSize: [14, 14] }) }).bindPopup(`<b>${esc(ST[s][1])}</b><br><small>${esc(ST[s][0])}${ST[s][2] ? " · " + ST[s][2] : ""}</small><br>${l.he}${INTERCHANGES[s] ? "<br>החלפה: " + INTERCHANGES[s] : ""}`).addTo(TMAP));
      });
      setTimeout(() => { if (TMAP) { TMAP.invalidateSize(); TMAP.fitBounds(allPts, { padding: [20, 20] }); } }, 250);
    } else $("#mmap").innerHTML = '<p style="padding:20px">המפה צריכה חיבור לאינטרנט.</p>';
  } else if (sub === "other") {
    box.innerHTML = TRANSPORT.map(t => `<div class="box"><h3>${t.i} ${t.t}</h3><p>${esc(t.d)}</p><p class="tag o">💡 ${esc(t.tip)}</p></div>`).join("") + `<p class="note">מחירי מוניות והשכרה משוערים. בדקו מחיר מעודכן באפליקציה לפני הנסיעה.</p>`;
  } else if (sub === "fares") {
    box.innerHTML = `<table class="t"><tr><th>סוג</th><th>מחיר</th><th>הערות</th></tr>${FARES.map(r => `<tr><td>${esc(r[0])}</td><td class="pr">${esc(r[1])}</td><td>${esc(r[2])}</td></tr>`).join("")}</table>
     <div class="box" style="margin-top:10px"><h3>איך קונים ומשתמשים</h3><ul><li>מכונות בתחנות מטרו — מזומן או כרטיס אשראי. בכרטיס נייר יש לתקף (להצמיד/לקלף) בכניסה.</li><li><b>Tap2Ride:</b> אפשר להצמיד כרטיס אשראי או טלפון (Apple/Google Pay) לקורא הצהוב ולהיחשב כנוסע; יש תקרה יומית של €4.10.</li><li>כרטיס חכם ATH.ENA — נטען ונשמר לשימוש חוזר.</li><li>כרטיס 90 דקות תקף לכל אמצעי התחבורה העירוניים והחלפות — אך לא לשדה התעופה.</li><li>עדיף להחזיק כרטיס עד סוף הנסיעה — ייתכנו בדיקות.</li></ul></div>
     <p class="note">מקורות: אתרי מידע ו-OASA, 2026. מחירים עשויים להשתנות.</p>`;
  } else {
    const opts = Object.keys(ST).sort((a, b) => ST[a][1].localeCompare(ST[b][1], "he")).map(k => `<option value="${k}">${ST[k][1]} — ${ST[k][0]}</option>`).join("");
    box.innerHTML = `<div class="box"><h3>מדריך הגעה בין תחנות</h3><div class="f"><div><label>מתחנה</label><select id="ra">${opts}</select></div><div><label>לתחנה</label><select id="rb">${opts}</select></div></div><div id="rres" style="margin-top:8px"></div></div>
      <div class="box"><h3>הגעה מנקודות מרכזיות</h3><ul>${GETTING_AROUND.map(g => `<li><b>${esc(g.from)}:</b> ${esc(g.how)}</li>`).join("")}</ul></div>`;
    const ra = $("#ra"), rb = $("#rb"); ra.value = store.get("ra", "airport"); rb.value = store.get("rb", "syntagma");
    const go = () => { store.set("ra", ra.value); store.set("rb", rb.value); $("#rres").innerHTML = routeHtml(ra.value, rb.value); };
    ra.onchange = rb.onchange = go; go();
  }
}

/* ===== מסעדות ===== */
function renderRest(el, soft) {
  const areas = [...new Set(RESTAURANTS.map(r => r.area))];
  if (!soft) el.innerHTML = hero("מסעדות מומלצות", "מגוון: טברנות מסורתיות, מזות, דגים, קינוחים ויוקרה — עם מחיר משוער לסועד.") +
    `<div class="fbar">${searchBox("rest", "חיפוש מסעדה / סוג אוכל")}${chipRow("rest", "pr", [["lo", "עד €20"], ["mid", "€20–45"], ["hi", "מעל €45"]])}${chipRow("rest", "area", areas.map(a => [a, a]))}<div class="chips">${flagsBar("rest")}</div></div><div class="count" id="cnt"></div><div class="grid" id="lst"></div><p class="note">${REST_NOTE}</p>`;
  const q = fget("rest", "q", "").trim().toLowerCase(), pr = fget("rest", "pr", []), ar = fget("rest", "area", []);
  const band = r => r.price[1] <= 20 ? "lo" : r.price[1] <= 45 ? "mid" : "hi";
  const list = RESTAURANTS.filter(r => (!q || (r.he + r.en + r.type + r.area).toLowerCase().includes(q)) && (!pr.length || pr.includes(band(r))) && (!ar.length || ar.includes(r.area)) && passFlags("rest", r.id));
  $("#cnt").textContent = list.length + " מסעדות";
  $("#lst").innerHTML = list.map(r => `<article class="card${HID.has(r.id) ? " hid" : ""}" style="--cc:#c62828"><div class="ph" style="height:90px"><span class="emo">🍽️</span></div><div class="body"><h3>${esc(r.he)}<small>${esc(r.en)}</small></h3>
   <div class="row"><span class="tag r">${esc(r.type)}</span><span class="tag p">${esc(r.area)}</span><span class="tag g">€${fmt(r.price[0])}–${fmt(r.price[1])} לסועד (משוער)</span></div><p class="short">${esc(r.desc)}</p>
   ${dl([["כתובת", esc(r.addr)], ["טלפון", "בגוגל מפות — פרטים עדכניים"], ["אתר", lnk(r.web)]])}
   <div class="acts">${flagBtns(r.id)}<a class="btn" target="_blank" rel="noopener" href="${gmapsDir(r.lat, r.lng)}">🧭 הגעה</a><a class="btn l" target="_blank" rel="noopener" href="${gmapsSearch(r.en + " " + r.addr + " Athens")}">📞 פתח בגוגל מפות</a></div></div></article>`).join("") || "<p>אין תוצאות.</p>";
  bindFlags(el, () => renderRest($("#view"), true)); if (!soft) bindFilters(el, () => renderRest($("#view"), true));
}

/* ===== אוכל ===== */
function renderFood(el, soft) {
  if (!soft) el.innerHTML = hero("אוכל יווני — מה כדאי לטעום", "מנות, מרכיבים ותמונות. שימו לב: חלק מהמנות מכילות בשר וחלב יחד.") + `<div class="fbar">${searchBox("food", "חיפוש מנה")}<div class="chips">${flagsBar("food")}</div></div><div class="grid" id="lst"></div>`;
  const q = fget("food", "q", "").trim().toLowerCase();
  const list = FOODS.filter(f => (!q || (f.he + f.en + f.gr).toLowerCase().includes(q)) && passFlags("food", f.en));
  $("#lst").innerHTML = list.map(f => `<article class="card${HID.has(f.en) ? " hid" : ""}" style="--cc:#e65100">${ph(f.wiki, "🥙", f.wiki)}<div class="body"><h3>${esc(f.he)}<small>${esc(f.en)} · ${esc(f.gr)}</small></h3><p class="short"><b>מרכיבים:</b> ${esc(f.ing)}</p><p class="short">${esc(f.note)}</p><div class="acts">${flagBtns(f.en)}</div></div></article>`).join("") || "<p>אין תוצאות.</p>";
  hydrate(el); bindFlags(el, () => renderFood($("#view"), true)); if (!soft) bindFilters(el, () => renderFood($("#view"), true));
}

/* ===== קניות ושווקים ===== */
function renderShop(el) {
  el.innerHTML = hero("קניות", "רחובות קניות, קניונים ואאוטלטים.") + SHOPS.map(s => `<div class="box" style="--cc:#d81b60"><h3>${esc(s.he)} <small style="color:#667;font-weight:500">${esc(s.en)}</small></h3><p><span class="tag p">${esc(s.type)}</span></p><p>${esc(s.desc)}</p>${dl([["כתובת", esc(s.addr)], ["מטרו", esc(s.metro || "")], ["אתר", lnk(s.web)]])}<div class="acts"><a class="btn" target="_blank" rel="noopener" href="${gmapsSearch(s.en + " Athens")}">🗺️ גוגל מפות</a></div></div>`).join("") +
    `<div class="box" style="--cc:#d81b60"><h3>מה אפשר להביא הביתה</h3><div class="row">${SHOP_GIFTS.map(g => `<span class="tag o">${esc(g)}</span>`).join("")}</div></div><p class="note">${SHOP_NOTE}</p>`;
}
function renderMarkets(el, soft) {
  if (!soft) el.innerHTML = hero("שווקים", "שוק פשפשים, שוק מזון ותבלינים — עם כתובות ודרכי הגעה.") + `<div class="fbar"><div class="chips">${flagsBar("markets")}</div></div><div class="grid" id="lst"></div>`;
  $("#lst").innerHTML = MARKETS.filter(m => passFlags("markets", m.en)).map(m => `<article class="card${HID.has(m.en) ? " hid" : ""}" style="--cc:#2e7d32">${m.wiki ? ph(m.wiki, "🧺", m.wiki) : '<div class="ph" style="height:90px"><span class="emo">🧺</span></div>'}<div class="body"><h3>${esc(m.he)}<small>${esc(m.en)} · ${esc(m.gr)}</small></h3><p class="short">${esc(m.desc)}</p>${dl([["כתובת", esc(m.addr)], ["שעות", esc(m.hours)], ["הגעה", esc(m.how)]])}<div class="acts">${flagBtns(m.en)}<a class="btn" target="_blank" rel="noopener" href="${gmapsSearch(m.en + " Athens")}">🧭 במפות</a></div></div></article>`).join("");
  hydrate(el); bindFlags(el, () => renderMarkets($("#view"), true)); if (!soft) bindFilters(el, () => renderMarkets($("#view"), true));
}

/* ===== טיפים ===== */
function renderTips(el) {
  el.innerHTML = hero("טיפים — דברים שחשוב לדעת", "בטיחות, כסף, שעות פעילות, שפה ועוד.") + TIPS.map(g => `<details class="box" style="--cc:#546e7a" open><summary style="font-size:16px">${g.i} ${g.t}</summary><ul>${g.items.map(i => `<li>${esc(i)}</li>`).join("")}</ul></details>`).join("");
}

/* ===== מסלולים ===== */
const DAYS = [
  { id: "d1", t: "האקרופוליס, מוזיאון האקרופוליס ופלאקה", effort: 3, kids: true, tags: ["history", "views", "walk"], start: "akropoli", slots: [["בוקר", "הגיעו ל-08:00 לאקרופוליס (כניסה לפי חלון זמן — הזמינו מראש ב-hhticket.gr). פרתנון, אריכתיון ותיאטרון דיוניסוס — 2–3 שעות."], ["צהריים", "מוזיאון האקרופוליס (כשעה וחצי) וארוחה בסמוך."], ["אחה״צ", "שוטטות בפלאקה ובאנפיוטיקה."], ["ערב", "ארוחת ערב בפלאקה או בגג עם נוף לאקרופוליס (הזמינו מראש)."]], sites: ["acropolis", "acromuseum", "plaka", "anafiotika"] },
  { id: "d2", t: "האגורה העתיקה, מונסטיראקי והאגורה הרומית", effort: 2, kids: true, tags: ["history", "shopping", "food", "walk"], start: "thiseio", slots: [["בוקר", "האגורה העתיקה ומקדש הפייסטוס (כניסה מתחנת Thiseio)."], ["צהריים", "ספריית אדריאנוס והאגורה הרומית (מגדל הרוחות)."], ["אחה״צ", "כיכר מונסטיראקי ושוק הפשפשים."], ["ערב", "ארוחת ערב בסובלקי (Thanasis / Bairaktaris) או בפסירי."]], sites: ["agora", "hadrian", "romanagora"] },
  { id: "d3", t: "סינטגמה, הגן הלאומי ואצטדיון פנאתינאיקו", effort: 2, kids: true, tags: ["history", "nature", "walk"], start: "syntagma", sunday: true, slots: [["בוקר", "כיכר סינטגמה וחילופי המשמר (כל שעה עגולה; ראשון 11:00 הטקס המלא)."], ["צהריים", "הגן הלאומי והזאפיון, ומשם למקדש זאוס האולימפי."], ["אחה״צ", "אצטדיון פנאתינאיקו (אודיו-גייד כלול)."], ["ערב", "ארוחת ערב בפנגרטי."]], sites: ["syntagma", "natgarden", "olympieion", "panathenaic"] },
  { id: "d4", t: "קולונקי וגבעת ליקאבטוס", effort: 2, kids: true, tags: ["views", "shopping", "photo", "food"], start: "evangelismos", slots: [["בוקר", "קפה וקניות בקולונקי."], ["צהריים", "ארוחה קלה בקולונקי."], ["אחה״צ", "רכבל לליקאבטוס (או הליכה לעלייה)."], ["ערב", "שקיעה מהפסגה וירידה לארוחת ערב."]], sites: ["kolonaki", "lycabettus"] },
  { id: "d5", t: "שוק ורבקיוס, אומוניה ותבלינים", effort: 1, kids: false, tags: ["food", "shopping", "walk", "museum"], start: "omonia", notSunday: true, slots: [["בוקר", "שוק ורבקיוס ורחוב אבריפידוס (תבלינים)."], ["צהריים", "ארוחה ב-Diporto או Karamanlidika."], ["אחה״צ", "המוזיאון הארכיאולוגי הלאומי (אופציה)."], ["ערב", "פסירי — ארוחת ערב וטיול."]], sites: ["namuseum", "psyrri"] },
  { id: "d6", t: "קרמיקוס, פילופאפוס וארופגוס", effort: 3, kids: false, tags: ["views", "nature", "history", "photo"], start: "kerameikos", slots: [["בוקר", "אתר קרמיקוס (שקט ובלי המונים)."], ["צהריים", "גאזי — ארוחה."], ["אחה״צ", "עלייה לפילופאפוס/ארופגוס לשקיעה (נעליים טובות)."], ["ערב", "ארוחת ערב בתיסיו."]], sites: ["kerameikos", "philopappos"] },
  { id: "d7", t: "סוניון — מקדש פוסידון (טיול יום)", effort: 2, kids: true, trip: true, tags: ["sea", "history", "views", "daytrip"], startText: "אוטובוס KTEL Attiki מ-Pedion Areos, רכב שכור או סיור מאורגן", slots: [["בוקר", "יציאה לסוניון (כשעה וחצי עד שעתיים נסיעה)."], ["צהריים", "ארוחה בטברנה על הים."], ["אחה״צ", "מקדש פוסידון — הגיעו לפני השקיעה."], ["ערב", "חזרה לאתונה לפני החשכה."]], sites: ["sounion"] },
  { id: "d8", t: "האי אגינה (טיול יום)", effort: 2, kids: true, trip: true, tags: ["sea", "nature", "daytrip"], startText: "מטרו עד Piraeus ומשם מעבורת/הידרופויל לאגינה", slots: [["בוקר", "הפלגה מפיראוס (40–75 דקות לפי הספינה)."], ["צהריים", "נמל אגינה וארוחה (דגים, פיסטוקים)."], ["אחה״צ", "מקדש אפאיה או טיול בעיר."], ["ערב", "חזרה בספינה האחרונה — בדקו לוח הפלגות."]], sites: ["aegina"] },
  { id: "d9", t: "פיראוס ומיקרוליקאנו", effort: 1, kids: true, tags: ["sea", "food", "walk"], start: "piraeus", slots: [["בוקר", "טיול בנמל פיראוס."], ["צהריים", "הסעה קצרה למיקרוליקאנו."], ["אחה״צ", "טיול על המרינה."], ["ערב", "ארוחת דגים במיקרוליקאנו."]], sites: ["mikrolimano"] },
  { id: "d10", t: "מרכז התרבות סטברוס נאירקוס", effort: 1, kids: true, tags: ["culture", "kids", "views", "nature"], start: "syntagma", slots: [["בוקר", "נסיעה למרכז (מונית/אוטובוס)."], ["צהריים", "פארק וגג התצפית — לילדים: שטחי דשא."], ["אחה״צ", "הופעה/אופרה אם יש."], ["ערב", "חזרה למרכז."]], sites: ["snfcc"] },
  { id: "d11", t: "קניות: ארמו, אטיקה וגליפדה", effort: 1, kids: false, tags: ["shopping", "food"], start: "syntagma", slots: [["בוקר", "רחוב ארמו."], ["צהריים", "חנות הכלבו Attica."], ["אחה״צ", "גליפדה בטראם — קניות ושוטטות."], ["ערב", "ארוחה בגליפדה."]], sites: [] },
  { id: "d12", t: "לילה בגאזי ובפסירי", effort: 1, kids: false, tags: ["night", "food", "culture"], start: "kerameikos", slots: [["בוקר", "מנוחה."], ["צהריים", "—"], ["אחה״צ", "גאזי וטכנופוליס."], ["ערב", "ארוחה ובר בפסירי."]], sites: ["psyrri"] },
  { id: "d13", t: "דלפי (טיול יום)", effort: 2, kids: false, trip: true, tags: ["history", "nature", "daytrip"], startText: "סיור מאורגן או רכב שכור (2.5–3 שעות לכל כיוון)", slots: [["בוקר", "יציאה לדלפי."], ["צהריים", "אתר דלפי והמוזיאון."], ["אחה״צ", "ארוחה בעיירה."], ["ערב", "חזרה לאתונה."]], sites: ["delphi"] },
  { id: "d14", t: "נאפליו ואפידאורוס (טיול יום)", effort: 2, kids: true, trip: true, tags: ["history", "daytrip"], startText: "רכב שכור או סיור מאורגן (כשעתיים נסיעה)", slots: [["בוקר", "יציאה — עצירה קצרה בתעלת קורינתוס."], ["צהריים", "התיאטרון העתיק באפידאורוס."], ["אחה״צ", "נאפליו — עיר העתיקה והים."], ["ערב", "חזרה."]], sites: ["nafplio"] },
  { id: "d15", t: "מורשת יהודית באתונה", effort: 1, kids: false, tags: ["jewish", "museum", "history"], start: "syntagma", slots: [["בוקר", "המוזיאון היהודי של יוון (בדקו שעות)."], ["צהריים", "ארוחה בפלאקה."], ["אחה״צ", "בית הכנסת Beth Shalom ופסירי (לתאם מראש)."], ["ערב", "ארוחת ערב."]], sites: ["jewishmuseum"] },
  { id: "d16", t: "יום חופשי / לפי העדפה", effort: 1, kids: true, tags: ["walk"], start: "syntagma", slots: [["בוקר", "חזרה למקום האהוב עליכם או מנוחה."], ["צהריים", "—"], ["אחה״צ", "—"], ["ערב", "ארוחה נעימה."]], sites: [] }
];
const HOTEL_AREAS = [["אקרופוליס / פלאקה / מקריאני", "akropoli"], ["סינטגמה", "syntagma"], ["מונסטיראקי / פסירי", "monastiraki"], ["קולונקי / אוואנגליסמוס", "evangelismos"], ["אומוניה / ויקטוריה", "omonia"], ["פיראוס", "piraeus"], ["שדה התעופה", "airport"], ["עדיין לא בחרתי", "syntagma"]];
const INTERESTS = [["history", "היסטוריה וארכיאולוגיה"], ["food", "אוכל"], ["shopping", "קניות"], ["views", "נופים ותצפיות"], ["nature", "טבע ופארקים"], ["culture", "תרבות ומוזיאונים"], ["night", "חיי לילה"], ["sea", "ים ואיים"], ["jewish", "מורשת יהודית"], ["photo", "צילום"]];
function parseDmy(s) { const m = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(s || ""); if (!m) return null; const d = new Date(+m[3], +m[2] - 1, +m[1]); return isNaN(d) ? null : d; }
function maskDate(inp) { inp.addEventListener("input", () => { let v = inp.value.replace(/\D/g, "").slice(0, 8); if (v.length > 4) v = v.slice(0, 2) + "/" + v.slice(2, 4) + "/" + v.slice(4); else if (v.length > 2) v = v.slice(0, 2) + "/" + v.slice(2); inp.value = v; }); }
function buildPlan(f) {
  const n = Math.max(1, Math.min(15, +f.days || 3)), low = f.mobility === "low", kidsN = (+f.kids || 0) > 0;
  const maxTrips = !f.trips ? 0 : n >= 11 ? 3 : n >= 8 ? 2 : n >= 5 ? 1 : 0;
  const score = d => d.tags.filter(t => f.interests.includes(t)).length * 3 + (kidsN && d.kids ? 2 : 0) - (kidsN && !d.kids ? 2 : 0) - (low ? d.effort : 0) + (f.pace === "relaxed" ? -d.effort * .5 : 0);
  let pool = DAYS.filter(d => d.id !== "d1" && d.id !== "d16" && !(low && d.effort >= 3));
  if (!f.interests.includes("jewish")) pool = pool.filter(d => d.id !== "d15");
  pool.sort((a, b) => score(b) - score(a));
  const sel = [DAYS[0]]; let trips = 0;
  for (const d of pool) { if (sel.length >= n) break; if (d.trip) { if (trips >= maxTrips) continue; trips++; } sel.push(d); }
  while (sel.length < n) sel.push(DAYS[15]);
  const first = sel.shift(), heavy = sel.filter(d => d.effort >= 3), rest = sel.filter(d => d.effort < 3), out = [first];
  while (heavy.length || rest.length) { if (rest.length) out.push(rest.shift()); if (heavy.length) out.push(heavy.shift()); }
  return out.slice(0, n);
}
function renderRoutes(el) {
  const f0 = store.get("plan", { days: 3, adults: 2, kids: 0, kidsAges: "", seniors: 0, mobility: "mid", pace: "mid", hotel: "syntagma", start: "", interests: ["history", "food"], trips: false, who: "couple", stroller: false, note: "" });
  el.innerHTML = hero("מסלולים מומלצים לפי מספר ימים (1–15)", "ענו על כמה שאלות והאפליקציה תבנה מסלול שמתחשב בהרכב הנוסעים, בתחומי העניין, ברמת ההליכה ובמיקום המלון.") +
    `<div class="box" style="--cc:#3949ab"><h3>שאלון קצר</h3><div class="f">
    <div><label>מספר ימים (1–15)</label><input id="p_days" type="number" min="1" max="15" value="${f0.days}"></div>
    <div><label>תאריך הגעה (DD/MM/YYYY)</label><input id="p_start" type="text" inputmode="numeric" placeholder="DD/MM/YYYY" value="${esc(f0.start)}"></div>
    <div><label>מבוגרים</label><input id="p_adults" type="number" min="1" value="${f0.adults}"></div>
    <div><label>ילדים (עד 17)</label><input id="p_kids" type="number" min="0" value="${f0.kids}"></div>
    <div><label>גילאי הילדים</label><input id="p_ages" type="text" placeholder="למשל 4, 9" value="${esc(f0.kidsAges)}"></div>
    <div><label>מבוגרים 65+</label><input id="p_sen" type="number" min="0" value="${f0.seniors}"></div>
    <div><label>רמת הליכה</label><select id="p_mob"><option value="low">מעט הליכה / ללא עליות</option><option value="mid">בינונית</option><option value="high">הליכה רבה — אין בעיה</option></select></div>
    <div><label>קצב הטיול</label><select id="p_pace"><option value="relaxed">רגוע</option><option value="mid">בינוני</option><option value="busy">אינטנסיבי</option></select></div>
    <div><label>אזור המלון</label><select id="p_hotel">${HOTEL_AREAS.map(h => `<option value="${h[1]}">${h[0]}</option>`).join("")}</select></div>
    <div><label>אופי הביקור</label><select id="p_who"><option value="couple">זוג</option><option value="family">משפחה</option><option value="friends">חברים</option><option value="solo">לבד</option></select></div>
    </div><label style="margin:10px 0 4px;font-weight:700;font-size:13px">תחומי עניין</label><div class="chips" id="p_int">${INTERESTS.map(i => `<button type="button" class="chip${f0.interests.includes(i[0]) ? " on" : ""}" data-v="${i[0]}" style="--cc:#3949ab">${i[1]}</button>`).join("")}</div>
    <div class="chips"><button type="button" class="chip${f0.trips ? " on" : ""}" id="p_trips" style="--cc:#3949ab">🚌 כלול טיולי יום מחוץ לעיר</button><button type="button" class="chip${f0.stroller ? " on" : ""}" id="p_str" style="--cc:#3949ab">👶 עגלה / כיסא גלגלים</button></div>
    <div class="acts" style="margin-top:12px"><button class="btn" id="p_go" style="--cc:#3949ab">🧭 בנה לי מסלול</button></div></div><div id="plan"></div>`;
  $("#p_mob").value = f0.mobility; $("#p_pace").value = f0.pace; $("#p_hotel").value = f0.hotel; $("#p_who").value = f0.who; maskDate($("#p_start"));
  $$("#p_int .chip").forEach(b => b.onclick = () => b.classList.toggle("on")); $("#p_trips").onclick = e => e.target.classList.toggle("on"); $("#p_str").onclick = e => e.target.classList.toggle("on");
  const go = () => {
    const f = { days: Math.max(1, Math.min(15, +$("#p_days").value || 3)), start: $("#p_start").value, adults: +$("#p_adults").value || 1, kids: +$("#p_kids").value || 0, kidsAges: $("#p_ages").value, seniors: +$("#p_sen").value || 0, mobility: $("#p_mob").value, pace: $("#p_pace").value, hotel: $("#p_hotel").value, who: $("#p_who").value, interests: $$("#p_int .chip.on").map(b => b.dataset.v), trips: $("#p_trips").classList.contains("on"), stroller: $("#p_str").classList.contains("on") };
    store.set("plan", f); showPlan(f);
  };
  $("#p_go").onclick = go; if (store.get("plan", null)) showPlan(f0);
}
function showPlan(f) {
  const days = buildPlan(f), sd = parseDmy(f.start), box = $("#plan");
  const free = ["01/11/2026", "06/12/2026", "03/01/2027", "07/02/2027", "07/03/2027"];
  const notes = [];
  if ((+f.kids) > 0) notes.push("יש ילדים בקבוצה — נבחרו ימים מתאימים יותר, עם הפסקות בפארקים ובגן. הכניסה לאקרופוליס חינם לילדים מתחת ל-18 (מחוץ לאיחוד האירופי).");
  if (f.mobility === "low" || f.stroller || f.seniors > 0) notes.push("הליכה מוגבלת: הימנעו מעליות רבות — באקרופוליס יש מעלית לנגישות (פרטים באתר), והכניסה לפילופאפוס/ארופגוס הושמטה. רוב הנסיעות מומלצות במונית קצרה או במטרו.");
  if (f.pace === "busy") notes.push("קצב אינטנסיבי: מומלץ להקדים ל-08:00 בכל יום ולשלב מונית בין אתרים.");
  box.innerHTML = `<h3 style="margin:12px 4px 6px">המסלול שלכם — ${days.length} ${days.length === 1 ? "יום" : "ימים"}</h3>` + notes.map(n => `<div class="note">${esc(n)}</div>`).join("") +
    days.map((d, i) => {
      const dt = sd ? new Date(sd.getFullYear(), sd.getMonth(), sd.getDate() + i) : null; const dstr = dt ? dmy(dt) : "";
      const hs = HOTEL_AREAS.find(h => h[1] === f.hotel)[1];
      let how = d.trip ? d.startText : (d.start ? routeText(hs, d.start) : ""); if (!d.trip && hs === d.start) how = "המלון קרוב — אפשר ללכת ברגל";
      const extra = [];
      if (dt && dt.getDay() === 0 && d.notSunday) extra.push("ביום ראשון השוק סגור — החליפו עם יום אחר.");
      if (dt && dt.getDay() === 0 && d.sunday) extra.push("ביום ראשון בשעה 11:00 מתקיים טקס חילופי המשמר המלא.");
      if (dt && free.includes(dstr) && d.sites.length) extra.push("היום ראשון הראשון בחודש (נוב׳–מרץ): כניסה חינם לאתרים הממלכתיים — אבל עמוס מאוד, הגיעו מוקדם.");
      return `<div class="box day" style="--cc:#3949ab"><h3><span>יום ${i + 1}: ${esc(d.t)}</span>${dstr ? `<span class="tag p">${dstr}</span>` : ""}</h3>
      <div class="row"><span class="tag ${d.effort >= 3 ? "r" : d.effort === 2 ? "o" : "g"}">${["", "הליכה קלה", "הליכה בינונית", "הליכה ועליות"][d.effort]}</span>${d.trip ? '<span class="tag p">טיול יום</span>' : ""}</div>
      ${how ? `<p class="short">🚇 <b>מהמלון:</b> ${esc(how)}</p>` : ""}
      ${d.slots.filter(s => s[1] !== "—").map(s => `<div class="slot"><b>${s[0]}</b><span>${esc(s[1])}</span></div>`).join("")}
      ${extra.map(e => `<div class="note">${esc(e)}</div>`).join("")}</div>`; }).join("") +
    `<p class="note">המסלול הוא הצעה — שעות ומחירים מופיעים בכרטיסי האתרים. בקיץ אפשר להאריך יום; בחורף הערבים מוקדמים (שקיעה בסביבות 17:00).</p>`;
  box.scrollIntoView({ behavior: "smooth", block: "start" });
}

/* ===== אירועים ===== */
function renderEvents(el, soft) {
  const types = [...new Set(EVENTS.map(e => e.type))];
  if (!soft) el.innerHTML = hero("אירועי תרבות, קונצרטים וספורט", "הופעות ואירועים קרובים באתונה — ולוחות משחקים באתרי הקבוצות.") + `<div class="fbar">${searchBox("events", "חיפוש אירוע")}${chipRow("events", "type", types.map(t => [t, t]))}</div><div id="lst"></div>
    <div class="box" style="--cc:#ad1457"><h3>רכישת כרטיסים</h3><div class="row">${EVENT_LINKS.map(l => `<a class="btn" style="--cc:#ad1457" target="_blank" rel="noopener" href="${l.web}">🎟️ ${esc(l.he)}</a>`).join("")}</div></div>
    <div class="box" style="--cc:#ad1457"><h3>ספורט — משחקי הבית</h3><div class="row">${SPORT_LINKS.map(l => `<a class="btn" style="--cc:#ad1457" target="_blank" rel="noopener" href="${l.web}">⚽🏀 ${esc(l.he)} — ${esc(l.note)}</a>`).join("")}</div><p class="note">אין כאן תאריכי משחקים — בדקו בלוח הקבוצות לפני ההגעה.</p></div><p class="note">${EVENT_NOTE}</p>`;
  const q = fget("events", "q", "").trim().toLowerCase(), ty = fget("events", "type", []), now = new Date(); now.setHours(0, 0, 0, 0);
  const list = EVENTS.map(e => ({ ...e, dt: parseDmy(e.d) })).filter(e => e.dt >= now && (!q || (e.t + e.venue).toLowerCase().includes(q)) && (!ty.length || ty.includes(e.type))).sort((a, b) => a.dt - b.dt);
  $("#lst").innerHTML = list.map(e => `<div class="box" style="--cc:#ad1457"><div class="row"><span class="tag p">${e.d}</span>${e.h ? `<span class="tag">${e.h}</span>` : ""}<span class="tag o">${esc(e.type)}</span></div><h3 style="margin-top:6px">${esc(e.t)}</h3><p class="short">📍 ${esc(e.venue)}</p></div>`).join("") || "<p>אין אירועים שנמצאו בתאריכים הקרובים.</p>";
  if (!soft) bindFilters(el, () => renderEvents($("#view"), true));
}

/* ===== מידע ומזג אוויר ===== */
let WX = store.get("wx", null);
async function loadWeather() {
  try {
    const r = await fetch("https://api.open-meteo.com/v1/forecast?latitude=37.98&longitude=23.73&current=temperature_2m,apparent_temperature,weather_code,wind_speed_10m,relative_humidity_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset&timezone=Europe%2FAthens&forecast_days=7");
    if (!r.ok) throw 0; WX = await r.json(); WX._t = Date.now(); store.set("wx", WX); return true;
  } catch (e) { return false; }
}
const wxo = c => WMO[c] || WMO[Math.floor(c / 10) * 10] || ["🌡️", "—"];
function renderInfo(el) {
  el.innerHTML = hero("מידע לתייר ומזג אוויר", "תחזית לאתונה להיום ולימים הבאים, ועובדות שימושיות.") + `<div id="wxbox"></div><div class="box" style="--cc:#0288d1"><h3>🕒 השעה באתונה</h3><p id="clock" class="pr" style="font-size:22px"></p></div>
  <div class="box" style="--cc:#0288d1"><h3>עובדות שימושיות</h3>${dl(INFO_FACTS)}</div><div class="box" style="--cc:#0288d1"><h3>חיוג חירום</h3><p>112 (חירום כללי) · 100 משטרה · 166 אמבולנס · 199 כיבוי · 1571 משטרת תיירים</p></div>`;
  const draw = () => {
    const b = $("#wxbox"); if (!b) return; if (!WX || !WX.current) { b.innerHTML = '<p class="note">אין חיבור לאינטרנט — לא ניתן להציג תחזית. לחצו על ״ריענון״ כשיש חיבור.</p>'; return; }
    const c = WX.current, o = wxo(c.weather_code), dn = ["א׳", "ב׳", "ג׳", "ד׳", "ה׳", "ו׳", "ש׳"];
    b.innerHTML = `<div class="nowwx"><span class="big">${o[0]}</span><div><b>${Math.round(c.temperature_2m)}°C</b><div>${o[1]} · מורגש ${Math.round(c.apparent_temperature)}°</div><div>רוח ${Math.round(c.wind_speed_10m)} קמ״ש · לחות ${c.relative_humidity_2m}%</div></div></div>
     <div class="wx">${WX.daily.time.map((t, i) => { const d = new Date(t + "T12:00:00"), oo = wxo(WX.daily.weather_code[i]); return `<div class="wd"><div>${i === 0 ? "היום" : "יום " + dn[d.getDay()]}<br><small>${dmy(d).slice(0, 5)}</small></div><div class="big">${oo[0]}</div><b>${Math.round(WX.daily.temperature_2m_max[i])}°</b><div>${Math.round(WX.daily.temperature_2m_min[i])}°</div><small>🌧 ${WX.daily.precipitation_probability_max[i] ?? 0}%</small></div>`; }).join("")}</div>
     <p class="note">זריחה ${WX.daily.sunrise[0].slice(11)} · שקיעה ${WX.daily.sunset[0].slice(11)} · מקור: Open-Meteo. עודכן ${new Date(WX._t).toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" })}</p>`;
  };
  draw(); if (!WX || Date.now() - WX._t > 3600e3) loadWeather().then(draw);
  const clk = () => { const c = $("#clock"); if (c) c.textContent = new Date().toLocaleTimeString("he-IL", { timeZone: "Europe/Athens", hour: "2-digit", minute: "2-digit" }); }; clk();
  clearInterval(window._clk); window._clk = setInterval(clk, 15000);
}

/* ===== ניווט ===== */
const RENDER = { map: renderMap, sites: el => renderSites(el, false), hotels: el => renderHotels(el, false), transport: renderTransport, rest: el => renderRest(el, false), food: el => renderFood(el, false), shop: renderShop, markets: el => renderMarkets(el, false), tips: renderTips, routes: renderRoutes, events: el => renderEvents(el, false), info: renderInfo };
function show(id) {
  cur = id; store.set("tab", id);
  $$(".tab").forEach(b => b.classList.toggle("on", b.dataset.t === id));
  const t = TABS.find(x => x.id === id); document.documentElement.style.setProperty("--cc", t.c);
  const v = $("#view"); v.innerHTML = ""; v.style.setProperty("--cc", t.c);
  RENDER[id](v); window.scrollTo({ top: 0 });
  const on = $(".tab.on"); on && on.scrollIntoView({ inline: "center", block: "nearest" });
}
async function refreshAll() {
  const b = $("#refresh"); b.classList.add("spin"); IMG = {}; store.set("img", {});
  const ok = await loadWeather();
  try { const reg = await navigator.serviceWorker?.getRegistration(); reg && reg.update(); } catch (e) { }
  b.classList.remove("spin"); show(cur);
  toast(ok ? "עודכן ב-" + dmy(new Date()) + " " + new Date().toLocaleTimeString("he-IL", { hour: "2-digit", minute: "2-digit" }) + " — מזג אוויר ותמונות. מחירים ושעות: אמתו באתר הרשמי." : "אין חיבור לאינטרנט — מוצג המידע השמור.", 4200);
}
function init() {
  $("#tabs").innerHTML = TABS.map(t => `<button class="tab" data-t="${t.id}" style="--tc:${t.c}"><span>${t.i}</span>${t.t}</button>`).join("");
  $$(".tab").forEach(b => b.onclick = () => show(b.dataset.t));
  $("#refresh").onclick = refreshAll;
  $("#ver").textContent = APP_VERSION;
  if (!TABS.some(t => t.id === cur)) cur = "map";
  show(cur);
  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) navigator.serviceWorker.register("sw.js").catch(() => { });
}
document.addEventListener("DOMContentLoaded", init);
