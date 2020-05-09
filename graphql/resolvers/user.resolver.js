import UserController from '../../controllers/user/user.controller';

export default {
  queries: {
    oneUser: UserController.findOne,
    allUsers: UserController.findAll,
    searchUser: UserController.search,
  },
  mutations: {
    createUser: UserController.create,
    updateUser: UserController.update,
    populateUserSearchKeys: UserController.populateSearchKeys,
  },
};
