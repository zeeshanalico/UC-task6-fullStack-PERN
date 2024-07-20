
## Prerequisites

- Node.js and npm installed
- A live server extension for serving the frontend (e.g., Live Server for VSCode)
- Postgres DB
- 
## Overview

This project consists of two main  the client and the server. The client is a frontend application, while the server handles the backend logic and interacts with the database.
it also has a database directory with db.sql run execute that file in postgres db

### Clone the Repository

First, clone the repository to your local machine:
```bash
git clone https://github.com/zeeshanalico/UC-task5-fullStack.git
```
configure/restore the database
```bash
cd DB
create -U username -c "dbname"
psql -U username dbname < backup.sql
```

Install the dependencies
```bash
cd server
npm install
```
add a config.env file in server directory with given properties like 
```bash

PORT=3000
USER=username
DATABASE=dbname
HOST=localhost etc
PASSWORD=******
DB_PORT=default port i.e 5432 
```

start the backend server
```bash
npm run start
```


