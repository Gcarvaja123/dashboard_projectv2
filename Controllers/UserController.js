
var modelo = require('.././Models');
let googlesheet = require('.././spreadsheet')
const xlsx = require("xlsx");
const formidable = require("formidable");
const reader = require('xlsx');
const fss = require("fs");
const path = require('path');
var sizeof = require('object-sizeof');
var finished = false;

function leerExcel(ruta){
  
  
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;
}

function leerExcelSap(ruta){
  var array=[];
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  array.push(dataExcel)
  array.push(sheet)
  return array;
}


function leerExcelDisciplina(ruta, archivos){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var disciplina_sheets=[];
  var array_name = [];
  var nombres = [];
  for(a=0; a< archivos.length ; a++){
    const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
    const workbooksheet = workbook.SheetNames;
    const sheet  = workbooksheet[archivos[a]];
    nombres.push(workbooksheet[archivos[a]]);
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    disciplina_sheets.push(dataExcel);
  }

  array_name.push(disciplina_sheets);
  array_name.push(nombres);
  return array_name;
}

function leerExcelBrocales(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[workbooksheet.length-1];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;  
}

function leerExcelMatriz(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel;  
}


module.exports = {

  getDashboardtest : function(req, res, next){
    return res.render('dashboardtest');
  },

  getLogin : function(req, res, next){
    return res.render('login');
  },

  getinicio2 : function(req, res, next){
    return res.render('dashboard')
  },
  getdashboard : function(req, res, next){
    
    /*modelo.disciplina.findAll({
    }).then(function(rows_disciplina){
      return res.render('dashboard',{
        totaldisciplina : rows_disciplina
      })
    })*/
    modelo.brocales.findAll({
    }).then(function(rows_brocales){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.disciplina.findAll({          
        }).then(function(rows_disciplina){
          modelo.planmatriz.findAll({
          }).then(function(rows_matriz){
            modelo.puertas.findAll({
            }).then(function(rows_puertas){
              modelo.usuario.findAll({
              }).then(function(rows_usuarios){
                modelo.vimosap.findAll({                  
                }).then(function(rows_vimosap){
                  if(req.user != undefined){
                    console.log("aca estoy")
                    return res.render("dashboard", {
                      totaldisciplina : rows_disciplina,
                      totalasistencias : rows_asistencia,
                      totalbrocales : rows_brocales,
                      totalmatriz : rows_matriz,
                      totalpuertas : rows_puertas,
                      totalusuarios : rows_usuarios,
                      user : req.user,
                      totalsap : rows_vimosap,
                      authmessage : req.flash('authmessage')
                    })
                  }
                  else{
                    return res.render("dashboard", {
                      totaldisciplina : rows_disciplina,
                      totalasistencias : rows_asistencia,
                      totalbrocales : rows_brocales,
                      totalmatriz : rows_matriz,
                      totalpuertas : rows_puertas,
                      totalusuarios : rows_usuarios,
                      totalsap : rows_vimosap,
                      user : "notlogged",
                      authmessage : req.flash('authmessage')
                    })
                  }
                })            
              })
              
            })
          });
        })
      })    
    });
    
  },

	getSistemanuevo : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevo", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },
  getSistemanuevocopia : function(req,res,next){
    modelo.graficos.findAll({
    }).then(function(rows){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          return res.render("sistemanuevocopia", {
            cantidadesprueba : rows,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales
        });
        })
      })    
    });
  },

  getIndex : function(req,res,next){
    modelo.requisito.findAll({
      where :{
          Aceptada:0
      }
    }).then(function(data){
        console.log("hola");
        var string=JSON.stringify(data);
        var json=JSON.parse(string);
        var requisitos =[];
        for (a = 0 ; a < json.length ; a++){
          var Requirements = [];
          Requirements.Nombre = json[a].Nombre;
          Requirements.Descripcion = json[a].Descripcion;
          Requirements.Urgencia = json[a].Urgencia;
          Requirements.Fecha_ingreso = json[a].Fecha_ingreso;
          requisitos.push(Requirements);  
        }
        return res.render("index",{
          Requisitosnoaceptados : data
        });
    })

	},

  postAsistencianueva : async(req,res,next)=>{
    console.log("asistencia nueva");

  },


  postSistemanuevo : async(req,res,next)=>{

    datos_1 = Object.keys(req.files);
    for( d = 0 ; d < Object.keys(req.files).length ; d++){
      if (datos_1[d] == "Asistencia"){
        if (req.files["Asistencia"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Asistencia"].length ; e++){
            JoinAsistencia(req.files["Asistencia"][e]);
          }
        }
        else{
          console.log("entré a undefined");
          JoinAsistencia(req.files["Asistencia"]);
        }  
      }
      else if (datos_1[d] == "Brocales") {
        if (req.files["Brocales"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Brocales"].length ; e++){
            JoinBrocales(req.files["Brocales"][e]);
          }
        }
        else{
          console.log("entré a undefined");
          JoinBrocales(req.files["Brocales"]);
        }
      }
      else if (datos_1[d] == "Matriz"){
        if (req.files["Matriz"].length != undefined){
          for(e = 0 ; e < req.files["Matriz"].length ; e++){
            Joinplanmatriz(req.files["Matriz"][e]);
          }
        }
        else{
          //Solo un archivo.
          Joinplanmatriz(req.files["Matriz"]);
        }
      }
      else if (datos_1[d] == "Disciplina"){
        if (req.files["Disciplina"].length !=undefined){
          for (e=0; e<req.files["Disciplina"].length ; e++){
            JoinDisciplina(req.files["Disciplina"]);
          }
        }
        else{
            JoinDisciplina(req.files["Disciplina"]);
            const savePath = path.join(__dirname,"../",'public','uploads',req.files["Disciplina"]);
            await file.mv(savePath);
            var datos = leerExcelDisciplina(file.name, [0,1,2,3,4]);
            
            for(a=0; a<datos.length; a++){
              for(b=1; b < 6 ; b++){
                llaves = Object.keys(datos[a][b]);
                var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                
                var meta;
                for(c=6; c< datos[a].length; c++){
                  if(datos[a][c][llaves[5]] == "META"){
                    meta = datos[a][c][llaves[6]];
                    break
                  }
                }
                modelo.disciplina.create({
                  Area : datos[a][b][llaves[0]],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_Instalacion : minTommss(datos[a][b][llaves[3]]*24).toString(),
                  Salida_Instalacion : minTommss(datos[a][b][llaves[4]]*24).toString(),
                  Inicio_Act_Am : minTommss(datos[a][b][llaves[5]]*24).toString(),
                  Termino_Act_Am : minTommss(datos[a][b][llaves[6]]*24).toString(),
                  Almuerzo : minTommss(datos[a][b][llaves[7]]*24).toString(),
                  Inicio_Act_Pm : minTommss(datos[a][b][llaves[8]]*24).toString(),
                  Termino_Act_Pm : minTommss(datos[a][b][llaves[9]]*24).toString(),
                  Tiempo_Instalacion : minTommss(datos[a][b]["__EMPTY_8"]*24).toString(),
                  Traslado_Postura : minTommss(datos[a][b]["__EMPTY_9"]*24).toString(),
                  Tiempo_Disponible_Am : minTommss(datos[a][b]["__EMPTY_10"]*24).toString(),
                  Traslado_Colacion : minTommss(datos[a][b]["__EMPTY_11"]*24).toString(),
                  Almuerzo_2 : minTommss(datos[a][b]["__EMPTY_12"]*24).toString(),
                  Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
                  Meta : minTommss(meta*24).toString()
                })
              }
            }
            finished = true;
        }
      }
         
    }
    await res.render("revision");

    /*modelo.disciplina.findAll({
    }).then(function(rows_disciplina){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          modelo.planmatriz.findAll({
          }).then(function(rows_matriz){
            return res.render("dashboard", {
            totaldisciplina : rows_disciplina,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales,
            totalmatriz : rows_matriz
          })
          });
        })
      })    
    });*/
  },

  getIngreso : function(req,res,next){
    return res.render("ingreso_datos")
  },

  postIngreso : async (req,res,next)=>{
    datos_1 = Object.keys(req.files);
    for( d = 0 ; d < Object.keys(req.files).length ; d++){
      if (datos_1[d] == "Asistencia"){
        if (req.files["Asistencia"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Asistencia"].length ; e++){

            //JoinAsistencia(req.files["Asistencia"][e]);
            file = req.files["Asistencia"][e];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcel(file.name);
            console.log(datos);
            var Sector ="";
            var Nombre = "";
            var Rut = "";
            var Cargo = "";
            var Turno = "";
            var Fechaingreso = "";

            Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
            for(a=1; a < Object.keys(datos).length; a++){ 
              let keys = Object.keys(datos[0]);
              if(datos[a][keys[0]] != undefined){
                Sector = datos[a][keys[0]]
              }
              if(datos[a][keys[1]] != undefined){
                Nombre = datos[a][keys[1]]
              }
              if(datos[a][keys[2]] != undefined){
                Rut = datos[a][keys[2]]
              }
              if(datos[a][keys[3]] != undefined){
                Cargo = datos[a][keys[3]]
              }
              if(datos[a][keys[4]] != undefined){
                Turno = datos[a][keys[4]]
              }

              await modelo.asistencia.findAll({
                where : {
                  Fechaingreso : Fechaingreso,
                  Nombre : Nombre,
                }
              }).then(async function(rows){
                if(rows.length==0){
                  await modelo.asistencia.create({
                    Sector : Sector,
                    Nombre : Nombre,
                    Rut : Rut,
                    Cargo : Cargo,
                    Turno : Turno,
                    Fechaingreso : Fechaingreso
                  })
                }
              })
            } 
          }
        }
        else{
          //console.log("entré a undefined");
          //JoinAsistencia(req.files["Asistencia"]);
          file = req.files["Asistencia"]
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcel(file.name);
          console.log(datos);
          var Sector ="";
          var Nombre = "";
          var Rut = "";
          var Cargo = "";
          var Turno = "";
          var Fechaingreso = "";

          Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
          for(a=1; a < Object.keys(datos).length; a++){ 
            let keys = Object.keys(datos[0]);
            if(datos[a][keys[0]] != undefined){
              Sector = datos[a][keys[0]]
            }
            if(datos[a][keys[1]] != undefined){
              Nombre = datos[a][keys[1]]
            }
            if(datos[a][keys[2]] != undefined){
              Rut = datos[a][keys[2]]
            }
            if(datos[a][keys[3]] != undefined){
              Cargo = datos[a][keys[3]]
            }
            if(datos[a][keys[4]] != undefined){
              Turno = datos[a][keys[4]]
            }
            await modelo.asistencia.findAll({
                where : {
                  Fechaingreso : Fechaingreso,
                  Nombre : Nombre,
                }
              }).then(async function(rows){
                if(rows.length==0){
                  await modelo.asistencia.create({
                    Sector : Sector,
                    Nombre : Nombre,
                    Rut : Rut,
                    Cargo : Cargo,
                    Turno : Turno,
                    Fechaingreso : Fechaingreso
                  })
                }
              })
            
          }  
        }
      }
      else if (datos_1[d] == "Brocales") {
        if (req.files["Brocales"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Brocales"].length ; e++){
            //JoinBrocales(req.files["Brocales"][e]);
            file = req.files["Brocales"][e];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelBrocales(file.name);
            var Fecha = "";
            var Turno = "";
            var Ubicacion = "";
            var Unidad = "";
            var Cantidad = "";
            var Actividad = "";
            var Observaciones = "";
            var Sub = "";
            var Demanda = "";
            var Dotacion = "";
            var Horai = "";
            var Horaf = "";
            var Fecha_aux= "";
            var id = "";
            //console.log(datos[3]["LIMPIEZA DE BROCALES FEBRERO 2022"] == null);
            for(a=1; a < Object.keys(datos).length; a++){
              let keys = Object.keys(datos[a]);
              if(datos[a][Object.keys(datos[0])[0]] != undefined){
                console.log(datos[a][Object.keys(datos[0])[0]]);
                var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                //var date = new Date(Math.round((datos[a][Object.keys(datos[a])[0]] - (25567+1)) * 86400 * 1000));
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
                id = guid();
              }
              if(datos[a]["__EMPTY"] != undefined){
                  Turno = datos[a]["__EMPTY"];
              }
              if(datos[a]["__EMPTY_1"] != undefined){
                  Dotacion = datos[a]["__EMPTY_1"];
              }
              if(datos[a]["__EMPTY_4"] != undefined){
                  Ubicacion = datos[a]["__EMPTY_4"];
              }
              else{
                Ubicacion ="";
              }
              if(datos[a]["__EMPTY_5"] != undefined){
                  Demanda = datos[a]["__EMPTY_5"];
              }
              if(datos[a]["__EMPTY_6"] != undefined){
                  Horai = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString()
              }
              else{
                Horai = "0";
              }
              if(datos[a]["__EMPTY_7"] != undefined){
                  Horaf = convertToHHMM(datos[a]["__EMPTY_7"]*24).toString();
              }
              else{
                Horaf = "0";
              }
              if(datos[a]["__EMPTY_10"] != undefined){
                  Unidad = datos[a]["__EMPTY_10"];
              }
              if(datos[a]["__EMPTY_11"] != undefined){
                  Cantidad = datos[a]["__EMPTY_11"];
                }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] != undefined){
                Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Actividad = "";
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] != undefined){
                Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Observaciones = "";
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
              }

              await modelo.brocales.findAll({
                where : {
                  Fecha : Fecha,
                  Ubicacion : Ubicacion,
                  Horai : Horai
                }
              }).then(async function(rows){
                if(rows.length==0){
                  await modelo.brocales.create({
                      Fecha : Fecha_aux,
                      Turno : Turno,
                      Ubicacion : Ubicacion,
                      Unidad : Unidad,
                      Cantidad : Cantidad,
                      Actividad : Actividad,
                      Observaciones : Observaciones,
                      Sub : Sub,
                      Dotacion : Dotacion,
                      Demanda : Demanda,
                      Horai : Horai,
                      Horaf : Horaf,
                      Uniqueid : id
                  })
                }
              })
            }
          }
        }
        else{
          console.log("entré a undefined");
          //JoinBrocales(req.files["Brocales"]);
          file = req.files["Brocales"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelBrocales(file.name);
          var Fecha = "";
          var Turno = "";
          var Ubicacion = "";
          var Unidad = "";
          var Cantidad = "";
          var Actividad = "";
          var Observaciones = "";
          var Sub = "";
          var Demanda = "";
          var Dotacion = "";
          var Horai = "";
          var Horaf = "";
          var Fecha_aux= "";
          var id = "";
          //console.log(datos[3]["LIMPIEZA DE BROCALES FEBRERO 2022"] == null);
          for(a=1; a < Object.keys(datos).length; a++){
            let keys = Object.keys(datos[a]);
            if(datos[a][Object.keys(datos[0])[0]] != undefined){
              //console.log(datos[a][Object.keys(datos[0])[0]]);
              var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
              //console.log(datos[a][Object.keys(datos[0])[0]])
              //console.log(date)
              //var date = new Date(Math.round((datos[a][Object.keys(datos[a])[0]] - (25567+1)) * 86400 * 1000));
              var converted_date = date.toISOString().split('T')[0];
              Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
              Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
              id = guid();
            }
            if(datos[a]["__EMPTY"] != undefined){
                Turno = datos[a]["__EMPTY"];
            }
            if(datos[a]["__EMPTY_1"] != undefined){
                Dotacion = datos[a]["__EMPTY_1"];
            }
            if(datos[a]["__EMPTY_4"] != undefined){
                Ubicacion = datos[a]["__EMPTY_4"];
            }
            else{
              Ubicacion ="";
            }
            console.log(datos[a]["__EMPTY_5"])
            if(datos[a]["__EMPTY_5"] != undefined){
                Demanda = datos[a]["__EMPTY_5"];
            }
            if(datos[a]["__EMPTY_5"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
               Demanda = 0;

            }

            if(datos[a]["__EMPTY_6"] != undefined){
                Horai = convertToHHMM(datos[a]["__EMPTY_6"]*24).toString()
            }
            else{
              Horai = "0";
            }
            if(datos[a]["__EMPTY_7"] != undefined){
                Horaf = convertToHHMM(datos[a]["__EMPTY_7"]*24).toString();
            }
            else{
              Horaf = "0";
            }
            if(datos[a]["__EMPTY_10"] != undefined){
                Unidad = datos[a]["__EMPTY_10"];
            }
            if(datos[a]["__EMPTY_11"] != undefined){
                Cantidad = datos[a]["__EMPTY_11"];
              }
            if(datos[a]["__EMPTY_11"] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
               Cantidad = 0;

            }
            if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] != undefined){
                Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]];
            }

            if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
               Actividad = "";
            }
            if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] != undefined){
                Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]];
            }
            if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-2]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
               Observaciones = "";
            }
            if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
            }
            if(Object.keys(datos[a]).length > 1){
              await modelo.brocales.findAll({
                where : {
                  Fecha : Fecha,
                  Ubicacion : Ubicacion,
                  Horai : Horai
                }
              }).then(async function(rows){
                if(rows.length==0){
                  await modelo.brocales.create({
                      Fecha : Fecha_aux,
                      Turno : Turno,
                      Ubicacion : Ubicacion,
                      Unidad : Unidad,
                      Cantidad : Cantidad,
                      Actividad : Actividad,
                      Observaciones : Observaciones,
                      Sub : Sub,
                      Dotacion : Dotacion,
                      Demanda : Demanda,
                      Horai : Horai,
                      Horaf : Horaf,
                      Uniqueid : id
                  })
                }
              })
            }
          }
        }
      }
      else if (datos_1[d] == "Matriz"){
        if (req.files["Matriz"].length != undefined){
          for(e = 0 ; e < req.files["Matriz"].length ; e++){
            //Joinplanmatriz(req.files["Matriz"][e]);
            file = req.files["Matriz"][e]
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcel(file.name);
            let keys = Object.keys(datos[0]);
            var area ="";
            if(file.name.toString().includes("Consolidado")){
              for(a=1; a< Object.keys(datos).length ; a++){
                var date = ExcelDateToJSDate(datos[a]["__EMPTY_2"])
                var converted_date = date.toISOString().split('T')[0];
                fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                var Solicitante = "";
                var Tipomantencion = "";
                var Estado = "";
                if(datos[a]["__EMPTY_6"] != undefined){
                  Solicitante = datos[a]["__EMPTY_6"]
                }

                if(datos[a]["__EMPTY_3"] != undefined){
                  Tipomantencion = datos[a]["__EMPTY_3"]
                }

                if(datos[a]["__EMPTY_7"] != undefined){
                  Estado = datos[a]["__EMPTY_7"]
                }

                await modelo.puertas.create({
                  Identificacion : datos[a]["__EMPTY"],
                  Ubicacion : datos[a]["__EMPTY_1"],
                  Fecharevision : fecha,
                  Tipomantencion : Tipomantencion,
                  Detalles : datos[a]["__EMPTY_4"],
                  Solicitante : Solicitante,
                  Estado : Estado
                })
              }
            }
            else{
              if (keys[0].toString().includes("AIRE")){
                area = "Aire Acondicionado";
              }
              else if (keys[0].toString().includes("polvo")){
                area = "Colectores de polvo";
              }
              else if (keys[0].toString().includes("ventilación") || datos[0][keys[0]].includes("ventilación") ){
                area = "Ventilación";
                console.log("verdadero");
              }

              var fecha = "";
              for (a = 1 ; a < Object.keys(datos).length ; a++ ){
                let keys = Object.keys(datos[a]);
                if(keys.length < 4){
                  //Hacemos cositas
                  if(keys.length == 3 ){
                    var date = ExcelDateToJSDate(datos[a][keys[0]] )
                    var converted_date = date.toISOString().split('T')[0];

                    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  }
                  if(datos[a][keys[keys.length-1]].toString() == datos[a][keys[keys.length-2]].toString() ){
                    modelo.planmatriz.create({
                      Fecha : fecha,
                      Programado : datos[a][keys[keys.length-2]].toString(),
                      Realizado : datos[a][keys[keys.length-1]].toString(),
                      Area : area
                    })
                  }
                  else{
                    modelo.planmatriz.create({
                      Fecha : fecha,
                      Programado : datos[a][keys[keys.length-2]].toString(),
                      Observaciones : datos[a][keys[keys.length-1]].toString(),
                      Area : area
                    })
                  }
                }
              }
            }
          }
        }
        else{
          //Solo un archivo.
          file = req.files["Matriz"]
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelMatriz(file.name);
          var area ="";
          let keys = Object.keys(datos[0]);

          if(file.name.toString().includes("Consolidado")){
            for(a=1; a< Object.keys(datos).length ; a++){
              var date = ExcelDateToJSDate(datos[a]["__EMPTY_2"])
              //var date = new Date(Math.round((datos[a]["__EMPTY_2"] - (25567 + 1)) * 86400 * 1000));
              var converted_date = date.toISOString().split('T')[0];
              fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
              var Solicitante = "";
              var Tipomantencion = "";
              var Estado = "";
              if(datos[a]["__EMPTY_6"] != undefined){
                Solicitante = datos[a]["__EMPTY_6"]
              }

              if(datos[a]["__EMPTY_3"] != undefined){
                Tipomantencion = datos[a]["__EMPTY_3"]
              }

              if(datos[a]["__EMPTY_7"] != undefined){
                Estado = datos[a]["__EMPTY_7"]
              }

              await modelo.puertas.create({
                Identificacion : datos[a]["__EMPTY"],
                Ubicacion : datos[a]["__EMPTY_1"],
                Fecharevision : fecha,
                Tipomantencion : Tipomantencion,
                Detalles : datos[a]["__EMPTY_4"],
                Solicitante : Solicitante,
                Estado : Estado
              })
            }
          }
          else{
            if (keys[0].toString().includes("AIRE")){
              area = "Aire Acondicionado";
            }
            else if (keys[0].toString().includes("polvo")){
              area = "Colectores de polvo";
            }
            else if (keys[0].toString().includes("ventilación") || datos[0][keys[0]].includes("ventilación") ){
              area = "Ventilación";
              console.log("verdadero");
            }

            var fecha = "";
            var observacion = "";
            for (a = 1 ; a < Object.keys(datos).length ; a++ ){
              let keys = Object.keys(datos[a]);
              console.log(keys)
              if(keys.length < 4){
                //Hacemos cositas
                if(keys.length == 3 ){
                  var date = new Date(Math.round((datos[a][keys[0]] - (25567 + 1)) * 86400 * 1000));
                  var converted_date = date.toISOString().split('T')[0];

                  fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  //fecha = converted_date;  
                }
                if(keys.length==1){
                  await modelo.planmatriz.create({
                    Fecha : fecha,
                    Programado : datos[a][keys[keys.length-1]].toString(),
                    Observaciones : observacion
                  })
                }

                else if(datos[a][keys[keys.length-1]].toString() == datos[a][keys[keys.length-2]].toString() ){
                  await modelo.planmatriz.create({
                    Fecha : fecha,
                    Programado : datos[a][keys[keys.length-2]].toString(),
                    Realizado : datos[a][keys[keys.length-1]].toString(),
                    Area : area
                  })
                }
                else{
                  observacion = datos[a][keys[keys.length-1]].toString();
                  await modelo.planmatriz.create({
                    Fecha : fecha,
                    Programado : datos[a][keys[keys.length-2]].toString(),
                    Observaciones : datos[a][keys[keys.length-1]].toString(),
                    Area : area
                  })
                }
              }
            }
          }
        }
      }
      else if (datos_1[d] == "Disciplina"){
        if (req.files["Disciplina"].length !=undefined){
          for (e=0; e<req.files["Disciplina"].length ; e++){
            //JoinDisciplina(req.files["Disciplina"]);
            file = req.files["Disciplina"][e];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            //[0,1,2,3,4,5,6,7,8,9,10,11,12,13]
            var datos_aux = leerExcelDisciplina(file.name, [0,1,2,3,4,5,6,7,8,9,10,11,12,13])
            var datos = datos_aux[0];
            //console.log(datos);
            for(a=0; a<datos.length; a++){
              for(b=1; b < 6 ; b++){
                llaves = Object.keys(datos[a][b]);
                var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                
                var meta;
                for(c=6; c< datos[a].length; c++){
                  if(datos[a][c][llaves[5]] == "META"){
                    meta = datos[a][c][llaves[6]];
                    break
                  }
                }
                await modelo.disciplina.create({
                  Area : datos_aux[1][a],
                  //Area : datos[a][b][llaves[0]],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_Instalacion : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                  Salida_Instalacion : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                  Inicio_Act_Am : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                  Termino_Act_Am : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                  Almuerzo : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                  Inicio_Act_Pm : convertToHHMM(datos[a][b][llaves[8]]*24).toString(),
                  Termino_Act_Pm : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                  Tiempo_Instalacion : convertToHHMM(datos[a][b]["__EMPTY_8"]*24).toString(),
                  Traslado_Postura : convertToHHMM(datos[a][b]["__EMPTY_9"]*24).toString(),
                  Tiempo_Disponible_Am : convertToHHMM(datos[a][b]["__EMPTY_10"]*24).toString(),
                  Traslado_Colacion : convertToHHMM(datos[a][b]["__EMPTY_11"]*24).toString(),
                  Almuerzo_2 : convertToHHMM(datos[a][b]["__EMPTY_12"]*24).toString(),
                  Tiempo_Disponible_Pm : convertToHHMM(datos[a][b]["__EMPTY_13"]*24).toString(),
                  //Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
                  Meta : convertToHHMM(meta*24).toString()
                })
              }
            }
          }
        }
        else{
            //JoinDisciplina(req.files["Disciplina"]);
            file = req.files["Disciplina"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            //[0,1,2,3,4,5,6,7,8,9,10,11,12,13]
            var datos_aux = leerExcelDisciplina(file.name, [0,1,2,3,4,5,6,7,8,9,10,11,12,13])
            var datos = datos_aux[0];
            //console.log(datos);
            for(a=0; a<datos.length; a++){
              for(b=1; b < 6 ; b++){
                llaves = Object.keys(datos[a][b]);
                var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
                var converted_date = date.toISOString().split('T')[0];
                Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                
                var meta;
                for(c=6; c< datos[a].length; c++){
                  if(datos[a][c][llaves[5]] == "META"){
                    meta = datos[a][c][llaves[6]];
                    break
                  }
                }
                await modelo.disciplina.create({
                  Area : datos_aux[1][a],
                  //Area : datos[a][b][llaves[0]],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_Instalacion : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                  Salida_Instalacion : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                  Inicio_Act_Am : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                  Termino_Act_Am : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                  Almuerzo : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                  Inicio_Act_Pm : convertToHHMM(datos[a][b][llaves[8]]*24).toString(),
                  Termino_Act_Pm : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                  Tiempo_Instalacion : convertToHHMM(datos[a][b]["__EMPTY_8"]*24).toString(),
                  Traslado_Postura : convertToHHMM(datos[a][b]["__EMPTY_9"]*24).toString(),
                  Tiempo_Disponible_Am : convertToHHMM(datos[a][b]["__EMPTY_10"]*24).toString(),
                  Traslado_Colacion : convertToHHMM(datos[a][b]["__EMPTY_11"]*24).toString(),
                  Almuerzo_2 : convertToHHMM(datos[a][b]["__EMPTY_12"]*24).toString(),
                  Tiempo_Disponible_Pm : convertToHHMM(datos[a][b]["__EMPTY_13"]*24).toString(),
                  //Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
                  Meta : convertToHHMM(meta*24).toString()
                })
              }
            }
        }
      }
      else if (datos_1[d] == "Equipos"){
        if (req.files["Equipos"].length !=undefined){
          for (e=0; e<req.files["Equipo"].length ; e++){

          }
        }
        else{
          file = req.files["Equipos"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcel(file.name);
          //console.log(datos[4]["CONTRATO"])
          //console.log(datos[5]["CONTRATO"])
          for(a=0; a < datos.length ; a++){
            var equipo="";
            var patente="";
            var cartola="";
            var ultimamantencionkms="";
            var proxmantkms="";
            var kmactual="";
            var semaforo="";
            var estadoactual="";
            fecha1="";
            if(datos[a]["ULTIMA MANTENCION FECHA"]!=undefined && datos[a]["ULTIMA MANTENCION FECHA"].length>5 ){
              var date1 = ExcelDateToJSDate(datos[a]["ULTIMA MANTENCION FECHA"]);
              var converted_date1 = date1.toISOString().split('T')[0];
              fecha1 = converted_date1.split("-")[2]+"-"+converted_date1.split("-")[1]+"-"+converted_date1.split("-")[0]
            }
            fecha2="";
            if(datos[a]["FECHA CHEQUEO DE GASES"]!=undefined && datos[a]["ULTIMA MANTENCION FECHA"].length>5){
              var date2 = ExcelDateToJSDate(datos[a]["FECHA CHEQUEO DE GASES"]);
              var converted_date2 = date2.toISOString().split('T')[0];
              fecha2 = converted_date2.split("-")[2]+"-"+converted_date2.split("-")[1]+"-"+converted_date2.split("-")[0]
            }
            if(datos[a]["EQUIPO"]!=undefined){
              equipo = datos[a]["EQUIPO"];
            }
            if(datos[a]["PATENTE"]!=undefined){
              patente = datos[a]["PATENTE"];
            }
            if(datos[a]["CARTOLA"]!=undefined){
              cartola = datos[a]["CARTOLA"];
            }
            if(datos[a]["ULTIMA MANTENCION KMS"]!=undefined){
              var str = datos[a]["ULTIMA MANTENCION KMS"].split(" ");
              ultimamantencionkms = str[0]+" "+str[1];
            }
            if(datos[a]["PROXIMA MANT. KMS"]!=undefined){
              proxmantkms = datos[a]["PROXIMA MANT. KMS"]
            }
            if(datos[a]["KILOMETRAJE ACTUAL"]!=undefined){
              kmactual = datos[a]["KILOMETRAJE ACTUAL"];
            }
            if(datos[a]["SEMAFORO"]!=undefined){
              semaforo = datos[a]["SEMAFORO"];
            }
            if(datos[a]["ESTADO ACTUAL"]!=undefined){
              estadoactual = datos[a]["ESTADO ACTUAL"];
            }
            await modelo.equipos.create({
              Equipo : equipo,
              Patente : patente,
              Cartola : cartola,
              Ultimamantencion : fecha1,
              Ultimokms : ultimamantencionkms,
              Proximakms : proxmantkms,
              Kilometrajeactual : kmactual,
              Semaforo : semaforo,
              Estado : estadoactual,
              Fechagas : fecha2
            })
            
          }
        }
      }
      else if (datos_1[d] == "Matrizsap"){
        if (req.files["Matrizsap"].length !=undefined){
          for (e=0; e<req.files["Matrizsap"].length ; e++){

          }
        }
        else{
          file = req.files["Matrizsap"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelSap(file.name)[0];
          var mes = leerExcelSap(file.name)[1];
          for(a=1; a < datos.length ; a++){
            var numpuerta ="";
            var ut ="";
            var arearesponsable ="";
            var prioridad ="";
            var nivel ="";
            var plan ="";
            var orden ="";
            if(datos[a]["__EMPTY_7"] != undefined){
              await modelo.vimosap.create({
                Numpuerta : datos[a]["__EMPTY_1"],
                Ut : datos[a]["__EMPTY_2"],
                Arearesponsable : datos[a]["__EMPTY_3"],
                Prioridad : datos[a]["__EMPTY_4"],
                Nivel : datos[a]["__EMPTY_5"],
                Plan : datos[a]["__EMPTY_6"],
                Orden : datos[a]["__EMPTY_7"],
                Mes : mes
              })
            }






          }


        }

      }
         
    }
    //res.send({redirect :'/dashboard'})
    await res.redirect("dashboard");
    /*modelo.disciplina.findAll({
    }).then(function(rows_disciplina){
      modelo.asistencia.findAll({
      }).then(function(rows_asistencia){
        modelo.brocales.findAll({          
        }).then(function(rows_brocales){
          modelo.planmatriz.findAll({
          }).then(function(rows_matriz){
            return res.redirect("dashboard", {
            totaldisciplina : rows_disciplina,
            totalasistencias : rows_asistencia,
            totalbrocales : rows_brocales,
            totalmatriz : rows_matriz
          })
          });
        })
      })    
    });*/
  },
    
  postCrearusuario : function(req, res, next){
    modelo.usuario.create({
      Usuario : req.body.Usuario,
      Contraseña : req.body.Contrasena,
      Rango : "admin"
    })

    res.redirect("dashboard")
  },

	getPrueba : function (req, res ,next){
    modelo.gantt_tasks.findAll({
    }).then(function(rows){
      var string=JSON.stringify(rows);
      var json=JSON.parse(string);
      console.log(json);
      return res.render("vistaprueba",{
        data : json
      });
    });
 
	},

  getprueba : function (req, res ,next){
    return res.render("probando");

  },

	getPrueba2: function(req,res,next){
		return res.render("vistaprueba2");
	},

	getNuevorequisito : function(req,res,next){
    modelo.requisito.findAll({}).then(function(data){
        var string=JSON.stringify(data);
        var json=JSON.parse(string);
        var nuevosrequerimientos =[]
        for (a = 0 ; a < json.length ; a++){
          var Requirements = [];
          Requirements.nombre = json[a].Nombre;
          Requirements.descripcion = json[a].Descripcion;
          nuevosrequerimientos.push(Requirements);
        }
        console.log("aca presentod cosas");
        console.log(nuevosrequerimientos);
        return res.render("nuevorequisito",{
          RequirementsArrays : data
        });
            
    })    	    
	},

  postNuevorequisito : function(req, res, next){

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    if(month<10){
      moth = "0"+String(month)
    }
    let year = date_ob.getFullYear();
    var date_string = String(year)+"/"+String(month)+"/"+String(date);
    modelo.requisito.create({
      Nombre : req.body.nombrerequisito,
      Descripcion : req.body.descripcion,
      Urgencia : req.body.opcion,
      Fecha_ingreso : date_string,
      Fecha_inicio : "",
      Fecha_termino : "",
      Aceptada : 0
    })
    return res.redirect('/');
  }
  

};

