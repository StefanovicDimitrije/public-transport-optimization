
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Lines_Stations').del()
    .then(function () {
      // Inserts seed entries
      return knex('Lines_Stations').insert([
        {id: 1, tk_id_line: 1,tk_id_Station: 1,time: '07:00',day: 'Work days',tk_id_bus_driver: 1,vrstni_red: 1},
        {id: 2, tk_id_line: 1,tk_id_Station: 2,time: '07:20',day: 'Work days',tk_id_bus_driver: 1,vrstni_red: 2},
        {id: 3, tk_id_line: 1,tk_id_Station: 3,time: '07:35',day: 'Work days',tk_id_bus_driver: 1,vrstni_red: 3}
      ]);
    });
};
