const pg = require('pg')
require('dotenv').config()
// pg.types.setTypeParser(1114, str => str);
const fs = require('fs');
// pools will use environment variables
// for connection information
var format = require('pg-format');

// console.log(process.env);
//2018-06-28 15:35:26.402075 d0:c5:f3:d1:a9:ea -77 HUB_MANOS_PTASHOPP

pg.types.setTypeParser(1082, 'text', function (val) {
  console.log('->'+val);
  return new Date(val);
});
const { Pool, Client } = require('pg')
const pool = new Pool()
this.counter = 0;
pool.query('DROP TABLE IF EXISTS kazoo_hub_log', (err, res) => {
  // console.log(err, res);
  // pool.end()

  pool.query('CREATE  TABLE  kazoo_hub_log(id SERIAL PRIMARY KEY, mac VARCHAR(17),ssr INTEGER, date timestamptz,hub VARCHAR(40))', (err, res) => {
    // console.log(err, res);
    // pool.end()
    //  const testFolder = './data/logs_unilever';
    const testFolder = './data/test/';
    const dir_out = './data/out/logs_unilver/';

    var self = this
    this.counter = 0;
    this.line = 0;

    files = fs.readdirSync(dir_out);

    files.forEach(function (file) {
         console.log(file);
   //   console.log(query);
   
      var contents = fs.readFileSync(dir_out + file, 'utf8');

   
      pool.query(contents, function(err, result){
            console.log('ok');
              if(err){
                  console.log('error: ', err);
                  process.exit(1);
              }
              process.exit(0);
          });
      });
      pool.end();
    });
  });