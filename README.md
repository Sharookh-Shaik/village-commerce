# Village Commerce — Version 2

A premium static export-business website for Village Commerce.

## Included
- Completely redesigned responsive UI
- Home / Products / Quality & Export / About / Request a Quote
- GST + UDYAM details
- IEC shown as "Application in process"
- WhatsApp CTA
- SEO-friendly metadata
- Supabase-ready admin/enquiry foundation
- Supabase RLS schema in `supabase/schema.sql`

## Deploying the website
This project can be deployed to Vercel as a static site:
1. Replace the files in the existing GitHub repository with this package's files.
2. Commit and push to `main`.
3. Vercel will automatically deploy the new version.
4. Keep the existing `villagecommerce.in` DNS records exactly as they are.

## Admin security
The included `/admin/` page is intentionally a foundation until Supabase is configured.
Do NOT put a database password or Supabase service-role key into HTML/JavaScript.

For production admin:
1. Create a Supabase project.
2. For the existing Supabase project, run `supabase/admin-migration.sql` (not `schema.sql`) after reviewing it.
3. Ensure the trusted admin user exists in Supabase Authentication.
4. Configure `supabase-config.js` with the project URL and public publishable/anon key.
5. Deploy and enroll TOTP MFA from `/admin/`.
6. Never expose the service_role key. See `README-ADMIN-SETUP.md` for detailed steps.

## Business information
GST: 37ABCFV5880A1Z4
UDYAM: UDYAM-AP-13-0099296
IEC: Application in process
Email: sales@villagecommerce.in
Phone: +91 80190 90461
Address: 17-2-14/0049 Kesarigunta Colony, Beside Navayuga Seeds, Kandukur, Prakasam District, Andhra Pradesh — 523105, India.

Real product/company photographs can be substituted later without changing the page structure.


## Latest content update
- Added supplied chilli harvest, drying and handling photos under `assets/`.
- Updated the IEC display to `ABCFV5880A` as confirmed by the business owner.
- Kept the homepage video and existing page structure.


## Admin integration note
For the current Supabase project, review and run `supabase/admin-migration.sql` only. Do not run `supabase/schema.sql` on the existing project. See `README-ADMIN-SETUP.md`.

## Two-phone MFA update
The admin dashboard supports enrolling multiple Authenticator apps on the same `sales@villagecommerce.in` account. Sign in, select **Add another phone**, scan the QR code on the second phone, verify its code, then test login with the factor selector. See `README-ADMIN-SETUP.md`. Do not rerun the migration on the existing project.
