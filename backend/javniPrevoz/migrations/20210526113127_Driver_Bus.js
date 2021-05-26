exports.up = function(knex) {
    return knex.schema.createTable('Driver_Bus',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_bus');
        table.int('tk_id_Driver')
         })
};

exports.down = function(knex) {
    return knex.schema.droptable('Driver_Bus');
};
