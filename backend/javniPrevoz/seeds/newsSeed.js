
exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('News').del()
    .then(function () {
      // Inserts seed entries
      return knex('News').insert([
        { 
          id: 1, 
          Date: '2021-02-26', 
          Title: 'Change of route for Line 58, 88 and 512', 
          Text: 'Due to the bursting of the water pipe in Vodovodska Street, at house number 12, the street is completely closed to traffic and public transport, which is why vehicles from the public transport lines: 58, 88 and 512 are moving on changed routes across Milorada Jovanović Street. The works should last until  the end of the day, by 20:00.',
          Cover: 'bg6.jpg'
        },
        { 
          id: 2, 
          Date: '2020-11-18', 
          Title: 'Night lines (N) in Belgrade are temporarily canceled', 
          Text: 'Temporary suspension of lines in night (N) passenger transport from tomorrow evening, ie from the night between November 18 and 19. <br> The decision was made in accordance with the order of the City Headquarters for Emergency Situations (due to the worsened epidemiological situation caused by the Covid-19 virus) in the territory of the City of Belgrade. and classic games of chance and other facilities are prohibited from 9 pm to 5 am. <br> The temporary suspension of work will be performed on 24 night lines, which operated from 00 to 4 hours, and these are the following lines: <br> 15N Republic Square - Zemun / Novi grad / <br> 26N Dorcol - Brace Jerkovic <br> 27N Trg Republike - Mirijevo 3 <br> 29N Studentski trg - Medaković 3 <br> 31N Studentski trg - Konjarnik <br> 32N Republic Square - Višnjica <br> 33N Studentski trg - Kumodraž <br> 37N Republic Square - Kneževac <br> 47N Trg Republike - Resnik ŽS <br> After the abolition of the adopted measures, transportation on night lines will be re-established.',
          Cover: 'nightBus.jpg'
        }, 
        { 
          id: 3, 
          Date: '2020-12-01', 
          Title: 'New Covid measures for safe travel', 
          Text: 'GSP "Novi Sad" will organize the transportation so that the occupancy of the parking place does not exceed 50 percent. Passengers, with the obligatory use of protective masks, are obliged to provide a distance of at least 2 meters from the entrance / exit of the vehicle while waiting to enter the bus. Also, GSP is obliged to determine the timetable with an increased number of departures in rush hour, as well as a reduced number of departures outside rush hour.',
          Cover: 'bus1.jpg'
        },
        { 
          id: 4, 
          Date: '2021-01-15', 
          Title: 'Monthly public transportation tickets for elderly and in retirement will now be 15% cheaper', 
          Text: 'At the begining of the new year the goverment and the sector of public transportation have made new changes after the effects of Covid wore off. These include higher hygiene standards for all buses and the lowering of prices for monthly tickets for those whom these unprecedented times have hit the hardest. From monthly 35 Euros to 28 those over the age of 65 will be saving more money.',
          Cover: 'peopleBus.jpg'
        },
        { 
          id: 5, 
          Date: '2021-05-15', 
          Title: 'Traffic accident on Zeleni venac', 
          Text: 'The city traffic company "Belgrade" announced that there was a traffic accident at the Zeleni venac station, which was caused by a bus on line 75. Minor material damage was done and no passengers were injured. As it is stated, there was a "self-starting of the bus" which was standing at the stop without passengers. On that occasion, a street lighting pole was attached, when the vehicle stopped in the middle of residential building number 12. The accident reportedly occurred. because the driver did not adequately provide the vehicle and disciplinary proceedings will be initiated against him for failure to work. Minor material damage was caused to the bus, it is stated in the announcement of GSP.',
          Cover: 'bus2.jpg'
        },
        { 
          id: 6, 
          Date: '2021-03-23', 
          Title: 'New bus line 3B, which runs from the Elementary School "Jovan Ducic" in Petrovaradin to Puckaros.', 
          Text: 'This is also a novelty in the autumn timetable, which starts valid today, September 1. <b> This line operates as follows: <br> Direction A (Petrovaradin Elementary School "Jovan Ducic" - Puckaros): Parking of the restaurant "Trag" (turnpike) - Preradoviceva - Karlovacki drum - Zanos - Tome Maretica - Breza - Pavle Ristic. <br> Bus stops in direction A: Preradovićeva (OS "Jovan Dučić"), Preradovićeva (Račkog), Petrovaradin (Railway station), Tekije (gas station) and Breza (Tome Maretića).<br> Direction B (Puckaros - Petrovaradin Elementary School "Jovan Ducic"): Pavle Ristic - Karlovacki drum - Preradoviceva - Parking of the restaurant "Trag" (turnpike). <br> Bus stops in direction B: Breza (Tome Maretića), Breza (Pavla Ristića), Tekije (Navip), Petrovaradin (Railway station), Preradovićeva (Šenoina).',
          Cover: 'newBusLine.jpg'
        }
      ]);
    });
};
