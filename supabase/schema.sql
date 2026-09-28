-- Village Commerce Supabase schema
-- Run this in Supabase SQL Editor after creating a project.
create extension if not exists pgcrypto;

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  company text,
  email text not null,
  phone text not null,
  product text not null,
  quantity text,
  destination text,
  packaging text,
  message text,
  status text not null default 'New' check (status in ('New','Contacted','Quoted','Closed'))
);

alter table public.enquiries enable row level security;

-- Public website can insert enquiries.
drop policy if exists "public can submit enquiries" on public.enquiries;
create policy "public can submit enquiries"
on public.enquiries for insert
to anon, authenticated
with check (true);

-- Authenticated admin users can read/update enquiries.
drop policy if exists "authenticated can read enquiries" on public.enquiries;
create policy "authenticated can read enquiries"
on public.enquiries for select
to authenticated
using (true);

drop policy if exists "authenticated can update enquiries" on public.enquiries;
create policy "authenticated can update enquiries"
on public.enquiries for update
to authenticated
using (true)
with check (true);

-- IMPORTANT:
-- Create only trusted admin users in Supabase Authentication.
-- Never expose the Supabase service_role key in the website.
