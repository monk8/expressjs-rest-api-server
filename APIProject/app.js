const express = require('express');
const logger = require('morgan')
const app = express();

//Routes
const users = require('./routers/users');
const index = require('./routers/index');

// Middlewares
app.use(logger('dev'));

//Routes
app.use('/users',users);
app.get('/',index);
//Catch 404 Errors and forword them to error handler
app.use((req,res,next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});
//Error handler function
app.use((err,req,res,next) => {
    //Response to client
    const error = app.get('env') === 'development' ? err : {};
    const status = err.status || 500;
    //Reponse to ourselves
    res.status(status).json({
        error:{
            message: error.message
        }
    });
});
//Start the server
const port = app.get('port') || 3000;
app.listen(port,()=> console.log(`Server is listening on port ${port}`));
