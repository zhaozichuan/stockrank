package controllers;

import play.db.ebean.EbeanConfig;
import play.libs.Json;
import models.Stock;
import play.mvc.Controller;
import play.mvc.Result;
import repository.DatabaseExecutionContext;
import tools.DailyStockMarket;
import tools.Op_csv;
import util.ResultRtn;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.inject.Inject;

import io.ebean.Ebean;
import io.ebean.EbeanServer;
public class Cstock_k extends Controller {
    
	public static void main(String[] args) {
		// TODO Auto-generated method stub

	}
	
	private final EbeanServer ebeanServer;

    @Inject
    public Cstock_k(EbeanConfig ebeanConfig, DatabaseExecutionContext executionContext) {
        this.ebeanServer = Ebean.getServer(ebeanConfig.defaultServer());
    }
	

	    /**
	     * An action that responds with the {@link Counter}'s current
	     * count. The result is plain text. This action is mapped to
	     * <code>GET</code> requests with a path of <code>/count</code>
	     * requests by an entry in the <code>routes</code> config file.
	     */
	    public Result k(String mid,String simpleCode,String ktype) {
	        
//	    	Stock sk=new Stock("600030");
	    	ResultRtn resultRtn = new ResultRtn();
	    	List<Stock> sc=null;
	    	
	    	//****************************************************
		    
	    	  List<String>  Klist=Op_csv.read("D:\\zzc\\HQ_ALL\\hq\\fileKLine\\",simpleCode);
	    	
	    	  String stock_name="中信证券";String kType;int length;String callback="onKLineRecvData";
		    		 
		      java.text.DecimalFormat   df=new   java.text.DecimalFormat("#0.00"); 
		    		 
		      java.text.DecimalFormat   dt=new   java.text.DecimalFormat("yyyyMMdd"); 
		    			
	    	  SimpleDateFormat formatter;
	    		    formatter = new SimpleDateFormat ("yyyyMMdd");
	    		    
	    //	  List<DailyStockMarket> list= new ArrayList<DailyStockMarket>();

	    	  
//	    	  DailyStockMarket d1=new DailyStockMarket();
//	    	  d1.amount=827900497;
//	    	  d1.close=36.92;
//              d1.high=37.66;
//              d1.low=36.83;
//              d1.open=37.16;
//              d1.volume=123445545;
//              list.add(d1);
//
//	    	  
//	    	  
//	    	  
//	    	  
//	    	  
//	    	  DailyStockMarket d2=new DailyStockMarket();
//	    	  d2.amount=527900497;
//	    	  d2.close=36.92;
//              d2.high=39.66;
//              d2.low=31.83;
//              d2.open=37.16;
//              d2.volume=12344555;
//	    	  list.add(d2);
	    	  
	    	  StringBuffer returnStr = new StringBuffer();
              //String callback ="ok";
	    	  returnStr.append(callback + "({\"s\":\"").append(simpleCode)
	    				.append("\",\"n\":\"").append(stock_name)
	    				.append("\",\"data\":[");

	    		System.out.println("size=----" + Klist.size());
	    		
//onKLineRecvData({"s":"300150","n":"中信证券","data":[{"d":20180312,"t":0,"o":37.16,"h":39.66,"l":31.83,"c":36.92,"v":123445.55,"a":5279004.97,"j1":61722.78,"j3":5402450.52,"bs":""}
//,{"d":20180312,"t":0,"o":37.16,"h":37.66,"l":36.83,"c":36.92,"v":1234455.45,"a":8279004.97,"j1":617227.72,"j3":9513460.42,"bs":""}]})
	    	
	    		
	    		  for(int i=Klist.size()-1;i>=0;i--) {
		    		  
		    		  String item[] = Klist.get(i).split(",");//CSV格式文件为逗号分隔符文件，这里根据逗号切分 
		    		  String dateStr=item[0].substring(0,4)+item[0].substring(5,7)+item[0].substring(8,10);
		    		  
		    		  double amount = Double.parseDouble(item[12])/100;
		    		  
		    		  double volumn = Double.parseDouble(item[11])/100;
		    		  returnStr
			    		.append("{\"d\":").append(dateStr).append(",")
			    		.append("\"").append("t").append("\":").append("0").append(",")
			    		.append("\"o\":").append(item[6]).append(",")
			    		.append("\"h\":").append(item[4]).append(",")
			    		.append("\"l\":").append(item[5]).append(",")
			    		.append("\"c\":").append(item[3]).append(",")
			    		.append("\"v\":").append(volumn).append(",")
			    		.append("\"a\":").append(amount).append(",")
			    		.append("\"j1\":").append(item[13]).append(",")
			    		.append("\"j3\":").append(item[14]).append(",")
			    		.append("\"bs\":").append("\"\"").append("},")
			    		  
			    		
			    		;
		    		  
		    		  
		    		  
		    		  
		    		  
		    	  }	
	    		
	    		
	    		
//	    	for(int i=list.size()-1; i>=0; i-- )
//	    	{
//	    		if(list.get(i).volume ==0)
//	    			continue;
//	    		
//	    		returnStr
//	    		.append("{\"d\":").append("20180312").append(",")
//	    		.append("\"").append("t").append("\":").append("0").append(",")
//	    		.append("\"o\":").append(df.format(list.get(i).open)).append(",")
//	    		.append("\"h\":").append(df.format(list.get(i).high)).append(",")
//	    		.append("\"l\":").append(df.format(list.get(i).low)).append(",")
//	    		.append("\"c\":").append(df.format(list.get(i).close)).append(",")
//	    		.append("\"v\":").append(df.format(list.get(i).volume/100)).append(",")
//	    		.append("\"a\":").append(df.format(list.get(i).amount/100)).append(",")
//	    		.append("\"j1\":").append(df.format(list.get(i).volume/200)).append(",")
//	    		.append("\"j3\":").append(df.format(list.get(i).amount/100+list.get(i).volume/100)).append(",")
//	    		.append("\"bs\":").append("\"\"").append("},")
//	    		  
//	    		
//	    		;
//	    	}
	    	
	    
	    	
	    	Date today=new Date();
	        String time = new SimpleDateFormat("HHmm").format(new Date());

	    	

	    	
	    	
//	    		//String stockCode1=StockMarkets.StockTransfer(symbol);
//	    		HqTransfor.HQ163 hq163=StockMarkets.GetOneHq(symbol);
//	    		
//	    		String  high =df.format(hq163.high);
//	    		String  lower =df.format(hq163.low);
//	    		double  real_close =hq163.price;
//	    		
//	    		double  closeAmount =hq163.turnover/100;
//	    		double  closeVol =hq163.volume/100;
//	    		double  real_open = hq163.open;
//	    		String todayDate = formatter.format(new Date());
//	    		returnStr
//	    		.append("{\"d\":").append(todayDate).append(",");
//	    		returnStr.append("\"").append("t").append("\":").append("0").append(",");
//	    		returnStr.append("\"o\":").append(df.format(real_open)).append(",");
//	    		returnStr.append("\"h\":").append(high).append(",");
//	    		returnStr.append("\"l\":").append(lower).append(",");
//	    		returnStr.append("\"c\":").append(df.format(real_close)).append(",");
//	    		returnStr.append("\"v\":").append(df.format(closeVol/100)).append(",");
//	    		returnStr.append("\"a\":").append(df.format(closeAmount/100)).append(",");
//	    		returnStr.append("\"j1\":").append(df.format(closeAmount/200)).append("}");
//	    		returnStr.append("\"j3\":").append(df.format(closeAmount/100*3)).append("}");
//	    		returnStr.append("\"bs\":").append("\"\"").append("},");
//	    		;

	    //add for  today  kline  end
	    	
	    	//returnStr.append( returnStr.substring(0,returnStr.length()-1)+"]})");
	    	 return ok( returnStr.substring(0,returnStr.length()-1)+"]})");

	    	
	    	
	    	
	    	//*****************************************************
	    	
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


}
