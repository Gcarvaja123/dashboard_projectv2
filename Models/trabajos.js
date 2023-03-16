"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var trabajos=sequelize.define('trabajos',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Fecha: Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Dotacion : Sequelize.TEXT,
				JdtDet : Sequelize.TEXT,
				JdtMies : Sequelize.TEXT,
				Ubicacion : Sequelize.TEXT,
				Actividad : Sequelize.TEXT,
				Horometrolevante : Sequelize.TEXT,
				Estadolevante : Sequelize.TEXT,
				Horometromini : Sequelize.TEXT,
				Estadominiretro : Sequelize.TEXT,
				Horometrominicargador : Sequelize.TEXT,
				Minicargador : Sequelize.TEXT,
				Observaciones : Sequelize.TEXT,
				Idingreso : Sequelize.TEXT

			},{
				tableName: 'trabajos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return trabajos;


};