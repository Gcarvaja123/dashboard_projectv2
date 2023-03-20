"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var asistencia_traspaso=sequelize.define('asistencia_traspaso',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Fecha : Sequelize.TEXT,
		    	ApellidoP : Sequelize.TEXT,
				ApellidoM : Sequelize.TEXT,
				Nombre : Sequelize.TEXT,
				Rut : Sequelize.TEXT,
				Cargo : Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Asistencia : Sequelize.TEXT
			},{
				tableName: 'asistencia_traspaso',
				freezeTableName: true,
    			timestamps: false
			
			});
	return asistencia_traspaso;


};