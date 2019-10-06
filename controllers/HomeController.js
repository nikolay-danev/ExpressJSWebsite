const path = require('path');
const cubesModel = require('../models/cube');

exports.HomePage = function (req, res, next) {
    cubesModel.find().then(cubes => {
        res.render(path.join(__basedir, "views/index.hbs"), { cubes });
    }).catch(next);
};

exports.AboutPage = function (req, res) {
    res.render(path.join(__basedir, "views/about.hbs"));
};