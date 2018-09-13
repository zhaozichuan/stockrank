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
public class Favor extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    /*
     * 时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date createtime;
    
   
    public int disid;
 

    public int userid;
    
    public String memo;
    
    
    public static Finder<String, Favor> find = new Finder<String, Favor>(
            Favor.class
    );
}
