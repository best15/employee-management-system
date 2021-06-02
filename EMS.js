require('dotenv').config();
const inquirer = require('inquirer');


const { viewAllEmployees, viewEmployeeByDept, viewEmployeeByRole, } = require('./viewemployee');
const { addNewEmployee, addDepartment, addNewRole } = require('./add');
const { removeEmployee, } = require('./removeEmployee');

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
                "Add Role", "Remove Employee", "Update Employee Role", "Update Employee Manager"]
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
    let names = await connection.query(`select concat(first_name, " ", last_name) as manager from employee; `);
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

const addRole = async () => {

    // get all Department names
    let departments = await connection.query(`select D_name from department`);

    const departmentNames = departments[0].map(department => department.D_name);
    addRolesPrompts(departmentNames);
}

async function addRolesPrompts(departments) {
    const rolePrompts = [
        {
            type: 'input',
            name: 'title',
            message: 'Enter new title :',

        },
        {
            type: 'input',
            name: 'salary',
            message: 'Enter Salary for new title :',

        },
        {
            type: 'list',
            name: 'department',
            message: 'Select Department for new title :',
            choices: departments

        }
    ]
    const roleData = await inquirer.prompt(rolePrompts);

    addNewRole(roleData.title, roleData.salary, roleData.department);
}

async function removeEmployeePrompts() {

    const employeeList = await connection.query('Select concat(first_name, " ", last_name) as EmployeeName from employee');
    let employeeNames = employeeList[0].map(employee => employee.EmployeeName);


    const removeEmployeePrompts = [
        {
            type: 'list',
            name: 'EmployeeName',
            message: 'Select Employee you want to remove :',
            choices: employeeNames,

        },
    ]

    const tobeRemoveEmp = await inquirer.prompt(removeEmployeePrompts);
    removeEmployee(tobeRemoveEmp.EmployeeName);

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


        case "Add Role":
            addRole();

            break;
        case "Remove Employee":
            removeEmployeePrompts();
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
