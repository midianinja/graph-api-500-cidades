import validator from 'validator';

export default ({
  latitude, longitude,
}) => {
  const errors = [];
  try {
    if (!validator.isDecimal(`${latitude}`)) errors.push('invalid_latitude');
    if (!validator.isDecimal(`${longitude}`)) errors.push('invalid_longitude');
    if (errors.length) throw new Error(errors.toString());
    return {};
  } catch (err) {
    console.error('err:', err);
    throw err;
  }
};
