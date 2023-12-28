# homebase-assignment

## express_web
- Docker should already installed in local
- In terminal type: `cd express_web`
- Run server Express in terminal type: `docker-compose up`
- CRUD APIs for express_web:
- 1. Health check: `curl --location 'http://localhost:3001'`
- 2. Get all users: `curl --location 'http://localhost:3001/users'`
- 3. Get user by id: `curl --location 'http://localhost:3001/users/1'`
- 4. Create user: ` curl --location 'http://localhost:3001/users' \
  --header 'Content-Type: application/json' \
  --data-raw '{
      "email": "user3@mock.dev",
      "fullName": "user 3 mock",
      "address": "Ho Chi Minh city"
  }'`
- 5. Update User info By id: `curl --location --request PUT 'http://  localhost:3001/users/4' \
  --header 'Content-Type: application/json' \
  --data '{
      "address": "Thu Duc city"
  }'`
- 6. Delete User by id: `curl --location --request DELETE 'http://localhost:3001/users/4'`

## django_web
- Python 3 should already installed in local
- In terminal type: `cd django_web`
- Run django admin in terminal type:
- 1. `python manage.py createsuperuser`
- 2. type user credentials
- 3. `python manage.py runserver`
- 4. Open `localhost:8000/admin` to login and open admin UI 
- 5. Perform CRUD with url `localhost:8000/admin/products`

## proxy
- Run django server and Perform Express's CRUD APIs with url `localhost:8000/api`