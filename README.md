# Ardit Portfolio

Personal portfolio built with React + TypeScript + Vite.

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Free deployment options

This repo is already configured for:

- Vercel (`vercel.json`)
- Netlify (`netlify.toml`)
- Cloudflare Pages (standard Vite build)
- GitHub Pages (`.github/workflows/deploy-gh-pages.yml`)

Build settings (same for all):

- Build command: `npm run build`
- Output directory: `dist`

## Deploy in 3 minutes

### Option 1: Vercel (recommended)
1. Push this project to GitHub.
2. Open Vercel and click `Add New -> Project`.
3. Import your repo and deploy (build settings are auto-detected).
4. Add your custom domain in `Project -> Settings -> Domains`.

### Option 2: Netlify
1. Push this project to GitHub.
2. Open Netlify and click `Add new site -> Import an existing project`.
3. Select your repo and deploy.
4. Add custom domain in `Domain management`.

### Option 3: Cloudflare Pages
1. Push this project to GitHub.
2. Open Cloudflare Pages and create a new project from GitHub.
3. Build command: `npm run build`
4. Output directory: `dist`
5. Deploy and connect domain in `Custom domains`.

### Option 4: GitHub Pages
1. Push this project to GitHub on `main` branch.
2. In GitHub repo: `Settings -> Pages`.
3. Under `Build and deployment`, set `Source` to `GitHub Actions`.
4. Push to `main` and the workflow deploys automatically.
5. Your site will be available at:
   - `https://<username>.github.io/<repo-name>/`

## Custom domain note

You requested: `ardit-konjuhi.portofolie.app`

To make it live, you must:
1. Own the domain (or subdomain) in a DNS provider.
2. Point DNS records to your hosting provider.
3. Add the domain inside Vercel/Netlify/Cloudflare.

I can help you step-by-step for whichever provider you choose.
