var app = angular.module("app",[]);

app.controller("twitterController",function($scope){
	
	$scope.posts = [
	{
		username:"tomptrs",
		body: "hallo wereld!"
	},
		{
		username:"mvdp",
		body: "Angular test!"
	},
	];
	

	$scope.addPost =  function()
	{
		$scope.posts.unshift({
			username:"hannes & arno",
			body:"Hallo, een nieuwe entry"
		});
	};
	
	
});
