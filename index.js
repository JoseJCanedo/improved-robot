var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const path = require('path');
const mongoose = require('mongoose');
const todoModel = require('./models/todo.model');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }))

function formatRequest(reqTasks){
    if (typeof reqTasks === 'string') {
        return [reqTasks]
    } else if (Array.isArray(reqTasks)) {
        return reqTasks
    } else {
        console.warn(`Data type is not correct receieved type ${typeof req.body.task}. Please check input args: `, req.body.task)
    }
}

app.get('/', async function (req, res) {
    const tasks = await todoModel.find({deleted: {$in: [false, null]}, done: false})
    res.render('index', { todoList: tasks });
})

app.get('/done', async function (req, res) {
    const tasks = await todoModel.find({deleted: {$in: [false, null]}, done: true})
    res.render('deleted', { doneList: tasks });
})

app.post('/add', function (req, res) {
    const todo = new todoModel({
        taskName: req.body.newTask,
        done: false
    })
    todo.save();
    res.redirect('/');
})

app.post('/done', async function (req, res) {
    let taskIds = formatRequest(req.body.task)
    await todoModel.find({'_id': {$in: taskIds}}).updateMany({done: true});
    res.redirect('/');
})

app.post('/delete', async function (req, res) {
    let taskIds = formatRequest(req.body.task)
    await todoModel.find({'_id': {$in: taskIds}}).updateMany({deleted: true});
    res.redirect('/done');
})

const uri = "mongodb+srv://canedojose:nZhl1GEJTkU67r9e@cluster0.pkjkr6n.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(
    uri,
    { serverApi: { version: '1', strict: true, deprecationErrors: true } }
).then((result) => {
    console.log('Connected to Mongo DB');
    app.listen(3000, function () {
        console.log('Our app is running on port 3000');
    })
}).catch((err) => {
    console.log(err)
})









