 
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

function leerExcelTrabajos(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[workbooksheet.length-1];
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

function leerExcelDisciplinatraspaso(ruta, archivos){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var disciplina_sheets=[];
  var array_name = [];
  var nombres = [];
  for(a=0; a< 5 ; a++){
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

function leerExcelTraspaso(ruta){
  /*const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var array_datos = []
  for(a=0; a < workbooksheet.length ; a++){
    const sheet  = workbooksheet[a];
    const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
    array_datos.push(dataExcel)
  }
  
  return array_datos;*/
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

function leerPOD(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  var datos_pod = [];
  const sheet_1 = workbooksheet[0];
  const dataExcel_1 = reader.utils.sheet_to_json(workbook.Sheets[sheet_1]);
  const sheet_2 = workbooksheet[2];
  const dataExcel_2 = reader.utils.sheet_to_json(workbook.Sheets[sheet_2]);
  datos_pod.push(dataExcel_1)
  datos_pod.push(dataExcel_2)
  return datos_pod
}

function leerExcelAsistenciaTraspaso(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[2];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

function leerExcelPautaTraspaso(ruta){
  const workbook = reader.readFile(path.join(__dirname,"../",'public','uploads',ruta));
  const workbooksheet = workbook.SheetNames;
  const sheet  = workbooksheet[0];
  const dataExcel = reader.utils.sheet_to_json(workbook.Sheets[sheet]);
  return dataExcel; 
}

async function getData() {
  try {
    const [rows_brocales, rows_asistencia, rows_disciplina, rows_matriz, rows_puertas, rows_usuarios, rows_vimosap, rows_equipos, rows_archivos, rows_trabajos, rows_disciplina_traspaso, rows_pauta_diaria, rows_asistencia_traspaso] = await Promise.all([
      modelo.brocales.findAll({}),
      modelo.asistencia.findAll({}),
      modelo.disciplina.findAll({}),
      modelo.planmatriz.findAll({}),
      modelo.puertas.findAll({}),
      modelo.usuario.findAll({}),
      modelo.vimosap.findAll({}),
      modelo.equipos.findAll({}),
      modelo.archivos.findAll({}),
      modelo.trabajos.findAll({}),
      modelo.disciplina_traspaso.findAll({}),
      modelo.pauta_diaria.findAll({}),
      modelo.asistencia_traspaso.findAll({})
    ]);
    
    const data = {
      totaldisciplina: rows_disciplina,
      totalasistencias: rows_asistencia,
      totalbrocales: rows_brocales,
      totalmatriz: rows_matriz,
      totalpuertas: rows_puertas,
      totalusuarios: rows_usuarios,
      totalequipos: rows_equipos,
      totalarchivos: rows_archivos,
      totaltrabajos: rows_trabajos,
      totaldisciplinatraspaso: rows_disciplina_traspaso,
      totalsap: rows_vimosap,
      totalpautadiaria: rows_pauta_diaria,
      totalasistenciatraspaso : rows_asistencia_traspaso
    };
    
    
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}


module.exports = {

  postLogin : function(req, res, next){
    console.log("Req session")
    console.log(req.session)
    console.log("Termino Req session")
    modelo.usuario.findAll({
      where:{
        usuario : req.body.username
      }
    }).then(function(rows_usuarios_aux){
      if(req.body.password == rows_usuarios_aux[0].Contraseña){
        console.log("Usuario verificado")
        req.session.user_id = rows_usuarios_aux[0]
        req.session.save()

        return res.redirect('/dashboard');
      }
      else{
        console.log("No verificado")
        req.flash('authmessage', 'Usuario o contraseña incorrecta')
        return res.redirect('/dashboard'); 
      }
    })
    
  },

  logout : function(req,res,next){
    req.session.destroy();
    //req.logout();
    res.redirect('/dashboard');
  },
  getDashboardtest : function(req, res, next){
    return res.render('dashboardtest');
  },

  getLogin : function(req, res, next){
    return res.render('login');
  },

  getinicio2 : function(req, res, next){
    return res.render('dashboard')
  },

  getdashboard : async (req,res,next)=>{
    try {
      const data = await getData();
      data.authmessage = req.flash('authmessage')
      data.info = req.flash('info')
      data.error = req.flash('error')
      data.ingreso = req.flash('ingreso')

      if (req.session.user_id != undefined) {
        data.user = req.session.user_id;
      } else {
        data.user = "notlogged";
      }
      console.log(req.session)
      return res.render("dashboard", data);
    } catch (error) {
      console.error(error);
      res.status(500).send("Internal Server Error");
    }

  /*getdashboard : function(req, res, next){
    
    
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
                      modelo.trabajos.findAll({
                      }).then(function(rows_trabajos){
                        modelo.disciplina_traspaso.findAll({  
                        }).then(function(rows_disciplina_traspaso){
                          console.log("espera")
                          setTimeout(() => {  console.log(req.user); }, 3000);
                          
                          if(req.user != undefined){
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
                              totaltrabajos : rows_trabajos,
                              totaldisciplinatraspaso : rows_disciplina_traspaso,
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
                              totaltrabajos : rows_trabajos,
                              totaldisciplinatraspaso : rows_disciplina_traspaso,
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
              })
              
            })
          });
        })
      })    
    });*/
    
  },

  getTutorial : function(req, res, next){
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
                        return res.render("dashboardtutorial", {
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
                        return res.render("dashboardtutorial", {
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
              
              var Fechaingreso = "";

              await modelo.archivos.create({
                Tabla : "asistencia",
                Idingreso : random_id_asistencia_multiple,
                Fechaingreso : Fecha_hoy,
                Infoingresada : "Asistencia",
                Nombrearchivo : file.name.toString()
              })

              Fechaingreso = Object.keys(datos[0])[0].split(" ")[Object.keys(datos[0])[0].split(" ").length-1];
              for(a=1; a < Object.keys(datos).length; a++){
                var Turno = ""; 
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
            var Fechaingreso = "";
            var random_id_asistencia_single = guid()
            console.log(datos)
            await modelo.archivos.create({
              Tabla : "asistencia",
              Idingreso : random_id_asistencia_single,
              Fechaingreso : Fecha_hoy,
              Infoingresada : "Asistencia",
              Nombrearchivo : file.name.toString()
            })
            Fechaingreso = Object.keys(datos[0])[0].replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Object.keys(datos[0])[0].replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1];
            columnafecha = Fechaingreso.split("-")[0]+"-"+Object.keys(datos[2])[4].split("-")[1]
            /*for(a=1; a < Object.keys(datos).length; a++){ 
              let keys = Object.keys(datos[0]);
              var Turno = " ";

              if(datos[a][Object.keys(datos[0])[0]] != undefined ){
                Sector = datos[a][keys[0]]
              }
              if(datos[a]["__EMPTY"] != undefined){
                Nombre = datos[a]["__EMPTY"]
              }
              if(datos[a]["__EMPTY_1"] != undefined){
                Rut = datos[a]["__EMPTY_1"]
              }
              if(datos[a]["__EMPTY_2"] != undefined){
                Cargo = datos[a]["__EMPTY_2"]
              }
              if(datos[a][columnafecha] != undefined){
                Turno = datos[a][columnafecha]
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
              
            }*/
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
            console.log(err)
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
              var demandaiszero = true
              var miniretro ="";
              var levante = "";
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
                if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                  demandaiszero=true
                }
                if(datos[a]["__EMPTY_5"] != undefined){
                    demandaiszero = false
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
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]] != undefined){
                  miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  miniretro = "";
                }


                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] != undefined){
                  levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   levante = "";
                }

                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] != undefined){
                  Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Actividad = "";
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] != undefined){
                  Observaciones = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-1]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                   Observaciones = "";
                }

                

                if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
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
                          Idingreso : random_id_brocales5_multiple,
                          Miniretro : miniretro,
                          Levante : levante
                      })     
                    }
                    if (Demanda == 0 ){
                        demandaiszero = true
                    }
                  })
                }
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
            var miniretro = "";
            var levante = "";

            var demandaiszero = true
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
              if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                demandaiszero=true
              }
              if(datos[a]["__EMPTY_5"] != undefined){
                  demandaiszero = false
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

              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]] != undefined){
                miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-7]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                miniretro = "";
              }


              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] != undefined){
                levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-4]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                 levante = "";
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] != undefined){
                  Actividad = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-10]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
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
              if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
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
                        Idingreso : random_id_brocales5_single,
                        Miniretro : miniretro,
                        Levante : levante
                    })     
                  }
                  if (Demanda == 0 ){
                      demandaiszero = true
                  }
                })
              }
            }
          }catch(err){
            req.flash('error', file.name.toString());
            console.log(err)
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
              var levante = "";
              var miniretro = "";
              var demandaiszero = true
              var idminiretro =""
              var idlevante = ""
              if(file.name.toString().includes("pilar norte")){
                idminiretro = 3
                idlevante = 3
              }
              else{
                idlevante = 11
                idminiretro = 8
              }
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
                if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                  demandaiszero=true
                }
                if(datos[a]["__EMPTY_4"] != undefined){
                    Ubicacion = datos[a]["__EMPTY_4"];
                }
                else{
                  Ubicacion ="";
                }
                if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                  demandaiszero=true
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
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] != undefined){
                  miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  miniretro = "";
                }

                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] != undefined){
                  levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]];
                }
                if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                  levante = "";
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

                if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
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
                          Idingreso : random_id_brocales6_multiple,
                          Miniretro : miniretro,
                          Levante : levante
                      })     
                    }
                    if (Demanda == 0 ){
                        demandaiszero = true
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
            var nadaqueagregar = false
            var levante = "";
            var miniretro = "";
            var idminiretro= ""
            var idlevante = ""
            if(file.name.toString().includes("pilar norte")){
              idminiretro = 3
              idlevante = 3
            }
            else{
              idlevante = 11
              idminiretro = 8
            }
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
              if(datos[a]["__EMPTY_4"] == undefined && demandaiszero==false){
                demandaiszero=true
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

              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] != undefined){
                miniretro = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idminiretro]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                miniretro = "";
              }

              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] != undefined){
                levante = datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]];
              }
              if(datos[a][Object.keys(datos[0])[Object.keys(datos[0]).length-idlevante]] == undefined && datos[a][Object.keys(datos[0])[0]] != undefined){
                levante = "";
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
              /*if(datos[a]["__EMPTY"] == undefined && datos[a]["__EMPTY_1"] == undefined &&datos[a]["__EMPTY_2"] == undefined && datos[a]["__EMPTY_3"] == undefined && datos[a]["__EMPTY_4"] == undefined datos[a]["__EMPTY_5"] == undefined ){
                nadaqueagregar = true
              }*/

              if((Object.keys(datos[a]).length > 1 && demandaiszero != true) || datos[a][Object.keys(datos[0])[0]] != undefined){
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
                        Idingreso : random_id_brocales6_single,
                        Miniretro : miniretro,
                        Levante : levante
                    })     
                  }
                  if (Demanda == 0 ){
                      demandaiszero = true
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

                  await modelo.puertas.findAll({
                    where:{
                      Identificacion : datos[a]["__EMPTY"],
                      Fecharevision : fecha
                    }
                  }).then(async function(rows_copias){
                    if(rows_copias.length==0){
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
                  console.log(datos[a])
                  console.log(keys)
                  
                  if(keys.length < 4){
                    if(datos[a][Object.keys(datos[0])[0]]!= undefined && Number.isInteger(datos[a][Object.keys(datos[0])[0]])){
                      var date = ExcelDateToJSDate(datos[a][keys[0]] )
                      var converted_date = date.toISOString().split('T')[0];
                      fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]
                    }
                    console.log(fecha)
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
                await modelo.puertas.findAll({
                  where:{
                    Identificacion : datos[a]["__EMPTY"],
                    Fecharevision : fecha
                  }
                  }).then(async function(rows_copias){
                    if(rows_copias.length==0){
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
                  
                  var meta=0;
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
                  
                  var meta=0;
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
      else if(datos_1[d] == "Trabajos"){
        try{
          var random_id_trabajo_single = guid();
          file = req.files["Trabajos"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelTrabajos(file.name);
          console.log(datos)
          await modelo.archivos.create({
            Tabla : "Trabajos",
            Idingreso : random_id_trabajo_single,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "Trabajos realizados",
            Nombrearchivo : file.name.toString() 
          })
          var Fecha = ""
          var Turno = ""
          var Dotacion = ""
          var JdtDet = ""
          var JdtMies = ""
          var Ubicacion = ""
          var Actividad = ""
          var Horometrolevante = ""
          var Estadolevante = ""
          var Estadolevante_x = ""
          var Horometromini = ""
          var Estadominiretro = ""
          var Estadominiretro_x = ""
          var Horometrominicargador = ""
          var Minicargador = ""
          var Minicargador_x=""
          var Observaciones = ""
          for(a=1; a < datos.length ; a++){
            if(datos[a][Object.keys(datos[0])[0]] != undefined){
              var date = ExcelDateToJSDate(datos[a][Object.keys(datos[0])[0]])
              var converted_date = date.toISOString().split('T')[0];
              Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
            }
            if(datos[a]["__EMPTY"] != undefined){
              Turno = datos[a]["__EMPTY"]
            }
            if (datos[a]["__EMPTY_1"] != undefined){
              Dotacion = datos[a]["__EMPTY_1"]
            }
            if(datos[a]["__EMPTY_2"] != undefined){
              JdtDet = datos[a]["__EMPTY_2"]
            }
            if(datos[a]["__EMPTY_3"] != undefined){
              JdtMies = datos[a]["__EMPTY_3"]
            }
            if(datos[a]["__EMPTY_4"] != undefined){
              Ubicacion = datos[a]["__EMPTY_4"]
            }
            if(datos[a]["__EMPTY_5"] != undefined){
              Actividad = datos[a]["__EMPTY_5"]
            }
            if(datos[a]["__EMPTY_6"] != undefined){
              Horometrolevante = datos[a]["__EMPTY_6"]
            }
            if (datos[a]["__EMPTY_7"] != undefined){
              Estadolevante = datos[a]["__EMPTY_7"]
              if(Estadolevante.toString().includes("NO") || Estadolevante.toString().includes("FUERA") || Estadolevante.toString().includes("F/S") ){
                Estadolevante_x = "FUERA DE SERVICIO"
              }
              else{
                Estadolevante_x = "OPERATIVA"
              }
            }
            if (datos[a]["__EMPTY_8"] != undefined){
              Horometromini = datos[a]["__EMPTY_8"]
            }
            if(datos[a]["__EMPTY_9"] != undefined){
              Estadominiretro = datos[a]["__EMPTY_9"]
              if(Estadominiretro.toString().includes("NO") || Estadominiretro.toString().includes("FUERA") || Estadominiretro.toString().includes("F/S") ){
                Estadominiretro_x = "FUERA DE SERVICIO"
              }
              else{
                Estadominiretro_x = "OPERATIVA"
              }
            }
            if(datos[a]["__EMPTY_10"] != undefined){
              Horometrominicargador = datos[a]["__EMPTY_10"]
            }
            if(datos[a]["__EMPTY_11"] != undefined){
              Minicargador = datos[a]["__EMPTY_11"]
              if(Minicargador.toString().includes("NO") || Minicargador.toString().includes("FUERA") || Minicargador.toString().includes("F/S")){
                Minicargador_x = "FUERA DE SERVICIO"
              }
              else{
                Minicargador_x = "OPERATIVA"
              }
            }
            if(datos[a]["__EMPTY_12"] != undefined){
              Observaciones = datos[a]["__EMPTY_12"]
            }


            await modelo.trabajos.findAll({
              where:{
                Fecha : Fecha,
                Ubicacion : Ubicacion,
                Actividad : Actividad
              }
            }).then(async function(rows_copias){
              if(rows_copias.length < 1){
                await modelo.trabajos.create({
                  Fecha : Fecha,
                  Turno : Turno,
                  Dotacion : Dotacion,
                  JdtDet : JdtDet,
                  JdtMies : JdtMies,
                  Ubicacion : Ubicacion,
                  Actividad : Actividad,
                  Horometrolevante : Horometrolevante,
                  Estadolevante : Estadolevante,
                  Horometromini : Horometromini,
                  Estadominiretro : Estadominiretro,
                  Horometrominicargador : Horometrominicargador,
                  Minicargador : Minicargador,
                  Observaciones : Observaciones,
                  Idingreso : random_id_trabajo_single
                })
              }
              else{
                console.log("no pasa nada")
              }
            })

            if (datos[a]["__EMPTY_1"] != undefined){
              await modelo.equipos.findAll({
                where:{
                  Patente : Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1]
                }
              }).then(async function(rows_levante){
                if(rows_levante.length>0){
                  await modelo.equipos.update({
                    Estado : Estadolevante_x,
                    Idingreso : random_id_trabajo_single
                  },{
                    where :{
                      Patente : Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1]
                    }
                  })
                }
                else{
                  await modelo.equipos.create({
                    Patente : Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadolevante.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1],
                    Equipo : "Levante",
                    Estado : Estadolevante_x,
                    Idingreso : random_id_trabajo_single
                  })
                }
              })
              await modelo.equipos.findAll({
                where:{
                  Patente : Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1]
                }
              }).then(async function(rows_miniretro){
                if(rows_miniretro.length>0){
                  await modelo.equipos.update({
                    Estado : Estadominiretro_x,
                    Idingreso : random_id_trabajo_single
                  },{
                    where :{
                      Patente : Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1]
                    }
                  })
                }
                else{
                  await modelo.equipos.create({
                    Patente : Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Estadominiretro.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1],
                    Equipo : "Mini Retro",
                    Estado : Estadominiretro_x,
                    Idingreso : random_id_trabajo_single
                  })
                }
              })
              //Minicargador.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Minicargador.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1]
              await modelo.equipos.findAll({
                where:{
                  Patente : "T-40"
                }
              }).then(async function(rows_minicargador){
                if(rows_minicargador.length>0){
                  await modelo.equipos.update({
                    Estado : Minicargador_x,
                    Idingreso : random_id_trabajo_single
                  },{
                    where :{
                      Patente : "T-40"
                    }
                  })
                }
                else{
                  await modelo.equipos.create({
                    Patente : Minicargador.replace(/\s+/g,' ').trim().toUpperCase().split(" ")[Minicargador.replace(/\s+/g,' ').trim().toUpperCase().split(" ").length-1],
                    Equipo : "Mini Cargador",
                    Estado : Minicargador_x,
                    Idingreso : random_id_trabajo_single
                  })
                }
              })
            }
            
          }
        }catch(err){
          req.flash('error', file.name.toString());
          console.log(err)
          await modelo.archivos.destroy({
            where : {
              Tabla : "Trabajos",
              Idingreso : random_id_trabajo_single
            }
          })

          await modelo.trabajos.destroy({
            where : {
              Idingreso : random_id_trabajo_single
            }
          })
        }
      }
      else if(datos_1[d] == "Workpad"){
        try{
          file = req.files["Workpad"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelTraspaso(file.name);
          var random_id_workpad_single = guid();
          await modelo.archivos.create({
            Tabla : "workpad",
            Idingreso : random_id_workpad_single,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "Workpad",
            Nombrearchivo : file.name.toString() 
          })
          var Tipo = "";
          for(a=6;a < datos.length; a++){
            
            var Actividad = "";
            var Ejecutor = "";
            var HrsProg = "";
            var HrsProgTotal = "";
            var LunesTa = "";
            var LunesTb = "";
            var LunesTotal = ""
            var MartesTa = "";
            var MartesTb = "";
            var MartesTotal =""
            var MiercolesTa = "";
            var MiercolesTb = "";
            var MiercolesTotal = "";
            var JuevesTa = "";
            var JuevesTb = "";
            var JuevesTotal = "";
            var ViernesTa = "";
            var ViernesTb = "";
            var ViernesTotal = "";
            var SabadoTa = "";
            var SabadoTb = "";
            var SabadoTotal = "";
            var DomingoTa = "";
            var DomingoTb = "";
            var DomingoTotal= "";
            var Aviso = "";
            var Orden = "";
            var sendData = false
            if(datos[a]["__EMPTY_1"] == "LOCO" || datos[a]["__EMPTY_1"] == "CARROS" || datos[a]["__EMPTY_1"] == "LIMPIA VIAS" || datos[a]["__EMPTY_1"] == "IRWIN" || datos[a]["__EMPTY_1"] == "TRENES" || datos[a]["__EMPTY_1"] == "ALUMBRADO" || datos[a]["__EMPTY_1"] == "Automatiación" || datos[a]["__EMPTY_1"] == "VIAS DE FFFCC" || datos[a]["__EMPTY_1"] == "BUZONES" || datos[a]["__EMPTY_1"] == "RECTIFICADORAS" || datos[a]["__EMPTY_1"] == "TROLLEY"){
              Tipo = datos[a]["__EMPTY_1"]
            }

            if(datos[a]["__EMPTY_3"]!=undefined){
              Actividad = datos[a]["__EMPTY_3"]
            }
            if(datos[a]["__EMPTY_4"]!=undefined){
              Ejecutor = datos[a]["__EMPTY_4"]
            }
            if(datos[a]["__EMPTY_5"]!=undefined){
              HrsProg = datos[a]["__EMPTY_5"]
            }
            if(datos[a]["__EMPTY_6"]!=undefined){
              LunesTa = datos[a]["__EMPTY_6"]
            }
            if(datos[a]["__EMPTY_7"]!=undefined){
              LunesTb = datos[a]["__EMPTY_7"]
            }
            if(datos[a]["__EMPTY_8"]!=undefined){
              MartesTa = datos[a]["__EMPTY_8"]
            }
            if(datos[a]["__EMPTY_9"]!=undefined){
              MartesTb = datos[a]["__EMPTY_9"]
            }
            if(datos[a]["__EMPTY_10"]!=undefined){
              MiercolesTa = datos[a]["__EMPTY_10"]
            }
            if(datos[a]["__EMPTY_11"]!=undefined){
              MiercolesTb = datos[a]["__EMPTY_11"]
            }
            if(datos[a]["__EMPTY_12"]!=undefined){
              JuevesTa = datos[a]["__EMPTY_12"]
            }
            if(datos[a]["__EMPTY_13"]!=undefined){
              JuevesTb = datos[a]["__EMPTY_13"]
            }
            if(datos[a]["__EMPTY_14"]!=undefined){
              ViernesTa = datos[a]["__EMPTY_14"]
            }
            if(datos[a]["__EMPTY_15"]!=undefined){
              ViernesTb = datos[a]["__EMPTY_15"]
            }
            if(datos[a]["__EMPTY_16"]!=undefined){
              SabadoTa = datos[a]["__EMPTY_16"]
            }
            if(datos[a]["__EMPTY_17"]!=undefined){
              SabadoTb = datos[a]["__EMPTY_17"]
            }
            if(datos[a]["__EMPTY_18"]!=undefined){
              DomingoTa = datos[a]["__EMPTY_18"]
            }
            if(datos[a]["__EMPTY_19"]!=undefined){
              DomingoTb = datos[a]["__EMPTY_19"]
            }
            if(datos[a]["__EMPTY_21"]!=undefined){
              Aviso = datos[a]["__EMPTY_21"]
            }
            if(datos[a]["__EMPTY_22"]!=undefined){
              Orden = datos[a]["__EMPTY_22"]
            }


            if(datos[a]["__EMPTY_3"]!=undefined ){
              if(datos[a]["__EMPTY_3"].replace(/\s+/g,' ').trim().toUpperCase() !=""){
                await modelo.workpad.create({
                  Tipo : Tipo,
                  Actividad : Actividad,
                  Ejecutor : Ejecutor,
                  HrsProg : HrsProg,
                  LunesTa : LunesTa,
                  LunesTb : LunesTb,
                  MartesTa : MartesTa,
                  MartesTb : MartesTb,
                  MiercolesTa : MiercolesTa,
                  MiercolesTb : MiercolesTb,
                  JuevesTa : JuevesTa,
                  JuevesTb : JuevesTb,
                  ViernesTa : ViernesTa,
                  ViernesTb : ViernesTb,
                  SabadoTa : SabadoTa,
                  SabadoTb : SabadoTb,
                  DomingoTa : DomingoTa,
                  DomingoTb : DomingoTb,
                  Aviso : Aviso,
                  Orden : Orden,
                  Idingreso : random_id_workpad_single
                })
              }
            }





          }
        }catch(err){
          req.flash('error', file.name.toString());
          console.log(err)
          await modelo.archivos.destroy({
            where : {
              Tabla : "workpad",
              Idingreso : random_id_workpad_single
            }
          })
          await modelo.workpad.destroy({
            where : {
              Idingreso : random_id_workpad_single
            }
          })
        }


      }
      else if(datos_1[d] == "Disciplinatraspaso"){

        try{
          //var random_id_disciplina_single = guid()
          file = req.files["Disciplinatraspaso"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);

          /*await modelo.archivos.create({
            Tabla : "disciplina",
            Idingreso : random_id_disciplina_single,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "Tiempos de la disciplina operacional",
            Nombrearchivo : file.name.toString()
          })*/

          await file.mv(savePath);
          var datos_aux = leerExcelDisciplinatraspaso(file.name, [0,1,2,3,4])
          var datos = datos_aux[0];
          
          
          var index = 0 ;
          for(a=0; a<datos.length; a++){
            var start = false
            var contador = 0 ;
            var Meta_dia = 0;
            var Meta = 0;
            var Cumplimiento = 0;
            for(c=0 ; c < Object.keys(datos[a][0]).length ; c++ ){
              if( datos[a][0][Object.keys(datos[a][0])[c]] == "Comentarios" ){
                start= false
              }
              if(start == true){
                contador+=1;
              }
              if(datos[a][0][Object.keys(datos[a][0])[c]] =="FECHA"){
                var start = true
              }
            }
            //console.log(contador)
            index = 6
            if(contador > 7){
              index = 8
            }
            if(a==2){
              index = 6
            }
            
            for(b=1; b < index ; b++){
              llaves = Object.keys(datos[a][b]);
              var date = ExcelDateToJSDate(datos[a][b][llaves[2]]);
              console.log(datos[a][b])
              var converted_date = date.toISOString().split('T')[0];
              var Fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0]

              for(c=index ; c <datos[a].length; c++){
                if(datos[a][c][llaves[6]] == "Buzones" ){
                  Meta_dia = datos[a][c+b][llaves[6]]
                  Meta = datos[a][c+7][llaves[6]]
                  Cumplimiento = Math.round(datos[a][c+8][llaves[6]]*100)
                  break
                }
              }

              if(index == 6 && a!=2){
                await modelo.disciplina_traspaso.create({
                  Area : datos_aux[1][a],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_det : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                  Traslado_postura : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                  Ingreso_postura : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                  Almuerzo : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                  Salida_mina : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                  Traslado_buses : convertToHHMM(datos[a][b][llaves[8]]*24).toString() ,
                  Salida_buses : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                  Meta_dia : convertToHHMM(Meta_dia*24).toString(),
                  Meta : convertToHHMM(Meta*24).toString(),
                  Cumplimiento : Cumplimiento.toString()

                })
              }

              else if(a==2){
                await modelo.disciplina_traspaso.create({
                  Area : datos_aux[1][a],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_det : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                  Traslado_postura : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                  Ingreso_postura : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                  Almuerzo : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                  Traslado_buses : convertToHHMM(datos[a][b][llaves[8]]*24).toString(),
                  Ingreso_postura_pm : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                  Salida_buses : convertToHHMM(datos[a][b][llaves[9]]*24).toString() ,
                  Meta_dia : convertToHHMM(Meta_dia*24).toString(),
                  Meta : convertToHHMM(Meta*24).toString(),
                  Cumplimiento : (Cumplimiento).toString()
                })
              }

              else if(index == 8){
                await modelo.disciplina_traspaso.create({
                  Area : datos_aux[1][a],
                  Dia : datos[a][b][llaves[1]],
                  Fecha : Fecha,
                  Llegada_det : convertToHHMM(datos[a][b][llaves[3]]*24).toString(),
                  Traslado_postura : convertToHHMM(datos[a][b][llaves[4]]*24).toString(),
                  Ingreso_postura : convertToHHMM(datos[a][b][llaves[5]]*24).toString(),
                  Salida_mina : convertToHHMM(datos[a][b][llaves[6]]*24).toString(),
                  Ingreso_am : convertToHHMM(datos[a][b][llaves[8]]*24).toString() ,
                  Cena : convertToHHMM(datos[a][b][llaves[7]]*24).toString(),
                  Salida_camarines : convertToHHMM(datos[a][b][llaves[9]]*24).toString(),
                  Salida_buses : convertToHHMM(datos[a][b][llaves[10]]*24).toString() ,
                  Meta_dia : convertToHHMM(Meta_dia*24).toString(),
                  Meta : convertToHHMM(Meta*24).toString(),
                  Cumplimiento : (Cumplimiento).toString()

                })
              }
            }
          }
        }catch(err){
          console.log(err)
        }
      }
      else if(datos_1[d] == "PODtraspaso"){
        file = req.files["PODtraspaso"];
        const savePath = path.join(__dirname,"../",'public','uploads',file.name);
        await file.mv(savePath);
        var datos = leerPOD(file.name)
        var Fecha = "";
        // PAUTA DIARIA
        try{
          var random_id_pauta_single = guid();
          await modelo.archivos.create({
            Tabla : "pauta diaria",
            Idingreso : random_id_pauta_single,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "archivos pauta diaria",
            Nombrearchivo : file.name.toString()
          })
          var datos_pauta = datos[0];
          
          var Cuadrilla = "";
          var Descripcion = "";
          var Ubicacion = "";
          var Supervisor = "";
          var Mantenedor = "";
          var Turno = "";
          var Instructivo = "";
          var Telefono = "";
          var Frecuenciaradio = "";
          var Dotacion = "";
          var Herramientas = "";
          var Auspervac = "";
          var Area = "";
          var Coordinador = "";
          var Apr = "";
          Area = datos_pauta[0]["__EMPTY_4"].toUpperCase().split("AREA:")[1].replace(/\s+/g,' ').trim()
          Fecha = datos_pauta[1]["__EMPTY_4"].toUpperCase().split("FECHA:")[1].replace(/\s+/g,' ').trim()
          Coordinador = datos_pauta[2]["__EMPTY_4"].toUpperCase().split("COORDINADOR:")[1].replace(/\s+/g,' ').trim()
          Apr = datos_pauta[3]["__EMPTY_4"].toUpperCase().split("APR:")[1].replace(/\s+/g,' ').trim()
          for(a=6; a<datos_pauta.length; a++){
            if(datos_pauta[a]["__EMPTY_2"] !=undefined){
              Cuadrilla = datos_pauta[a]["__EMPTY_2"]
            }
            if(datos_pauta[a]["__EMPTY_3"] !=undefined){
              Descripcion = datos_pauta[a]["__EMPTY_3"]
            }
            if(datos_pauta[a]["__EMPTY_4"] != undefined){
              Ubicacion = datos_pauta[a]["__EMPTY_4"]
            }
            if(datos_pauta[a]["__EMPTY_5"] !=undefined){
              Supervisor = datos_pauta[a]["__EMPTY_5"]
            }
            if(datos_pauta[a]["__EMPTY_6"] != undefined){
              if(Mantenedor==""){
                Mantenedor = datos_pauta[a]["__EMPTY_6"]
              }
              else{
                Mantenedor+=", "+datos_pauta[a]["__EMPTY_6"]
              }
              
            }
            if(datos_pauta[a]["__EMPTY_7"] != undefined){
              Turno = datos_pauta[a]["__EMPTY_7"]
            }
            if(datos_pauta[a]["__EMPTY_8"] != undefined){
              if(Instructivo ==""){
                Instructivo = datos_pauta[a]["__EMPTY_8"]
              }
              else{
                Instructivo+=", "+datos_pauta[a]["__EMPTY_8"]
              }
              
            }
            if(datos_pauta[a]["__EMPTY_9"] != undefined){
              Telefono = datos_pauta[a]["__EMPTY_9"]
            }
            if(datos_pauta[a]["__EMPTY_10"]!= undefined){
              Frecuenciaradio = datos_pauta[a]["__EMPTY_10"]
            }
            if(datos_pauta[a]["__EMPTY_11"] !=undefined){
              Dotacion = datos_pauta[a]["__EMPTY_11"]
            }
            if(datos_pauta[a]["__EMPTY_12"] != undefined){
              Herramientas = datos_pauta[a]["__EMPTY_12"]
            }
            if(datos_pauta[a]["__EMPTY_13"] != undefined){
              Auspervac = datos_pauta[a]["__EMPTY_13"]
            }
            if(a+1 >= datos_pauta.length || datos_pauta[a+1]["__EMPTY_2"] !=undefined){
              await modelo.pauta_diaria.findAll({
                where:{
                  Fecha : Fecha,
                  Cuadrilla : Cuadrilla,
                  Descripcion : Descripcion,
                  Ubicacion : Ubicacion,
                  Supervisor : Supervisor,
                  Mantenedor : Mantenedor,
                  Turno : Turno,
                  Instructivo : Instructivo,
                  Telefono : Telefono,
                  Frecuenciaradio : Frecuenciaradio,
                  Dotacion : Dotacion,
                  Herramientas : Herramientas,
                  Auspervac : Auspervac,
                  Area : Area,
                  Coordinador : Coordinador,
                  Apr : Apr
                }
              }).then(async function(rows_pod){
                if(rows_pod.length==0){
                  modelo.pauta_diaria.create({
                    Fecha : Fecha,
                    Cuadrilla : Cuadrilla,
                    Descripcion : Descripcion,
                    Ubicacion : Ubicacion,
                    Supervisor : Supervisor,
                    Mantenedor : Mantenedor,
                    Turno : Turno,
                    Instructivo : Instructivo,
                    Telefono : Telefono,
                    Frecuenciaradio : Frecuenciaradio,
                    Dotacion : Dotacion,
                    Herramientas : Herramientas,
                    Auspervac : Auspervac,
                    Area : Area,
                    Coordinador : Coordinador,
                    Apr : Apr,
                    Idingreso : random_id_pauta_single
                  })
                  Instructivo=""
                  Mantenedor=""
                }
                else{
                  Instructivo=""
                  Mantenedor=""
                }
              })
              
            }
          }
        }catch(err){
          req.flash('error', "Error en pauta diaria traspaso "+ file.name.toString());
          console.log(err)
          await modelo.archivos.destroy({
            where : {
              Tabla : "pauta diaria",
              Idingreso : random_id_pauta_single
            }
          })
          await modelo.pauta_diaria.destroy({
            where : {
              Idingreso : random_id_pauta_single
            }
          })
        }

        try{
          var random_id_asistencia_traspaso_single = guid();
          await modelo.archivos.create({
            Tabla : "asistencia traspaso",
            Idingreso : random_id_asistencia_traspaso_single,
            Fechaingreso : Fecha_hoy,
            Infoingresada : "archivos asistencia traspaso",
            Nombrearchivo : file.name.toString()
          })
          var datos_asistencia = datos[1];
          var Fecha_sin_guion = Object.keys(datos_asistencia[0])[Object.keys(datos_asistencia[0]).length-1]
          var Fecha_definitiva = Fecha_sin_guion.split("/")[1]+"-"+Fecha_sin_guion.split("/")[0]+"-20"+Fecha_sin_guion.split("/")[2]
          for(a=0; a <datos_asistencia.length; a++){
            await modelo.asistencia_traspaso.findAll({
              where:{
                Fecha : Fecha,
                ApellidoP : datos_asistencia[a]['Apellido P.'],
                ApellidoM : datos_asistencia[a]['Apellido M.']
              }
            }).then(async function(rows_asistencia_traspaso){
              if(rows_asistencia_traspaso.length==0){
                await modelo.asistencia_traspaso.create({
                  Fecha : Fecha,
                  ApellidoP : datos_asistencia[a]['Apellido P.'],
                  ApellidoM : datos_asistencia[a]['Apellido M.'],
                  Nombre : datos_asistencia[a]['Nombres'],
                  Rut : datos_asistencia[a]['Rut'],
                  Cargo : datos_asistencia[a]['Cargo'],
                  Turno : datos_asistencia[a]['Turno'],
                  Asistencia : datos_asistencia[a][Object.keys(datos_asistencia[a])[Object.keys(datos_asistencia[a]).length-1]],
                  Idingreso : random_id_asistencia_traspaso_single
                })
              }
            })
          }
        }catch(err){
          req.flash('error', "Error en asistencia traspaso "+ file.name.toString());
          console.log(err)
          await modelo.archivos.destroy({
            where : {
              Tabla : "asistencia traspaso",
              Idingreso : random_id_asistencia_traspaso_single
            }
          })
          await modelo.asistencia_traspaso.destroy({
            where : {
              Idingreso : random_id_asistencia_traspaso_single
            }
          })
        }

      }

      else if(datos_1[d] == "Asistenciatraspaso"){
        try{
          file = req.files["Asistenciatraspaso"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelAsistenciaTraspaso(file.name);
          var Fecha_sin_guion = Object.keys(datos[0])[Object.keys(datos[0]).length-1]
          var Fecha_definitiva = Fecha_sin_guion.split("/")[1]+"-"+Fecha_sin_guion.split("/")[0]+"-20"+Fecha_sin_guion.split("/")[2]
          for(a=0; a <datos.length; a++){
            await modelo.trabajos.findAll({
              where:{
                Fecha : Fecha,
                Cuadrilla : Cuadrilla,
                Descripcion : Descripcion
              }
            }).then(async function(rows_asistencia_traspaso){
              if(rows_asistencia_traspaso.length==0){
                await modelo.asistencia_traspaso.create({
                  Fecha : Fecha_definitiva,
                  ApellidoP : datos[a]['Apellido P.'],
                  ApellidoM : datos[a]['Apellido M.'],
                  Nombre : datos[a]['Nombres'],
                  Rut : datos[a]['Rut'],
                  Cargo : datos[a]['Cargo'],
                  Turno : datos[a]['Turno'],
                  Asistencia : datos[a][Object.keys(datos[a])[Object.keys(datos[a]).length-1]],
                })
              }
            })
            
          }
        }catch(err){
          console.log(err)
        }
      }

      else if(datos_1[d] == "Asistenciatte8"){
        file = req.files["Asistenciatte8"];
        const savePath = path.join(__dirname,"../",'public','uploads',file.name);
        await file.mv(savePath);
        var datos = leerExcel(file.name);
        console.log(datos)
      }

      else if (datos_1[d] = "Pautadiaria"){
        try{
          file = req.files["Pautadiaria"];
          const savePath = path.join(__dirname,"../",'public','uploads',file.name);
          await file.mv(savePath);
          var datos = leerExcelPautaTraspaso(file.name);
          var Fecha = "";
          var Cuadrilla = "";
          var Descripcion = "";
          var Ubicacion = "";
          var Supervisor = "";
          var Mantenedor = "";
          var Turno = "";
          var Instructivo = "";
          var Telefono = "";
          var Frecuenciaradio = "";
          var Dotacion = "";
          var Herramientas = "";
          var Auspervac = "";
          var Area = "";
          var Coordinador = "";
          var Apr = "";
          Area = datos[0]["__EMPTY_4"].toUpperCase().split("AREA:")[1].replace(/\s+/g,' ').trim()
          Fecha = datos[1]["__EMPTY_4"].toUpperCase().split("FECHA:")[1].replace(/\s+/g,' ').trim()
          Coordinador = datos[2]["__EMPTY_4"].toUpperCase().split("COORDINADOR:")[1].replace(/\s+/g,' ').trim()
          Apr = datos[3]["__EMPTY_4"].toUpperCase().split("APR:")[1].replace(/\s+/g,' ').trim()
          for(a=6; a<datos.length; a++){
            if(datos[a]["__EMPTY_3"] !=undefined){
              Descripcion = datos[a]["__EMPTY_3"]
            }
            if(datos[a]["__EMPTY_4"] != undefined){
              Ubicacion = datos[a]["__EMPTY_4"]
            }
            if(datos[a]["__EMPTY_5"] !=undefined){
              Supervisor = datos[a]["__EMPTY_5"]
            }
            if(datos[a]["__EMPTY_6"] != undefined){
              if(Mantenedor==""){
                Mantenedor = datos[a]["__EMPTY_6"]
              }
              else{
                Mantenedor+=", "+datos[a]["__EMPTY_6"]
              }
              
            }
            if(datos[a]["__EMPTY_7"] != undefined){
              Turno = datos[a]["__EMPTY_7"]
            }
            if(datos[a]["__EMPTY_8"] != undefined){
              if(Instructivo ==""){
                Instructivo = datos[a]["__EMPTY_8"]
              }
              else{
                Instructivo+=", "+datos[a]["__EMPTY_8"]
              }
              
            }
            if(datos[a]["__EMPTY_9"] != undefined){
              Telefono = datos[a]["__EMPTY_9"]
            }
            if(datos[a]["__EMPTY_10"]!= undefined){
              Frecuenciaradio = datos[a]["__EMPTY_10"]
            }
            if(datos[a]["__EMPTY_11"] !=undefined){
              Dotacion = datos[a]["__EMPTY_11"]
            }
            if(datos[a]["__EMPTY_12"] != undefined){
              Herramientas = datos[a]["__EMPTY_12"]
            }
            if(datos[a]["__EMPTY_13"] != undefined){
              Auspervac = datos[a]["__EMPTY_13"]
            }



            if(a+1 >= datos.length || datos[a+1]["__EMPTY_2"] !=undefined){

              modelo.pauta_diaria.create({
                Fecha : Fecha,
                Cuadrilla : Cuadrilla,
                Descripcion : Descripcion,
                Ubicacion : Ubicacion,
                Supervisor : Supervisor,
                Mantenedor : Mantenedor,
                Turno : Turno,
                Instructivo : Instructivo,
                Telefono : Telefono,
                Frecuenciaradio : Frecuenciaradio,
                Dotacion : Dotacion,
                Herramientas : Herramientas,
                Auspervac : Auspervac,
                Area : Area,
                Coordinador : Coordinador,
                Apr : Apr
              })
              Instructivo=""
              Mantenedor=""
            }
            
          }
        }catch(err){
          console.log(err)
        }
      }

      
         
    }
    //res.send({redirect :'/dashboard'})
    req.flash('ingreso', 'Archivos ingreados')
    await res.redirect("dashboard");
  },

  postDeleteFiles : async(req,res,next)=>{
    for(a=0 ; a < req.body.length; a++){
      if(req.body[a].Tabla == "asistencia"){
        await modelo.asistencia.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "brocales"){
        await modelo.brocales.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "disciplina"){
        await modelo.disciplina.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "equipos"){
        await modelo.equipos.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "planmatriz"){
        await modelo.planmatriz.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "puertas"){
        await modelo.puertas.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "vimosap"){
        await modelo.vimosap.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if (req.body[a].Tabla == "Trabajos"){
        await modelo.trabajos.destroy({
          where : {
            idIngreso : req.body[a].Idingreso
          }
        })
      }

      else if (req.body[a].Tabla == "workpad"){
        await modelo.workpad.destroy({
          where : {
            idIngreso : req.body[a].Idingreso
          }
        })
      }

      else if(req.body[a].Tabla == "pauta diaria"){
        await modelo.pauta_diaria.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }
      else if(req.body[a].Tabla == "asistencia traspaso"){
        await modelo.asistencia_traspaso.destroy({
          where : {
            Idingreso : req.body[a].Idingreso
          }
        })
      }


      await modelo.archivos.destroy({
        where : {
          Idingreso : req.body[a].Idingreso 
        }
      })
    }
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

  postBorrartrabajador : async(req, res, next)=>{
    await modelo.asistencia.destroy({
      where:{
        Nombre : req.body.Nombre
      }
    })
    
  },

  postModAsist : async(req, res, next)=>{
    await modelo.asistencia.update({
        Nombre : req.body.Nombre,
        Rut : req.body.Rut,
        Cargo : req.body.Cargo,
        Turno : req.body.Turno,
        Sector : req.body.Sector,
        Fechaingreso : req.body.Fechaingreso
      },{
        where:{
          Id : req.body.Id
        }
    })
  },

  postModBrocal : async(req, res , next)=>{
    await modelo.brocales.update({
      Fecha:req.body.Fecha,
      Turno : req.body.Turno,
      Ubicacion : req.body.Ubicacion,
      Unidad : req.body.Unidad,
      Actividad : req.body.Actividad,
      Observaciones : req.body.Observaciones,
      Cantidad : req.body.Cantidad,
      Sub : req.body.Sub,
      Demanda : req.body.Demanda,
      Dotacion : req.body.Dotacion,
      Horai : req.body.Horai,
      Horaf : req.body.Horaf
    },{
      where : {
        Id : req.body.Id
      }
    })
  },

  postModMatriz : async(req, res, next)=>{
    await modelo.planmatriz.update({
      Fecha : req.body.Fecha,
      Programado : req.body.Programado,
      Realizado : req.body.Realizado,
      Observaciones : req.body.Observaciones,
      Area : req.body.Area,
    },{
      where :{
        Id : req.body.Id
      }
    })
  },

  postModDisciplina : async(req, res, next) =>{
    await modelo.disciplina.update({
      Area : req.body.Area,
      Dia : req.body.Dia,
      Fecha : req.body.Fecha,
      Llegada_Instalacion : req.body.Llegada_Instalacion,
      Salida_Instalacion : req.body.Salida_Instalacion,
      Inicio_Act_Am : req.body.Inicio_Act_Am,
      Termino_Act_Am : req.body.Termino_Act_Am,
      Almuerzo : req.body.Almuerzo,
      Inicio_Act_Pm : req.body.Inicio_Act_Pm,
      Termino_Act_Pm : req.body.Termino_Act_Am,
      Tiempo_Instalacion : req.body.Tiempo_Instalacion,
      Traslado_Postura : req.body.Traslado_Postura,
      Tiempo_Disponible_Am : req.body.Tiempo_Disponible_Am,
      Traslado_Colacion : req.body.Traslado_Colacion,
      Almuerzo_2 : req.body.Almuerzo_2,
      Tiempo_Disponible_Pm : req.body.Tiempo_Disponible_Pm,
      Meta : req.body.Meta
    },{
      where : {
        Id : req.body.Id
      }
    })
  },

  postModEquipo : async(req, res, next)=>{
    await modelo.equipos.update({
      Equipo : req.body.Equipo,
      Patente : req.body.Patente,
      Cartola : req.body.Cartola,
      Ultimamantencion : req.body.Ultimamantencion,
      Ultimokms : req.body.Ultimokms,
      Proximakms : req.body.Proximakms,
      Kilometrajeactual : req.body.Kilometrajeactual,
      Semaforo : req.body.Semaforo,
      Estado : req.body.Estado,
      Fechagas : req.body.Fechagas
    })
  },

  postModPuerta : async(req, res, next)=>{
    await modelo.puertas.update({
      Identificacion : req.body.Identificacion,
      Ubicacion : req.body.Ubicacion,
      Fecharevision : req.body.Fecharevision,
      Tipomantencion : req.body.Tipomantencion,
      Detalles : req.body.Detalles,
      Solicitante : req.body.Solicitante,
      Estado : req.body.Estado
    },{
      where:{
        Id : req.body.Id
      }
    })
  },

  postModSap : async(req, res, next)=>{
    await modelo.vimosap.update({
      Numpuerta : req.body.Numpuerta,
      Ut : req.body.Ut,
      Arearesponsable : req.body.Arearesponsable,
      Prioridad : req.body.Prioridad,
      Nivel : req.body.Nivel,
      Plan : req.body.Plan,
      Orden : req.body.Orden,
      Mes : req.body.Mes
    },
    {
      where :{
        Id : req.body.Id
      }
    })
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