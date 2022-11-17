
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
  return new bootstrap.Tooltip(tooltipTriggerEl)
})


document.addEventListener("DOMContentLoaded", function(){
  document.querySelectorAll('.sidebar .nav-link').forEach(function(element){
    
    element.addEventListener('click', function (e) {

      let nextEl = element.nextElementSibling;
      let parentEl  = element.parentElement;  

        if(nextEl) {
            e.preventDefault(); 
            let mycollapse = new bootstrap.Collapse(nextEl);
            
            if(nextEl.classList.contains('show')){
              mycollapse.hide();
            } else {
                mycollapse.show();
                // find other submenus with class=show
                var opened_submenu = parentEl.parentElement.querySelector('.submenu.show');
                // if it exists, then close all of them
                if(opened_submenu){
                  new bootstrap.Collapse(opened_submenu);
                }
            }
        }
    }); // addEventListener
  }) // forEach
});
function openActivity(evt, actividad) {
  var i, x, tablinks;
  x = document.getElementsByClassName("activity");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(actividad).style.display = "block";
  evt.currentTarget.className += " w3-red";
}

function openViewsub6(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub6");
  //console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub6");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}
function openViewsub7(evt, selectedview){
  var i, x, tablinks;
  x = document.getElementsByClassName("viewsub7");
  //console.log(x);
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinkbrocalsub7");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
  }
  document.getElementById(selectedview).style.display = "block";
  evt.currentTarget.className += " w3-red";
}



var app = angular.module('myApp', ['zingchart-angularjs']);



