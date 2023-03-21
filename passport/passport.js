var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var modelo = require('.././Models');

module.exports = function(passport){


	passport.serializeUser(function(user, done){
		done(null, user);
	});

	passport.deserializeUser(function(obj, done){
		done(null,obj);
	});

	passport.use( new LocalStrategy({
		passReqToCallback : true,
	}, async function(req, email, password , done){

		//var config = require('.././database/config');
		//var db = mysql.createConnection(config);
		//db.connect();

		await modelo.usuario.findAll({
			where:{
				usuario : email 
			}
		}).then(async function(rows_usuarios_aux){
			//rows_usuarios = JSON.stringify(rows_usuarios_aux)
			var string=JSON.stringify(rows_usuarios_aux);
        	var rows_usuarios=JSON.parse(string);
			if(rows_usuarios.length>0){
				if(rows_usuarios[0].Contraseña == password){
					console.log("aca estoy")
					return done(null, {
						id: rows_usuarios[0].Id,
						nombre : rows_usuarios[0].Usuario,
						rango : rows_usuarios[0].Rango
					});
				}
			}
			else{
				return done(null, false, req.flash('authmessage', 'Usuario o contraseña incorrecta'));
			}
		})
		
		
		/*db.query('SELECT * FROM usuario WHERE email = ?', email, function(err, rows , fields){
			if(err) throw err;

			db.end();

			if(rows.length > 0){
				var user = rows[0];
				if(user.password == password){
					console.log('correcto');
					return done(null, {
						id: user.id,
						nombre : user.nombre,
						email : user.email
					});
				}
			}

			return done(null, false, req.flash('authmessage', 'Email o Password incorrecto.'));
			

		});*/
		
	}
	));

};