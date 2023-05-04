const express = require("express");
const Router = express.Router();
// Import the controller functions for the user routes
const { addUser, getUsers, getUser, updateUser, deleteUser } = require('../controllers/userController');
const multer = require('multer');

// Upload Users Profile
const uploadProfile = multer({
    storage:multer.diskStorage({
        destination:(req , file , callback) => {
            callback(null , 'D:\\Medically\\medically-front-end\\public\\usersImage');
        },
        filename:(req , file , callback) => {
            console.log({file})
            callback(null , file.fieldname  + "-" + Date.now() + ".jpg");
        }
    })
    
}).single("Image");



// @Route /adduser | @DESC - Add users
Router.route('/').post([uploadProfile , addUser]);

// @Route /getUsers | @DESC - Get all Users
Router.route('/').get(getUsers);

//@Route /getUser | @DESC - Get User
Router.route('/:email').get(getUser);

// @Route /updateUser | @DESC - Update User
Router.route('/:email').put(updateUser);

// @Route /updateUser | @DESC - Update User
Router.route('/:email').delete(deleteUser);


// @Route /login | @DESC - login User
Router.route('/login').post(login);



module.exports = Router;
