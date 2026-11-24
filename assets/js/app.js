/* ==========================================================
   مركز رحيم البيطري — منطق الواجهة الأمامية (بدون خادم)
   الأقسام: الترجمة · الروابط · الخدمات · الحجز ·
            ملف الحيوان · المعرض · المدونة · التواصل · عام
   ========================================================== */
'use strict';

/* ======================= أدوات مساعدة ======================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const store = {
  get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
  set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) { /* التخزين غير متاح */ } }
};
let LANG = store.get('raheem_lang', 'ar') === 'en' ? 'en' : 'ar';

const t = (k, vars) => {
  let s = (UI[LANG] && UI[LANG][k]) ?? UI.ar[k] ?? k;
  if (vars) Object.keys(vars).forEach(v => { s = s.split('{' + v + '}').join(vars[v]); });
  return s;
};
const L = obj => (obj ? (obj[LANG] ?? obj.ar) : '');
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const icons = () => { if (window.lucide) window.lucide.createIcons(); };
const money = n => `${Number(n).toFixed(2)} ${L(CLINIC.currency)}`;
const pad = n => String(n).padStart(2, '0');

/* ---- التواريخ (بالتوقيت المحلي) ---- */
const loc = () => (LANG === 'ar' ? 'ar-JO-u-nu-latn' : 'en-GB');
const today = () => { const d = new Date(); d.setHours(0, 0, 0, 0); return d; };
const toISO = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const parseISO = s => { const [y, m, d] = String(s).split('-').map(Number); return new Date(y, m - 1, d); };
const addDays = (d, n) => new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, d.getDate());
const daysBetween = (a, b) => Math.round((b - a) / 86400000);
const fmtDate = (d, o = { day: 'numeric', month: 'long', year: 'numeric' }) => new Intl.DateTimeFormat(loc(), o).format(d);
const fmtTime = (h, m) => new Intl.DateTimeFormat(loc(), { hour: 'numeric', minute: '2-digit', hour12: true }).format(new Date(2000, 0, 1, h, m));
const dayName = (i, style = 'long') => fmtDate(new Date(2024, 0, 7 + i), { weekday: style }); // 7 يناير 2024 = الأحد

/* وحدات زمنية بصيغة عربية صحيحة (مفرد/مثنى/جمع) */
function unit(n, kind) {
  const ar = { y: ['سنة', 'سنتان', 'سنوات', 'سنة'], m: ['شهر', 'شهران', 'أشهر', 'شهراً'], d: ['يوم', 'يومان', 'أيام', 'يوماً'], w: ['أسبوع', 'أسبوعان', 'أسابيع', 'أسبوعاً'] };
  const en = { y: ['year', 'years'], m: ['month', 'months'], d: ['day', 'days'], w: ['week', 'weeks'] };
  if (LANG === 'en') return `${n} ${n === 1 ? en[kind][0] : en[kind][1]}`;
  const f = ar[kind];
  if (n === 1) return f[0];
  if (n === 2) return f[1];
  if (n >= 3 && n <= 10) return `${n} ${f[2]}`;
  return `${n} ${f[3]}`;
}

const normPhone = p => String(p || '').replace(/[^\d+]/g, '');
const validPhone = p => /^(?:\+?962|0)?7[789]\d{7}$/.test(normPhone(p));
const waLink = text => `https://wa.me/${CLINIC.whatsapp}?text=${encodeURIComponent(text)}`;

/* ======================= إشعارات ونوافذ ======================= */
function toast(msg, type = 'ok', action) {
  const el = document.createElement('div');
  el.className = `pointer-events-auto flex items-center gap-2 rounded-2xl px-4 py-3 shadow-xl text-sm font-bold text-white transition duration-300 opacity-0 -translate-y-2 ${type === 'err' ? 'bg-red-500' : 'bg-brand-navy'}`;
  el.innerHTML = `<i data-lucide="${type === 'err' ? 'circle-alert' : 'circle-check'}" class="w-5 h-5 ${type === 'err' ? '' : 'text-sun'}"></i><span></span>`;
  el.querySelector('span').textContent = msg;
  if (action) {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'ms-2 rounded-lg bg-white/15 hover:bg-white/25 px-3 py-1 text-xs font-extrabold text-sun';
    b.textContent = action.label; b.addEventListener('click', () => { el.remove(); action.fn(); });
    el.append(b);
  }
  $('#toasts').append(el);
  icons();
  requestAnimationFrame(() => el.classList.remove('opacity-0', '-translate-y-2'));
  setTimeout(() => { el.classList.add('opacity-0'); setTimeout(() => el.remove(), 300); }, 3000);
}

let lastFocus = null;
function lockScroll(on) { document.body.style.overflow = on ? 'hidden' : ''; }
function openModal(html, onClose) {
  lastFocus = document.activeElement;
  $('#modalBody').innerHTML = html;
  $('#modal').classList.remove('hidden');
  $('#modal')._onClose = onClose || null;
  lockScroll(true);
  icons();
  $('#modalScroll').scrollTop = 0;
  setTimeout(() => { const b = $('#modal [data-close-modal].absolute'); b && b.focus({ preventScroll: true }); }, 30);
}
function closeModal() {
  if ($('#modal').classList.contains('hidden')) return;
  $('#modal').classList.add('hidden');
  lockScroll(false);
  if (typeof $('#modal')._onClose === 'function') $('#modal')._onClose();
  lastFocus && lastFocus.focus && lastFocus.focus({ preventScroll: true });
}

