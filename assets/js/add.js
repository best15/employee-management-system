const connection = require('../../config/connection');
const { viewAllEmployees, } = require('./viewemployee');

add = {

    addNewEmployee: async (f_name, l_name, title, manager) => {

        //get role_id from title
        const role_id = await connection.query(
            "select id from role where title = ?;", [title]);

        //get employee id from name
        const manager_id = await connection.query(
            `select id from employee where concat(first_name, " ", last_name) = ?;`, [manager]);


        //Create new employee as per user input
        await connection.query("Insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?);"
            , [f_name, l_name, role_id[0][0].id, manager_id[0][0].id],
            (err, result) => {
                if (err) throw (err);

                console.log("Employee successfully added !");
            }

        );

        await viewAllEmployees();

    },

    addDepartment: async (dept_name) => {

        await connection.query("Insert into department (D_name) values(?);"
            , [dept_name], (err, result) => {
                if (err) throw err;

                console.log("New Department Added Successfully !")
            }

        );

        const res = await connection.query("Select * FROM department");
        console.table(res[0]);

    },

    addNewRole: async (title, salary, dept_name) => {


        const department_id = await connection.query(
            "select id from department where D_name = ?;", [dept_name]);

        await connection.query("Insert into role (title, salary, department_id) values(?,?,?);"
            , [title, salary, department_id[0][0].id], (err, result) => {
                if (err) throw err;
                console.log("New Role Added Successfully !")
            }

        );

        const res = await connection.query("Select * FROM role");
        console.table(res[0]);

    },

};


module.exports = add;