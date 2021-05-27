exports.up = function(knex) {
    return knex.schema.createTable('Driver_Bus',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_bus').references('id').inTable('Bus');
        table.int('tk_id_Driver').references('id').inTable('Driver');
         })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Driver_Bus');
};
