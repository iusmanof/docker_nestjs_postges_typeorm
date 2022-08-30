# docker_nestjs_postges_typeorm

1. Create new nest api
```
nest new . nest-api
```

Check api -> localhost:3000/ 'Hello world' : ```npm run start``` -> ``` curl localhost:3000/```

2. Add files:

Dockerfile :

```
FROM node:latest

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY ./ ./

RUN npm run build 

EXPOSE 3000

CMD ["node","dist/main"]
```

.dockerignore :

```
node_modules
Dockerfile
npm-debug.log
```

docker-compose.yml :

```
version: "3.8"

services:
  api:
    # image: nest-server
    build: 
      dockerfile: Dockerfile
      context: ./
    depends_on: 
      - postgres
    environment: 
      DATABASE_URL: postgres://user:password@postgres:5432/db
      NODE_ENV: development
      PORT: 3000
    ports:
        - "8080:3000"
  postgres:
    image: postgres:14
    ports:
      - "35000:5432"
    environment: 
      POSTGRES_USER: user
      POSTGRES_PASSWORD: password
      POSTGRES_DB: db
    volumes: 
      - data:/var/lib/postgresql/data

volumes:
  data: 
```