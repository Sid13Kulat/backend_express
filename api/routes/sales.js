const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Sale = require('../models/sale');

router.get('/', (req, res, next) => {
  Sale.find({})
    .exec()
    .then(salesData => {
      if(salesData.length >= 0) {
        res.status(200).json(salesData);
      }
      else {
        res.status(404).json({ message: 'No data available.'});
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});



router.get('/:salesId', (req, res, next) => {
  const id = req.params.salesId;
  Sale.findById(id)
    .exec()
    .then(salesData => {
      console.log(salesData);
      if(salesData) {
        res.status(200).json(salesData);
      }
      else {
        res.status(404).json({ message: 'No records found.'})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.post('/', (req, res, next) => {
  const sales = new Sale({
    _id: new mongoose.Types.ObjectId(),
    identifier: req.body.identifier,
    data: req.body.data
  });
  sales
    .save()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err});
    });
});

router.patch('/:salesId', (req, res, next) => {
  const id = req.params.salesId;
  const updateOps = {};
  for(const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Sale.update({ _id: id}, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err })
    });
});

router.delete('/:salesId', (req, res, next) => {
  const id = req.params.salesId;
  Sale.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

module.exports = router;
