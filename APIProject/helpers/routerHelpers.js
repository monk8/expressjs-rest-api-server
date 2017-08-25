//helpers/routerHelpers.js
const Joi = require('joi');
module.exports = { 
    validateParam:(schema,name) => {
        return (req,res,next) => {
           // console.log('req.params',req.params);
            //var foo = {[name]:req['params'][name]};
            //var foo = {name:'dd'};            
            //console.log('foo',foo);
            const result = Joi.validate({[name]:req['params'][name]},schema);
            if(result.error){
                console.error(result.error);
                return res.status(400).json(result.error);
            }else{
                if(!req.value){
                    req.value = {};
                }
                if(!req.value['params']){
                    req.value['params'] = {};
                }
                req.value['params']= result.value;
                next();
            }
        }
    },
    validateBody:(schema) =>{
        return(req,res,next) => {
            const result = Joi.validate(req.body,schema);
            if(result.error){
                console.error(result.error);
                return res.status(400).json(result.error);
            }else {
                if(!req.value){ 
                    req.value = {}
                }
                if(!req.value['body']){
                    req.value['body'] = {};
                }
                req.value['body'] = result.value;
                next();
            }
        }
    },
    schemas: {
        userSchema:{
            firstName: Joi.string().required(),
            lastName:Joi.string().required(),
            email:Joi.string().email().required()
        },
        userOptionalSchema:{
            firstName: Joi.string(),
            lastName:Joi.string(),
            email:Joi.string().email()
        },
        idSchema: Joi.object().keys({
            userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        }),
        carSchema: Joi.object().keys({
            
            make: Joi.string().required(),
            model: Joi.string().required(),
            year: Joi.number().required()
        }),
        newCarSchema: Joi.object().keys({
            seller: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required(),
            make:Joi.string().required(),
            model:Joi.string().required(),
            year:Joi.number().required()
        })
    }
}
 const idSchema = Joi.object().keys({
     userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
 });



