let express = require("express");
let bodyParser = require("body-parser");
let  mongoClient = require("mongodb").MongoClient;
let  objectId = require("mongodb").ObjectID;

let  app = express();
let  jsonParser = bodyParser.json();
let  url = "mongodb://localhost:27017/usersdb";

app.use(express.static(__dirname + "/public"));

// отримання списку даних
app.get("/api/users", (req, res) => {
    mongoClient.connect(url, (err, db) => {
        db.collection("users").find({}).toArray(function(err, users){
            res.send(users);
            db.close();
        });
    });
});

// отримання одного користувача по id
app.get("/api/users/:id", (req, res) => {
    let id = new objectId(req.params.id);
    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOne({_id: id}, (err, user) => {
            if(err) return res.status(400).send();

            res.send(user);
            db.close();
        });
    });
});

// отримання надісланих даних
app.post("/api/users", jsonParser, (req, res) => {
    if(!req.body || isEmptyObj(req.body) ) {
        return res.sendStatus(400);
    }

    let userName = req.body.name;
    let surname = req.body.surname;
    let userAge = req.body.age;
    let user = {name: userName, surname: surname, age: userAge};

    mongoClient.connect(url, (err, db) => {
        db.collection("users").insertOne(user, (err, result) => {
            if(err) return res.status(400).send();

            res.send(user);
            db.close();
        });
    });
});

// видаляємо користувача по id
app.delete("/api/users/:id", (req, res) => {
    let id = new objectId(req.params.id);

    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOneAndDelete({_id: id}, (err, result) => {
            if(err) return res.status(400).send();

            let user = result.value;
            res.send(user);
            db.close();
        });
    });
});

// змінення даних користувача
app.put("/api/users", jsonParser, (req, res) => {
    if(!req.body || isEmptyObj(req.body) ) {
        return res.sendStatus(400);
    }

    let id = new objectId(req.body.id);
    let userName = req.body.name;
    let surname = req.body.surname;
    let userAge = req.body.age;

    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOneAndUpdate({_id: id}, { $set: {age: userAge, name: userName, surname: surname}},
            {returnOriginal: false },(err, result) => {
                if(err) return res.status(400).send();

                let user = result.value;
                res.send(user);
                db.close();
            });
    });
});

// function verify obj 
function isEmptyObj(obj) {
    for(let key in obj) {
        return false;
    }
    return true;
}

app.listen(3000, function(){ console.log("Server start - localhost:3000"); });