const path = require('path');
const cubeModel = require('../models/cube');
const accessoryModel = require('../models/accessories');

function CreateGet(req, res, next) {
    res.render(path.join(__basedir, 'views/createAccessory.hbs'));
}

function CreatePost(req, res, next) {
    let newAccessory = { ...req.body };

    accessoryModel.create(newAccessory).then(() => {
        res.redirect('/');
    }).catch(next);
}

function AttachAccessoryGet(req, res, next) {
    let id = req.params.id;

    let cube;
    cubeModel.findById(id).then(cube => {
        cube = cube;

        let accessories;

        accessoryModel.find({ cubes: { $nin: [cube] } }).then(cubeAccessories => {
            accessories = cubeAccessories;
            res.render(path.join(__basedir, 'views/attachAccessory.hbs'), { cube, accessories });
        }).catch(next);
    }).catch(next);

}

function AttachAccessoryPost(req, res, next) {
    let cubeId = req.params.id;
    let accessoryId = req.body.accessory;
    Promise.all([
        accessoryModel.update({ _id: accessoryId },
            { $push: { cubes: cubeId } }),
        cubeModel.update({ _id: cubeId },
            { $push: { accessories: accessoryId } })
    ]).then(() => {
        res.redirect('/');
    })
        .catch(next);
}

module.exports = { CreateGet, CreatePost, AttachAccessoryGet, AttachAccessoryPost };