require('dotenv').config();
const inquirer = require('inquirer');


const { viewAllEmployees, viewEmployeeByDept, viewEmployeeByRole, } = require('./viewemployee');
const { addNewEmployee, addDepartment } = require('./add');

const connection = require('./config/connection');




//first prompt for users asking what users like to do
const showMenu = async () => {
    const question = [
        {
            type: 'list',
            name: 'action',
            message: 'What do you like to do ?  ',
            choices: ["View all employees", "View employees by department",
                "View all employees by Role", "Add Employee", "Add Department",
                "Remove Employee", "Update Employee Role", "Update Employee Manager"]
        }
    ]

    const userChoice = await inquirer.prompt(question);
    proceedUserChoice(userChoice);


}


//propmts for employee details  when user choose add employee choice
async function addEmployeePrompts(roles, names) {
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
        {
            type: 'list',
            name: 'manager',
            message: 'Select employee manager',
            choices: names,
        },


    ]

    const employeeData = await inquirer.prompt(newEmpData);
    addNewEmployee(employeeData.firstname, employeeData.lastname, employeeData.title, employeeData.manager);
};

//generates employee role choices
const addEmployee = async () => {

    //get all the titles from role table 
    let roles = await connection.query(
        `select title from role;`);
    let titles = roles[0].map(role => role.title);

    // get all Employee name 
    let names = await connection.query(`select concat(first_name, " ", last_name) as manager from employee; `)
    let managerNames = names[0].map(name => name.manager);


    addEmployeePrompts(titles, managerNames);
};

//Prompts to add Department
async function addDepartmentPrompts() {
    const deptPrompts = [
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name',

        }
    ]

    const newDepartment = await inquirer.prompt(deptPrompts);
    addDepartment(newDepartment.department);
}

function proceedUserChoice(userChoice) {

    switch (userChoice.action) {

        case "View all employees":
            viewAllEmployees();
            break;


        case "View employees by department":
            viewEmployeeByDept();
            break;


        case "View all employees by Role":
            viewEmployeeByRole();
            break;

        case "Add Employee":
            addEmployee();

            break;

        case "Add Department":
            addDepartmentPrompts();

            break;


        case "Remove Employee":
            break;

        case "Update Employee Role":
            break;

        case "Update Employee Manager":
            break;

        default:
            break;

    }


}

showMenu();
// async function init() {
//     const connection = await connection.connect();
//     if (connection) {
//         console.log(`PlaylistDB connected as id ${connection.threadId}`);
//         showMenu();
//     }
// };


// init();
