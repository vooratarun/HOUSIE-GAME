var array = new Array();
var array2= new Array();
var prenum="";
var loop;
var res = "<ul>";
var socket = new WebSocket("ws://"+location.host+"/housiecentral");
socket.onopen = function() {  connected = true;}
socket.onclose = function() { connected = false; }
function send(p)
	{
		if(connected)
			socket.send(JSON.stringify(p));

	}

socket.onmessage = function(e)
{
         m = JSON.parse(e.data);                 
         res = "Player - "+m.id;
         var mes = m.message;         	
         var r = mes.substr(0,4);
         if(r=="TOP ")
			 document.getElementById("fline").innerHTML  = res;
		 else if(r=="MIDD")
			document.getElementById("sline").innerHTML  = res;
		 else if(r=="BOTT")
			document.getElementById("tline").innerHTML  = res;		
		 else if(r=="EARL")
			document.getElementById("fjaldi").innerHTML  = res;
		else if(r=="FULL"){
			document.getElementById("finish").innerHTML  = res;	
			clearInterval(loop);
		}
}
for(i=1;i<=90;i++){
    array2.push(i);
}
if (sessionStorage.length != 0){
    for(i=0;i<=90;i++){
        if(sessionStorage.getItem(i) != null) {
            array.push(i);
            var index = array2.indexOf(i);
            array2.splice(index, 1);
        }
    }
    document.getElementById('number').innerHTML=sessionStorage.key(0);
//    document.getElementById('prenumber').innerHTML=sessionStorage.key(1);
    prenum=sessionStorage.key(1);
}
function clearn(){
    sessionStorage.clear();

    array.splice(0,array.length);
    array2.splice(0,array2.length);
    for(i=1;i<=90;i++){
        array2.push(i);
    }
    recreatetable(0);
    document.getElementById('number').innerHTML="";
    //document.getElementById('prenumber').innerHTML="";
    prenum="none";
    window.location.href = window.location.href;	
}
function audio_support(num)
{
		// PLAYER VARIABLES
	var audio_code;
	var mp3snd 	= "assets/numbers/"+num+".wav";	// MP3 FILE
	var oggsnd 	= "assets/numbers/"+num+".ogg";	// OGG FILE

	var loopsong	= "no"			// LOOP MUSIC | yes | no |
	var autostarts	= "yes"			// AUTO START MUSIC | yes | no |


	var audiowidth	= "300"			// WIDTH OF PLAYER
	var borderw	= "0"			// BORDER WIDTH AROUND PLAYER
	var bordcolor	= "0066FF"		// BORDER COLOR
	var centerp	= "no"			// CENTER PLAYER | yes | no |


	// -----------------------------------------------
	// Created by: Allwebco Design Corporation
	// No License is included. This script can be freely copied, distributed or sold
	// YOU DO NOT NEED TO EDIT BELOW THIS LINE

	   if (loopsong == "yes") {
	var looping5="loop";
	var loopingE="true";
		}
		else{
	var looping5="";
	var loopingE="false";
		}
	   if (autostarts == "yes") {
	var h5auto="autoplay";
	var h4auto="1";
		}
		else{
	var h5auto="";
	var h4auto="0";
		}
	   if (centerp == "yes") {
	var centerply="auto";
		}
		else{
	var centerply="0";
		}
	   if (centerp == "yes") {
	audio_code+='<center>';
	}
	audio_code+='<table style="border-collapse:collapse; border-spacing: 0px; margin: '+centerply+'; padding: 0px; border: #'+bordcolor+' '+borderw+'px solid;"><tr><td style="vertical-align: middle; text-align: center; padding: 0px;">';
	audio_code+='<audio '+h5auto+' controls '+looping5+' style="width:'+audiowidth+'px;">';
	audio_code+='<source src="'+mp3snd+'" type="audio/mpeg">';
	audio_code+='<source src="'+oggsnd+'" type="audio/ogg">';
	audio_code+='<object classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" type="application/x-mplayer2" width="'+audiowidth+'" height="45">';
	audio_code+='<param name="filename" value="'+mp3snd+'">';
	audio_code+='<param name="autostart" value="'+h4auto+'">';
	audio_code+='<param name="loop" value="'+loopingE+'">';
	audio_code+='</object>';
	audio_code+='</audio>';
	audio_code+='</td></tr></table>';
	   if (centerp == "yes") {
	audio_code+='</center>';
	}
	document.getElementById("audio").innerHTML = audio_code;
	// -->
}
function generate(){
    var num = array2[Math.floor(Math.random() * array2.length)];
    if(array2.length!=0)
    {
		audio_support(num);
	}
   	if(array2.length==0)
	{
	    document.getElementById('number').innerHTML="<font size='10px'>Game Finished</font>";
    	//document.getElementById('prenumber').innerHTML="Completed";
	}
	else
	{
	    document.getElementById('number').innerHTML=num;
    	//document.getElementById('prenumber').innerHTML=prenum;
	}
	send({ "number" : num ,"sender" : "board"});
    recreatetable(num);
    prenum=num;
}

function recreatetable(addkey) {
       
    var boardhtml = "";
       if(addkey != '0'){
       array.push(addkey);
       sessionStorage.setItem(addkey,"done");
       var index = array2.indexOf(addkey);
       array2.splice(index, 1);
       }
       for(i=1;i<=90;i++){
           if(i==1 || i==11 || i==21 || i==31 || i==41 || i==51 || i==61 || i==71 || i==81){
       
           boardhtml += "<div class='grid-row'>";
       }
       if(array.indexOf(i) > -1){
            boardhtml += "<div class='grid-cell-num' id='td" + i + "'><font style='position:relative;top:25px;color:white;'>" + i + "</font></div>";
       } else {
            boardhtml += "<div class='grid-cell' id='td" + i + "'><font style='position:relative;top:25px;'>" + i + "</font></div>";
       }
       if(i==10 || i==20 || i==30 || i==40 || i==50 || i==60 || i==70 || i==80 || i==90){       
        boardhtml += "</div>";
       }
      }    
    document.getElementById('board').innerHTML=boardhtml;
}
recreatetable(0);
function stopnum()
{
	clearInterval(loop);
}
function generatenum()
{			
	loop = setInterval(function()
	{
		console.log(array2.length);
		if(array2.length!=0)
		{						
			generate();
		}
		else
		{
			generate();
		    clearInterval(loop);
		}
	},5000);
}
