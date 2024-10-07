FROM python:3.9-slim

WORKDIR /app
COPY . /app/
RUN pip install -r requirment.txt

EXPOSE 8080


CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]

