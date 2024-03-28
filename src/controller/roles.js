const rolesModel = require("../model/roles.js");

const createRoles = async(req, res, next) => {
    const {body} = req;
    if(!body.name || !body.description){
        res.status(400).json({
            message : "masukan datadengan benar !"
        })
    } else {
        try {
            await rolesModel.createRoles(body);
            res.status(201).json({
                message : "roles created successfully !"
            })
        } catch (error) {
            console.log(error.stack);
            res.status(500).json({
                message : "internal server error !",
                data : error.stack
            })
            
        }
    }
}


module.exports = {
    createRoles
}