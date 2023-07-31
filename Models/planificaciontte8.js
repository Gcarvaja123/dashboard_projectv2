"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var planificaciontte8=sequelize.define('planificaciontte8',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Orden: Sequelize.TEXT,
                Aviso : Sequelize.TEXT,
                Equipo : Sequelize.TEXT,
                Actividad : Sequelize.TEXT,
                Np : Sequelize.TEXT,
                Hrs : Sequelize.TEXT,
                Clasificacion : Sequelize.TEXT,
                Fecha : Sequelize.TEXT,
                Totalhrs : Sequelize.TEXT,
				Seleccionado : Sequelize.TEXT,
                Idingreso : Sequelize.TEXT,
				Comentario : Sequelize.TEXT
			},{
				tableName: 'planificaciontte8',
				freezeTableName: true,
    			timestamps: false
			
			});
	return planificaciontte8;


};