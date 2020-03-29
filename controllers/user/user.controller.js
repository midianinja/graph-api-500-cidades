import validateUser from './user.validator';
import validateAddress from '../address/address.validator';

/**
  * create - Essa função cria um usuario na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { users, adresses }) => {
  try {
    const validate = validateUser(args.user);
    if (validate.error) throw new Error(validate.msg);
    if (args.user.address) {
      const validatedAddress = validateAddress(args.user.address);
      if (validatedAddress.error) throw new Error(validate.msg);
    }

    const userKeys = Object.keys(args.user);
    const myUser = {};
    userKeys.forEach((key) => {
      if (key === 'address') return;
      myUser[key] = args.user[key];
    });

    // Craete artist in the database
    const user = await users.create(myUser);
    if (args.user.address) {
      await adresses.create(args.user.address);
    }
    const updatedUser = await users.findOne({ _id: user._id }).populate('address');
    return { ...updatedUser, id: updatedUser._id };
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

/**
  * update - Essa função atualiza um usuario na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = async (parent, args, { adresses, users }) => {
  const validate = validateUser(args.user);
  if (validate.error) throw new Error(validate.msg);
  if (args.user.address) {
    const validatedAddress = validateAddress(args.user.address);
    if (validatedAddress.error) throw new Error(validate.msg);
  }
  const userKeys = Object.keys(args.user);
  const myUser = {};
  userKeys.forEach((key) => {
    if (key === 'address') return;
    myUser[key] = args.user[key];
  });

  try {
    // Craete artist in the database
    const user = await users.findOneAndUpdate({ _id: args.user_id }, myUser);
    if (args.user.address) {
      await adresses.findOneAndUpdate({ _id: args.user.address.id }, args.user.address);
    }
    const updatedUser = await users.findOne({ _id: user._id }).populate('address');
    return { ...updatedUser, id: updatedUser._id };
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

/**
  * findOne - Essa função procura e retorna um usuario na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { users }) => users.findOne(args.user).populate('address');

/**
  * findAll - Essa função procura e retorna vários usuarios da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { users }) => users.find(args.user).populate('address');

export default {
  create,
  findOne,
  findAll,
  update,
};
