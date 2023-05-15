"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var asistencia_tte8=sequelize.define('asistencia_tte8',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
                Fecha : Sequelize.TEXT,
		    	Nombre : Sequelize.TEXT,
				ApellidoP : Sequelize.TEXT,
				ApellidoM : Sequelize.TEXT,
				Rut : Sequelize.TEXT,
				Cargo : Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Hn : Sequelize.TEXT,
				Tur : Sequelize.TEXT,
				Idingreso : Sequelize.TEXT,
			},{
				tableName: 'asistencia_tte8',
				freezeTableName: true,
    			timestamps: false
			
			});
	return asistencia_tte8;


};