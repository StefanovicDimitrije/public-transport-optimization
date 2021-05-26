
exports.up = function(knex) {
    return knex.schema.createTable('Lines_Stations',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_line');
        table.int('tk_id_station');
        table.string('time');
        table.string('day');
        table.int('tk_id_bus_driver');
        table.int('vrstni_red');
    })
};

exports.down = function(knex) {
    return knex.schema.droptable('Lines_Stations');
};
