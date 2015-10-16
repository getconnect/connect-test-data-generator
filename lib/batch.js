"use strict"
const batchSize = 500;

class BatchDetails {
  constructor(totalEventsToPush, number){
    if (totalEventsToPush >= batchSize)
      this.size = batchSize;
    else
      this.size = totalEventsToPush;

    this.totalEventsToPush = totalEventsToPush;
    this.number = number;
  }

  getNextBatch() {
    let totalLeftToPush = this._getTotalLeftToPush();

    if (totalLeftToPush <= 0)
      return null;

    return new BatchDetails(totalLeftToPush, this.number + 1);
  }

  hasMore() {
    return this._getTotalLeftToPush() > 0;
  }

  _getTotalLeftToPush() {
    return this.totalEventsToPush - this.size;
  }
}

function initBatchDetails(totalEventsToPush) {
  return new BatchDetails(totalEventsToPush, 0)
}

module.exports = {
  initBatchDetails
}