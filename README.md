# todo-full-stack

This might NOT be a simple todo list as you think. The whole project was developed through TDD, which is known as Test-Driven-Development, to make my codes as more clean, structure, and reliable. Also, both frontend and backend system was structured by functional and modular method, not object-oriented programming (If needed, I could changing them to object-oriented programming at any time).

## Tech list

- Server
  - [x] `Nginx`

- Frontend
  - [x] `Vue.js`

- Backend
  - [x] `Express` - `Node.js`

- Database
  - [x] `MySQL`

- Platform
  - [x] `Docker`
  - [x] `Docker-Compose`

- Development method
  - [x] `TDD (Test-Driven-Development)`

## Environment Setup

1. Setting environment variables in `.env` file (at project root):

  ```bash
  # MySQL Docker container config
  MYSQL_ROOT_PASSWORD=<root-password>
  ```

2. Run the every docker-compose service(container) at background:

  ```bash
  $ sudo docker-compose up -d
  ```

## Vue Setup

1. Install all dependencies version-locked:

  ```bash
  $ npm ci
  ```

2. Run all unit tests:

  ```bash
  $ npm run test:unit
  ```

3. Run the development server:

  ```bash
  $ npm run serve
  ```

## MySQL Setup

> All connection settings are stored in `express/ormconfig.json`

> If you are first time to run the application, you need to do things below:

1. Get into MySQL workbench (password is stored in `.env`):

  ```bash
  $ sudo docker exec -it todo_mysql mysql -u root -p
  ```

2. Create database:

  - for test:

    ```sql
    mysql> CREATE DATABASE test;
    ```

  - for development:

    ```sql
    mysql> CREATE DATABASE development_db;
    ```

3. Create user:

  - for test:

    ```sql
    mysql> CREATE USER 'test'@'%' IDENTIFIED WITH mysql_native_password BY 'test';
    ```

  - for development:

    ```sql
    mysql> CREATE USER 'andrew'@'%' IDENTIFIED WITH mysql_native_password BY 'password';
    ```

4. Grant privileges on database to user:

  - for test:

    ```sql
    mysql> GRANT ALL PRIVILEGES ON `test`.* TO 'test'@'%';
    ```

  - for development:

    ```sql
    mysql> GRANT ALL PRIVILEGES ON `development_db`.* TO 'andrew'@'%';
    ```

5. Flush privileges:

  - for both test & development:

    ```sql
    mysql> FLUSH PRIVILEGES;
    ```

## Express Setup

1. Install all dependencies version-locked:

  ```bash
  $ npm ci
  ```

2. Run database migrations for test:

  ```bash
  $ npm run typeorm -- migration:run --connection test
  ```

3. Run database migrations for development:

  ```bash
  $ npm run typeorm -- migration:run --connection development
  ```

4. Run all unit tests:

  ```bash
  $ npm run test:unit
  ```

5. Run all integration tests:

  ```bash
  $ npm run test:integration
  ```

6. Run the development server:

  ```bash
  $ npm run serve
  ```

## Usage

Frontend website: `http://localhost:80`

Backend API base url: `http://localhost:3000/api/v1`

  - Get all todo items: `GET /`

  - Get a todo item: `GET /:id`

  - Create a todo item: `POST /`

  - Update a todo item: `PATCH /:id`

  - Delete a todo item: `DELETE /:id`
