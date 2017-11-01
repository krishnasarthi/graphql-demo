import mysql from 'mysql';

const mysqlPool = mysql.createPool({
    connectionLimit: 100,
    host: 'mysql.megameeting.com',
    user: 'dbaloha',
    password: 'GrandioseCrashActress',
    database: 'megameeting',
    connectTimeout: 3600,
    acquireTimeout: 3600
});

export default mysqlPool;