const DataDb = require('../models/dataDb');

exports.users = (req, res) => {
    DataDb.users((err, users, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(users);
        db.close();
    });
};

exports.getUserId = (req, res) => {
    DataDb.getUserId(req, (err, user, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(user);
        db.close();
    });
};

exports.postAddUser = (req, res) => {
    DataDb.postAddUser(req, (err, result, db, user) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(user);
        db.close();
    })
};

exports.deleteUser = (req, res) => {
    DataDb.deleteUser(req, (err, result, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(result.value);
        db.close();
    });
};

exports.putUser = (req, res) => {
    DataDb.putUser(req, (err, result, db) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send( result.value);
        db.close();
    })
};