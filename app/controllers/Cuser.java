package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.ResultData;
import models.ResultData.MystockView;
import models.Stock;
import models.User;
import models.User_stock_r;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.ArrayList;
import java.util.Base64.Decoder;
import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;





public class Cuser extends Controller {
	
	
	public  class MystockView{
		   
		   
		   public String stockCode;
		   public String stockName;
		   
		   
		
		
	}
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	

	private final EbeanServer ebeanServer;

    @Inject
    public Cuser(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
    }

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */

	    
	    
         public Result q(String name) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<User> sc =ebeanServer.find(User.class).where().eq("name", name).findList();
	    	
	    	
	    	resultRtn.errCode = 0;
			resultRtn.business.put("User", sc);
	    	
	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
        	
	    }
         
         
         public Result login(String mid,String name,String pass) {
 	        System.out.println( "-login=====");
// 	    	Stock sk=new Stock("600030");
 	    	ResultRtn resultRtn = new ResultRtn();
 	    	int usercount =ebeanServer.find(User.class).where().eq("name", name).findCount();
 	    	if(usercount<=0) {
 	    		resultRtn.errCode = 1;
 	    		resultRtn.msg =name+ "：user is not exsist";
 	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
 	    	
 	    		
 	    	}
 	    	usercount=ebeanServer.find(User.class).where().eq("name", name).eq("password", pass).findCount();
 	    	
 	    	if(usercount<=0) {
 	    		resultRtn.errCode = 1;
 	    		resultRtn.msg =name+ "：user password error";
 	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\"")).as("text/event-stream");
 	    	
 	    		
 	    	}
 	    	
 	    	resultRtn.errCode = 0;
 	    	resultRtn.msg ="：login is ok";
 	    	
 	    	return ok("tttt").as("text/event-stream");
