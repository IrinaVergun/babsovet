const { body, query, validationResult } = require('express-validator');
const { DB } = require('./dbInstance');
const { GENERAL_EVENT_OWNER } = require('./constants');

async function eventOwnerValidation(value) {
  if (value === GENERAL_EVENT_OWNER) return; // General event
  const users = await DB.getUsers();
  const user = users.find((user) => user.id === value);
  if (!user) {
    throw new Error('Нет такого пользователя');
  }
}

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
    body('owner').isString().trim().notEmpty().custom(eventOwnerValidation)
  ],
  get: [
    query('owner').notEmpty().custom(eventOwnerValidation)
  ]
}

module.exports = {
  events,
  checkValidations
}