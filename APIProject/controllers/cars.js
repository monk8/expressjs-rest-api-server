//controllers/cars.js
const Car = require('../models/car');
const User = require('../models/user');
module.exports = {
    index: async (req,res,next) => {
        //Get all the cars!
        const cars = await Car.find({}).populate('seller');
        res.status(200).json(cars);
    },
    newCar: async (req,res,next) => {
        // 1. Find the actual seller
        const seller = await User.findById(req.body.seller);
        // 2. Create a new car
        const newCar = req.body;
        delete newCar.seller;
        const car = new Car(newCar);
        car.seller = seller;
        await car.save();
        // 3. Add newly created car to the actual seller
        seller.cars.push(car);
        await seller.save();
        // We're done!
        res.status(200).json(car);
    },
    getCar : async (req,res,next) => {
        const car = await Car.findById(req.value.params.carId);
        res.status(200).json(car);
    },
    replaceCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId,newCar);
        res.status(200).json({success:true});
    },
    updateCar: async (req,res,next) => {
        const { carId } = req.value.params;
        const newCar = req.value.body;
        const car = await Car.findByIdAndUpdate(carId,newCar);
        res.status(200).json({success:true});
    },
    deleteCar: async (req,res,next) => {
        const car = await Car.findById(req.value.params.carId);
        if(!car){
            return res.status(404).json({message:'car does\'t exist! '});
        }
        const sellerId = car.seller;
        const seller = await User.findById(sellerId);
        seller.cars.pull(car);
        await car.remove();
        await seller.save();
        res.status(200).json({success:true});
    }
}