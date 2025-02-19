var express = require('express');
var app = express();

app.get('/', function(req, res){
    res.send({"key": "value"});
})

app.listen(3000, function(){
    console.log('Our app is running on port 3000');
})