const mongoose = require('mongoose');

const accesoriesModel = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    description: String,
    cubes: [{ type: mongoose.Types.ObjectId, ref: 'Cubes' }]
});

module.exports = mongoose.model('Accessories', accesoriesModel);