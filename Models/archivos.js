"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var archivos=sequelize.define('archivos',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Tabla: Sequelize.TEXT,
				Idingreso : Sequelize.TEXT,
				Fechaingreso : Sequelize.TEXT,
				Infoingresada : Sequelize.TEXT,
				Nombrearchivo : Sequelize.TEXT
			},{
				tableName: 'archivos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return archivos;


};