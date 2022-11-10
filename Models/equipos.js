"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var equipos=sequelize.define('equipos',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Equipo: Sequelize.TEXT,
		    	Patente:Sequelize.TEXT,
		    	Cartola: Sequelize.TEXT,
		    	Ultimamantencion: Sequelize.TEXT,
		    	Ultimokms: Sequelize.TEXT,
		    	Proximakms: Sequelize.TEXT,
		    	Kilometrajeactual: Sequelize.TEXT,
		    	Semaforo: Sequelize.TEXT,
		    	Estado: Sequelize.TEXT,
		    	Fechagas: Sequelize.TEXT,
			},{
				tableName: 'equipos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return equipos;


};