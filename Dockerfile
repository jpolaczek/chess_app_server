
FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
RUN npx prisma generate
CMD ["npm", "run", "start:dev"]