package models;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.concurrent.atomic.AtomicInteger;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import controllers.Application;

import play.Logger;
import play.libs.F;
import play.libs.Json;
import play.mvc.WebSocket;


public class PlayerRoom 
{
	public String name;
	public static int[] count = {0,0,0,0,0};

    public AtomicInteger connections = new AtomicInteger(0);   // to check number of tabs opened
    public  static ArrayList<WebSocket.Out<JsonNode>> outlist = new ArrayList<WebSocket.Out<JsonNode>>();
    
    public PlayerRoom(String name) 
    {
		this.name = name;
    }
    
    public void PutDataToAll( JsonNode self)
    {
    	System.out.println("Outlist Size: " + outlist.size());
    	for( WebSocket.Out<JsonNode> single : outlist)
    		single.write(self);
    }
    
    public void createPlayer(final WebSocket.In<JsonNode> in, final WebSocket.Out<JsonNode> out, final Game game) 
    {
    	outlist.add(out);
    	
    	System.out.println("Total Players connected : " + outlist.size());
        connections.incrementAndGet();		            
        in.onMessage(new F.Callback<JsonNode>() 
        {
        	
		 public void invoke(JsonNode json) throws Throwable
		 { 
				int pid = json.get("id").getIntValue();
			   String but = json.get("but").getTextValue();
			 	System.out.println("SENDING Player : " + pid + " " + but+ " " + json.toString());
			 
			 	ObjectNode node = Json.newObject();			// creating json node 
			 	node.put("pid",pid);				// sending pid and data came from the game console
			 	node.put("jdata",json);  //Jdata consists button number clicked, type 
			 	
			 	if( but.equals("37") || but.equals("39") )
			 	{	             					
			 		 game.PutDataToGame(node);
	            }
			 	else if( but.equals("38") && count[pid] < Application.bulletlist.get(pid) )
			 	{
			 		game.PutDataToGame(node);			 		
			        count[pid]= count[pid] + 1;			 		
			 	}
			 	/*
			 	else if( but.equals("38") && count[pid] < Application.bulletlist.get(pid))
			 	{
			 		game.PutDataToGame(node);			 		
			        count[pid]= count[pid] + 1;			 		
			 	}*/
		 		
		 }
        });

        in.onClose(new F.Callback0() 
        {
        	
			public void invoke() throws Throwable 
			{
				outlist.remove(out);
				System.out.println("Present players:" + outlist.size());

	            connections.decrementAndGet();  // changing number of tabs opened.
	            Logger.info(connections +" player(s) currently connected.");
			}
           
        });

        	Logger.info(connections + " player(s) currently connected.");
    }

  	
}
