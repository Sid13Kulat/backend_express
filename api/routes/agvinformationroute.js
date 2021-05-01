const express = require('express');
const router = express.Router();
const mongosse = require('mongoose');

const AgvInformation = require('../models/agvinformation');

router.get('/', (req, res, next) => {
  AgvInformation.find({})
    .exec()
    .then(agvinformationData => {
      if(agvinformationData.length >= 0) {
        res.status(200).json(agvinformationData);
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

module.exports = router;
