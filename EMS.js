require('dotenv').config();
const mysql = require('mysql');
const inquirer = require('inquirer');


const connection = mysql.createConnection({
    host: 'localhost',

    port: 3306,

    user: process.env.DB_USER,

    password: process.env.DB_PASSWORD,

    database: process.env.DB_NAME,
});


connection.connect((err) => {
    if (err) throw err;
    console.log(`PlaylistDB connected as id ${connection.threadId}`);

});
