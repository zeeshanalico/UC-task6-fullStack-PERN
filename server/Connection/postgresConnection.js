const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

module.exports= () => {

    const dbInfo = {
        user: process.env.USER,
        database: process.env.DATABASE,
        host: process.env.HOST,
        password: process.env.PASSWORD,
        port: process.env.DB_PORT
    };

    const client = new pg.Client(dbInfo)
    client.connect().then(() => {
        console.log('Connected to PostgreSQL database');
    })
        .catch((err) => {
            console.error('Error connecting to PostgreSQL database', err);
        });
    return client;
}

