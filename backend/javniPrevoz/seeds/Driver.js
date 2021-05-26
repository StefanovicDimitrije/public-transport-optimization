
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Driver').del()
    .then(function () {
      // Inserts seed entries
      return knex('Driver').insert([
        {id: 1, Ime: 'Janez',Priimek:'Novak',EMSO:254152155,telefon:'069-259-286'},
        {id: 2, Ime: 'Fikret',Priimek:'Abdic',EMSO:5811825052,telefon:'069-242-485'},
        {id: 3, Ime: 'Momcilo',Priimek:'Krajsnik',EMSO:15055525,telefon:'069-417-253'}
      ]);
    });
};
