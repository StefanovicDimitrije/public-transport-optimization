exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('changesTable').del()
    .then(function () {
      // Inserts seed entries
      return knex('changesTable').insert([
        {
          id: 1,
          site:"#",
          name:"Station name",
          changeTitle:"Station location was changed",
          more:"The station named 'Example name' was moved to another station, on a paralled street",
          time:'2021-02-26'
      },
      {
          id: 2,
          site:"#",
          name:"Bus line number",
          changeTitle:"Takeoff time is later from Kamnica from the 22nd May",
          more:"Due to the COVID-19 measures and the fact that we have much less drivers, the start time of the line 'Example line' will be later in the day",
          time:'2021-02-26'
      },
      {
          id: 3,
          site:"#",
          name:"Station name",
          changeTitle:"Station was removed",
          more:"Station on the 'Meljska cesta' was removed and will no longer be in use in the future routes of the buses that were passing it",
          time:'2021-02-26'
      },
      {
          id: 4,
          site:"#",
          name:"Bus line number",
          changeTitle:"Route update",
          more:"The route of the bus line 'Bus line2' has changed its route around 'Titova cesta' due to the bussines of the street ",
          time:'2021-02-26'
      },
      {
          id: 5,
          site:"#",
          name:"Bus line number",
          changeTitle:"Route update",
          more:"The route of the bus line 'Bus line' has changed it route around the street 'Ljubljanska ulica' due to construction work",
          time:'2021-02-26'
      }
      ]);
    });
};
