
exports.up = function(knex) {
    return knex.schema.createTable('driverReview',(table)=>{
        table.increments('id').primary();
        table.int('tk_id_driver').references('id').inTable('Driver');
        table.int('tk_id_user');//.references('id').inTable('User');
        table.int('mark');
        table.string('comment');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('driverReview');
};