async function Joinplanmatriz(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcel(file.name);
  let keys = Object.keys(datos[0]);
  var area ="";
  
  if(file.name.split(" ")[0].toString() == "Puertas"){
    for(a=0; a < Object.keys(datos).length ; a++){
      let keys = Object.keys(datos[a]);
      var fecha1 ="";
      var fecha2 ="";
      if(keys.length > 1){

        if(parseInt(keys[keys.length-1].toString().split("/")[1]) < 10 || parseInt(keys[keys.length-1].toString().split("/")[0]) < 10){
          if(parseInt(keys[keys.length-1].toString().split("/")[1]) < 10){
            fecha2 = "0"+keys[keys.length-1].toString().split("/")[1];
          }
          else{
            fecha2 = keys[keys.length-1].toString().split("/")[1]
          }
          if(parseInt(keys[keys.length-1].toString().split("/")[0]) < 10){
            fecha1 = "0"+keys[keys.length-1].toString().split("/")[0];
          }
          else{
            fecha1 = keys[keys.length-1].toString().split("/")[0];
          }
        }

        fecha = fecha2+"-"+fecha1+"-"+keys[keys.length-1].toString().split("/")[2];


        modelo.puertas.create({
          Npuerta : datos[a][keys[0]],
          Area : datos[a][keys[1]],
          Tipo : datos[a][keys[2]],
          Nivel : datos[a][keys[3]],
          Ubicacion : datos[a][keys[4]],
          Fecha : fecha,
          Tiempo : datos[a][keys[5]],
        })
      }
    }
  }
  else{
    if (keys[0].toString().includes("AIRE")){
      area = "Aire Acondicionado";
    }
    else if (keys[0].toString().includes("polvo")){
      area = "Colectores de polvo";
    }
    else if (keys[0].toString().includes("ventilación") || datos[0][keys[0]].includes("ventilación") ){
      area = "Ventilación";
      console.log("verdadero");
    }

    var fecha = "";
    for (a = 1 ; a < Object.keys(datos).length ; a++ ){
      let keys = Object.keys(datos[a]);
      if(keys.length < 4){
        //Hacemos cositas
        if(keys.length == 3 ){
          var date = new Date(Math.round((datos[a][keys[0]] - (25567 + 1)) * 86400 * 1000));
          var converted_date = date.toISOString().split('T')[0];

          fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
          //fecha = converted_date;  
        }
        if(datos[a][keys[keys.length-1]].toString() == datos[a][keys[keys.length-2]].toString() ){
          modelo.planmatriz.create({
            Fecha : fecha,
            Programado : datos[a][keys[keys.length-2]].toString(),
            Realizado : datos[a][keys[keys.length-1]].toString(),
            Area : area
          })
        }
        else{
          modelo.planmatriz.create({
            Fecha : fecha,
            Programado : datos[a][keys[keys.length-2]].toString(),
            Observaciones : datos[a][keys[keys.length-1]].toString(),
            Area : area
          })
        }
      }
    }
  }



}

