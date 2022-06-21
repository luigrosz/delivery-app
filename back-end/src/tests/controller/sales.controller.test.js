const sinon = require("sinon");
const { expect } = require("chai");
const mock = require('../mocks/sales.mock');
const salesService = require('../../service/sale.service');
const salesController = require('../../controller/sales.controller');

describe('Teste sales controller', () => {
  const request = {};
  const response = {};

  describe('getAll', async () => {
    beforeEach(async () => {
      sinon.stub(salesService, 'getAllSalesService');
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
      salesService.getAllSalesService.restore();
    })

    it('Retorna as sales', async () => {
      salesService.getAllSalesService.resolves(mock.getAll);
      await salesController.getAllSalesController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('getByIdSeller', async () => {
    beforeEach(async () => {
      sinon.stub(salesService, 'getSaleByIdSellerService');
      request.params = {
        id: 1
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
       salesService.getSaleByIdSellerService.restore();
    })
    it('Retorna uma sale pelo id do vendedor', async () => {
      salesService.getSaleByIdSellerService.resolves(mock.getBySellerId);
      await salesController.getSaleByIdSellerController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('getByIdUser', async () => {
    beforeEach(async () => {
      sinon.stub(salesService, 'getSaleByIdUserService');
      request.params = {
        id: 1
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
       salesService.getSaleByIdUserService.restore();
    })
    it('Retorna uma sale pelo id do comprador', async () => {
      salesService.getSaleByIdUserService.resolves(mock.getByUserId);
      await salesController.getSaleByIdUserController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('post sale', async () => {
    beforeEach(async () => {
      sinon.stub(salesService, 'postSaleService');
      request.body = {
        sellerId: 1,
        totalPrice: 2,
        deliveryAddress: "av 1",
        deliveryNumber: 2,
        products: [
          {
            id: 1,
            quantity: 2
          }
        ]
      };
      request.user = {
        email: "fulana@deliveryapp.com",
      }
      request.params = {
        id: 1
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
       salesService.postSaleService.restore();
    })
    it('Retorna uma sale postada', async () => {
      salesService.postSaleService.resolves(mock);
      await salesController.postSaleController(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })
  })
})