let dataDbControllers = require('./controller/dataDb');
let bodyParser = require('body-parser');
let  jsonParser = bodyParser.json();

module.exports = (app) => {

    app.get("/", (req, res) => {
        res.render("index.hbs");
    });

// отримання списку даних
    app.get("/api/users", dataDbControllers.users);

// отримання одного користувача по id
    app.get("/api/users/:id", dataDbControllers.getUserId);

// додавання користувача в базу
    app.post("/api/users", jsonParser, dataDbControllers.postAddUser);

// видаляємо користувача по id
    app.delete("/api/users/:id", dataDbControllers.deleteUser);

// змінення даних користувача
    app.put("/api/users", jsonParser, dataDbControllers.putUser);

    // Обробник 404 помилки
    app.use((req, res, next) => {
        res.status(404);
        res.render('404.hbs')
    });

    // Обробник 500 помилки
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500);
        res.render('500.hbs');
    });
};