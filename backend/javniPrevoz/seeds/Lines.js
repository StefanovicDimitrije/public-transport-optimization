
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Lines').del()
    .then(function () {
      // Inserts seed entries
      return knex('Lines').insert([
        {id: 1, Naziv: 'Maribor-Center'},
        {id: 2, Naziv: 'Maribor-Pohorje'},
        {id: 3, Naziv: 'Maribor-SlovneskaBistrica'}
      ]);
    });
};
