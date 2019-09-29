const path = require('path');
const fs = require('fs');

exports.HomePage = function (req, res) {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__basedir, 'config/database.json'), (err, data) => {
            if (err) {
                reject(err);
                return;
            }

            let cubes = JSON.parse(data).entities;
            resolve(cubes);
            res.render(path.join(__basedir, "views/index.hbs"), { cubes });
        });
    });
};

exports.AboutPage = function (req, res) {
    res.render(path.join(__basedir, "views/about.hbs"));
};