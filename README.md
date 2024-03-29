# Xtech2023

## Prerequisites

* To run frontend: Node >= 14.0.0 and npm >= 5.6

## Getting started

Backend
* Install Python
* Install Pip
* Run `cd backend`
* Run `pip install shell`
* Run `pipenv shell`
* Run `pip install -r requirements.txt`
* Run `python manage.py migrate`
* Run `python manage.py createsuperuser` to create a user you can access the admin panel with

* Add all needed environment variables to your env

Frontend
* Run `cd frontend && npm install`

## Run project

Frontend:
* Run `cd frontend && npm run dev`
* Frontend runs on `http://127.0.0.1:3000/`

Backend:
* Run `cd backend`
* Run `pipenv shell` to start virtual environment
* Run `python manage.py runserver`
* Backend runs on `http://127.0.0.1:8000/`
* Admin dashboard on `http://127.0.0.1:8000/admin`

Make changes in DB:
* Make the changes in the models.py files
* Run `python manage.py makemigrations`
* Run `python manage.py migrate`
* Register your changes in the admin.py of the respective app

## Learn more

* [Tailwind CSS](https://tailwindcss.com/docs/installation)
* [React](https://reactjs.org/docs/getting-started.html)
* [Django](https://docs.djangoproject.com/en/4.1/)