// 	    	return ok("--->"+Stock.find.query("code").findUnique().name);
         	
 	    }
         
         
         public Result reg_wx(String mid,String nickName,String pass,
        		 String phone,
        		 String avatarUrl,
        		 int gender ,
        		 String language,
        		 String city,
        		 String province,
        		 String country,
        		 int level) {
          	 
         	System.out.println( "====register=====");
   	    	ResultRtn resultRtn = new ResultRtn();
   	    	int usercount =ebeanServer.find(User.class).where().eq("name", nickName).findCount();
   	    	if(usercount> 0) {
   	    		resultRtn.errCode = 1;
   	    		resultRtn.msg =nickName+ "：user is exsist";
   	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
   	    	
   	    		
   	    	}

   	     	User regUser= new User(Long.parseLong(phone));
   	    	
   	     	  
   	           regUser.gender = gender;
	   	       regUser.language = language;
	   	       regUser.city = city;
	   	       regUser.province = province;
	   	     
	   	       regUser.imageUrl= avatarUrl;
	   	       regUser.country =country;         
   	        
   	     	   regUser.name = nickName ;
   	    	   regUser.password = pass;  
   	    	   regUser.level = level;
   	    	   regUser.save();
   	   	    	
   	    	
//   	    	usercount=ebeanServer.find(User.class).where().eq("name", name).eq("password", pass).findCount();
//   	    	
//   	    	if(usercount<=0) {
//   	    		resultRtn.errCode = 1;
//   	    		resultRtn.msg =name+ "：user password error";
//   	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\"")).as("text/event-stream");
//   	    	
//   	    		
//   	    	}
   	    	
   	    	resultRtn.errCode = 0;
   	    	resultRtn.msg ="：register is ok";
   	    	
   	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//   	    	return ok("--->"+Stock.find.query("code").findUnique().name);
           	
   	    } 
         
         
         
         
         public Result reg(String mid,String name,String pass,String phone,int level) {
  	 
        	System.out.println( "====register=====");
  	    	ResultRtn resultRtn = new ResultRtn();
  	    	int usercount =ebeanServer.find(User.class).where().eq("name", name).findCount();
  	    	if(usercount> 0) {
  	    		resultRtn.errCode = 1;
  	    		resultRtn.msg =name+ "：user is exsist";
  	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
  	    	
  	    		
  	    	}

  	     	User regUser= new User(Long.parseLong(phone));
  	    	
  	     	   regUser.name = name ;
  	    	   regUser.password = pass;  
  	    	   regUser.level = level;
  	    	   regUser.save();
  	   	    	
  	    	
//  	    	usercount=ebeanServer.find(User.class).where().eq("name", name).eq("password", pass).findCount();
//  	    	
//  	    	if(usercount<=0) {
//  	    		resultRtn.errCode = 1;
//  	    		resultRtn.msg =name+ "：user password error";
//  	    		return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\"")).as("text/event-stream");
//  	    	
//  	    		
//  	    	}
  	    	
  	    	resultRtn.errCode = 0;
  	    	resultRtn.msg ="：register is ok";
  	    	
  	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//  	    	return ok("--->"+Stock.find.query("code").findUnique().name);
          	
  	    }
           
         
         
         
         
         public Result myStockList(String mid,String userId) {
        	
             List<User_stock_r>   User_stock_r_list =null;
        	 
        	 ResultRtn resultRtn = new ResultRtn();
 	    	
 	    	
 	        try {     
 	    	
 	           User_stock_r_list =ebeanServer.find(User_stock_r.class).where().eq("user_Id", userId)
          				
 	        		               .findList();
 	        
 	        }catch(Exception e) {
 	        	
 	        	resultRtn.errCode = 1;
           	    resultRtn.msg =e.getMessage();
           	    return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
 	        }
 	        
 	        
 	      // ResultData view = new ResultData();
 	         
 	         
 	         List<MystockView> stockviewList= new ArrayList();
 	         
 	         for(int i=0;i<User_stock_r_list.size(); i++) {
 	        	MystockView stockview= new MystockView();
 	        
 	        	stockview.stockCode=User_stock_r_list.get(i).stock.code;
 	        	stockview.stockName=User_stock_r_list.get(i).stock.name;
 	        	stockviewList.add(stockview);
 	         }
 	      //  String [] arrayStock=  stockOrder.split("\\|"); 
 	      // Stock s=new Stock("");
 	      // List<String> sc = new ArrayList<String>();
 	       
 	    	
 	        resultRtn.errCode = 0;
 			resultRtn.business.put("myStock", stockviewList);
 	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
         	
 	    }


         
         
         
         
         public Result myStockAdd(String mid,String userId,String stockCode) {
        	 
        	 List<User>  userObj_list =null;
 	    	 ResultRtn   resultRtn = new ResultRtn();
  	         User_stock_r User_stock_r_obj=null;
 	    	 try {     
 	 	    	
 	    		userObj_list =ebeanServer.find(User.class).where().eq("userId", userId)
                      				.findList();
  	    	    
 	    		if(userObj_list.size()==0) {
 	 	    		 resultRtn.errCode = 1;
 	            	  resultRtn.msg = "user is not exsit";
 	            	 return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
 	 	    		
 	 	    	}
 	    		
 	    		
 	    		if(userObj_list.size()>1) {
 		    		 resultRtn.errCode = 1;
 	           	     resultRtn.msg = "userId is more than one";
 	           	 return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
 	           	   
 	              
 		    		
 		    	}
 	    		
 	    		
 	    		
 	    		List<Stock> stockList= ebeanServer.find(Stock.class).where().eq("code",stockCode)
 	    				.findList();
 	    		
 	    		if(stockList==null||stockList.size()==0) {
	 	    		 resultRtn.errCode = 1;
	            	  resultRtn.msg = "stock is not exsit";
	            	 return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
	 	    		
	 	    	}
 	    		
 	    		int mystockcount= ebeanServer.find(User_stock_r.class).where().eq("user_id",userId)
 	    				.eq("stock_id", stockList.get(0).id).findCount();
 	    		
 	    		if(mystockcount < 1) {																		
	 	    		User_stock_r_obj=new User_stock_r();
	 	    		User_stock_r_obj.user=userObj_list.get(0);
	 	    		User_stock_r_obj.put_price =0.00;
	 	    		User_stock_r_obj.stock = stockList.get(0);
	 	    		User_stock_r_obj.memo = stockList.get(0).name;
	 	    		User_stock_r_obj.save();
 	    		}else {
 	    			resultRtn.errCode = 1;
            	    resultRtn.msg ="Stock is added";
            	    return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
  	    
 	    			
 	    			
 	    		}
  	        
  	        }catch(Exception e) {
  	        	
  	        	    resultRtn.errCode = 1;
            	    resultRtn.msg =e.getMessage();
            	    return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
  	        }
 	    	
 	    
 	    	//userObj_list.get(0).stockOrder;
 	    	
 	    	
 	    	
 	      
 	         
// 	         int stockCount =ebeanServer.find(User.class).where().eq("userId", userId)
// 	        		.eq("Stock.stock_id", stockCode).findCount();
 	         
 	        
 	         
 	      
 	       
 	            
 	       // userObj.stocks.add(stockCode);
 	       //  userObj.save();
 	       //  Sto  ck stock=new 
 	        resultRtn.errCode = 0;
 			resultRtn.msg="Stock add ok";
 	    	
 	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
         	
 	    }
}
