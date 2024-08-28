const adminRoute = require('express').Router()
const adminController = require('../controllers/adminController')

adminRoute.get('/users',adminController.getUsers)




module.exports = adminRoute;
