-- ==========================================================
--  مركز رحيم البيطري — قاعدة البيانات (Supabase / PostgreSQL)
--  طريقة التشغيل: Supabase Dashboard → SQL Editor → New query → الصق هذا الملف كاملاً → Run
--  يمكن تشغيله أكثر من مرة بأمان.
-- ==========================================================

create extension if not exists pgcrypto;

-- ---------- 1) الحجوزات ----------
create table if not exists public.bookings (
  id            uuid primary key default gen_random_uuid(),
  ref           text unique not null,
  pet_type      text not null check (pet_type in ('cat','dog','bird','other')),
  pet_name      text check (char_length(pet_name) <= 40),
  pet_age       text check (pet_age in ('', 'baby', 'adult', 'senior')),
  service       text not null check (service in ('checkup','vaccination','surgery','grooming','boarding','dental')),
  booking_date  date not null,
  booking_time  time not null,
  owner_name    text not null check (char_length(owner_name) between 2 and 60),
  phone         text not null check (phone ~ '^\+?[0-9]{9,13}$'),
  notes         text check (char_length(notes) <= 400),
  lang          text not null default 'ar' check (lang in ('ar','en')),
  status        text not null default 'pending' check (status in ('pending','confirmed','done','cancelled')),
  staff_note    text,
  created_at    timestamptz not null default now()
);
-- يمنع حجز نفس الموعد مرتين (إلا إذا أُلغي)
create unique index if not exists bookings_slot_unique
  on public.bookings (booking_date, booking_time) where status <> 'cancelled';
create index if not exists bookings_date_idx on public.bookings (booking_date);

-- ---------- 2) طلبات المتجر ----------
create table if not exists public.orders (
  id             uuid primary key default gen_random_uuid(),
  ref            text unique not null,
  customer_name  text not null check (char_length(customer_name) between 2 and 60),
  phone          text not null check (phone ~ '^\+?[0-9]{9,13}$'),
  method         text not null check (method in ('pickup','delivery')),
  area           text,
  address        text check (char_length(address) <= 160),
  items          jsonb not null,            -- [{id, name, qty, price}]
  subtotal       numeric(8,2) not null check (subtotal >= 0),
  delivery_fee   numeric(8,2) not null default 0 check (delivery_fee >= 0),
  total          numeric(8,2) not null check (total >= 0),
  status         text not null default 'new' check (status in ('new','preparing','ready','delivered','cancelled')),
  created_at     timestamptz not null default now()
);

-- ---------- 3) رسائل نموذج التواصل ----------
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 2 and 60),
  phone       text not null check (phone ~ '^\+?[0-9]{9,13}$'),
  message     text not null check (char_length(message) between 3 and 600),
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);

-- ---------- 4) موظفو العيادة (من يحق له فتح لوحة الإدارة) ----------
create table if not exists public.staff (
  user_id  uuid primary key references auth.users (id) on delete cascade,
  name     text
);

create or replace function public.is_staff()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.staff where user_id = auth.uid());
$$;

-- ---------- 5) الصلاحيات (Row Level Security) ----------
alter table public.bookings enable row level security;
alter table public.orders   enable row level security;
alter table public.messages enable row level security;
alter table public.staff    enable row level security;

-- الزوار: إضافة فقط (لا يستطيعون قراءة بيانات الآخرين)
drop policy if exists "visitors create bookings" on public.bookings;
create policy "visitors create bookings" on public.bookings
  for insert to anon, authenticated with check (status = 'pending' and staff_note is null);

drop policy if exists "visitors create orders" on public.orders;
create policy "visitors create orders" on public.orders
  for insert to anon, authenticated with check (status = 'new');

drop policy if exists "visitors create messages" on public.messages;
create policy "visitors create messages" on public.messages
  for insert to anon, authenticated with check (handled = false);

-- الموظفون: قراءة وتحديث كل شيء
drop policy if exists "staff read bookings" on public.bookings;
create policy "staff read bookings" on public.bookings for select to authenticated using (public.is_staff());
drop policy if exists "staff update bookings" on public.bookings;
create policy "staff update bookings" on public.bookings for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff read orders" on public.orders;
create policy "staff read orders" on public.orders for select to authenticated using (public.is_staff());
drop policy if exists "staff update orders" on public.orders;
create policy "staff update orders" on public.orders for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff read messages" on public.messages;
create policy "staff read messages" on public.messages for select to authenticated using (public.is_staff());
drop policy if exists "staff update messages" on public.messages;
create policy "staff update messages" on public.messages for update to authenticated using (public.is_staff()) with check (public.is_staff());

drop policy if exists "staff see themselves" on public.staff;
create policy "staff see themselves" on public.staff for select to authenticated using (user_id = auth.uid());

-- صلاحيات الجداول لواجهة API (المشاريع الجديدة في Supabase لا تمنحها تلقائياً)
-- سياسات RLS أعلاه هي التي تحدد ما يُسمح به فعلياً لكل صف.
grant usage on schema public to anon, authenticated;
grant insert on public.bookings, public.orders, public.messages to anon, authenticated;
grant select, update on public.bookings, public.orders, public.messages to authenticated;
grant select on public.staff to authenticated;

-- ---------- 6) دوال آمنة للزوار ----------
-- الأوقات المحجوزة ليوم معيّن (بدون أي بيانات شخصية)
create or replace function public.booked_slots(p_date date)
returns table (booking_time time) language sql stable security definer set search_path = public as $$
  select b.booking_time from public.bookings b
  where b.booking_date = p_date and b.status <> 'cancelled';
$$;

-- إلغاء الزائر لحجزه (يتطلب رقم الحجز + رقم الهاتف نفسه)
create or replace function public.cancel_booking(p_ref text, p_phone text)
returns boolean language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update public.bookings set status = 'cancelled'
   where ref = p_ref and phone = p_phone and status in ('pending','confirmed') and booking_date >= current_date;
  get diagnostics n = row_count;
  return n > 0;
end $$;

revoke all on function public.booked_slots(date) from public;
revoke all on function public.cancel_booking(text, text) from public;
grant execute on function public.booked_slots(date) to anon, authenticated;
grant execute on function public.cancel_booking(text, text) to anon, authenticated;
grant execute on function public.is_staff() to authenticated;

-- ==========================================================
--  بعد إنشاء حساب الموظف من Authentication → Users → Add user
--  شغّل السطر التالي مع تغيير البريد ليصبح موظفاً:
--
--  insert into public.staff (user_id, name)
--  select id, 'الإدارة' from auth.users where email = 'raheem.pet.center@gmail.com'
--  on conflict do nothing;
-- ==========================================================
