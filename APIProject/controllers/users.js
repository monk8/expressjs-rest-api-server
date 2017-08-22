const User = require('../models/user')
module.exports = {
    index: async (req, res, next) => {
        const users = await User.find();
        //throw new Error('Dummy error !');
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    },
    getUser: async (req, res, next) => {
        // enforce that req.body must contain all the fields
        console.log('req.params', req.params);
        const { userId } = req.params;
        const users = await User.findById(userId);
        res.status(200).json(users);
    },
    replaceUser: async (req,res,next) =>{
        // req.body may contain any number of fields
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    },
    updateUser: async (req,res,next) =>{
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId,newUser);
        res.status(200).json({success:true});
    }
}
/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks
    2) Promises
    3) Async/Await(Promises)
*/

