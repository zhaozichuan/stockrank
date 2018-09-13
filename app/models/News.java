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
public class News extends Model {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public int id;

    /**
     * 角色名称
     */
    @Constraints.Required
    public String title;
    
    @Constraints.Required
    public String url;
    
    @Constraints.Required
    public String classify;
    
    /*
     * 时间
     */
    @Constraints.Required
    public String time;
    
    
    

    public News(String title) {
        this.title = title;
    }

    public static Finder<String, News> find = new Finder<String, News>(
            News.class
    );
}
