
exports.up = function(knex) {
    return knex.schema.createTable('location',(table)=>{
        table.increments('id').primary();
        table.string('Ulica');
        table.string('Grad');
        table.int('Gps');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('location');
};
``