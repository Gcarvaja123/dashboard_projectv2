"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var usuario=sequelize.define('usuario',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Usuario: Sequelize.TEXT,
				Contraseña : Sequelize.TEXT,
				Rango : Sequelize.TEXT
			},{
				tableName: 'usuario',
				freezeTableName: true,
    			timestamps: false
			
			});
	return usuario;


};