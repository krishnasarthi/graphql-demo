'use strict';

import mysqlPool from './dbConnection';
import mysql from 'mysql';

function getDbConnectionError(err) {
    return {
        "Code": 100,
        "Status": "Error in connection database",
        "Error": err
    }
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        mysqlPool.getConnection(function (err, connection) {
            if (err) {
                if (connection)
                    connection.release();
                reject(getDbConnectionError(err));
            }

            connection.query(query, function (err, rows, fields) {
                if (connection)
                    connection.release();
                if (err) {
                    reject(getDbConnectionError(err));
                }

                resolve(rows);
            })
        })
    })
}


class Account {
    // Method
    async getAccountsAsync(Acc_Domain) {
        var query = 'select Acc_AccountName from Accounts where Acc_Domain=?';
        var inserts = [Acc_Domain];
        query = mysql.format(query, inserts);

        return await executeQuery(query);
    }
}

export default Account;