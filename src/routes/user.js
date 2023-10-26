const express = require('express')
const router = express.Router()
const userController = require('../controllers/user-controller')

router
    .route('/signUp')
    .post(userController.signUp)

router
    .route('/signIn')
    .post(userController.signIn)

router
    .route('/logout')
    .get(userController.logout)

module.exports = router