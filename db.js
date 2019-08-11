const pg = require('pg');
const conString = "postgres://postgres:Bhagath*999@localhost:5432/postgres";
const client = new pg.Client(conString);
client.connect(function(err) {
    if(err) {
      return console.error('could not connect to postgres', err);
    }
});

function addEmp(user) {
console.log(user);
 const sql = 'INSERT INTO employes (id, name, age) VALUES ('+user.id+','+user.name+','+user.age+')';
  client.query(sql, function(err, result) {
   if(err) {
      return console.error('error running query', err);
    } else {
        console.log(result);
    }
  });
}
// function updateEmp(user) {
//     console.log(user);
//     const sql = 'UPDATE employes set ('user.id'=1 ,'+user.name=raju+', '+user.age=21') where user.id = 1';
//     client.query(sql, pdata, function(err, result) {
//         if(err) {
//             return console.error('error running query', err);
//         }
//         else {
//             console.log(result);
//         }
//      }
//     });
// }
// function deleteEmp(id) {
//     console.log(id);
//     const sql = 'DELETE from employes where id = 1';
//     client.query(sql, pdata, function(err, result) {
//         if(err) {
//             return console.err('error running query', err);
//         }
//         else {
//             console.log(result);
//         }
//         }
//     });
// }
// function listEmp() {
//     console.log();
//     const sql = 'SELECT * from employes';
//     client.query(sql, pdata, function(err, result) {
//         if(err) {
//             return console.err('error running query', err);
//         }
//         else {
//             console.log(result);
//         }
//         }
//     });
// }
//module.exports = addEmp;
module.exports = {add: addEmp};
// update: updateEmp, delete: deleteEmp, list:listEmp