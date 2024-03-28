const categoryModel = require("../model/category.js");
const jwt = require('jsonwebtoken');


const createNewCategory = async(req, res, next) => {
    const {body} = req;
    if(!body.name || !body.description || !body.value){
        res.status(400).json({
            message : "mohon masukan informasi dengan benar !"
        })
    } else if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
        ){
            res.status(401).json({
                message:"authorization failed"
            });
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedId = jwt.verify(token, 'the-super-strong-secrect');
            try {
                console.log(body);
                await categoryModel.createNewCategory(body);
                res.status(201).json({
                    message : "category has been created successfully !"
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

const listAllCategories = async(req, res, next) => {
    if(
        !req.headers.authorization ||
        !req.headers.authorization.startsWith('Bearer') ||
        !req.headers.authorization.split(' ')[1]
        ){
            res.status(401).json({
                message:"authorization failed"
            });
        } else {
            const token = req.headers.authorization.split(' ')[1];
            const decodedId = jwt.verify(token, 'the-super-strong-secrect');
            try {
                const [categories] = await categoryModel.listAllCategories();
                res.status(200).json({
                    categories : categories,
                    info : decodedId
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
    createNewCategory,
    listAllCategories
}