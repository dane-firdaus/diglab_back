const dbPool = require("../config/db.js");


const createRoles = (body) => {
    const SQLQuery = `INSERT INTO role (name, description) VALUES ('${body.name}', '${body.description}')`;
    return dbPool.execute(SQLQuery);
}


module.exports = {
    createRoles
}