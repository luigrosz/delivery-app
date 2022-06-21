const sinon = require("sinon");
const { expect } = require("chai");
const mock = require('../mocks/products.mock');
const productsService = require('../../service/products.service');
const productsController = require('../../controller/products.controller');

describe('Teste products controller', () => {
  const request = {};
  const response = {};

  describe('getAll', async () => {
    beforeEach(async () => {
      sinon.stub(productsService, 'allProductsService');
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    } );
    afterEach(async () => {
      productsService.allProductsService.restore();
    })

    it('Retorna os produtos', async () => {
      productsService.allProductsService.resolves(mock.getAll);
      await productsController.getAllProductsController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('getById', async () => {
    beforeEach(async () => {
      sinon.stub(productsService, 'productsByIdService');
      request.params = {
        id: 1
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    } );
    afterEach(async () => {
      productsService.productsByIdService.restore();
    })
    it('Retorna um produto', async () => {
      productsService.productsByIdService.resolves(mock.getById);
      await productsController.productByIdController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('edit', async () => {
    beforeEach(async () => {
      sinon.stub(productsService, 'editProductService');
      request.body = {
        name: 'a',
        price: '2'
      };
      request.params = {
        id: 1
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    } );
    afterEach(async () => {
      productsService.editProductService.restore();
    })

    it('Retorna um produto editado', async () => {
      productsService.editProductService.resolves(mock.updateResponse);
      await productsController.editProdController(request, response);
      expect(response.status.calledWith(204)).to.be.true;
    })
  })
})