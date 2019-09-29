const path = require('path');
const fs = require('fs');

exports.SearchCube = function (req, res) {
    return new Promise((resolve, reject) => {

        const { from, to, search } = req.body;

        fs.readFile(path.resolve(__basedir, 'config/database.json'), (err, data) => {
            if (err) { reject(err); return; }

            let cubes = '';
            if (!from && !to && !search) {
                resolve();
                res.redirect('/');
            }

            if (search) {
                cubes = JSON.parse(data).entities.filter(x => x.name.toLowerCase().includes(search.toLowerCase()));
                if (from && to) {
                    cubes = JSON.parse(data).entities.filter(function (item) {
                        return item.difficultyLevel >= from && item.difficultyLevel <= to && item.name.toLowerCase().includes(search.toLowerCase());
                    });
                }
                resolve(cubes);
                res.render(path.join(__basedir, "views/index.hbs"), { cubes });
            }
        });

    });
};