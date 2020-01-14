const { Module } = require("../");
const Joi = require("@hapi/joi");

const MIN_PREFIX_SIZE = 1
const MAX_PREFIX_SIZE = 3

module.exports = class PrefixModule extends Module {
  constructor(client) {
    super('prefix', client)
    this.displayName = 'Prefix'

    this.toggleable = false
    this.defaultValues = {
      prefix: process.env.PREFIX,
      spacePrefix: true
    }

    this.specialInput = { prefix: { max: MAX_PREFIX_SIZE } }
  }

  validateValues(entity) {
    return Joi.object().keys({
      prefix: Joi.string().min(MIN_PREFIX_SIZE).max(MAX_PREFIX_SIZE).trim().truncate(),
      spacePrefix: Joi.boolean()
    }).validate(entity)
  }
}