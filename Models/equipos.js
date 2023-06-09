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
				Contrato: Sequelize.TEXT,
		    	Equipo: Sequelize.TEXT,
		    	Patente:Sequelize.TEXT,
				Numinterno : Sequelize.TEXT,
		    	Cartola: Sequelize.TEXT,
				Nomresp : Sequelize.TEXT,
				Rutresp : Sequelize.TEXT,
				Regimen : Sequelize.TEXT,
		    	Ultimamantencion: Sequelize.TEXT,
				Proxmant : Sequelize.TEXT,
		    	Ultimokms: Sequelize.TEXT,
				Proximakms : Sequelize.TEXT,
		    	Kilometrajeactual: Sequelize.TEXT,
				Kilometrajefaltante : Sequelize.TEXT,
		    	Estado: Sequelize.TEXT,
		    	Fechagas: Sequelize.TEXT,
				Comentarios : Sequelize.TEXT,
		    	Idingreso : Sequelize.TEXT
			},{
				tableName: 'equipos',
				freezeTableName: true,
    			timestamps: false
			
			});
	return equipos;


};