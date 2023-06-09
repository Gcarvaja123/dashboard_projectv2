"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var conductores=sequelize.define('conductores',{
				id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Unidad : Sequelize.TEXT,
                Proceso : Sequelize.TEXT,
                Nombre : Sequelize.TEXT,
                Rut : Sequelize.TEXT,
                Sap : Sequelize.TEXT,
                FechaPsico : Sequelize.TEXT,
                FechaVen : Sequelize.TEXT,
                FechaVenMon : Sequelize.TEXT,
                FechaVenMina : Sequelize.TEXT,
                Comentarios : Sequelize.TEXT,
                Idingreso : Sequelize.TEXT

			},{
				tableName: 'conductores',
				freezeTableName: true,
    			timestamps: false
			
			});
	return conductores;


};