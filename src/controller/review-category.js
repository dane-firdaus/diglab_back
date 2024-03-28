const reviewCategoryModel = require("../model/review-category.js");
const jwt = require('jsonwebtoken');


const createNewCategory = async(req, res, next) => {
    const{body} = req;

    if(!body.name || !body.description){
        res.status(400).json({
            message : "mohon isi data dengan benar !"
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
                await reviewCategoryModel.createNewCategory(body);
                res.status(201).json({
                    message : "review category has been created successfully !"
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

const listAllReviewCategory = async(req, res, next) => {

            try {
                const [reviewCategories] = await reviewCategoryModel.listAllReviewCategory();
                res.status(200).json({
                    review_categories: reviewCategories,
                })
            } catch (error) {
                console.log(error.stack);
                res.status(500).json({
                    message : "internal server error !"
                })
            }
    
}

module.exports = {
    createNewCategory,
    listAllReviewCategory
}