Instructions:

1. pull frontend repo to the same catalog as this one(https://github.com/jpolaczek/react-typescript-template)
2. create database with a given name
3. `docker-compose up --build`
4. log in to server-api container (`docker exec -it <containerID> sh`) and run `npx prisma generate` and `npx prisma migrate dev`
5. go to `localhost:3050` to interact with the website
