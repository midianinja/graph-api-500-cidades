import AdressesController from '../../controllers/address/address.controller';

export default {
  queries: {
    oneAddress: AdressesController.findOne,
    allAdresses: AdressesController.findAll,
  },
  mutations: {
    createAddress: AdressesController.create,
    updateAddress: AdressesController.update,
  },
};
