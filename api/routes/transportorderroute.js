const express = require('express');
const router = express.Router();
const mongosse = require('mongoose');

const TransportOrder = require('../models/transportorder');

router.get('/', (req, res, next) => {
  TransportOrder.find({})
    .exec()
    .then(transportOrderData => {
      if(transportOrderData.length >= 0) {
        res.status(200).json(transportOrderData);
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
