var net = require('net');
var port = 3000;

var members = [];
var server = net.createServer(function(connection) { 
	console.log("connected");
	
	  connection.name = connection.remoteAddress + ":" + connection.remotePort;

	  var broadcast = function broadcast(message, sender) {
	  	members.forEach(function(client) {
	  		
	  		client.write(message + "\n");
	  		
	    });
	  	console.log(message.toString());
	 }


	  connection.write("Hey welcome to Ashley's chat room!" + "\n");
	  broadcast(connection.name + " joined the chat\n", connection);
	  members.push(connection);

	   connection.on("data", function(data){
	   	var input = data.toString().trim()
        broadcast(input, connection); 
        
	   	
	   });

	   connection.on("end", function(){
	   	members.splice(members.indexOf(connection), 1)
	   	broadcast(connection.name + "left the chat.\n");
	   })

 

});

server.listen(port, function(){
	console.log("listening");
})