/* ملف تقويم (.ics) يعمل مع Google وApple وOutlook */
function downloadICS({ uid, title, start, minutes = 30, allDay = false, desc = '', trigger = '-PT2H', filename = 'raheem-reminder.ics' }) {
  const e = s => String(s).replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
  const d8 = d => toISO(d).replace(/-/g, '');
  const dt = d => `${d8(d)}T${pad(d.getHours())}${pad(d.getMinutes())}00`;
  const stamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const lines = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Raheem Pet Care Center//Website//AR', 'CALSCALE:GREGORIAN', 'BEGIN:VEVENT',
    `UID:${uid}@raheem-pet-care`, `DTSTAMP:${stamp}`];
  if (allDay) lines.push(`DTSTART;VALUE=DATE:${d8(start)}`, `DTEND;VALUE=DATE:${d8(addDays(start, 1))}`);
  else lines.push(`DTSTART:${dt(start)}`, `DTEND:${dt(new Date(start.getTime() + minutes * 60000))}`);
  lines.push(`SUMMARY:${e(title)}`, `DESCRIPTION:${e(desc)}`, `LOCATION:${e(EN['brand.name'] + ' - ' + CLINIC.mapQuery)}`,
    'BEGIN:VALARM', 'ACTION:DISPLAY', `DESCRIPTION:${e(title)}`, `TRIGGER:${trigger}`, 'END:VALARM', 'END:VEVENT', 'END:VCALENDAR');
  const blob = new Blob([lines.join('\r\n')], { type: 'text/calendar;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.append(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}

/* ======================= الترجمة والاتجاه ======================= */
function applyStatic() {
  $$('[data-i18n]').forEach(el => {
    if (el.dataset.ar === undefined) el.dataset.ar = el.innerHTML;
    const v = EN[el.dataset.i18n];
    el.innerHTML = LANG === 'en' && v !== undefined ? v : el.dataset.ar;
  });
  [['i18nPh', 'placeholder'], ['i18nAria', 'aria-label'], ['i18nAlt', 'alt']].forEach(([key, attr]) => {
    $$(`[data-${key.replace(/[A-Z]/g, c => '-' + c.toLowerCase())}]`).forEach(el => {
      const store = 'ar' + attr.replace(/-/g, '');
      if (el.dataset[store] === undefined) el.dataset[store] = el.getAttribute(attr) || '';
      const v = EN[el.dataset[key]];
      el.setAttribute(attr, LANG === 'en' && v !== undefined ? v : el.dataset[store]);
    });
  });
}

function setLang(lang) {
  LANG = lang;
  store.set('raheem_lang', lang);
  const html = document.documentElement;
  html.lang = lang;
  html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.title = t('meta.title');
  $('#langLabel').textContent = t('lang.label');
  applyStatic();
  renderAll();
}

/* ======================= روابط الاتصال وأوقات الدوام ======================= */
function renderLinks() {
  $$('[data-phone-link]').forEach(a => { a.href = `tel:${CLINIC.phone}`; });
  $$('[data-phone-text]').forEach(s => { s.textContent = CLINIC.phoneDisplay; });
  $$('[data-wa-text]').forEach(s => { s.textContent = CLINIC.whatsappDisplay; });
  $$('[data-wa-emergency]').forEach(a => { a.href = waLink(t('wa.emergency')); a.target = '_blank'; a.rel = 'noopener'; });
  $$('[data-wa-general]').forEach(a => { a.href = waLink(t('wa.general')); a.target = '_blank'; a.rel = 'noopener'; });
  const dp = $('#doctorPhoto');
  if (dp && CLINIC.doctorPhoto && !dp.querySelector('img')) {
    dp.insertAdjacentHTML('beforeend', `<img src="${CLINIC.doctorPhoto}" alt="د. أحمد الرعود - Dr. Ahmad Alroud" onerror="this.remove()" class="absolute inset-0 w-full h-full object-cover">`);
  }
  $$('[data-email-link]').forEach(a => { a.href = `mailto:${CLINIC.email}`; });
  $$('[data-email-text]').forEach(s => { s.textContent = CLINIC.email; });
  $$('[data-fb-link]').forEach(a => { a.href = CLINIC.facebookUrl; });
  $$('[data-maps-link]').forEach(a => { a.href = CLINIC.mapsUrl; });
  $$('[data-rating-value]').forEach(s => { s.textContent = CLINIC.googleRating.toFixed(1); });
  $$('[data-rating-count]').forEach(s => { s.textContent = CLINIC.googleReviews; });
  $$('[data-rating-label]').forEach(s => { s.textContent = LANG === 'ar' ? 'تقييماً' : 'reviews'; });
  const q = encodeURIComponent(CLINIC.mapQuery);
  const src = `https://maps.google.com/maps?q=${q}&z=16&hl=${LANG}&output=embed`;
  if ($('#mapFrame').getAttribute('src') !== src) $('#mapFrame').src = src;
  $('#directionsBtn').href = `https://www.google.com/maps/dir/?api=1&destination=${q}`;
}

function hoursLabel(h) { return h ? `${fmtTime(h[0], 0)} – ${fmtTime(h[1], 0)}` : (LANG === 'ar' ? 'مغلق' : 'Closed'); }

function renderHours() {
  const now = new Date();
  const todayIdx = now.getDay();
  const h = HOURS[todayIdx];
  const nowH = now.getHours() + now.getMinutes() / 60;
  const open = h && nowH >= h[0] && nowH < h[1];
  $('#openNowBadge').innerHTML = `<span class="w-2 h-2 rounded-full ${open ? 'bg-leaf' : 'bg-red-400'}"></span><span class="font-bold">${open ? t('open.now') : t('open.closed')}</span>${open ? `<span class="hidden sm:inline text-white/70">${t('open.until')} ${fmtTime(h[1], 0)}</span>` : ''}`;
  $('#hoursTable').innerHTML = WEEK_ORDER.map(d => `
    <tr class="${d === todayIdx ? 'bg-brand/5 font-extrabold text-brand' : 'text-slate-600'}">
      <td class="py-2 px-2 rounded-s-lg">${dayName(d)}</td>
      <td class="py-2 px-2 text-end rounded-e-lg" dir="auto">${hoursLabel(HOURS[d])}</td>
    </tr>`).join('');
  $('#footerHours').innerHTML = WEEK_ORDER.map(d => `<li class="flex justify-between gap-3 ${d === todayIdx ? 'text-sun font-bold' : ''}"><span>${dayName(d)}</span><span>${hoursLabel(HOURS[d])}</span></li>`).join('');
}

/* ======================= الخدمات ======================= */
function renderServices() {
  $('#servicesGrid').innerHTML = SERVICES.map(s => {
    const c = COLORS[s.color]; const x = L(s);
    return `
    <article class="reveal group relative bg-white rounded-3xl border border-slate-100 shadow-soft p-6 flex flex-col hover:-translate-y-1 hover:shadow-xl transition duration-300">
      <span class="absolute top-0 inset-x-8 h-1 rounded-b-full ${c.solid} opacity-0 group-hover:opacity-100 transition"></span>
      <div class="flex items-start justify-between gap-3">
        <span class="w-14 h-14 rounded-2xl ${c.soft} ${c.text} grid place-items-center group-hover:scale-110 transition"><i data-lucide="${s.icon}" class="w-7 h-7"></i></span>
        <span class="text-xs font-bold text-slate-400 flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i>${s.minutes} ${t('svc.min')}</span>
      </div>
      <h3 class="mt-5 text-xl font-extrabold text-brand-navy">${x.title}</h3>
      <p class="mt-2 text-slate-600 leading-relaxed">${x.desc}</p>
      <ul class="mt-4 space-y-2 text-sm text-slate-600 hidden" data-svc-points>
        ${x.points.map(p => `<li class="flex items-start gap-2"><i data-lucide="circle-check" class="w-4 h-4 mt-0.5 shrink-0 ${c.text}"></i><span>${p}</span></li>`).join('')}
      </ul>
      <div class="mt-auto pt-6 flex gap-2">
        <button type="button" data-book-service="${s.id}" class="flex-1 h-11 rounded-xl ${c.solid} text-white font-bold hover:opacity-90 inline-flex items-center justify-center gap-2"><i data-lucide="calendar-plus" class="w-4 h-4"></i>${t('svc.book')}</button>
        <button type="button" data-toggle-svc class="h-11 px-4 rounded-xl border border-slate-200 font-bold text-slate-600 hover:border-brand hover:text-brand" aria-expanded="false">${t('svc.more')}</button>
      </div>
    </article>`;
  }).join('');
  $('#footerServices').innerHTML = SERVICES.map(s => `<li><a href="#services" class="hover:text-sun">${L(s).title}</a></li>`).join('');
}

/* ======================= نظام الحجز ======================= */
const bk = { step: 1, pet: null, service: null, date: null, time: null };
let bookings = store.get('raheem_bookings', []);
const remoteTaken = {}; // الأوقات المحجوزة من قاعدة البيانات لكل يوم

function loadRemoteSlots(iso) {
  if (!DB.enabled) return;
  DB.bookedSlots(iso).then(list => {
    remoteTaken[iso] = list;
    if (bk.date === iso) { if (list.includes(bk.time)) bk.time = null; renderSlots(); renderSummary(); }
  }).catch(() => {});
}

function renderPetTypes() {
  $('#petTypeOptions').innerHTML = PET_TYPES.map(p => {
    const on = bk.pet === p.id;
    return `<button type="button" data-pet="${p.id}" aria-pressed="${on}" class="h-24 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 font-bold transition ${on ? 'border-brand bg-brand/5 text-brand' : 'border-slate-200 text-slate-700 hover:border-brand/40'}">
      <i data-lucide="${p.icon}" class="w-8 h-8"></i><span>${L(p)}</span></button>`;
  }).join('');
}

function renderBkServices() {
  $('#bkServiceOptions').innerHTML = SERVICES.map(s => {
    const on = bk.service === s.id; const c = COLORS[s.color];
    return `<button type="button" data-bk-service="${s.id}" aria-pressed="${on}" class="p-3 rounded-2xl border-2 text-start flex items-center gap-3 transition ${on ? 'border-brand bg-brand/5' : 'border-slate-200 hover:border-brand/40'}">
      <span class="w-10 h-10 shrink-0 rounded-xl ${c.soft} ${c.text} grid place-items-center"><i data-lucide="${s.icon}" class="w-5 h-5"></i></span>
      <span class="text-sm font-bold leading-snug ${on ? 'text-brand' : 'text-slate-700'}">${L(s).title}</span></button>`;
  }).join('');
}

function renderDates() {
  const base = today(); let html = '';
  for (let i = 0; i < 21; i++) {
    const d = addDays(base, i); const iso = toISO(d); const closed = !HOURS[d.getDay()]; const on = bk.date === iso;
    const top = i === 0 ? t('bk.today') : i === 1 ? t('bk.tomorrow') : fmtDate(d, { weekday: 'short' });
    html += `<button type="button" data-date="${iso}" ${closed ? 'disabled' : ''} class="shrink-0 w-[76px] py-2.5 rounded-2xl border-2 text-center transition ${closed ? 'opacity-40 cursor-not-allowed border-slate-100' : on ? 'border-brand bg-brand text-white shadow-glow' : 'border-slate-200 hover:border-brand/40'}">
      <span class="block text-xs font-bold ${on ? 'text-white/90' : 'text-slate-500'}">${top}</span>
      <span class="block text-2xl font-black leading-tight">${d.getDate()}</span>
      <span class="block text-xs ${on ? 'text-white/90' : 'text-slate-500'}">${fmtDate(d, { month: 'short' })}</span></button>`;
  }
  $('#bkDates').innerHTML = html;
}

function slotsFor(iso) {
  const d = parseISO(iso); const h = HOURS[d.getDay()]; if (!h) return [];
  const taken = bookings.filter(b => b.date === iso).map(b => b.time).concat(remoteTaken[iso] || []);
  const now = new Date(); const isToday = iso === toISO(now);
  const out = [];
  for (let m = h[0] * 60; m + CLINIC.slotMinutes <= h[1] * 60; m += CLINIC.slotMinutes) {
    const hh = Math.floor(m / 60), mm = m % 60; const key = `${pad(hh)}:${pad(mm)}`;
    const past = isToday && (hh * 60 + mm) <= (now.getHours() * 60 + now.getMinutes() + 15);
    out.push({ key, hh, mm, past, taken: taken.includes(key) });
  }
  return out;
}

function renderSlots() {
  const wrap = $('#bkSlots');
  $('#bkHoursNote').textContent = bk.date ? hoursLabel(HOURS[parseISO(bk.date).getDay()]) : '';
  if (!bk.date) { wrap.innerHTML = `<p class="col-span-full text-sm text-slate-500 bg-slate-50 rounded-xl p-4">${t('bk.pickDate')}</p>`; return; }
  const slots = slotsFor(bk.date); const avail = slots.filter(s => !s.past && !s.taken);
  if (!avail.length) { wrap.innerHTML = `<p class="col-span-full text-sm text-slate-500 bg-slate-50 rounded-xl p-4">${slots.length ? t('bk.noSlots') : t('bk.closed')}</p>`; return; }
  wrap.innerHTML = slots.filter(s => !s.past).map(s => {
    const on = bk.time === s.key;
    return `<button type="button" data-time="${s.key}" ${s.taken ? 'disabled' : ''} class="h-11 rounded-xl border-2 text-sm font-bold transition ${s.taken ? 'border-slate-100 text-slate-300 line-through cursor-not-allowed' : on ? 'border-brand bg-brand text-white' : 'border-slate-200 hover:border-brand/40 text-slate-700'}" dir="ltr">${s.taken ? t('bk.taken') : fmtTime(s.hh, s.mm)}</button>`;
  }).join('');
}

function bkLabels(b) {
  const pet = PET_TYPES.find(p => p.id === b.pet); const svc = SERVICES.find(s => s.id === b.service);
  let time = '';
  if (b.time) { const [hh, mm] = b.time.split(':').map(Number); time = fmtTime(hh, mm); }
  return {
    pet: pet ? L(pet) + (b.petName ? ` — ${b.petName}` : '') : '',
    service: svc ? L(svc).title : '',
    date: b.date ? fmtDate(parseISO(b.date), { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : '',
    time
  };
}

function renderSummary() {
  const lab = bkLabels({ ...bk, petName: $('#bkPetName').value.trim() });
  const row = (icon, k, v) => `<div class="flex items-start gap-3"><dt class="w-8 h-8 shrink-0 rounded-lg bg-white/10 grid place-items-center"><i data-lucide="${icon}" class="w-4 h-4 text-sun"></i></dt><dd><span class="block text-white/60 text-xs">${t(k)}</span><b class="${v ? '' : 'text-white/40'}">${v ? esc(v) : t('bk.notSet')}</b></dd></div>`;
  $('#bkSummary').innerHTML = row('paw-print', 'bk.pet', lab.pet) + row('stethoscope', 'bk.service', lab.service) + row('calendar', 'bk.date', lab.date) + row('clock', 'bk.time', lab.time);
  icons();
}

function renderMyBookings() {
  const t0 = toISO(today());
  const list = [...bookings].sort((a, b) => (a.date + a.time).localeCompare(b.date + b.time));
  const upcoming = list.filter(b => b.date >= t0); const past = list.filter(b => b.date < t0).slice(-3);
  if (!list.length) { $('#myBookings').innerHTML = `<p class="text-slate-500">${t('bk.none')}</p>`; return; }
  $('#myBookings').innerHTML = [...upcoming, ...past].map(b => {
    const lab = bkLabels(b); const isPast = b.date < t0;
    return `<div class="rounded-xl border border-slate-100 p-3 ${isPast ? 'opacity-50' : 'bg-sand/50'}">
      <div class="flex justify-between gap-2"><b class="text-brand-navy">${esc(lab.service)}</b><span class="text-xs text-slate-400" dir="ltr">${b.ref}</span></div>
      <div class="text-slate-500 text-xs mt-1">${esc(lab.date)} · <span dir="ltr">${lab.time}</span></div>
      <div class="flex justify-between items-center mt-2 text-xs"><span class="text-slate-500">${esc(lab.pet)}</span>
      ${isPast ? `<span>${t('bk.past')}</span>` : `<button type="button" data-cancel-booking="${b.ref}" class="text-red-500 font-bold hover:underline">${t('bk.cancel')}</button>`}</div></div>`;
  }).join('');
}

function showStep(n) {
  bk.step = n;
  $$('[data-step-panel]').forEach(p => p.classList.toggle('hidden', Number(p.dataset.stepPanel) !== n));
  $$('[data-step-ind]').forEach(li => {
    const i = Number(li.dataset.stepInd);
    li.querySelector('.bg-brand').style.width = i <= n ? '100%' : '0';
    const lbl = li.querySelector('span.block');
    lbl.classList.toggle('text-brand', i === n); lbl.classList.toggle('text-brand-navy', i < n); lbl.classList.toggle('text-slate-400', i > n);
  });
  $('#bkPrev').classList.toggle('invisible', n === 1);
  $('#bkNext').classList.toggle('hidden', n === 3);
  $('#bkSubmit').classList.toggle('hidden', n !== 3);
}

function showErr(key, on) { const el = $(`[data-error="${key}"]`); el && el.classList.toggle('hidden', !on); }

function validateStep(n) {
  let ok = true;
  if (n === 1) { showErr('pet', !bk.pet); ok = !!bk.pet; }
  if (n === 2) {
    showErr('service', !bk.service); showErr('date', !bk.date); showErr('time', !bk.time);
    ok = bk.service && bk.date && bk.time;
  }
  if (n === 3) {
    const nm = $('#bkName').value.trim().length >= 2; const ph = validPhone($('#bkPhone').value);
    showErr('name', !nm); showErr('phone', !ph);
    $('#bkName').classList.toggle('border-red-400', !nm); $('#bkPhone').classList.toggle('border-red-400', !ph);
    ok = nm && ph;
  }
  return !!ok;
}

function bookingWaText(b) {
  const lab = bkLabels(b);
  const ageOpt = $(`#bkPetAge option[value="${b.petAge}"]`);
  const lines = [t('bk.waIntro'), '',
    `• ${t('bk.ref')}: ${b.ref}`, `• ${t('bk.service')}: ${lab.service}`,
    `• ${t('bk.pet')}: ${lab.pet}${b.petAge && ageOpt ? ` (${ageOpt.textContent})` : ''}`,
    `• ${t('bk.date')}: ${lab.date}`, `• ${t('bk.time')}: ${lab.time}`,
    `• ${t('bk.owner')}: ${b.name}`, `• ${t('bk.phone')}: ${b.phone}`];
  if (b.notes) lines.push(`• ${t('bk.notes')}: ${b.notes}`);
  return lines.join('\n');
}

async function submitBooking(e) {
  e.preventDefault();
  if (!validateStep(3)) return;
  if (!validateStep(2)) { showStep(2); return; }
  if ($('#bkSubmit').disabled) return;
  const b = {
    ref: 'RH-' + String(Date.now()).slice(-6), pet: bk.pet, petName: $('#bkPetName').value.trim(), petAge: $('#bkPetAge').value,
    service: bk.service, date: bk.date, time: bk.time, name: $('#bkName').value.trim(), phone: normPhone($('#bkPhone').value),
    notes: $('#bkNotes').value.trim(), created: new Date().toISOString()
  };
  if (bookings.some(x => x.date === b.date && x.time === b.time)) { toast(t('bk.taken'), 'err'); showStep(2); renderSlots(); return; }
  if (DB.enabled) {
    const btn = $('#bkSubmit'); btn.disabled = true; btn.classList.add('opacity-60');
    let res = { ok: false };
    try { res = await DB.createBooking({ ...b, lang: LANG }); } catch (err) { /* شبكة */ }
    btn.disabled = false; btn.classList.remove('opacity-60');
    if (res.conflict) {
      remoteTaken[b.date] = [...(remoteTaken[b.date] || []), b.time];
      bk.time = null; toast(t('bk.takenNow'), 'err'); showStep(2); renderSlots(); renderSummary(); return;
    }
    b.synced = !!res.ok;
  }
  bookings.push(b); store.set('raheem_bookings', bookings);
  const lab = bkLabels(b);
  const row = (k, v) => `<div class="flex justify-between gap-4 py-1.5 border-b border-wood/40 last:border-0"><dt class="text-slate-500">${t(k)}</dt><dd class="font-bold text-brand-navy text-end">${esc(v)}</dd></div>`;
  openModal(`
    <div class="p-6 sm:p-8 text-center">
      <svg class="check-anim mx-auto w-20 h-20" viewBox="0 0 52 52"><circle cx="26" cy="26" r="25" fill="#6DB33F"/><path d="M14 27 l8 8 l16-17" fill="none" stroke="#fff" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
      <h3 class="mt-4 text-2xl font-black text-brand-navy">${t('bk.successTitle')}</h3>
      <p class="mt-2 text-slate-600">${b.synced ? t('bk.syncedText') : t('bk.successText')}</p>
      <dl class="mt-5 rounded-2xl bg-sand p-4 text-start text-sm">
        ${row('bk.ref', b.ref)}${row('bk.service', lab.service)}${row('bk.pet', lab.pet)}${row('bk.date', lab.date)}${row('bk.time', lab.time)}${row('bk.owner', b.name)}${row('bk.phone', b.phone)}
      </dl>
      <div class="mt-6 grid sm:grid-cols-2 gap-3">
        <a href="${waLink(bookingWaText(b))}" target="_blank" rel="noopener" class="h-12 rounded-xl bg-[#25D366] hover:bg-[#1ebe5b] text-white font-bold inline-flex items-center justify-center gap-2"><i data-lucide="message-circle" class="w-5 h-5"></i>${t('bk.sendWa')}</a>
        <button type="button" data-ics-booking="${b.ref}" class="h-12 rounded-xl border-2 border-brand text-brand font-bold inline-flex items-center justify-center gap-2 hover:bg-brand hover:text-white"><i data-lucide="calendar-plus" class="w-5 h-5"></i>${t('bk.addCal')}</button>
      </div>
      <button type="button" data-close-modal class="mt-4 text-sm font-bold text-slate-500 hover:text-brand">${t('bk.close')}</button>
    </div>`);
  // إعادة ضبط النموذج
  Object.assign(bk, { pet: null, service: null, date: null, time: null });
  $('#bookingForm').reset();
  renderBookingAll(); showStep(1);
}

function renderBookingAll() { renderPetTypes(); renderBkServices(); renderDates(); renderSlots(); renderSummary(); renderMyBookings(); }

function prefillBooking({ service, pet, petName }) {
  if (service) bk.service = service;
  if (pet) bk.pet = pet;
  if (petName !== undefined) $('#bkPetName').value = petName;
  renderBookingAll();
  showStep(bk.pet ? 2 : 1);
  $('#booking').scrollIntoView({ behavior: 'smooth' });
  toast(t('bk.prefilled'));
}

/* ======================= ملف الحيوان الأليف ومتتبع التطعيمات ======================= */
let pets = store.get('raheem_pets', []);
let curPet = store.get('raheem_cur_pet', pets[0] ? pets[0].id : null);
const savePets = () => { store.set('raheem_pets', pets); store.set('raheem_cur_pet', curPet); };

function statusFor(due, now) {
  const d = daysBetween(now, due);
  if (d < 0) return 'overdue'; if (d === 0) return 'due'; if (d <= 14) return 'soon'; return 'upcoming';
}

function petSchedule(p) {
  const def = VAX[p.species] || VAX.other; const birth = parseISO(p.birth); const now = today(); const rec = p.records || [];
  const doneOf = key => rec.filter(r => r.key === key).map(r => parseISO(r.date)).sort((a, b) => b - a);
  const primary = def.primary.map(v => {
    const due = addDays(birth, v.weeks * 7); const done = doneOf(v.key)[0] || null;
    return { ...v, kind: 'primary', due, done, status: done ? 'done' : statusFor(due, now) };
  });
  const recurring = def.recurring.map(v => {
    const own = doneOf(v.key); const last = own[0] || null; let due = null; let status = null;
    const grp = primary.filter(x => v.groups.includes(x.group));
    if (last) due = addMonths(last, v.months);
    else if (v.requiresPrimary) {
      if (grp.length && grp.every(x => x.done)) due = addMonths(new Date(Math.max(...grp.map(x => x.done))), v.months);
      else status = 'pending';
    } else {
      const start = addDays(birth, (v.startWeeks || 0) * 7); due = start > now ? start : now;
    }
    if (!status) status = statusFor(due, now);
    return { ...v, kind: 'recurring', due, last, count: own.length, status };
  });
  return { primary, recurring };
}

function petAlerts(p) {
  const s = petSchedule(p); const now = today(); const out = [];
  [...s.primary, ...s.recurring].forEach(v => {
    if (!v.due || !['overdue', 'due', 'soon'].includes(v.status)) return;
    const d = daysBetween(now, v.due);
    const key = v.status === 'overdue' ? 'pp.alertOverdue' : v.status === 'due' ? 'pp.alertToday' : 'pp.alertSoon';
    out.push({ status: v.status, text: t(key, { n: p.name, v: L(v), d: unit(Math.abs(d), 'd') }), d });
  });
  return out.sort((a, b) => a.d - b.d);
}

function ageText(birth) {
  const b = parseISO(birth); const n = today();
  let y = n.getFullYear() - b.getFullYear(), m = n.getMonth() - b.getMonth(), d = n.getDate() - b.getDate();
  if (d < 0) { m--; d += new Date(n.getFullYear(), n.getMonth(), 0).getDate(); }
  if (m < 0) { y--; m += 12; }
  const j = LANG === 'ar' ? ' و' : ', ';
  if (y > 0) return unit(y, 'y') + (m ? j + unit(m, 'm') : '');
  if (m > 0) return unit(m, 'm') + (d ? j + unit(d, 'd') : '');
  return unit(Math.max(d, 0), 'd');
}

function humanAge(p) {
  if (!['cat', 'dog'].includes(p.species)) return null;
  const yrs = (today() - parseISO(p.birth)) / (365.25 * 864e5); const per = p.species === 'cat' ? 4 : 5;
  if (yrs <= 1) return Math.max(0, Math.round(yrs * 15));
  if (yrs <= 2) return Math.round(15 + (yrs - 1) * 9);
  return Math.round(24 + (yrs - 2) * per);
}

function nextBirthday(birth) {
  const b = parseISO(birth); const n = today();
  let nx = new Date(n.getFullYear(), b.getMonth(), b.getDate()); if (nx < n) nx = new Date(n.getFullYear() + 1, b.getMonth(), b.getDate());
  const d = daysBetween(n, nx); return d === 0 ? t('pp.todayBday') : t('pp.inDays', { x: unit(d, 'd') });
}

const ST_CLS = {
  done: 'bg-leaf/15 text-leaf', overdue: 'bg-red-100 text-red-600', due: 'bg-tang/15 text-tang',
  soon: 'bg-sun/25 text-amber-700', upcoming: 'bg-brand/10 text-brand', pending: 'bg-slate-100 text-slate-500'
};
const ST_ICON = { done: 'check', overdue: 'triangle-alert', due: 'bell-ring', soon: 'clock', upcoming: 'calendar', pending: 'hourglass' };

function renderPetList() {
  if (!pets.length) { $('#ppList').innerHTML = `<p class="text-sm text-slate-500">${t('pp.empty')}</p>`; return; }
  $('#ppList').innerHTML = pets.map(p => {
    const sp = SPECIES[p.species] || SPECIES.other; const c = COLORS[sp.color]; const on = p.id === curPet;
    const al = petAlerts(p).filter(a => a.status !== 'soon').length;
    return `<button type="button" data-pet-id="${p.id}" class="w-full flex items-center gap-3 p-2.5 rounded-2xl border-2 text-start transition ${on ? 'border-brand bg-brand/5' : 'border-transparent hover:bg-slate-50'}">
      <span class="w-11 h-11 shrink-0 rounded-xl ${c.soft} ${c.text} grid place-items-center"><i data-lucide="${sp.icon}" class="w-6 h-6"></i></span>
      <span class="flex-1 min-w-0"><b class="block text-brand-navy truncate">${esc(p.name)}</b><span class="text-xs text-slate-500">${L(sp)} · ${ageText(p.birth)}</span></span>
      ${al ? `<span class="min-w-[22px] h-[22px] rounded-full bg-red-500 text-white text-xs font-bold grid place-items-center">${al}</span>` : ''}</button>`;
  }).join('');
}

function vaxRow(v) {
  const isP = v.kind === 'primary'; const max = toISO(today());
  const meta = isP
    ? `${v.done ? t('pp.doneOn') + ' ' + fmtDate(v.done) : t('pp.dueOn') + ' ' + fmtDate(v.due)} · ${LANG === 'ar' ? 'بعمر' : 'at'} ${unit(v.weeks, 'w')}`
    : `${t('pp.every', { x: v.months })}${v.last ? ' · ' + t('pp.lastOn') + ' ' + fmtDate(v.last) : ''}${v.due ? ' · ' + t('pp.dueOn') + ' ' + fmtDate(v.due) : ''}`;
  const action = isP && v.done
    ? `<button type="button" data-pp-undo="${v.key}" class="h-9 px-3 rounded-lg border text-xs font-bold text-slate-500 hover:text-red-500">${t('pp.undo')}</button>`
    : `<input type="date" max="${max}" data-pp-date="${v.key}" class="h-9 rounded-lg border border-slate-200 px-2 text-xs w-[130px]" aria-label="date">
       <button type="button" data-pp-done="${v.key}" class="h-9 px-3 rounded-lg bg-leaf text-white text-xs font-bold inline-flex items-center gap-1"><i data-lucide="check" class="w-3.5 h-3.5"></i>${t('pp.markDone')}</button>
       ${!isP && v.count ? `<button type="button" data-pp-undo="${v.key}" class="h-9 px-2 rounded-lg text-xs font-bold text-slate-400 hover:text-red-500" title="${t('pp.undo')}"><i data-lucide="undo-2" class="w-4 h-4"></i></button>` : ''}`;
  return `<div class="flex flex-wrap items-center gap-3 py-3 border-b border-slate-100 last:border-0">
    <span class="w-9 h-9 shrink-0 rounded-full grid place-items-center ${ST_CLS[v.status]}"><i data-lucide="${ST_ICON[v.status]}" class="w-4 h-4"></i></span>
    <div class="flex-1 min-w-[180px]"><b class="text-sm text-brand-navy">${L(v)}</b><div class="text-xs text-slate-500 mt-0.5">${meta}</div></div>
    <span class="rounded-full px-2.5 py-1 text-[11px] font-bold ${ST_CLS[v.status]}">${t('st.' + v.status)}</span>
    <div class="flex items-center gap-1.5 flex-wrap">${action}</div></div>`;
}

function renderDashboard() {
  const box = $('#ppDashboard'); const p = pets.find(x => x.id === curPet);
  if (!p) {
    box.innerHTML = `<div class="h-full min-h-[420px] rounded-3xl border-2 border-dashed border-wood grid place-items-center text-center p-8 wood-texture">
      <div><span class="mx-auto w-24 h-24 rounded-full bg-white shadow-soft grid place-items-center"><i data-lucide="paw-print" class="w-12 h-12 text-brand"></i></span>
      <h3 class="mt-5 text-2xl font-black text-brand-navy">${t('pp.empty')}</h3><p class="mt-2 text-slate-600 max-w-md mx-auto">${t('pp.emptyText')}</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3"><button type="button" data-pp-new class="h-12 px-6 rounded-xl bg-brand text-white font-bold inline-flex items-center gap-2"><i data-lucide="plus" class="w-5 h-5"></i>${t('pp.addFirst')}</button>
      <button type="button" data-pp-demo class="h-12 px-6 rounded-xl bg-white border border-wood font-bold text-brand-navy inline-flex items-center gap-2"><i data-lucide="sparkles" class="w-5 h-5 text-sun"></i>${t('pp.demo')}</button></div></div></div>`;
    return;
  }
  const sp = SPECIES[p.species] || SPECIES.other; const s = petSchedule(p); const alerts = petAlerts(p); const hAge = humanAge(p);
  const all = [...s.primary, ...s.recurring];
  const next = all.filter(v => v.due && v.status !== 'done' && v.status !== 'pending').sort((a, b) => a.due - b.due)[0];
  const overdue = all.filter(v => v.status === 'overdue').length; const done = s.primary.filter(v => v.done).length + s.recurring.reduce((a, v) => a + v.count, 0);
  const tile = (icon, k, v) => `<div class="rounded-2xl bg-white/10 p-3"><span class="flex items-center gap-1.5 text-xs text-white/70"><i data-lucide="${icon}" class="w-3.5 h-3.5"></i>${t(k)}</span><b class="block mt-1 text-sm sm:text-base">${v}</b></div>`;
  const showAllPrimary = s.primary.some(v => !v.done && v.status === 'overdue');
  box.innerHTML = `
  <div class="space-y-5">
    <div class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand to-brand-dark text-white p-6">
      <div class="pointer-events-none absolute -top-24 -end-24 w-72 h-72 opacity-20" data-rays></div>
      <div class="relative flex flex-wrap items-center gap-4">
        <span class="w-16 h-16 rounded-2xl bg-white/15 grid place-items-center"><i data-lucide="${sp.icon}" class="w-9 h-9"></i></span>
        <div class="flex-1 min-w-0"><h3 class="text-2xl font-black truncate">${esc(p.name)}</h3>
          <p class="text-white/80 text-sm">${L(sp)}${p.breed ? ' · ' + esc(p.breed) : ''} · ${p.sex === 'f' ? t('pp.female') : t('pp.male')}${p.neutered ? ' · ' + t('pp.neutered') : ''}</p></div>
        <div class="flex gap-2"><button type="button" data-pp-edit class="h-9 px-3 rounded-lg bg-white/15 hover:bg-white/25 text-sm font-bold inline-flex items-center gap-1.5"><i data-lucide="pencil" class="w-4 h-4"></i>${t('pp.edit')}</button>
          <button type="button" data-pp-delete class="h-9 px-3 rounded-lg bg-white/15 hover:bg-red-500 text-sm font-bold inline-flex items-center gap-1.5"><i data-lucide="trash-2" class="w-4 h-4"></i>${t('pp.delete')}</button></div>
      </div>
      <div class="relative mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        ${tile('cake', 'pp.age', ageText(p.birth))}
        ${tile('user', 'pp.human', hAge !== null ? t('pp.humanYears', { x: unit(hAge, 'y') }) : '—')}
        ${tile('scale', 'pp.weight', p.weight ? `${p.weight} ${t('pp.kg')}` : '—')}
        ${tile('party-popper', 'pp.birthday', nextBirthday(p.birth))}
      </div>
    </div>

    <div class="grid sm:grid-cols-3 gap-3">
      <div class="sm:col-span-1 rounded-2xl border border-slate-200 p-4"><span class="text-xs font-bold text-slate-500">${t('pp.nextVax')}</span>
        <b class="block mt-1 text-brand-navy leading-snug">${next ? L(next) : t('pp.noNext')}</b>
        ${next ? `<span class="text-sm ${next.status === 'overdue' ? 'text-red-600' : 'text-brand'} font-bold">${fmtDate(next.due)}</span>` : ''}</div>
      <div class="rounded-2xl border border-slate-200 p-4 flex items-center gap-3"><span class="w-11 h-11 rounded-xl bg-red-100 text-red-600 grid place-items-center"><i data-lucide="triangle-alert" class="w-5 h-5"></i></span><span><b class="block text-2xl text-brand-navy">${overdue}</b><span class="text-xs text-slate-500">${t('pp.overdue')}</span></span></div>
      <div class="rounded-2xl border border-slate-200 p-4 flex items-center gap-3"><span class="w-11 h-11 rounded-xl bg-leaf/15 text-leaf grid place-items-center"><i data-lucide="shield-check" class="w-5 h-5"></i></span><span><b class="block text-2xl text-brand-navy">${done}</b><span class="text-xs text-slate-500">${t('pp.done')}</span></span></div>
    </div>

    <div class="rounded-2xl p-4 ${alerts.length ? 'bg-sun/15 border border-sun/40' : 'bg-leaf/10 border border-leaf/30'}">
      <h4 class="font-extrabold text-brand-navy flex items-center gap-2 text-sm"><i data-lucide="bell-ring" class="w-4 h-4 text-tang"></i>${t('pp.alerts')}</h4>
      ${alerts.length ? `<ul class="mt-2 space-y-1.5 text-sm">${alerts.map(a => `<li class="flex items-start gap-2"><span class="mt-1.5 w-2 h-2 rounded-full shrink-0 ${a.status === 'overdue' ? 'bg-red-500' : a.status === 'due' ? 'bg-tang' : 'bg-sun'}"></span><span>${esc(a.text)}</span></li>`).join('')}</ul>` : `<p class="mt-1 text-sm text-slate-600">${t('pp.noAlerts')}</p>`}
    </div>

    <div class="rounded-3xl border border-slate-200 p-5">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h4 class="font-extrabold text-brand-navy text-lg">${t('pp.schedule')}</h4>
        <div class="flex flex-wrap gap-2">
          <button type="button" data-pp-book class="h-10 px-4 rounded-xl bg-brand text-white text-sm font-bold inline-flex items-center gap-1.5"><i data-lucide="calendar-plus" class="w-4 h-4"></i>${t('pp.bookVax')}</button>
          ${next ? `<button type="button" data-pp-ics class="h-10 px-4 rounded-xl border border-brand/30 text-brand text-sm font-bold inline-flex items-center gap-1.5"><i data-lucide="calendar-clock" class="w-4 h-4"></i>${t('pp.ics')}</button>` : ''}
        </div>
      </div>
      ${s.primary.length ? `<h5 class="mt-5 text-sm font-extrabold text-slate-500">${t('pp.primary')}</h5><div>${s.primary.map(vaxRow).join('')}</div>` : `<p class="mt-4 text-sm text-slate-600 bg-slate-50 rounded-xl p-3">${t('pp.noVax')}</p>`}
      ${showAllPrimary ? `<button type="button" data-pp-allprimary class="mt-2 text-sm font-bold text-brand hover:underline">${t('pp.markAllPrimary')}</button>` : ''}
      <h5 class="mt-5 text-sm font-extrabold text-slate-500">${t('pp.recurring')}</h5><div>${s.recurring.map(vaxRow).join('')}</div>
      <p class="mt-4 text-xs text-slate-400 flex items-start gap-1.5"><i data-lucide="info" class="w-4 h-4 shrink-0"></i>${t('pp.disclaimer')}</p>
    </div>
  </div>`;
  renderRays();
}

function renderPets() { renderPetList(); renderDashboard(); renderNotifyState(); }

function openPetForm(p) {
  const f = $('#ppForm'); f.classList.remove('hidden');
  $('#ppFormTitle').textContent = p ? t('pp.formEdit') : t('pp.formAdd');
  $('#ppId').value = p ? p.id : '';
  $('#ppName').value = p ? p.name : '';
  $('#ppSpecies').value = p ? p.species : 'cat';
  $('#ppSex').value = p ? p.sex : 'm';
  $('#ppBreed').value = p ? p.breed || '' : '';
  $('#ppBirth').value = p ? p.birth : '';
  $('#ppBirth').max = toISO(today());
  $('#ppWeight').value = p ? p.weight || '' : '';
  $('#ppNeutered').checked = p ? !!p.neutered : false;
  $('#ppError').classList.add('hidden');
  f.scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => $('#ppName').focus({ preventScroll: true }), 300);
}

function savePetForm(e) {
  e.preventDefault();
  const name = $('#ppName').value.trim(); const birth = $('#ppBirth').value;
  if (!name || !birth || parseISO(birth) > today()) { $('#ppError').classList.remove('hidden'); return; }
  const data = { name, species: $('#ppSpecies').value, sex: $('#ppSex').value, breed: $('#ppBreed').value.trim(), birth,
    weight: $('#ppWeight').value ? Number($('#ppWeight').value) : '', neutered: $('#ppNeutered').checked };
  const id = $('#ppId').value;
  if (id) { const p = pets.find(x => x.id === id); Object.assign(p, data); }
  else { const np = { id: 'pet' + Date.now(), records: [], ...data }; pets.push(np); curPet = np.id; }
  savePets(); $('#ppForm').classList.add('hidden'); renderPets(); icons(); toast(t('pp.saved'));
  $('#ppDashboard').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function addDemoPet() {
  const birth = addDays(today(), -14 * 7);
  const d = { id: 'pet' + Date.now(), name: LANG === 'ar' ? 'مشمش' : 'Mishmish', species: 'cat', sex: 'm', breed: LANG === 'ar' ? 'شيرازي' : 'Persian',
    birth: toISO(birth), weight: 1.6, neutered: false,
    records: [{ key: 'fvrcp1', date: toISO(addDays(birth, 56)) }, { key: 'fvrcp2', date: toISO(addDays(birth, 84)) }, { key: 'deworm', date: toISO(addDays(birth, 84)) }] };
  pets.push(d); curPet = d.id; savePets(); renderPets(); icons();
}

function petAction(action, key, btn) {
  const p = pets.find(x => x.id === curPet); if (!p) return;
  p.records = p.records || [];
  const s = petSchedule(p); const item = [...s.primary, ...s.recurring].find(v => v.key === key);
  if (action === 'done') {
    const inp = btn.parentElement.querySelector(`[data-pp-date="${key}"]`);
    const date = inp && inp.value ? inp.value : toISO(today());
    if (item && item.kind === 'primary') p.records = p.records.filter(r => r.key !== key);
    p.records.push({ key, date });
  } else if (action === 'undo') {
    const idx = p.records.map(r => r.key).lastIndexOf(key);
    // احذف الأحدث تاريخاً لهذا المفتاح
    let best = -1; p.records.forEach((r, i) => { if (r.key === key && (best < 0 || r.date >= p.records[best].date)) best = i; });
    p.records.splice(best >= 0 ? best : idx, 1);
  }
  savePets(); renderPets(); icons();
}

function markAllPrimary() {
  const p = pets.find(x => x.id === curPet); if (!p) return;
  petSchedule(p).primary.forEach(v => { if (!v.done && v.due <= today()) p.records.push({ key: v.key, date: toISO(v.due) }); });
  savePets(); renderPets(); icons();
}

function petICS() {
  const p = pets.find(x => x.id === curPet); if (!p) return;
  const s = petSchedule(p);
  const next = [...s.primary, ...s.recurring].filter(v => v.due && v.status !== 'done' && v.status !== 'pending').sort((a, b) => a.due - b.due)[0];
  if (!next) return;
  const start = next.due < today() ? today() : next.due;
  downloadICS({ uid: `${p.id}-${next.key}-${toISO(start)}`, title: t('cal.vaxTitle', { v: L(next), n: p.name }), start, allDay: true,
    desc: `${L(next)} — ${EN['brand.name']}`, trigger: 'PT9H', filename: `vaccine-${next.key}.ics` });
}

/* تنبيهات المتصفح */
function renderNotifyState() {
  const lbl = $('#ppNotifyLabel'); if (!lbl) return;
  if (!('Notification' in window)) { lbl.textContent = t('pp.notifNA'); return; }
  if (Notification.permission === 'granted') lbl.textContent = t('pp.notifOn');
  else if (Notification.permission === 'denied') lbl.textContent = t('pp.notifDenied');
  else lbl.textContent = LANG === 'en' ? EN['pp.remBtn'] : lbl.dataset.ar || 'تفعيل تنبيهات المتصفح';
}

function sendDueNotifications(force) {
  if (!('Notification' in window) || Notification.permission !== 'granted') return;
  const key = toISO(today());
  if (!force && store.get('raheem_notified', '') === key) return;
  const msgs = pets.flatMap(p => petAlerts(p).map(a => a.text));
  if (!msgs.length) { if (force) toast(t('pp.noAlerts')); return; }
  try { new Notification(t('pp.notifTitle'), { body: msgs.slice(0, 4).join('\n'), icon: 'images/logo.jpg', tag: 'raheem-vax' }); }
  catch (e) { toast(msgs[0]); } // بعض متصفحات الجوال لا تدعم الإشعارات بدون Service Worker
  store.set('raheem_notified', key);
}

/* ======================= المعرض والعارض المكبّر ======================= */
let lbIndex = 0;
function renderGallery() {
  $('#galleryGrid').innerHTML = GALLERY.map((g, i) => `
    <button type="button" data-lb="${i}" class="reveal group relative overflow-hidden rounded-2xl bg-white/5 ${g.span} focus:outline-none focus:ring-4 focus:ring-sun/60">
      <img src="${g.src}" onerror="phFail(this)" alt="${esc(L(g))}" loading="lazy" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
      <span class="absolute inset-x-0 bottom-0 p-3 sm:p-4 bg-gradient-to-t from-black/75 to-transparent text-start text-sm sm:text-base font-bold">${L(g)}</span>
      <span class="absolute top-3 end-3 w-9 h-9 rounded-full bg-white/90 text-brand-navy grid place-items-center opacity-0 group-hover:opacity-100 transition"><i data-lucide="zoom-in" class="w-4 h-4"></i></span>
    </button>`).join('');
  $('#galleryGrid').classList.add('grid-flow-row-dense');
}
function showLB(i) {
  lbIndex = (i + GALLERY.length) % GALLERY.length; const g = GALLERY[lbIndex]; const img = $('#lbImg');
  img.classList.remove('is-placeholder');
  img.onerror = () => phFail(img);
  img.src = g.src; img.alt = L(g);
  $('#lbCaption').textContent = L(g);
  $('#lbCounter').textContent = `${lbIndex + 1} ${t('gal.of')} ${GALLERY.length}`;
}
function openLB(i) { showLB(i); $('#lightbox').classList.remove('hidden'); lockScroll(true); $('[data-lb-close]').focus(); }
function closeLB() { $('#lightbox').classList.add('hidden'); lockScroll(false); }

/* ======================= المدونة ======================= */
let blogCat = 'all';
function renderBlog() {
  const cats = [{ id: 'all', ar: t('blog.all'), en: t('blog.all') }, ...BLOG_CATS];
  $('#blogFilters').innerHTML = cats.map(c => `<button type="button" data-blog-cat="${c.id}" class="h-10 px-4 rounded-full text-sm font-bold transition ${blogCat === c.id ? 'bg-brand-navy text-white' : 'bg-sand text-slate-600 hover:text-brand'}">${L(c)}</button>`).join('');
  $('#blogGrid').innerHTML = POSTS.filter(p => blogCat === 'all' || p.cat === blogCat).map(p => {
    const c = COLORS[p.color]; const x = L(p); const cat = BLOG_CATS.find(k => k.id === p.cat);
    return `<article class="reveal group rounded-3xl border border-slate-100 bg-white shadow-sm hover:shadow-soft hover:-translate-y-1 overflow-hidden flex flex-col transition duration-300">
      <a href="#post-${p.id}" data-post="${p.id}" class="relative aspect-[16/9] ${c.soft} grid place-items-center overflow-hidden" tabindex="-1">
        <i data-lucide="${p.icon}" class="w-16 h-16 ${c.text} group-hover:scale-110 transition duration-300"></i>
        ${p.img ? `<img src="${p.img}" alt="" loading="lazy" onerror="this.remove()" class="absolute inset-0 w-full h-full object-cover">` : ''}
        <span class="absolute top-3 start-3 rounded-full bg-white/95 px-3 py-1 text-xs font-bold ${c.text}">${cat ? L(cat) : ''}</span>
      </a>
      <div class="p-5 flex-1 flex flex-col">
        <div class="text-xs text-slate-400 flex items-center gap-3"><span class="flex items-center gap-1"><i data-lucide="calendar" class="w-3.5 h-3.5"></i>${fmtDate(parseISO(p.date))}</span><span class="flex items-center gap-1"><i data-lucide="clock" class="w-3.5 h-3.5"></i>${p.minutes} ${t('blog.min')}</span></div>
        <h3 class="mt-2 font-extrabold text-lg text-brand-navy leading-snug"><a href="#post-${p.id}" data-post="${p.id}" class="hover:text-brand">${x.title}</a></h3>
        <p class="mt-2 text-sm text-slate-600 leading-relaxed">${x.excerpt}</p>
        <a href="#post-${p.id}" data-post="${p.id}" class="mt-auto pt-4 text-brand font-bold inline-flex items-center gap-1.5 text-sm">${t('blog.read')}<i data-lucide="arrow-left" class="w-4 h-4 ltr:rotate-180 group-hover:-translate-x-1 ltr:group-hover:translate-x-1 transition"></i></a>
      </div></article>`;
  }).join('');
}

function openPost(id) {
  const p = POSTS.find(x => x.id === id); if (!p) return;
  const c = COLORS[p.color]; const x = L(p); const cat = BLOG_CATS.find(k => k.id === p.cat);
  history.replaceState(null, '', '#post-' + id);
  openModal(`
    <header class="rounded-t-3xl ${c.soft} p-6 sm:p-8 pe-14">
      <span class="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-bold ${c.text}"><i data-lucide="${p.icon}" class="w-4 h-4"></i>${cat ? L(cat) : ''}</span>
      <h2 class="mt-3 text-2xl sm:text-3xl font-black text-brand-navy leading-snug">${x.title}</h2>
      <p class="mt-2 text-sm text-slate-500">${fmtDate(parseISO(p.date))} · ${p.minutes} ${t('blog.min')}</p>
    </header>
    <div class="prose-vet p-6 sm:p-8">${x.body}</div>
    <footer class="px-6 sm:px-8 pb-8 flex flex-wrap gap-3">
      <a href="#booking" data-close-modal class="h-11 px-5 rounded-xl bg-brand text-white font-bold inline-flex items-center gap-2"><i data-lucide="calendar-plus" class="w-4 h-4"></i>${t('blog.book')}</a>
      <button type="button" data-share-post="${p.id}" class="h-11 px-5 rounded-xl border border-slate-200 font-bold inline-flex items-center gap-2 hover:border-brand hover:text-brand"><i data-lucide="share-2" class="w-4 h-4"></i>${t('blog.share')}</button>
    </footer>`, () => history.replaceState(null, '', '#blog'));
}

async function sharePost(id) {
  const p = POSTS.find(x => x.id === id); const url = location.href.split('#')[0] + '#post-' + id;
  try {
    if (navigator.share) { await navigator.share({ title: L(p).title, url }); return; }
    await navigator.clipboard.writeText(url); toast(t('blog.copied'));
  } catch (e) { /* أُلغيت المشاركة */ }
}

/* بيانات منظمة للمقالات (SEO) */
function injectBlogSchema() {
  const old = $('#blogSchema'); old && old.remove();
  const s = document.createElement('script'); s.type = 'application/ld+json'; s.id = 'blogSchema';
  s.textContent = JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList',
    itemListElement: POSTS.map((p, i) => ({ '@type': 'ListItem', position: i + 1,
      item: { '@type': 'BlogPosting', headline: L(p).title, description: L(p).excerpt, datePublished: p.date, inLanguage: LANG,
        author: { '@type': 'Organization', name: EN['brand.name'] }, url: location.href.split('#')[0] + '#post-' + p.id } })) });
  document.head.append(s);
}

/* ======================= زخرفة أشعة الشعار ======================= */
function renderRays() {
  const cols = ['#F4C430', '#B5CC2E', '#6DB33F', '#22B5E8', '#0077C8', '#0B2E59', '#F28C38', '#F8D7B5'];
  let g = ''; const n = 16;
  for (let i = 0; i < n; i++) {
    g += `<g transform="rotate(${(i * 360) / n} 200 200)"><path d="M184 16h32a8 8 0 0 1 8 9l-8 64a8 8 0 0 1-8 7h-16a8 8 0 0 1-8-7l-8-64a8 8 0 0 1 8-9z" fill="${cols[i % cols.length]}"/></g>`;
  }
  $$('[data-rays]').forEach(el => { if (!el.firstElementChild) el.innerHTML = `<svg viewBox="0 0 400 400" class="w-full h-full rays-spin" aria-hidden="true">${g}</svg>`; });
}

/* ======================= الظهور عند التمرير والتنقل ======================= */
const revealObs = 'IntersectionObserver' in window
  ? new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); revealObs.unobserve(e.target); } }), { threshold: 0.12 })
  : null;
