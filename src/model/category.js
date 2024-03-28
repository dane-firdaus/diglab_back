const dbPool = require("../config/db.js");


const createNewCategory = (body) => {
    const SQLQuery = `INSERT INTO categories (name, description, status, value) VALUES ('${body.name}', '${body.description}', '${body.status}', '${body.value}')`;
    return dbPool.execute(SQLQuery);

}

const listAllCategories = () => {
    const SQLQuery = `SELECT * FROM categories ORDER BY id DESC LIMIT 100`;
    return dbPool.execute(SQLQuery);
}


module.exports = {
    createNewCategory,
    listAllCategories
}