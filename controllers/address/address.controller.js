import validateAddress from './address.validator';

/**
  * create - Essa função cria um endereço na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { adresses }) => {
  const validate = validateAddress(args.address);
  if (validate.error) throw new Error(validate.msg);

  try {
    return await adresses.create(args.address);
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

/**
  * update - Essa função atualiza um endereço na base de dados
  *
  * @function update
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const update = async (parent, args, { adresses }) => {
  const validate = validateAddress(args.address);
  if (validate.error) throw new Error(validate.msg);

  try {
    // Craete artist in the database
    return await adresses.findOneAndUpdate({ _id: args.address_id }, args.address);
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

/**
  * findOne - Essa função procura e retorna um endereço na base de dados
  *
  * @function findOne
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findOne = (parent, args, { adresses }) => adresses.findOne(args.address).populate('address');

/**
  * findAll - Essa função procura e retorna vários endereços da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = (parent, args, { adresses }) => adresses.find(args.address).populate('address');

export default {
  create,
  findOne,
  findAll,
  update,
};
