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
  
 
  host: 'db',
  user: "root",
  password: "root"

 /*
   host: "localhost",
  user: "root",
  password: "" 
 */
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});


//API's
app.get('/api/lists',(req,res) => 
{
   let sql = "SELECT * FROM my_database.todo_list";
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(result);
        });
      
})

app.get('/api/tasks/:list_id', (req, res) => {
    let id=req.params.list_id;
    let sql = `SELECT * FROM my_database.todo WHERE list_id=${id}`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          res.send(result);
        });
});

app.post('/api/list', (req, res) => {
    let title=req.body.title;
    let sql = `INSERT INTO my_database.todo_list(title) VALUES('${title}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
})

app.post('/api/task/:list_id', (req, res) => {
    let title=req.body.title; 
    let id=req.params.list_id;
    let sql = `INSERT INTO my_database.todo(title,list_id) VALUES('${title}',${id})`; 
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.post('/api/lable',(req,res) => {
    let sql=`INSERT INTO my_database.lables(lable_name,lable_color) VALUES('${req.body.name}','${req.body.color}')`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
})
app.get('/api/lables',(req,res) => {
    console.log("in post lable");
    let sql='SELECT * FROM my_database.lables';
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result)
        res.send(result);
      });
})
app.delete('/api/label/:lable_id', (req, res) => {
  let labelId=req.params.lable_id;
  let sql = `DELETE FROM my_database.lables WHERE lables.lable_id=${labelId}`;
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.delete('/api/tasks/:todo_id', (req, res) => {
    let id=req.params.todo_id;
    let sql = `DELETE FROM my_database.todo WHERE todo.todo_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.delete('/api/lists/:list_id', (req, res) => {
    let id=req.params.list_id;
    let dependenceRecordsRmvSql=`DELETE FROM my_database.todo WHERE todo.list_id=${id}`;
    con.query(dependenceRecordsRmvSql,function (err,result){
      if (err) throw err;
    });
    let sql = `DELETE FROM my_database.todo_list WHERE todo_list.list_id=${id}`;
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});

app.put('/api/task/addpoints/:task_id',(req,res)=>{

  let taskId=req.params.task_id;
  let taskPoints= req.body.task_points;

  let sql = `UPDATE my_database.todo SET todo.task_points='${taskPoints}' WHERE todo.todo_id=${taskId}`;
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.put('/api/task/taskdone/:task_id',(req,res)=>{
console.log('task DOne');
  let taskId=req.params.task_id;
  let sql = `UPDATE my_database.todo SET todo.task_done=1 WHERE todo.todo_id=${taskId}`;
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.get('/api/allTasks', (req, res) => {
  let sql = 'SELECT DISTINCT lable_id FROM my_database.todo WHERE lable_id != ""';
      con.query(sql, function (err, result) {
        if (err) throw err;
        res.send(result);
      });
});
app.put('/api/task/addlabel/:task_id',(req,res)=>{
  
  let taskId=req.params.task_id;
  let labelId= req.body.label_id;
  console.log(labelId);
  let sql = `UPDATE my_database.todo SET todo.lable_id='${labelId}' WHERE todo.todo_id=${taskId}`;
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});
app.put('/api/label/:lable_id',(req,res)=>{

  let labelId=req.params.lable_id;
  let labelText= req.body.label_text;
console.log(labelText);
  let sql = `UPDATE my_database.lables SET lables.lable_name='${labelText}' WHERE lables.lable_id=${labelId}`;
  con.query(sql, function (err, result) {
      if (err) throw err;
      res.send(result);
    });
});

app.put('/api/task/:todo_id',(req,res)=>{
    let id=req.params.todo_id;
    let taskText= req.body.todo_text;
    let sql = `UPDATE my_database.todo SET todo.title='${taskText}' WHERE todo.todo_id=${id}`;
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
const port = 3030;
app.listen(port, () => {
    console.log(`Listening on port ${port}!!!`)
});