async function JoinAsistencia(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcel(file.name);
  console.log(datos);
  var Sector ="";
  var Nombre = "";
  var Rut = "";
  var Cargo = "";
  var Turno = "";
  var Fechaingreso = "";

  Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
  for(a=1; a < Object.keys(datos).length; a++){
    let keys = Object.keys(datos[0]);
    if(datos[a][keys[0]] != undefined){
      Sector = datos[a][keys[0]]
    }
    if(datos[a][keys[1]] != undefined){
      Nombre = datos[a][keys[1]]
    }
    if(datos[a][keys[2]] != undefined){
      Rut = datos[a][keys[2]]
    }
    if(datos[a][keys[3]] != undefined){
      Cargo = datos[a][keys[3]]
    }
    if(datos[a][keys[4]] != undefined){
      Turno = datos[a][keys[4]]
    }

    await modelo.asistencia.create({
      Sector : Sector,
      Nombre : Nombre,
      Rut : Rut,
      Cargo : Cargo,
      Turno : Turno,
      Fechaingreso : Fechaingreso
    })

  }

  /*let keys = Object.keys(datos[0]);
  var nombre_sector = "sector";
  var fecha = Object.keys(datos[0])[0].split(" ")[1];
  for( a = 1; a < Object.keys(datos).length; a++){
    let keys = Object.keys(datos[a]);
    if(keys.length>5){
      nombre_sector = datos[a][keys[0]];
      modelo.asistencia.create({
        Nombre : datos[a]["__EMPTY"],
        Rut : datos[a]["__EMPTY_1"],
        Cargo : datos[a]["__EMPTY_2"],
        Turno : datos[a]["__EMPTY_3"],
        Sector : nombre_sector,
        Fechaingreso : fecha,
      })
    }
    else{
      modelo.asistencia.create({
        Nombre : datos[a]["__EMPTY"],
        Rut : datos[a]["__EMPTY_1"],
        Cargo : datos[a]["__EMPTY_2"],
        Turno : datos[a]["__EMPTY_3"],
        Sector : nombre_sector,
        Fechaingreso : fecha,
      })
    }
  }*/
}

