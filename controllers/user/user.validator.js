import validator from 'validator';

export default ({
  phone, email, birth_date: birthDate,
}) => {
  const errors = [];
  try {
    if (!phone || validator.isMobilePhone(`${phone}`)) errors.push('invalid_phone');
    if (!email || !validator.isEmail(`${email}`)) errors.push('invalid_email');
    if (!birthDate || !validator.toDate(birthDate)) throw new Error(errors.toString());

    if (errors.length) throw new Error(errors.toString());
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};
