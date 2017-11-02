import mysql from 'mysql';
require('dotenv').load();

const mysqlPool = mysql.createPool({
    connectionLimit: 100,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    connectTimeout: 3600,
    acquireTimeout: 3600
});

export default mysqlPool;