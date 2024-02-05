# JOptim Experiment

![starter workflow](https://github.com/dominikpegler/joptim-game/actions/workflows/starter_wf.yml/badge.svg)

* Web experiment for collecting human solutions in general assignment problems 
* Next.js + FastAPI + PostgreSQL

## Cloning the repo


`git clone ssh://git@github.com/univiemops/joptim-exp`

## WebGazer

This repo uses our own fork of webgazer. If you want to make changes to webgazer, create a branch in our webgazer repo (https://github.com/univiemops/WebGazer), apply the changes inside the `src` folder, go back to the root directory and build webgazer with `npm run build`. This will create the new files `dist/webgazer.js` and `dist/webgazer.js.map`. Copy them into the folder `frontend/public/` inside the experiment repo. Within the experiment, always link to the webgazer.js file in `frontend/public/`, do not link to an external source as we have no control over it and changes there might break our code.  If you don't need eyetracking, simply comment out the relevant lines in `frontend/pages/experiment.tsx`.

## rrweb

[rrweb](https://github.com/rrweb-io/rrweb) is used for recording and replaying participant interactions in the experiment, allowing us to understand and reproduce participant behavior for further analysis and experimental design improvement. If you don't need it, simply comment out the relevant lines in `frontend/pages/_app.tsx` and `frontend/pages/_document.tsx`.

## Prerequisite

Place `trials.pkl` file into the backend folder. If file is missing or the backend is not set up correctly, the frontend will fall back to an own random trial generation.

## Production

### Setup database

Create `db.Dockerfile` and add your database credentials

```bash
cd database
cp db.dev.Dockerfile db.Dockerfile
```

Make sure these are the same as in db.Dockerfile

```bash
cd backend
echo "DATABASE_URL=postgresql://user:pass@db/db" > .env
```

Create `alembic.ini`, 

```bash
cp alembic_dev.ini alembic.ini
```

... If needed, adapt this line to your own database url:

```
sqlalchemy.url = postgresql://user:pass@db/db
```

### Run application

Go back to project root directory and run

#### Option A: On a server with more experiments (using traefik)

(Requires a running traefik container)

```bash
docker-compose -f docker-compose.traefik.yml up
```
Experiment is now running on `https://<servername>/joptim`

#### Option B: As a single experiment on the host server (using nginx)

(Requires `cert.pem` and `key.pem`to be in project root directory. You can use `create_self_signed_cert.sh` to create temporary ones)

```bash
docker-compose up
```
Experiment is now running on `https://<servername>/joptim`

## Development

```bash
docker-compose -f docker-compose.dev.yml up
```

Go to `frontend` directory and run the TypeScript compiler:
```bash
tsc --watch
```

Go to your browser, open [http://localhost:3000/joptim](http://localhost:3000/joptim) for the API and start developing. For correct linting, code formatting, etc., in your IDE it can be necessary to have the dependencies installed locally as well (run `npm install` inside `frontend/`).

## Debugging

For debugging purposes or when developing it may help to temporarily enable the fastapi docs. Comment out the following lines of code (for security reasons, it should be disabled in production).

In `backend/main.py`:

```
app = FastAPI(
    # docs_url=None,  # Disable docs (Swagger UI)
    # redoc_url=None,  # Disable redoc
)
```

Then go to:

[http://localhost:8000/docs](http://localhost:8000/docs)

## TODOs
* Finalize experimental design
* Admin page for downloading the collected data via browser (Authentication required)
* Alembic reintegration

## ISSUES
* Firefox: Ad/script blocker seems to block loading rrweb scripts (see https://stackoverflow.com/questions/45879671/only-on-firefox-loading-failed-for-the-script-with-source)
* Websocket: Not reachable on production server w/ SSL (traefik issue?)
* rrweb: Some CSS not rendering correctly in player (https://github.com/rrweb-io/rrweb/issues/1219)
