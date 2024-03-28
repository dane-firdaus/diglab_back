const dbPool = require("../config/db.js");


const createNewCategory = (body) => {
    const SQLQuery = `INSERT INTO review_category (name, description, color) VALUES ('${body.name}', '${body.description}', '${body.color}')`;
    return dbPool.execute(SQLQuery);
}

const listAllReviewCategory = () => {
    const SQLQuery = `SELECT * FROM review_category ORDER BY id DESC LIMIT 100`;
    return dbPool.execute(SQLQuery);
}


module.exports = {
    createNewCategory,
    listAllReviewCategory
}