import UserController from '../../controllers/user.controller';

export default {
  queries: {
    oneUser: UserController.one,
    allUsers: UserController.all,
  },
  mutations: {
    createUser: UserController.create,
    updateUser: UserController.update,
  },
};
