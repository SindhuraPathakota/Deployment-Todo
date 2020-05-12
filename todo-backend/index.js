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

//API's
app.get('/api/tasks', (req, res) => {
res.send(readDataFromFile());
});

app.get('/api/tasks/:id', (req, res) => {
    let task = readDataFromFile().find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given id was not found');
    res.send(task);
});

app.post('/api/tasks', (req, res) => {
    const {error} = validateTask(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    let tasks=readDataFromFile();
    let task_id=0;
    tasks.forEach(task => {
        task_id=task.id;
    });
    const task =
     {
        id: task_id+1, 
        title: req.body.title
         };
    tasks.push(task);
    writeDataToFile(tasks);
    res.send(task);
})

app.put('/api/tasks/:id', (req, res) => {
    let title = {
        title : `${req.body.title}`
    };
    let tasks=readDataFromFile();
    let task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given id was not found');
    const {error} = validateTask(title);
    if (error) return res.status(400).send(error.details[0].message);
    task.title = req.body.title;
    writeDataToFile(tasks);
    res.send(task);
});

app.delete('/api/tasks/:id', (req, res) => {
    let tasks=readDataFromFile();
    let task = tasks.find(c => c.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('The task with the given id was not found');
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
    writeDataToFile(tasks);
    res.send(task);
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


