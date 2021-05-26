
exports.up = function(knex) {
    return knex.schema.createTable('Stations',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_location');
        table.string('Naziv');
    })
};

exports.down = function(knex) {
    return knex.schema.droptable('Stations');
};
