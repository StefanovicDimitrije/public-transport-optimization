
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('driverReview').del()
    .then(function () {
      // Inserts seed entries
      return knex('driverReview').insert([
        {id: 1, tk_id_driver: 1,tk_id_user: 1,mark: 5 ,comment:'sdsad'},
        {id: 2, tk_id_driver: 1,tk_id_user: 2,mark: 6 ,comment:'asda'},
        {id: 3, tk_id_driver: 1,tk_id_user: 3,mark: 8 ,comment:'asd'},
        {id: 4, tk_id_driver: 2,tk_id_user: 4,mark: 10 ,comment:'asd'},
        {id: 5, tk_id_driver: 2,tk_id_user: 5,mark: 7 ,comment:'asd'},
        {id: 6, tk_id_driver: 2,tk_id_user: 6,mark: 6 ,comment:'aawe'},
        {id: 7, tk_id_driver: 3,tk_id_user: 7,mark: 1 ,comment:'asc'},
        {id: 8, tk_id_driver: 3,tk_id_user: 8,mark: 3 ,comment:'asd'},
        {id: 9, tk_id_driver: 3,tk_id_user: 9,mark: 9 ,comment:'qweqwe'}
      ]);
    });
};
