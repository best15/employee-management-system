const connection = require('../../config/connection');
const { viewAllEmployees, } = require('./viewemployee');


update = {

    updateEmployeeRole: async (employeeName, updatedTitle) => {

        console.log(employeeName, updatedTitle);

        //get role_id from title
        const role_id = await connection.query(
            "select id from role where title = ?;", [updatedTitle]);

        await connection.query(`Update employee set role_id = ? where concat(first_name, " ", last_name) = ?;`, [role_id[0][0].id, employeeName]);

        console.log("Employee Role Update Successfull !");

        await viewAllEmployees();
    },

    updateEmployeeManager: async (employeeName, managerName) => {

        console.log(employeeName, managerName);

        //get employee id from name
        const manager_id = await connection.query(
            `select id from employee where concat(first_name, " ", last_name) = ?;`, [managerName]);

        await connection.query(`Update employee set manager_id = ? where concat(first_name, " ", last_name) = ?;`, [manager_id[0][0].id, employeeName]);

        console.log("Employee Manager Update Successfull !");


        await viewAllEmployees();
    },


};


module.exports = update;