let  mongoClient = require('mongodb').MongoClient;
let  objectId = require('mongodb').ObjectID;
let  url = 'mongodb://localhost:27017/usersdb';
let func = require('../functions');

exports.users = (cb) => {
    mongoClient.connect(url, (err, db) => {
        db.collection("users").find({}).toArray((err, users) => {
            cb(err, users, db);
        });
    });
};

exports.getUserId = (req, cb) => {
    let id = new objectId(req.params.id);
    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOne({_id: id}, (err, user) => {
            cb(err, user, db);
        });
    });
};

exports.postAddUser = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    let userName = req.body.name;
    let surname = req.body.surname;
    let userAge = req.body.age;
    let user = {name: userName, surname: surname, age: userAge};

    mongoClient.connect(url, (err, db) => {
        db.collection("users").insertOne(user, (err, result) => {
            cb(err, result, db, user);
        });
    });
};

exports.deleteUser = (req, cb) => {
    let id = new objectId(req.params.id);

    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOneAndDelete({_id: id}, (err, result) => {
            cb(err, result, db);
        });
    });
};

exports.putUser = (req, cb) => {
    if (!req.body || func.isEmptyObj(req.body)) {
        return cb("empty field form");
    }

    let id = new objectId(req.body.id);
    let userName = req.body.name;
    let surname = req.body.surname;
    let userAge = req.body.age;

    mongoClient.connect(url, (err, db) => {
        db.collection("users").findOneAndUpdate({_id: id},
            {$set: {age: userAge, name: userName, surname: surname}},
            {returnOriginal: false}, (err, result) => {
                cb(err, result, db);
            });
    });
};


