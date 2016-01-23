package models;

import java.util.List;

import javax.persistence.Entity;
import javax.persistence.Id;

import play.data.validation.Constraints.Email;
import play.data.validation.Constraints.MinLength;
import play.data.validation.Constraints.Required;
import play.db.ebean.Model;


@Entity
public class User extends Model {

	@Required
	@MinLength(value = 4)
	public String username;

	@Id
	public Long id;

	@Required
	@Email
	public String email;

	@Required
	@MinLength(value = 2)
	public String password;
	
	@Required
	public Long  presentid = (long)0;
	
	@Required
	public int shooterid = 0;
	public String mess ="The user";

	public User() {
	}
	

	public static Finder<Long, User> find = new Finder(Long.class, User.class);
	
	
	

	public User(String username, String email, String password) {
		this.username = username;
		this.email = email;
		this.password = password;
		
	}
	
	public Long getid()
	{
		
		return id;
		
	}
	
	public String getusername()
	{
			return username;
		
	}
	public String getemail()
	{
			return email;
		
	}
	public String getpassword()
	{
			return password;
			
	}
	public Long getpresentid()
	{
			return presentid;
		
	}
	public int getshooterid()
	{
		return shooterid;
	}
	public void setid(Long id)
	{
			this.id = id; 
		
	}
	public void setusername(String username)
	{
		this.username = username;
		
	}
	public void setemail(String email)
	{
		this.email = email;
		
	}
	
	public void setpassword(String password)
	{
		this.password = password;
	}
	public void setpresentid(Long presentid)
	{
		this.presentid = presentid;
		
	}
	public void setshooterid(int shooterid)
	{
		this.shooterid = shooterid;
		
	}
	public static List<User> all() {
		return find.all();

	}

	

	
	public static User authenticate(String username, String password) {
		return find.where().eq("username", username).eq("password", password)
				.findUnique();
	}

}
