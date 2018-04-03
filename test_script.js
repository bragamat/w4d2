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

  client.query(`SELECT id, first_name, birthdate
                FROM famous_people 
                WHERE first_name LIKE '%${argument}%' OR last_name lIKE '%${argument}%'`, (err, result) =>{
                  let count = [];
                  // let birthdate
                  count.push(result.rows.length);

    if (err) {
      return console.error("error running query", err);
    }
    console.log(`Found ${count} person(s) by the name '${argument}'  `);
    // console.log(result.rows); // Printing the rows
    console.log(result.rows); // Printing the value
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