package tools;
import java.io.IOException;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

import models.StockMarket_v;
import util.httpGetData; 
import org.json.JSONException;
import org.json.JSONObject;
    
    
public class Get163Hq {
	

	public static StockMarket_v doRequest_163(String stkCodes)  {
	    
	      //   System.out.println("stkCodes:"+stkCodes);
		    String responseStr="";
			try {
				responseStr = httpGetData.getHttpDate("callback=ok", "http://api.money.126.net/data/feed/"+stkCodes+"?callback=ok");
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		 //   System.out.println("res:"+responseStr);
	    	responseStr=responseStr.substring(3,responseStr.length()-2);  
	    	
	    	JSONObject json1 =jsonPasre(responseStr,stkCodes);
	    	
	    	StockMarket_v stockMarket = new StockMarket_v();
	    		
	    	try{
	    			
	    		  NumberFormat fmt = NumberFormat.getPercentInstance();
	    		  fmt.setMaximumFractionDigits(2);//最多两位百分小数，如25.23%
			      stockMarket.current = json1.get("price").toString();
	              stockMarket.rise = json1.get("percent").toString();
	              stockMarket.rise= fmt.format(Double.parseDouble(json1.get("percent").toString()));
	              stockMarket.upDowns =json1.get("updown").toString();
	              stockMarket.lastClose = json1.get("yestclose").toString();
	      	      stockMarket.open = json1.get("open").toString();
	      	      stockMarket.high = json1.get("high").toString();
	      	      stockMarket.low = json1.get("low").toString();
	      	     
	      	      stockMarket.average ="0";
	      	        
	              //FIXME(ZOwl):
	              stockMarket.volume = json1.get("volume").toString();
	              //FIXME(ZOwl):
	              stockMarket.amount = json1.get("turnover").toString();
	              stockMarket.code = json1.get("symbol").toString();
	              stockMarket.xianshou ="-";
	              stockMarket.huanshou="-";
	              stockMarket.zhenfu  ="-";
	              stockMarket.weibi   ="-";
	              stockMarket.weicha  ="-";
	              stockMarket.neipan  ="-";
	              stockMarket.waipan  ="-";
	              stockMarket.sale5   =json1.get("ask5").toString();
	              stockMarket.sale4   =json1.get("ask4").toString();
	              stockMarket.sale3   =json1.get("ask3").toString();
	              stockMarket.sale2   =json1.get("ask2").toString();
	              stockMarket.sale1   =json1.get("ask1").toString();
	              stockMarket.buy1    =json1.get("bid1").toString();
	              stockMarket.buy2    =json1.get("bid2").toString();
	              stockMarket.buy3    =json1.get("bid3").toString();
	              stockMarket.buy4    =json1.get("bid4").toString();
	              stockMarket.buy5    =json1.get("bid5").toString();
	              stockMarket.sale5_v   =json1.get("askvol5").toString();
	              stockMarket.sale4_v   =json1.get("askvol4").toString();
	              stockMarket.sale3_v   =json1.get("askvol3").toString();
	              stockMarket.sale2_v   =json1.get("askvol2").toString();
	              stockMarket.sale1_v   =json1.get("askvol1").toString();
	              stockMarket.buy1_v    =json1.get("bidvol1").toString();
	              stockMarket.buy2_v    =json1.get("bidvol2").toString();
	              stockMarket.buy3_v    =json1.get("bidvol3").toString();
	              stockMarket.buy4_v    =json1.get("bidvol4").toString();
	              stockMarket.buy5_v    =json1.get("bidvol5").toString();
	               
	               
	               //  if("2A01".equals(stockMarket.getCode()))
	               //   System.out.println("stockMarket:"+stockMarket.getCode());
	    			         
	    		}catch(Exception e){
	    			System.out.println("errir"+e);
	    			System.out.println("code hq error:"+stkCodes+"|");
	    		}

	    			
	    	    return stockMarket;
	    	}	
	    			
	    		 
	public static List<StockMarket_v> doRequest_163_many(String stkCodes)  {
	    
	      //   System.out.println("stkCodes:"+stkCodes);
		    String responseStr="";
		    JSONObject jsonObject = null;
			List<StockMarket_v> listHq=new ArrayList<StockMarket_v>();
			try {
				responseStr = httpGetData.getHttpDate("callback=ok", "http://api.money.126.net/data/feed/"+stkCodes+"?callback=ok");
			} catch (IOException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		 //   System.out.println("res:"+responseStr);
	    	responseStr=responseStr.substring(3,responseStr.length()-2);  
	    	
	    	
			try {
				jsonObject = new JSONObject(responseStr);
				System.out.println("jsonObject"+jsonObject);
				
				String [] codes=JSONObject.getNames(jsonObject);
				 
				for(int i=0;i<codes.length;i++) {
					JSONObject json1 =	(JSONObject) jsonObject.get(codes[i]);
					 StockMarket_v stockMarket =new StockMarket_v();
		    		 NumberFormat fmt = NumberFormat.getPercentInstance();
		    		 fmt.setMaximumFractionDigits(2);//最多两位百分小数，如25.23%
				      stockMarket.current = json1.get("price").toString();
		              stockMarket.rise = json1.get("percent").toString();
		              stockMarket.rise= fmt.format(Double.parseDouble(json1.get("percent").toString()));
		              stockMarket.upDowns =json1.get("updown").toString();
		              stockMarket.lastClose = json1.get("yestclose").toString();
		      	      stockMarket.open = json1.get("open").toString();
		      	      stockMarket.high = json1.get("high").toString();
		      	      stockMarket.low = json1.get("low").toString();
		      	     
		      	      stockMarket.average ="0";
		      	        
		              //FIXME(ZOwl):
		              stockMarket.volume = json1.get("volume").toString();
		              //FIXME(ZOwl):
		              stockMarket.amount = json1.get("turnover").toString();
		              stockMarket.code = json1.get("symbol").toString();
		              stockMarket.xianshou ="-";
		              stockMarket.huanshou="-";
		              stockMarket.zhenfu  ="-";
		              stockMarket.weibi   ="-";
		              stockMarket.weicha  ="-";
		              stockMarket.neipan  ="-";
		              stockMarket.waipan  ="-";
		              stockMarket.sale5   =json1.get("ask5").toString();
		              stockMarket.sale4   =json1.get("ask4").toString();
		              stockMarket.sale3   =json1.get("ask3").toString();
		              stockMarket.sale2   =json1.get("ask2").toString();
		              stockMarket.sale1   =json1.get("ask1").toString();
		              stockMarket.buy1    =json1.get("bid1").toString();
		              stockMarket.buy2    =json1.get("bid2").toString();
		              stockMarket.buy3    =json1.get("bid3").toString();
		              stockMarket.buy4    =json1.get("bid4").toString();
		              stockMarket.buy5    =json1.get("bid5").toString();
		              stockMarket.sale5_v   =json1.get("askvol5").toString();
		              stockMarket.sale4_v   =json1.get("askvol4").toString();
		              stockMarket.sale3_v   =json1.get("askvol3").toString();
		              stockMarket.sale2_v   =json1.get("askvol2").toString();
		              stockMarket.sale1_v   =json1.get("askvol1").toString();
		              stockMarket.buy1_v    =json1.get("bidvol1").toString();
		              stockMarket.buy2_v    =json1.get("bidvol2").toString();
		              stockMarket.buy3_v    =json1.get("bidvol3").toString();
		              stockMarket.buy4_v    =json1.get("bidvol4").toString();
		              stockMarket.buy5_v    =json1.get("bidvol5").toString();
		              
		              listHq.add(stockMarket);
		              
	               
				}
	               //  if("2A01".equals(stockMarket.getCode()))
	               //   System.out.println("stockMarket:"+stockMarket.getCode());
	    			         
	    		}catch(Exception e){
	    			System.out.println("errir"+e);
	    			System.out.println("code hq error:"+stkCodes+"|");
	    		}

	    			
	    	    return listHq;
	    	}	
	    		
	    	  
	              


	public static JSONObject jsonPasre(String jsonString,String code) {
		JSONObject jsonObject = null;
		JSONObject subobj=null;
		try {
			jsonObject = new JSONObject(jsonString);
			System.out.println("jsonObject"+jsonObject);
		} catch (JSONException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		try {
			 subobj=	(JSONObject) jsonObject.get(code);
			
			//String [] a=JSONObject.getNames(subobj);
			//System.out.println("aa"+a[5]);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return subobj;
	}
	

	public static void main(String[] args) throws Exception {
		// TODO Auto-generated method stub
		String code ="0600030";
		doRequest_163(code);
	}

}
