var knex = require('knex')({
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'javniprevoz'
    }
});

const bcrypt = require('bcryptjs');

//CHANGE ADMIN TO USER

async function fillDatabase() {

    //DROP ALL TABLES
    await knex.schema.dropTableIfExists('users').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('buses').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('lines').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('locations').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('stations').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('drivers').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('drivers_buses').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('lines_stations').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('news').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('comments').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('changes').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('questions').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('driverReview').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('questionReply').catch((err) => { console.log(err); throw err });
    await knex.schema.dropTableIfExists('favourites').catch((err) => { console.log(err); throw err });

    //ACCOUNTTABLE TABLE
    await knex.schema.createTable('users', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('surname');
            table.string('username');
            table.string('mail');
            table.date('birthdate');
            table.string('pfp'); //table.binary('pfp');
            table.string('password');
            table.string('city');
            table.boolean('admin');
        }).then(() => console.log("users database created"))
        .catch((err) => { console.log(err); throw err });

    // BUS TABLE
    await knex.schema.createTable('buses', (table) => {
            table.increments('id').primary();
            table.string('brand');
            table.string('registration_no');
            table.integer('seat_no');
        }).then(() => console.log("Buses database created"))
        .catch((err) => { console.log(err); throw err });

    //LINES TABLE
    await knex.schema.createTable('lines', (table) => {
            table.increments('id').primary();
            table.string('name');
        }).then(() => console.log("lines database created"))
        .catch((err) => { console.log(err); throw err });
    // LOCATION TABLE
    await knex.schema.createTable('locations', (table) => {
            table.increments('id').primary();
            table.string('street');
            table.string('city');
            table.integer('Gps');
        }).then(() => console.log("Location database created"))
        .catch((err) => { console.log(err); throw err });
    //STATIONS TABLE
    await knex.schema.createTable('stations', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_location').references('id').inTable('locations');
            table.string('name');
        }).then(() => console.log("Stations database created"))
        .catch((err) => { console.log(err); throw err });
    // DRIVER TABLE
    await knex.schema.createTable('drivers', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('surname');
            table.integer('emso');
            table.string('phone_no');
        }).then(() => console.log("Driver database created"))
        .catch((err) => { console.log(err); throw err });
    //DRIVER_BUS TABLE
    await knex.schema.createTable('drivers_buses', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_bus').references('id').inTable('buses');
            table.integer('tk_id_driver').references('id').inTable('drivers');
        }).then(() => console.log("Driver_Bus database created"))
        .catch((err) => { console.log(err); throw err });

    // LINES_STATIONS TABLE
    await knex.schema.createTable('lines_stations', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_line').references('id').inTable('lines');
            table.integer('tk_id_station').references('id').inTable('stations');
            table.string('time');
            table.string('day');
            table.integer('tk_id_bus_driver').references('id').inTable('drivers_buses');
            table.integer('order');
        }).then(() => console.log("lines_stations database created"))
        .catch((err) => { console.log(err); throw err });

    //NEWS TABLE
    await knex.schema.createTable('news', (table) => {
            table.increments('id').primary();
            table.date('date');
            table.string('title').notNullable();
            table.text('text', 'mediumtext');
            table.integer('author').references('id').inTable('users');
            table.string('cover');
        }).then(() => console.log("News database created"))
        .catch((err) => { console.log(err); throw err });

    //COMMENTS TABLE
    await knex.schema.createTable('comments', (table) => {
            table.increments('id').primary();
            table.integer('user_id').references('id').inTable('users');
            table.integer('news_id').references('id').inTable('news');
            table.string('comment');
            table.date('date');
        }).then(() => console.log("Comments database created"))
        .catch((err) => { console.log(err); throw err });
    //CHANGES TABLE
    await knex.schema.createTable('changes', (table) => {
            table.increments('id').primary();
            table.string('site');
            table.string('name');
            table.string('changeTitle');
            table.string('more');
            table.date('time');
            // idLinija_Postaja i idAdministrator NEEDS TO BE FOREIGN KEY

        }).then(() => console.log("ChangesTable database created"))
        .catch((err) => { console.log(err); throw err });
    //QUESTIONS TABLE
    await knex.schema.createTable('questions', (table) => {
            table.increments('id').primary();
            table.string('name');
            table.string('mail');
            table.string('question');
            table.date('date');
            table.integer('likes');
        }).then(() => console.log("Questions database created"))
        .catch((err) => { console.log(err); throw err });

    //DRIVER REVIEW TABLE
    await knex.schema.createTable('driverReview', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_driver').references('id').inTable('drivers');
            table.integer('tk_id_user').references('id').inTable('users');
            table.integer('mark');
            table.string('comment');
        }).then(() => console.log("driverReview database created"))
        .catch((err) => { console.log(err); throw err });

    //REPLY TABLE
    await knex.schema.createTable('questionReply', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_question').references('id').inTable('question');
            table.integer('tk_id_user').references('id').inTable('users');
            table.string('reply');
            table.date('date');
            table.integer('likes');
        }).then(() => console.log("questionReply database created"))
        .catch((err) => { console.log(err); throw err });

    //FAVOURITES TABLE
    await knex.schema.createTable('favourites', (table) => {
            table.increments('id').primary();
            table.integer('tk_id_lines').references('id').inTable('lines');
            table.integer('tk_id_users').references('id').inTable('users');
        }).then(() => console.log("favourites database created"))
        .catch((err) => { console.log(err); throw err });
    //INITIAL VALUES FOR TABLES    

    const users = [{
            name: "Pera",
            surname: "Peric",
            username: "@petarperic4",
            mail: "petar.peric@student.um.si",
            birthdate: '2021-02-26',
            pfp: "../assets/img/default-avatar.png",
            password: bcrypt.hashSync('user', 12),
            city: "Ljubljana",
            admin: false
        },
        {
            name: "Mika",
            surname: "Miric",
            username: "@mirimir",
            mail: "admin@gmail.com",
            birthdate: '2021-02-26',
            pfp: "../assets/img/default-avatar.png",
            password: bcrypt.hashSync('admin', 12),
            city: "Maribor",
            admin: true
        },
        {
            name: "Ivan",
            surname: "Miric",
            username: "@Ivan",
            mail: "ivan@gmail.com",
            birthdate: '2021-02-26',
            pfp: "../assets/img/default-avatar.png",
            password: bcrypt.hashSync('admin123', 12),
            city: "Maribor",
            admin: true
        }
    ]
    const buses = [
        { brand: 'Man', registration_no: 'MB-786-515', seat_no: 30 },
        { brand: 'Iveco', registration_no: 'MB-587-221', seat_no: 50 },
        { brand: 'Iveco', registration_no: 'MB-648-305', seat_no: 25 }
    ]
    const drivers = [
        { name: 'Janez', surname: 'Novak', emso: 2541, phone_no: '069-259-286' },
        { name: 'Francek', surname: 'Presern', emso: 5811, phone_no: '069-242-485' },
        { name: 'Radovan', surname: 'Radic', emso: 1505, phone_no: '069-417-253' }
    ]
    const lines = [
        { name: '12' },
        { name: '93' },
        { name: '75' },
        { name: '4' },
        { name: '7' },
        { name: '15' },
        { name: '39' },
        { name: '87' },
        { name: '3' },
        { name: '20' }
    ]

    const locations = [
        { street: 'Ulica Pariške komune ', city: 'Maribor' },
        { street: 'Koresova ulica 6', city: 'Maribor'  },
        { street: 'Na poljah', city: 'Maribor'  }, // gps 46°33'07.0"N 15°37'41.8"E
        { street: 'Ulica heroja Šercerja', city: 'Maribor' },
        { street: 'Ruška cesta', city: 'Maribor' },
        { street: 'Cesta proletarskih brigad', city: 'Maribor' }, // 46.541471, 15.639593
        { street: 'Cesta proletarskih brigad 62-66', city: 'Maribor' },
        { street: '1', city: 'Maribor' }, // 46.547615, 15.620661
        { street: 'Ulica heroja Šercerja', city: 'Maribor' }, //46.549582, 15.621599
        { street: 'Ulica heroja Šercerja', city: 'Maribor' }, //46.554024, 15.624081
        { street: 'Partizanska cesta 12', city: 'Maribor' }, //46.560394, 15.652069
        { street: 'Titova cesta', city: 'Maribor'}, // 46.558505, 15.651080
        { street: 'Pobreška cesta 18', city: 'Maribor' },
        { street: 'Pobreška cesta', city: 'Maribor' }, //46.554646, 15.659039
        { street: 'Zrkovska cesta', city: 'Maribor' },//46.555155, 15.665236
        { street: 'Turnerjeva ulica 29-23', city: 'Maribor' },
        { street: 'Gosposvetska cesta 57-49', city: 'Maribor' },
        { street: 'Prežihova ulica 12', city: 'Maribor' },
        { street: 'Gregorčičeva ulica 39-29', city: 'Maribor' },
        { street: 'Krekova ulica 21-7', city: 'Maribor' }
    ]

    const stations = [
        { name: 'Pariške komune', tk_id_location: 1 },
        { name: 'Koresova 1', tk_id_location: 2 },
        { name: 'Na poljah 2', tk_id_location: 3 },
        { name: 'Heroja Šercerja 3', tk_id_location: 4 },
        { name: 'Ruška 5', tk_id_location: 5 },
        { name: 'Cesta proletarskih brigad 54', tk_id_location: 6 },
        { name: 'Cesta proletarskih brigad 62', tk_id_location: 7 },
        { name: '1-Qlandia', tk_id_location: 8 },
        { name: 'Šercerjeva 5', tk_id_location: 9 },
        { name: 'Šercerja 7', tk_id_location: 10 },
        { name: 'Partizanska  12', tk_id_location: 11 },
        { name: 'Titova 5', tk_id_location: 12 },
        { name: 'Pobreška 18', tk_id_location: 13 },
        { name: 'Pobreška 29', tk_id_location: 14 },
        { name: 'Zrkovska 7', tk_id_location: 15 },
        { name: 'Turnerjeva 29', tk_id_location: 16 },
        { name: 'Gosposvetska 57', tk_id_location: 17 },
        { name: 'Prežihova 9', tk_id_location: 18 },
        { name: 'Gregorčičeva 3', tk_id_location: 19 },
        { name: 'Krekova 7', tk_id_location: 20 } 
    ]


    const changes = [{
            site: "#",
            name: "Station name",
            changeTitle: "Station location was changed",
            more: "The station named 'Example name' was moved to another station, on a paralled street",
            time: '2021-02-26'
        },
        {
            site: "#",
            name: "Bus line number",
            changeTitle: "Takeoff time is later from Kamnica from the 22nd May",
            more: "Due to the COVID-19 measures and the fact that we have much less drivers, the start time of the line 'Example line' will be later in the day",
            time: '2021-02-26'
        },
        {
            site: "#",
            name: "Station name",
            changeTitle: "Station was removed",
            more: "Station on the 'Meljska cesta' was removed and will no longer be in use in the future routes of the buses that were passing it",
            time: '2021-02-26'
        },
        {
            site: "#",
            name: "Bus line number",
            changeTitle: "Route update",
            more: "The route of the bus line 'Bus line2' has changed its route around 'Titova cesta' due to the bussines of the street ",
            time: '2021-02-26'
        },
        {
            site: "#",
            name: "Bus line number",
            changeTitle: "Route update",
            more: "The route of the bus line 'Bus line' has changed it route around the street 'Ljubljanska ulica' due to construction work",
            time: '2021-02-26'
        }
    ]

    const drivers_buses = [
        { tk_id_bus: 1, tk_id_driver: 1 },
        { tk_id_bus: 2, tk_id_driver: 2 },
        { tk_id_bus: 3, tk_id_driver: 3 }
    ]

    const drivers_Reviews = [
        { tk_id_driver: 1, tk_id_user: 1, mark: 5, comment: 'sdsad' },
        { tk_id_driver: 1, tk_id_user: 2, mark: 6, comment: 'asda' },
        { tk_id_driver: 1, tk_id_user: 3, mark: 8, comment: 'asd' },
        { tk_id_driver: 2, tk_id_user: 4, mark: 10, comment: 'asd' },
        { tk_id_driver: 2, tk_id_user: 6, mark: 6, comment: 'aawe' },
        { tk_id_driver: 3, tk_id_user: 7, mark: 1, comment: 'asc' },
        { tk_id_driver: 3, tk_id_user: 8, mark: 3, comment: 'asd' },
        { tk_id_driver: 3, tk_id_user: 9, mark: 9, comment: 'qweqwe' }
    ]


    const lines_stations = [
        { tk_id_line: 1, tk_id_station: 1, time: '07:00', day: 'Work days', tk_id_bus_driver: 1, order: 1 },
        { tk_id_line: 1, tk_id_station: 2, time: '07:20', day: 'Work days', tk_id_bus_driver: 2, order: 2 },
        { tk_id_line: 1, tk_id_station: 3, time: '07:35', day: 'Work days', tk_id_bus_driver: 3, order: 3 },
        { tk_id_line: 1, tk_id_station: 4, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 4 },
        { tk_id_line: 2, tk_id_station: 5, time: '07:35', day: 'Work days', tk_id_bus_driver: 2, order: 1 },
        { tk_id_line: 2, tk_id_station: 6, time: '07:35', day: 'Work days', tk_id_bus_driver: 3, order: 2 },
        { tk_id_line: 2, tk_id_station: 7, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 3 },
        { tk_id_line: 2, tk_id_station: 8, time: '07:35', day: 'Work days', tk_id_bus_driver: 2, order: 4 },
        { tk_id_line: 3, tk_id_station: 9, time: '07:35', day: 'Work days', tk_id_bus_driver: 3, order: 1 },
        { tk_id_line: 3, tk_id_station: 10, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 2 },
        { tk_id_line: 3, tk_id_station: 11, time: '07:00', day: 'Work days', tk_id_bus_driver: 2, order: 3 },
        { tk_id_line: 3, tk_id_station: 12, time: '07:20', day: 'Work days', tk_id_bus_driver: 3, order: 4 },
        { tk_id_line: 4, tk_id_station: 13, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 1 },
        { tk_id_line: 4, tk_id_station: 14, time: '07:35', day: 'Work days', tk_id_bus_driver: 2, order: 2 },
        { tk_id_line: 4, tk_id_station: 15, time: '07:35', day: 'Work days', tk_id_bus_driver: 3, order: 3 },
        { tk_id_line: 4, tk_id_station: 16, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 4 },
        { tk_id_line: 5, tk_id_station: 17, time: '07:35', day: 'Work days', tk_id_bus_driver: 2, order: 1 },
        { tk_id_line: 5, tk_id_station: 18, time: '07:35', day: 'Work days', tk_id_bus_driver: 3, order: 2 },
        { tk_id_line: 5, tk_id_station: 19, time: '07:35', day: 'Work days', tk_id_bus_driver: 1, order: 3 },
        { tk_id_line: 5, tk_id_station: 20, time: '07:35', day: 'Work days', tk_id_bus_driver: 2, order: 4 }, 
    ]

    const news = [{
            date: '2021-02-26',
            title: 'Change of route for Line 58, 88 and 512',
            text: 'Due to the bursting of the water pipe in Vodovodska Street, at house number 12, the street is completely closed to traffic and public transport, which is why vehicles from the public transport lines: 58, 88 and 512 are moving on changed routes across Milorada Jovanović Street. The works should last until  the end of the day, by 20:00.',
            author: 1,
            cover: 'bg6.jpg'
        },
        {
            date: '2020-11-18',
            title: 'Night lines (N) in Belgrade are temporarily canceled',
            text: 'Temporary suspension of lines in night (N) passenger transport from tomorrow evening, ie from the night between November 18 and 19. <br> The decision was made in accordance with the order of the City Headquarters for Emergency Situations (due to the worsened epidemiological situation caused by the Covid-19 virus) in the territory of the City of Belgrade. and classic games of chance and other facilities are prohibited from 9 pm to 5 am. <br> The temporary suspension of work will be performed on 24 night lines, which operated from 00 to 4 hours, and these are the following lines: <br> 15N Republic Square - Zemun / Novi grad / <br> 26N Dorcol - Brace Jerkovic <br> 27N Trg Republike - Mirijevo 3 <br> 29N Studentski trg - Medaković 3 <br> 31N Studentski trg - Konjarnik <br> 32N Republic Square - Višnjica <br> 33N Studentski trg - Kumodraž <br> 37N Republic Square - Kneževac <br> 47N Trg Republike - Resnik ŽS <br> After the abolition of the adopted measures, transportation on night lines will be re-established.',
            author: 1,
            cover: 'nightBus.jpg'
        },
        {
            date: '2020-12-01',
            title: 'New Covid measures for safe travel',
            text: 'GSP "Novi Sad" will organize the transportation so that the occupancy of the parking place does not exceed 50 percent. Passengers, with the obligatory use of protective masks, are obliged to provide a distance of at least 2 meters from the entrance / exit of the vehicle while waiting to enter the bus. Also, GSP is obliged to determine the timetable with an increased number of departures in rush hour, as well as a reduced number of departures outside rush hour.',
            author: 1,
            cover: 'bus1.jpg'
        },
        {
            date: '2021-01-15',
            title: 'Monthly public transportation tickets for elderly and in retirement will now be 15% cheaper',
            text: 'At the begining of the new year the goverment and the sector of public transportation have made new changes after the effects of Covid wore off. These include higher hygiene standards for all buses and the lowering of prices for monthly tickets for those whom these unprecedented times have hit the hardest. From monthly 35 Euros to 28 those over the age of 65 will be saving more money.',
            author: 1,
            cover: 'peopleBus.jpg'
        },
        {
            date: '2021-05-15',
            title: 'Traffic accident on Zeleni venac',
            text: 'The city traffic company "Belgrade" announced that there was a traffic accident at the Zeleni venac station, which was caused by a bus on line 75. Minor material damage was done and no passengers were injured. As it is stated, there was a "self-starting of the bus" which was standing at the stop without passengers. On that occasion, a street lighting pole was attached, when the vehicle stopped in the middle of residential building number 12. The accident reportedly occurred. because the driver did not adequately provide the vehicle and disciplinary proceedings will be initiated against him for failure to work. Minor material damage was caused to the bus, it is stated in the announcement of GSP.',
            author: 1,
            cover: 'bus2.jpg'
        },
        {
            date: '2021-03-23',
            title: 'New bus line 3B, which runs from the Elementary School "Jovan Ducic" in Petrovaradin to Puckaros.',
            text: 'This is also a novelty in the autumn timetable, which starts valid today, September 1. <b> This line operates as follows: <br> Direction A (Petrovaradin Elementary School "Jovan Ducic" - Puckaros): Parking of the restaurant "Trag" (turnpike) - Preradoviceva - Karlovacki drum - Zanos - Tome Maretica - Breza - Pavle Ristic. <br> Bus stops in direction A: Preradovićeva (OS "Jovan Dučić"), Preradovićeva (Račkog), Petrovaradin (Railway station), Tekije (gas station) and Breza (Tome Maretića).<br> Direction B (Puckaros - Petrovaradin Elementary School "Jovan Ducic"): Pavle Ristic - Karlovacki drum - Preradoviceva - Parking of the restaurant "Trag" (turnpike). <br> Bus stops in direction B: Breza (Tome Maretića), Breza (Pavla Ristića), Tekije (Navip), Petrovaradin (Railway station), Preradovićeva (Šenoina).',
            author: 1,
            cover: 'newBusLine.jpg'
        }
    ]

    const favourites = [{
            tk_id_lines: 1,
            tk_id_users: 1
        },
        {
            tk_id_lines: 2,
            tk_id_users: 1
        },
        {
            tk_id_lines: 3,
            tk_id_users: 1
        },
        {
            tk_id_lines: 1,
            tk_id_users: 2
        }
    ]

    //FILL TABLES WITH INITAL VALUES
    await knex('users').insert(users).then(() => console.log("users inserted")).catch((err) => { console.log(err); throw err });
    await knex('buses').insert(buses).then(() => console.log("buses inserted")).catch((err) => { console.log(err); throw err });
    await knex('lines').insert(lines).then(() => console.log("lines inserted")).catch((err) => { console.log(err); throw err });
    await knex('locations').insert(locations).then(() => console.log("locations inserted")).catch((err) => { console.log(err); throw err });
    await knex('stations').insert(stations).then(() => console.log("stations inserted")).catch((err) => { console.log(err); throw err });
    await knex('drivers').insert(drivers).then(() => console.log("drivers inserted")).catch((err) => { console.log(err); throw err });
    await knex('drivers_buses').insert(drivers_buses).then(() => console.log("drivers_buses inserted")).catch((err) => { console.log(err); throw err });
    await knex('lines_stations').insert(lines_stations).then(() => console.log("lines_stations inserted")).catch((err) => { console.log(err); throw err });
    await knex('news').insert(news).then(() => console.log("news inserted")).catch((err) => { console.log(err); throw err });
    await knex('changes').insert(changes).then(() => console.log("changes inserted")).catch((err) => { console.log(err); throw err });
    await knex('driverReview').insert(drivers_Reviews).then(() => console.log("driverReview inserted")).catch((err) => { console.log(err); throw err });
    await knex('favourites').insert(favourites).then(() => console.log("favourites inserted")).catch((err) => { console.log(err); throw err });
    knex.destroy();

}

fillDatabase();