app.controller("myControllerAsistencia", function($scope,$filter){



  $scope.authmessagestr = local_authmessage[0]
  $scope.userbutton = true
  $scope.username = ""; 
  if (local_user != "notlogged"){
    $scope.username = local_user.nombre
  }
  
  
  $scope.isCollapsed = false;

  var vimos_visited = [];

  var dic_vimos = {}
  var vimos_array = [];
  var vimos_array_total = [];


  for(a=0; a < local_data_puertas.length; a++){
    if(vimos_visited.indexOf(local_data_puertas[a].Identificacion) == -1){
      vimos_visited.push(local_data_puertas[a].Identificacion);
      var dic_vimos = {}
      dic_vimos.Identificacion = local_data_puertas[a].Identificacion;
      $scope.identificacion = local_data_puertas[a].Estado
      $scope.str = angular.copy($scope.identificacion);
      var result = $scope.str.charAt(0).toUpperCase() + $scope.str.slice(1).toLowerCase();
      dic_vimos.Estado = result
      dic_vimos.Ubicacion = local_data_puertas[a].Ubicacion
      dic_vimos.Fecharevision = local_data_puertas[a].Fecharevision
      dic_vimos.Tipomantencion = local_data_puertas[a].Tipomantencion

      vimos_array.push(dic_vimos);

    }
    else{
      var result = local_data_puertas[a].Estado.charAt(0).toUpperCase() + local_data_puertas[a].Estado.slice(1).toLowerCase();
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Estado = result
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Fecharevision = local_data_puertas[a].Fecharevision
      vimos_array[vimos_visited.indexOf(local_data_puertas[a].Identificacion)].Tipomantencion = local_data_puertas[a].Tipomantencion
    }
  }


  $scope.vimoarray1 = vimos_array.slice(0,20)
  $scope.vimoarray2 = vimos_array.slice(20,40)
  $scope.vimoarray3 = vimos_array.slice(40,60);
  $scope.vimoarray4 = vimos_array.slice(60,80)
  $scope.vimoarray5 = vimos_array.slice(80,vimos_array.length)

  $scope.vimostotal = vimos_array;

  $scope.headers = Object.keys($scope.vimostotal[0]);

  $scope.equipostotal=[];
  for(a=0; a< local_data_equipo.length; a++){
    $scope.equipostotal.push(local_data_equipo[a])
  }
  

  $scope.headersequipo = Object.keys($scope.equipostotal[0])




  //$scope.myJsonTest = mixed_creator_test();
  
  var fecha_hoy = new Date();
  $scope.dateselected = fecha_hoy;
  $scope.nombre_sectores_array =[];
  $scope.total_trabajadores_array = [];
  $scope.asistencia_total_trabajadores_array = [];
  total_trabajadores = 0;
  asistencia_trabajadores = 0;
  nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
  converted_date = nueva_fecha.toISOString().split('T')[0];
  fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];

  $scope.fecha_universa = fecha;
  $scope.fecha_universal  = angular.copy($scope.fecha_universa);

  $scope.nombresusuarios = [];

  for(a=0 ; a < local_data_usuarios.length; a++){
    if($scope.nombresusuarios.indexOf(local_data_usuarios[a].Usuario) == -1){
      $scope.nombresusuarios.push(local_data_usuarios[a].Usuario)
    }
  }


  $scope.fechahoy = fecha;
  for(c=0; c < local_data_asistencia.length ; c++){
    if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector) == -1 && local_data_asistencia[c].Fechaingreso == fecha){
      $scope.nombre_sectores_array.push(local_data_asistencia[c].Sector);
      $scope.total_trabajadores_array.push(1);
      $scope.asistencia_total_trabajadores_array.push(0);
      
      if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"  ){
        $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      }
    }
    else if (local_data_asistencia[c].Fechaingreso == fecha){
      $scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C" ){
        $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
      }
    } 
  }
  /*$scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], "SUB 5");
  $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], "PIPA NORTE");
  $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")],"TTE 6 ACARREO " );
  $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], "DIABLO REGIMIENTO ");
  $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")],"SUB 6" );
  $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")],"TENIENTE 7" );
  $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], "LA JUNTA");
  $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")],"OP-20/21" );
  $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], "CHANCADO PRIMARIO COLON");
  $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], "ACCU TURNOS");
  */
  $scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[0], $scope.asistencia_total_trabajadores_array[0], $scope.nombre_sectores_array[0]);
  $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[1], $scope.asistencia_total_trabajadores_array[1], $scope.nombre_sectores_array[1]);
  $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[2], $scope.asistencia_total_trabajadores_array[2], $scope.nombre_sectores_array[2]);
  $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[3], $scope.asistencia_total_trabajadores_array[3], $scope.nombre_sectores_array[3]);
  $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[4], $scope.asistencia_total_trabajadores_array[4], $scope.nombre_sectores_array[4]);
  $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[5], $scope.asistencia_total_trabajadores_array[5], $scope.nombre_sectores_array[5]);
  $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[6], $scope.asistencia_total_trabajadores_array[6], $scope.nombre_sectores_array[6]);
  $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[7], $scope.asistencia_total_trabajadores_array[7], $scope.nombre_sectores_array[7]);
  $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[8], $scope.asistencia_total_trabajadores_array[8], $scope.nombre_sectores_array[8]);
  $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[9], $scope.asistencia_total_trabajadores_array[9], $scope.nombre_sectores_array[9]);
  $scope.myJsonpieasistencia11 = Pie_creator($scope.total_trabajadores_array[10], $scope.asistencia_total_trabajadores_array[10], $scope.nombre_sectores_array[10]);
  $scope.myJsonpieasistencia12 = Pie_creator($scope.total_trabajadores_array[11], $scope.asistencia_total_trabajadores_array[11], $scope.nombre_sectores_array[11]);
  $scope.myJsonpieasistencia13 = Pie_creator($scope.total_trabajadores_array[12], $scope.asistencia_total_trabajadores_array[12], $scope.nombre_sectores_array[12]);
  $scope.myJsonpieasistencia14 = Pie_creator($scope.total_trabajadores_array[13], $scope.asistencia_total_trabajadores_array[13], $scope.nombre_sectores_array[13]);
  $scope.myJsonpieasistencia15 = Pie_creator($scope.total_trabajadores_array[14], $scope.asistencia_total_trabajadores_array[14], $scope.nombre_sectores_array[14]);
  $scope.myJsonpieasistencia16 = Pie_creator($scope.total_trabajadores_array[15], $scope.asistencia_total_trabajadores_array[15], $scope.nombre_sectores_array[15]);
  $scope.myJsonpieasistencia17 = Pie_creator($scope.total_trabajadores_array[16], $scope.asistencia_total_trabajadores_array[16], $scope.nombre_sectores_array[16]);
  $scope.myJsonpieasistencia18 = Pie_creator($scope.total_trabajadores_array[17], $scope.asistencia_total_trabajadores_array[17], $scope.nombre_sectores_array[17]);
    $scope.myJsonpieasistencia19 = Pie_creator($scope.total_trabajadores_array[18], $scope.asistencia_total_trabajadores_array[18], $scope.nombre_sectores_array[18]);
    $scope.myJsonpieasistencia20 = Pie_creator($scope.total_trabajadores_array[19], $scope.asistencia_total_trabajadores_array[19], $scope.nombre_sectores_array[19]);
    $scope.myJsonpieasistencia21 = Pie_creator($scope.total_trabajadores_array[20], $scope.asistencia_total_trabajadores_array[20], $scope.nombre_sectores_array[20]);
    $scope.myJsonpieasistencia22 = Pie_creator($scope.total_trabajadores_array[21], $scope.asistencia_total_trabajadores_array[21], $scope.nombre_sectores_array[21]);
    $scope.myJsonpieasistencia23 = Pie_creator($scope.total_trabajadores_array[22], $scope.asistencia_total_trabajadores_array[22], $scope.nombre_sectores_array[22]);
    $scope.myJsonpieasistencia24 = Pie_creator($scope.total_trabajadores_array[23], $scope.asistencia_total_trabajadores_array[23], $scope.nombre_sectores_array[23]);
    $scope.myJsonpieasistencia25 = Pie_creator($scope.total_trabajadores_array[24], $scope.asistencia_total_trabajadores_array[24], $scope.nombre_sectores_array[24]);



  var sector_visited = ["SUB-5","PIPA NORTE QT PACIFICO SUPERIOR", "TTE 6 ACARREO ", "DIABLO REGIMIENTO ", "SUB 6 RENO", "TENIENTE 7 ACARREO", "LA JUNTA", "OP-20/21", "CHANCADO PRIMARIO COLON", "AGUAS CONTACTO MINA TURNOS 4X4"];
  /*var asistencia_A = [];
  var asistencia_B = [];
  var asistencia_C = [];
  */

  var asistencia_A = [];
  var asistencia_B = [];
  var asistencia_nopresente = [];

  var all_sector = [];

  for(a=0; a<local_data_asistencia.length; a++){
    if(local_data_asistencia[a].Fechaingreso == fecha && all_sector.indexOf(local_data_asistencia[a].Sector) == -1){
      all_sector.push(local_data_asistencia[a].Sector)
      asistencia_A.push(0)
      asistencia_B.push(0)
      asistencia_nopresente.push(0)
    }
  }


  for(a=0 ; a < local_data_asistencia.length; a++){
    if(local_data_asistencia[a].Fechaingreso == fecha){
      if(all_sector.indexOf(local_data_asistencia[a].Sector) == -1 ){
        //sector_visited.push(local_data_asistencia[a].Sector)
        //asistencia_A.push(0)
        //asistencia_B.push(0)
        //asistencia_C.push(0)

        if(local_data_asistencia[a].Turno == "A"){
          asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else if(local_data_asistencia[a].Turno == "B"){
          asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else{
          asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
        }
      }
      else{
        if(local_data_asistencia[a].Turno == "A"){
          asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else if(local_data_asistencia[a].Turno == "B"){
          asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
        }
        else{
          asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
        }
      }
    }
  }



  $scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_nopresente, all_sector, fecha);






  var total_array = [0,0,0];
  var completed_array = [0,0,0];
  var total_deseadas = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_completadas = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_aire = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_polvo = [0,0,0,0,0,0,0,0,0,0,0,0];
  var total_deseadas_ventilacion = [0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_aire =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_polvo =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_ventilacion =[0,0,0,0,0,0,0,0,0,0,0,0];
  var Anual_puertas =[0,0,0,0,0,0,0,0,0,0,0,0];
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

  for (d=0; d < local_data_matriz.length ; d++){   
    if(local_data_matriz[d].Area == "Aire Acondicionado"){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[0]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[0]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_aire[meses.indexOf(mes)]+=1;
      }
      total_deseadas_aire[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
      
    }
    if(local_data_matriz[d].Area == "Colectores de polvo" ){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[1]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[1]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_polvo[meses.indexOf(mes)]+=1;
      }
      total_deseadas_polvo[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
    }
    if(local_data_matriz[d].Area == "Ventilación" ){
      if(local_data_matriz[d].Fecha == $scope.dateselected){
        total_array[2]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[2]+=1;
        }
      }
      if(local_data_matriz[d].Observaciones == null){
        mes = ObtenerMes_2(parseInt(local_data_matriz[d].Fecha.split("-")[1]));
        Anual_ventilacion[meses.indexOf(mes)]+=1;
      }
      total_deseadas_ventilacion[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1; 
    }

    if(local_data_matriz[d].Area == "Aire Acondicionado"){
      total_deseadas[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1;
      if(local_data_matriz[d].Observaciones == null){
        total_completadas[parseInt(local_data_matriz[d].Fecha.split("-")[1])-1]+=1;
      }
    }
  }

  for(a=0; a < local_data_puertas.length; a++){
    Anual_puertas[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
  }


  array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
  for(a=0; a <local_data_sap.length; a++){
    var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
    nummes = parseInt(obtenerMes(result))-1
    array_total_mes_vimo[nummes]+=1;
  }

  $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo , Anual_puertas, "Puertas Vimo")



  $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_aire, Anual_aire, "Aire Acondicionado");
  $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_polvo, Anual_polvo, "Colectores de polvo");
  $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], total_deseadas_ventilacion, Anual_ventilacion, "Ventilación");
  //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
  //$scope.myMatrizColectores = Chart_creator(meses, Anual_polvo, 0, "Plan matriz anual Colectores de Polvo")
  //$scope.myMatrizVentilacion = Chart_creator(meses, Anual_ventilacion, 0, "Plan matriz anual Ventilación")

  //Chart_creator(datosx, valoresdatosx, meta, titulo)
  /*
  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
  for (a=0; a <local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub == "6"){
      mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
      datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
    }
  }
  $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,[200,150,250,100,50,230,150,450,230,200,300,150], "Limpieza de brocales Sub 6");
  */
  var realizacion = 0;
  for(b=0; b<local_data_puertas.length ; b++){

    if(local_data_puertas[b].Fecharevision== $scope.fecha_universal){
      realizacion+=1;
    }
  }
  $scope.myJsonAnualaire = bar_creator(total_array[0],completed_array[0],"Aire Acondicionado");
  $scope.myJsonAnualpolvo = bar_creator(total_array[1],completed_array[1],"Colectores de polvo");
  $scope.myJsonAnualventilacion = bar_creator(total_array[2],completed_array[2],"Ventilación");

  $scope.myJsonAnualVimo = bar_vimo(realizacion, "Puertas Vimo");

  $scope.myJsonAnualmatriz = mixed_creator(total_deseadas,total_completadas, "Aire Acondicionado");

  var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var deseados_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
  var deseados_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0]
  var fechas_vistas_sub5 = [];
  var fechas_vistas_sub6 = [];
  var contando_lugares_sub5 = [];
  var contando_lugares_sub6 = [];
  var id_visitados_sub5 = [];
  var id_visitados_sub6 = [];
  for (a=0; a <local_data_brocales.length ; a++){
    
    
    if(local_data_brocales[a].Sub == "5"){
      if(contando_lugares_sub5.indexOf(local_data_brocales[a].Ubicacion)==-1){
        contando_lugares_sub5.push(local_data_brocales[a].Ubicacion);
      }

      if(id_visitados_sub5.indexOf(local_data_brocales[a].Uniqueid) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        id_visitados_sub5.push(local_data_brocales[a].Uniqueid);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
      }


      /*if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        //datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
        //deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        //fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
      }*/
      
    }
    else if (local_data_brocales[a].Sub == "6"){
      if(contando_lugares_sub6.indexOf(local_data_brocales[a].Ubicacion)==-1){
        contando_lugares_sub6.push(local_data_brocales[a].Ubicacion);
      }
      if(id_visitados_sub6.indexOf(local_data_brocales[a].Uniqueid) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        id_visitados_sub6.push(local_data_brocales[a].Uniqueid);
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
      }
      /*if(fechas_vistas_sub6.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        
        fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
      }*/
    }
    
  }
  Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  
  $scope.Nombres_sub5 = [];
  for(a=0; a < local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub == "5"){
      if(local_data_brocales[a].Cantidad != "0"){
        if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1 && local_data_brocales[a].Ubicacion!="" ){
          $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
          Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
        }
        else{
          Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
        }
      }
      else{
        if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
          $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
          Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
        }
        else{
          Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
        }
      }


    }
  }

  //getDays(parseInt(fecha.split("-")[2]), parseInt(b))
  
  //$scope.myJsonCalendarBrocales = calendar_creator(fechas);



  $scope.myJsonTest = mixed_creator_test();



  //$scope.myJsonTimer1 = timer_chart();

  

  $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
  $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
  $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
  $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
  $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
  $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
  $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
  $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
  $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
  $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
  $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
  $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
  $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
  $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
  $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
  $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);



  /*for (a = 0; a < $scope.Totalbrocalessub6.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub6[a].Fecha.split("-")[1]));
    datos_x_sub6[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub6[a].Cantidad);
  }
  for (a = 0; a < $scope.Totalbrocalessub7.length; a++){
    mes = ObtenerMes_2(parseInt($scope.Totalbrocalessub7[a].Fecha.split("-")[1]));
    datos_x_sub7[meses.indexOf(mes)] += parseInt($scope.Totalbrocalessub7[a].Cantidad);
  }*/

  $scope.myJsonAnualsub5 = Chart_creator(meses,datos_x_sub5,deseados_x_sub5, "Limpieza de brocales Sub 5");
  $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,deseados_x_sub6, "Limpieza de brocales Sub 6");


  $scope.myJsonBarBrocalessub5 = bar_brocales(deseados_x_sub5, datos_x_sub5,["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], 20, "5");
  $scope.myJsonBarBrocalessub6 = bar_brocales(deseados_x_sub6, datos_x_sub6,["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], 20, "6");

  $scope.typebrocal5 = "anual";
  $scope.typebrocal6 = "anual";

  //$scope.Nombres_sub5
  var fechas_arreglo =[];
  var concretada_arreglo =[];
  for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
    fechas_arreglo.push("0-0-0");
    concretada_arreglo.push("No");
  }
  for(a = 0; a<local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub=="5"){
      if( local_data_brocales[a].Ubicacion!= "" && comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
        fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
        if(local_data_brocales[a].Cantidad!=0){
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
        }
        else{
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
        }
      }
    }
  }
  $scope.fecha1 = fechas_arreglo[0];
  $scope.dato1 = concretada_arreglo[0];
  $scope.fecha2 = fechas_arreglo[1];
  $scope.dato2 = concretada_arreglo[1];
  $scope.fecha3 = fechas_arreglo[2];
  $scope.dato3 = concretada_arreglo[2];
  $scope.fecha4 = fechas_arreglo[3];
  $scope.dato4 = concretada_arreglo[3];
  $scope.fecha5 = fechas_arreglo[4];
  $scope.dato5 = concretada_arreglo[4];
  $scope.fecha6 = fechas_arreglo[5];
  $scope.dato6 = concretada_arreglo[5];
  $scope.fecha7 = fechas_arreglo[6];
  $scope.dato7 = concretada_arreglo[6];
  $scope.fecha8 = fechas_arreglo[7];
  $scope.dato8 = concretada_arreglo[7];
  $scope.fecha9 = fechas_arreglo[8];
  $scope.dato9 = concretada_arreglo[8];
  $scope.fecha10 = fechas_arreglo[9];
  $scope.dato10 = concretada_arreglo[9];
  $scope.fecha11 = fechas_arreglo[10];
  $scope.dato11 = concretada_arreglo[10];
  $scope.fecha12 = fechas_arreglo[11];
  $scope.dato12 = concretada_arreglo[11];
  $scope.fecha13 = fechas_arreglo[12];
  $scope.dato13 = concretada_arreglo[12];
  $scope.fecha14 = fechas_arreglo[13];
  $scope.dato14 = concretada_arreglo[13];
  $scope.fecha15 = fechas_arreglo[14];
  $scope.dato15 = concretada_arreglo[14];
  $scope.fecha16 = fechas_arreglo[15];
  $scope.dato16 = concretada_arreglo[15];


  //$scope.myJsonSemanalDisciplina1 = Bullet_creator([98, 97, 98, 98, 97, 99, 108,103, 98, 110, 108, 99, 98, 104], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], ["Misc TTE7", "Misc Sub 6", "Misc Sub 5", "TTE 6 Acarrea", "Diablo regimineto", "Pipa Norte", "Chancado colon", "Salvataje", "Taller La Junta", "Aire Acondicionado", "Colectores de polvo", "Puertas Mina", "Ventilacion Local", "Agua Acida"])
  //$scope.myJsonSemanalDisciplina2 = Bullet_creator([], [100,100,100,100, 100, 100, 100], ["Salvataje", "Taller La Junta", "Aire Acondicionado", "Colectores de polvo", "Puertas Mina", "Ventilacion Local", "Agua Acida"])
  //let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][nueva_fecha.getDay()];
  /*var array_name_zone = ["Tt6", "Tte sub 5"];
  var name_visited = [];
  var exact_days = get_day_numbers(nueva_fecha);
  var array_week = [];
  for (a=0; a<get_day_numbers(nueva_fecha).length; a++){
    converted_date_2 = get_day_numbers(nueva_fecha)[a].toISOString().split('T')[0];
    fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
    array_week.push(fecha_2);
  }
  
  
  var array_values = [];
  for (a=0; a<local_data_disciplina.length; a++){
    if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
      if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
        name_visited.push(local_data_disciplina[a].Area);
        var aux_arr = [0,0,0,0,0];
        aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        array_values.push(aux_arr);
      }
      else{
        array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
      }

    }
  }*/
  var name_visited = [];
  var meta = [];
  var week_day = 0;
  var exact_days = get_day_numbers(nueva_fecha);
  var array_week = [];
  for (a=0; a<get_day_numbers($scope.dateselected).length; a++){
    nueva_fecha_2 = new Date(exact_days[a] - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
    fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
    array_week.push(fecha_2);
    if(fecha_2==fecha){
      week_day=a;
    }
  }

    
  var array_suma_meta =[];
  var array_values = [];
  for (a=0; a<local_data_disciplina.length; a++){
    if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
      if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
        name_visited.push(local_data_disciplina[a].Area);
        meta.push(local_data_disciplina[a].Meta)
        var aux_arr = [0,0,0,0,0];
        aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        array_values.push(aux_arr);
        //array_float.push(aux_arr);
        //console.log(aux_arr)

      }
      else{
        array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        //array_float[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
      }
    }
  }
    
    
  for(a=0; a < array_values.length; a++){
    suma = 0;
    for(b=0; b < array_values[a].length; b++){
      suma+= array_values[a][b];
      array_values[a][b] = Math.round(parseFloat(array_values[a][b]/(parseInt(meta[a].split(":")[0])*60 + parseInt(meta[a].split(":")[1]) ))*100);
      //array_float[a][b] = parseFloat(array_values[a][b]/(meta[a].split(":")[0]*60 + meta[a].split(":")[1]*6 ))*100;
    }
    array_suma_meta.push(suma);
  }


  for(a=0; a<array_suma_meta.length; a++){
    array_suma_meta[a] = Math.round((parseFloat(array_suma_meta[a]/((parseInt(meta[a].split(':')[0])*60 + parseInt(meta[a].split(':')[1]))*5))*100).toFixed(8))
  }

  var meta_semanal = [];
  var diccionario_values =[];
    

  for(a=0 ; a<array_values.length ; a++){
    var diccionario_aux = {};
    diccionario_aux.values = array_values[a];
    diccionario_aux.name = name_visited[a];
    diccionario_aux.meta = array_suma_meta[a];
    diccionario_values.push(diccionario_aux);
  }


  var sorted_dictionary = diccionario_values.sort(function(a,b){
    return a.meta - b.meta
  })

  var array_values = [];
  var array_suma_meta = [];
  var name_visited = [];

  for (a=0; a < sorted_dictionary.length; a++){
    array_values.push(sorted_dictionary[a].values);
    name_visited.push(sorted_dictionary[a].name);
    array_suma_meta.push(sorted_dictionary[a].meta)
  }

  if(array_values.length>1){
    $scope.myJsonSemanalDisciplina1 = Bullet_creator([array_values[0][week_day],array_values[1][week_day], array_values[2][week_day], array_values[3][week_day], array_values[4][week_day], array_values[5][week_day], array_values[6][week_day], array_values[7][week_day], array_values[8][week_day], array_values[9][week_day], array_values[10][week_day], array_values[11][week_day], array_values[12][week_day], array_values[13][week_day]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])

  }
  

  $scope.dateselected = new Date()
  $scope.myJsonTest = line_chart(array_values, name_visited)






  $scope.changeaire = function(name){
    //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
    var datos_x_aire_deseados=[];
    var datos_x_aire_completados=[];
    $scope.tipochangeaire = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_aire_deseados.push(0);
      datos_x_aire_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangeaire = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizAire=bar_planmatriz(array_dias, datos_x_aire_deseados, datos_x_aire_completados, "Aire Acondicionado")
    }
    else if(name=="anual"){
      var anual_aire_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_aire_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_aire_deseados, anual_aire_completados, "Aire Acondicionado")
    }
  }

  $scope.changepolvo = function(name){
    //$scope.myMatrizAire = Chart_creator(meses, Anual_aire, 0, "Plan matriz anual Aire Acondicionado")
    var datos_x_polvo_deseados=[];
    var datos_x_polvo_completados=[];
    $scope.tipochangepolvo = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_polvo_deseados.push(0);
      datos_x_polvo_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangepolvo = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizColectores=bar_planmatriz(array_dias, datos_x_polvo_deseados, datos_x_polvo_completados, "Colectores de Polvo")
    }
    else if(name=="anual"){
      var anual_polvo_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_polvo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_polvo_deseados, anual_polvo_completados, "Colectores de Polvo")
    }
  }

  $scope.changeventilacion = function(name){
    var datos_x_ventilacion_deseados=[];
    var datos_x_ventilacion_completados=[];
    $scope.tipochangeventilacion = "anual";
    //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    //converted_date = nueva_fecha.toISOString().split('T')[0];
    //fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_ventilacion_deseados.push(0);
      datos_x_ventilacion_completados.push(0);
    }
    if(name=="mensual"){
      $scope.tipochangeventilacion = "mensual";
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizVentilacion=bar_planmatriz(array_dias, datos_x_ventilacion_deseados, datos_x_ventilacion_completados, "Ventilación")
    }
    else if(name=="anual"){
      var anual_ventilacion_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_ventilacion_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_ventilacion_deseados, anual_ventilacion_completados, "Ventilación")
    }
  }
  $scope.changepuertas = function(name){
    $scope.tipochangevimo = "anual";
    var datos_x_vimo_completados=[];
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_vimo_completados.push(0);
    }

    if(name=="mensual"){
      $scope.tipochangevimo = "mensual";
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Fecharevision.split("-")[1] == fecha.split("-")[1] && local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          datos_x_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[0])-1]+=1;
        }
      }

      $scope.myMatrizPuertas = bar_planmatriz(array_dias, [0,0,0,0,0,0,0,0,0,0,0,0], datos_x_vimo_completados, "Puertas Vimo" )
    }

    else{
      $scope.tipochangevimo = "anual";
      var anual_vimo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a < local_data_puertas.length; a++){
        if( local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          anual_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
        }
      }
      array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
      for(a=0; a <local_data_sap.length; a++){
        var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
        nummes = parseInt(obtenerMes(result))-1
        array_total_mes_vimo[nummes]+=1;
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo, anual_vimo_completados, "Puertas Vimo")

    }



  }


  $scope.modalbrocalessub5 = function(){
    $scope.Totalbrocalessubmodal = [];
    var fechas = [];
    
    var fechas_visitadas = [];
    var id_visitados =[];
    if($scope.typebrocal5=="anual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="5" && parseInt(local_data_brocales[a].Cantidad)!=0){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }
    else if($scope.typebrocal5=="mensual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="5" && parseInt(local_data_brocales[a].Cantidad)!=0 && local_data_brocales[a].Fecha.split("-")[1]==fecha.split("-")[1]){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }

    var datos_preliminares = [];
    var recien = false;
    for(a=0; a<local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="5"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1 && local_data_brocales[a].Cantidad!=""){
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          fechas_visitadas.push(local_data_brocales[a].Fecha);
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push(parseInt(local_data_brocales[a].Demanda))
          datos.push(local_data_brocales[a].Dotacion)
          datos.push(local_data_brocales[a].Ubicacion)
          datos_preliminares.push(datos);
          recien = true;
        }
        if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) == -1){
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][1]+= parseInt(local_data_brocales[a].Cantidad);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][2]+= parseInt(local_data_brocales[a].Demanda);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][3]+=", "+local_data_brocales[a].Dotacion;
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          id_visitados.push(local_data_brocales[a].Uniqueid);
        }

        else if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) != -1 && recien !=true){
          if(local_data_brocales[a].Ubicacion!= ""){
            datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          }
        }
        recien = false;
      }
    }

    for(a=0; a<datos_preliminares.length; a++){
      var datos = [];
      datos.push(datos_preliminares[a][0]);
      datos.push(parseInt(datos_preliminares[a][1]));
      datos.push("Demanda : " +datos_preliminares[a][2])
      datos.push("Dotacion : " +datos_preliminares[a][3])
      datos.push("Ubicaciones : " +datos_preliminares[a][4])
      fechas.push(datos);
    }


    /*for(a=0; a <local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="5"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1){  
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push("Demanda : " +local_data_brocales[a].Demanda)
          datos.push("Dotacion : " +local_data_brocales[a].Dotacion)
          datos.push("Ubicaciones : " +local_data_brocales[a].Ubicacion)
          fechas.push(datos);
          fechas_visitadas.push(local_data_brocales[a].Fecha)
        }

      }
    }*/

    /*
    var diccionario_values =[];
    

    for(a=0 ; a<array_values.length ; a++){
      var diccionario_aux = {};
      diccionario_aux.values = array_values[a];
      diccionario_aux.name = name_visited[a];
      diccionario_aux.meta = array_suma_meta[a];
      diccionario_values.push(diccionario_aux);
    }
    */
    //$scope.myJsonCalendarBrocales = calendar_creator(fechas);

    
    /*var contador_de_meses=1;
    var dia=1;
    var mes=1;
    for(b=1; b<=12;b++){
      for(c=1;c<=getDays(parseInt(2022), parseInt(b)); c++){
        if(fechas_visitadas.indexOf(c.toString()+"-"+b.toString()+"-"+fecha.split("-")[2]) ==-1){
          var datos=[]
          if(b<10){
            if(c<10){
              //datos.push("2016"+"-"+"0"+b.toString()+"-"+"0"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+"0"+b.toString()+"-"+"0"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            else{
              //datos.push("2016"+"-"+"0"+b.toString()+"-"+c.toString());
              datos.push(fecha.split("-")[2]+"-"+"0"+b.toString()+"-"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            
          }
          else{
            if(c<10){
              //datos.push("2016"+"-"+b.toString()+"-"+"0"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+b.toString()+"-"+"0"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
            else{
              //datos.push("2016"+"-"+b.toString()+"-"+c.toString())
              datos.push(fecha.split("-")[2]+"-"+b.toString()+"-"+c.toString());
              datos.push(3);
              fechas.push(datos);
            }
          }
          
        }
      }
    }*/
    $scope.myJsonCalendarBrocales = calendar_creator(fechas);
  

    
  }
  $scope.modalbrocalessub6 = function(){
    var fechas = [];
    
    var fechas_visitadas = [];
    $scope.Totalbrocalessubmodal = [];
    if($scope.typebrocal6=="anual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="6" && parseInt(local_data_brocales[a].Cantidad)!=0){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }

    else if($scope.typebrocal6=="mensual"){
      for(a=0; a<local_data_brocales.length; a++){
        if(local_data_brocales[a].Sub=="6" && parseInt(local_data_brocales[a].Cantidad)!=0 && local_data_brocales[a].Fecha.split("-")[1]==fecha.split("-")[1]){
          $scope.Totalbrocalessubmodal.push(local_data_brocales[a])
        }
      }
    }
    var recien = false;
    var datos_preliminares = [];
    var id_visitados = [];
    for(a=0; a<local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="6"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1 && local_data_brocales[a].Cantidad!=""){
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          fechas_visitadas.push(local_data_brocales[a].Fecha);
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push(parseInt(local_data_brocales[a].Demanda))
          datos.push(local_data_brocales[a].Dotacion)
          datos.push(local_data_brocales[a].Ubicacion)
          datos_preliminares.push(datos);
          recien = true;
        }
        if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) == -1){
          id_visitados.push(local_data_brocales[a].Uniqueid);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][1]+= parseInt(local_data_brocales[a].Cantidad);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][2]+= parseInt(local_data_brocales[a].Demanda);
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][3]+=", "+local_data_brocales[a].Dotacion;
          datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
        }

        else if (fechas_visitadas.indexOf(local_data_brocales[a].Fecha) != -1 && id_visitados.indexOf(local_data_brocales[a].Uniqueid) != -1 && recien !=true){
          if(local_data_brocales[a].Ubicacion!= ""){
            datos_preliminares[fechas_visitadas.indexOf(local_data_brocales[a].Fecha)][4]+=", "+local_data_brocales[a].Ubicacion;
          }
        }
        recien = false;
      }
    }


    for(a=0; a<datos_preliminares.length; a++){
      var datos = [];
      datos.push(datos_preliminares[a][0]);
      datos.push(parseInt(datos_preliminares[a][1]));
      datos.push("Demanda : " +datos_preliminares[a][2])
      datos.push("Dotacion : " +datos_preliminares[a][3])
      datos.push("Ubicaciones : " +datos_preliminares[a][4])
      fechas.push(datos);
    }
    /*for(a=0; a <local_data_brocales.length; a++){
      if(local_data_brocales[a].Sub=="6"){
        if(fechas_visitadas.indexOf(local_data_brocales[a].Fecha) == -1){  
          var datos = [];
          fecha_cambiada = local_data_brocales[a].Fecha.split("-")[2]+"-"+local_data_brocales[a].Fecha.split("-")[1]+"-"+local_data_brocales[a].Fecha.split("-")[0]
          datos.push(fecha_cambiada);
          datos.push(parseInt(local_data_brocales[a].Cantidad));
          datos.push("Demanda : " +local_data_brocales[a].Demanda)
          datos.push("Dotacion : " +local_data_brocales[a].Dotacion)
          datos.push("Ubicaciones : " +local_data_brocales[a].Ubicacion)
          fechas.push(datos);
          fechas_visitadas.push(local_data_brocales[a].Fecha)
        }

      }
    }*/
    $scope.myJsonCalendarBrocales = calendar_creator(fechas);
    
  }


  $scope.changebrocal5 = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal 

    if(name=="mensual"){
      $scope.typebrocal5="mensual";
      var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var datos_x_dias_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var datos_x_deseados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      var fechas_visitadas =[];
      var id_visitados_sub5 = [];
      for(b = 0; b < local_data_brocales.length; b++){
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="5" && local_data_brocales[b].Ubicacion!="" && local_data_brocales[b].Cantidad !=0 ){ 
          //datos_x_dias_sub5[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= parseInt(local_data_brocales[b].Cantidad);     
          datos_x_dias_sub5[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= 1;
        }
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="5" && id_visitados_sub5.indexOf(local_data_brocales[b].Uniqueid) == -1){
          
          datos_x_deseados[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1] += parseInt(local_data_brocales[b].Demanda);
          id_visitados_sub5.push(local_data_brocales[b].Uniqueid);
        }
      }
      $scope.myJsonAnualsub5 = Chart_creator(dias, datos_x_dias_sub5, datos_x_deseados, "Limpieza de brocales Sub 5");
      
      var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
        array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
      }

      $scope.myJsonBarBrocalessub5 = bar_brocales(datos_x_deseados, datos_x_dias_sub5,array_dias ,5, "5")

      //------------------------------------------------------------------------------------------//
      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString() ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }


      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="5" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString()){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];


      //-----------------------------------------------------------------------------------------------//



    }

    else if(name=="anual"){
      $scope.typebrocal5="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub5 =[];
      var deseados_x_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0];
      var id_visitados_sub5 = [];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5"){
          if(id_visitados_sub5.indexOf(local_data_brocales[a].Uniqueid) == -1 ){
            
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
            deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            id_visitados_sub5.push(local_data_brocales[a].Uniqueid);
          }
        }
      }


      /*
      if(local_data_brocales[a].Sub == "5"){
        if(contando_lugares_sub5.indexOf(local_data_brocales[a].Ubicacion)==-1){
          contando_lugares_sub5.push(local_data_brocales[a].Ubicacion);
        }
        if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1){
          mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
          datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
          fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
        }
        
      }
      */
      $scope.myJsonAnualsub5 = Chart_creator(meses,datos_x_sub5, deseados_x_sub5, "Limpieza de brocales Sub 5");

      $scope.myJsonBarBrocalessub5 = bar_brocales(deseados_x_sub5, datos_x_sub5 , ["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"] ,20, "5")

      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5" ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }

      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="5" ){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }
  }

  $scope.changebrocal6 = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = $scope.fecha_universal 
    if(name=="mensual"){
      $scope.typebrocal6="mensual"
      var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
      var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var datos_x_deseados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_visitadas =[]
      var id_visitados_sub6 = [];
      for(b = 0; b < local_data_brocales.length; b++){
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="6" && local_data_brocales[b].Ubicacion!="" && local_data_brocales[b].Cantidad != 0){
          //datos_x_dias_sub6[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+= parseInt(local_data_brocales[b].Cantidad);
          datos_x_dias_sub6[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1]+=1;
        }
        if(local_data_brocales[b].Fecha.split("-")[1].toString() == fecha.split("-")[1].toString() && local_data_brocales[b].Sub =="6" && id_visitados_sub6.indexOf(local_data_brocales[b].Uniqueid) == -1 && local_data_brocales[b].Demanda !="" ){
          datos_x_deseados[parseInt(local_data_brocales[b].Fecha.split("-")[0])-1] += parseInt(local_data_brocales[b].Demanda);
          id_visitados_sub6.push(local_data_brocales[b].Uniqueid);
        }

      }
      $scope.myJsonAnualsub6 = Chart_creator(dias, datos_x_dias_sub6, datos_x_deseados, "Limpieza de brocales Sub 6");

      var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
      if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
        array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
      }
      $scope.myJsonBarBrocalessub6 = bar_brocales(datos_x_deseados, datos_x_dias_sub6,array_dias ,5, "6")

      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString() ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }


      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="6" && local_data_brocales[a].Fecha.split("-")[1].toString()==fecha.split("-")[1].toString()){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }

    else if(name=="anual"){

      /*
      $scope.typebrocal5="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub5 =[];
      var deseados_x_sub5 =[0,0,0,0,0,0,0,0,0,0,0,0];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "5"){
          if(fechas_vistas_sub5.indexOf(local_data_brocales[a].Fecha) == -1 ){
            
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            datos_x_sub5[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
            deseados_x_sub5[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            fechas_vistas_sub5.push(local_data_brocales[a].Fecha);
          }
        }
      }
      */
      /*
      if(fechas_vistas_sub6.indexOf(local_data_brocales[a].Fecha) == -1){
        mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
        if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
          datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
          deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
        }
        
        fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
      }*/
      $scope.typebrocal6="anual"
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      var datos_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var fechas_vistas_sub6= [];
      var deseados_x_sub6 = [0,0,0,0,0,0,0,0,0,0,0,0];
      var id_visitados_sub6 = [];
      for (a=0; a <local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6"){
          if(id_visitados_sub6.indexOf(local_data_brocales[a].Uniqueid) == -1 ){
            mes = ObtenerMes_2(parseInt(local_data_brocales[a].Fecha.split("-")[1]));
            if(local_data_brocales[a].Cantidad !="" && local_data_brocales[a].Demanda !=""){
              datos_x_sub6[meses.indexOf(mes)] += parseInt(local_data_brocales[a].Cantidad);
              deseados_x_sub6[meses.indexOf(mes)]+=parseInt(local_data_brocales[a].Demanda);
            }
            id_visitados_sub6.push(local_data_brocales[a].Uniqueid);
            //fechas_vistas_sub6.push(local_data_brocales[a].Fecha);
          }
          
        }
      }
      $scope.myJsonAnualsub6 = Chart_creator(meses,datos_x_sub6,deseados_x_sub6, "Limpieza de brocales Sub 6");
      $scope.myJsonBarBrocalessub6 = bar_brocales(deseados_x_sub6, datos_x_sub6 , ["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"] ,20, "6")


      Completados_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      Faltantes_sub5 = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
      $scope.Nombres_sub5 = [];
      for(a=0; a < local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub == "6" ){
          if(local_data_brocales[a].Cantidad != "0"){
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) ==-1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Completados_sub5[$scope.Nombres_sub5.length-1]+=parseInt(local_data_brocales[a].Cantidad);
            }
            else{
              Completados_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)]+=parseInt(local_data_brocales[a].Cantidad);
            }
          }
          else{
            if($scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion) == -1){
              $scope.Nombres_sub5.push(local_data_brocales[a].Ubicacion);
              Faltantes_sub5[$scope.Nombres_sub5.length-1]+=1
            }
            else{
              Faltantes_sub5[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] += 1
            }
          }
        }
      }

      $scope.myJsonUbicacion1 = pie3d(Completados_sub5[0], Faltantes_sub5[0], $scope.Nombres_sub5[0]);
      $scope.myJsonUbicacion2 = pie3d(Completados_sub5[1], Faltantes_sub5[1], $scope.Nombres_sub5[1]);
      $scope.myJsonUbicacion3 = pie3d(Completados_sub5[2], Faltantes_sub5[2], $scope.Nombres_sub5[2]);
      $scope.myJsonUbicacion4 = pie3d(Completados_sub5[3], Faltantes_sub5[3], $scope.Nombres_sub5[3]);
      $scope.myJsonUbicacion5 = pie3d(Completados_sub5[4], Faltantes_sub5[4], $scope.Nombres_sub5[4]);
      $scope.myJsonUbicacion6 = pie3d(Completados_sub5[5], Faltantes_sub5[5], $scope.Nombres_sub5[5]);
      $scope.myJsonUbicacion7 = pie3d(Completados_sub5[6], Faltantes_sub5[6], $scope.Nombres_sub5[6]);
      $scope.myJsonUbicacion8 = pie3d(Completados_sub5[7], Faltantes_sub5[7], $scope.Nombres_sub5[7]);
      $scope.myJsonUbicacion9 = pie3d(Completados_sub5[8], Faltantes_sub5[8], $scope.Nombres_sub5[8]);
      $scope.myJsonUbicacion10 = pie3d(Completados_sub5[9], Faltantes_sub5[9], $scope.Nombres_sub5[9]);
      $scope.myJsonUbicacion11 = pie3d(Completados_sub5[10], Faltantes_sub5[10], $scope.Nombres_sub5[10]);
      $scope.myJsonUbicacion12 = pie3d(Completados_sub5[11], Faltantes_sub5[11], $scope.Nombres_sub5[11]);
      $scope.myJsonUbicacion13 = pie3d(Completados_sub5[12], Faltantes_sub5[12], $scope.Nombres_sub5[12]);
      $scope.myJsonUbicacion14 = pie3d(Completados_sub5[13], Faltantes_sub5[13], $scope.Nombres_sub5[13]);
      $scope.myJsonUbicacion15 = pie3d(Completados_sub5[14], Faltantes_sub5[14], $scope.Nombres_sub5[14]);
      $scope.myJsonUbicacion16 = pie3d(Completados_sub5[15], Faltantes_sub5[15], $scope.Nombres_sub5[15]);

      var fechas_arreglo =[];
      var concretada_arreglo =[];
      for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
        fechas_arreglo.push("0-0-0");
        concretada_arreglo.push("No");
      }
      for(a = 0; a<local_data_brocales.length ; a++){
        if(local_data_brocales[a].Sub=="6" ){
          if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
            fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
            if(local_data_brocales[a].Cantidad!=0){
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
            }
            else{
              concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
            }
          }
        }
      }
      $scope.fecha1 = fechas_arreglo[0];
      $scope.dato1 = concretada_arreglo[0];
      $scope.fecha2 = fechas_arreglo[1];
      $scope.dato2 = concretada_arreglo[1];
      $scope.fecha3 = fechas_arreglo[2];
      $scope.dato3 = concretada_arreglo[2];
      $scope.fecha4 = fechas_arreglo[3];
      $scope.dato4 = concretada_arreglo[3];
      $scope.fecha5 = fechas_arreglo[4];
      $scope.dato5 = concretada_arreglo[4];
      $scope.fecha6 = fechas_arreglo[5];
      $scope.dato6 = concretada_arreglo[5];
      $scope.fecha7 = fechas_arreglo[6];
      $scope.dato7 = concretada_arreglo[6];
      $scope.fecha8 = fechas_arreglo[7];
      $scope.dato8 = concretada_arreglo[7];
      $scope.fecha9 = fechas_arreglo[8];
      $scope.dato9 = concretada_arreglo[8];
      $scope.fecha10 = fechas_arreglo[9];
      $scope.dato10 = concretada_arreglo[9];
      $scope.fecha11 = fechas_arreglo[10];
      $scope.dato11 = concretada_arreglo[10];
      $scope.fecha12 = fechas_arreglo[11];
      $scope.dato12 = concretada_arreglo[11];
      $scope.fecha13 = fechas_arreglo[12];
      $scope.dato13 = concretada_arreglo[12];
      $scope.fecha14 = fechas_arreglo[13];
      $scope.dato14 = concretada_arreglo[13];
      $scope.fecha15 = fechas_arreglo[14];
      $scope.dato15 = concretada_arreglo[14];
      $scope.fecha16 = fechas_arreglo[15];
      $scope.dato16 = concretada_arreglo[15];
    }

  }
  

  $scope.changegraphview = function(name){
    var total_deseadas = [0,0,0,0,0,0,0,0,0,0,0,0];
    var total_completadas = [0,0,0,0,0,0,0,0,0,0,0,0];
    fecha = $scope.fecha_universal
    for(e=0; e < local_data_matriz.length; e++){
      if(local_data_matriz[e].Area == name ){
        total_deseadas[parseInt(local_data_matriz[e].Fecha.split("-")[1])-1]+=1;
        if(local_data_matriz[e].Observaciones == null){
          total_completadas[parseInt(local_data_matriz[e].Fecha.split("-")[1])-1]+=1;
        }
      }
    }
    $scope.myJsonAnualmatriz = mixed_creator(total_deseadas,total_completadas, name);


    $scope.myJsonpieCumplimiento = Pie_Cumplimiento(total_deseadas[parseInt(fecha.split("-")[1])-1], total_completadas[parseInt(fecha.split("-")[1])-1], name )

  }

  $scope.modalmatriz = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    var nuevo_array = [];
    $scope.Totalmatriz =[];
    for(b = 0; b < local_data_matriz.length ; b++){
      if(local_data_matriz[b].Area == name.toString() && local_data_matriz[b].Fecha == fecha){
        $scope.Totalmatriz.push(local_data_matriz[b]);
      }
    }
  }
  $scope.modalasistencia = function(name){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];
    fecha = $scope.fecha_universal
    var nuevo_array =[];
    $scope.Totalasistencia = [];     
    for(a = 0; a < local_data_asistencia.length; a++){        
      if(local_data_asistencia[a].Sector.toString() == name && local_data_asistencia[a].Fechaingreso == fecha){
        $scope.Totalasistencia.push(local_data_asistencia[a]);     
      }
    }
    
    
     
  }
  
  $scope.changeinformation = function(){
    nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];

    $scope.fecha_universa = fecha;
    $scope.fecha_universal  = angular.copy($scope.fecha_universa);

    //let weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][nueva_fecha.getDay()];
    
    $scope.fechahoy=fecha;
    $scope.nombre_sectores_array =[];
    $scope.total_trabajadores_array = [];
    $scope.asistencia_total_trabajadores_array = [];
    total_trabajadores = 0;
    asistencia_trabajadores = 0;
    for(c=0; c < local_data_asistencia.length ; c++){
      if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector) == -1 && local_data_asistencia[c].Fechaingreso == fecha){
        $scope.nombre_sectores_array.push(local_data_asistencia[c].Sector);
        $scope.total_trabajadores_array.push(1);
        $scope.asistencia_total_trabajadores_array.push(0);
        if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"){
          $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        }
      }
      else if($scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)!=-1 && local_data_asistencia[c].Fechaingreso == fecha){
        $scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        if(local_data_asistencia[c].Turno == "A" || local_data_asistencia[c].Turno == "B" || local_data_asistencia[c].Turno == "C"){
          $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf(local_data_asistencia[c].Sector)]+=1;
        }
      } 
    }



    $scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[0], $scope.asistencia_total_trabajadores_array[0], $scope.nombre_sectores_array[0]);
    $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[1], $scope.asistencia_total_trabajadores_array[1], $scope.nombre_sectores_array[1]);
    $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[2], $scope.asistencia_total_trabajadores_array[2], $scope.nombre_sectores_array[2]);
    $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[3], $scope.asistencia_total_trabajadores_array[3], $scope.nombre_sectores_array[3]);
    $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[4], $scope.asistencia_total_trabajadores_array[4], $scope.nombre_sectores_array[4]);
    $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[5], $scope.asistencia_total_trabajadores_array[5], $scope.nombre_sectores_array[5]);
    $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[6], $scope.asistencia_total_trabajadores_array[6], $scope.nombre_sectores_array[6]);
    $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[7], $scope.asistencia_total_trabajadores_array[7], $scope.nombre_sectores_array[7]);
    $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[8], $scope.asistencia_total_trabajadores_array[8], $scope.nombre_sectores_array[8]);
    $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[9], $scope.asistencia_total_trabajadores_array[9], $scope.nombre_sectores_array[9]);
    $scope.myJsonpieasistencia11 = Pie_creator($scope.total_trabajadores_array[10], $scope.asistencia_total_trabajadores_array[10], $scope.nombre_sectores_array[10]);
    $scope.myJsonpieasistencia12 = Pie_creator($scope.total_trabajadores_array[11], $scope.asistencia_total_trabajadores_array[11], $scope.nombre_sectores_array[11]);
    $scope.myJsonpieasistencia13 = Pie_creator($scope.total_trabajadores_array[12], $scope.asistencia_total_trabajadores_array[12], $scope.nombre_sectores_array[12]);
    $scope.myJsonpieasistencia14 = Pie_creator($scope.total_trabajadores_array[13], $scope.asistencia_total_trabajadores_array[13], $scope.nombre_sectores_array[13]);
    $scope.myJsonpieasistencia15 = Pie_creator($scope.total_trabajadores_array[14], $scope.asistencia_total_trabajadores_array[14], $scope.nombre_sectores_array[14]);
    $scope.myJsonpieasistencia16 = Pie_creator($scope.total_trabajadores_array[15], $scope.asistencia_total_trabajadores_array[15], $scope.nombre_sectores_array[15]);
    $scope.myJsonpieasistencia17 = Pie_creator($scope.total_trabajadores_array[16], $scope.asistencia_total_trabajadores_array[16], $scope.nombre_sectores_array[16]);
    $scope.myJsonpieasistencia18 = Pie_creator($scope.total_trabajadores_array[17], $scope.asistencia_total_trabajadores_array[17], $scope.nombre_sectores_array[17]);
    $scope.myJsonpieasistencia19 = Pie_creator($scope.total_trabajadores_array[18], $scope.asistencia_total_trabajadores_array[18], $scope.nombre_sectores_array[18]);
    $scope.myJsonpieasistencia20 = Pie_creator($scope.total_trabajadores_array[19], $scope.asistencia_total_trabajadores_array[19], $scope.nombre_sectores_array[19]);
    $scope.myJsonpieasistencia21 = Pie_creator($scope.total_trabajadores_array[20], $scope.asistencia_total_trabajadores_array[20], $scope.nombre_sectores_array[20]);
    $scope.myJsonpieasistencia22 = Pie_creator($scope.total_trabajadores_array[21], $scope.asistencia_total_trabajadores_array[21], $scope.nombre_sectores_array[21]);
    $scope.myJsonpieasistencia23 = Pie_creator($scope.total_trabajadores_array[22], $scope.asistencia_total_trabajadores_array[22], $scope.nombre_sectores_array[22]);
    $scope.myJsonpieasistencia24 = Pie_creator($scope.total_trabajadores_array[23], $scope.asistencia_total_trabajadores_array[23], $scope.nombre_sectores_array[23]);
    $scope.myJsonpieasistencia25 = Pie_creator($scope.total_trabajadores_array[24], $scope.asistencia_total_trabajadores_array[24], $scope.nombre_sectores_array[24]);

    
    /*$scope.myJsonpieasistencia1 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB-5")], "Sub 5");
    $scope.myJsonpieasistencia2 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PIPA NORTE QT PACIFICO SUPERIOR")], "PIPA NORTE");
    $scope.myJsonpieasistencia3 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TTE 6 ACARREO ")],"TTE 6 ACARREO " );
    $scope.myJsonpieasistencia4 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("DIABLO REGIMIENTO ")], "DIABLO REGIMIENTO ");
    $scope.myJsonpieasistencia5 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SUB 6 RENO")],"SUB 6 RENO" );
    $scope.myJsonpieasistencia6 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("TENIENTE 7 ACARREO")],"TENIENTE 7 ACARREO" );
    $scope.myJsonpieasistencia7 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("LA JUNTA")], "LA JUNTA");
    $scope.myJsonpieasistencia8 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OP-20/21")],"OP-20/21" );
    $scope.myJsonpieasistencia9 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("CHANCADO PRIMARIO COLON")], "CHANCADO PRIMARIO COLON");
    $scope.myJsonpieasistencia10 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AGUAS CONTACTO MINA TURNOS 4X4")], "ACCU TURNOS");
    $scope.myJsonpieasistencia11 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VOLANTE LINEA DE VIDA")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VOLANTE LINEA DE VIDA")], "VOLANTE LINEA DE VIDA");
    $scope.myJsonpieasistencia12 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PILAR NORTE ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PILAR NORTE ")], "PILAR NORTE ");
    $scope.myJsonpieasistencia13 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PUERTAS")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PUERTAS")],"PUERTAS" );
    $scope.myJsonpieasistencia14 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("COLECTORES DE POLVO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("COLECTORES DE POLVO")], "COLECTORES DE POLVO");
    $scope.myJsonpieasistencia15 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("BODEGUERO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("BODEGUERO")],"BODEGUERO" );
    $scope.myJsonpieasistencia16 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VENTILACION LOCAL")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VENTILACION LOCAL")],"VENTILACION LOCAL" );
    $scope.myJsonpieasistencia17 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AIRE ACONDICIONADO ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("AIRE ACONDICIONADO ")], "AIRE ACONDICIONADO ");
    $scope.myJsonpieasistencia18 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VIDRIOS")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("VIDRIOS")],"VIDRIOS" );
    $scope.myJsonpieasistencia19 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SALVATAJE ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("SALVATAJE ")], "SALVATAJE ");
    $scope.myJsonpieasistencia20 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PREVENCION")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("PREVENCION")], "PREVENCION");
    $scope.myJsonpieasistencia21 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("JEFES DE TURNO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("JEFES DE TURNO")], "JEFES DE TURNO");
    $scope.myJsonpieasistencia22 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("JEFE DE TERRENO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("JEFE DE TERRENO")], "JEFE DE TERRENO");
    $scope.myJsonpieasistencia23 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OFICINA TECNICA ")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("OFICINA TECNICA ")],"OFICINA TECNICA " );
    $scope.myJsonpieasistencia24 = Pie_creator($scope.total_trabajadores_array[$scope.nombre_sectores_array.indexOf("ADMINISTRADOR DE CONTRATO")], $scope.asistencia_total_trabajadores_array[$scope.nombre_sectores_array.indexOf("ADMINISTRADOR DE CONTRATO")], "ADMINISTRADOR DE CONTRATO");
    */
    /*var asistencia_A = [];
    var asistencia_B = [];
    var asistencia_C = [];
    */

    /*var asistencia_A = [0,0,0,0,0,0,0,0,0,0];
    var asistencia_B = [0,0,0,0,0,0,0,0,0,0];
    var asistencia_C = [0,0,0,0,0,0,0,0,0,0];
    for(a=0 ; a < local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Fechaingreso == fecha){
        if(sector_visited.indexOf(local_data_asistencia[a].Sector) == -1 ){
          //sector_visited.push(local_data_asistencia[a].Sector)
          //asistencia_A.push(0)
          //asistencia_B.push(0)
          //asistencia_C.push(0)

          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          if(local_data_asistencia[a].Turno == "C"){
            asistencia_C[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
        }
        else{
          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          if(local_data_asistencia[a].Turno == "C"){
            asistencia_C[sector_visited.indexOf(local_data_asistencia[a].Sector)]+=1
          }
        }
      }
    }*/


    var all_sector = [];
    var asistencia_A = [];
    var asistencia_B = [];
    var asistencia_nopresente =[];

    for(a=0; a<local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Fechaingreso == fecha && all_sector.indexOf(local_data_asistencia[a].Sector) == -1){
        all_sector.push(local_data_asistencia[a].Sector)
        asistencia_A.push(0)
        asistencia_B.push(0)
        asistencia_nopresente.push(0)
      }
    }


    for(a=0 ; a < local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Fechaingreso == fecha){
        if(all_sector.indexOf(local_data_asistencia[a].Sector) == -1 ){
          //sector_visited.push(local_data_asistencia[a].Sector)
          //asistencia_A.push(0)
          //asistencia_B.push(0)
          //asistencia_C.push(0)

          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else{
            asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
          }
        }
        else{
          if(local_data_asistencia[a].Turno == "A"){
            asistencia_A[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else if(local_data_asistencia[a].Turno == "B"){
            asistencia_B[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1
          }
          else{
            asistencia_nopresente[all_sector.indexOf(local_data_asistencia[a].Sector)]+=1;
          }
        }
      }
    }



    $scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_nopresente, all_sector, fecha);
    //$scope.myJsonasistenciabar = asistencia_chart(asistencia_A, asistencia_B, asistencia_C, sector_visited, fecha);




    var total_array = [0,0,0];
    var completed_array = [0,0,0];
    
    for (d=0; d < local_data_matriz.length ; d++){
      if(local_data_matriz[d].Area == "Aire Acondicionado" && local_data_matriz[d].Fecha == fecha){
        total_array[0]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[0]+=1;
        }
      }
      else if(local_data_matriz[d].Area == "Colectores de polvo" && local_data_matriz[d].Fecha == fecha){
        //console.log("por aca ando")
        total_array[1]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[1]+=1;
        }
      }
      else if(local_data_matriz[d].Area == "Ventilación" && local_data_matriz[d].Fecha == fecha){
        total_array[2]+=1;
        if(local_data_matriz[d].Observaciones == null){
          completed_array[2]+=1;
        }
      }
    }

    var realizado = 0 ;
    for(d=0; d < local_data_puertas.length; d++){
      if(local_data_puertas[d].Fecharevision == fecha){
        realizado+=1;
      }
    }
    $scope.myJsonAnualaire = bar_creator(total_array[0],completed_array[0],"Aire Acondicionado");
    $scope.myJsonAnualpolvo = bar_creator(total_array[1],completed_array[1],"Colectores de polvo");
    $scope.myJsonAnualventilacion = bar_creator(total_array[2],completed_array[2],"Ventilación");


    $scope.myJsonAnualVimo = bar_vimo(realizado, "Puertas vimo")


    //-------------------------------------------------------- Cambio aire acondicionado, colectores de polvo y ventilación de la pestaña de plan matriz---------------------------------------------------------

    var datos_x_aire_deseados=[];
    var datos_x_aire_completados=[];
    var datos_x_polvo_deseados=[];
    var datos_x_polvo_completados=[];
    var datos_x_ventilacion_deseados=[];
    var datos_x_ventilacion_completados=[];
    //$scope.tipochangepolvo = "anual";
    fecha = $scope.fecha_universal;
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_aire_deseados.push(0);
      datos_x_aire_completados.push(0);
      datos_x_polvo_deseados.push(0);
      datos_x_polvo_completados.push(0);
      datos_x_ventilacion_deseados.push(0);
      datos_x_ventilacion_completados.push(0);
    }

    if($scope.tipochangeaire=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizAire=bar_planmatriz(array_dias, datos_x_aire_deseados, datos_x_aire_completados, "Aire Acondicionado")
    }
    else{
      var anual_aire_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_aire_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Aire Acondicionado"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_aire_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_aire_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizAire = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_aire_deseados, anual_aire_completados, "Aire Acondicionado")
    }


    if($scope.tipochangepolvo=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizColectores=bar_planmatriz(array_dias, datos_x_polvo_deseados, datos_x_polvo_completados, "Colectores de Polvo")
    }
    else{
      var anual_polvo_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_polvo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Colectores de polvo"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_polvo_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_polvo_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizColectores = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_polvo_deseados, anual_polvo_completados, "Colectores de Polvo")
    }


    if($scope.tipochangeventilacion=="mensual"){
      for(a=0; a < local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación" && local_data_matriz[a].Fecha.split("-")[1] == fecha.split("-")[1] && local_data_matriz[a].Fecha.split("-")[2] == fecha.split("-")[2] ){
          datos_x_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            datos_x_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[0])-1]+=1;
          }
        }
      }
      $scope.myMatrizVentilacion=bar_planmatriz(array_dias, datos_x_ventilacion_deseados, datos_x_ventilacion_completados, "Ventilación")
    }
    else{
      var anual_ventilacion_deseados=[0,0,0,0,0,0,0,0,0,0,0,0];
      var anual_ventilacion_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a<local_data_matriz.length; a++){
        if(local_data_matriz[a].Area=="Ventilación"  && fecha.split("-")[2] == local_data_matriz[a].Fecha.split("-")[2]){
          anual_ventilacion_deseados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          if(local_data_matriz[a].Observaciones==null){
            anual_ventilacion_completados[parseInt(local_data_matriz[a].Fecha.split("-")[1])-1]+=1;
          }
        }      
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      //$scope.myMatrizAire = Chart_creator(meses, anual_aire, 0, "Plan matriz anual Aire Acondicionado")
      $scope.myMatrizVentilacion = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], anual_ventilacion_deseados, anual_ventilacion_completados, "Ventilacion")
    }


    var datos_x_vimo_completados=[];
    var array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];
    if(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])) == 31){
      array_dias = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31]
    }
    for(b=0; b<getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])); b++){
      datos_x_vimo_completados.push(0);
    }

    if($scope.tipochangevimo=="mensual"){
      for(a=0; a < local_data_puertas.length; a++){
        if(local_data_puertas[a].Fecharevision.split("-")[1] == fecha.split("-")[1] && local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          datos_x_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[0])-1]+=1;
        }
      }

      $scope.myMatrizPuertas = bar_planmatriz(array_dias, [0,0,0,0,0,0,0,0,0,0,0,0], datos_x_vimo_completados, "Puertas Vimo" )
    }

    else{
      var anual_vimo_completados = [0,0,0,0,0,0,0,0,0,0,0,0];
      for(a=0; a < local_data_puertas.length; a++){
        if( local_data_puertas[a].Fecharevision.split("-")[2] == fecha.split("-")[2]){
          anual_vimo_completados[parseInt(local_data_puertas[a].Fecharevision.split("-")[1])-1]+=1;
        }
      }
      array_total_mes_vimo = [0,0,0,0,0,0,0,0,0,0,0,0]
      for(a=0; a <local_data_sap.length; a++){
        var result = local_data_sap[a].Mes.charAt(0).toUpperCase() + local_data_sap[a].Mes.slice(1).toLowerCase();
        nummes = parseInt(obtenerMes(result))-1
        array_total_mes_vimo[nummes]+=1;
      }
      var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
      $scope.myMatrizPuertas = bar_planmatriz(["En", "Feb", "Mar", "Abril", "May", "Jun", "Jul", "Ago", "Sept", "Oct", "Nov", "Dic"], array_total_mes_vimo, anual_vimo_completados, "Puertas Vimo")

    }





    //------------------------------------------------------------------------------------------------------------------------------------------------------------------

















    var info_sub5=[0,0];
    var info_sub6=[0,0];
    $scope.ubicacionessub5 ="";
    $scope.ubicacionessub6 ="";
    $scope.dotacionsub5="";
    $scope.dotacionsub6="";
    $scope.observacionessub5="";
    $scope.observacionessub6="";
    $scope.informacionsub5="";
    $scope.informacionsub6="";
    var entrarsub5=true;
    var entrarsub6=true;
    for(a=0; a < local_data_brocales.length ; a++){
      if(local_data_brocales[a].Fecha == fecha){
        if(local_data_brocales[a].Sub=="5"){
          info_sub5[0]=parseInt(local_data_brocales[a].Cantidad);
          info_sub5[1]=parseInt(local_data_brocales[a].Demanda);
          $scope.ubicacionessub5+=local_data_brocales[a].Ubicacion;
          $scope.dotacionsub5=local_data_brocales[a].Dotacion;
          $scope.observacionessub5=local_data_brocales[a].Observaciones;
          if(local_data_brocales[a].Demanda=="0" && entrarsub5==true){
            $scope.informacionsub5=local_data_brocales[a].Horai;
            entrarsub5=false;

          }        
        }
        else if (local_data_brocales[a].Sub == "6"){
          info_sub6[0]=parseInt(local_data_brocales[a].Cantidad);
          info_sub6[1]=parseInt(local_data_brocales[a].Demanda);
          $scope.ubicacionessub6+=local_data_brocales[a].Ubicacion;
          $scope.dotacionsub6=local_data_brocales[a].Dotacion;
          $scope.observacionessub6=local_data_brocales[a].Observaciones;
          if(local_data_brocales[a].Demanda=="0" && entrarsub6==true){
            $scope.informacionsub6=local_data_brocales[a].Horai;
            entrarsub6=false;

          }  
        }
      }
    }
    $scope.myJsondiariosub5= bar_creator(info_sub5[1], info_sub5[0], "Demanda Sub 5")
    $scope.myJsondiariosub6= bar_creator(info_sub6[1], info_sub6[0], "Demanda Sub 6")


    $scope.nueva_fecha = nueva_fecha;
    $scope.nueva_fecha_2  = angular.copy($scope.nueva_fecha)
    
    var name_visited = [];
    var meta = [];
    var exact_days = get_day_numbers($scope.nueva_fecha_2);
    var array_week = [];
    var week_day = 0;
    //console.log($scope.dateselected)
    for (a=0; a<get_day_numbers($scope.dateselected).length; a++){
      nueva_fecha_2 = new Date(exact_days[a] - $scope.dateselected.getTimezoneOffset()*60000);
      converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
      fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
      array_week.push(fecha_2);
      if(fecha_2==fecha){
        week_day=a;
      }
    }

    var array_suma_meta =[];
    var array_values = [];
    for (a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Fecha==array_week[0] || local_data_disciplina[a].Fecha==array_week[1] || local_data_disciplina[a].Fecha==array_week[2] || local_data_disciplina[a].Fecha==array_week[3] || local_data_disciplina[a].Fecha==array_week[4] ){
        if(name_visited.indexOf(local_data_disciplina[a].Area) == -1){
          name_visited.push(local_data_disciplina[a].Area);
          meta.push(local_data_disciplina[a].Meta)
          var aux_arr = [0,0,0,0,0];
          aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          if(aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)]==NaN){
            aux_arr[array_week.indexOf(local_data_disciplina[a].Fecha)] = 0;
          }
          
          array_values.push(aux_arr);

        }
        else{
          array_values[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
          //array_float[name_visited.indexOf(local_data_disciplina[a].Area)][array_week.indexOf(local_data_disciplina[a].Fecha)] = parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[[1]]) + parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1])
        }

      }
    }
      
    for(a=0; a < array_values.length; a++){
      suma = 0;
      for(b=0; b < array_values[a].length; b++){
        suma+= array_values[a][b];
        array_values[a][b] = Math.round(parseFloat(array_values[a][b]/(parseInt(meta[a].split(":")[0])*60 + parseInt(meta[a].split(":")[1]) ))*100);
        //array_float[a][b] = parseFloat(array_values[a][b]/(meta[a].split(":")[0]*60 + meta[a].split(":")[1]*6 ))*100;
      }
      array_suma_meta.push(suma);
    }

    for(a=0; a<array_suma_meta.length; a++){
      array_suma_meta[a] = Math.round((parseFloat(array_suma_meta[a]/((parseInt(meta[a].split(':')[0])*60 + parseInt(meta[a].split(':')[1]))*5))*100).toFixed(8))
    }

    var meta_semanal = [];
    var diccionario_values =[];
    

    for(a=0 ; a<array_values.length ; a++){
      var diccionario_aux = {};
      diccionario_aux.values = array_values[a];
      diccionario_aux.name = name_visited[a];
      diccionario_aux.meta = array_suma_meta[a];
      diccionario_values.push(diccionario_aux);
    }


    var sorted_dictionary = diccionario_values.sort(function(a,b){
      return a.meta - b.meta
    })

    var array_values = [];
    var array_suma_meta = [];
    var name_visited = [];

    for (a=0; a < sorted_dictionary.length; a++){
      array_values.push(sorted_dictionary[a].values);
      name_visited.push(sorted_dictionary[a].name);
      array_suma_meta.push(sorted_dictionary[a].meta)
    }


    $scope.myJsonhbar = hbar_text(array_suma_meta, name_visited)
    $scope.myJsonTest = line_chart(array_values, name_visited)
    $scope.myJsonSemanalDisciplina1 = Bullet_creator([array_values[0][week_day],array_values[1][week_day], array_values[2][week_day], array_values[3][week_day], array_values[4][week_day], array_values[5][week_day], array_values[6][week_day], array_values[7][week_day], array_values[8][week_day], array_values[9][week_day], array_values[10][week_day], array_values[11][week_day], array_values[12][week_day], array_values[13][week_day]], [100,100,100,100, 100, 100, 100,100,100,100,100,100,100,100], [name_visited[0], name_visited[1], name_visited[2], name_visited[3], name_visited[4], name_visited[5], name_visited[6], name_visited[7], name_visited[8], name_visited[9], name_visited[10], name_visited[11], name_visited[12], name_visited[13]])



    //$scope.dateselected = $scope.dateselected.getTime()

    /*
    [Tiempo llegada instalacion,
    tiempo en instalancion,
    traslado a postura,
    tiempo disponible am, 
    traslado colacion,
    almuerzo,
    tiempo disponible pm]
    */

    //[0,0,0,0,0]
    var values_1=[0];
    var values_2=[0];
    var values_3=[0];
    var values_4=[0];
    var values_5=[0];
    var values_6=[0];
    var values_7=[0];

    
    /*nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);*/
    converted_date = nueva_fecha.toISOString().split('T')[0];
    fecha = converted_date.split("-")[2]+"-"+converted_date.split("-")[1]+"-"+converted_date.split("-")[0];


    //console.log(array_week)
    // fecha == local_data_disciplina[a].Fecha
    // array_week.indexOf(local_data_disciplina[a].Fecha)!=-1
    for(a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Area == "SUB 6" && array_week.indexOf(local_data_disciplina[a].Fecha)!=-1  ){
        fecha_split = local_data_disciplina[a].Fecha.split("-")
        fecha_invertida = fecha_split[2]+"-"+fecha_split[1]+"-"+fecha_split[0];
        values_1[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Llegada_Instalacion.split(":")[1])*60+Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"08:00:00")))*1000;
        values_2[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[1]))*60*1000
        values_3[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[1]))*60*1000
        values_4[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[1]))*60*1000
        values_5[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[1]))*60*1000
        values_6[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[0])*60+parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[1]))*60*1000
        values_7[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1]))*60*1000
      }
    }


    var Epoch_Inicio = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"07:00:00"))*1000
    var Epoch_Final = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"17:00:00"))*1000


    



    $scope.myJsonTimer1 = timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7);

  }


  $scope.Asistenciatotal =[];





  $scope.changegraphtimer = function(name){
    $scope.nueva_fecha_2  = angular.copy($scope.fecha_universal)
    nueva_fecha = new Date($scope.nueva_fecha_2.split("-")[2]+"-"+$scope.nueva_fecha_2.split("-")[1]+"-"+$scope.nueva_fecha_2.split("-")[0]);

    var values_1=[0];
    var values_2=[0];
    var values_3=[0];
    var values_4=[0];
    var values_5=[0];
    var values_6=[0];
    var values_7=[0];

    
    var name_visited = [];
    var meta = [];
    var exact_days = get_day_numbers(nueva_fecha);
    var array_week = [];
    var week_day = 0;
    for (a=0; a<get_day_numbers(nueva_fecha).length; a++){
      nueva_fecha_2 = new Date(exact_days[a] - nueva_fecha.getTimezoneOffset()*60000);
      converted_date_2 = nueva_fecha_2.toISOString().split('T')[0];
      fecha_2 = converted_date_2.split("-")[2]+"-"+converted_date_2.split("-")[1]+"-"+converted_date_2.split("-")[0];
      array_week.push(fecha_2);
    }


    fecha = $scope.fecha_universal;
    var llegada = "";
    for(a=0; a<local_data_disciplina.length; a++){
      if(local_data_disciplina[a].Area == name && array_week.indexOf(local_data_disciplina[a].Fecha)!=-1 ){
        fecha_split = local_data_disciplina[a].Fecha.split("-")
        fecha_invertida = fecha_split[2]+"-"+fecha_split[1]+"-"+fecha_split[0];
        llegada = local_data_disciplina[a].Llegada_Instalacion
        console.log(llegada)
        var hora_llegada = parseInt(llegada.split(":")[0]);
        values_1[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Llegada_Instalacion.split(":")[1])*60+Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+hora_llegada.toString()+":00:00")))*1000;
        values_2[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Instalacion.split(":")[1]))*60*1000
        values_3[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Postura.split(":")[1]))*60*1000
        values_4[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Am.split(":")[1]))*60*1000
        values_5[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[0])*60+parseInt(local_data_disciplina[a].Traslado_Colacion.split(":")[1]))*60*1000
        values_6[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[0])*60+parseInt(local_data_disciplina[a].Almuerzo_2.split(":")[1]))*60*1000
        values_7[array_week.indexOf(local_data_disciplina[a].Fecha)] = (parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[0])*60+parseInt(local_data_disciplina[a].Tiempo_Disponible_Pm.split(":")[1]))*60*1000
      }
    }


    var hora_llegada = parseInt(llegada.split(":")[0])-1;

    console.log("hora llegada es : "+hora_llegada.toString())
    var Epoch_Inicio = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+hora_llegada.toString()+":00:00"))*1000
    var Epoch_Final = Epoch(new Date(fecha.split("-")[2]+"-"+fecha.split("-")[1]+"-"+fecha.split("-")[0]+" "+"17:00:00"))*1000

    
    $scope.myJsonTimer1 = timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7);


  }

  $scope.filltableasistencia = function(name){
    $scope.Asistenciatotal =[];
    for(a=0; a < local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Sector == $scope.nombre_sectores_array[parseInt(name)] && local_data_asistencia[a].Fechaingreso == fecha ){
        $scope.Asistenciatotal.push(local_data_asistencia[a]);
      }
    }
  }

  $scope.searchWorker = function(index){
    $scope.rutworker = $scope.Asistenciatotal[index].Rut
    rut_worker = $scope.Asistenciatotal[index].Rut
    name_worker = $scope.Asistenciatotal[index].Nombre
    $scope.Asistenciatotal =[]
    fecha = $scope.fecha_universal;
    var dias_trabajados = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var turno_dias_trabajados =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var Total_dias_trabajo = 0;
    var Asistencia_al_trabajo = 0;
    var Arr_fechas_visitadas = [];

    for(a=0; a<local_data_asistencia.length; a++){
      if(local_data_asistencia[a].Rut==rut_worker){
        $scope.Asistenciatotal.push(local_data_asistencia[a])
        if(local_data_asistencia[a].Fechaingreso.split("-")[1]==fecha.split("-")[1]){
          dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]+=1;
          if(local_data_asistencia[a].Turno == "A" || local_data_asistencia[a].Turno == "B" || local_data_asistencia[a].Turno == "C" || local_data_asistencia[a].Turno == "DESCANSO"){
            turno_dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]=local_data_asistencia[a].Turno;
          }
          else{
            turno_dias_trabajados[parseInt(local_data_asistencia[a].Fechaingreso.split("-")[0])-1]="0";
          }
        }

        /*if(Arr_fechas_visitadas.indexOf(local_data_asistencia[a].Fecha) == -1){
          Total_dias_trabajo+=1
          Arr_fechas_visitadas.push(local_data_asistencia[a].Fecha);
        }*/
        Total_dias_trabajo+=1;
        if(local_data_asistencia[a].Turno == "A" || local_data_asistencia[a].Turno == "B"){
          Asistencia_al_trabajo+=1;
        }
      }


    }
    $scope.myJsonasistenciaworker = line_creator(dias_trabajados,name_worker,[0,1])
    //$scope.myJsonasistenciaworkerturn = line_creator(turno_dias_trabajados,name_worker,["0","A","B","C", "DESCANSO"])
    $scope.myJsonasistenciaworkerturn = Pie_Asistencia(Total_dias_trabajo, Asistencia_al_trabajo, name_worker);
  }

  $scope.changeinassitance = function(name){
    fecha = $scope.fecha_universal;
    //Asistenciatotal
    $scope.Asistenciatotal = []
    console.log($scope.rutworker)
    if(name == "mensual"){
      for(a=0; a<local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Rut == $scope.rutworker && local_data_asistencia[a].Fechaingreso.split("-")[1] == fecha.split("-")[1] && local_data_asistencia[a].Turno!="A" &&  local_data_asistencia[a].Turno!="B"){
          $scope.Asistenciatotal.push(local_data_asistencia[a])
        }
      }
    }
    else{
      for(a=0; a<local_data_asistencia.length; a++){
        if(local_data_asistencia[a].Rut == $scope.rutworker && local_data_asistencia[a].Fechaingreso.split("-")[2] == fecha.split("-")[2] && local_data_asistencia[a].Turno!="A" &&  local_data_asistencia[a].Turno!="B"){
          $scope.Asistenciatotal.push(local_data_asistencia[a])
        }
      }
    }
  }

  $scope.checkpassword = function(){
    if(angular.equals($scope.pass1, $scope.pass2)){
      $scope.msg= "";
      $scope.userbutton = false
    }
    else{
      $scope.msg= "Contraseñas no son iguales";
      $scope.userbutton = true
    }
  }

  $scope.checkuser = function(){

    if($scope.name1 == ""){
      $scope.userbutton = true
    }
    else{
      $scope.userbutton = false
    }

    if($scope.nombresusuarios.indexOf($scope.name1) != -1){
      $scope.msg = "Usuario ya existe"
    }
    else{
      $scope.msg = ""
    }

    if($scope.name1.split("").length<4){
      $scope.msg = "Nombre usuario debe contener mas de 4 caracteres"
    }
    else{
      $scope.msg = ""
    }
  }
  $scope.EstadoArchivos = ""
  if(local_error.length!=0){
    $scope.Estado  =  "Se encontraron errores en los siguientes archivos :"
    for(a=0 ; a < local_error.length; a++){
      $scope.EstadoArchivos+= "-"
      $scope.EstadoArchivos += local_error[a]
      $scope.EstadoArchivos += "\n"
    }
  }
  else{
    $scope.Estado = "Archivos ingresados correctamente"

  }
  



})


