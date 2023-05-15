"use strict";
var Sequelize = require('sequelize');
module.exports = function(sequelize,DataTypes){

	var disciplina_tte8=sequelize.define('disciplina_tte8',{
				Id : {
		        	type: Sequelize.INTEGER,
		        	primaryKey: true,
		        	allowNull: false,
		        	autoIncrement:true
		    	},
				Fecha : Sequelize.TEXT,
				Tipo_trabajo : Sequelize.TEXT,
		    	Area: Sequelize.TEXT,
				Cuadrilla : Sequelize.TEXT,
				Capataz : Sequelize.TEXT,
				Llega_nivel : Sequelize.TEXT,
				Charla : Sequelize.TEXT,
				Traslado_postura : Sequelize.TEXT,
				Ingreso_postura :  Sequelize.TEXT,
				Estandar_iap : Sequelize.TEXT,
				Colacion_inicio : Sequelize.TEXT,
				Colacion_termino : Sequelize.TEXT,
				Result_colacion : Sequelize.TEXT,
				Estandar_colacion : Sequelize.TEXT,
				Trabajo_terreno : Sequelize.TEXT,
				Retiro_postura : Sequelize.TEXT,
				Estandar_rdp : Sequelize.TEXT,
				Cord_siguiente : Sequelize.TEXT,
				Estandar_te : Sequelize.TEXT,
				Tiempo_efectivo : Sequelize.TEXT,
				Idingreso : Sequelize.TEXT
			},{
				tableName: 'disciplina_tte8',
				freezeTableName: true,
    			timestamps: false
			
			});
	return disciplina_tte8;


};