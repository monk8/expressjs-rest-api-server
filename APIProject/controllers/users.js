//controllers/users.js
const User = require('../models/user');
const Car =  require('../models/car');
module.exports = {
    index: async (req, res, next) => {
        const users = await User.find();
        //throw new Error('Dummy error !');
        res.status(200).json(users);
    },
    newUser: async (req, res, next) => {
        const newUser = new User(req.value.body);
        const user = await newUser.save();
        res.status(200).json(user);
    },
    getUser: async (req, res, next) => {
        const { userId } = req.value.params;
        const users = await User.findById(userId).populate('cars');
        res.status(200).json(users);
    },
    replaceUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },
    updateUser: async (req, res, next) => {
        const { userId } = req.params;
        const newUser = req.body;
        const result = await User.findByIdAndUpdate(userId, newUser);
        res.status(200).json({ success: true });
    },
    getUserCars: async (req, res, next) => {
        //const result = Joi.validate(req.params,idSchema);
        const { userId } = req.params;
        const user = await User.findById(userId).populate('cars');
        res.status(200).json(user.cars);
    },
    newUserCar: async (req, res, next) => {
        const { userId } = req.params;
        // Create a new car
        const newCar = new Car(req.body);
        // Get user
        const user = await User.findById(userId);
        // Assign user as a car's seller
        newCar.seller = user;
        // Save the car
        await newCar.save();
        // Add car to the user's selling array 'cars'
        user.cars.push(newCar);
        // Save the user
        await user.save();        
        res.status(201).json(newCar);
    }
}
/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks
    2) Promises
    3) Async/Await(Promises)
*/

