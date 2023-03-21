const express = require('express'); //Import the express dependency
var path = require('path');
const app = express();
app.io = require('socket.io')();
var modelo = require('./Models');
var bodyParser = require('body-parser');
require("date-format-lite");
var upload_2 = require("express-fileupload");
const session = require('express-session')
app.use(upload_2());

var flash = require('connect-flash');

var passport = require('passport');
require('./passport/passport')(passport);
const cookieParser = require('cookie-parser');

//const PassportLocal = require('passport-local').Strategy

app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(session({
  secret: 'secret',
  resave: false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());



/*app.use(cookieParser('MiKey'));

app.use(session({
	secret : "MiKey",
	resave : true,
	saveUninitialized :true
}))


app.use(passport.initialize());
app.use(passport.session());

passport.use(new PassportLocal(username, password, done){

	if(username == "hola" && password == "1234"){
		return done(null, {id:1, name:'Cody'});
	}
	done(null, false)
});
 

passport.serializeUser(Function(user, done){
	done(null,user.id);
});

passport.deserializerUser(Function(id, done){
	done(null, {id:1, name:'Cody'});	
})*/



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


var index = require('./routes/index');



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use('/', index);






app.io.on('connection', function(socket){
	/*modelo.requisito.findAll({}).then(function(data){
		var string=JSON.stringify(data);
        var json=JSON.parse(string);
		console.log(json);
	})*/

	socket.on('prueba',function(status){
		modelo.requisito.create({
			Nombre : status.nombre,
			Descripcion : status.desc
		})
		console.log("agregado")
    }),

    socket.on("SendmeValues", function(status){
    	console.log("aca llego");
    	modelo.requisito.findAll({}).then(function(data){
			var string=JSON.stringify(data);
	        var json=JSON.parse(string);
	        socket.emit("SendingValues", json);
		})
    })

    socket.on("agregar_fechas", function(status){
    	console.log(status);
    	var fecha_1 = status.Fecha_inicio;
    	var fecha_2 = status.Fecha_termino;

    	var duracion = parseInt(fecha_2.split("-")[2])-parseInt(fecha_1.split("-")[2]);
    	console.log(duracion);

    	modelo.gantt_tasks.create({
    		text : status.Descripcion,
    		start_date : status.Fecha_inicio,
    		duration : duracion,
    		progress : 0
    	})
    })



}) 

module.exports = app;