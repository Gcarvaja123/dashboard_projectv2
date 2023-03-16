"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var workpad=sequelize.define('workpad',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Tipo: Sequelize.TEXT,
		    	Actividad: Sequelize.TEXT,
		    	Ejecutor: Sequelize.TEXT,
		    	HrsProg: Sequelize.TEXT,
		    	LunesTa: Sequelize.TEXT,
		    	LunesTb: Sequelize.TEXT,
		    	MartesTa: Sequelize.TEXT,
		    	MartesTb: Sequelize.TEXT,
		    	MiercolesTa: Sequelize.TEXT,
		    	MiercolesTb: Sequelize.TEXT,
		    	JuevesTa: Sequelize.TEXT,
		    	JuevesTb: Sequelize.TEXT,
		    	ViernesTa: Sequelize.TEXT,
		    	ViernesTb: Sequelize.TEXT,
		    	SabadoTa: Sequelize.TEXT,
		    	SabadoTb: Sequelize.TEXT,
		    	DomingoTa: Sequelize.TEXT,
		    	DomingoTb: Sequelize.TEXT,
		    	Aviso: Sequelize.TEXT,
		    	Orden: Sequelize.TEXT,
		    	Idingreso : Sequelize.TEXT
			},{
				tableName: 'workpad',
				freezeTableName: true,
    			timestamps: false
			
			});
	return workpad;


};