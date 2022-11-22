var express = require('express');
var controllers = require ('.././Controllers');
var router = express.Router();
const multer = require("multer");
const path = require('path');
const fileUpload = require("express-fileupload");
const reader = require('xlsx');
const fss = require("fs");


var passport = require('passport');
var AuthMiddleware = require ('.././middleware/auth');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');



router.get('/', controllers.UserController.getdashboard);
//router.get('/', controllers.UserController.getdashboard);
router.get('/copia', controllers.UserController.getSistemanuevocopia);
//router.get('/',controllers.UserController.getIndex);
//router.get('/data', controllers.UserController.getPrueba);
router.get('/ingreso_datos', controllers.UserController.getIngreso);
router.post('/ingreso_datos', controllers.UserController.postIngreso);
router.get('/vistaprueba2', controllers.UserController.getPrueba2);
router.get('/dashboard', controllers.UserController.getdashboard);
router.post('/dashboard', controllers.UserController.postIngreso);
router.get('/prueba', controllers.UserController.getprueba);
router.get('/login',  controllers.UserController.getLogin);
router.post('/login', passport.authenticate('local',{
	successRedirect : 'dashboard',
	failureRedirect : 'dashboard',
	failureFlash : true
}))

router.post("/crearusuario", controllers.UserController.postCrearusuario)
router.post("/delete", controllers.UserController.postDeleteFiles)






module.exports = router;