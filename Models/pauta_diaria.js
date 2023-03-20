"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var pauta_diaria=sequelize.define('pauta_diaria',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Fecha: Sequelize.TEXT,
				Cuadrilla : Sequelize.TEXT,
				Descripcion : Sequelize.TEXT,
				Ubicacion : Sequelize.TEXT,
				Supervisor : Sequelize.TEXT,
				Mantenedor : Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Instructivo : Sequelize.TEXT,
				Telefono : Sequelize.TEXT,
				Frecuenciaradio : Sequelize.TEXT,
				Dotacion : Sequelize.TEXT,
				Herramientas : Sequelize.TEXT,
				Auspervac : Sequelize.TEXT,
				Area : Sequelize.TEXT,
				Coordinador : Sequelize.TEXT,
				Apr : Sequelize.TEXT
			},{
				tableName: 'pauta_diaria',
				freezeTableName: true,
    			timestamps: false
			
			});
	return pauta_diaria;


};