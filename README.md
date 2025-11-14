# RutinGester Backend (Render Deployment)

This backend is ready to deploy on Render with a managed PostgreSQL database.

## Environment variables

The app reads the following variables:

- `PORT`: Port assigned by Render (no need to set manually).
- `DATABASE_URL`: Full Postgres connection string (auto-injected by Render).
- `AUTH0_DOMAIN`: Your Auth0 tenant domain (e.g. `your-tenant.us.auth0.com`).
- `AUTH0_AUDIENCE`: Your API Identifier from Auth0.
- Optional (local dev): `DB_HOST`, `DB_NAME`, `DB_USER`, `DB_PASS` if you prefer not to use `DATABASE_URL` locally.
- Optional: `DB_SSL` (set to `false` to disable SSL locally if needed).

## Local development

1. Create `.env` in project root:

```
PORT=3000
DB_HOST=localhost
DB_NAME=rutingester
DB_USER=postgres
DB_PASS=postgres
AUTH0_DOMAIN=your-tenant.us.auth0.com
AUTH0_AUDIENCE=https://your-api-identifier
```

2. Install deps and run:

```
npm install
npm run dev
```

3. Seed exercises (optional):

```
npm run seed
```

## Deploy to Render

There are two supported approaches. The repo includes `render.yaml` for Blueprints (recommended).

### A) Blueprint deploy (recommended)

1. Push this folder to a GitHub repository.
2. In Render, click New → Blueprint, pick your repo.
3. Review and apply. The blueprint will create:
   - A Web Service (Docker runtime) for this backend.
   - A managed PostgreSQL database, and inject `DATABASE_URL` into the service.
4. After the first successful deploy, add the following environment variables in the Web Service:
   - `AUTH0_DOMAIN`
   - `AUTH0_AUDIENCE`
5. Optional: seed data. In the Render service → Shell tab, run

```
npm run seed
```

The service listens on `PORT` and exposes health check at `/`.

### B) Manual setup (if not using Blueprint)

1. Create a new Web Service from this repo in Render. Since `Dockerfile` is present, Render will use Docker.
2. Create a new PostgreSQL database in Render.
3. In the Web Service → Environment, add:
   - `DATABASE_URL` = (copy from the database connection string)
   - `NODE_ENV` = `production`
   - `AUTH0_DOMAIN`, `AUTH0_AUDIENCE`
4. Deploy. After it’s healthy, optionally seed with `npm run seed` from the Render Shell.

## File uploads on Render

Uploads are written to the `/uploads` folder and served at `/uploads/*`.
Note: Render’s container filesystem is ephemeral. Files may be lost on redeploys or instance restarts. For persistent storage, consider moving uploads to S3, Cloudinary, or similar. Until then, images will work while the instance remains active.

## Swagger

- API Docs UI at `/api-docs`
- JSON spec at `/api-docs.json`
