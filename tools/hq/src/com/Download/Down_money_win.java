package com.Download;


import java.io.BufferedReader;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.net.URLDecoder;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.avaje.ebean.Ebean;
import com.fasterxml.jackson.core.Version;
import com.fasterxml.jackson.databind.module.SimpleModule;

import models.*;
import play.libs.Json;
import play.mvc.BodyParser;
import play.mvc.Result;
import utils.tools.httpGetData;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import controllers.*;
public class Down_money_win extends BaseController {
	static String LOCAL_PATH="D://fileKLine//";
	//static String LOCAL_PATH="//root//fileNew//";
	static String LOCAL_PATH_YAHOO="//root//fileY//";
	public static Result test22() {
		String pattern = "\\s*@(\\S+):([\\s\\S]+)";

		Pattern p = Pattern.compile(pattern);
		Matcher m = p.matcher("@zzc");

		if(m.find()) {
			//Notification notification = new Notification();
			System.out.println("0000"+m.group(1));
		
		}
		
		return ok("1");
	}
	
	
	
	
	
	public static int downfileYahoo(String stk_code) {
	//寰呬笅杞芥枃浠跺湴鍧�
		String date1 = new SimpleDateFormat("yyyyMMdd").format(new Date());
		
		
		String downstock="";
		if(stk_code.startsWith("00")||stk_code.startsWith("30")){
			downstock=stk_code+".sz";
		}else{
			downstock=stk_code+".ss";
		}
	  String fileUrl="http://table.finance.yahoo.com/table.csv?s="+downstock;
	  InputStream in=null;
	  OutputStream out=null;
	  HttpURLConnection conn=null;
	  String fileName=null;
	  try {
	   //鍒濆鍖栬繛鎺�
	   URL url=new URL(fileUrl);
	   conn = (HttpURLConnection) url.openConnection();
	   conn.setDoInput(true);
	   conn.setDoOutput(true);

	   //鑾峰彇鏂囦欢鍚�
	   String disposition=conn.getHeaderField("Content-Disposition");
	   if(disposition!=null&&!"".equals(disposition)){
	    //浠庡ご涓幏鍙栨枃浠跺悕
	    fileName=disposition.split(";")[1].split("=")[1].replaceAll("\"","");
	   }else{
	    //浠庡湴鍧�涓幏鍙栨枃浠跺悕
	    fileName=fileUrl.substring(fileUrl.lastIndexOf("/")+1);
	   }

	   if(fileName!=null&&!"".equals(fileName)){
	    //鏂囦欢鍚嶈В鐮�
	    //fileName=URLDecoder.decode(fileName, "utf-8");
	    fileName=stk_code+"csv";
		   
	   }else{
	    //濡傛灉鏃犳硶鑾峰彇鏂囦欢鍚嶏紝鍒欓殢鏈虹敓鎴愪竴涓�
	    fileName="file_"+(int)(Math.random()*10);
	   }

	   //璇诲彇鏁版嵁
	   if(conn.getResponseCode()==HttpURLConnection.HTTP_OK){
	    byte[] buffer=new byte[2048];
	    in = conn.getInputStream();
	    out=new FileOutputStream(new File(LOCAL_PATH_YAHOO,fileName));
	    int count=0;
	    int finished=0;
	    int size=conn.getContentLength();
	    while((count=in.read(buffer))!=-1){
	     if(count!=0){
	      out.write(buffer,0,count);
	      finished+=count;
	      //System.out.printf("########################################---->%1$.2f%%\n",(double)finished/size*100);
	     }else{
	      break;
	     }
	    }
	    System.out.println("downfile ok "+ stk_code);
	    return 1;
	   }
	  } catch (MalformedURLException e) {
	   e.printStackTrace();
	  } catch (IOException e) {
	   e.printStackTrace();
	  }finally{
	   try {
	    out.close();
	    in.close();
	    conn.disconnect();
	   } catch (IOException e) {
	    e.printStackTrace();
	   }
	  }
	  return 0;
	}
	
	
	public static String transfor(String stk_code) {
		
		String downstock="";
		
		if(stk_code.startsWith("00")||stk_code.startsWith("30")){
			downstock="1"+stk_code;
		
		}else if(stk_code.startsWith("60")){
			downstock="0"+stk_code;
			 
		}else if(stk_code.startsWith("Z39")||stk_code.startsWith("J15")){
			downstock="1"+stk_code.substring(1,stk_code.length());
		}else if(stk_code.startsWith("Z00")||stk_code.startsWith("J50")){
			downstock="0"+stk_code.substring(1,stk_code.length());
		}
		return downstock;
	}
	
	
	
