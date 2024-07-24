## Note:this repo has three branches
`main` : basic functionality

`additional-features` : basic + additional functionality ,(frontend auth using nested routes)

`additional-features-redux-thunk` : basic + additional functionality ,(frontend auth using redux + redux-thunk)



## Prerequisites

- Node.js and npm installed
- PostgresSQL installed
  
## Overview

This project consists of two main  the client and the server. The client is a frontend application, while the server handles the backend logic and interacts with the database.
it also has a database directory with backup.sql run execute that file in postgres db

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

Install the dependencies at backend
```bash
cd server
npm install
```

Install the dependencies at frontend
```bash
cd client
npm install
```
## Environment Variables

add a config.env file in server directory with the following environment variables

`PORT` 
`USER` 
`DATABASE`
`HOST`
`PASSWORD`

`DB_PORT` default port i.e 5432 

`SECRET_KEY` any random string


Start the backend server
```bash
npm run start
```
Start the frontend
```bash
npm run start
```


