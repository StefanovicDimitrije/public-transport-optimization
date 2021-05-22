//test knex migrations
// creates db tables
exports.up = function(knex) { //creates table and it's structure
  return knex.schema.createTable('testTable', (table) => {
      table.increments('id').primary();
      table.string('test1');
      table.decimal('test2');
  })
};

exports.down = function(knex) { //drops the entire table
  return knex.schema.dropTable('testTable');
};
