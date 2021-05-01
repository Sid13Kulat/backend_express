const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const JobManagement = require('../models/jobmanagement');

router.get('/', (req, res, next) => {
  const vehicleList = req.query.vehicle;
  const fromDate = req.query.from;
  const toDate = req.query.to;

  JobManagement.find({})
    .exec()
    .then(jobsManageData => {
      if(jobsManageData.length >= 0) {
        res.status(200).json(jobsManageData);
      }
      else {
        res.status(404).json({ message: 'No data available'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.get('/:id', (req, res, next) => {
  const id = req.params.id;
  const jobIDObject = { "Parameter list is as follows" : {
    "Passed Id": id
  }}
  res.status(200).json(jobIDObject);
});

module.exports = router;
