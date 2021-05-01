const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose= require('mongoose');

// /**
//  * Creating connection with mongoDB database.
//  */
// mongoose.connect(
//   'mongodb://localhost:27017/trafficmanager?readPreference=primary&appname=MongoDB%20Compass%20Community&ssl=false',
//   {
//     useNewUrlParser: true
//   }
// );
// const db = mongoose.connection;
// db.on('error', console.error.bind(console, 'Connection Error-------------->'));
// db.once('open', function() {
//   console.log('We are connected------------------------>');
// });

//Adding routes for sales page
const salesRoutes = require('./api/routes/sales');
const agvinformationRoutes = require('./api/routes/agvinformationroute');
const downloadFileRoutes = require('./api/routes/downloadroute');
const joblistRoutes = require('./api/routes/joblistroute');
const orderRoutes = require('./api/routes/ordersroute');
const transportorderRoutes = require('./api/routes/transportorderroute');

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requestd-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Expose-Headers', 'Content-Disposition');
  if(req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    return res.status(200).json({});
  }
  next();
});
//Routes which handles request
app.use('/sales', salesRoutes);
app.use('/agvinformation', agvinformationRoutes);
app.use('/download', downloadFileRoutes);
app.use('/operation/v1/joblist', joblistRoutes);
app.use('/operation/v1/vehicle', orderRoutes);
app.use('/operation/v1/transportorder', transportorderRoutes);


app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;
