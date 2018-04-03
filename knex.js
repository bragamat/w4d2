
const settings = require("./settings");
const knex = require("knex")({
  client: 'pg',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

let argument = process.argv.slice(2);

knex.select('*').from('famous_people')
.asCallback(function(err, rows) {
  if (err){
   return console.error(err);
  }
  knex.select('*').from('famous_people').where('first_name', 'LIKE', `%${argument}`)
    .orWhere('last_name', 'LIKE', `${argument}%`)
    .asCallback(function(err, rows) {
      if (err){
       return console.error(err);
      }
      let count2 = 1; //Counter for how many rows there are in the db;
      let count = [];
      count.push(rows.length);
        console.log(`Found ${count} person(s) by the name '${argument}'  `);
                  rows.forEach(elem =>{ // Looping through the results Array.
                    let id = elem.id; // Getting the Id of each elem
                    let firstName = elem.first_name;// Getting the first_name of each elem
                    let lastName = elem.last_name;// Getting the last_name of each elem
                    let birthdate = elem.birthdate.toLocaleDateString();//Getting the birthdate without the time
                      console.log(`- ${count2}: ${firstName} ${lastName}, born ${birthdate}`); //Printing the informations
                      count2++; //Adding one to the counter
                  });
      knex.destroy();
  });
});







// --------> FIRST EXERCISE V

// knex.connect((err) =>{
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   console.log("Searching ...");

// client.query(`SELECT id, first_name, last_name, birthdate
//               FROM famous_people 
//               WHERE first_name LIKE '%${argument}%' OR last_name lIKE '%${argument}%'`, (err, result) =>{
      
//       let count = [];
//       count.push(result.rows.length);

//         console.log(`Found ${count} person(s) by the name '${argument}'  `);
//                 let count2 = 1; //Counter for how many rows there are in the db;
//                   result.rows.forEach(row =>{ // Looping through the results Array.
//                     let id = row.id; // Getting the Id of each row
//                     let firstName = row.first_name;// Getting the first_name of each row
//                     let lastName = row.last_name;// Getting the last_name of each row
//                     let birthdate = row.birthdate.toLocaleDateString();//Getting the birthdate without the time
//                       console.log(`- ${count2}: ${firstName} ${lastName}, born ${birthdate}`); //Printing the informations
//                         count2++; //Adding one to the counter
//                   });
//     if (err) {
//       return console.error("error running query", err);
//     }
//     // // console.log(result.rows); // Printing the rows
//     // console.log(result.rows); // Printing the value
//     client.end();
//   });
// });
