import validator from 'validator';

export const validateToCreate = ({ email }) => {
  const errors = [];
  try {
    if (!email || !validator.isEmail(`${email}`)) errors.push('invalid_email');

    if (errors.length) throw new Error(errors.toString());
    return {};
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

export const todelete = '';
