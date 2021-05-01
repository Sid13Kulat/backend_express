const express = require('express');
const router = express.Router();
const path = require('path');
var file = 'world_07_08.json';
var xmlFile = 'world_07_08.xml';
var fileLocation = path.join('./assets', file);

const downloadInformation = require('../models/downloadfile');

function readyJSONFileForDownload(callback) {
  downloadInformation.exportJSONFile(function(result, err) {
    if(err) {
      return callback(err, null)
    } else {
      return callback(err, result);
    }
  });
}

router.get('/', (req, res, next) => {
  readyJSONFileForDownload(function(err, data){
    if(!err){
      if(data === 'Success') {
        res.download(fileLocation, file);
      }
      else {
        res.status(200).json({temp: 'Error In File Download'});
      }
    }
    else{
      res.status(404).json({ error: err});
    }
  });
});
router.get('/v1', (req, res, next) => {
  var xmlString = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><model version="0.0.2" name="Default-Plantl"><location name="Button1" xPosition="256" yPosition="2902" zPosition="0" type="Trigger"><link point="Point-3"/><property name="count" value="3"/><property name="ntt:action" value="Travel"/><property name="ntt:iib_id" value="1"/><property name="ntt:input_id" value="1"/><property name="ntt:instatus" value="NOT_PRESSED"/><property name="ntt:instatusActivating" value="BUTTON_PRESS_SHORT"/><property name="ntt:instatusCancelled" value="BUTTON_PRESS_LONG"/><property name="ntt:isTriggerInput" value="TRUE"/><property name="ntt:outstatus" value="IDLE"/><property name="ntt:triggerGroup1" value="TriggerGroup1"/><property name="ntt:triggerIntendedVehicle1" value="V-201"/> <property name="ntt:triggerSeq1" value="1"/><property name="triggerType" value="Button"/><property name="x" value="256"/><property name="y" value="2902.3866981458414"/></location><location name="Button2" xPosition="5856" yPosition="1184" zPosition="0" type="Trigger"><link point="Point-10"/><property name="count" value="10"/><property name="name" value="Button2"/><property name="ntt:iib_id" value="2"/><property name="ntt:input_id" value="1"/><property name="ntt:instatusActivating" value="BUTTON_PRESS_SHORT"/><property name="ntt:instatusCancelled" value="BUTTON_PRESS_LONG"/><property name="triggerType" value="Button"/><property name="x" value="5856"/><property name="y" value="1184.0391102507529"/></location></model>';
  res.set('Content-Type', 'text/plain');
  res.send(xmlString);
});

module.exports = router;
