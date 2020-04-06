exports.up = function(knex) {
  return knex.schema.createTable('incidents', function(table){
    table.increments('id');
    table.string('title').notNullable();
    table.string('description').notNullable();
    table.decimal('value').notNullable();

    table.integer('user_id').notNullable();

    table.foreign('user_id').references('id').inTable('users');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('incidents');
};