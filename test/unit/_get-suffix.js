var app = require('express')();
var bodyParser = require('body-parser');
var request = require('supertest');
var _getSuffix = require('../../index')._getSuffix;

describe('_getSuffix', function() {
  before(function() {
    var options = {
      accepts: ['json', 'html', 'csv', 'txt'] // must be valid mime extensions 
    };

    app.use(bodyParser.json());
    app.use(function(req, res) {
      res.send(_getSuffix(req, options));
    });
  });

  it('should not return with no suffix', function(done) {
    request(app)
      .get('')
      .expect(200, {}, done);
  });

  it('should return modified header with proper suffix', function(done) {
    request(app)
      .get('/test.csv')
      .expect(200, {header: 'text/csv', url: '/test'}, done);
  });

  it('should not return with invalid suffix', function(done) {
    request(app)
      .get('/test.asdf')
      .expect(200, {}, done);
  });
});