function observeReveal() { $$('.reveal:not(.is-visible)').forEach(el => (revealObs ? revealObs.observe(el) : el.classList.add('is-visible'))); }

function initNav() {
  const header = $('#siteHeader'); const toTop = $('#toTop');
  const onScroll = () => {
    const y = window.scrollY;
    header.classList.toggle('shadow-soft', y > 10);
    toTop.classList.toggle('opacity-0', y < 600); toTop.classList.toggle('pointer-events-none', y < 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
  toTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  $('#menuBtn').addEventListener('click', () => {
    const m = $('#mobileMenu'); const open = m.classList.toggle('hidden') === false;
    $('#menuBtn').setAttribute('aria-expanded', open);
  });
  $$('#mobileMenu a').forEach(a => a.addEventListener('click', () => { $('#mobileMenu').classList.add('hidden'); $('#menuBtn').setAttribute('aria-expanded', 'false'); }));

  if ('IntersectionObserver' in window) {
    const ids = ['home', 'doctor', 'services', 'booking', 'shop', 'pet-profile', 'gallery', 'blog', 'contact'];
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      $$('.nav-link, .bnav').forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
    }), { rootMargin: '-45% 0px -50% 0px' });
    ids.forEach(id => { const s = document.getElementById(id); s && obs.observe(s); });
  }
}

