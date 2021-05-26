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

function viewEmployees() {
    connection.query(
        `select
        e1.id,
        e1.first_name,
        e1.last_name,
        role.title,
        role.salary,
        department.D_name AS Department,
        concat(e2.first_name, " ", e2.last_name) as Manager
        from
        employee e1
        INNER JOIN role ON e1.role_id = role.id
        INNER JOIN department on role.department_id = department.id
        LEFT JOIN employee e2 on e1.manager_id = e2.id;`,
        (err, response) => {
            if (err) throw err;
            console.table(response);
        });

};

const showMenu = () => {
    const question = [
        {
            type: 'list',
            name: 'action',
            message: 'What do you like to do ?  ',
            choices: ["View all employees", "View employees by department ?",
                "View all employees by Role ?", "Add Employee ",
                "Remove Employee ?", "Update Employee Role", "Update Employee Manager"]
        }
    ]

    inquirer.prompt(question).then((userChoice) => {
        proceedUserChoice(userChoice);
    });

}

function proceedUserChoice(userChoice) {
    console.log("userChoice", userChoice);
    if (userChoice.action === 'View all employees') {
        viewEmployees();
        showMenu();
    }
    else { console.log('errorr receiving data') };

}

connection.connect((err) => {
    if (err) throw err;
    console.log(`PlaylistDB connected as id ${connection.threadId}`);
    showMenu();
});
