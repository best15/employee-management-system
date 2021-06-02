const connection = require('../../config/connection');


async function getDepartmentNames() {
    // get all Department names
    const departments = await connection.query(`select D_name from department`);

    const departmentNames = departments[0].map(department => department.D_name);
    return departmentNames;
}

module.exports = getDepartmentNames;