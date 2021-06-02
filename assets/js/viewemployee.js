const connection = require('../../config/connection');


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


};


module.exports = ViewEmployee;