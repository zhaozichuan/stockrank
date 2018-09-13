package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.Stock;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import util.ResultRtn;

import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
public class Cstock extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	private final EbeanServer ebeanServer;

    @Inject
    public Cstock(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
    }
	

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */
	    public Result q(String simpleCode) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<Stock> sc=null;
	    	if(simpleCode.matches("^[-+]?(([0-9]+)([.]([0-9]+))?|([.]([0-9]+))?)$")){
	    		simpleCode="%"+simpleCode+"%";		
	    		sc=ebeanServer.find(Stock.class).where().like("code", simpleCode).findList();
//	    		System.out.println("query stock simple belong code");
	    	}else{
	    		simpleCode="%"+simpleCode+"%";
			//RealData realData=new RealData();
//	    		System.out.println("query stock simple belong simple_name");
	    		sc=ebeanServer.find(Stock.class).where().like("simple_name", simpleCode).findList();		
	    	}
	    	
	    	
	    	resultRtn.errCode = 0;
			resultRtn.business.put("Stock", sc);
			StringBuffer reStr=new StringBuffer("<ul>");
			for(int i=0; i<sc.size();i++){
				reStr.append("<li><a href=\"javascript:alert(\'ok\')\">")
				     .append(sc.get(i).name)
				     .append("</a></li>");
			}
			    reStr.append("</ui>");
			return ok(reStr.toString());
//          return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
	    	
	    }
	    
	    
         public Result q1(String Code) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<Stock> sc =ebeanServer.find(Stock.class).where().eq("code", Code).findList();
	    	resultRtn.errCode = 0;
			resultRtn.business.put("Stock", sc);
	    	
	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//	    	return ok("--->"+Stock.find.query("code").findUnique().name);
	    	
	    }

         
//         public Result mystock(String userId) {
// 	        
//// 	    	Stock sk=new Stock("600030");
// 	    	ResultRtn resultRtn = new ResultRtn();
// 	    	List<Stock> sc =ebeanServer.find(Stock.class).where().eq("code", Code).findList();
// 	    	resultRtn.errCode = 0;
// 			resultRtn.business.put("Stock", sc);
// 	    	
// 	    	return ok(Json.toJson(resultRtn).toString().replaceAll("null", "\"\""));
//// 	    	return ok("--->"+Stock.find.query("code").findUnique().name);
// 	    	
// 	    }
//         

}
