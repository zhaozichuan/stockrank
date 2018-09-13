package models;


import javax.persistence.*;
import play.data.validation.*;

/**
 * 股票
 */
@Entity
public class Stock extends BaseModel {


    /**
     * 股票代码
     */
    @Constraints.Required
    public String code;

    /**
     * 股票名称
     */
    public String name;
    
    
    /**
     * 股票简称
     */
    public String simpleName;
    

    public Stock(String code) {
        this.code = code;
    }
    
    
//	public static Query<Stock> find = new Finder<String, Stock>(Stock.class).query();
   
}
