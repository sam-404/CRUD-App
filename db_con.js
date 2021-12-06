//Creating connection
var mysql = require('mysql');

const db =  mysql.createConnection({
    hostname: 'localhost',
    user: 'root',
    password: '',
    database: 'my_db',
    port: 3306
});

//connect
db.connect((err)=> {
    if(err){
        throw err;
    }
    console.log('Successfully connected');
});

module.exports = mysql;
module.exports = db;
