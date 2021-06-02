const connection = require('../../config/connection');

//get all the titles from role table 
async function getEmployeeNames() {
    // get all Employee name 
    let names = await connection.query(`select concat(first_name, " ", last_name) as EmployeeName from employee; `);
    let employeeNames = names[0].map(name => name.EmployeeName);
    return employeeNames;
}

module.exports = getEmployeeNames;