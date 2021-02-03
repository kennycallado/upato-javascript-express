// Librerías requeridas
const Express = require('express');
const morgan = require('morgan');

// Módulos de la aplicación requeridos
const userRouter = require('./routes/UserRouter.js');

// Variables y constantes
const port = process.env.PORT || 3000;

// Inicia la aplicación
const app = new Express();

// Middleware
app.use(morgan('tiny'));
app.use(Express.json());

// Routes
app.use('/users',userRouter);

// Listening
app.listen(port);
console.log('Server on port: ', port);
