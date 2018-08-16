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
const client = new Client()
this.counter = 0;
//pool.query('DROP TABLE IF EXISTS kazoo_hub_log', (err, res) => {
  // console.log(err, res);
  // pool.end()

  //pool.query('CREATE  TABLE  kazoo_hub_log(id SERIAL PRIMARY KEY, mac VARCHAR(17),ssr INTEGER, date timestamptz,hub VARCHAR(40))', (err, res) => {
    // console.log(err, res);
    // pool.end()
   // /Users/mauro/apps/kazoo/kazoo-reports/data/semana3007/semana30al5deAgosto
      const testFolder = './data/semana3007/znok/';
   // const testFolder = './data/test/';
    const dir_out = './data/out/logs_unilver/';

    var self = this
    this.counter = 0;
    this.line = 0;

    files = fs.readdirSync(testFolder);

    files.forEach(function (file) {
         console.log(file);
   //   console.log(query);
      query = 'insert into  kazoo_hub_log (date, mac,ssr,hub) values';
      var contents = fs.readFileSync(testFolder + file, 'utf8');


    // var query_data = [][];
      contents.split('\n').forEach(function (line) {
        line=line.replace(' ', '#');
        line=line.replace(' ', '\',\'YYYY-MM-DD#HH24:MI:SS.US\'),\'');
    
        line=line.replace(' ', '\',');
        line=line.replace(' ', ',\'');
        line=line.replace(' ', ',\'');
       
        // console.log('>>>>'+line);
        line = '( to_timestamp(\''+ line.replace('\n','') + '\')\r';
        // console.log('>>>>'+line);
        line=line.replace('#', ' ');
        line=line.replace('#', ' ');
        // console.log('>>>>'+line);
       // line=line.replace(',,',',\'');
        
        query = query +' '+line+',\n';
       
      })
      query = query.replace('\,US','US');
      query = query.substring(0, query.length - 24);

      // contents = '('+contents.substring(0, contents.length - 1);
      // lines = contents.split('\n');
      // lines.forEach(line=>  { line =  '('+line+')'});

      //  contents = contents.replace(new RegExp('\n', 'g'), ')(');
      //  contents = contents.replace(new RegExp('^', 'gm'), '(');

     // console.log(query);

   //   fs.writeFile(dir_out+file+'.sql', query, 'utf8', (res)=>{console.log(res+'  '+'escrito '+file+'.sql')});

      pool.query(query,(err, res) => {
        if (err) {
          console.log('Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
          console.log(query);
          console.log(err);
        }
        if (res) {
          console.log('ok ');
          console.log(res);
        }})
      

 //pool.end();

      //       outstream = new (require('stream'))(),
      //       rl = readline.createInterface(instream, outstream);
      //     self.counter = self.counter + 1;
      //     rl.on('line', function (line) {
      //       var arr = line.split(" ");
      //       // console.log(arr);
      //       self.line++;
      //       query = 'insert into  kazoo_hub_log (id, mac,ssr, date,hub) values(' + self.line + ',\'' + arr[2] + '\',' + arr[3] + ',$1,\' ' + arr[4] + '\')';
      //       // console.log(query);
      //       pool.query(query, [new Date(arr[0] + ' ' + arr[1])], (err, res) => {
      //       if(err){
      //       console.log('Error!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
      //         console.log(err);
      //        }
      //        if(res){
      //         console.log('ok');
      //         if( self.line%1000 ==0){
      //           console.log('commit <<<');

      //          // pool.query('commit');
      //         }
      //       }



      //       });

      //     });

      //     rl.on('close', function (line) {
      //       console.log(line);
      //       console.log('done reading file.' + self.counter);

      //       self.counter--;
      //       if (self.counter == 0) {
      //         console.log('fin. lineas:'+ self.line);
      //         self.line++;
      //       //  pool.end();
      //       }
      //     });
      // });


    })
 //})  })



// pool.connect((err, client, done) => {




// async function dummy(){
// // you can also use async/await
// const res = await pool.query('SELECT NOW()')
// await pool.end()
// console.log(res)
// }

//dummy();




// // clients will also use environment variables
// // for connection information
// const client = new Client()
// await client.connect()

// const res = await client.query('SELECT NOW()')
// await client.end()