//filter:searchtxt|
app.controller("myControllerBrocales", function($scope, $filter){
  var today = new Date();
  $scope.Totalbrocalessub6 = [];
  $scope.Totalbrocalessub7 = [];
  $scope.Totalbrocalessub6min = [];
  $scope.Totalbrocalessub7min = [];
  $scope.cantidadTotal = 0;
  var nuevo_array = [];
  var contador = 0;
  var contador_sub7 = 0;
  for(b = 0 ; b < local_data_brocales.length ; b++){
    if(local_data_brocales[b].Sub == "6"){
      $scope.Totalbrocalessub6.push(local_data_brocales[b]);
      contador+= parseInt(local_data_brocales[b].Cantidad);
    }
    if(local_data_brocales[b].Sub == "7"){
      $scope.Totalbrocalessub7.push(local_data_brocales[b]);
      contador_sub7+= parseInt(local_data_brocales[b].Cantidad);
    }
  }
  
  $scope.monthsbrocales = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  $scope.selectedMonthBrocales = "Septiembre";
  //$scope.selectedMonthBrocales = ObtenerMes_2(today.getMonth()+1);
  nuevo_array.cantidadTotal = 0;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  $scope.Totalbrocalessub6min.push(nuevo_array);
  $scope.Totalbrocalessub7min.push(nuevo_array);
  var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
  var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
    if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
    }
  }
  var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
    if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
      datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
    }
  }

  $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0, "Limpieza de brocales Sub 5");
  $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0, "Limpieza de brocales Sub 6");
  $scope.changeView = function(){
    var dias = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23","24","25","26","27","28","29","30","31"];
    var datos_x_dias_sub6 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub6.length; b++){
      if($scope.Totalbrocalessub6[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub6[parseInt($scope.Totalbrocalessub6[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub6[b].Cantidad);
      }
    }
    var datos_x_dias_sub7 =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    for(b = 0; b < $scope.Totalbrocalessub7.length; b++){
      if($scope.Totalbrocalessub7[b].Fecha.split("-")[1] == obtenerMes($scope.selectedMonthBrocales)){
        datos_x_dias_sub7[parseInt($scope.Totalbrocalessub7[b].Fecha.split("-")[2])-1]+= parseInt($scope.Totalbrocalessub7[b].Cantidad);
      }
    }
    $scope.myJsonMensualsub6 = Chart_creator(dias, datos_x_dias_sub6, 0, "Limpieza de brocales Sub 5");
    $scope.myJsonMensualsub7 = Chart_creator(dias, datos_x_dias_sub7, 0, "Limpieza de brocales Sub 6");
    
  }

  $scope.modalbrocalessub6 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub6;
  }
  $scope.modalbrocalessub7 = function(){
    $scope.Totalbrocalessubmodal = $scope.Totalbrocalessub7
  }




  

})

