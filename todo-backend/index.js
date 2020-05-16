const Joi = require('joi');
const helmet=require('helmet');
const morgan=require('morgan');
const express = require('express');
const fs=require('fs');
const app = express();


app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
       next();
 });
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//API's
app.get('/api/lists',(req,res) => 
{
   let sql = "SELECT * FROM todo.todo_list";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(result);
        });
      
})

app.get('/api/tasks/:list_id', (req, res) => {
    let id=req.params.list_id;
    let sql = `SELECT * FROM todo.todo WHERE list_id=${id}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(result);
        });
});

app.post('/api/list', (req, res) => {
    let title=req.body.title;
    let sql = `INSERT INTO todo.todo_list(title) VALUES('${title}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/api/task/:list_id', (req, res) => {
    console.log("murali");
    let title=req.body.title; 
    let id=req.params.list_id;
    let sql = `INSERT INTO todo.todo(title,list_id) VALUES('${title}',${id})`; 
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.post('/api/lable',(req,res) => {
    let sql=`INSERT INTO todo.lables(lable_name,lable_color) VALUES('${req.body.name}','${req.body.color}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
})
app.get('/api/lables',(req,res) => {
    console.log("in post lable");
    let sql='SELECT * FROM todo.lables';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result);
      });
})

app.delete('/api/tasks/:todo_id', (req, res) => {
    let id=req.params.todo_id;
    let sql = `DELETE FROM todo.todo WHERE todo.todo_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.delete('/api/lists/:list_id', (req, res) => {
    let id=req.params.list_id;
    let sql = `DELETE FROM todo.todo_list WHERE todo_list.list_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.put('/api/task/:todo_id',(req,res)=>{
    console.log("in edit");
    let id=req.params.todo_id;
    let taskText= req.body.todo_text;
    console.log(id+" :"+taskText)
    let sql = `UPDATE todo.todo SET todo.title='${taskText}' WHERE todo.todo_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
  });


//Functions
//Function to read Data from file
function readDataFromFile()
{
    const data=fs.readFileSync(__dirname+"/data.json","utf8");
    return JSON.parse(data);
}
// Function to write data to the file
function writeDataToFile(jsonData)
{
    const data=JSON.stringify(jsonData,null,2);
    fs.writeFile('./data.json', data, function(err) {
        if(err) {
            return console.log(err);
        }
    });
}
// function to validate the task
function validateTask(task) {
    const schema = {
        title: Joi.string().min(3).required()
    };
    return Joi.validate(task, schema);
}

//const port = process.env.port || 3000;
const port = 3000;
app.listen(port, () => {
    console.log(`Listening on port ${port}!!!`)
});


