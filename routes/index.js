var express = require('express');
var controllers = require ('.././Controllers');
var router = express.Router();
const multer = require("multer");
const path = require('path');
const fileUpload = require("express-fileupload");
const reader = require('xlsx');
const fss = require("fs");






router.get('/', controllers.UserController.getdashboard);
router.get('/copia', controllers.UserController.getSistemanuevocopia);
//router.get('/',controllers.UserController.getIndex);
//router.get('/data', controllers.UserController.getPrueba);
router.get('/ingreso_datos', controllers.UserController.getIngreso);
router.post('/ingreso_datos', controllers.UserController.postIngreso);
router.get('/vistaprueba2', controllers.UserController.getPrueba2);
router.get('/nuevorequisito', controllers.UserController.getNuevorequisito);
router.post('/nuevorequisito', controllers.UserController.postNuevorequisito);
router.get('/dashboard', controllers.UserController.getdashboard);
router.post('/dashboard', controllers.UserController.postSistemanuevo);
router.get('/prueba', controllers.UserController.getprueba);
router.get('/login', controllers.UserController.getLogin);






module.exports = router;