const Joi = require('joi');
module.exports = { 
    validateParam:(schema,name) => {
        return (req,res,next) => {
            console.log('req.params',req.params);
            const result = Joi.validate({param:req['params'][name]},schema);
            if(result.error){
                return res.status(400).json(result.error);
            }else{
                if(!req.value){
                    req.value = {};
                }
                if(!req.value['params']){
                    req.value['params'] = {};
                }
                req.value['params'][name] = result.value.param;
                next();
            }
        }
    },
    /**
     *  req['params'][name] => req.params.userId
     *  name = 'UserId'
     */
    schemas: {
        idSchema: Joi.object().keys({
            userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
        })
    }

}


 const idSchema = Joi.object().keys({
     userId:Joi.string().regex(/^[0-9a-fA-F]{24}$/).required()
 });