require('dotenv').config();
const connection = require('./config/connection');

const inquirer = require('inquirer');


const { viewAllEmployees, viewEmployeeByDept, viewEmployeeByRole, } = require('./assets/js/viewemployee');
const { addNewEmployee, addDepartment, addNewRole } = require('./assets/js/add');
const { removeEmployee, } = require('./assets/js/removeEmployee');
const { updateEmployeeRole, updateEmployeeManager } = require('./assets/js/update');
const getRoles = require('./assets/js/getRoles');
const getEmployeeNames = require('./assets/js/getEmployeeNames');
const getDepartmentNames = require('./assets/js/getDepartmentNames');





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
async function proceedUserChoice(userChoice) {

    switch (userChoice.action) {

        case "View all employees":
            await viewAllEmployees();
            mainMenu();
            break;


        case "View employees by department":
            await viewEmployeeByDept();
            mainMenu();
            break;


        case "View all employees by Role":
            await viewEmployeeByRole();
            mainMenu();
            break;

        case "Add Employee":
            await addEmployeePrompts();
            mainMenu();
            break;

        case "Add Department":
            await addDepartmentPrompts();
            mainMenu();
            break;


        case "Add Role":
            await addRolesPrompts();
            mainMenu();
            break;

        case "Remove Employee":
            await removeEmployeePrompts();
            mainMenu();
            break;

        case "Update Employee Role":
            await UpdateEmployeeRolePrompts();
            mainMenu();
            break;

        case "Update Employee Manager":
            await UpdateEmployeeManagerPrompts();
            mainMenu();
            break;

        case "EXIT":
            process.exit(0);


        default:

            break;

    }


}


//propmt to add new Employee
async function addEmployeePrompts() {

    const names = await getEmployeeNames();
    const roles = await getRoles();

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
    await addNewEmployee(employeeData.firstname, employeeData.lastname, employeeData.title, employeeData.manager);
};


//Prompts to add Department
async function addDepartmentPrompts() {
    const deptPrompts = [
        {
            type: 'input',
            name: 'department',
            message: 'Enter new department name :',

        }
    ]

    const newDepartment = await inquirer.prompt(deptPrompts);
    await addDepartment(newDepartment.department);
}



//Prompt to add New Role/title
async function addRolesPrompts() {

    const departments = await getDepartmentNames();

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

    await addNewRole(roleData.title, roleData.salary, roleData.department);
}

//Prompt to Remove Employee
async function removeEmployeePrompts() {


    const employeeNames = await getEmployeeNames();


    const removeEmployeePrompts = [
        {
            type: 'list',
            name: 'EmployeeName',
            message: 'Select Employee you want to remove :',
            choices: employeeNames,

        },
    ]

    const tobeRemoveEmp = await inquirer.prompt(removeEmployeePrompts);
    await removeEmployee(tobeRemoveEmp.EmployeeName);

}

async function UpdateEmployeeRolePrompts() {

    const employeeNames = await getEmployeeNames();
    const titles = await getRoles();

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
    await updateEmployeeRole(updatedEmpData.employeeName, updatedEmpData.role);



}
async function UpdateEmployeeManagerPrompts() {


    const employeeNames = await getEmployeeNames();

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
    await updateEmployeeManager(updatedEmpData.employeeName, updatedEmpData.managerName);



}

mainMenu();

