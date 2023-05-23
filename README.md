Instructions:

1. pull frontend repo to the same catalog as this one(https://github.com/jpolaczek/react-typescript-template)
2. create database with a given name
3. `docker-compose up --build`
4. create `.env` file in a main folder and paste `DATABASE_URL="postgresql://express_server_chess:postgres@postgres_db:5432/express_server_chess?schema=public"`
5. log in to server-api container (`docker exec -it <containerID> sh`) and run `npx prisma generate` and `npx prisma migrate dev`
6. go to `localhost:3050` to interact with the website

Running specs:
1. log in to server-api container (`docker exec -it <containerID> sh`) and run `npm run migrate:test` to migrate test database.
2. `npm test`
