import validator from 'validator';

export const validateToUpdate = ({
  phone, email, birth_date: birthDate,
}) => {
  const errors = [];
  try {
    if (phone && !validator.isMobilePhone(`${phone}`)) errors.push('invalid_phone');
    if (email && !validator.isEmail(`${email}`)) errors.push('invalid_email');
    if (birthDate && !validator.toDate(birthDate)) errors.push('invalid_birth_date');

    if (errors.length) throw new Error(errors.toString());
    return {};
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};

export const validateToCreate = ({
  phone, email, birth_date: birthDate,
}) => {
  const errors = [];
  try {
    if (!phone || !validator.isMobilePhone(`${phone}`)) errors.push('invalid_phone');
    if (!email || !validator.isEmail(`${email}`)) errors.push('invalid_email');
    if (!birthDate || !validator.toDate(birthDate)) errors.push('invalid_birth_date');

    if (errors.length) throw new Error(errors.toString());
    return {};
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};