async function JoinBrocales(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcel(file.name);

  /*modelo.brocales.findAll({
    where : {
      Sub : 7
    }
  }).then(function(rows){
    console.log(rows.length)
  })*/
      //console.log(datos);
      //var date = new Date(Math.round((datos[2]["__EMPTY"] - (25567 + 1)) * 86400 * 1000));
      //var converted_date = date.toISOString().split('T')[0];
      //console.log(converted_date);
  var Fecha = "";
  var Turno = "";
  var Ubicacion = "";
  var Unidad = "";
  var Cantidad = "";
  var Actividad = "";
  var Observaciones = "";
  var Sub = "";
  var Demanda = "";
  var Dotacion = "";
  var Horai = "";
  var Horaf = "";
  var Fecha_aux= "";
  //console.log(datos[3]["LIMPIEZA DE BROCALES FEBRERO 2022"] == null);
  for(a=1; a < Object.keys(datos).length; a++){
    let keys = Object.keys(datos[a]);
    if(datos[a][Object.keys(datos[0])[0]] != undefined){
      console.log(datos[a][Object.keys(datos[0])[0]]);
      var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
      //var date = new Date(Math.round((datos[a][Object.keys(datos[a])[0]] - (25567+1)) * 86400 * 1000));
      var converted_date = date.toISOString().split('T')[0];
      Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
      Fecha_aux = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    }
    if(datos[a]["__EMPTY"] != undefined){
        Turno = datos[a]["__EMPTY"];
    }
    if(datos[a]["__EMPTY_1"] != undefined){
        Dotacion = datos[a]["__EMPTY_1"];
    }
    if(datos[a]["__EMPTY_4"] != undefined){
        Ubicacion = datos[a]["__EMPTY_4"];
    }
    else{
      Ubicacion ="";
    }
    if(datos[a]["__EMPTY_5"] != undefined){
        Demanda = datos[a]["__EMPTY_5"];
    }
    if(datos[a]["__EMPTY_6"] != undefined){
        Horai = convertToHHMM(datos[a]["__EMPTY_6"]).toString()
    }
    else{
      Horai = "0";
    }
    if(datos[a]["__EMPTY_7"] != undefined){
        Horaf = convertToHHMM(datos[a]["__EMPTY_7"]).toString();
    }
    else{
      Horaf = "0";
    }
    if(datos[a]["__EMPTY_10"] != undefined){
        Unidad = datos[a]["__EMPTY_10"];
    }
    if(datos[a]["__EMPTY_11"] != undefined){
        Cantidad = datos[a]["__EMPTY_11"];
      }
    if(datos[a]["__EMPTY_14"] != undefined){
        Actividad = datos[a]["__EMPTY_14"];
    }
    if(datos[a]["__EMPTY_16"] != undefined){
        Observaciones = datos[a]["__EMPTY_16"];
    }
    if(datos[a]["__EMPTY_17"] != undefined){
        Sub = datos[a]["__EMPTY_17"];
    }

    await modelo.brocales.findAll({
      where : {
        Fecha : Fecha,
        Ubicacion : Ubicacion,
        Horai : Horai
      }
    }).then(function(rows){
      if(rows.length==0){
        modelo.brocales.create({
            Fecha : Fecha_aux,
            Turno : Turno,
            Ubicacion : Ubicacion,
            Unidad : Unidad,
            Cantidad : Cantidad,
            Actividad : Actividad,
            Observaciones : Observaciones,
            Sub : Sub,
            Dotacion : Dotacion,
            Demanda : Demanda,
            Horai : Horai,
            Horaf : Horaf
        })
      }

      else{
        console.log("repetido")
      }
    })
    /*modelo.brocales.create({
        Fecha : Fecha,
        Turno : Turno,
        Ubicacion : Ubicacion,
        Unidad : Unidad,
        Cantidad : Cantidad,
        Actividad : Actividad,
        Observaciones : Observaciones,
        Sub : Sub,
        Dotacion : Dotacion,
        Demanda : Demanda,
        Horai : Horai,
        Horaf : Horaf
    })*/
  }
}

