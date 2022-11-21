 
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
                  modelo.equipos.findAll({  
                  }).then(function(rows_equipos){
                    modelo.archivos.findAll({  
                    }).then(function(rows_archivos){
                      if(req.user != undefined){
                        console.log("aca estoy")
                        return res.render("dashboard", {
                          totaldisciplina : rows_disciplina,
                          totalasistencias : rows_asistencia,
                          totalbrocales : rows_brocales,
                          totalmatriz : rows_matriz,
                          totalpuertas : rows_puertas,
                          totalusuarios : rows_usuarios,
                          totalequipos : rows_equipos,
                          totalarchivos : rows_archivos,
                          user : req.user,
                          totalsap : rows_vimosap,
                          authmessage : req.flash('authmessage'),
                          info: req.flash('info'),
                          error : req.flash('error'),
                          ingreso : req.flash('ingreso'),
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
                          totalequipos : rows_equipos,
                          totalsap : rows_vimosap,
                          totalarchivos : rows_archivos,
                          user : "notlogged",
                          info: req.flash('info'),
                          authmessage : req.flash('authmessage'),
                          error : req.flash('error'),
                          ingreso : req.flash('ingreso')
                        })
                      }
                    })
                    
                  })                 
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



  getIngreso : function(req,res,next){
    return res.render("ingreso_datos")
  },

  postIngreso : async (req,res,next)=>{
    datos_1 = Object.keys(req.files);
    var random_id = guid();
    var date_today = new Date()
    var converted_date_today = date_today.toISOString().split('T')[0];
    Fecha_hoy = converted_date_today.split("-")[2]+"-"+converted_date_today.split("-")[1]+"-"+converted_date_today.split("-")[0]
    for( d = 0 ; d < Object.keys(req.files).length ; d++){
      if (datos_1[d] == "Asistencia"){
        if (req.files["Asistencia"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Asistencia"].length ; e++){
            try{
              var random_id_asistencia_multiple = guid()
              file = req.files["Asistencia"][e];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcel(file.name);
              var Sector ="";
              var Nombre = "";
              var Rut = "";
              var Cargo = "";
              var Turno = "";
              var Fechaingreso = "";

              await modelo.archivos.create({
                Tabla : "asistencia",
                Idingreso : random_id_asistencia_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Asistencia",
                Nombrearchivo : file.name.toString()
              })

              Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
              console.log(Fechaingreso)
              for(a=1; a < Object.keys(datos).length; a++){ 
                let keys = Object.keys(datos[0]);
                
                if(datos[a][keys[0]] != undefined ){
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
                      Fechaingreso : Fechaingreso,
                      Idingreso : random_id_asistencia_multiple
                    })
                  }
                })
              } 
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_asistencia_multiple
                }
              })

              await modelo.asistencia.destroy({
                where : {
                  Idingreso : random_id_asistencia_multiple
                }
              })
            }

            
          }
        }
        else{
          try{
            file = req.files["Asistencia"]
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcel(file.name);
            var Sector ="";
            var Nombre = "";
            var Rut = "";
            var Cargo = "";
            var Turno = "";
            var Fechaingreso = "";
            var random_id_asistencia_single = guid()
            await modelo.archivos.create({
              Tabla : "asistencia",
              Idingreso : random_id_asistencia_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Asistencia",
              Nombrearchivo : file.name.toString()
            })

            Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
            for(a=1; a < Object.keys(datos).length; a++){ 
              let keys = Object.keys(datos[0]);

              if(datos[a][keys[0]] != undefined ){
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
                      Fechaingreso : Fechaingreso,
                      Idingreso : random_id_asistencia_single
                    })
                  }
                })
              
            } 
          }catch(err){
            req.flash('error', file.name.toString());
            await modelo.asistencia.destroy({
              where : {
                Idingreso : random_id_asistencia_single
              }
            })
            await modelo.archivos.destroy({
              where : {
                idIngreso : random_id_asistencia_single
              }
            })
          }
           
        }
      }
      else if (datos_1[d] == "Brocales5") {
        if (req.files["Brocales5"].length != undefined){
          for(e = 0 ; e < req.files["Brocales5"].length ; e++){
            try{
              var random_id_brocales5_multiple = guid()
              file = req.files["Brocales5"][e];
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
              await modelo.archivos.create({
                Tabla : "brocales",
                Idingreso : random_id_brocales5_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Limpieza de brocales",
                Nombrearchivo : file.name.toString()
              })
              for(a=1; a < Object.keys(datos).length; a++){
                let keys = Object.keys(datos[a]);
                if(datos[a][Object.keys(datos[0])[0]] != undefined){
                  console.log(datos[a][Object.keys(datos[0])[0]]);
                  var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
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
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                  Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Actividad = "";
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Observaciones = "";
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }*/

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
                        Sub : "5",
                        Dotacion : Dotacion,
                        Demanda : Demanda,
                        Horai : Horai,
                        Horaf : Horaf,
                        Uniqueid : id,
                        idIngreso : random_id_brocales5_multiple
                    })
                  }
                })
              }
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.brocales.destroy({
                where :{
                  Idingreso : random_id_brocales5_multiple
                }
              })

              await modelo.archivos.destroy({
                where :{
                  Idingreso : random_id_brocales5_multiple
                }
              })
            }
          }
        }
        else{
          try{
            file = req.files["Brocales5"];
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
            var random_id_brocales5_single = guid()
            await modelo.archivos.create({
              Tabla : "brocales",
              Idingreso : random_id_brocales5_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Limpieza de brocales",
              Nombrearchivo : file.name.toString()
            })
            for(a=1; a < Object.keys(datos).length; a++){
              let keys = Object.keys(datos[a]);
              if(datos[a][Object.keys(datos[0])[0]] != undefined){
                var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
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
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                  Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Actividad = "";
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Observaciones = "";
              }
              /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
              }*/
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
                        Sub : "5",
                        Dotacion : Dotacion,
                        Demanda : Demanda,
                        Horai : Horai,
                        Horaf : Horaf,
                        Uniqueid : id,
                        Idingreso : random_id_brocales5_single
                    })
                  }
                })
              }
            }
          }catch(err){
            req.flash('error', file.name.toString());
            await modelo.brocales.destroy({
              where : {
                Idingreso : random_id_brocales5_single
              }
            })
            await modelo.archivos.destroy({
              where :{
                idIngreso : random_id_brocales5_single
              }
            })
          }
          

        }
      }
      else if (datos_1[d] == "Brocales6") {
        if (req.files["Brocales6"].length != undefined){
          console.log("entré a no undefined");
          for(e = 0 ; e < req.files["Brocales6"].length ; e++){
            try{
              var random_id_brocales6_multiple = guid()
              file = req.files["Brocales6"][e];
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
              var demandaiszero = true
              await modelo.archivos.create({
                Tabla : "brocales",
                Idingreso : random_id_brocales6_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Limpieza de brocales",
                Nombrearchivo : file.name.toString()
              })
              for(a=1; a < Object.keys(datos).length; a++){
                let keys = Object.keys(datos[a]);
                if(datos[a][Object.keys(datos[0])[0]] != undefined){
                  console.log(datos[a][Object.keys(datos[0])[0]]);
                  var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
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
                    demandaiszero = false

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
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                    Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Actividad = "";
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Observaciones = "";
                }
                /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                    Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }*/

                if(Object.keys(datos[a]).length > 1 && demandaiszero != true){
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
                          Sub : "6",
                          Dotacion : Dotacion,
                          Demanda : Demanda,
                          Horai : Horai,
                          Horaf : Horaf,
                          Uniqueid : id,
                          Idingreso : random_id_brocales6_multiple
                      })
                      if (Demanda == 0){
                        demandaiszero = true
                      }
                    }
                  })
                }
              }
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.brocales.destroy({
                where :{
                  Idingreso : random_id_brocales6_multiple
                }
              })

              await modelo.archivos.destroy({
                where :{
                  Idingreso : random_id_brocales6_multiple
                }
              })
            }
          }
        }
        else{
          try{
            file = req.files["Brocales6"];
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
            var random_id_brocales6_single = guid()
            var demandaiszero = true
            await modelo.archivos.create({
              Tabla : "brocales",
              Idingreso : random_id_brocales6_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Limpieza de brocales",
              Nombrearchivo : file.name.toString()
            })
            for(a=1; a < Object.keys(datos).length; a++){
              let keys = Object.keys(datos[a]);
              if(datos[a][Object.keys(datos[0])[0]] != undefined){
                var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
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
                  demandaiszero = false

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
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] != undefined){
                  Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-3]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Actividad = "";
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 Observaciones = "";
              }
              /*if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Sub = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
              }*/
              if(Object.keys(datos[a]).length > 1 && demandaiszero != true){
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
                        Sub : "6",
                        Dotacion : Dotacion,
                        Demanda : Demanda,
                        Horai : Horai,
                        Horaf : Horaf,
                        Uniqueid : id,
                        Idingreso : random_id_brocales6_single
                    })
                    if (Demanda == 0){
                      demandaiszero = true
                    }
                  }
                })
              }
            }
          }catch(err){
            req.flash('error', file.name.toString());
            await modelo.brocales.destroy({
              where : {
                Idingreso : random_id_brocales6_single
              }
            })
            await modelo.archivos.destroy({
              where :{
                idIngreso : random_id_brocales6_single
              }
            })
          }
          

        }
      }
      else if (datos_1[d] == "Matriz"){
        if (req.files["Matriz"].length != undefined){
          for(e = 0 ; e < req.files["Matriz"].length ; e++){
            try{
              file = req.files["Matriz"][e]
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcel(file.name);
              let keys = Object.keys(datos[0]);
              var area ="";
              var random_id_matriz_multiple = guid()
              if(file.name.toString().includes("Consolidado")){
                area = "vimo"
                await modelo.archivos.create({
                  Tabla : "puertas",
                  Idingreso : random_id_matriz_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Puertas vimo",
                  Nombrearchivo : file.name.toString()
                })
              }
              else{
                await modelo.archivos.create({
                  Tabla : "planmatriz",
                  Idingreso : random_id_matriz_multiple,
                  Fechaingreso : Fecha_hoy,
                  Infoingresada : "Plan matriz",
                  Nombrearchivo : file.name.toString()
                })
              }
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
                    Estado : Estado,
                    Idingreso : random_id_matriz_multiple
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
                }

                var fecha = "";
                for (a = 1 ; a < Object.keys(datos).length ; a++ ){

                  let keys = Object.keys(datos[a]);
                  console.log(keys)
                  if(keys.length < 4){
                    if(datos[a][Object.keys(datos[0])[0]]!= undefined && Number.isInteger(datos[a][Object.keys(datos[0])[0]])){
                      var date = ExcelDateToJSDate(datos[a][keys[0]] )
                      var converted_date = date.toISOString().split('T')[0];
                      fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    }
                    if(keys.length==1 || (datos[a]["__EMPTY_1"] == undefined && datos[a]["__EMPTY_2"] == undefined)){
                      await modelo.planmatriz.create({
                        Fecha : fecha,
                        Programado : datos[a]["__EMPTY"],
                        Realizado : datos[a]["__EMPTY_1"],
                        Observaciones : observacion,
                        Area : area,
                        Idingreso : random_id_matriz_multiple
                      })
                    }
                    else{
                      await modelo.planmatriz.create({
                        Fecha : fecha,
                        Programado : datos[a]["__EMPTY"],
                        Realizado : datos[a]["__EMPTY_1"],
                        Observaciones : datos[a]["__EMPTY_2"],
                        Area : area,
                        Idingreso : random_id_matriz_multiple
                      })
                    }
                    observacion =  datos[a]["__EMPTY_2"]
                  }
                }
              }
            }catch(err){
              req.flash('error', file.name.toString());
                if(area=="vimo"){
                await modelo.puertas.destroy({
                  where : {
                    Idingreso : random_id_matriz_single
                  }
                })
              }
              else{
                await modelo.planmatriz.destroy({
                  where : {
                    Idingreso : random_id_matriz_single
                  }
                })
              }
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_matriz_single
                }
              })
            }
          }
        
        }
        else{
          try{
            file = req.files["Matriz"]
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelMatriz(file.name);
            var area ="";
            let keys = Object.keys(datos[0]);
            var random_id_matriz_single = guid()
            if(file.name.toString().includes("Consolidado")){
              area = "vimo"
              await modelo.archivos.create({
                Tabla : "puertas",
                Idingreso : random_id_matriz_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Puertas vimo",
                Nombrearchivo : file.name.toString()
              })
            }
            else{
              await modelo.archivos.create({
                Tabla : "planmatriz",
                Idingreso : random_id_matriz_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Plan matriz",
                Nombrearchivo : file.name.toString()
              })
            }
            

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
                  Estado : Estado,
                  Idingreso : random_id_matriz_single
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
              }

              var fecha = "";
              var observacion = "";
              for (a = 1 ; a < Object.keys(datos).length ; a++ ){
                let keys = Object.keys(datos[a]);
                if(keys.length < 4){
                  //Hacemos cositas
                  if(datos[a][Object.keys(datos[0])[0]]!= undefined && Number.isInteger(datos[a][Object.keys(datos[0])[0]])){
                    var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
                    var converted_date = date.toISOString().split('T')[0];
                    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                  }

                  if(keys.length==1 || (datos[a]["__EMPTY_1"] == undefined && datos[a]["__EMPTY_2"] == undefined)){
                    await modelo.planmatriz.create({
                      Fecha : fecha,
                      Programado : datos[a]["__EMPTY"],
                      Realizado : datos[a]["__EMPTY_1"],
                      Observaciones : observacion,
                      Area : area,
                      Idingreso : random_id_matriz_single
                    })
                  }
                  else{
                    await modelo.planmatriz.create({
                      Fecha : fecha,
                      Programado : datos[a]["__EMPTY"],
                      Realizado : datos[a]["__EMPTY_1"],
                      Observaciones : datos[a]["__EMPTY_2"],
                      Area : area,
                      Idingreso : random_id_matriz_single
                    })
                  }
                  observacion =  datos[a]["__EMPTY_2"]
                }
              }
            }
          }catch(err){
            req.flash('error', file.name.toString());
            if(area=="vimo"){
              await modelo.puertas.destroy({
                where : {
                  Idingreso : random_id_matriz_single
                }
              })
            }
            else{
              await modelo.planmatriz.destroy({
                where : {
                  Idingreso : random_id_matriz_single
                }
              })
            }
            await modelo.archivos.destroy({
              where : {
                Idingreso : random_id_matriz_single
              }
            })
          }
        }
      }
      else if (datos_1[d] == "Disciplina"){
        if (req.files["Disciplina"].length !=undefined){

          for (e=0; e<req.files["Disciplina"].length ; e++){
            var random_id_disciplina_multiple = guid()
            //JoinDisciplina(req.files["Disciplina"]);
            try{
              file = req.files["Disciplina"][e];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              await modelo.archivos.create({
                Tabla : "disciplina",
                Idingreso : random_id_disciplina_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Tiempos de la disciplina operacional",
                Nombrearchivo : file.name.toString()
              })
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
                    Area : datos_aux[1][a].replace(/\s+/g,' ').trim().toUpperCase(),
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
                    Meta : convertToHHMM(meta*24).toString(),
                    Idingreso : random_id_disciplina_multiple
                  })
                }
              }
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_disciplina_multiple
                }
              })
              await modelo.disciplina.destroy({
                where : {
                  Idingreso : random_id_disciplina_multiple
                }
              })
            }
            
          }
        }
        else{
            try{
              var random_id_disciplina_single = guid()
              file = req.files["Disciplina"];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);

              await modelo.archivos.create({
                Tabla : "disciplina",
                Idingreso : random_id_disciplina_single,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Tiempos de la disciplina operacional",
                Nombrearchivo : file.name.toString()
              })
              await file.mv(savePath);
              var datos_aux = leerExcelDisciplina(file.name, [0,1,2,3,4,5,6,7,8,9,10,11,12,13])
              var datos = datos_aux[0];
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
                    Area : datos_aux[1][a].replace(/\s+/g,' ').trim().toUpperCase(),
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
                    Meta : convertToHHMM(meta*24).toString(),
                    Idingreso : random_id_disciplina_single
                  })
                }
              }
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.disciplina.destroy({
                where : {
                  Idingreso : random_id_disciplina_single
                }
              })

              await modelo.archivos.destroy({
                where : {
                  idIngreso : random_id_disciplina_single
                }
              })


            }        
        }
      }
      else if (datos_1[d] == "Equipos"){
        if (req.files["Equipos"].length !=undefined){
          for (e=0; e<req.files["Equipo"].length ; e++){
            var random_id_equipos_multiple = guid()
            try{
              file = req.files["Equipos"];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              var datos = leerExcel(file.name);
              modelo.archivos.create({
                Tabla : "equipos",
                Idingreso : random_id_equipos_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Datos de equipos y camionetas",
                Nombrearchivo : file.name.toString()
              })
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
                if(datos[a]["ULTIMA MANTENCION FECHA"]!=undefined && Number.isInteger(datos[a]["ULTIMA MANTENCION FECHA"]) ){
                  var date1 = ExcelDateToJSDate(datos[a]["ULTIMA MANTENCION FECHA"]);
                  var converted_date1 = date1.toISOString().split('T')[0];
                  fecha1 = converted_date1.split("-")[2]+"-"+converted_date1.split("-")[1]+"-"+converted_date1.split("-")[0]
                }
                fecha2="";
                if(datos[a]["FECHA CHEQUEO DE GASES "]!=undefined && Number.isInteger(datos[a]["FECHA CHEQUEO DE GASES "])){
                  var date2 = ExcelDateToJSDate(datos[a]["FECHA CHEQUEO DE GASES "]);
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
                if(datos[a]["KILOMETRAJE ACTUAL "]!=undefined){
                  kmactual = datos[a]["KILOMETRAJE ACTUAL "];
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
                  Fechagas : fecha2,
                  Idingreso : random_id_equipos_multiple
                })
                
              }
            }
            catch(err){
              console.error(err);
              req.flash('error', file.name.toString());
              await modelo.equipos.destroy({
                where :{
                  Idingreso : random_id_equipos_multiple
                }
              })
              await modelo.archivos.destroy({
                where : {
                  Idingreso : random_id_equipos_multiple
                }
              })
            }

          }
        }
        else{
          try{
            var random_id_equipos_single = guid()
            file = req.files["Equipos"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcel(file.name);
            modelo.archivos.create({
              Tabla : "equipos",
              Idingreso : random_id_equipos_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Datos de equipos y camionetas",
              Nombrearchivo : file.name.toString()
            })
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
              if(datos[a]["ULTIMA MANTENCION FECHA"]!=undefined && Number.isInteger(datos[a]["ULTIMA MANTENCION FECHA"]) ){
                var date1 = ExcelDateToJSDate(datos[a]["ULTIMA MANTENCION FECHA"]);
                var converted_date1 = date1.toISOString().split('T')[0];
                fecha1 = converted_date1.split("-")[2]+"-"+converted_date1.split("-")[1]+"-"+converted_date1.split("-")[0]
              }
              fecha2="";
              if(datos[a]["FECHA CHEQUEO DE GASES "]!=undefined && Number.isInteger(datos[a]["FECHA CHEQUEO DE GASES "])){
                var date2 = ExcelDateToJSDate(datos[a]["FECHA CHEQUEO DE GASES "]);
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
              if(datos[a]["KILOMETRAJE ACTUAL "]!=undefined){
                kmactual = datos[a]["KILOMETRAJE ACTUAL "];
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
                Fechagas : fecha2,
                Idingreso : random_id_equipos_single
              })
              
            }
          }
          catch(err){
            console.error(err);
            req.flash('error', file.name.toString());
            await modelo.equipos.destroy({
              where :{
                Idingreso : random_id_equipos_single
              }
            })
            await modelo.archivos.destroy({
              where : {
                Idingreso : random_id_equipos_single
              }
            })
          }
          
        }
      }
      else if (datos_1[d] == "Matrizsap"){
        if (req.files["Matrizsap"].length !=undefined){
          //Varios documentos
          for (e=0; e<req.files["Matrizsap"].length ; e++){
            var random_id_vimosap_multiple = guid()
            try{
              file = req.files["Matrizsap"][e];
              const savePath = path.join(__dirname,"../",'public','uploads',file.name);
              await file.mv(savePath);
              await modelo.archivos.create({
                Tabla : "vimosap",
                Idingreso : random_id_vimosap_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Planificacion de puertas vimo" ,
                Nombrearchivo : file.name.toString()
              })
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
                if(datos[a]["__EMPTY_1"] != undefined || datos[a]["N° PUERTA"] != undefined){
                  if(datos[a]["__EMPTY_1"] != undefined){
                    numpuerta = datos[a]["__EMPTY_1"]
                  }
                  else{
                    numpuerta = datos[a]["N° PUERTA"]
                  }
                }
                if(datos[a]["__EMPTY_2"] != undefined || datos[a]["UT"] != undefined){
                  if(datos[a]["__EMPTY_2"] != undefined){
                    ut = datos[a]["__EMPTY_2"]
                  }
                  else{
                    ut = datos[a]["UT"]
                  }
                }
                if(datos[a]["__EMPTY_3"] != undefined || datos[a]["ÁREA RESPONSABLE"] != undefined){
                  if(datos[a]["__EMPTY_3"] != undefined){
                    arearesponsable = datos[a]["__EMPTY_3"]
                  }
                  else{
                    arearesponsable = datos[a]["ÁREA RESPONSABLE"]
                  }
                }
                if(datos[a]["__EMPTY_4"] != undefined || datos[a]["PRIORIDAD"] != undefined){
                  if(datos[a]["__EMPTY_4"] != undefined){
                    prioridad = datos[a]["__EMPTY_4"]
                  }
                  else{
                    prioridad = datos[a]["PRIORIDAD"]
                  }
                }
                if(datos[a]["__EMPTY_5"] != undefined || datos[a]["NIVEL"] != undefined){
                  if(datos[a]["__EMPTY_5"] != undefined){
                    nivel = datos[a]["__EMPTY_5"]
                  }
                  else{
                    nivel = datos[a]["NIVEL"]
                  }
                }
                if(datos[a]["__EMPTY_6"] != undefined || datos[a]["Plan "] != undefined){
                  if(datos[a]["__EMPTY_6"] != undefined){
                    plan = datos[a]["__EMPTY_6"]
                  }
                  else{
                    plan = datos[a]["Plan "]
                  }
                }
                if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined){
                  if(datos[a]["__EMPTY_7"] != undefined){
                    orden = datos[a]["__EMPTY_7"]
                  }
                  else{
                    orden = datos[a]["Orden"]
                  }
                }
                if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined ){
                  await modelo.vimosap.create({
                    Numpuerta : numpuerta,
                    Ut : ut,
                    Arearesponsable : arearesponsable,
                    Prioridad : prioridad,
                    Nivel : nivel,
                    Plan : plan,
                    Orden : orden,
                    Mes : mes,
                    Idingreso : random_id_vimosap_multiple
                  })
                }
                /*if(datos[a]["__EMPTY_7"] != undefined){
                  await modelo.vimosap.create({
                    Numpuerta : numpuerta,
                    Ut : ut,
                    Arearesponsable : arearesponsable,
                    Prioridad : prioridad,
                    Nivel : nivel,
                    Plan : plan,
                    Orden : orden,
                    Mes : mes
                  })
                }*/
              }
            }catch(err){
              req.flash('error', file.name.toString());
              await modelo.vimosap.destroy({
                where :{
                  Idingreso : random_id_vimosap_multiple
                }
              })

              await modelo.archivos.destroy({
                where : 
                {
                  Idingreso : random_id_vimosap_multiple
                }
              })
            }
            
          }
        }
        else{
          //Un documento
          try{
            var random_id_vimosap_single = guid();
            file = req.files["Matrizsap"];
            const savePath = path.join(__dirname,"../",'public','uploads',file.name);
            await file.mv(savePath);
            var datos = leerExcelSap(file.name)[0];
            var mes = leerExcelSap(file.name)[1];
            await modelo.archivos.create({
              Tabla : "vimosap",
              Idingreso : random_id_vimosap_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Planificacion de puertas vimo",
              Nombrearchivo : file.name.toString() 
            })
            for(a=1; a < datos.length ; a++){
              var numpuerta ="";
              var ut ="";
              var arearesponsable ="";
              var prioridad ="";
              var nivel ="";
              var plan ="";
              var orden ="";
              if(datos[a]["__EMPTY_1"] != undefined || datos[a]["N° PUERTA"] != undefined){
                if(datos[a]["__EMPTY_1"] != undefined){
                  numpuerta = datos[a]["__EMPTY_1"]
                }
                else{
                  numpuerta = datos[a]["N° PUERTA"]
                }
              }
              if(datos[a]["__EMPTY_2"] != undefined || datos[a]["UT"] != undefined){
                if(datos[a]["__EMPTY_2"] != undefined){
                  ut = datos[a]["__EMPTY_2"]
                }
                else{
                  ut = datos[a]["UT"]
                }
              }
              if(datos[a]["__EMPTY_3"] != undefined || datos[a]["ÁREA RESPONSABLE"] != undefined){
                if(datos[a]["__EMPTY_3"] != undefined){
                  arearesponsable = datos[a]["__EMPTY_3"]
                }
                else{
                  arearesponsable = datos[a]["ÁREA RESPONSABLE"]
                }
              }
              if(datos[a]["__EMPTY_4"] != undefined || datos[a]["PRIORIDAD"] != undefined){
                if(datos[a]["__EMPTY_4"] != undefined){
                  prioridad = datos[a]["__EMPTY_4"]
                }
                else{
                  prioridad = datos[a]["PRIORIDAD"]
                }
              }
              if(datos[a]["__EMPTY_5"] != undefined || datos[a]["NIVEL"] != undefined){
                if(datos[a]["__EMPTY_5"] != undefined){
                  nivel = datos[a]["__EMPTY_5"]
                }
                else{
                  nivel = datos[a]["NIVEL"]
                }
              }
              if(datos[a]["__EMPTY_6"] != undefined || datos[a]["Plan "] != undefined){
                if(datos[a]["__EMPTY_6"] != undefined){
                  plan = datos[a]["__EMPTY_6"]
                }
                else{
                  plan = datos[a]["Plan "]
                }
              }
              if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined){
                if(datos[a]["__EMPTY_7"] != undefined){
                  orden = datos[a]["__EMPTY_7"]
                }
                else{
                  orden = datos[a]["Orden"]
                }
              }
              if(datos[a]["__EMPTY_7"] != undefined || datos[a]["Orden"] != undefined ){
                await modelo.vimosap.create({
                  Numpuerta : numpuerta,
                  Ut : ut,
                  Arearesponsable : arearesponsable,
                  Prioridad : prioridad,
                  Nivel : nivel,
                  Plan : plan,
                  Orden : orden,
                  Mes : mes,
                  Idingreso : random_id_vimosap_single
                })
              }
            }
          }catch(err){
            req.flash('error', file.name.toString());
            await modelo.archivos.destroy({
              where : {
                Tabla : "vimosap",
                Idingreso : random_id_vimosap_single
              }
            })

            await modelo.vimosap.destroy({
              where : {
                Idingreso : random_id_vimosap_single
              }
            })
          }
        }

      }
         
    }
    //res.send({redirect :'/dashboard'})
    req.flash('ingreso', 'Archivos ingreados')
    await res.redirect("dashboard");
  },
    
  postCrearusuario : async (req, res, next)=>{
    await modelo.usuario.findAll({
      where:
      {
        Usuario : req.body.Usuario
      }
    }).then(async function(rows_usuarios){
      if(rows_usuarios.length ==0){
        await modelo.usuario.findAll({
          where:{
            Contraseña : req.body.Contrasena
          }
        }).then(async function(rows_usuario2){
          if(rows_usuario2.length==0){
            await modelo.usuario.create({
              Usuario : req.body.Usuario,
              Contraseña : req.body.Contrasena,
              Rango : req.body.gridRadios
            })
            req.flash('info', 'Se ha registrado correctamente');
          }
          else{
            req.flash('info', 'Usuario o Contraseña ya existen');
          }
        })
      }
      else{
        req.flash('info', 'Usuario o Contraseña ya existen');
      }
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

	
  

};



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