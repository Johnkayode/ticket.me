import { celebrate, Joi } from 'celebrate';

export const RegisterValidator = celebrate(
  {
    body: {
      firstName: Joi.string().required(),
      lastName: Joi.string().required(),
      email: Joi.string().email({ tlds: { allow: false } }).required().lowercase(),
      // international country code
      phoneNumber: Joi.string().pattern(/^\+(?:[0-9]●?){6,14}[0-9]$/), 
      // minimum 8 characters, containing number, letters and at least one special character
      password: Joi.string().required().pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/),

    },
  },
  { stripUnknown: true },
);

export const LoginValidator = celebrate(
    {
      body: {
        email: Joi.string().email({ tlds: { allow: false } }).required().lowercase(),
        password: Joi.string().required(),
      },
    },
    { stripUnknown: true },
);
  