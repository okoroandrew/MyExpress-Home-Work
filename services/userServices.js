const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')

const checkUserExist = async(email)=>{
    const user= await userModel.findOne({
        email
    })
    return user
}

const createUser = async(user)=>{
    if (!await checkUserExist(user.email)){
        const newUser = new userModel({
            email:user.email,
            password:user.password,
            name:user.name,
        })
        try {
            const saveUser = await newUser.save()
            const payload = {id: saveUser._id, email:saveUser.email}
            const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:3600000000})
            return {user:saveUser.toJSON(), token}
        } catch (error) {
            throw error
        }    
    }
    else throw new Error("User already exist")
}

const login = async(user)=>{
    const getUser= await userModel.findOne({
        email: user.email,
        password: user.password
    })

    if (user){
        const payload = {id: getUser._id, email: getUser.email}
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn:3600000000})
        return {user:getUser.toJSON(), token}
    }
    else throw new Error("Invalid email or password")
}

module.exports.createUser=createUser
module.exports.login=login