const express = require('express');
const pg = require('pg');
const conString = "postgres://postgres:Bhagath*999@localhost:5432/postgres";
const app = express();
const router = express.Router();
const bodyparser = require('body-parser');
app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
const client = new pg.Client(conString);
const data = [];
client.connect(function(err) {
  if(err) {
    return console.error('could not connect to postgres', err);
  }
  client.query('SELECT * from employes', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    data.push(result.rows);
    // client.end();
  });
});
const port = process.env.PORT || 4200;
router.route('/getuserdetails')
  .get((req, res) => {
      //
      client.query('SELECT * from employes', function(err, result) {
          console.log(result);
        if(err) {
          return console.error('error running query', err);
        }
        res.json(result.rows);
        //data.push(result.rows);
        // client.end();
      });
    
  })
router.route('/postuserdetails')
  .post((req, res) => {
    const postdata = {id: req.body.id, name: req.body.name, age:req.body.age};
    const pdata = [postdata.id, postdata.name, postdata.age];
    const sql = 'INSERT INTO employes (id, name, age) VALUES ($1, $2, $3)';
  client.query(sql, pdata, function(err, result) {
    if(err) {
      return console.error('error running query', err);
    } else {
    console.log(postdata);
}
  });
    res.json('Successfully Inserted');
  })

  app.use('/pcapp', router);
app.get('/', (req, res) => {
  res.send('welcome to my Nodemon API');
});
app.listen(port, () => {
  console.log(`Running on port:  ${port}`);
});