async function JoinDisciplina(file){
  const savePath = path.join(__dirname,"../",'public','uploads',file.name);
  await file.mv(savePath);
  var datos = leerExcelDisciplina(file.name, [0,1,2,3,4]);
  
  for(a=0; a<datos.length; a++){
    for(b=1; b < 6 ; b++){
      llaves = Object.keys(datos[a][b]);
      var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
      var converted_date = date.toISOString().split('T')[0];
      Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
      
      var meta;
      for(c=6; c< datos[a].length; c++){
        if(datos[a][c][llaves[5]] == "META"){
          meta = datos[a][c][llaves[6]];
          break
        }
      }
      await modelo.disciplina.create({
        Area : datos[a][b][llaves[0]],
        Dia : datos[a][b][llaves[1]],
        Fecha : Fecha,
        Llegada_Instalacion : minTommss(datos[a][b][llaves[3]]*24).toString(),
        Salida_Instalacion : minTommss(datos[a][b][llaves[4]]*24).toString(),
        Inicio_Act_Am : minTommss(datos[a][b][llaves[5]]*24).toString(),
        Termino_Act_Am : minTommss(datos[a][b][llaves[6]]*24).toString(),
        Almuerzo : minTommss(datos[a][b][llaves[7]]*24).toString(),
        Inicio_Act_Pm : minTommss(datos[a][b][llaves[8]]*24).toString(),
        Termino_Act_Pm : minTommss(datos[a][b][llaves[9]]*24).toString(),
        Tiempo_Instalacion : minTommss(datos[a][b]["__EMPTY_8"]*24).toString(),
        Traslado_Postura : minTommss(datos[a][b]["__EMPTY_9"]*24).toString(),
        Tiempo_Disponible_Am : minTommss(datos[a][b]["__EMPTY_10"]*24).toString(),
        Traslado_Colacion : minTommss(datos[a][b]["__EMPTY_11"]*24).toString(),
        Almuerzo_2 : minTommss(datos[a][b]["__EMPTY_12"]*24).toString(),
        Tiempo_Disponible_Pm : formatDuration(datos[a][b]["__EMPTY_13"]*24).toString(),
        //Tiempo_Disponible_Pm : minTommss(datos[a][b]["__EMPTY_13"]*24).toString(),
        Meta : minTommss(meta*24).toString()
      })
    }
  }


  //console.log(minTommss(datos[1]["8:00"]*24));
  /*modelo.disciplina.create({
    Area : "area",
    Dia : "Dia",
    Fecha : "Fecha",
    Llegada_instalacion : minTommss(datos[1]["8:00"]*24)
  })*/
  
}


  /*for( a = 1; a < Object.keys(datos).length; a++){
    let keys  = Object.keys(datos[a]);
      if(datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"] != null){
        console.log((datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"]));
        var date = new Date(Math.round((datos[a]["LIMPIEZA DE BROCALES FEBRERO 2022"] - (25567 + 1)) * 86400 * 1000));
        console.log(date);
        var converted_date = date.toISOString().split('T')[0];
        Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
      }
      if(datos[a]["__EMPTY"] != null){
        Turno = datos[a]["__EMPTY"];
      }
      if(datos[a]["__EMPTY_1"] != null){
        Ubicacion = datos[a]["__EMPTY_1"];
      }
      if(datos[a]["__EMPTY_2"] != null){
        Unidad = datos[a]["__EMPTY_2"];
      }
      if(datos[a]["__EMPTY_3"] != null){
        Cantidad = datos[a]["__EMPTY_3"];
      }
      if(datos[a]["__EMPTY_4"] != null){
        Actividad = datos[a]["__EMPTY_4"];
      }
      if(datos[a]["__EMPTY_5"] != null){
        Observaciones = datos[a]["__EMPTY_5"];
      }
      if(datos[a]["__EMPTY_6"] != null){
        Sub = datos[a]["__EMPTY_6"];
      }
      modelo.brocales.create({
        Fecha : Fecha,
        Turno : Turno,
        Ubicacion : Ubicacion,
        Unidad : Unidad,
        Cantidad : Cantidad,
        Actividad : Actividad,
        Observaciones : Observaciones,
        Sub : Sub
      })        
  }*/

function ExcelDateToJSDate(serial) {
                 var hours = Math.floor((serial % 1) * 24);
                 var minutes = Math.floor((((serial % 1) * 24) - hours) * 60)
                 return new Date(Date.UTC(0, 0, serial, hours-17, minutes));
        }

function minTommss(minutes){
 var sign = minutes < 0 ? "-" : "";
 var min = Math.floor(Math.abs(minutes));
 var sec = Math.floor((Math.abs(minutes) * 60) % 60);
 return sign + (min < 10 ? "0" : "") + min + ":" + (sec < 10 ? "0" : "") + sec;
}

function convertToHHMM(info) {
  if(isNaN(info) || info > 100){
    return 0+':'+0
  }
  var hrs = parseInt(Number(info));
  var min = Math.round((Number(info)-hrs) * 60);
  return hrs+':'+min;
}

let guid = () => {
    let s4 = () => {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }
    //return id of format 'aaaaaaaa'-'aaaa'-'aaaa'-'aaaa'-'aaaaaaaaaaaa'
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}