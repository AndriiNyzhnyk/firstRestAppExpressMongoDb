let express = require('express');
let app = express();

app.set('view engine', 'hbs');
app.use(express.static(__dirname + "/public"));
require('./routes.js')(app);


app.listen(3000, () => { console.log("Server start - localhost:3000"); });