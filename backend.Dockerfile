FROM python:3.9-bullseye

COPY backend /app
WORKDIR /app

RUN rm __pycache__ -rf
RUN rm venv -rf
RUN pip install --no-cache-dir --upgrade -r requirements.txt
RUN alembic upgrade head

EXPOSE 8000


# for production
CMD ["gunicorn", "api.main:app", "--workers", "4", "--worker-class", "uvicorn.workers.UvicornWorker", "--bind", "0.0.0.0:8000"]

# for development
# CMD ["uvicorn", "backend.main:app", "--proxy-headers", "--host", "0.0.0.0", "--port", "8000", "--reload"]