app.filter('Cantidadfilter',function(){
return function(input,key){
  var nuevo_contador = 0;
  var el_array=[];
  var nuevo_array=[];
  for (a = 0; a < key[0].length ; a++){
    if(key[0][a].Fecha.split("-")[1] == obtenerMes(key[1])){
      nuevo_contador+= parseInt(key[0][a].Cantidad);
    }
  }
  nuevo_array.cantidadTotal = nuevo_contador;
  nuevo_array.Dotacion = "0";
  nuevo_array.Disponibilidad = "En construccion";
  el_array.push(nuevo_array);
  if(el_array[0].cantidadTotal==input[0].cantidadTotal && el_array[0].Dotacion==input[0].Dotacion ){
    
    return input
  }
  return el_array
  
}
});

app.controller('fechabrocales', function($scope){


  //$scope.Nombres_sub5
  var fechas_arreglo =[];
  var concretada_arreglo =[];
  for(a=0 ; a<$scope.Nombres_sub5.length ; a++){
    fechas_arreglo.push("0-0-0");
    concretada_arreglo.push("No");
  }
  for(a = 0; a<local_data_brocales.length ; a++){
    if(local_data_brocales[a].Sub=="5"){
      if(comparar_fechas(local_data_brocales[a].Fecha, fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)])){
        fechas_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = local_data_brocales[a].Fecha;
        if(local_data_brocales[a].Cantidad!=0){
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "Si"
        }
        else{
          concretada_arreglo[$scope.Nombres_sub5.indexOf(local_data_brocales[a].Ubicacion)] = "No"
        }
      }
    }
  }
  $scope.fecha1 = fechas_arreglo[0];
  $scope.dato1 = concretada_arreglo[0];
  $scope.fecha2 = fechas_arreglo[1];
  $scope.dato2 = concretada_arreglo[1];
  $scope.fecha3 = fechas_arreglo[2];
  $scope.dato3 = concretada_arreglo[2];
  $scope.fecha4 = fechas_arreglo[3];
  $scope.dato4 = concretada_arreglo[3];
  $scope.fecha5 = fechas_arreglo[4];
  $scope.dato5 = concretada_arreglo[4];
  $scope.fecha6 = fechas_arreglo[5];
  $scope.dato6 = concretada_arreglo[5];
  $scope.fecha7 = fechas_arreglo[6];
  $scope.dato7 = concretada_arreglo[6];
  $scope.fecha8 = fechas_arreglo[7];
  $scope.dato8 = concretada_arreglo[7];
  $scope.fecha9 = fechas_arreglo[8];
  $scope.dato9 = concretada_arreglo[8];
  $scope.fecha10 = fechas_arreglo[9];
  $scope.dato10 = concretada_arreglo[9];
  $scope.fecha11 = fechas_arreglo[10];
  $scope.dato11 = concretada_arreglo[10];
  $scope.fecha12 = fechas_arreglo[11];
  $scope.dato12 = concretada_arreglo[11];
  $scope.fecha13 = fechas_arreglo[12];
  $scope.dato13 = concretada_arreglo[12];
  $scope.fecha14 = fechas_arreglo[13];
  $scope.dato14 = concretada_arreglo[13];
  $scope.fecha15 = fechas_arreglo[14];
  $scope.dato15 = concretada_arreglo[14];
  $scope.fecha16 = fechas_arreglo[15];
  $scope.dato16 = concretada_arreglo[15];

})

