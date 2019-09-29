const path = require('path');
const data = require('../config/database');
const fs = require('fs');

exports.GetInsertCube = function (req, res) {
    res.render(path.join(__basedir, "views/create.hbs"));
}

exports.InsertCube = function (req, res) {
    let currentIndex = data.currentIndex + 1;
    let newCube = { id: currentIndex, ...req.body };
    let newData = {
        currentIndex: currentIndex,
        entities: data.entities.concat(newCube)
    };

    return new Promise((resolve, reject) => {
        fs.writeFile(path.resolve(__basedir, 'config/database.json'), JSON.stringify(newData), (err) => {
            if (err) {
                reject(err);
                return;
            }
            this.data = newData;
            resolve(newCube);
            res.redirect('/');
        });
    });
}

exports.CubeDetails = function (req, res) {
    let id = req.params.id;

    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(__basedir, 'config/database.json'), (err, data) => {
            if (err) { reject(err); return; }

            let cube = JSON.parse(data).entities.filter(x => x.id === +id)[0];

            if (!cube) {
                res.redirect('/not-found');
            }

            resolve(cube);
            res.render(path.join(__basedir, "views/details.hbs"), { cube });
        });
    });

}