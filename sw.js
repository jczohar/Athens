const VER = "athens-20261110-01";
const SHELL = ["./", "index.html", "style.css", "data.js", "app.js", "manifest.json", "icon.svg", "icon-192.png", "icon-512.png"];
self.addEventListener("install", e => { e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL).catch(() => { })).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url);
  /* נתונים חיים (מזג אוויר, ויקיפדיה API): רשת קודם, ואם אין — מהמטמון */
  if (u.hostname.includes("open-meteo.com") || u.pathname.includes("/api/") || u.pathname.includes("api.php")) {
    e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(VER).then(c => c.put(r, cp)); return res; }).catch(() => caches.match(r)));
    return;
  }
  /* שאר הקבצים: מטמון קודם, ועדכון ברקע */
  e.respondWith(caches.match(r).then(hit => {
    const net = fetch(r).then(res => { if (res && (res.ok || res.type === "opaque")) { const cp = res.clone(); caches.open(VER).then(c => c.put(r, cp)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
