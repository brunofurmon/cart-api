const { checkSchema, validationResult } = require('express-validator');

const validate = async (req, res, next) => {
  const result = validationResult(req);

  if (result.isEmpty()) {
    next();
    return;
  }
  const validationError = result.array({
    onlyFirstError: true,
  })[0];
  const errMsg = validationError.msg || 'Bad request';

  res.status(400).json({ message: errMsg });
};

const validateAddProduct = checkSchema(
  {
    productId: {
      in: ['body'],
      isInt: {
        errorMessage: 'The "productId" property must be present and be a positive integer.',
        options: { min: 1 },

      },
    },
    quantity: {
      in: ['body'],
      isInt: {
        errorMessage: 'The "quantity" property must be present and be a positive non-zero integer.',
        options: { min: 1 },
      },
    },
    price: {
      in: ['body'],
      isFloat: {
        errorMessage: 'The "price" decimal number must be present and >= 0.01 (use . for decimal separator).',
        // Depending on the currency, number of decimals may vary
        options: { min: 0.01 },
      },
    },
  },
);

const validateRemoveProduct = checkSchema(
  {
    productId: {
      in: ['params'],
      isInt: {
        errorMessage: 'The "productId" property must be present and be a positive integer.',
        options: { min: 1 },

      },
    },
    quantity: {
      in: ['body'],
      isInt: {
        errorMessage: 'The "quantity" property must be present and be a positive non-zero integer.',
        options: { min: 1 },
      },
    },
  },
);

module.exports = { validateAddProduct, validateRemoveProduct, validate };
