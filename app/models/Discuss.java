package models;

import java.util.Date;

import javax.persistence.*;
import io.ebean.annotation.CreatedTimestamp;
import io.ebean.Finder;
import io.ebean.Model;
import play.data.validation.*;
import play.data.format.Formats;
/**
 * 角色
 */
@Entity
public class Discuss extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    /**
     * title
     */
    public String title;
    
    public String content;
    
    public int userid;
    
    /*
     * 时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date createtime;
    
    public String memo;
    

//    public Discuss(String title,String content,int userId) {
//        this.title = title;
//        this.content = content;
//        this.userid=userId;
//    }

    public static Finder<String, Discuss> find = new Finder<String, Discuss>(
            Discuss.class
    );
}
