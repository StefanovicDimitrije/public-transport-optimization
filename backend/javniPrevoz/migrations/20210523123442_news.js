
exports.up = function(knex) {
    return knex.schema.createTable('News', (table) => {
        table.increments('id').primary();
        table.date('Date');
        table.string('Title').notNullable();
        table.string('Text');
        //table.integer('admin_id').references('id').inTable('admin');
        table.string('Cover');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('News');
};
