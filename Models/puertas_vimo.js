"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var puertas_vimo=sequelize.define('puertas_vimo',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Codigo: Sequelize.TEXT,
				Fecha : Sequelize.TEXT,
				Numpuerta : Sequelize.TEXT,
				Nivel : Sequelize.TEXT,
				Area : Sequelize.TEXT,
                Horainicio : Sequelize.TEXT,
                Horatermino : Sequelize.TEXT,
				Descripcion : Sequelize.TEXT,
				Idingreso : Sequelize.TEXT
			},{
				tableName: 'puertas_vimo',
				freezeTableName: true,
    			timestamps: false
			
			});
	return puertas_vimo;


};