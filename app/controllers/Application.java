package controllers;

import java.util.HashMap;
import java.util.List;


import models.Admin;
import models.Game;
import models.Housie;
import models.HousieRoom;
import models.PlayerRoom;
import models.User;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.db.ebean.Model.Finder;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import play.mvc.WebSocket;
import views.html.Index;
import views.html.gameindex;
import views.html.gameindex2;

import views.html.list;
import views.html.ticket_generator;
import views.html.ticket_index;
import views.html.wade_game.game_shoot;


public class Application extends Controller 
{
				
    public static  int[] tickets = { 1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011 };
    public static int ticketnumber = -1; 	
    public static int playernumber = 0;
	public  static Object[] values = {0,0,0,0,0,0,0,0,0,0};
	public static int instantid = 0;

    static int counter = 0 ;
    public static String message = "Game not started"; 
   
	static PlayerRoom env = new PlayerRoom("Public");
	static Game game = new Game("SHOOT");
	static Admin admin = new Admin("ADMIN");
	static Housie housiegame = new Housie("Housie");
	static HousieRoom housie = new HousieRoom("HousieRoom");
	static PlayerRoom playerroom = new PlayerRoom("Player Room");
	
	public static WebSocket.Out<JsonNode> adminout = null;

	public static HashMap<String, Integer> shiplist = new HashMap<String, Integer>();

	public static Finder<Long, User> find = new Finder(Long.class, User.class);
	public static HashMap<Integer, Integer> bulletlist = new HashMap<Integer, Integer>();

   	 public static Result index()
   	 {
   		   		 
   	    return ok(Index.render("Home", Secured.isLoggedIn(ctx()), Secured.getUserInfo(ctx()) ) );       
     }
        	 
   	 public static Result unknown(String x)
   	 {
   		   		 
   	    return ok("404 Error:Page Not Found");       
     }
   	 
   	 public static User getUser(String username) {
   		 
 		 return find.where().eq("username", username).findUnique();
   	  }
   	 
   
   	@Security.Authenticated(Secured.class)
	public static Result game_index()
	{
   	    int userid = Secured.getUserInfo(ctx()).getshooterid();
		System.out.println("Userid:  "+ userid);
   	    if(userid == 0 )
   	    {
	   		int i;  		
			 for(  i = 0; i<values.length;i++ )
			 {
				 if((Integer) values[i] == 0)
				 {
					 values[i] =1;
					 break;
					 
				 }
				 
			 }
	         System.out.println("Index  : " + (i+1));
   	    	 User currentuser =  Secured.getUserInfo(ctx());
   	    	 currentuser.setshooterid(i+1);
   	    	 currentuser.update( Secured.getUserInfo(ctx()).getid());   	    	
   	    	 userid = i+1;
   	    	 
   	    	return ok(gameindex.render(env,userid,message));
   	    }
   	   else
   		 return ok(gameindex.render(env,userid,message));
   	    
	}	
	 public static Result instant(String username)
   	 {
   		 System.out.println("uername:  " + username);
   		instantid++;
   		User instantuser = new User(username, username+"@gmail.com", username);
   		instantuser.setpresentid((long) instantid);
   		instantuser.setshooterid(instantid);
   		instantuser.save();
   		ObjectNode node = Json.newObject();
   		node.put("username", username);
   		node.put("id", instantid);
   		node.put("type", "userdetails");
   		adminout.write(node);
   		
   		return ok(list.render("InstantList",true, instantuser ));
   		
   	 }
	 
   	public static Result instantgame( Long id)
	{   		
   		 return ok(gameindex2.render(env, id,message));   	    
	}
	public static Result instantticket( Long id)
   	{  		
   		return ok(ticket_generator.render(id));   		
   	}

