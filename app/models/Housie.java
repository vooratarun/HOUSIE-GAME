package models;

import org.codehaus.jackson.JsonNode;

import play.libs.F;
import play.mvc.WebSocket;

public class Housie
{
	public String name;
	public static int number;
	public WebSocket.Out<JsonNode> out = null;

	public Housie(String name) 
	{
		this.name = name;
    }
    
   public void PutDataToGame(JsonNode self)
   {
	   out.write(self);
	   
   }
    
    public void createGame(final WebSocket.In<JsonNode> in, final WebSocket.Out<JsonNode> out, final HousieRoom housie) 
    {
        
      this.out = out;
        
        in.onMessage(new F.Callback<JsonNode>() {
		 public void invoke(JsonNode json) throws Throwable 
		 {
					  number = json.get("number").getIntValue();
					  
					  System.out.println("iNCOMING OF GAME:" + number);
					  housie.putDataToall(json);

		 }
		 
        });

        in.onClose(new F.Callback0() 
        {
			public void invoke() throws Throwable
			{
			
			}
			
        });
    }

}
