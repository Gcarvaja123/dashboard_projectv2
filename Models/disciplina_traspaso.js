"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var disciplina_traspaso=sequelize.define('disciplina_traspaso',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
		    	Area: Sequelize.TEXT,
		    	Dia : Sequelize.TEXT,
		    	Fecha : Sequelize.TEXT,
		    	Llegada_det : Sequelize.TEXT,
		    	Traslado_postura : Sequelize.TEXT,
		    	Ingreso_postura : Sequelize.TEXT,
		    	Almuerzo : Sequelize.TEXT,
		    	Salida_mina : Sequelize.TEXT,
		    	Traslado_buses : Sequelize.TEXT,
		    	Ingreso_pm : Sequelize.TEXT,
		    	Ingreso_am : Sequelize.TEXT,
		    	Cena : Sequelize.TEXT,
		    	Salida_camarines : Sequelize.TEXT,
		    	Salida_buses : Sequelize.TEXT,
		    	Ingreso_postura_pm : Sequelize.TEXT,
		    	Meta_dia : Sequelize.TEXT,
		    	Meta : Sequelize.TEXT,
		    	Cumplimiento : Sequelize.TEXT

			},{
				tableName: 'disciplina_traspaso',
				freezeTableName: true,
    			timestamps: false
			
			});
	return disciplina_traspaso;


};