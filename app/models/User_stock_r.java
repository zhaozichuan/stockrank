package models;

import java.util.Date;

import javax.persistence.*;

import io.ebean.annotation.CreatedTimestamp;
import play.data.format.Formats;

/**
 * 用户
 */
@Entity
public class User_stock_r extends BaseModel {

	  /**
     * 用户ID
     */
    //@ManyToOne(cascade=CascadeType.ALL)
    @ManyToOne
    public User  user;
    
    
    /**
     * 用户自选股
     */
    //@ManyToOne(cascade=CascadeType.ALL)
    @ManyToOne
    public Stock  stock;
    
    
    /**
     * 股票创建时间
     */
    @Formats.DateTime(pattern = "yyyy-MM-dd HH:mm:ss")
    @CreatedTimestamp
    public Date createTime;
    
    /**
     * 股票选入时价格
     */
    public Double  put_price;
    
    
    /**
     * 备注
     */
    public String  memo;
    
    /**
     * 备注
     */
    public String  memo1;
    
    /**
     * 备注
     */
    public String  stockname;
    
    
    
    
    

  
    





    

    
    
    
}
