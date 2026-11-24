/* Service Worker — مركز رحيم البيطري
   يجعل الموقع والتطبيق يفتحان بسرعة ويعملان دون إنترنت (عرض المعلومات فقط؛ الحجز يحتاج اتصالاً).
   غيّر رقم VERSION عند كل تحديث للملفات. */
const VERSION = 'raheem-v12';
const PRECACHE = [
  './', 'index.html', 'manifest.webmanifest',
  'assets/css/custom.css?v=12', 'assets/js/config.js?v=12', 'assets/js/db.js?v=12', 'assets/js/data.js?v=12', 'assets/js/app.js?v=12',
  'images/logo.jpg', 'images/icons/icon-192.png', 'images/icons/icon-512.png',
  'images/clinic-front.jpg', 'images/waiting-area.jpg'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  // لا نخزّن طلبات قاعدة البيانات أو الخرائط
  if (/supabase\.co|google\.com|googleapis\.com\/maps|wa\.me/.test(url.hostname)) return;

  // الصفحات: الشبكة أولاً ثم النسخة المحفوظة
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const copy = res.clone(); caches.open(VERSION).then(c => c.put('index.html', copy)); return res; })
      .catch(() => caches.match('index.html')));
    return;
  }

  // باقي الملفات (صور، خطوط، مكتبات): المحفوظ أولاً ثم تحديثه في الخلفية
  e.respondWith(caches.match(req).then(cached => {
    const net = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(req, copy)); }
      return res;
    }).catch(() => cached);
    return cached || net;
  }));
});
