const path = require('path');
const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessories');
const mongoose = require('mongoose');

exports.GetInsertCube = function (req, res) {
    res.render(path.join(__basedir, "views/create.hbs"));
}

exports.InsertCube = function (req, res, next) {
    let newCube = { ...req.body };

    cubeModel.create(newCube).then(() => {
        res.redirect('/');
    }).catch(next);
}

exports.CubeDetails = function (req, res, next) {
    let id = req.params.id;
    cubeModel.findById(id).populate('accessories').exec((err, cube) => {
        res.render(path.join(__basedir, "views/details.hbs"), { cube });
    });
}