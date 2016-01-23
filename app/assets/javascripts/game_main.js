(function (){
	  // Polyfills
  window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame      || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function( callback ){
            window.setTimeout(callback, 1000 / 60);
          };
          })();
		
   var socket = new WebSocket("ws://"+location.host+"/gamestream");
   var connected = false;
   socket.onopen = function() { connected = true; sendPlayer(playerid)}	
   socket.onclose = function() { connected = false; }
   	socket.onmessage = function(e)
	{
		var m = JSON.parse(e.data);
		if(m.type == "starting")
		{	
			//location.reload();
			var val = $("#bulletnumber");
			
			console.log(m.bullet.p1 + "" + m.bullet.p2);
			switch(playerid)
			{	
				case 1:{
						val.html( m.bullet.p1  ); break;}
				case 2:{
						val.html( m.bullet.p2 ); break;
						}
				case 3:{
						val.html( m.bullet.p3); break;}
				case 4:
					{
						val.html( m.bullet.p4 ); break;
					}
			}
			
			document.getElementById("error").innerHTML = m.start.message;
					
		}
		if(m.type == "scores")
		{
			switch(playerid)
			{
				case 1:{
					document.getElementById("messageshow").innerHTML =   m.score1;break;}
				case 2:{
					document.getElementById("messageshow").innerHTML =   m.score2;break;}
				case 3:{
					document.getElementById("messageshow").innerHTML =   m.score3;break;}
				case 4:{
					document.getElementById("messageshow").innerHTML =   m.score4;break;}
				
			}
		}
		if(m.type == "end")
		{
			
			document.getElementById("error").innerHTML = m.winner;
		}
		if(m.type == "restart")
		{
			
			var val = $("#bulletnumber");
			val.html( sessionStorage.getItem("p1") ); 
			document.getElementById("error").innerHTML = m.message;

		}
		if(m.type == "bullets")
		{
			
			var val = $("#bulletnumber");
			

			switch(playerid)
			{	
				case 1:{
						val.html( m.p1  ); break;}
				case 2:{
						val.html(m.p2); break;
						}
				case 3:{
						val.html(m.p3); break;}
				case 4:
					{
						val.html(m.p4); break;}
			}

		}
		
	}	
	
	function sendPlayer( id)
	{
		//alert(id);
		send( { but:"123" , id :id});
	}
	function sendButton(but,id)
	{
				
		send ( { but: but, id: id});
	}
	function send(p)
	{

		if(connected)
			socket.send(JSON.stringify(p));

	}
 
	$(document).keydown( function(e) {

		if(e.which == 37)
			sendButton("37",playerid);
		else if(e.which == 39)
			sendButton("39",playerid);
		else if(e.which == 40)
			sendButton("40",playerid);	

	})
	var delay = (function(){
		var timer = 0;
		return function(callback,ms)
		{
			clearTimeout(timer);
			timer = setTimeout(callback,ms);
		};
	

	})();

	$(document).keyup( function(e) {
		if(e.which == 38){
			delay(function(){
				sendButton("38",playerid);
				
				var val = parseInt($("#bulletnumber").html());			
				val--
					if(val >= 0)
					 $("#bulletnumber").html(val);
				if(val < 0)
						$("#bulletnumber").html("No Bullets");
				
				
				},300);
						
			}
	})

	$("#up").click( function(e) {
			delay(function(){sendButton("38",playerid);   
			
			var val = parseInt($("#bulletnumber").html());		
		val--
				if(val >= 0)
				 $("#bulletnumber").html(val);
			if(val < 0)
					$("#bulletnumber").html("No Bullets");
			
			
			},300);
		
		
			


	})
	$("#down").click( function(e) {
			sendButton("40",playerid);

	})
	$("#left").click( function(e) {
			sendButton("37",playerid);

	})
	$("#right").click( function(e) {
			sendButton("39",playerid);

	})
	
}());
