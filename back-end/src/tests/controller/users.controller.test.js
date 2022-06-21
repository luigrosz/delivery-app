const sinon = require("sinon");
const { expect } = require("chai");
const userService = require('../../service/user.service');
const userController = require('../../controller/user.controller');

describe('Teste users controller', () => {
  const request = {};
  const response = {};

  describe('login', async () => {
    beforeEach(async () => {
      sinon.stub(userService, 'loginService');
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
      userService.loginService.restore();
    })

    it('login nao encontrado', async () => {
      request.body = {
        email: "sadjinaskjd@dsadsa.com",
        password: "qwerty123"
      }
      await userController.loginController(request, response);
      expect(response.status.calledWith(404)).to.be.true;
    })
    it('login encontrado', async () => {
      request.body = {
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      }
      await userController.loginController(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })

  describe('registro', async () => {
    beforeEach(async () => {
      sinon.stub(userService, 'registerService');
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
      userService.registerService.restore();
    })

    it('registro feito', async () => {
      request.body = {
        name: "Bartolomeu",
        email: "hello@hello.com",
        password: "qwerty123"
      }
      await userController.registerController(request, response);
      expect(response.status.calledWith(201)).to.be.true;
    })
    it('registro com email já na database', async () => {
      request.body = {
        name: "Fulana Pereira",
        email: "fulana@deliveryapp.com",
        password: "fulana@123"
      }
      const a = await userController.registerController(request, response);
      expect(response.status.calledWith(409)).to.be.true;
    })
  })
  describe('getAll sellers', async () => {
    beforeEach(async () => {
      sinon.stub(userService, 'allSellersService');
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
    });
    afterEach(async () => {
      userService.allSellersService.restore();
    })

    it('retorna todos os vendedores', async () => {
      await userController.getAllSellers(request, response);
      expect(response.status.calledWith(200)).to.be.true;
    })
  })
})