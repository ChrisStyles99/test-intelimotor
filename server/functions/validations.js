const { check, validationResult } = require('express-validator');

const saveAdValidation = [
  check('price').exists().not().isEmpty().withMessage('Por favor envie el precio').isFloat({min: 1000}).withMessage('Por favor envie un precio valido'),
  check('description').exists().not().isEmpty().withMessage('Por favor envie la descripcion').isLength({min: 10}).withMessage('La descricion debe tener mas de 10 caracteres').trim()
]

module.exports = {
  saveAdValidation
}