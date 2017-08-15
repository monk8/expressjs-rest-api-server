module.exports = {
    index:(req,res,next) => {
        res.status(200).json({
            message:'You are request index page.'
        });
    }
}