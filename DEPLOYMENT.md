# City Drive Deployment

## Tech Stack

City Drive is a static frontend app:

- HTML: `index.html`
- CSS: `styles.css`
- JavaScript: `game.js`
- Persistence: browser `localStorage`
- Build step: none

No backend, database, package manager, or framework is required for the current version.

## Recommended Hosting

Recommended: Netlify.

Why: this project is a static web app with no build command, so Netlify can deploy the folder directly and the included `netlify.toml` adds production security headers.

Also supported: Vercel. The included `vercel.json` configures equivalent security headers.

Backend recommendation for future admin/auth/realtime: Convex, Supabase, or Firebase. Use one of these if you want real user accounts, server-verified admin permissions, shared bug reports, or global announcements across all players.

## Local Run

From this folder:

```powershell
python -m http.server 8010 --bind 127.0.0.1
```

Open:

```text
http://127.0.0.1:8010/?v=7
```

If Python is unavailable, any static file server works.

## Environment Variables

The current static app does not need environment variables.

Use `.env.example` only as a placeholder for future backend integrations. Do not put secrets in frontend JavaScript, `.env`, or public hosting variables that are exposed to the browser.

## Netlify Deployment

1. Push this folder to a Git repository.
2. In Netlify, choose **Add new site** > **Import an existing project**.
3. Select the repository.
4. Set:
   - Build command: leave blank
   - Publish directory: `.`
5. Deploy.

The included `netlify.toml` sets the publish directory and security headers.

## Vercel Deployment

1. Push this folder to a Git repository.
2. In Vercel, choose **Add New Project**.
3. Select the repository.
4. Set:
   - Framework preset: Other
   - Build command: leave blank
   - Output directory: `.`
5. Deploy.

The included `vercel.json` sets clean URLs and security headers.

## Custom Domain

Netlify:

1. Open the deployed site.
2. Go to **Domain management**.
3. Add your custom domain.
4. Follow Netlify's DNS instructions.
5. Wait for HTTPS certificate provisioning.

Vercel:

1. Open the project.
2. Go to **Settings** > **Domains**.
3. Add your custom domain.
4. Follow Vercel's DNS instructions.
5. Wait for HTTPS certificate provisioning.

## Security Review

Current status:

- No third-party scripts.
- No network requests.
- No hardcoded API keys or secrets.
- Security headers are configured for Netlify and Vercel.
- Player progress, reports, announcements, and garage state are local to each browser via `localStorage`.

Admin warning:

The current admin panel is local-development-only and hidden on public domains. It is not a secure production admin system because static frontend code cannot prove account identity. For real public admin tools:

1. Add backend authentication.
2. Verify the admin account server-side.
3. Store car grants, announcements, and reports in a server database.
4. Never trust `localStorage` for permissions.

Suggested backend choices:

- Convex: best fit for realtime announcements, server functions, and simple data sync.
- Supabase: good fit if you want SQL/Postgres and built-in auth.
- Firebase: good fit if you want Google auth and realtime database-style APIs.

## Launch Checklist

Before publishing:

1. Confirm `index.html` references the latest asset version.
2. Run the app locally.
3. Test menu, shop, maps, reporting, settings, and game modes.
4. Confirm the admin button does not appear on the public domain.
5. Deploy to Netlify or Vercel.
6. Add a custom domain if needed.
7. Re-test the deployed URL on desktop and mobile.