/* ======================= ربط الأحداث ======================= */
function bindEvents() {
  $('#langToggle').addEventListener('click', () => setLang(LANG === 'ar' ? 'en' : 'ar'));

  document.addEventListener('click', e => {
    const el = e.target.closest('button, a'); if (!el) return;
    const d = el.dataset;

    // الخدمات
    if (d.bookService) { prefillBooking({ service: d.bookService }); return; }
    if ('toggleSvc' in d) {
      const ul = el.closest('article').querySelector('[data-svc-points]'); const open = ul.classList.toggle('hidden') === false;
      el.textContent = open ? t('svc.less') : t('svc.more'); el.setAttribute('aria-expanded', open); return;
    }
    // الحجز
    if (d.pet && el.closest('#petTypeOptions')) { bk.pet = d.pet; showErr('pet', false); renderPetTypes(); renderSummary(); icons(); return; }
    if (d.bkService) { bk.service = d.bkService; showErr('service', false); renderBkServices(); renderSummary(); icons(); return; }
    if (d.date && el.closest('#bkDates')) { bk.date = d.date; bk.time = null; showErr('date', false); renderDates(); renderSlots(); renderSummary(); loadRemoteSlots(d.date); return; }
    if (d.time) { bk.time = d.time; showErr('time', false); renderSlots(); renderSummary(); return; }
    if (d.cancelBooking) {
      if (!confirm(t('bk.cancelConfirm'))) return;
      const cb = bookings.find(b => b.ref === d.cancelBooking);
      if (cb && cb.synced) DB.cancelBooking(cb.ref, cb.phone).catch(() => {});
      if (cb && remoteTaken[cb.date]) remoteTaken[cb.date] = remoteTaken[cb.date].filter(x => x !== cb.time);
      bookings = bookings.filter(b => b.ref !== d.cancelBooking); store.set('raheem_bookings', bookings);
      renderMyBookings(); renderSlots(); toast(t('bk.cancelled')); return;
    }
    if (d.icsBooking) {
      const b = bookings.find(x => x.ref === d.icsBooking); if (!b) return;
      const [hh, mm] = b.time.split(':').map(Number); const st = parseISO(b.date); st.setHours(hh, mm);
      const svc = SERVICES.find(s => s.id === b.service);
      downloadICS({ uid: b.ref, title: `${t('cal.bookingTitle')} — ${L(svc).title}`, start: st, minutes: svc.minutes, desc: bookingWaText(b), filename: `${b.ref}.ics` });
      return;
    }
    // ملف الحيوان
    if (d.petId) { curPet = d.petId; savePets(); $('#ppForm').classList.add('hidden'); renderPets(); icons(); return; }
    if ('ppNew' in d) { openPetForm(null); return; }
    if ('ppDemo' in d) { addDemoPet(); return; }
    if ('ppEdit' in d) { openPetForm(pets.find(x => x.id === curPet)); return; }
    if ('ppDelete' in d) {
      if (!confirm(t('pp.deleteConfirm'))) return;
      pets = pets.filter(x => x.id !== curPet); curPet = pets[0] ? pets[0].id : null; savePets(); renderPets(); icons(); toast(t('pp.deleted')); return;
    }
    if (d.ppDone) { petAction('done', d.ppDone, el); return; }
    if (d.ppUndo) { petAction('undo', d.ppUndo, el); return; }
    if ('ppAllprimary' in d) { markAllPrimary(); return; }
    if ('ppIcs' in d) { petICS(); return; }
    if ('ppBook' in d) {
      const p = pets.find(x => x.id === curPet);
      const pet = ['cat', 'dog', 'bird'].includes(p.species) ? p.species : 'other';
      prefillBooking({ service: 'vaccination', pet, petName: p.name }); return;
    }
    // المعرض
    if (d.lb !== undefined) { openLB(Number(d.lb)); return; }
    // المدونة
    if (d.blogCat) { blogCat = d.blogCat; renderBlog(); icons(); observeReveal(); return; }
    if (d.post) { e.preventDefault(); openPost(d.post); return; }
    if (d.sharePost) { sharePost(d.sharePost); return; }
    // النوافذ
    if ('closeModal' in d) { closeModal(); return; }
  });
  $('#modal').addEventListener('click', e => { if (e.target.matches('[data-modal-backdrop]')) closeModal(); });

  // خطوات الحجز
  $('#bkNext').addEventListener('click', () => { if (validateStep(bk.step)) { showStep(bk.step + 1); $('#bookingForm').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
  $('#bkPrev').addEventListener('click', () => showStep(Math.max(1, bk.step - 1)));
  $('#bookingForm').addEventListener('submit', submitBooking);
  $('#bkPetName').addEventListener('input', renderSummary);


  // ملف الحيوان
  $('#ppAddBtn').addEventListener('click', () => openPetForm(null));
  $('#ppCancel').addEventListener('click', () => $('#ppForm').classList.add('hidden'));
  $('#ppForm').addEventListener('submit', savePetForm);
  $('#ppNotifyBtn').addEventListener('click', async () => {
    if (!('Notification' in window)) { toast(t('pp.notifNA'), 'err'); return; }
    const perm = await Notification.requestPermission();
    renderNotifyState();
    if (perm === 'granted') sendDueNotifications(true); else toast(t('pp.notifDenied'), 'err');
  });

  // العارض المكبّر
  $('[data-lb-close]').addEventListener('click', closeLB);
  $('[data-lb-prev]').addEventListener('click', () => showLB(lbIndex - 1));
  $('[data-lb-next]').addEventListener('click', () => showLB(lbIndex + 1));
  $('#lightbox').addEventListener('click', e => { if (e.target.id === 'lightbox' || e.target.tagName === 'FIGURE') closeLB(); });
  let tx = null;
  $('#lightbox').addEventListener('touchstart', e => { tx = e.touches[0].clientX; }, { passive: true });
  $('#lightbox').addEventListener('touchend', e => {
    if (tx === null) return; const dx = e.changedTouches[0].clientX - tx; tx = null;
    if (Math.abs(dx) < 50) return; const rtl = LANG === 'ar';
    showLB(lbIndex + ((dx < 0) !== rtl ? 1 : -1));
  });

  // التواصل
  $('#contactForm').addEventListener('submit', e => {
    e.preventDefault();
    const name = $('#cName').value.trim(); const phone = $('#cPhone').value; const msg = $('#cMsg').value.trim();
    const ok = name.length >= 2 && validPhone(phone) && msg.length >= 3;
    $('#cError').classList.toggle('hidden', ok); if (!ok) return;
    window.open(waLink(`${t('contact.waIntro')}\n${msg}\n\n— ${name} (${normPhone(phone)})`), '_blank', 'noopener');
    if (DB.enabled) DB.createMessage({ name, phone: normPhone(phone), message: msg }).catch(() => {});
    e.target.reset(); toast(t('contact.sent'));
  });

  // لوحة المفاتيح
  document.addEventListener('keydown', e => {
    if (!$('#lightbox').classList.contains('hidden')) {
      if (e.key === 'Escape') closeLB();
      const rtl = LANG === 'ar';
      if (e.key === 'ArrowLeft') showLB(lbIndex + (rtl ? 1 : -1));
      if (e.key === 'ArrowRight') showLB(lbIndex + (rtl ? -1 : 1));
      return;
    }
    if (e.key === 'Escape') closeModal();
  });
}

/* ======================= التشغيل ======================= */
function renderAll() {
  renderLinks(); renderHours(); renderServices(); renderBookingAll(); showStep(bk.step);
  renderPets(); renderGallery(); renderBlog(); injectBlogSchema(); renderRays();
  icons(); observeReveal();
}

document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  bindEvents(); initNav();
  setLang(LANG);
  setInterval(renderHours, 60000);
  sendDueNotifications(false);
  if (location.hash.startsWith('#post-')) openPost(location.hash.slice(6));
});
