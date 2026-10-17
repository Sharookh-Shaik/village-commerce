# Village Commerce — Corrected Admin Integration Package

This package includes the full website plus corrected enquiry form handling, browser Supabase config, admin login/MFA page, and SQL migration.

## Replace files in GitHub Desktop's repository folder
1. Download this ZIP and choose **Extract All**.
2. Open the extracted folder.
3. Open GitHub Desktop → select `village-commerce` → **Show in Explorer**.
4. Copy all files and folders from the extracted folder into the repository root, allowing files to be replaced.
5. The package already includes the Supabase project URL and the browser-safe publishable key configured in this session. Do not replace it with a `sb_secret_` or `service_role` key.
6. Do not commit/push until the SQL migration has been run and the site has been tested.

## Supabase migration for the existing project
- Run `supabase/admin-migration.sql` only, after reviewing it.
- Do NOT run `supabase/schema.sql` on the existing project; it is a reference for a new project only.
- Migration preserves existing rows, adds missing columns, removes prior policies on `public.enquiries`, and sets insert-only public access plus admin-only read/update requiring email `sales@villagecommerce.in` and JWT assurance level `aal2`.
- Confirm the existing table's column names/types match before running. This package expects `public.enquiries` columns `id`, `created_at`, `name`, `company`, `email`, `phone`, `product`, `quantity`, `destination`, `packaging`, `message`, `status`, and `updated_at` (the migration adds destination, packaging, updated_at if missing).

## Admin account and MFA
- Supabase Authentication must have a user for `sales@villagecommerce.in` with a working password.
- TOTP is enabled in the Supabase project settings. First sign-in to `/admin/` will enroll an authenticator factor if none is enrolled, then require a 6-digit code.
- Only use the admin dashboard after MFA enrollment is verified and the migration is successful.

## Important
- Browser publishable keys are designed to be public; database security depends on RLS policies.
- Never put `sb_secret_...`, `service_role`, database passwords, or private credentials into browser files.
- This ZIP does not deploy the site or execute SQL. It must be copied into the local repository, tested, then committed/pushed.
