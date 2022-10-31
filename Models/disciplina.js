"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var disciplina=sequelize.define('disciplina',{
				IdDisciplina : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Area: Sequelize.TEXT,
				Dia : Sequelize.TEXT,
				Fecha : Sequelize.TEXT,
				Llegada_Instalacion : Sequelize.TEXT,
				Salida_Instalacion : Sequelize.TEXT,
				Inicio_Act_Am : Sequelize.TEXT,
				Termino_Act_Am : Sequelize.TEXT,
				Almuerzo : Sequelize.TEXT,
				Inicio_Act_Pm : Sequelize.TEXT,
				Termino_Act_Pm : Sequelize.TEXT,
				Tiempo_Instalacion : Sequelize.TEXT,
				Traslado_Postura : Sequelize.TEXT,
				Tiempo_Disponible_Am : Sequelize.TEXT,
				Traslado_Colacion : Sequelize.TEXT,
				Almuerzo_2 : Sequelize.TEXT,
				Tiempo_Disponible_Pm : Sequelize.TEXT,
				Meta : Sequelize.TEXT

			},{
				tableName: 'disciplina',
				freezeTableName: true,
    			timestamps: false
			
			});
	return disciplina;


};