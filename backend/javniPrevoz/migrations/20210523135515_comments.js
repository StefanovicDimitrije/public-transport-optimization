exports.up = function(knex) { //creates table and it's structure
    return knex.schema.createTable('comments', (table) => {
        table.increments('id').primary();
        table.integer('idUporabnik');
        table.integer('idNovic');
        table.string('vprasanje');
        table.date('datum');
    })
  };
  
  exports.down = function(knex) { //drops the entire table
    return knex.schema.dropTable('comments');
  };
  