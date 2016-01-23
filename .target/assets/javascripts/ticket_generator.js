var i,k;
var val;
var comingnumber ;
var comingarray  = new Array();
var jaldicomplete = -1;
var firstrowcomplete = -1;
var secondrowcomplete = -1;
var thirdrowcomplete = -1;
var housiecomplete = -1;

var socket = new WebSocket("ws://"+location.host+"/housiestream");
   var connected = false;
   socket.onopen = function() { connected = true; sendPlayer(playerid)}	
   socket.onclose = function() { connected = false; }
   	socket.onmessage = function(e)
	{
		var m = JSON.parse(e.data);
		if(m.sender == "board")
		{
			comingnumber = m.number;
			document.getElementById("number").innerHTML = "Present Number:  " + comingnumber;
			comingarray.push(comingnumber);
		}
		else if(m.sender == "player")
		{
			document.getElementById("message").innerHTML = "PLAYER " + m.id + " GOT " + m.message;
			if(m.jaldi)
				
				jaldicomplete = m.jaldi
			else if(m.row1)
				firstrowcomplete = m.row1;	
			else if(m.row2)
				secondrowcomplete = m.row2;
			else if(m.row3)
				thirdrowcomplete = m.row3;
			else if(m.housie){
				housiecomplete = m.housie;
				sessionStorage.clear();	
				alert("Game Finished");
				window.location.href = window.location.href;}		
		}
	}	
	
	

	function send(p)
	{

		if(connected)
			socket.send(JSON.stringify(p));

	}


