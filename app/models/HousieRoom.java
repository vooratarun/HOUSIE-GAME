package models;

import java.util.ArrayList;
import java.util.concurrent.atomic.AtomicInteger;

import org.codehaus.jackson.JsonNode;

import play.Logger;
import play.libs.F;
import play.mvc.WebSocket;


public class HousieRoom 
{
	public String name;

	public static int numbertosend = Housie.number;
    public AtomicInteger connections = new AtomicInteger(0);  
    public ArrayList<WebSocket.Out<JsonNode>> outlist = new ArrayList<WebSocket.Out<JsonNode>>();
    
    public HousieRoom(String name) 
    {
		this.name = name;
    }
    public void  putDataToall(JsonNode self)
    {
  
    	for( WebSocket.Out<JsonNode>  single : outlist)
    	{
    		single.write(self);
    		
    	}
    }
    
    public void createPlayer(final WebSocket.In<JsonNode> in, final WebSocket.Out<JsonNode> out, final Housie housiecentral) 
    {    	
    	outlist.add(out);
    	System.out.println("Total Players connected : " + outlist.size());
		       connections.incrementAndGet();		 		          
		       in.onMessage(new F.Callback<JsonNode>() 
		       {
		    	   
					 public void invoke(JsonNode json) throws Throwable 
					 { 
							System.out.println(" Message :  " + json.toString() );
							putDataToall(json);
							housiecentral.PutDataToGame(json);						
					 }
			
		       });
		
		       
		       
		        in.onClose(new F.Callback0() 
		        {
					public void invoke() throws Throwable 
					{
						outlist.remove(out);
			            connections.decrementAndGet(); 
			            Logger.info(connections +" player(s) currently connected.");
					}
		           
		        });
		
		        Logger.info(connections + " player(s) currently connected.");
	  }

    public void notifyAll(JsonNode json) 
    {
       
    }	
}
