let express = require('express');
let bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/status', function(req, res){
    console.log('------------------------------');
    console.log(req);
    console.log('------------------------------');
    res.send('Hello nodejs server');
})

app.get('/hello/:person', function (req,res) {
    console.log('hello - ' + req.params.person);
    res.send('sey hello with ' + req.params.person);
})

app.get('/user/:userId', function(req, res){
    res.send('ดูข้อมูล user คนที่ ' + req.params.userId);
})

app.get('/users', function(req, res){
    res.send('ดูข้อมูล user ทุกคน');
})

app.post('/user/', function(req, res){
    res.send("สร้าง user "+ JSON.stringify(req.body.username));
})





let port = 8081

app.listen(port, function(){
    console.log('Server running on http://localhost:' + port)
});