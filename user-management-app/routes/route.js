const express = require('express');
const {registerUser, loginUser, homeData, updateUser, getUser, deleteUser} = require('../controller/userController.js');
const router = express.Router();
const path = require('path')





router.get('/registration', (req,res) => {
    res.sendFile(path.join(__dirname,'../public/registration.html'));
});
router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/login.html'));
});

router.get('/home', (req,res)=> {
    res.sendFile(path.join(__dirname, '../public/home.html'));
})
router.get('/update-page',(req,res)=> {
    res.sendFile(path.join(__dirname, '../public/update.html'));
})

router.get('/home-data',homeData);
router.post('/register', registerUser);
router.put('/update-user/:id',updateUser);
router.get('/get-user/:id', getUser);
router.delete('/delete-user/:id',deleteUser);


router.post('/login', loginUser);

module.exports = router;