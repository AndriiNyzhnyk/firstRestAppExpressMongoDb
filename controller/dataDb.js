const DataDb = require('../models/dataDb');

exports.users = (req, res) => {
    DataDb.users((db, err, users) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(users);
        db.close();
    });
};

exports.getUserId = (req, res) => {
    DataDb.getUserId(req, (db, err, user) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(user);
        db.close();
    });
};

exports.postAddUser = (req, res) => {
    DataDb.postAddUser(req, (db, user, err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(user);
        db.close();
    })
};

exports.deleteUser = (req, res) => {
    DataDb.deleteUser(req, (db, err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send(result.value);
        db.close();
    });
};

exports.putUser = (req, res) => {
    DataDb.putUser(req, (db, err, result) => {
        if(err) {
            console.error(err);
            return res.status(400).send();
        }

        res.send( result.value);
        db.close();
    })
};