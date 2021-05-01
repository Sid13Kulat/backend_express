const fs = require('fs'); //File Object for file I/O Operations
parseString = require("xml2js").parseString; //Object of XML to JSON conversion library

/**
 * Function Purpose: Read xml file using "xml2js" library & write updated JSON data to "World.xml file"
 * Function Name: readXMLFile();
 * Parameters: callback (function)
 * Return: response to callback function
 */
function readXMLFile(callback) {
  var json; var parseResultOfDXFLayer; var parseResultOfPCLLayer; var finalContent = Object; var writtenObject = '';
  fs.readFile('assets/world_07_08.xml', "utf-8", function(err, data) {
    if (err) { callback(err);} // Return callback of error
    if (!err) { //If not
      parseString(data, function(parseError, result) {
        console.log(result);
        if (parseError) {
          callback(parseError);// Return callback of error while parsing
        }
        console.log(result);
        json = result.model; // Copying parsed data to another variable
        const cloneJsonObject = (({ visualLayout, ...o }) => o)(json) // removing visuallayout property from object for processing

        //Now assigning values against layers
        parseResultOfPCLLayer = (json.visualLayout[0].shapeLayoutElement[0] !== undefined) ? parseLayersOfXML(json.visualLayout[0].shapeLayoutElement[0].property) : [];
        parseResultOfDXFLayer = (json.visualLayout[0].shapeLayoutElement[1] !== undefined) ? parseLayersOfXML(json.visualLayout[0].shapeLayoutElement[1].property) : [];

        // Pushing content into final object
        cloneJsonObject.visualLayout = [{ 'DXF_Layer' : parseResultOfDXFLayer, 'PCL_Layer' :parseResultOfPCLLayer }];
        writtenObject = JSON.stringify(cloneJsonObject, undefined, 4); //Converting object into JSON object & formatting.
        fs.truncate('assets/world_07_08.json', 0, function(){console.log('done')}) // Truncate file before writing data
        fs.writeFile('assets/world_07_08.json', writtenObject, function(err, writeData) { //writing data into file
          if (err) {
            callback(err); // Return callback of error while writing data into file
          }
          else {
            var sendResponse = 'Success';
            console.log(sendResponse);
            callback(sendResponse); //Returning callback of success message.
          }
        });
      });
    }
  });
}
/**
 * Function Purpose: Combine all respective values of property of an XML file
 * Function Name: parseLayersOfXML();
 * Parameters: layerDate (object)
 * Return: JSON Object
 */
function parseLayersOfXML(layerData) {
  let returnParsedLayerData = '';
  if(layerData != null) {
    let dataLength = layerData.length; // Counting length of data
    console.log(dataLength);
    for(var i=0; i< dataLength; i++) {
      returnParsedLayerData += layerData[i].$.value;
    }
  } else {
    returnParsedLayerData = null;
  }

  return returnParsedLayerData;
}

/** Need to export the functions from module*/
module.exports = {
  exportJSONFile: readXMLFile,
};
