import { validateToCreate, validateToUpdate } from './user.validator';
import { validateToCreate as validateAddress } from '../address/address.validator';

const normalizeStr = (str) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase();

const getSearchKeys = (user) => {
  let keys = [];

  user.skills.forEach((s) => { keys = [...keys, ...s.split(' ').map((e) => normalizeStr(e))]; });

  if (user.job) keys = [...keys, ...user.job.split(' ').map((e) => normalizeStr(e))];
  if (user.name) keys = [...keys, ...user.name.split(' ').map((e) => normalizeStr(e))];
  if (user.email) keys.push(user.email.toUpperCase());
  if (user.phone) keys.push(user.phone.toUpperCase());
  if (user.instagram) keys.push(user.instagram.toUpperCase());
  if (user.facebook) keys.push(user.facebook.toUpperCase());
  if (user.site_address) keys.push(user.site_address.toUpperCase());
  if (user.genre) keys = [...keys, ...user.genre.split(' ').map((e) => normalizeStr(e))];
  if (user.race) keys = [...keys, ...user.race.split(' ').map((e) => normalizeStr(e))];
  if (user.sexual_orientation) keys = [...keys, ...user.sexual_orientation.split(' ').map((e) => normalizeStr(e))];
  if (user.cep) keys.push(user.cep.toUpperCase());
  if (user.address) {
    if (user.address.bairro) keys = [...keys, ...user.address.bairro.split(' ').map((e) => normalizeStr(e))];
    if (user.address.municipio) keys = [...keys, ...user.address.municipio.split(' ').map((e) => normalizeStr(e))];
    if (user.address.estado) keys = [...keys, ...user.address.estado.split(' ').map((e) => normalizeStr(e))];
    if (user.address.pais) keys = [...keys, ...user.address.pais.split(' ').map((e) => normalizeStr(e))];
  }
  return keys;
};

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
    const validate = validateToCreate(args.user);
    let myAddress = null;
    if (validate.error) throw new Error(validate.msg);
    if (args.user.address) {
      const validatedAddress = validateAddress(args.user.address);
      if (validatedAddress.error) throw new Error(validate.msg);
      myAddress = await adresses.create(args.user.address);
    }

    const userKeys = Object.keys(args.user);
    const myUser = {};
    userKeys.forEach((key) => {
      if (key === 'address') myUser.address = myAddress._id;
      else myUser[key] = args.user[key];
    });

    myUser.search_keys = getSearchKeys(args.user);

    // Craete artist in the database
    const user = await users.create(myUser);

    const updatedUser = await users.findOne({ _id: user._id }).populate('address');
    updatedUser.id = updatedUser._id;
    return updatedUser;
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
  const validate = validateToUpdate(args.user);
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
const findOne = async (parent, args, { users }) => {
  let query = {};
  if (args.user.id) query._id = args.user.id;
  else query = args.user;

  const user = await users.findOne(query).populate('address');
  user.id = user._id;
  return user;
};

/**
  * findAll - Essa função procura e retorna vários usuarios da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { users }) => {
  const myUsers = await users.find(args.user).populate('address');
  return myUsers.map((usr) => ({ ...usr.toJSON(), id: usr.toJSON()._id }));
};

/**
  * search - Essa função procura e retorna vários usuarios da base de dados
  *
  * @function search
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const search = async (parent, args, { users }) => {
  const myUsers = await users.find(
    {
      search_keys: {
        $in: args.key_word.split(' ').map((str) => new RegExp(normalizeStr(str), 'g')),
      },
    },
  ).populate('address');
  return myUsers.map((usr) => ({ ...usr.toJSON(), id: usr.toJSON()._id }));
};

/**
  * search - Essa função procura e retorna vários usuarios da base de dados
  *
  * @function search
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const populateSearchKeys = async (parent, args, { users }) => {
  const myUsers = await users.find().populate('address');
  const promises = myUsers.map((usr) => new Promise((res, rej) => {
    const searchKeys = getSearchKeys(usr);
    users.findOneAndUpdate({ _id: usr._id }, { search_keys: searchKeys })
      .then((user) => {
        res(user);
      })
      .catch((err) => rej(err));
  }));
  return Promise.all(promises);
};

export default {
  create,
  findOne,
  findAll,
  update,
  search,
  populateSearchKeys,
};
