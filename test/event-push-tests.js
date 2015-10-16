var chai = require('chai'),
    Connect = require('connect-js'),
    Q = require('q');
    expect = chai.expect,
    generator = require('../lib/index');

chai.use(require('chai-datetime'));

Connect.prototype.push = function(collectionName, batch) {
  return Q.fcall(() => { 
    var collBatch = {};
    collBatch[collectionName] = batch;
    return collBatch; 
  });
}

describe('When the batch larger than the batch size is initialized', function() {
  it('should call progress three times for three batches', function (done) {
    var progressCount = 0,
        options = {
          collectionName: 'test',
          numbeOfEventsToPush: 1100,
          progress: () => progressCount++,
          done: (e) => {
            expect(progressCount).to.equal(3);
            done(e);
          }
        },
        connectConfig = {},
        template = generator.timestampEventTemplate

    generator.generateBatches(connectConfig, template, options)
  });

  it('should create a batch with the collection name', function (done) {
    var options = {
          collectionName: 'test',
          numbeOfEventsToPush: 1,
          progress: (batch) => {
            expect(batch).to.have.property('test');         
          },
          done: done
        },
        connectConfig = {},
        template = generator.timestampEventTemplate

    generator.generateBatches(connectConfig, template, options)
  });

  it('should use the collection name', function (done) {
    var options = {
          collectionName: 'test',
          numbeOfEventsToPush: 1,
          progress: (batch) => {
            expect(batch).to.have.property('test');         
          },
          done: done
        },
        connectConfig = {},
        template = generator.timestampEventTemplate

    generator.generateBatches(connectConfig, template, options)
  });

  it('should pass the batch number', function (done) {
    var options = {
          collectionName: 'test',
          numbeOfEventsToPush: 1,
          progress: (batch, batchNumber) => {
            expect(batchNumber).to.eq(0);         
          },
          done: done
        },
        connectConfig = {},
        template = generator.timestampEventTemplate

    generator.generateBatches(connectConfig, template, options)
  });

  it('should have a timestamp of this month', function (done) {
    var now = new Date(),
        start = new Date(now.getFullYear(), now.getMonth(), 1),
        end = new Date(now.getFullYear(), now.getMonth() + 1, 1),
        options = {
          collectionName: 'test',
          numbeOfEventsToPush: 1,
          progress: (batch) => {
              expect(batch['test'][0].timestamp).to.afterDate(start);
              expect(batch['test'][0].timestamp).to.beforeDate(end);
          },
          done: done
        },
        connectConfig = {},
        template = generator.timestampEventTemplate

    start.setMilliseconds(start.getMilliseconds()-1)
    generator.generateBatches(connectConfig, template, options)
  });
});