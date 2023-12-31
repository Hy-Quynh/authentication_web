const mysql = require('mysql')

MYSQL_USER = 'root'
MYSQL_HOST = 'localhost'
MYSQL_DB = 'authentication_web'
MYSQL_PWD = 'Lieuhyquynh3001'
MYSQL_PORT = '3306'

const mysqlConfig = {
    host: MYSQL_HOST,
    user: MYSQL_USER,
    port: MYSQL_PORT,
    password: MYSQL_PWD,
    database: MYSQL_DB
    // ssl: true
}

const pool = mysql.createPool({...mysqlConfig, charset : 'utf8'})
/**
 *
 * @param {String} queryStr
 * @returns Object
 */

const query = async (queryStr) => {    
    return new Promise((resolve, reject) => {
        pool.getConnection(function(err, connection) {
            connection.query(queryStr, function(err, rows) {
                connection.release();
                return resolve(rows)     
            });
        });
    })
}

module.exports.mysql = {
    query,
}
