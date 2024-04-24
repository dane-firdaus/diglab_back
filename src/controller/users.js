const usersModel = require("../model/users.js");
const bycript = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerNewUser = async(req, res, next) => {
    const {body} = req;
    const hashedPassword = bycript.hashSync(body.password, 10);
    if(!body.fullname || !body.email || !body.password || !body.role_id ){
        res.status(400).json({
            message : "masukan data dengan benar !"
        })
    }
    else {
       try {
        const [check] = await usersModel.checkUsersByEmail(body.email);
        if(check.length === 1){
            res.status(401).json({
                message : "email yang anda masukan sudah terdaftar !"
            })
        } else {
            await usersModel.registerNewUser(body, hashedPassword);
            res.status(201).json({
                messahe : "users has been created successfully !"
            })
        }
       } catch (error) {
        
       }    
    }
}

const signIn = async(req, res, next) => {
    const {body} = req;
    try {
        const [getUser] = await usersModel.checkUsersByEmail(body.email);
        const [getPass] = getUser.map(item => {return item.password});
        if(bycript.compareSync(body.password, getPass)){
            const token = jwt.sign(getUser[0],'the-super-strong-secrect',{ expiresIn: '12h' });
            const refreshToken = jwt.sign(getUser[0],'the-super-strong-secrect',{ expiresIn: '7d' });
            res.status(200).json({
                message : "login success !",
                data : getUser[0],
                token : token,
                refresh_token : refreshToken
            })
        } else {
            res.status(401).json({
                message : "invalid password"
            })
        }
    } catch (error) {
        res.status(401).json({
            message: error.stack,
            data:"user anda tidak di temukan"

        })
    }
}

const listAllUsers = async(req, res, next) => {
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
                const [listUser] = await usersModel.listUsers();
                res.status(200).json({
                    users : listUser,
                    info : decodedId
                })
            } catch (error) {
                res.status(500).json({
                    message : "internal server error !",
                    data : error.stack
                })
            }
        }
}

const listUserByHotelId = async(req, res, next) => {
    const hotel_id = req.query.hotel_id;
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
                const [users] = await usersModel.listUsersByHotelId(hotel_id);
                res.status(200).json({
                    users : users,
                    info : decodedId
                })
            } catch (error) {
                console.log(error.stack);
                res.status(500).json({
                    message :"internal server error !",
                    data : error.stack
                })
            }
        }
}

const getUserByEmail  = async(req, res, next) => {
    const email =  req.query.email;
            try {
                const [user] = await usersModel.checkUsersByEmail(email);
                res.status(200).json({
                    user : user
                })
            } catch (error) {
                console.log(error.stack);
                res.status(500).json({
                    message : "internal server error !",
                    data : error.stack
                })                
            }
}

module.exports = {
    registerNewUser,
    signIn,
    listAllUsers,
    listUserByHotelId,
    getUserByEmail
}
