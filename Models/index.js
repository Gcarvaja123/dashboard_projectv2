
"use strict";

var fs        = require("fs");
var path      = require("path");
var Sequelize = require('sequelize');
var opts = {
    define: {
        //prevent sequelize from pluralizing table names
        freezeTableName: true
    }
}
const Op = Sequelize.Op;
var sequelize = new Sequelize('trabajo','admin','xvkgmdwe135', {
  host: 'dashboarddb.cbqwyeck8ajg.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  username : 'admin',
  password : "xvkgmdwe135",
  port : 3306,
  operatorsAliases: Op, // use Sequelize.Op
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
})
var db        = {};

fs
    .readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;