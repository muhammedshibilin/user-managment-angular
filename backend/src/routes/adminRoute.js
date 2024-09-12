const express = require('express');
const adminRoute = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, checkAdmin } = require('../middleware/auth');
const upload = require('../utils/cloudinary').upload;

adminRoute.get('/dashboard/users', verifyToken, checkAdmin, adminController.getUsers);
adminRoute.put('/dashboard/users/:id', verifyToken, checkAdmin, upload.single('image'), adminController.updateUser); 
adminRoute.delete('/users/delete/:id', verifyToken, checkAdmin, adminController.deleteUser);
adminRoute.post('/create-user', verifyToken, checkAdmin, upload.single('image'), adminController.createUser);

module.exports = adminRoute;
