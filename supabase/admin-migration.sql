-- Village Commerce: safe migration for the existing public.enquiries table.
-- Preserves existing rows. Run this file only; do NOT run schema.sql on the existing project.
-- Public visitors can INSERT validated enquiries. Only the approved admin at aal2 can read/update.

BEGIN;

ALTER TABLE public.enquiries
  ADD COLUMN IF NOT EXISTS destination text,
  ADD COLUMN IF NOT EXISTS packaging text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- Remove every current policy on this table so an older permissive policy cannot remain active.
DO $$
DECLARE policy_record record;
BEGIN
  FOR policy_record IN
    SELECT policyname FROM pg_policies
    WHERE schemaname = 'public' AND tablename = 'enquiries'
  LOOP
    EXECUTE format('DROP POLICY IF EXISTS %I ON public.enquiries', policy_record.policyname);
  END LOOP;
END $$;

REVOKE ALL ON TABLE public.enquiries FROM PUBLIC, anon, authenticated;
GRANT INSERT ON TABLE public.enquiries TO anon, authenticated;
GRANT SELECT ON TABLE public.enquiries TO authenticated;
GRANT UPDATE (status, updated_at) ON TABLE public.enquiries TO authenticated;

-- Grant only the identity/serial sequence associated with enquiries.id.
DO $$
DECLARE seq_name text;
BEGIN
  seq_name := pg_get_serial_sequence('public.enquiries', 'id');
  IF seq_name IS NOT NULL THEN
    EXECUTE format('GRANT USAGE ON SEQUENCE %s TO anon, authenticated', seq_name);
  END IF;
END $$;

CREATE POLICY "Public can submit enquiries"
ON public.enquiries FOR INSERT TO anon, authenticated
WITH CHECK (
  length(trim(name)) BETWEEN 1 AND 160
  AND length(trim(email)) BETWEEN 3 AND 254
  AND (phone IS NULL OR length(trim(phone)) = 0 OR length(trim(phone)) BETWEEN 3 AND 80)
  AND length(trim(product)) BETWEEN 1 AND 160
  AND (company IS NULL OR length(company) <= 200)
  AND (quantity IS NULL OR length(quantity) <= 100)
  AND (message IS NULL OR length(message) <= 5000)
  AND (destination IS NULL OR length(destination) <= 120)
  AND (packaging IS NULL OR length(packaging) <= 200)
  AND status = 'New'
);

CREATE POLICY "Approved admin can read enquiries"
ON public.enquiries FOR SELECT TO authenticated
USING (
  (auth.jwt() ->> 'email') = 'sales@villagecommerce.in'
  AND (auth.jwt() ->> 'aal') = 'aal2'
);

CREATE POLICY "Approved admin can update enquiries"
ON public.enquiries FOR UPDATE TO authenticated
USING (
  (auth.jwt() ->> 'email') = 'sales@villagecommerce.in'
  AND (auth.jwt() ->> 'aal') = 'aal2'
)
WITH CHECK (
  (auth.jwt() ->> 'email') = 'sales@villagecommerce.in'
  AND (auth.jwt() ->> 'aal') = 'aal2'
  AND status IN ('New', 'Contacted', 'Quoted', 'Closed')
);

-- No DELETE grant or policy is created.
COMMIT;