	public static int downfile163(String stk_code) {
		//寰呬笅杞芥枃浠跺湴鍧�
			String date1 = new SimpleDateFormat("yyyyMMdd").format(new Date());
			
			
			
			String downstock=transfor(stk_code);
			
			if("Z000001".equals(stk_code))
				downstock="0000001";
         
			
		
			
			
		  String fileUrl="http://quotes.money.163.com/service/chddata.html?code="+downstock+"&start=19990101&end="+date1+"&fields=TCLOSE;HIGH;LOW;TOPEN;LCLOSE;CHG;PCHG;TURNOVER;VOTURNOVER;VATURNOVER;TCAP;MCAP;";
		  InputStream in=null;
		  OutputStream out=null;
		  HttpURLConnection conn=null;
		  String fileName=stk_code+".csv";
		  try {
		   //鍒濆鍖栬繛鎺�
		   URL url=new URL(fileUrl);
		   conn = (HttpURLConnection) url.openConnection();
		   conn.setDoInput(true);
		   conn.setDoOutput(true);

		   //鑾峰彇鏂囦欢鍚�
		   String disposition=conn.getHeaderField("Content-Disposition");
		   if(disposition!=null&&!"".equals(disposition)){
		    //浠庡ご涓幏鍙栨枃浠跺悕
		   // fileName=disposition.split(";")[1].split("=")[1].replaceAll("\"","");
		   }else{
		    //浠庡湴鍧�涓幏鍙栨枃浠跺悕
		    fileName=fileUrl.substring(fileUrl.lastIndexOf("/")+1);
		   }

		   if(fileName!=null&&!"".equals(fileName)){
		    //鏂囦欢鍚嶈В鐮�
		    fileName=URLDecoder.decode(fileName, "utf-8");
		   }else{
		    //濡傛灉鏃犳硶鑾峰彇鏂囦欢鍚嶏紝鍒欓殢鏈虹敓鎴愪竴涓�
		    fileName="file_"+(int)(Math.random()*10);
		   }

		   //璇诲彇鏁版嵁
		   if(conn.getResponseCode()==HttpURLConnection.HTTP_OK){
		    byte[] buffer=new byte[2048];
		    in = conn.getInputStream();
		    out=new FileOutputStream(new File(LOCAL_PATH,fileName));
		    int count=0;
		    int finished=0;
		    int size=conn.getContentLength();
		    while((count=in.read(buffer))!=-1){
		     if(count!=0){
		      out.write(buffer,0,count);
		      finished+=count;
		      //System.out.printf("########################################---->%1$.2f%%\n",(double)finished/size*100);
		     }else{
		      break;
		     }
		    }
		    System.out.println("downfile ok "+ stk_code);
		    return 1;
		   }
		  } catch (MalformedURLException e) {
		   e.printStackTrace();
		  } catch (IOException e) {
		   e.printStackTrace();
		  }finally{
		   try {
		    out.close();
		    in.close();
		    conn.disconnect();
		   } catch (IOException e) {
		    e.printStackTrace();
		   }
		  }
		  return 0;
		}
	
