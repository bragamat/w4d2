
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

let firstName = process.argv[2];
let lastName = process.argv[3];
let birthdate = process.argv[4];


  knex('famous_people').insert({
    'first_name':firstName, 
    'last_name': lastName, 
    'birthdate': birthdate
  })
   .finally(()=> {
      knex.destroy();
    });
    


