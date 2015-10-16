"use strict"
var _ = require('lodash'),
    Connect = require('connect-js'),
    chance = require('chance')(),
    generateData = require('./data-generator').generateData,
    initBatchDetails = require('./batch').initBatchDetails;

var timestampEventTemplate = buildTimestampEventTemplate();

function buildTimestampEventTemplate() {
  var now = new Date();

  return {
    timestamp: () => chance.date({year: now.getFullYear(), month: now.getMonth()})
  };
}

function generateBatches(connectConfig, template, options, done) {
  let connect = new Connect(connectConfig);

  generateBatch(connect, template, initBatchDetails(options.numbeOfEventsToPush), 
    options.collectionName, options.progress || () => {}, options.done || () => {});
}

function generateBatch(connect, template, batchDetails, collectionName, progress, done) {
  let batch = generateData(template, batchDetails.size);
  
  connect.push(collectionName, batch)
    .then((result) => {
      progress(result, batchDetails.number);

      if (batchDetails.hasMore())
        generateBatch(connect, template, batchDetails.getNextBatch(), collectionName, progress, done);
      else{
        done(null);
      }
    }).catch((e) => {
        done(e);
    });
}

module.exports = {
  generateBatches,
  timestampEventTemplate
}