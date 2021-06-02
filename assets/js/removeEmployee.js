const connection = require('../../config/connection');
const { viewAllEmployees, } = require('./viewemployee');


remove = {

    removeEmployee: async (employeeName) => {

        console.log(employeeName);

        await connection.query(`delete from employee where concat(first_name, " ", last_name) = ?;`, [employeeName],
            (err, result) => {
                if (err) throw err;
                console.log("Employee Removed Successfully !")
            }

        );
        viewAllEmployees();
    },


};


module.exports = remove;