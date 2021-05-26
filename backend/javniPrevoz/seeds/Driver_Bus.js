
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Driver_Bus').del()
    .then(function () {
      // Inserts seed entries
      return knex('Driver_Bus').insert([
        {id: 1, tk_id_bus: 1,tk_id_Driver: 1},
        {id: 2, tk_id_bus: 2,tk_id_Driver: 2},
        {id: 3, tk_id_bus: 3,tk_id_Driver: 3}
      ]);
    });
};
