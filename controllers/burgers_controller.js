// require model
var db = require('../models');
var Burger = db.Burger;

// export the routes
module.exports = function(app) {
    // get the root route
    app.get('/', function(request, response) {
        var object = {};
        Burger.findAll({
            where: {
                devoured: false
            }
        }).then(function(result) {
            object.uneatenBurgers = result;
            return;
        }).then(function() {
          return Burger.findAll({
              where: {
                  devoured: true
              }
          });
        }).then(function(result) {
            object.eatenBurgers = result;
            return;
        }).then(function() {
            response.render('index', {
                uneatenBurgers: object.uneatenBurgers,
                eatenBurgers: object.eatenBurgers
            }); 
        });
    });

    // define the get api/burgers route - for all burger data
    app.get('/api/burgers', function(request, response) {
        Burger.findAll({}).then(function(result) {
            response.json(result);
        });
    });

    // define post for creating a burger
    app.post('/', function(request, response) {
        var newBurger = request.body.burger;
        // if no burger is defined just return
        if (newBurger === '') {
            response.redirect('/');
            return;
        }
        // create that burger
        Burger.create({
            burger_name: newBurger
        }).then(function() {
            response.redirect('/');
        });
    });

    // define the get api/burgers/:id route - for single burger data
    app.get('/api/burgers/:id', function(request, response) {
        Burger.findOne({
            where: {
                id: request.params.id
            }
        }).then(function(data) {
            response.json(data);
        });
    });

    // define put for updating a burger
    app.put('/:id', function(request, response) {
        Burger.update({
            devoured: true
        }, {
            where: {
                id: request.params.id
            }
        }).then(function() {
            response.redirect('/');
        });
    });
};