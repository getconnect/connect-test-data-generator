var chai = require('chai'),
    expect = chai.expect,
    initBatchDetails = require('../lib/batch').initBatchDetails;

var batchSize = 500;

describe('When the batch larger than the batch size is initialized', function() {
  var batchDetails = initBatchDetails(batchSize * 2 + 100)

  it('should have a batch number a of 0', function() {
    expect(batchDetails.number).to.equal(0)
  });

  it('should have the initial batch size', function() {
    expect(batchDetails.size).to.equal(batchSize)
  });
});

describe('When the next batch is retrieved with more whole batches left', function() {
  var batchDetails = initBatchDetails(batchSize * 2 + 100).getNextBatch()

  it('should have a batch number a of 0', function() {
    expect(batchDetails.number).to.equal(1)
  });

  it('should have the initial batch size', function() {
    expect(batchDetails.size).to.equal(batchSize)
  });

  it('should have more', function() {
    expect(batchDetails.hasMore()).to.be.ok
  });
});

describe('When the next batch is retrieved with partial batch left', function() {
  var batchDetails = initBatchDetails(batchSize + 100).getNextBatch();

  it('should have the left over batch size', function() {
    expect(batchDetails.size).to.equal(100)
  });

  it('should not have more', function() {
    expect(batchDetails.hasMore()).to.not.be.ok
  });
});