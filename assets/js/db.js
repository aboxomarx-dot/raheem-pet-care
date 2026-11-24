/* ==========================================================
   طبقة قاعدة البيانات — تعمل فقط إذا عُبّئ config.js
   ========================================================== */
'use strict';

const DB = (() => {
  const cfg = window.RAHEEM_DB || {};
  const enabled = !!(cfg.url && cfg.anonKey && window.supabase && window.supabase.createClient);
  const sb = enabled ? window.supabase.createClient(cfg.url, cfg.anonKey, { auth: { persistSession: false } }) : null;

  const fail = (error) => ({ ok: false, error, conflict: !!(error && error.code === '23505') });

  return {
    enabled,

    /* حجز جديد */
    async createBooking(b) {
      if (!sb) return { ok: false, offline: true };
      const { error } = await sb.from('bookings').insert({
        ref: b.ref, pet_type: b.pet, pet_name: b.petName || null, pet_age: b.petAge || '',
        service: b.service, booking_date: b.date, booking_time: b.time,
        owner_name: b.name, phone: b.phone, notes: b.notes || null, lang: b.lang || 'ar'
      });
      return error ? fail(error) : { ok: true };
    },

    /* الأوقات المحجوزة في يوم معيّن → ['10:30', ...] */
    async bookedSlots(isoDate) {
      if (!sb) return [];
      const { data, error } = await sb.rpc('booked_slots', { p_date: isoDate });
      if (error || !data) return [];
      return data.map(r => String(r.booking_time).slice(0, 5));
    },

    async cancelBooking(ref, phone) {
      if (!sb) return { ok: false, offline: true };
      const { data, error } = await sb.rpc('cancel_booking', { p_ref: ref, p_phone: phone });
      return error ? fail(error) : { ok: data === true };
    },

    async createOrder(o) {
      if (!sb) return { ok: false, offline: true };
      const { error } = await sb.from('orders').insert(o);
      return error ? fail(error) : { ok: true };
    },

    async createMessage(m) {
      if (!sb) return { ok: false, offline: true };
      const { error } = await sb.from('messages').insert(m);
      return error ? fail(error) : { ok: true };
    }
  };
})();
