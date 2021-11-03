'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class UserAddresSchema extends Schema {
  up () {
    this.create('user_addres', (table) => {
      table.increments()
      table.integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('SET NULL')
      table.string('street').notNullable()
      table.integer('number').notNullable()
      table.integer('city').notNullable()
      table.integer('state').notNullable()
      table.string('district')
      table.timestamps()
    })
  }

  down () {
    this.drop('user_addres')
  }
}

module.exports = UserAddresSchema
