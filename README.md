# todo-full-stack

## Tech list

- Server
  - [x] `Nginx`

- Frontend
  - [x] `Vue.js`

- Backend
  - [x] `Express` - `Node.js`
  - [ ] `Laravel` - `PHP`
  - [ ] `Gin` - `Go`

- Database
  - [x] `MySQL`

## MySQL Setup

> If you are first time to run `docker-compose`, you need to do things below:

1. Open terminal and execute `$ docker-compose up -d` to run all containers

2. Get into MySQL workbench: `$ docker exec -it todo_mysql mysql -u root -p` (password is stored in `.env`)

3. Create database: `mysql> CREATE DATABASE test;` (database name is stored in `express/ormconfig.json`)

4. Create user authenticated by `mysql_native_password` which `TypeORM` required: `mysql> CREATE USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY 'test';` (username, password is stored in `express/ormconfig.json`)

5. Grant all privileges on `test` database to user `'test'@'%'`: `mysql> GRANT ALL PRIVILEGES ON `test`.* TO 'test'@'%';`

6. Flush privileges: `mysql> FLUSH PRIVILEGES;`
