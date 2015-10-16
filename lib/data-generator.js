"use strict";
var traverse = require('traverse'),
    _ = require('lodash');

function generateData(objectTemplate, numberOfObjects) {
  return _.range(0, numberOfObjects).map(function traverseObjectTemplate(index) {
    return traverse(objectTemplate).map(function callFunctionsInTemplate(propertyValue) {
      if (typeof propertyValue === 'function')
        this.update(propertyValue());
    });
  });
}

module.exports = {
   generateData
}