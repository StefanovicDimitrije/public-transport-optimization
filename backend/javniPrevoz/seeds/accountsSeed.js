exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('accountTable').del()
      .then(function () {
        // Inserts seed entries
        return knex('accountTable').insert([
          {
            id: 1,
            name:"Pera",
            surname:"Peric",
            username:"@petarperic4",
            mail:"petar.peric@student.um.si",
            birthdate:'2021-02-26',
            pfp:"../assets/img/default-avatar.png",
            password:"user",
            city: "Ljubljana"
        },
        {
            id: 2,
            name:"Mika",
            surname:"Miric",
            username:"@mirimir",
            mail:"admin@gmail.com",
            birthdate:'2021-02-26',
            pfp:"../assets/img/default-avatar.png",
            password:"admin",
            city: "Maribor"
        }
        ]);
      });
  };