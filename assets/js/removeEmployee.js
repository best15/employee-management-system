const connection = require('../../config/connection');
const { viewAllEmployees, } = require('./viewemployee');


remove = {

    removeEmployee: async (employeeName) => {


        await connection.query(`delete from employee where concat(first_name, " ", last_name) = ?;`, [employeeName]);

        console.log("Employee Removed Successfully !");

        await viewAllEmployees();
    },


};


module.exports = remove;