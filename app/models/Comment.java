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
public class Comment extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;
    
    public int disid;

    
    public int commid;
    
    
    /*
     * 时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date createtime;
    
    
    public int userid;
    
    public String content;
    
    
    
    public int isreturn; //是否允许回帖
    
    
    
    public String memo;
    

    
    public static Finder<String, Comment> find = new Finder<String, Comment>(
            Comment.class
    );
}
