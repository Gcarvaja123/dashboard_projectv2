"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var vimosap=sequelize.define('vimosap',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Numpuerta: Sequelize.TEXT,
				Ut : Sequelize.TEXT,
				Arearesponsable : Sequelize.TEXT,
				Prioridad : Sequelize.TEXT,
				Nivel : Sequelize.TEXT,
				Plan : Sequelize.TEXT,
				Orden : Sequelize.TEXT,
				Mes : Sequelize.TEXT,
				Idingreso : Sequelize.TEXT
			},{
				tableName: 'vimosap',
				freezeTableName: true,
    			timestamps: false
			
			});
	return vimosap;


};