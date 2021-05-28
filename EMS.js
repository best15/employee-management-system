require('dotenv').config();
const inquirer = require('inquirer');
const connection = require('./config/connection');

const ViewEmployee = require('./viewemployee');

//first prompt for users
const showMenu = async () => {
    const question = [
        {
            type: 'list',
            name: 'action',
            message: 'What do you like to do ?  ',
            choices: ["View all employees", "View employees by department",
                "View all employees by Role", "Add Employee",
                "Remove Employee", "Update Employee Role", "Update Employee Manager"]
        }
    ]

    const userChoice = await inquirer.prompt(question);
    proceedUserChoice(userChoice);


}

// function getRoleid() {

//     connection.query(
//         `select id from role where title = 'Marketing Head';
//         ;`,
//         (err, response) => {
//             if (err) throw err;
//             employeeData = response;

//         });
//     console.log(employeeData.role);
// }

//propmts for employee details  when user choose add employee choice
async function addPrompts(roles) {
    const newEmpData = [
        {
            type: 'input',
            name: 'firstname',
            message: 'Enter First Name of the employee',
        },
        {
            type: 'input',
            name: 'lastname',
            message: 'Enter Last Name of the employee',
        },
        {
            type: 'list',
            name: 'title',
            message: 'Select employee title/role',
            choices: roles,
        },


    ]

    const employeeData = await inquirer.prompt(newEmpData);
    // addEmployee(employeeData.firstname, employeeData.lastname, employeeData.title, employeeData.manager);
}

//generates employee role choices
const addEmployee = async () => {
    let titles = [];
    connection.query(
        `select title from role ;
        ;`, (err, response) => {
        if (err) throw err;
        roles(response);
    });

    function roles(roles) {

        titles = roles.map(role => role.title);
        addPrompts(titles);
    }

}

function proceedUserChoice(userChoice) {

    switch (userChoice.action) {

        case "View all employees":
            ViewEmployee.viewAllEmployees();
            break;


        case "View employees by department":
            ViewEmployee.viewEmployeeByDept();
            break;


        case "View all employees by Role":
            ViewEmployee.viewEmployeeByRole();
            break;

        case "Add Employee":
            addEmployee();
            break;


        case "Remove Employee":



        case "Update Employee Role":


        case "Update Employee Manager":

    }


}

connection.connect((err) => {
    if (err) throw err;
    console.log(`PlaylistDB connected as id ${connection.threadId}`);
    showMenu();
});
