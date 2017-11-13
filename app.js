let express = require('express');
let helmet = require('helmet');
let app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
app.use(helmet());
require('./routes.js')(app);


app.listen(3000, () => { console.log("Server start - localhost:3000"); });