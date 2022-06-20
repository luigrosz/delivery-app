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
    } );
    afterEach(async () => {
      salesService.getAllSalesService.restore();
    })

    it('Retorna as sales', async () => {
      salesService.getAllSalesService.resolves(mock.getAll);
      await salesController.getAllSalesController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  // describe('post', async () => {
  //   beforeEach(async () => {
  //     sinon.stub(salesService, 'postSaleService');
  //     request.params = {
  //       id: 1
  //     };
  //     request.body = {
  //         sellerId: 1,
  //         totalPrice: 1,
  //       deliveryAddres: "a",
  //       deliveryNumber: 1,
  //       products: [
  //         {
  //           id: 1,
  //           quantity: 1
  //         }
  //        ]
  //     }
  //     request.user = {
  //       email: "hello@hello.com"
  //     }
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   } );
  //   afterEach(async () => {
  //      salesService.postSaleService.restore();
  //   })
  //   it('Retorna uma sale postada', async () => {
  //     salesService.postSaleService.resolves({});
  //     await salesController.postSaleController(request, response);
  //     expect(response.status.calledWith(201)).to.be.true;
  //   })
  // })

  // describe('edit', async () => {
  //   beforeEach(async () => {
  //     sinon.stub(productsService, 'editProductService');
  //     request.body = {
  //       name: 'a',
  //       price: '2'
  //     };
  //     request.params = {
  //       id: 1
  //     };
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   } );
  //   afterEach(async () => {
  //     productsService.editProductService.restore();
  //   })

  //   it('Retorna um produto editado', async () => {
  //     productsService.editProductService.resolves(mock.updateResponse);
  //     await productsController.editProdController(request, response);
  //     expect(response.status.calledWith(204)).to.be.true;
  //   })
  // })

  // describe('delete', async () => {
  //   beforeEach(async () => {
  //     request.params = {
  //       id: 1
  //     };
  //     sinon.stub(productsService, 'deleteProductService');
  //     response.status = sinon.stub().returns(response);
  //     response.json = sinon.stub().returns();
  //   } );
  //   afterEach(async () => {
  //     productsService.deleteProductService.restore();
  //   })

  //   it('Retorna um produto deletado', async () => {
  //     console.log("aaaa");
  //     productsService.deleteProductService.resolves(mock.deleteResponse);
  //     await productsController.delprodController(request, response);
  //     expect(response.status.calledWith(204)).to.be.true;
  //   })
  // })
})