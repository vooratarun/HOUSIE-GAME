package models;

import java.util.List;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import controllers.Application;

import play.libs.F;
import play.libs.Json;
import play.mvc.WebSocket;





public class Admin
{
	public String name;
	public static JsonNode bulletlist ;
	
	public Admin(String name) 
	{
		this.name = name;
	}
	
    public void adminMessage(final WebSocket.In<JsonNode> in, final WebSocket.Out<JsonNode> out, final PlayerRoom playerroom) 
    {
           
        in.onMessage(new F.Callback<JsonNode>() 
         {
				 public void invoke(JsonNode json) throws Throwable 
				 {
					 bulletlist = json;
					 
					 	System.out.println(" Admin: " + json.toString());
					 	playerroom.PutDataToAll(json);
					 	
					 	System.out.println(" p1: " + json.get("p1").getIntValue() );

					 	List<User> userlist = User.all();
			   			for(User user : userlist)
			   			{			   				
			   				 int id = user.getshooterid();
			   				 System.out.println("userid " + id);
			   				 
			   				 switch(id)
			   				 {
			   				 
			   				   case 1:
			   					   
			   					   	Application.bulletlist.put(1, json.get("p1").getIntValue());
			   					   	System.out.println("size" + Application.bulletlist.size());
			   					   	break;
			   				 case 2:
			   					   	Application.bulletlist.put(2, json.get("p2").getIntValue());
			   					   	System.out.println("size" + Application.bulletlist.size());

			   					   	break; 
			   				case 3:
				   					Application.bulletlist.put(3, json.get("p3").getIntValue());
			   					   	System.out.println("size" + Application.bulletlist.size());

				   					break;
				   			case 4:
					   			   Application.bulletlist.put(4, json.get("p4").getIntValue());
			   					   	System.out.println("size" + Application.bulletlist.size());

					   			   break;
					   			   
			   				 }
			   							   				
			   			}
				    
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
