let express = require('express');
// import body parser
let bodyParser = require('body-parser');


const app = express();
// use body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// import routes
require('./routes')(app);


let port = 8081;

app.listen(port, function(){
    console.log('Server running on http://localhost:' + port)
});