   	@Security.Authenticated(Secured.class)
   	public static Result quitgame()
   	{
   		playernumber--;
	   	 User currentuser =  Secured.getUserInfo(ctx());
	   	 values[currentuser.getshooterid() -1] = 0;
	   	 currentuser.setshooterid(0);
	   	 currentuser.update( Secured.getUserInfo(ctx()).getid());  
	   	 
   		return redirect(routes.SignUp.userlist());
   	}
   

   	public static Result game()
	{   		
   		ticketnumber++;   		
		return ok(game_shoot.render());				
	}

   	public static Result makezero(){
   		playernumber = 0;
   		instantid = 0;
   			List<User> userlist = User.all();
   			for(int i=0;i<values.length;i++)
   				values[i] = 0;
   			for(User user : userlist)
   			{
   				User user1 = user;
   				user1.setpresentid( (long) 0);
   				user1.setshooterid(0);
   				user1.update(user.getid());
   			}
   		
   		return ok("done");
   	}   	
   	public static Result housie_game()
   	{
   		
   		return ok(ticket_index.render());
   	}
  
   	@Security.Authenticated(Secured.class)
   	public static Result ticket()
   	{
   		int userid = Secured.getUserInfo(ctx()).getshooterid();
		System.out.println("Userid:  "+ userid);
   	    if(userid == 0 )
   	    {
	   		int i;  		
			 for(  i = 0; i<values.length;i++ )
			 {
				 if((Integer) values[i] == 0)
				 {
					 values[i] =1;
					 break;
					 
				 }
				 
			 }
	         System.out.println("Index  : " + (i+1));
   	    	 User currentuser =  Secured.getUserInfo(ctx());
   	    	 currentuser.setshooterid(i+1);
   	    	 currentuser.update( Secured.getUserInfo(ctx()).getid());   	    	
   	    	 userid = i+1;
   	    	 
   	    	return ok(ticket_generator.render((long) userid));
   	    }
   	   else
   		return ok(ticket_generator.render((long) userid));
   		
   	}
   	
   	
 public static  WebSocket<JsonNode>  stream() {

   return new WebSocket<JsonNode>() {
            @Override
            public void onReady(In<JsonNode> in, Out<JsonNode> out) {
                try{
			System.out.println("incoming ... " + in);
                   env.createPlayer(in, out, game);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        };
}
 
 public static  WebSocket<JsonNode>  admin() {

	 	
	   return new WebSocket<JsonNode>() {
	            @Override
	            public void onReady(In<JsonNode> in, Out<JsonNode> out) {
	            	adminout = out;
	                try{
				      System.out.println("ADMIN MESSAGE ... " + out);
				      admin.adminMessage(in, out, playerroom);
				       
	                } catch (Exception e) {
	                    e.printStackTrace();
	                }
	            }
	        };
	}
 
 public static  WebSocket<JsonNode>  central() {	 	
	   return new WebSocket<JsonNode>() {
	            @Override
	            public void onReady(In<JsonNode> in, Out<JsonNode> out) {
	                try{
				      System.out.println("incoming game ... " + out);
				       message = "Game is about to Start";
	                   game.createGame(in, out,playerroom);
	                } catch (Exception e) {
	                    e.printStackTrace();
	                }
	            }
	        };
	}

 public static  WebSocket<JsonNode>  housiestream() {

	   return new WebSocket<JsonNode>() {
	            @Override
	            public void onReady(In<JsonNode> in, Out<JsonNode> out) {
	                try{
				System.out.println("incoming housie stream for player ... " + out);
				housie.createPlayer(in, out,housiegame);
	                  
	                } catch (Exception e) {
	                    e.printStackTrace();
	                }
	            }
	        };
	}  
 public static  WebSocket<JsonNode>  housiecentral() {	 	
	   return new WebSocket<JsonNode>() {
	            @Override
	            public void onReady(In<JsonNode> in, Out<JsonNode> out) {
	                try{
				      System.out.println("incoming housie game ... " + in);
				      housiegame.createGame(in, out,housie);			     
	                } catch (Exception e) {
	                    e.printStackTrace();
	                }
	            }
	        };
	}
}
