var arr = [];
var myjson= "";
  function httpRequest (theUrl, cb){
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("GET", theUrl , true);
	xmlHttp.send( null);

	xmlHttp.onload = function(){
	  cb(null, xmlHttp.responseText);
	};

	xmlHttp.onerror = function() {
	  cb(new Error("request error"));
	};
  }  

httpRequest( "https://api.github.com/orgs/moztn/repos", function testme(err, data) {
	if (err) {
	  arr = [];
	} else {
		arr = JSON.parse(data);
	}
    var i;
	myjson = '{"name": "moztn","children":[';
        console.log(arr);

    for(i = 0; i < arr.length; i++) {
	myjson += '{"name":"' + arr[i].name +'","children":[' +
			'{"name":"'+arr[i].name+'","size":"' + arr[i].size +'"},'+
			'{"name":"issues","size":"' + arr[i].open_issues_count +'"},'+
			'{"name":"forks","size":"' + arr[i].forks_count +'"},'+
			'{"name":"watchers","size":"' + arr[i].watchers +'"},'+
			'{"name":"stars","size":"' + arr[i].stargazers_count +'"}]}';
	if (i != (arr.length-1)){
		myjson += ','
	}			
    }
	myjson += ']}';
	console.log(myjson);
});
