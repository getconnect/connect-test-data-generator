var chai = require('chai'),
    expect = chai.expect,
    generateData = require('../lib/data-generator').generateData;

describe('Data Generation', function() {
  describe('When values are literals', function () {
    var template = {
      number: 1,
      string: 's',
      array: [1],
      regex: /w/
    }

    it('should preserve literals', function () {
      var generated = generateData(template, 1);
      expect(generated).to.deep.equal([template]);
    });
  });

  describe('When multiple are generated', function () {
    var template = {}

    it('should generate exact number asked for', function () {
      var generated = generateData(template, 3);
      expect(generated).to.deep.equal([template, template, template]);
    });
  });

  describe('When values are functions', function () {
    var template = {
      number: () => 1
    }

    it('should call those functions for the values', function () {
      var generated = generateData(template, 1);
      expect(generated).to.deep.equal([{number: 1}]);
    });
  });

  describe('When values in arrays are functions', function () {
    var template = {
      numbers: [() => 1, () => 2]
    }

    it('should call the functions for the array values', function () {
      var generated = generateData(template, 1);
      expect(generated).to.deep.equal([{numbers: [1, 2]}]);
    });
  });
});