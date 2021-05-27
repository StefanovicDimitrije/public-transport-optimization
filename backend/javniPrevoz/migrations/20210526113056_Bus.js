
exports.up = function(knex) {
    return knex.schema.createTable('Bus',(table)=>{
        table.increments('id').primary();
        table.string('Znamka');
        table.string('Reg_st');
        table.int('st_sedista');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('Bus');
};