var check;
var ones = [1,2,3,4,5,6,7,8,9];	
var tens = [10,11,12,13,14,15,16,17,18,19];	
var twenty = [20,21,22,23,24,25,26,27,28,29];	
var thirty = [30,31,32,33,34,35,36,37,38,39];	
var fourty = [40,41,42,43,44,45,46,47,48,49];	
var fifty  = [50,51,52,53,54,55,56,57,58,59];	
var sixty  = [60,61,62,63,64,65,66,67,68,69];	
var seventy = [70,71,72,73,74,75,76,77,78,79];	
var eighty = [80,81,82,83,84,85,86,87,88,89,90];	
//var ticket_color = ["#00FA9A","#00FFFF","#4682B4","#6495ED","#8FBC8F","#9370DB","#BC8F8F","#FFE4E1","#FAFAD2","#DB7093"];
//	var number = prompt("How many numbers you want");
var first_row = [0,1,2,3,4,5,6,7,8];	
var second_row = [9,10,11,12,13,14,15,16,17];	
var third_row = [18,19,20,21,22,23,24,25,26];	
if (sessionStorage.length != 0)
{
	var reticket = new Array(3);      // recreate ticket numbers
	var a,b,c;
	for(j=0;j<3;j++)
	{
		reticket[j] = new Array(9);
	}
	for(i=0;i<sessionStorage.length;i++)
	{
		var store = sessionStorage.key(i);
		if(parseInt(store[0]+store[1])==91)
		{
			$("#btn").hide();	
		}
		if(store.length==5)
		{
			a = parseInt(store[0]);
			b = parseInt(store[2]);
			c = parseInt(store[4]);
		}		
		else if(store.length==6)
		{
			a = parseInt(store[0]);
			b = parseInt(store[2]);
			c = parseInt(store[4]+store[5]);
		}
		reticket[a][b] = c;				
	}	
	recreate_ticket();
}
function random_positions()
{
	 ticket_max = new Array();     // max 26 numbers
	 ticket_rand = new Array();	 // ticket print locations
	 ticket = new Array(3); 
	 
	for(i=0;i<3;i++)
	{
	ticket[i] = new Array(9);
	}	
	val = "91";
	sessionStorage.setItem(val,"message");
	$("#btn").hide();
	for(i=0;i<27;i++)
	{
		ticket_max.push(i);    
	}	
	for(i=0;i<5;i++)
	{
		var rand1 = first_row[Math.floor(Math.random() * first_row.length)];
		var rand2 = second_row[Math.floor(Math.random() * second_row.length)];									
		var rand3 = third_row[Math.floor(Math.random() * third_row.length)];									
											
		var index1 = first_row.indexOf(rand1);
		var index2 = second_row.indexOf(rand2);
		var index3 = third_row.indexOf(rand3);
		first_row.splice(index1, 1);
		second_row.splice(index2, 1);
		third_row.splice(index3, 1);				
		ticket_rand.push(rand1);
		ticket_rand.push(rand2);
		ticket_rand.push(rand3);
	}					
	for(i=0;i<27;i++)			
	{			
		check = ticket_rand.indexOf(i);		
		if(check > -1)
		{	
			if(i>=0 && i<=8){k=0;}
			else if(i>=9 && i<=17){k=1;}
			else if(i>=18 && i<=26){k=2;}
			var x = i%9;
			switch(x)
			{
				case 0:
				{
					var rand = ones[Math.floor(Math.random() * ones.length)];																	
					var index = ones.indexOf(rand);					 	         
					ones.splice(index, 1);			
					ticket[k][0] = rand;
					val = k+" "+0+" "+rand;
					sessionStorage.setItem(val,"done");
					break;
				}
				case 1:
				{
					var rand = tens[Math.floor(Math.random() * tens.length)];																
					var index = tens.indexOf(rand); 	         
					tens.splice(index, 1);			
					ticket[k][1] = rand;
					val = k+" "+1+" "+rand;
					sessionStorage.setItem(val,"done");
					break;

				}
				case 2:
				{
					var rand = twenty[Math.floor(Math.random() * twenty.length)];																
					var index = twenty.indexOf(rand);   	            
					twenty.splice(index, 1);			
					ticket[k][2] = rand;
					val = k+" "+2+" "+rand;
					sessionStorage.setItem(val,"done");	
					break;			
		
				}
				case 3:
				{
					var rand = thirty[Math.floor(Math.random() * thirty.length)];														
					var index = thirty.indexOf(rand);	            
					thirty.splice(index, 1);			
					ticket[k][3] = rand;
					val = k+" "+3+" "+rand;
					sessionStorage.setItem(val,"done");					
					break;

				}
				case 4:
				{
					var rand = fourty[Math.floor(Math.random() * fourty.length)];															
					var index = fourty.indexOf(rand); 	            
					fourty.splice(index, 1);			
					ticket[k][4] = rand;
					val = k+" "+4+" "+rand;
					sessionStorage.setItem(val,"done");
					break;
				}
				case 5:
				{
					var rand = fifty[Math.floor(Math.random() * fifty.length)];													
					var index = fifty.indexOf(rand); 	            
					fifty.splice(index, 1);			
					ticket[k][5] = rand;	
					val = k+" "+5+" "+rand;
					sessionStorage.setItem(val,"done");
					break;				
	
				}
				case 6:
				{
					var rand = sixty[Math.floor(Math.random() * sixty.length)];															
					var index = sixty.indexOf(rand); 	            
					sixty.splice(index, 1);			
					ticket[k][6] = rand;
					val = k+" "+6+" "+rand;
					sessionStorage.setItem(val,"done");		
					break;		
	
				}
				case 7:
				{
					var rand = seventy[Math.floor(Math.random() * seventy.length)];						
					var index = seventy.indexOf(rand);
					seventy.splice(index, 1);			
					ticket[k][7] = rand;	
					val = k+" "+7+" "+rand;
					sessionStorage.setItem(val,"done");				
					break;
	
				}			
				case 8:
				{
					var rand = eighty[Math.floor(Math.random() * eighty.length)];						
					var index = eighty.indexOf(rand); 	            
					eighty.splice(index, 1);			
					ticket[k][8] = rand;	
					val = k+" "+8+" "+rand;
					sessionStorage.setItem(val,"done");		
					break;			
				}	
			}		
		}								
	}					
	show_ticket();
}	
function show_ticket()
{
	//var rand_color = ticket_color[Math.floor(Math.random() * ticket_color.length)];		
	var rand_color="#EEE4DA";
	var ticket_board = "<table border='1' cellpadding='10' width='100%' height='100%'>";
	for(i=0;i<3;i++)
	{	
		ticket_board += "<tr height='10%' style='background-color:"+rand_color+";'>";
		for(j=0;j<9;j++)
		{
			ticket_num=ticket[i][j];
			if(typeof ticket_num == "number")
				ticket_board += "<td width='10%' id='id"+ticket_num+"'><button id='bt"+ticket_num+"' onClick='housie_result("+ticket_num+","+i+","+j+");' style='width:25px;height:25px;background-color:"+rand_color+";border-style:none;'><font size='4px'>"+ticket_num+"</font></button></td>";							
			else
				ticket_board += "<td width='10%'><font size='4px'>&nbsp;&emsp;</font></td>";							
		}
		ticket_board += "</tr>";
	}
	ticket_board +="</table>";
	document.getElementById("demo1").innerHTML = ticket_board;
}
function recreate_clicked(a,b)
{
	var d,e;
	for(l=0;l<sessionStorage.length;l++)
	{
		var pos = sessionStorage.key(l);
		if(pos.length==3)
		{			
			d = pos[0];
			e = pos[2];			
			if(d==a && e==b)
				return 1;
		}
	}	
}
function recreate_ticket()
{
	//var rand_color = ticket_color[Math.floor(Math.random() * ticket_color.length)];		
	var rand_color="#EEE4DA";
	var ticket_board = "<table border='1' cellpadding='10' width='100%' height='100%'>";
	for(i=0;i<3;i++)
	{	
		ticket_board += "<tr height='10%' style='background-color:"+rand_color+";'>";
		for(j=0;j<9;j++)
		{
			check = recreate_clicked(i,j);				
			if(check==1)
			{
					ticket_num=reticket[i][j];
					if(typeof ticket_num == "number")
						ticket_board += "<td width='10%' style='background-color:#F67C5F;' id='id"+ticket_num+"'><button disabled='disabled'; id='bt"+ticket_num+"' onClick='housie_result("+ticket_num+","+i+","+j+");' style='width:25px;height:25px;background-color:#F67C5F;color:white;border-style:none;'><font size='4px'>"+ticket_num+"</font></button></td>";							
					else
						ticket_board += "<td width='10%'><font size='4px'>&nbsp;&emsp;</font></td>";																			
			}										
			else
			{
				ticket_num=reticket[i][j];
				if(typeof ticket_num == "number")
					ticket_board += "<td width='10%' id='id"+ticket_num+"'><button id='bt"+ticket_num+"' onClick='housie_result("+ticket_num+","+i+","+j+");' style='width:25px;height:25px;background-color:"+rand_color+";border-style:none;'><font size='4px'>"+ticket_num+"</font></button></td>";							
				else
					ticket_board += "<td width='10%'><font size='4px'>&nbsp;&emsp;</font></td>";
			}								
		}
		ticket_board += "</tr>";
	}
	ticket_board +="</table>";
	document.getElementById("demo1").innerHTML = ticket_board;
}
var jaldi=0;
var housie=0;
var first=0;
var second=0;
var third=0;
function housie_result(x,row,col)
{
	if(comingarray.indexOf(x) > -1)
       {
	$("#id"+x).css("background-color","#F67C5F");
	$("#bt"+x).attr("disabled","disabled");
	$("#bt"+x).css("color","white");
	$("#bt"+x).css("background-color","#F67C5F");
	var clicked = row+" "+col;
	sessionStorage.setItem(clicked,"message");	

	jaldi = jaldi + 1;
	housie = housie + 1;
	if(row==0){	
		first = first+1;}
	else if(row==1){
		second = second+1;}		
	else if(row==2){
		third = third+1;}
	if(firstrowcomplete== -1 && first==5 ){
		//alert("player id got first row");
		send({ "sender": "player", "id" : playerid ,message :"TOP ROW" ,"row1" : 1});
		}
	if(secondrowcomplete == -1 && second==5){
		//alert("player id got second row");
		send({"sender": "player", "id" : playerid, message :"MIDDLE ROW" ,"row2" : 1 });
		}
	if(thirdrowcomplete == -1 && third==5){
		//alert("player id got third row");
		send({"sender": "player" , "id" : playerid, message :"BOTTOM ROW","row3" : 1 });
		}				
	if(jaldicomplete == -1 && jaldi == 5){
		//alert("player id got first jaldi");
		send({"sender": "player" , "id" : playerid ,message :"EARLY FIVE" , "jaldi" : 1  });
		}
	if(housiecomplete == -1 && housie==15){
		//alert("player id Game finished");
		send({"sender": "player" , "id" : playerid, message :"FULL HOUSIE" , "housie" : 1 });
		
		}	
 }
 else{
	alert("please check ur number");
 }		
}
