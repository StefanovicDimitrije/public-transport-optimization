
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Bus').del()
    .then(function () {
      // Inserts seed entries
      return knex('Bus').insert([
        {id: 1, Znamka: 'Man', Reg_st:'MB-786-515',st_sedista: 30},
        {id: 2, Znamka: 'Iveco', Reg_st:'MB-587-221',st_sedista: 50},
        {id: 3, Znamka: 'Iveco', Reg_st:'MB-648-305',st_sedista: 25}
      ]);
    });
};
