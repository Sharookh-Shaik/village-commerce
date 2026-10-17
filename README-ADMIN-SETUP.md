# Village Commerce — Website + Two-Phone Admin MFA

## What this update does
- Keeps the current Village Commerce website, supplied logo, chilli photos, hero video, Supabase config, and enquiries workflow.
- Admin login remains restricted to `sales@villagecommerce.in` and requires a verified Authenticator MFA factor.
- Lets the same account enroll a second TOTP authenticator phone from the dashboard using **Add another phone**.
- At sign-in, when more than one authenticator is enrolled, the user can choose which phone they are using before entering its 6-digit code.
- Enquiries can be moved through New, Contacted, Quoted, and Closed.

## Install the package
1. Download the ZIP and choose **Extract All**.
2. Open the extracted folder. Select all its contents (including `admin`, `assets`, and `supabase`) and copy them.
3. Open GitHub Desktop and select the `village-commerce` repository.
4. Choose **Repository → Show in Explorer**.
5. Paste into the repository's top-level folder. Choose **Replace files in destination** when Windows asks. Do not delete the repository's `.git` folder.
6. Open `https://www.villagecommerce.in/admin/` after Vercel finishes deploying.
7. In GitHub Desktop, review the changed files, commit with `Enable two-phone admin MFA`, and click **Push origin**. Vercel should deploy automatically.

## Add your friend's phone
1. First make sure your own authenticator can still sign in to `/admin/`.
2. On your computer, sign in to `/admin/` with `sales@villagecommerce.in` and complete MFA.
3. Click **Add another phone**.
4. Keep the QR code visible only to your friend. On your friend's phone, open Microsoft Authenticator, tap **+**, choose **Other account**, and scan the QR code. If the camera scan does not work, use the displayed setup key manually.
5. Enter the current 6-digit code generated on your friend's phone and click **Verify and add this phone**.
6. Once the dashboard returns, sign out and test a fresh login. Choose your phone or your friend's phone from the authenticator dropdown and enter that phone's current code.

Important: enrolling a new factor may sign out other active sessions according to Supabase's MFA behavior. Both phones are separate factors on the same account; they do not have separate user identities. Keep the account password private and never send 6-digit codes or the QR/setup secret in chat. If a phone is lost, remove its factor from a trusted session and re-enroll as needed.

## Supabase notes
- The browser config contains only the project's public publishable key. This key is designed to be visible in a browser; never put an `sb_secret_` or `service_role` key in the website.
- The SQL migration was already run in the current Supabase project in this setup. **Do not run `supabase/admin-migration.sql` again as part of this website update.** It is included for reference only.
- Do not run `supabase/schema.sql` on the existing project.
- Database permissions rely on Row Level Security requiring `sales@villagecommerce.in` and MFA assurance level `aal2` for reading/updating enquiries.
- This ZIP cannot deploy by itself. Copy, commit, push, and allow Vercel to deploy.
