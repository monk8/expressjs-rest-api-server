const User = require('../models/user')
module.exports = {
    /*
    index:(req,res,next) => {
        //Callback 方式
        User.find({},(err,users) => {
            if(err){
                next(err);
            }
            res.status(200).json(users);
        });
    },
    */
    index: (req,res,next) => {
        //Promise 方式
        User.find({})
        .then(users => {
            res.status(200).json(users);
        })
        .catch(err => {
            next(err);
        });
    },
    
    newUser:(req,res,next) => {
        const newUser = new User(req.body);
        newUser.save((err,user)=>{
            res.status(201).json(user);
            //201表示服务局接受并创建成功
        });
    }
    /*
    newUser:(req,res,next) => {
        const newUser = new User(req.body);
        newUser.save()
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            next(err);
        })
    }
    */

}
/*
    We can interact with mongoose in 3 different ways:
    1) Callbacks
    2) Promises
    3) Async/Await(Promises)
*/

