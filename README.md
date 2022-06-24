npm run start:dev
Starts the application in development using nodemon and ts-node to do cold reloading.

npm run build
Builds the app at build, cleaning the folder first.

npm run start
Starts the app in production by first building the project with npm run build, and then executing the compiled JavaScript at build/index.js.

how to run the db for the service: 
docker run -p 5432:5432 -e POSTGRES_PASSWORD=postgres -v ~/Documents/pgp_salt/weektest_todoList/dbtodolist:/var/lib/postgresql/data -d postgres