package models;

import javax.persistence.*;


import util.Hash;
import io.ebean.Ebean;
import io.ebean.EbeanServer;
import io.ebean.Finder;
import io.ebean.annotation.CreatedTimestamp;
import io.ebean.annotation.JsonIgnore;
import models.Avatar;
import play.data.format.Formats;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import play.db.ebean.EbeanConfig;
/**
 * 用户
 */
@Entity
public class TransactionRecords extends BaseModel {
//public class User extends BaseModel {




    public String analyst_name="";
    
    public String industry_code="";
    
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int userId;
 
    
    /**
     * 用户创建时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date in_date;
    
    
    /**
     * 用户创建时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date out_date;
    
   

    public String phone="";
    public String memo1="";
    public String memo2="";
    public String memo3="";
    public String memo4="";


//    public static Finder<Integer, User> find = new Finder<Integer, User>(
//            User.class
//    );
//      private final static EbeanConfig ebeanConfig;
//      private final static EbeanServer ebeanServer=Ebean.getServer(ebeanConfig.defaultServer());
//      public static io.ebean.Query<User> find = ebeanServer.find(User.class);
//    
//    public static User authenticate(String email, String password) {
//        return   find.where()
//        		.eq("email", email)
//                .eq("password", password).findUnique();
//    }
//
//    public static User authenticateByMobile(long mobile, String password) {
//    	
//    	User user = find.where().eq("mobile", mobile).findUnique();
//        if (user != null) {
//            // get the hash password from the salt + clear password
//        	System.out.println(Hash.checkPassword(password, user.password)+" hash");
//            if (Hash.checkPassword(password, user.password)) {
//                return user;
//            }
//        }
//        return null;
//    }
//
//    public static User authenticateById(int id, String password) {
//        User user = find. where().eq("id", id).findUnique();
//        if (user != null) {
//            // get the hash password from the salt + clear password
//            if (Hash.checkPassword(password, user.password)) {
//                return user;
//            }
//        }
//        return null;
//    }
    
    public static final Finder<Long, TransactionRecords> find = new Finder<>(TransactionRecords.class);
    
}