	public static Result Test1() {
		ResultRtn resultRtn = new ResultRtn();
		Status status = new Status();
		int i=0, j=0;
		List<Stock> list=    Stock.find.all(); 
		//List<Stock> list=    new ArrayList<Stock>(); 
	//	list.add(e)
		
		for(Stock tmpstock:list){
		  i++;
			if(downfile163(tmpstock.code)==1){
				insertK_day163(tmpstock.code);
				j++;
			}
		}
	//	downfile("600000");
//		insertK_day("600000"); 
		
		//status.status=String.valueOf(StockMarkets.stock_realPrice("600030"));
//		try {
//			aa=httpGetData.getHttpDate("action=60&stockindex=1&MaxCount=1&Grid=600030", "http://42.121.107.194:7780/reqxml");
//		} catch (IOException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
//		ArrayList a = new ArrayList();
//		a.add("1");
//		a.add("2");
//		resultRtn.msg=String.valueOf(StockMarkets.stock_realPrice("600030"));
//		
//		Hashtable bb=(Hashtable)StockMarkets.stock_simpleHQ("600030");
//		resultRtn.msg =(String)bb.get("stockName");
//		resultRtn.business.put("test", a);
		
		
		return ok("OK");
	}
	
	
	public static Result Test2(String stkCode) {
		ResultRtn resultRtn = new ResultRtn();
		Status status = new Status();
		int i=0, j=0;
		//List<Stock> list=    Stock.find.all(); 
		//List<Stock> list=    new ArrayList<Stock>(); 
	//	list.add(e)
		
		if(downfile163(stkCode)==1){
	     insertK_day163(stkCode);
		}	
		return ok("OK");
	}
	
	
	  public static String insertK_day_Yahoo(String code) {
		  
		  String Mysql_Driver = "com.mysql.jdbc.Driver";
		  String url= "jdbc:mysql://120.24.51.100:3306/bstockdev";
		  Connection conn = null;
		 
	    	try { 
	    		DailyStockMarket a_k =new DailyStockMarket();
	    		  Class.forName(Mysql_Driver);
				  conn = DriverManager.getConnection(url, "root", "");
	    		
	    		File csv = new File(LOCAL_PATH_YAHOO+code+".csv"); // CSV鏂囦欢

	    		BufferedReader br = new BufferedReader(new FileReader(csv));

	    		// 璇诲彇鐩村埌鏈�鍚庝竴琛� 
	    		String line = ""; 
	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
	    		br.readLine();
	    		while ((line = br.readLine()) != null) { 
	    		// 鎶婁竴琛屾暟鎹垎鍓叉垚澶氫釜瀛楁 
	    			String[] items =line.split(",");
	    			System.out.println("--"+items[0]);
	    			try {
						a_k.time =sdf.parse(items[0]);
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						return "-1";
					    
					};
//					try {
//						a_k.time =sdf.parse("2013-12-11");
//					} catch (ParseException e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//					String sql = "insert into bstock.daily_k(symbol,name,time,high,close,low,open,volume,amount)"
//							+ " values(:symbol,:name,:time,:high,:close,:low,:open,:volume,:amount)"; 
					//String name =new String(items[2],"utf8")锛�
					String sql = "insert into daily_k(symbol,name,time,high,close,low,open,volume,amount)"
							+ " values('"+items[1].substring(1,items[1].length())+"','"+items[2]+"','"+items[0]+"',"+Float.parseFloat(items[4])
							+ ","+Float.parseFloat(items[3])+","+Float.parseFloat(items[5])+","+Float.parseFloat(items[6])+","+Float.parseFloat(items[11])+","+Float.parseFloat(items[12])
							+ ")"; 
			
					
					System.out.println("sql:"+sql);
//			int j=		Ebean.createSqlUpdate(sql).setParameter("symbol",items[1].substring(1,items[2].length()))
//					.setParameter("name",items[2])
//					.setParameter("time",a_k.time)
//					.setParameter("high",Float.parseFloat(items[4]))
//					.setParameter("close",Float.parseFloat(items[3]))
//					.setParameter("low",Float.parseFloat(items[5]))
//					.setParameter("open",Float.parseFloat(items[6]))
//					.setParameter("volume",Float.parseFloat(items[11]))
//					.setParameter("amount",Float.parseFloat(items[12]))
//					.execute();
					
//	    			a_k.symbol ="600030";//items[1].substring(1,items[2].length());
//	    			a_k.name = "aa";//items[2];
//	    			a_k.high =(float) 0.01;//Float.parseFloat(items[4]);
//	    			a_k.close =(float) 0.01;//Float.parseFloat(items[3]);
//	    			a_k.low =(float) 0.01;//Float.parseFloat(items[5]);
//	    			a_k.open =(float) 0.01;//Float.parseFloat(items[6]);
//	    			a_k.volume =(float) 0.01;//Float.parseFloat(items[11]);
//	    			a_k.amount =(float) 0.01;//Float.parseFloat(items[12]);
//	    			a_k.save();			
	    			//StringTokenizer st = new StringTokenizer(line, ",");

//	    		while (st.hasMoreTokens()) { 
//	    		// 姣忎竴琛岀殑澶氫釜瀛楁鐢═AB闅斿紑琛ㄧず 
//	    		System.out.print(st.nextToken() + "\t"); 
//	    		} 
	    		
					
					
						  Statement st = conn.createStatement();
						  st.execute(sql);
						 
						  
						 
	    		
	    		} 
	    		
	    		
	    		conn.close();
	    		br.close();

	    		} catch (IOException e) { 
	    		// 鎹曡幏File瀵硅薄鐢熸垚鏃剁殑寮傚父 
	    		e.printStackTrace(); 
	    		} catch (Exception e) { 
	    		// 鎹曡幏BufferedReader瀵硅薄鍏抽棴鏃剁殑寮傚父 
	    		e.printStackTrace(); 
	    		} 
	  	  return "0";
	    		} 

