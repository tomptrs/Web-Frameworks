var app = angular.module("app",[]);

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
