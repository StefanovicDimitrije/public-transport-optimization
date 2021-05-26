
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Location').del()
    .then(function () {
      // Inserts seed entries
      return knex('Location').insert([
        {id: 1, Ulica: 'Presernova',Grad: 'Maribor',Gps:3453 },
        {id: 2, Ulica: 'Ciril-Metodova',Grad: 'Maribor',Gps: 452343},
        {id: 3, Ulica: 'Rudolf Maister',Grad: 'Maribor',Gps: 34534}
      ]);
    });
};
