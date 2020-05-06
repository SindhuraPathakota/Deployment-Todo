const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors())
const port = process.env.PORT || 3030;
/*
var con = mysql.createConnection({
    host: 'localhost',
    user: 'bhusojii_lucifer',
    password: 'zxc123',
    database: 'bhusojii_todoapp'
})
*/
var con = mysql.createConnection({
    host: process.env.CONFIG_MYSQL_HOST || 'localhost',
    user: process.env.CONFIG_MYSQL_USER || 'root',
    password: process.env.CONFIG_MYSQL_PASSWORD || '',
    database: process.env.CONFIG_MYSQL_DATABASE || 'todoapp'
  })

con.connect(err => {
    if(err){
        return err;
    }
});

app.get('/Test', (req,res)=>{
    res.send("Hello");
});


app.get('/GetTodos', (req, res) => {
    console.log('/GetTodos');
    const { title } = req.query;
    const query = `select * from todos where Title=${title}`;
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.json({
            data: result
        });
      });
});

app.get('/GetTitles', (req, res) => {
    console.log('/GetTitles');
    const query = "select DISTINCT  Title from todos";
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.json({
            data: result
        });
      });
});

app.get('/DeleteTodo', (req, res) => {
    console.log('/DeleteTodo');
    const { id } = req.query;
    const query = `delete from todos where ID=${id}`;
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.json({
            data: result
        });
      });
});

app.get('/MarkTodoCompleted', (req, res) => {
    console.log('/MarkTodoCompleted');
    const { id,IsCompleted } = req.query;
    const query = `update todos set IsCompleted=${IsCompleted} where ID=${id}`;
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.json({
            data: result
        });
      });
});

app.get('/DeleteTitle', (req, res) => {
    console.log('/DeleteTitle');
    const { title } = req.query;
    const query = `delete from todos where Title=${title}`;
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.json({
            data: result
        });
      });
});

app.post('/AddTodo', (req, res) => {
    console.log('/AddTodo');
    const { todo,title } = req.query;
    const query = `insert into todos (Value,Title) values (${todo},${title})`;
    con.query(query, function (err, result) {
        if (err) return res.send(err);
        else return res.send("todo added!");
      });
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

