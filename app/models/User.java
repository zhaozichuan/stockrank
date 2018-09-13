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
public class User extends BaseModel {
//public class User extends BaseModel {


    /**
     * 手机号
     */
    public long mobile=0;
    
    public int level=0;
    
    public int gender=0;

    public String email="";
    
    public String opStyleA="";
    
    public String opStyleB="";
    
    public String totalProfit="";
    
    public String department="";

    public String analystCid="";
    
    public String analystDesc="";

    public String beiyong1="";
    
    public String stockOrder="";
    
    public String imageUrl="";
    
    public String language="";
    
    public String province="";
    
    public String city="";
    
    public String country="";
    
    
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int userId;
    /**
     * 用户名
     */
    public String name="";

    /**
     * 密码
     */
    @JsonIgnore
    public String password;
    
    /**
     * 用户创建时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date createTime;
    
    /*
     * 用户最后登录时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    public Date updateTime;

    @Transient
    @JsonIgnore
    public String newPassword;

    public String mid;

//    @OneToOne(fetch=FetchType.LAZY)
//    public Avatar avatar;

    @Transient
    public String authCode;

    /**
     * 自选股
     */
//    @ManyToMany(cascade=CascadeType.ALL)
//    public List<String> stocks = new ArrayList<String>();   
    
  //@OneToMany(cascade=CascadeType.ALL)
    
    /**
     * 角色
     */
    //@ManyToOne(cascade=CascadeType.ALL)
    @ManyToOne
    public Role role;

//    /**
//     * 关注
//     */
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "fromUser")
//    @JsonIgnore
//    public List<Relationship> followUsers;
//
//    /**
//     * 粉丝
//     */
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "toUser")
//    @JsonIgnore
//    public List<Relationship> followers;
//
//    /**
//     * 所发贴
//     */
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "author")
//    @JsonBackReference
//    public List<Post> posts;
//
//    /**
//     * 所发评论
//     */
//    @OneToMany(fetch = FetchType.LAZY, mappedBy = "author")
//    @JsonIgnore
//    public List<Comment> comments;
//
//    /**
//     * 模拟盘
//     */
//    @OneToMany(fetch = FetchType.LAZY,mappedBy="designer")
//    public List<Portfolio> portfolios;
//
//    @OneToMany(fetch = FetchType.LAZY, mappedBy="user")
//    @JsonBackReference
//    @JsonIgnore
//    public List<Favor> favors;

    
    
    
//    @OneToMany(fetch = FetchType.LAZY, mappedBy="user")
//    public List<Notification> notifications;

    
	public User(long mobile) {
        this.mobile= mobile;
    }

    public User(String email, String name, String password) {
        this.email = email;
        this.name = name;
        this.password = password;
    }

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
    
    public static final Finder<Long, User> find = new Finder<>(User.class);
    
}
