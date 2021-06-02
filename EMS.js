require('dotenv').config();
const inquirer = require('inquirer');


const { viewAllEmployees, viewEmployeeByDept, viewEmployeeByRole, } = require('./viewemployee');
const { addNewEmployee, addDepartment, addNewRole } = require('./add');
const { removeEmployee, } = require('./removeEmployee');
const { updateEmployeeRole, updateEmployeeManager } = require('./update');

const connection = require('./config/connection');




//first prompt for users asking what users like to do
const mainMenu = async () => {
    const question = [
        {
            type: 'list',
            name: 'action',
            message: 'What do you like to do ?  ',
            choices: ["View all employees", "View employees by department",
                "View all employees by Role", "Add Employee", "Add Department",
                "Add Role", "Remove Employee", "Update Employee Role", "Update Employee Manager",
                "EXIT"]
        }
    ]

    const userChoice = await inquirer.prompt(question);
    proceedUserChoice(userChoice);


}

//User main menu choices and function to call on those choices
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
            UpdateEmployeeRolePrompts();
            break;

        case "Update Employee Manager":
            UpdateEmployeeManagerPrompts();
            break;

        case "EXIT":
            process.exit(0);


        default:

            break;

    }


}


//propmt to add new Employee
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

//generates title list and manager name list choices for addEmployeePrompts 
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

//generates department name list for addRolePrompts
const addRole = async () => {

    // get all Department names
    let departments = await connection.query(`select D_name from department`);

    const departmentNames = departments[0].map(department => department.D_name);
    addRolesPrompts(departmentNames);
}

//Prompt to add New Role/title
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

//Prompt to Remove Employee
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

async function UpdateEmployeeRolePrompts() {

    const employeeList = await connection.query('Select concat(first_name, " ", last_name) as EmployeeName from employee');
    const employeeNames = employeeList[0].map(employee => employee.EmployeeName);

    //get all the titles from role table 
    const titlelist = await connection.query(
        `select title from role;`);
    const titles = titlelist[0].map(role => role.title);

    const updateRolePrompts = [
        {
            type: 'list',
            name: 'employeeName',
            message: 'Select which employee"s role you want to update :',
            choices: employeeNames

        },

        {
            type: 'list',
            name: 'role',
            message: 'Select which Role you want to give it to the selected Employee :',
            choices: titles

        },


    ]

    const updatedEmpData = await inquirer.prompt(updateRolePrompts);
    updateEmployeeRole(updatedEmpData.employeeName, updatedEmpData.role);



}
async function UpdateEmployeeManagerPrompts() {

    const employeeList = await connection.query('Select concat(first_name, " ", last_name) as EmployeeName from employee');
    const employeeNames = employeeList[0].map(employee => employee.EmployeeName);


    const updateManagerPrompts = [
        {
            type: 'list',
            name: 'employeeName',
            message: 'Select which employee  manager you want to update :',
            choices: employeeNames

        },

        {
            type: 'list',
            name: 'managerName',
            message: 'Select which Manager you want to assign  to the selected Employee :',
            choices: employeeNames

        },


    ]

    const updatedEmpData = await inquirer.prompt(updateManagerPrompts);
    updateEmployeeManager(updatedEmpData.employeeName, updatedEmpData.managerName);



}

mainMenu();
// async function init() {
//     const connection = await connection.connect();
//     if (connection) {
//         console.log(`PlaylistDB connected as id ${connection.threadId}`);
//         showMenu();
//     }
// };


// init();
