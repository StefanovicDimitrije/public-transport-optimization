
exports.up = function(knex) {
  return knex.schema.createTable('Lines',(table)=>{
      table.increments('id').primary();
      table.string('Naziv');
  })
};

exports.down = function(knex) {
  return knex.schema.dropTable('Lines');
};