 public static String insertK_day163(String code) {
		  
		  String Mysql_Driver = "com.mysql.jdbc.Driver";
		  String url= "jdbc:mysql://127.0.0.1:3306/hqwork";
		  Connection conn = null;
		 
//			if("1A0001".equals(code))
//				code="000001";
//         
//			if("2A01".equals(code))
//				code="399001";
//		
//			if("399006".equals(code))
//				code="399006";
		  
		//  String downstock=transfor(code);
		  
	    	try { 
	    		DailyStockMarket a_k =new DailyStockMarket();
	    		  Class.forName(Mysql_Driver);
				  conn = DriverManager.getConnection(url, "root", "");
	    		
	    		File csv = new File(LOCAL_PATH+code+".csv"); // CSV鏂囦欢

	    		BufferedReader br = new BufferedReader(new FileReader(csv));

	    		// 璇诲彇鐩村埌鏈�鍚庝竴琛� 
	    		String line = ""; 
	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
	    		br.readLine();
	    		while ((line = br.readLine()) != null) { 
	    		// 鎶婁竴琛屾暟鎹垎鍓叉垚澶氫釜瀛楁 
	    			String[] items =line.split(",");
	    			System.out.println("--"+items[0]);
	    			try {
						a_k.time =sdf.parse(items[0]);
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						return "-1";
					    
					};
					
					if(Float.parseFloat(items[12])==0.00){
						continue;
					}
					
//					try {
//						a_k.time =sdf.parse("2013-12-11");
//					} catch (ParseException e) {
//						// TODO Auto-generated catch block
//						e.printStackTrace();
//					}
//					String sql = "insert into bstock.daily_k(symbol,name,time,high,close,low,open,volume,amount)"
//							+ " values(:symbol,:name,:time,:high,:close,:low,:open,:volume,:amount)"; 
					//String name =new String(items[2],"utf8")锛�
					String sql = "insert into daily_k(symbol,name,time,high,close,low,open,volume,amount)"
							+ " values('"+code+"','"+items[2]+"','"+items[0]+"',"+Float.parseFloat(items[4])
							+ ","+Float.parseFloat(items[3])+","+Float.parseFloat(items[5])+","+Float.parseFloat(items[6])+","+Float.parseFloat(items[11])+","+Float.parseFloat(items[12])
							+ ")"; 
			
					
					System.out.println("sql:"+sql);
//			int j=		Ebean.createSqlUpdate(sql).setParameter("symbol",items[1].substring(1,items[2].length()))
//					.setParameter("name",items[2])
//					.setParameter("time",a_k.time)
//					.setParameter("high",Float.parseFloat(items[4]))
//					.setParameter("close",Float.parseFloat(items[3]))
//					.setParameter("low",Float.parseFloat(items[5]))
//					.setParameter("open",Float.parseFloat(items[6]))
//					.setParameter("volume",Float.parseFloat(items[11]))
//					.setParameter("amount",Float.parseFloat(items[12]))
//					.execute();
					
//	    			a_k.symbol ="600030";//items[1].substring(1,items[2].length());
//	    			a_k.name = "aa";//items[2];
//	    			a_k.high =(float) 0.01;//Float.parseFloat(items[4]);
//	    			a_k.close =(float) 0.01;//Float.parseFloat(items[3]);
//	    			a_k.low =(float) 0.01;//Float.parseFloat(items[5]);
//	    			a_k.open =(float) 0.01;//Float.parseFloat(items[6]);
//	    			a_k.volume =(float) 0.01;//Float.parseFloat(items[11]);
//	    			a_k.amount =(float) 0.01;//Float.parseFloat(items[12]);
//	    			a_k.save();			
	    			//StringTokenizer st = new StringTokenizer(line, ",");

//	    		while (st.hasMoreTokens()) { 
//	    		// 姣忎竴琛岀殑澶氫釜瀛楁鐢═AB闅斿紑琛ㄧず 
//	    		System.out.print(st.nextToken() + "\t"); 
//	    		} 
	    		
					
					
						  Statement st = conn.createStatement();
						  st.execute(sql);
						 
						  
						 
	    		
	    		} 
	    		
	    		
	    		conn.close();
	    		br.close();

	    		} catch (IOException e) { 
	    		// 鎹曡幏File瀵硅薄鐢熸垚鏃剁殑寮傚父 
	    		e.printStackTrace(); 
	    		} catch (Exception e) { 
	    		// 鎹曡幏BufferedReader瀵硅薄鍏抽棴鏃剁殑寮傚父 
	    		e.printStackTrace(); 
	    		} 
	  	  return "0";
	    		} 			
}

