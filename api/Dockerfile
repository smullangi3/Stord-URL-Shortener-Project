FROM python:3.9
WORKDIR /app

COPY requirements.txt api.py .flaskenv ./
RUN pip install -r ./requirements.txt
ENV FLASK_ENV production

EXPOSE 8080
CMD ["gunicorn", "-b", ":8080", "api:app"]