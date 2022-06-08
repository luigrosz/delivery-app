const chai = require('chai');
const chaiHTTP = require('chai-http');
const productService = require('../../service/produts.service');

chai.use(chaiHTTP);

const obj = {
  "id": 1,
  "name": "Skol Lata 250ml",
  "price": "2.20",
  "urlImage": "http://localhost:3001/images/skol_lata_350ml.jpg"
};

describe('teste findOne product', () => {
  before(() => {
    sinon.stub(productService, 'productsByIdService').resolves(obj);
  });
  after(() => {
    productService.productsByIdService.restore();
  });
  it('teste', async () => {
    const result = await productService.productsByIdService();
    espect(result).to.be.deep.equal(obj);
  });
});