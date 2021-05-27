const connection = require('../config/connection');

Employee = {

    viewAllEmployees: () => {
        connection.query(
            `select
            e1.id,
            e1.first_name,
            e1.last_name,
            role.title,
            role.salary,
            department.D_name AS Department,
            concat(e2.first_name, " ", e2.last_name) as Manager
            from
            employee e1
            INNER JOIN role ON e1.role_id = role.id
            INNER JOIN department on role.department_id = department.id
            LEFT JOIN employee e2 on e1.manager_id = e2.id;`,
            (err, response) => {
                if (err) throw err;
                console.table(response);

            });
    }


};


module.exports = Employee;