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
		    	Fecha : Sequelize.TEXT,
				Area : Sequelize.TEXT,
				Capataz : Sequelize.TEXT,
				Turno : Sequelize.TEXT,
				Lleganivel : Sequelize.TEXT,
				Charla : Sequelize.TEXT,
				Trasladopostura : Sequelize.TEXT,
				Ingresopostura : Sequelize.TEXT,
				Colacioninicio : Sequelize.TEXT,
				Colaciontermino : Sequelize.TEXT,
				Trabajoterreno : Sequelize.TEXT,
				Retiropostura : Sequelize.TEXT,
				Coordinacionessiguiente : Sequelize.TEXT,
				Tiempoefectivo : Sequelize.TEXT

				

			},{
				tableName: 'disciplina_traspaso',
				freezeTableName: true,
    			timestamps: false
			
			});
	return disciplina_traspaso;


};