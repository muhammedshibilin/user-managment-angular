const userRoute = require('express').Router();
const userController = require('../controllers/userController');
const upload = require('../utils/cloudinary.js').upload


userRoute.post('/register', upload.single('image'), userController.registerUser);
userRoute.post('/login',userController.loginUser)

module.exports = userRoute;
