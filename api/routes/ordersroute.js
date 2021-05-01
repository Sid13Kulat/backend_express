const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  const fromDate = req.query.fromdate;
  const toDate = req.query.todate;
  const vehicleId = req.query.vehicleid;
  const allParamData =  { "Parameter list Of Order with Joblist Orders are as follows:": { "Vehicle ID: ":vehicleId, "FromDate Param: ":fromDate, "ToDate Param: ":toDate }};

  res.status(200).json(allParamData);
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const vehicleIdObject = { "Parameter list Of Order with Joblist Orders are as follows" : {
    "Passed Vehicle Id": id
  }}

  res.status(200).json(vehicleIdObject);
});

router.get('/:id/joblist/:id/job/:id/task', (req, res, next) => {
  const id = req.params.id;
  const vehicleIdObject = { "Parameter list Of Order with Joblist are as follows" : {
    "Passed Vehicle Id": id
  }}

  res.status(200).json(vehicleIdObject);
});

module.exports = router;
