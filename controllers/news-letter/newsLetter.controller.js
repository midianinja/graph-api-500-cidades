import { validateToCreate } from './newsLetter.validator';

/**
  * create - Essa função cria um usuario na base de dados
  *
  * @function create
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const create = async (parent, args, { newsLetter }) => {
  try {
    const validate = validateToCreate(args.user);
    if (validate.error) throw new Error(validate.msg);
    const user = await newsLetter.create(args.user);
    user.id = user._id;
    return user;
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

/**
  * findAll - Essa função procura e retorna vários usuarios da base de dados
  *
  * @function findAll
  * @param {object} parent Informações de um possível pai
  * @param {object} args Informações enviadas na query ou mutation
  * @param {object} context Informações passadas no context para o apollo graphql
  */
const findAll = async (parent, args, { newsLetter }) => {
  const myUsers = await newsLetter.find(args.user);
  return myUsers.map((usr) => ({ ...usr.toJSON(), id: usr.toJSON()._id }));
};


export default {
  create,
  findAll,
};
