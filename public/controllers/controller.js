var app = angular.module("myApp", []);
app.controller("myCtrl", function($scope, $http) {
console.log("Hola he iniciado bien");

var refresh = function() {
$http.get('/gesdocument').success(function(response){
	console.log("He recibido la informacion");
	$scope.gesdocument = response;
	$scope.document = "";
});
};

refresh();

$scope.addDocument = function(){
	console.log($scope.document);
	$http.post('/gesdocument', $scope.document).success(function(response){
		console.log(response);
		refresh();
	});
};

$scope.remove = function(id){
	console.log(id);
	$http.delete('/gesdocument/' + id).success(function(response){
		refresh();
	});
};

$scope.edit = function(id){
	console.log(id);
	$http.get('/gesdocument/' + id).success(function(response){
		$scope.document = response;
	});
};

$scope.update = function(){
	console.log($scope.document._id);
	$http.put('/gesdocument/' + $scope.document._id, $scope.document).success(function(response){
		refresh();
	})
};

$scope.deselect = function(){
	$scope.document = "";
}

})