app.controller('MainController', function($scope) {
  

});
app.controller("MainControllermatriz2" , function($scope){
  


})
app.controller("MainControllermatriz" , function($scope){
  
  

})



app.controller('PiechartAsistencia', function($scope){
  
})
app.controller('MainController2', function($scope) {
  $scope.myJsonmatrizbar = {
      type : "bar",
      /*title:{
        backgroundColor : "transparent",
        fontColor :"black",
        text : "Hello world"
      },*/
      backgroundColor : "white",
      scaleX: {
        values :[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
        itemsOverlap: true,
      },
      scaleY: {
        itemsOverlap: true,
      },
      series : [
        {
          values : [1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3,4,1,2,3],
          backgroundColor : "#4DC0CF"
        }
      ]
    };
  $scope.myJsonmatrizpie = {
    type: "pie",
    plot: {
      slice: 50 //to make a donut
    },
    series: [{
      values: [8],
      text: "Completado",
      backgroundColor:"#4DC0CF"

    }, {
      values: [4],
      text: "No completado",
      backgroundColor: "#ededed"

    }]
  };
  
});

function timer_chart(Epoch_Inicio, Epoch_Final, values_1, values_2, values_3, values_4, values_5, values_6, values_7){
  var grafico = {};
  grafico = {
    type: 'bar',
    utc: true,
    timezone: -3, //EST time
    plot: {
      barWidth: '50%',
      stacked: true,
      tooltip: {
        text: '%plot-text : %scale-value-value',
        transform: {
          type: 'date',
          all: '%g:%i %A'
        }
      }
    },
    scaleX: {
      labels: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
      label: {
        //text: '12-Hour Fundraiser'
      },
      item: {
        fontSize: 10
      },
    },
    scaleY: {
      minValue: Epoch_Inicio, //8 AM
      maxValue: Epoch_Inicio+36000000, //Midnight
      step: 600000, 
      transform: {
        type: 'date',
        all: '%g:%i %a'
      },
      item: {
        fontSize: 10
      },
      guide: {
        lineStyle: 'dotted'
      }
    },
    plotarea: {
      marginLeft: '15%',
    },
    series: [{
        values: values_1,
        text: 'Llegada a instalación',
        backgroundColor: '#1565C0',
      },
      {
        values: values_2,
        text: 'Salida instalación',
        backgroundColor: '#1E88E5'
      },
      {
        values: values_3,
        text: 'Inicio Act. Am',
        backgroundColor: '#42A5F5'
      },
      {
        values: values_4,
        text: 'Termino Act. Am',
        backgroundColor: '#90CAF9'
      },
      {
        values: values_5,
        text: 'Almuerzo',
        backgroundColor: '#42A5F5'
      },
      {
        values: values_6,
        text: 'Inicio Act. Pm',
        backgroundColor: '#9FB2D5'
      },
      {
        values: values_7,
        text: 'Termino Act. Pm',
        backgroundColor: '#353F52'
      }
    ]
  };

  
  return grafico;
}

function calendar_creator(fechas){
  var grafico = {};
  grafico = {
    type:'calendar',
    //utc : true,
    //timezone: -3,
    plot:{
      tooltip: { // Use this object to to configure the tooltips.
        text: ' %data-info0 <br> Cantidad : %v <br> %data-info1 <br> %data-info2 ',
   
        alpha: 1,
        backgroundColor: 'black',
        borderAlpha: 1,
        borderColor: 'black',
        borderRadius: 3,
        borderWidth: 1,
        callout: true,
        fontColor: 'white',
        fontFamily: 'Georgia',
        fontSize: 12,
        offsetY: -10,
        //textAlign: 'center',
        align: 'center',
        textAlpha: 1
      },
      valueBox: { // Use this object to configure the value boxes.
        fontColor: 'red',
        fontFamily: 'Courier New',
        fontSize: 12,
        fontWeight: 'normal'
      },
    },
    options: {
      //startMonth: 8,
      year: {
        text: '2022',
      },
      month:{
        values: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
      },
      weekday: { // Configure the weekday labels and styling by row.
        values: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'], // Set the weekday labels.
        item: { // Use this object to style the weekday labels.
          backgroundColor: '#ffe6e6',
          fontColor: 'red',
          fontFamily: 'Georgia',
          fontSize: 12
        },
      },     
      //endMonth: 3,
      values: fechas
    },
    plotarea: {
      marginTop: '25%',
      marginBottom: '25%'
    }
  };
  return grafico
}

function pie3d(Completados, Faltantes, Titulo){
  var grafico = {};
  grafico = {
    type : "pie3d",
    title : {
        "text" : Titulo,
    },
    plot: {
      slice: 0,
      'value-box': {
        text: "%v",
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "out"
      }}, //to make a donut
    series : [{
      values: [Completados]
    },
    {
      values: [Faltantes]
    }] 

  }

  return grafico
}

function line_creator(dias_trabajados, titulo, escale_y){
  var grafico = {};
  grafico ={
    "type": "line",
    "series": [{
    "values": dias_trabajados
    }],   
    title :{
      text : titulo,
      align : 'center'
    },  
    scaleX:{
      labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
      itemsOverlap: true,
    },
    scaleY:{
      values:escale_y
    }
  }

  return grafico
  
}

function hbar_text(values, name){
  var grafico = {};
  grafico ={
    type: 'hbar',
    backgroundColor: '#fff',
    borderColor: '#dae5ec',
    borderWidth: '1px',
    title: {
      text: 'Disciplina Operacional',
      marginTop: '7px',
      marginLeft: '9px',
      backgroundColor: 'none',
      fontColor: '#707d94',
      fontFamily: 'Arial',
      fontSize: '11px',
      shadow: false,
      textAlign: 'left',
    },
    plot: {
      tooltip: {
        padding: '5px 10px',
        backgroundColor: '#707e94',
        borderRadius: '6px',
        fontColor: '#ffffff',
        fontFamily: 'Arial',
        fontSize: '11px',
        shadow: false,
      },
      animation: {
        delay: 500,
        effect: 'ANIMATION_EXPAND_LEFT',
      },
      barsOverlap: '100%',
      barWidth: '12px',
      hoverState: {
        backgroundColor: '#707e94',
      }
    },
    plotarea: {
      margin: '50px 15px 10px 15px',

    },
    scaleY: {
      guide :{
        visible : false
      },
      tick :{
        visible : false
      },
      lineColor : 'none'
    },
    scaleX: {
      values: name,
      guide: {
        visible: false,
      },
      item: {
        paddingBottom: '8px',
        fontColor: '#8391a5',
        fontFamily: 'Arial',
        fontSize: '11px',
        offsetX: '206px',
        offsetY: '-12px',
        textAlign: 'left',
        width: '200px',
      },
      lineColor: 'none',
      tick: {
        visible: false,
      },
    },
    series: [
      {
        values: values,
        styles: [
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
          {
            backgroundColor: '#4dbac0',
          },
        ],
        tooltipText: '%node-value %',
        zIndex: 2,
      },
      {
        values: [120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120, 120],
        valueBox: {
          text: '%data-rvalues',
          paddingBottom: '8px',
          fontColor: '#8391a5',
          fontFamily: 'Arial',
          fontSize: '11px',
          offsetX: '-54px',
          offsetY: '-12px',
          textAlign: 'right',
          visible: true,
        },
        backgroundColor: '#d9e4eb',
        dataRvalues: values,
        maxTrackers: 0,
        zIndex: 1,
      },
    ],
  }

  return grafico;
}

function asistencia_chart(Values_A, Values_B, Values_nopresente, nombres, titulo){
  var grafico = {};
  grafico = {
    type: 'bar',
    "scroll-x": {
 
    },
    title:{
      text : "Asistencia "+ titulo,
      "alpha": 1,
      "adjust-layout":true,
    },
    plot: {
      barWidth: 25,
    },

    "legend": {
      "layout": "x3",
      "overflow": "page",
      "alpha": 0.05,
      "shadow": false,
      "align": "center",
      "adjust-layout": true,
      "marker": {
        "type": "circle",
        "border-color": "none",
        "size": "10px"
      },
    },
    scaleX:{
      values : nombres,
      zooming: true,
      zoomTo: [0, 10],
      item: {
        fontSize: 8
      },
    },

    series:[{
      values : Values_A,
      "text": "A",
      backgroundColor : "blue"
    },
    {
      values : Values_B,
      "text": "B",
      backgroundColor : "orange"
    },
    {
      values : Values_nopresente,
      "text" : "No presente",
      backgroundColor : "grey"
    }
    ]
  }

  return grafico
}

function Pie_Cumplimiento(values_total, values_completed, nombre){
  var grafico = {};
  grafico = {
    "type": "pie",
    plot: {
      slice: 0,
      'value-box': {
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
      } //to make a donut
      
    },
    "title": {
      "text": "Cumplimiento "+ nombre
    },
    "series": [{
        "values": [values_total-values_completed],
        backgroundColor :"#ededed",
        fontColor :"black"
      },
      {
        "values": [values_completed],
        backgroundColor :"#4DC0CF",
        fontColor: "black"

      },
    ]
  };
  return grafico
}

function line_chart(values, nombres){
  var grafico = {};
  grafico = {
    type: 'line',
    scaleY:{
      minValue : 90,
      maxValue : 120,
    },
    title :{
      text : "Disciplina Operacional",
      "adjust-layout":true
    },
    "legend": {

      "layout": "float",
      "background-color": "none",
      "border-width": 0,
      "shadow": 0,
      "align": "center",
      "adjust-layout": true,
      "toggle-action": "remove",
      "item": {
        "padding": 7,
        "marginRight": 17,
        "cursor": "hand"
      }
    },
    scaleX:{
      labels: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes'
      ],
    },
    "tooltip": {
      "visible": false
    },
    "crosshair-x": {
      "line-color": "#efefef",
      "plot-label": {
        "border-radius": "5px",
        "border-width": "1px",
        "border-color": "#f6f7f8",
        "padding": "10px",
        "font-weight": "bold"
      },
      "scale-label": {
        "font-color": "#000",
        "background-color": "#f6f7f8",
        "border-radius": "5px"
      }
    },
    "plot": {
      "highlight": true,
      "tooltip-text": "%t views: %v<br>%k",
      "shadow": 0,
      "line-width": "2px",
      "marker": {
        "type": "circle",
        "size": 3
      },
      "highlight-state": {
        "line-width": 3
      },
      "animation": {
        "effect": 1,
        "sequence": 2,
        "speed": 100,
      }
    },
    series: [
      { 
        values: values[0],
        "text": nombres[0],
        "line-color": "#007790",
        "legend-item": {
          "background-color": "#007790",
          "borderRadius": 5,
          "font-color": "white",
        },
        "legend-marker": {
          "visible": false
        },
        "marker": {
          "background-color": "#007790",
          "border-width": 1,
          "shadow": 0,
          "border-color": "#69dbf1"
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#007790",
        }
      },
      { 
        values: values[1],
        "text":nombres[1],
        'line-color' : 'red',
        "legend-item": {
          "background-color": "red",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "red",
        },
        "marker": {
          "background-color": "red",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[2],
        "text" : nombres [2],
        'line-color' : '#399A00',
        "legend-item": {
          "background-color": "#399A00",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#399A00",
        },
        "marker": {
          "background-color": "#399A00",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[3],
        "text" : nombres [3],
        'line-color' : '#D98702',
        "legend-item": {
          "background-color": "#D98702",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#D98702",
        },
        "marker": {
          "background-color": "#D98702",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[4],
        "text" : nombres [4],
        'line-color' : '#881EA6',
        "legend-item": {
          "background-color": "#881EA6",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#881EA6",
        },
        "marker": {
          "background-color": "#881EA6",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[5],
        "text" : nombres [5],
        'line-color' : '#874D00',
        "legend-item": {
          "background-color": "#874D00",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#874D00",
        },
        "marker": {
          "background-color": "#874D00",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[6],
        "text" : nombres [6],
        'line-color' : '#0C5BD7',
        "legend-item": {
          "background-color": "#0C5BD7",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#0C5BD7",
        },
        "marker": {
          "background-color": "#0C5BD7",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[7],
        "text" : nombres [7],
        'line-color' : '#485364',
        "legend-item": {
          "background-color": "#485364",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#485364",
        },
        "marker": {
          "background-color": "#485364",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[8],
        "text" : nombres [8],
        'line-color' : '#55B930',
        "legend-item": {
          "background-color": "#55B930",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#55B930",
        },
        "marker": {
          "background-color": "#55B930",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[9],
        "text" : nombres [9],
        'line-color' : '#369FD8',
        "legend-item": {
          "background-color": "#369FD8",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#369FD8",
        },
        "marker": {
          "background-color": "#369FD8",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[10],
        "text" : nombres [10],
        'line-color' : '#FC7466',
        "legend-item": {
          "background-color": "#FC7466",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#FC7466",
        },
        "marker": {
          "background-color": "#FC7466",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[11],
        "text" : nombres [11],
        'line-color' : '#ABEE32',
        "legend-item": {
          "background-color": "#ABEE32",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#ABEE32",
        },
        "marker": {
          "background-color": "#ABEE32",
          "border-width": 1,
          "shadow": 0,
        }, 
      },
      {
        values : values[12],
        "text" : nombres [12],
        'line-color' : '#295552',
        "legend-item": {
          "background-color": "#295552",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#295552",
        },
        "marker": {
          "background-color": "#295552",
          "border-width": 1,
          "shadow": 0,
        },
      },
      {
        values : values[13],
        "text" : nombres [13],
        "line-color" : '#444304',
        "legend-item": {
          "background-color": "#444304",
          "borderRadius": 5,
          "font-color": "white"
        },
        "legend-marker" :{
          'visible':false
        },
        "highlight-marker": {
          "size": 5,
          "background-color": "#444304",
        },
        "marker": {
          "background-color": "#444304",
          "border-width": 1,
          "shadow": 0,
        },
      }
    ]
 }

 return grafico

}

function mixed_creator_test(){
  var grafico = {};
  grafico = {
    type: 'mixed',
    /*timezone: -5,
    utc: true,
    plot: {
      barWidth: '50%',
      stacked: true,
      tooltip: {
        text: 'Raise %plot-text by %scale-value-value',
        transform: {
          type: 'date',
          all: '%g:%i %A'
        }
      }
    },*/
    /*scaleY: {
      minValue: 1457091000000, //6 AM
      maxValue: 1457132400000, //Midnight
      step: 3600000, //1 hour
      transform: {
        type: 'date',
        all: '%g:%i %a'
      },
    }*/
    scaleY :{
      minValue : 1662980400000,
      step: 3600000,
      transform : {
        type : 'date',
        all: '%g:%i %A'
      },
      item: {
        fontSize: 10
      },
    },
    scaleX:{
      labels: [
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes'
      ],
      transform : {
        type : 'date',
        all: '%g:%i %A'
      }
    },
    plotarea: {
    marginLeft: '15%'
  },
    series: [{
      type: 'bar',
      //text: 'Tareas deseadas',
      values: [1662997140000],
      //lineColor: '#42a5f5',
      //stacked : true,
      //stack : 1,
    },
    {
      type :'bar',
      values :[1662998400000],
      backgroundColor : 'red',
      stacked : true,
      stack : 1,
    }],
  }
  return grafico;
}

function mixed_creator(tareas_deseadas, tareas_completadas, titulo){
  var grafico = {};
  grafico = {
  type: 'mixed',
  title: {
    text: 'Plan matriz anual ' +titulo,
    align: 'center',
    marginLeft: '23%',
  },
  legend: {
  },
  scaleX: {
    labels: [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ], // one label for every datapoint
  },
  scaleY: {
    guide: {
      // dashed lines
      visible: false,
    },
    label: {
      text: 'Cantidad de tareas',
      fontSize: '14px',
    },
  },
  scaleY2: {
    label: {
      text: 'Faltantes y tareas completadas',
      fontSize: '14px',
    },
    maxValue: 100,
    minValue: 0,
    step: 25, // can define scale step values or default
  },
  crosshairX: {
    lineColor: '#424242',
    lineGapSize: '4px',
    lineStyle: 'dotted',
    plotLabel: {
      padding: '15px',
      backgroundColor: 'white',
      bold: true,
      borderColor: '#e3e3e3',
      borderRadius: '5px',
      fontColor: '#2f2f2f',
      fontFamily: 'Lato',
      fontSize: '12px',
      shadow: true,
      shadowAlpha: 0.2,
      shadowBlur: 5,
      shadowColor: '#a1a1a1',
      shadowDistance: 4,
      textAlign: 'left',
    },
    scaleLabel: {
      backgroundColor: '#424242',
    },
  },
  series: [{
      type: 'bar',
      text: 'Tareas deseadas',
      values: tareas_deseadas,
      lineColor: '#42a5f5',
      marker: {
        visible: false,
      },
      scales: 'scale-x, scale-y',
    },
    {
      type: 'bar',
      text: 'Tareas completadas',
      values: tareas_completadas,
      backgroundColor: '#ffa726',
      scales: 'scale-x, scale-y',
    },
  ],
  };
  return grafico

}

function bar_creator(values_total, values_complete, titulo){
  var grafico = {};
  grafico = {
    type: "mixed",
    title: {
      text: titulo,
      align: 'center',
      marginLeft: '23%',
    }, // 1. Specify your mixed chart type.
    plot: {
      tooltip: {
        text: "%t"
      }
    },
    series: [ // 2. Specify the chart type for each series object.
      {
        "type": "bullet",
        "values": [values_complete],
        "goals": [values_total],
        "goal": {
          "background-color": "#CD7F32",
          "border-color": "#CD7F32",
          "tooltip": {
            "text": "Meta: %g",
            "background-color": "#CD7F32",
            "border-color": "#CD7F32"
          }
        },
        "tooltip": {
          "text": "Actual: %v"
        }
      }
    ]
  }
  return grafico;
}



function Bullet_creator(values, meta, valuesy){
  var grafico={};
  grafico ={
    "type": "bullet",
    title: {
      text: "Disciplina Operacional",
      align: 'center',
    },
    "series": [{
      "values": values,
      "goals": meta
    }],
    scaleX: {
      values :valuesy,
      //maxItems: 8,
      itemsOverlap: true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
  }
  return grafico
}

function Pie_creator(values_total, values_complete, titulo){
  var grafico ={};
  grafico = {
    type: "pie",
    title: {
      textAlign: 'center',
      text: titulo,
      "font-size": 15
    },
    plot: {
      slice: 0,
      'value-box': {
        text: "%v",
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
        placement: "out"
      } //to make a donut
      
    },

    series: [{
      values: [values_total-values_complete],
      backgroundColor:"#ededed"

    }, {
      values: [values_complete],
      backgroundColor: "#4DC0CF"
    }]
  };
  return grafico
}

function bar_vimo(realizado, nombre){
  grafico = {};
  grafico = {
    type:"bar",
    "title": {
      "text": "Puertas Vimo"
    },
    plot: {
      barWidth: 120,
    },
    scaleX: {
      values : [0]
    },
    series:[
    {
      values : [realizado]
    }]
  }

  return grafico
}

function bar_brocales(deseados, realizado, x_values, tamaño, sub){
  grafico = {};

  grafico = {
    type: 'bar',
    "title": {
      "text": "Limpieza de brocales sub "+sub
    },
    plot: {
      barWidth: tamaño,
    },
    "legend": {
    },
    scaleY:{
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },

    scaleX :{
      values : x_values,
      maxItems : 31,
      "items-overlap" : true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    series: [{
      values: deseados,
      text : "Demanda",
      backgroundColor: 'blue',
    },
      {
        values : realizado,
        text : "Realizado",
      backgroundColor : "orange",

      } 
    ]
  };
   
  return grafico;
}

function bar_planmatriz(x_values, deseados, realizado, nombre){
  grafico = {};

  grafico = {
    type: 'bar',
    "title": {
      "text": "Plan matriz "+ nombre
    },
    "legend": {
    },
    scaleY:{
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },

    scaleX :{
      values : x_values,
      maxItems : 31,
      "items-overlap" : true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    series: [{
      values: deseados,
      text : "Demanda",
      backgroundColor: 'blue',
    },
      {
        values : realizado,
        text : "Realizado",
      backgroundColor : "orange",

      } 
    ]
  };
   
  return grafico;
}

function Pie_Asistencia(Total, Asistencia, Nombre){
  var grafico = {};
  grafico = {
    "type": "pie",
    plot: {
      slice: 0,
      'value-box': {
        'font-size':13,
        'font-weight': "normal",
        "font-color":"black",
      } //to make a donut
      
    },
    "title": {
      "text": "Asistencia " + Nombre
    },
    "series": [{
        "values": [Total-Asistencia],
        backgroundColor :"#ededed",
        fontColor :"black"
      },
      {
        "values": [Asistencia],
        backgroundColor :"#4DC0CF",
        fontColor: "black"

      },
    ]
  };
  return grafico
}

function Chart_creator(datosx, valoresdatosx, meta, titulo){
  var grafico = {};
  if(meta != 0){
    grafico = {
    backgroundColor: "white",  
    //backgroundColor: "#2bbb9a",
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    title: {
      textAlign: 'center',
      text: titulo
    },
    scaleX: {
      values :datosx,
      itemsOverlap: true,
      //maxItems: 8,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [
    {
      lineColor:"#4AD8CC",
      text: "Óptimo",
      values:meta
    },
    {
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    }
    ]
    }
  }
  else{
    grafico = {
    backgroundColor: "white",
    title: {
      textAlign: 'center',
      text: titulo
    },
    globals: {
      shadow: false,
      fontFamily: "Arial"
    },
    type: "line",
    /*title: {
      textAlign: 'center',
      text: "Visión anual"
    },*/
    scaleX: {
      values :datosx,
      //maxItems: 8,
      itemsOverlap: true,
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "black",
        lineWidth: "1px"
      },
      item: {
        fontColor: "black"
      },
      guide: {
        visible: false
      }
    },
    scaleY: {
      lineColor: "black",
      lineWidth: "1px",
      tick: {
        lineColor: "#ededed",
        lineWidth: "1px"
      },
      guide: {
        lineStyle: "solid",
        lineColor: "black"
      },
      item: {
        fontColor: "black"
      },
    },
    tooltip: {
      visible: false
    },
    crosshairX: {
      lineColor: "black",
      scaleLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232"
      },
      plotLabel: {
        backgroundColor: "#fff",
        fontColor: "#323232",
        text: "%v",
        borderColor: "transparent"
      }
    },
    plot: {
      lineWidth: "2px",
      lineColor: "#FFF",
      aspect: "spline",
      marker: {
        visible: false
      }
    },
    series: [{
      lineColor :"#40beeb",
      text: "Actual",
      values: valoresdatosx
    }]
    }
  }
  return grafico
}

function comparar_fechas(fecha1, fecha2){
  if(parseInt(fecha1.split("-")[2]) > parseInt(fecha2.split("-")[2])){
    return true
  }
  else if(parseInt(fecha1.split("-")[2]) == parseInt(fecha2.split("-")[2])){
      if(parseInt(fecha1.split("-")[1]) > parseInt(fecha2.split("-")[1])){
        return true
      }
      else if(parseInt(fecha1.split("-")[1]) == parseInt(fecha2.split("-")[1])){
        if(parseInt(fecha1.split("-")[0]) > parseInt(fecha2.split("-")[0])){
          return true
        }
      }
  }
  return false
}


function obtenerMes(NombreMes){
  var NumMes = "";
  switch (NombreMes) {
    case "Enero" :
      NumMes="01";
      break;
    case "Febrero" :
      NumMes="02";
      break;
    case "Marzo" :
      NumMes="03";
      break;
    case "Abril" :
      NumMes="04";
      break;
    case "Mayo" :
      NumMes="05";
      break;
    case "Junio" :
      NumMes="06";
      break;
    case "Julio" :
      NumMes="07";
      break;
    case "Agosto" :
      NumMes="08";
      break;
    case "Septiembre" :
      NumMes="09";
      break;
    case "Octubre" :
      NumMes="10";
      break;
    case "Noviembre" :
      NumMes="11";
      break;
    case "Diciembre" :
      NumMes="12";
      break;
  }
  return NumMes
}

function ObtenerMes_2(NumMes){
  var NomMes ="";
  switch (NumMes){
    case 1:
      NomMes="Enero";
      break;
    case 2:
      NomMes="Febrero";
      break;
    case 3:
      NomMes="Marzo";
      break;
    case 4:
      NomMes="Abril";
      break;
    case 5:
      NomMes="Mayo";
      break;
    case 6:
      NomMes="Junio";
      break;
    case 7:
      NomMes="Julio";
      break;
    case 8:
      NomMes="Agosto";
      break;
    case 9:
      NomMes="Septiembre";
      break;
    case 10:
      NomMes="Octubre";
      break;
    case 11:
      NomMes="Noviembre";
      break;
    case 12:
      NomMes="Diciembre";
      break;
  }
  return NomMes
}

function getDays(year, month){
  return new Date(year, month, 0).getDate();
}

function Epoch(date) {
    return Math.round(new Date(date).getTime() / 1000.0);
}

//Epoch To Date
function EpochToDate(epoch) {
    if (epoch < 10000000000)
        epoch *= 1000; // convert to milliseconds (Epoch is usually expressed in seconds, but Javascript uses Milliseconds)
    var epoch = epoch + (new Date().getTimezoneOffset() * -1); //for timeZone        
    return new Date(epoch);
}

/*function Get_day_numbers(fecha){
  //nueva_fecha = new Date($scope.dateselected.getTime() - $scope.dateselected.getTimezoneOffset()*60000);
  var values_day=[];
  let semana = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'][nueva_fecha.getDay()];

}*/

function get_day_numbers(current2) {
    var week= new Array(); 
    current = current2
    // Starting Monday not Sunday
    //console.log(current)
    current.setDate((current.getDate() - current.getDay() +1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        ); 
        current.setDate(current.getDate() +1);
    }
    return week; 
}

//console.log("Cantidad de dias del mes")

//console.log(getDays(parseInt(fecha.split("-")[2]), parseInt(fecha.split("-")[1])));
