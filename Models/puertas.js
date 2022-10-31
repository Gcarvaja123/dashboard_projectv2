"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var puertas=sequelize.define('puertas',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Identificacion: Sequelize.TEXT,
				Ubicacion: Sequelize.TEXT,
				Fecharevision: Sequelize.TEXT,
				Tipomantencion : Sequelize.TEXT,
				Detalles : Sequelize.TEXT,
				Solicitante : Sequelize.TEXT,
				Estado : Sequelize.TEXT
			},{
				tableName: 'puertas',
				freezeTableName: true,
    			timestamps: false
			
			});
	return puertas;


};