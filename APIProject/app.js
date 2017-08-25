const express = require('express');
const logger = require('morgan')
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/APIProject01',{useMongoClient: true});
const app = express();

//Routes
const users = require('./routers/users');
const index = require('./routers/index');
const cars =  require('./routers/cars');
// Middlewares
app.use(logger('dev'));
app.use(bodyParser.json());

//Routes
app.get('/',index);
app.use('/users',users);
app.use('/cars',cars);

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
    console.log(err);
    res.status(status).json({
        error:{
            message: error.message
        }
    });
});
//Start the server
const port = app.get('port') || 3000;
app.listen(port,()=> console.log(`Server is listening on port ${port}`));
