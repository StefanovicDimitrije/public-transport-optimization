
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Stations').del()
    .then(function () {
      // Inserts seed entries
      return knex('Stations').insert([
        {id: 1, Naziv: '04',tk_id_location: 1 },
        {id: 2, Naziv: '42',tk_id_location: 3},
        {id: 3, Naziv: '63',tk_id_location: 2}
      ]);
    });
};
