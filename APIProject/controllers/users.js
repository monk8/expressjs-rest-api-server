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
    }
}
/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks
    2) Promises
    3) Async/Await(Promises)
*/

