package controllers;

import play.mvc.Http.Context;
import play.mvc.Result;
import play.mvc.Security;
import models.User;
//import models.UserInfoDB;


public class Secured extends Security.Authenticator {

  @Override
  public String getUsername(Context ctx) {
    return ctx.session().get("username");
  }

  
  @Override
  public Result onUnauthorized(Context context) {
    return redirect(routes.SignUp.login()); 
  }
  
  
  public static String getUser(Context ctx) {
    return ctx.session().get("username");
  }
  
 
  public static boolean isLoggedIn(Context ctx) {
    return (getUser(ctx) != null);
  }
  
 
  
  public static User getUserInfo(Context ctx) {
    return (isLoggedIn(ctx) ? Application.getUser(getUser(ctx)) : null);
  }
	

}
