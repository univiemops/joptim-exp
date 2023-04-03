# JOptim Experiment

![starter workflow](https://github.com/dominikpegler/joptim-game/actions/workflows/starter_wf.yml/badge.svg)

* Web experiment for collecting human solutions for general assignment problems 
* Next.js + FastAPI + PostgreSQL

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
echo "DATABASE_URL=postgresql://joptim_user:joptim_pass@db/joptim" > .env
```

Create `alembic.ini`, 

```bash
cp alembic_dev.ini alembic.ini
```

... open it in a text editor and change this line to your own database url:

```
sqlalchemy.url = postgresql://joptim_user:joptim_pass@db/joptim
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

Go to your browser, open [http://localhost:3000/joptim](http://localhost:3000/joptim) or [http://localhost:8000/docs](http://localhost:8000/docs) for the API and start developing.

## TODOs
* Finalize experimental design
* Enable Prolific integration
* Remove fallback trial generation if no backend is available
* Admin page for downloading the collected data via browser (Authentication required)
