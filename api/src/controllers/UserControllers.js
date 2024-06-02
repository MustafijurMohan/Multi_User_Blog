const UserModel = require('../models/UserModel')
const PostModel = require('../models/PostModel')
const bcrypt = require('bcryptjs')


// Registration 
exports.register = async (req, res) => {
    try {
        const {username, email, password} = req.body
        const userExits = await UserModel.findOne({email})
        if(userExits) {
            res.status(400).json({message: 'User already Exits'})
        }

        const data = await UserModel.create({username, email, password})
        res.status(201).json({status: 'Successfull', data: data})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// Login
exports.login = async (req, res) => {
    try {
        const user = await UserModel.findOne({username: req.body.username})
        !user && res.status(400).json({message: 'Invalid Credentials!'})

        const validated = await bcrypt.compare(req.body.password, user.password)
        !validated && res.status(400).json({message: 'Invalid Credentials!'})

        const{password, ...others} = user._doc

        res.status(200).json({status: 'Successfull', data: others})
    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// User Update By Id
exports.UserUpdateById = async(req, res) => {
    const id = req.params.id
    if (req.body.userId === id) {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        try {
            const data = await UserModel.findByIdAndUpdate(id, {$set: req.body}, {new: true})
            res.status(201).json({status: 'Successfull', data: data})
        } catch (error) {
            res.status(400).json({status: 'Fail', data: error})
        }
    } else {
        req.status(401).json({message: 'You can update only your account!'})
    }
}

// User Find By Id
exports.FindUserById = async (req, res) => {
    try {
        const id = req.params.id
        const data = await UserModel.findById(id)

        const {password, ...others} = data._doc
        res.status(200).json({status: 'Successfull', data:others})

    } catch (error) {
        res.status(400).json({status: 'Fail', data: error})
    }
}

// User Delete By Id
exports.UserDeleteById = async(req, res) => {
    const id = req.params.id
    if (req.body.userId === id) {
        try {
            const user = await UserModel.findById(id)
            try {
                await PostModel.deleteMany({username: user.username})
                await UserModel.findByIdAndDelete(id)
                res.status(200).json({message: 'User Delete Successfull'})
            } catch (error) {
                res.status(400).json({status: 'Fail', data: error})
            }
        } catch (error) {
            res.status(400).json({message: 'No user found!'})
        }
        
    } else {
        req.status(401).json({message: 'You can delete only your account!'})
    }
}


