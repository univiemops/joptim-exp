# joptim-game

next.js + fastapi + postgres

## Production

### Setup database

Make sure these are the same as in db.Dockerfile

```
echo "DATABASE_URL=postgresql://joptim_user:joptim_pass@localhost/joptim" > .env

```

In alembic.ini, find this line and change it to your own database url:

```
sqlalchemy.url = postgresql://joptim_user:joptim_pass@localhost/joptim
```

Go back to project root directory

### Run application

```bash
docker-compose up
```

## Development

### Database

```bash
docker-compose -f docker-compose.dev.yml up
```

### Backend

Setup

```bash
cd backend
python -m venv venv
. venv/bin/activate
pip install -r requirements.txt
```

Create `.env` file with your own database url.

```
echo "DATABASE_URL=postgresql://joptim_user:joptim_pass@localhost/joptim" > .env

```

In alembic.ini, find this line and change it to your own database url:

```
sqlalchemy.url = postgresql://joptim_user:joptim_pass@localhost/joptim
```

Run database migration

```bash
alembic upgrade head

```

Run the development server

```bash
uvicorn main:app --reload
```

Open http://localhost:8000/docs with your browser to see the result.

### Frontend

Install dependencies

```bash
cd frontend
npm install

```

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
