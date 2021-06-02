const connection = require('../../config/connection');

//get all the titles from role table 
async function getroles() {
    let roles = await connection.query(
        `select title from role;`);
    let titles = roles[0].map(role => role.title);
    return titles;
}

module.exports = getroles;