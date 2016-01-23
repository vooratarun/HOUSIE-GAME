package controllers;
import static play.data.Form.form;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Set;

import models.User;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.node.ObjectNode;

import play.data.Form;
import play.db.ebean.Model.Finder;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import play.mvc.Security;
import play.mvc.WebSocket;
import views.html.list;
import views.html.signup.editform;
import views.html.signup.form;
import views.html.signup.login;
import views.html.signup.summary;
import views.html.signup.users;

public class SignUp extends Controller 
{
	
	public  static int  UserCount =0;
	public  static Object[]  loginusers= {0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0};
	public static int connection = 0;
	public static ArrayList<Integer> ScoreList = new ArrayList<Integer>();
	
	static User currentuser  = new User();
	
	public static Finder<Long, User> find = new Finder(Long.class, User.class);
	

	public static HashMap<Long,String> UserListlogin = new HashMap<Long,String>() ;


	
	final static Form<User> signupForm = form(User.class);
	
	public static Result blank() {
		return ok(form.render(signupForm));
		
	}

	

   	@Security.Authenticated(Secured.class)
	public static Result edit() {
   		
		Form<User> signupForm = form(User.class).fill(User.find.byId(Secured.getUserInfo(ctx()).getid()));
		return ok(editform.render(Secured.getUserInfo(ctx()).getid(), signupForm,Secured.getUserInfo(ctx()) ));

	}
   	@Security.Authenticated(Secured.class)
	public static Result update(Long Id) {
		Form<User> signupForm = form(User.class).bindFromRequest();
		if (signupForm.hasErrors()) {
			return badRequest(editform.render(Id, signupForm,Secured.getUserInfo(ctx()) ) );
		}
		//signupForm.fill(Secured.getUserInfo(ctx())).data();
		
		System.out.println("Update : " +  signupForm.field("id") );		
		
		signupForm.get().update(Id);
		
		
		return redirect(routes.SignUp.userlist());
			
	}
	
	public static Result users() { 
		return ok(users.render(User.all(),UserListlogin,ScoreList, Secured.isLoggedIn(ctx()), Secured.getUserInfo(ctx()),Application.tickets  ));

	}

	
	
	/**
	 * Handle the form submission.
	 */
	public static Result submit() {
		Form<User> filledForm = signupForm.bindFromRequest();

		// Check accept conditions
		if (!"true".equals(filledForm.field("accept").value())) {
			filledForm.reject("accept",
					"You must accept the terms and conditions");
		}

		// Check repeated password
		if (!filledForm.field("password").valueOr("").isEmpty()) {
			if (!filledForm.field("password").valueOr("")
					.equals(filledForm.field("repeatPassword").value())) {
				filledForm.reject("repeatPassword", "Password don't match");
			}
		}

		// Check if the username is valid
		if (!filledForm.hasErrors()) {
			if (filledForm.get().username.equals("admin")
					|| filledForm.get().username.equals("guest")) {
				filledForm.reject("username", "This username is already taken ");
			}
		}
		String uemail = filledForm.get().email;
		String uname = filledForm.get().username;

		List<User> list = find.all();
		for (User user : list) {
			if (user.username.equals(uname)) {
				filledForm.reject("username", "This username is already taken");
				break;
			}
		}

		for (User user : list) {
			if (user.email.equals(uemail)) {
				filledForm.reject("email", "This email is already taken");
				break;
			}
		}

		/*
		  if (filledForm.get().email.equals("vooratarun@gmail.com") ) {
		  
		  filledForm.reject("email", "This email is already taken");
		  }
		 */
		if (filledForm.hasErrors()) {
			return badRequest(form.render(filledForm));
		} else {
			User created = filledForm.get();
			created.save();
			flash("success", "user created");
			return ok(summary.render(created));
		}
	}

	public static Result deleteUser(Long Id) {
		find.ref(Id).delete();
		flash("success", "user deleted");
		return redirect(routes.SignUp.users());
		}
	// for login page
	public static Result login() {
		List<User> userlist = User.all();
		System.out.println("Connection:" + connection);
		if(connection == 0)
		{	
			for(User user : userlist)
			{
				 if(user.getpresentid() != 0 )
				 {
					 System.out.println("Previous users: ");
					 //UserListlogin.put(user.getpresentid(),user.username);
					 UserCount++;
				 }
			}
		}	
		return ok(login.render("Login",form(Login.class),Secured.isLoggedIn(ctx()), Secured.getUserInfo(ctx()) ));
	}
	
