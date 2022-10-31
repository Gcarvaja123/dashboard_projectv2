"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var planmatriz=sequelize.define('planmatriz',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Fecha: Sequelize.TEXT,
				Programado : Sequelize.TEXT,
				Realizado : Sequelize.TEXT,
				Observaciones : Sequelize.TEXT,
				Area : Sequelize.TEXT
			},{
				tableName: 'planmatriz',
				freezeTableName: true,
    			timestamps: false
			
			});
	return planmatriz;


};