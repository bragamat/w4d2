const PG = require("pg");
const settings = require("./settings");
let argument = process.argv.slice(2);

const client = new PG.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
});

client.connect((err) =>{
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");

client.query(`SELECT id, first_name, last_name, birthdate
              FROM famous_people 
              WHERE first_name LIKE '%${argument}%' OR last_name lIKE '%${argument}%'`, (err, result) =>{
      
      let count = [];
      count.push(result.rows.length);

        console.log(`Found ${count} person(s) by the name '${argument}'  `);
                let count2 = 1; //Counter for how many rows there are in the db;
                  result.rows.forEach(row =>{ // Looping through the results Array.
                    let id = row.id; // Getting the Id of each row
                    let firstName = row.first_name;// Getting the first_name of each row
                    let lastName = row.last_name;// Getting the last_name of each row
                    let birthdate = row.birthdate.toLocaleDateString();//Getting the birthdate without the time
                      console.log(`- ${count2}: ${firstName} ${lastName}, born ${birthdate}`); //Printing the informations
                        count2++; //Adding one to the counter
                  });
    if (err) {
      return console.error("error running query", err);
    }
    // // console.log(result.rows); // Printing the rows
    // console.log(result.rows); // Printing the value
    client.end();
  });
});




// client.connect((err) =>{
//   if (err) {
//     return console.error("Connection Error", err);
//   }
//   client.query("Select $1::int AS number", ["1"], (err, result) =>{
//     if (err) {
//       return console.error("error running query", err);
//     }
//     // console.log(result.rows); // Printing the rows
//     console.log(result.rows[0].number); // Printing the value
//     client.end();
//   });
// });