	public static class Login {

		public String username;
		public String password;

		public String validate() {
			
			currentuser = User.authenticate(username, password);
			if (currentuser == null) {
				return "Invalid user or password";
			}
			
			return null;
		}
	}
	
	public static Result authenticate() {
		Form<Login> loginForm = form(Login.class).bindFromRequest();
		if (loginForm.hasErrors()) {
			return badRequest(login.render("Login Form",loginForm , Secured.isLoggedIn(ctx()), Secured.getUserInfo(ctx())));
		}
		else if( loginForm.get().username.equals("admin@gmail.com") && loginForm.get().password.equals("iiitn") )
		{
				session().clear();
				session("username", loginForm.get().username);
		      return redirect(routes.SignUp.users());
		}	
		else if( loginForm.get().username.equals("admin2@gmail.com") && loginForm.get().password.equals("iiitn") )
		{
				session().clear();
				session("username", loginForm.get().username);
		      return redirect(routes.SignUp.users());
		}	
		else 
		{
			UserCount++; connection++;
			

			System.out.println(" UserCount :- " + UserCount );
			
			session("username", loginForm.get().username);
			//currentuser = Secured.getUserInfo(ctx());
	   		// currentuser.setpresentid(UserCount);
	   		// currentuser.update(Secured.getUserInfo(ctx()).getid());
			
			return redirect(routes.SignUp.userlist());
		}
	}
   	@Security.Authenticated(Secured.class)
	public static Result userlist()
	{   		  
   		Long userid = Secured.getUserInfo(ctx()).getpresentid();
   	    int flag = 0; 
   	   if(userid == 0 )
   	    {
	   		int i;  		
			 for(  i = 0; i<loginusers.length;i++ )
			 {
				 if((Integer) loginusers[i] == 0)
				 {
					 loginusers[i] =1;
					 flag = 1;						
					 break;
					 
				 }
				 
			 }
			  System.out.println("Index  : " + (i+1));
   	    	 User currentuser =  Secured.getUserInfo(ctx());
   	    	 currentuser.setpresentid((long)(i+1));
   	    	 currentuser.update( Secured.getUserInfo(ctx()).getid());
   	    	UserListlogin.put(Secured.getUserInfo(ctx()).getpresentid(), Secured.getUserInfo(ctx()).getusername());
			 
			@SuppressWarnings("rawtypes")
			Set set = UserListlogin.entrySet();
			@SuppressWarnings("rawtypes")
			Iterator itr = set.iterator();
		while(itr.hasNext())
		{
			Map.Entry m = (Map.Entry)itr.next();
			System.out.println(m.getKey() + "  " +  m.getValue());
			
		}	
   	    	 userid = (long) (i+1);
   	    	ObjectNode node = Json.newObject();
   	   		node.put("username",Secured.getUserInfo(ctx()).getusername() );
   	   		node.put("id", Secured.getUserInfo(ctx()).getpresentid());
   	   		node.put("type", "userdetails");
   	   		Application.adminout.write(node);
   	    }
   			return ok(list.render("User List",Secured.isLoggedIn(ctx()), Secured.getUserInfo(ctx()) ));

	}
	
	
	public static Result logout() {
		
		 System.out.println("Before User Count:- " + UserCount);
		
		 loginusers[(int) (Secured.getUserInfo(ctx()).getpresentid() -1)] = 0;
		 
		 UserListlogin.remove(Secured.getUserInfo(ctx()).getpresentid());
		 
		 currentuser = Secured.getUserInfo(ctx());
   		 currentuser.setpresentid((long) 0);
   		// currentuser.setshooterid(0);
   		 currentuser.update(Secured.getUserInfo(ctx()).getid());
		 UserCount--;
		 Application.playernumber--;
		 System.out.println("User Count:-     " + UserCount);
		session().clear();
		flash("success", "You've been logged out");
		return redirect(routes.Application.index());
	}
	public static Result admin_logout()
	{
		session().clear();
		return redirect(routes.Application.index());
	}
}
