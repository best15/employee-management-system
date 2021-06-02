const connection = require('./config/connection');
// const connection = require('./config/connection');

ViewEmployee = {

    viewAllEmployees: async () => {
        const res = await connection.query(
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
            LEFT JOIN employee e2 on e1.manager_id = e2.id;`);


        console.table(res[0]);
    },

    viewEmployeeByDept: async () => {

        const res = await connection.query(
            `select employee.id, 
            concat(first_name, " ", last_name ) as Employee,
            department.D_name as Department 
            from
            employee
            inner join role on employee.role_id = role.id
            inner join department on role.department_id = department.id;`);
        console.table(res[0]);
    },

    viewEmployeeByRole: async () => {

        const res = await connection.query(
            `select employee.id, 
            concat(first_name, " ", last_name ) as Employee,
            role.title as Role, role.salary
            from
            employee
            inner join role on employee.role_id = role.id
            ;`);
        console.table(res[0]);
    },

    addNewEmployee: async (f_name, l_name, title, manager) => {

        //get role_id from title
        const role_id = await connection.query(
            "select id from role where title = ?;", [title]);

        //get employee id from name
        const manager_id = await connection.query(
            `select id from employee where concat(first_name, " ", last_name) = ?;`, [manager]);

        //Create new employee as per user input
        connection.query("Insert into employee(first_name,last_name,role_id,manager_id) values(?,?,?,?);"
            , [f_name, l_name, role_id[0][0].id, manager_id[0][0].id],
            function (err, result) {
                if (err) console.error(err)
                else {
                    console.log("Employee successfully added !");
                }
            }

        );

        //Show whole employee table with new added employee
        const res = await connection.query(
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
            LEFT JOIN employee e2 on e1.manager_id = e2.id;`);


        console.table(res[0]);

    },

};


module.exports = ViewEmployee;