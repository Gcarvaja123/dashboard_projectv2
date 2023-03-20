var appa = angular.module('myAppa', ['zingchart-angularjs']);



appa.controller("myControllerAsistenciaa", function($scope,$filter,$http){

	$scope.createcard = function(){
		var card = document.createElement('div');
	  card.classList.add('card');
	  
	  var header = document.createElement('div');
	  header.classList.add('card-header');
	  card.appendChild(header);
	  
	  var body = document.createElement('div');
	  body.classList.add('card-body');
	  body.innerHTML = "hola";
	  card.appendChild(body);
	  
	  return card;
	}
})