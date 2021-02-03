// Librerías requeridas
const Express = require('express');
const morgan = require('morgan');
const { createConnection } = require('typeorm');
require('reflect-metadata');

// Módulos de la aplicación requeridos
const userRouter = require('./routes/UserRouter.js');

// Variables y constantes
const port = process.env.PORT || 3000;

// Inicia la aplicación
const app = new Express();
createConnection(); //Simplemente se ejecuta ya que coge datos de variables del sistema

// Middleware
app.use(morgan('tiny'));
app.use(Express.json());

// Routes
app.use('/users', userRouter);

// Listening
app.listen(port);
console.log('Server on port: ', port);
