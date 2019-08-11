const express = require('express');
const pg = require('pg');
const conString = "postgres://postgres:Admin@123@localhost:5432/postgres";
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
  client.query('SELECT * from "PCApp".user_account', function(err, result) {
    if(err) {
      return console.error('error running query', err);
    }
    data.push(result.rows);
    // client.end();
  });
});
const port = process.env.PORT || 3000;
router.route('/getuserdetails')
  .get((req, res) => {
    res.json(data);
  })
router.route('/postuserdetails')
  .post((req, res) => {
    const postdata = {id: req.body.id, user_type_name: req.body.user_type_name};
    const pdata = [postdata.id, postdata.user_type_name];
    const sql = 'INSERT INTO "PCApp".user_type (id, user_type_name) VALUES ($1, $2)';
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