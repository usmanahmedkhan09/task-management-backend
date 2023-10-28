const { handleValidationErrors } = require('../Utils/utilServices');
const modelFieldMapping = require('./validationsFieldsMapping')


const generateValidators = (modelName) =>
{
    const fields = modelFieldMapping[modelName];
    if (!fields)
    {
        throw new Error(`No fields found for model: ${modelName}`);
    }

    const validators = [];

    for (const field in fields)
    {
        if (fields.hasOwnProperty(field))
        {
            validators.push(...fields[field].validations);
        }
    }

    return validators;
};

const createValidationMiddleware = (modelName) => [
    ...generateValidators(modelName),
    (req, res, next) => handleValidationErrors(req, res, next)
];

module.exports = { createValidationMiddleware }