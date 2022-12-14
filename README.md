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

3. Check Dockerfile 

```docker build . --tag nestjs-server```

 ```docker run --name nestjs-server-container nestjs-server```

```localhost:3000/```

```docker ps -a```

```docker rm -f eb6c1efa9d0d```

4. TypeORM ```npm i --save @nestjs/config @nestjs/typeorm typeorm pg```

5. Generate resource ```user```  ->  ```nest generate resource user```

6. entity :

```
export class User {}
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
```

7. interface : 

```
export interface IUser {
  id: number;
  name: string;
}
```

8. User module :

```
@Module({
  imports: [ TypeOrmModule.forFeature([ UserEntity ])],
  ...
})
export class UserModule {}
```

9. User service : 

```
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  add(user: IUser): Observable<IUser> {
    return from(this.userRepository.save(user));
  }

  findUsers(): Observable<IUser[]> {
    return from(this.userRepository.find());
  }
```

10. User controller :

```
 @Post()
  create(@Body() user: IUser): Observable<IUser> {
    return this.userService.add(user);
  }

  @Get()
  findAll(): Observable<IUser[]> {
    return this.userService.findUsers();
  }


```

11. Check api : ```docker compse up```