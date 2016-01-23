package models;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.deser.JsonNodeDeserializer;
import org.codehaus.jackson.node.ObjectNode;

import play.libs.F;
import play.libs.Json;
import play.mvc.WebSocket;
import controllers.Application;
import controllers.SignUp;

public class Game
{
	public String name;
	public WebSocket.Out<JsonNode> out =null;
	static SignUp signup = new SignUp();
    public Game(String name) 
    {
		this.name = name;
    }
    
    public void PutDataToGame(JsonNode self)
    {
    
        out.write(self);
       
    	
    }
    public void createGame(final WebSocket.In<JsonNode> in, final WebSocket.Out<JsonNode> out, final PlayerRoom playerroom) 
    {
        this.out = out;        
        in.onMessage(new F.Callback<JsonNode>() {
		 public void invoke(JsonNode json) throws Throwable 
		 {
			 System.out.println("Incoming Game :: " + json.toString());
			 if(json.get("type").getTextValue().equals("start") )
			 {
				 for(int i =0 ;i< playerroom.count.length ;i++)
				 {
					 playerroom.count[i] = 0;
				 }
				 
				 ObjectNode node = Json.newObject();
				 node.put("bullet", Admin.bulletlist);
				 node.put("start", json);
				node.put("type", "starting");
				 playerroom.PutDataToAll(node);
				 
			 }
			 if(json.get("type").getTextValue().equals("scores") )
			 {
				 	playerroom.PutDataToAll(json);
			 }
			 if(json.get("type").getTextValue().equals("end") )
			 {
				 for(int i =0 ;i< playerroom.count.length ;i++)
				 {
					 playerroom.count[i] = 0;
				 }
				 
				 int score1 = json.get("score1").getIntValue();
				 int score2 = json.get("score2").getIntValue();
				 int score3 = json.get("score3").getIntValue();
				 int score4 = json.get("score4").getIntValue();
				 
				 
				 if(SignUp.ScoreList.size() == 4 )
				 {
					 SignUp.ScoreList.clear();				 
				 }
				 SignUp.ScoreList.add(0,score1);
				 SignUp.ScoreList.add(1,score2);
				 SignUp.ScoreList.add(2,score3);
				 SignUp.ScoreList.add(3,score4);
			
				int big = SignUp.ScoreList.get(0);
				int flag = 0;
				for(int i=0; i< 4 ;i++)
				{
						if( big < SignUp.ScoreList.get(i)){
							big = SignUp.ScoreList.get(i);
							flag = i;
							
						}
				}	
				System.out.println("High score at : "+ flag + " " + big );
				
			 	ObjectNode node = Json.newObject();			
			 	node.put("type", "end");
	      		Application.message = "Game Completed. Player  "+ (flag+1) + " Got High Score won ticket number "+Application.tickets[Application.ticketnumber];				
			 	node.put("winner",Application.message );
	      		playerroom.PutDataToAll(node);
				 Application.tickets[Application.ticketnumber] = 0;
				 Application.ticketnumber++;
		     }
			 if(json.get("type").getTextValue().equals("restart") )
			 {
				 	playerroom.PutDataToAll(json);
				   Application.message = " Use UP key to shoot, LEFT and RIGHT to rotate";

			 }
		 }
		 
        });

        // User has disconnected.
        in.onClose(new F.Callback0() {
		public void invoke() throws Throwable {
		
			}           
        });
    }

}
