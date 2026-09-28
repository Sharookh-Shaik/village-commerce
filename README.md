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
2. Run `supabase/schema.sql` in the Supabase SQL Editor.
3. Create the admin user(s) in Supabase Authentication.
4. Implement authenticated reads/updates using the public anon key + RLS.
5. Never expose the service_role key.

## Business information
GST: 37ABCFV5880A1Z4
UDYAM: UDYAM-AP-13-0099296
IEC: Application in process
Email: sales@villagecommerce.in
Phone: +91 80190 90461
Address: 17-2-14/0049 Kesarigunta Colony, Beside Navayuga Seeds, Kandukur, Prakasam District, Andhra Pradesh — 523105, India.

Real product/company photographs can be substituted later without changing the page structure.
