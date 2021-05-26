
exports.up = function(knex) {
    return knex.schema.createTable('Driver',(table)=>{
        table.increments('id').primary();
        table.string('Ime');
        table.string('Priimek');
        table.int('EMSO');
        table.string('telefon');
    })
};

exports.down = function(knex) {
    return knex.schema.droptable('Driver');
};
