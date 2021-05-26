
exports.up = function(knex) {
    return knex.schema.createTable('changesTable', (table) => {
        table.increments('id').primary();
        table.string('site');
        table.string('name');
        table.string('changeTitle');
        table.string('more');
        table.date('time');
        // idLinija_Postaja i idAdministrator
        
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('changesTable');
};
