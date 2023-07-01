const { body, validationResult } = require('express-validator');
const { DB } = require('./dbInstance');

function checkValidations(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    return res.status(400).json({
      error: err.mapped()
    });
  } else {
    next();
  }
}

const events = {
  create: [
    body('title').isString().trim().notEmpty(),
    body('start').isNumeric(),
    body('end').isNumeric(),
    body('allDay').isBoolean(),
    body('owner').isString().trim().notEmpty().custom(async (value) => {
      const users = await DB.getUsers();
      const user = users.find((user) => user.id === value);
      if (!user) {
        throw new Error('Нет такого пользователя');
      }
    })
  ]
}

module.exports = {
  events,
  checkValidations
}