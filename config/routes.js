const homeController = require('../controllers/HomeController');
const cubesController = require('../controllers/CubesController');
const searchController = require('../controllers/SearchController');
const path = require('path');

module.exports = (app) => {

    // GET methods
    app.get('/', homeController.HomePage);
    app.get('/create', cubesController.GetInsertCube);
    app.get('/about', homeController.AboutPage);
    app.get('/details/:id', cubesController.CubeDetails);

    // POST methods
    app.post('/create', cubesController.InsertCube);
    app.post('/search', searchController.SearchCube);

    app.use(function (req, res, next) {
        res.render(path.resolve(__basedir, 'views/404.hbs'));
    });
};