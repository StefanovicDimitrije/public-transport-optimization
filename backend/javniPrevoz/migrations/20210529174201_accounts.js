
exports.up = function(knex) {
    return knex.schema.createTable('accountTable', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('surname');
        table.string('username');
        table.string('mail');
        table.date('birthdate');
        table.string('pfp');
        table.string('password');        
        table.string('city');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('accountTable');
};
