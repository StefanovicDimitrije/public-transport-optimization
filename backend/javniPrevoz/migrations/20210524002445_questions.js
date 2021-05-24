
exports.up = function(knex) {
    return knex.schema.createTable('questions', (table) => {
        table.increments('id').primary();
        table.string('firstName');
        table.string('emailAddress');
        table.string('question');
        table.string('date');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('questions');
};

