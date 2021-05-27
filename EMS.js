require('dotenv').config();
const inquirer = require('inquirer');
const connection = require('./config/connection');
const Employee = require('./lib/employee');

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
        Employee.viewAllEmployees();
        showMenu();
    }
    else { console.log('error receiving data') };

}

connection.connect((err) => {
    if (err) throw err;
    console.log(`PlaylistDB connected as id ${connection.threadId}`);
    showMenu();
});
