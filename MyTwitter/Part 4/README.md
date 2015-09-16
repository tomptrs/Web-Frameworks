# Integratie Node & Angular

Om een "call" te maken van angular (client-side) naar je node applicatie (server side, 
want fungeert als je web server), kan je gebruik maken van Angular built-in HTTP client: 
$http. $http.get(), $http.post().

Dit is PROMISE based: een manier om asynchrone code en callbacks te ontwikkelen:


$http.get("http://localhost:3000/api/posts")
	.success(function(posts){
		//DOE IETS
	})
	.error(function(err){
		//DOE IETS
	});

Bij een promise krijg je een object terug waarop je methodes kan oproepen (success,error).

Je moet nu je $scope.posts array vervangen door een http get & post call naar de node server.

	
app.controller("twitterController",function($scope,$http){
	
	
	
	$http.get("http://localhost:3000/api/posts")
	.success(function(posts){
		$scope.posts = posts;
	});
	

	$scope.addPost =  function()
	{
		$http.post("http://localhost:3000/api/posts",{
			"username":"tt",
			"body":"hello body"
		}).success(function(post){
			console.log(post);
			$scope.posts.unshift(post);
		});
			
	};
	
	
});



		

