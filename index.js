var express = require('express');
var app = express();
var bodyParser = require("body-parser");
const path = require('path');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ encoded: false }))

var tasks = ["create to do list", "add items"]

app.get('/', function (req, res) {
    res.render('index', { tasks: tasks || [] });
})

app.post('/add', function (req, res) {
    tasks.push(req.body.newTask)
    res.redirect('/');
})

app.post('/done', function (req, res) {
    if (typeof req.body.task !== 'string') {
        tasks = tasks.filter(item => item !== req.body.task)
    } else if (Array.isArray(req.body.task)) {
        tasks = tasks.filter(item => req.body.task.indexOf(item) === -1)
    } else {
        console.warn(`Data type is not correct receieved type ${typeof req.body.task}. Please check input args: `, req.body.task)
    }
    res.redirect('/');
})

app.listen(3000, function () {
    console.log('Our app is running on port 3000');
})
