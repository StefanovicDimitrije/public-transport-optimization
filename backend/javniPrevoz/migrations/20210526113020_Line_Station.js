
exports.up = function(knex) {
    return knex.schema.createTable('Lines_Stations',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_line').references('id').inTable('Lines');
        table.int('tk_id_station').references('id').inTable('Sation');
        table.string('time');
        table.string('day');
        table.int('tk_id_bus_driver').references('id').inTable('Driver_Bus');
        table.int('vrstni_red');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Lines_Stations');
};
