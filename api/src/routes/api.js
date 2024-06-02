const express = require('express')
const router = express.Router()

const { register, login, UserUpdateById, UserDeleteById, FindUserById } = require('../controllers/UserControllers')
const { PostCreate, PostUpdateById, PostDeleteById, FindPostById, FindAllPost, uploadImage } = require('../controllers/PostControllers')


// User api

router.post('/register', register)
router.post('/login', login)
router.post('/UserUpdateById/:id', UserUpdateById)
router.get('/FindUserById/:id', FindUserById)
router.delete('/UserDeleteById/:id', UserDeleteById)



// Post api
router.post('/PostCreate', PostCreate)
router.post('/PostUpdateById/:id', PostUpdateById)
router.get('/FindPostById/:id', FindPostById)
router.get('/FindAllPost', FindAllPost)
router.delete('/PostDeleteById/:id', PostDeleteById)

router.post('/uploadImage', uploadImage)


module.exports = router