const express = require('express');
const path = require('path');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');

module.exports = (app) => {
    app.engine('.hbs', handlebars({ extname: '.hbs', defaultLayout: false }));
    app.set('views', path.resolve(__dirname, 'views'));
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.static(path.resolve(__basedir, 'static')));
};