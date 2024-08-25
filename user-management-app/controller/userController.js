const bcrypt = require('bcryptjs');
const User = require('../models/user.js');


const registerUser = async(req,res)=>{
    const { name, email, password, phone, profession} = req.body;
    
    try {
        
        const exsistingUser = await User.findOne({email});
        if(exsistingUser){
            return res.status(400).json({success: false, message: 'This email is already used!'})
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
        name,
        email,
        password: hashedPassword,
        phone,
        profession
        });

        console.log('newUser',newUser);
        

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
        res.status(500).json({ message: 'Error registering user', error }); 
        }
}

const loginUser = async (req,res) => {
    const {email,password} = req.body;
    try {
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: 'Invalid email or password'})
        }
        
        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            return res.status(200).json({ success: true, message: 'Login successful' });
        } else {
            return res.status(400).json({ success: false, message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error });
    }
}

const homeData = async (req,res)=> {
    try {
        const users = await User.find({});
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching users', error });
    }
    
}

const updateUser = async(req,res)=>{
    const userId = req.params.id;
    const { name, email, phone, profession } = req.body;  
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { name, email, phone, profession },
            { new: true }
          );
      
          res.json({ message: 'User updated successfully', user: updatedUser });
        
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user' });
    }
}

const getUser = async (req,res)=> {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user data', error });
    }
}

const deleteUser = async (req,res)=>{
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndDelete(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error });
    }
}

module.exports = {
    registerUser,
    loginUser,
    homeData,
    updateUser,
    getUser,
    deleteUser
}