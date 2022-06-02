const chai = require('chai')
let chaiHTTP = require('chai-http')
let should = chai.should();

chai.use(chaiHTTP)

describe('Product:', () => {
  it('Testando GET de todos os produtos:', (done) => {
    chai.request(`http://localhost:3001`)
    .get('/product')
    .end((err, res) => {
      res.should.have.status(200);
      res.body.should.be.a('array');
    })
  })
}) 