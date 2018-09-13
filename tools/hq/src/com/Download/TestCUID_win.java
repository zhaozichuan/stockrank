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
import java.sql.SQLException;
import java.sql.Statement;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.Hashtable;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


import utils.tools.httpGetData;


public class TestCUID_win {
	static String LOCAL_PATH = "D://zzc//HQ_ALL//hq//fileKLine//";
	// static String LOCAL_PATH="//root//fileNew//";
	static String LOCAL_PATH_YAHOO = "//root//fileY//";

	public static void main(String[] args) {

		ResultSet stock = getStockList();
		try {
			while(stock.next()) {
				downfile163((String) stock.getString(2));
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	public static ResultSet getStockList() {	
	  String Mysql_Driver = "com.mysql.jdbc.Driver";
	  String url= "jdbc:mysql://rm-uf65wbvomnp2mufa6o.mysql.rds.aliyuncs.com/playebean";
	  Connection conn = null;
	 
	  
	  
	  	try { 
	  		  Class.forName(Mysql_Driver);
				  conn = DriverManager.getConnection(url, "root", "Zzc7382788");
	
					String sql = "select * from stock;"; 
					
					System.out.println("sql:"+sql);
					
					Statement st = conn.createStatement();
					ResultSet rt=  st.executeQuery(sql);
					
					return rt; 
	  		
	  		
	  		}catch(Exception e)
	  		{ 
	  			e.printStackTrace(); 
	  		}
	  	
	  	return  null;
		
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
		downstock="0"+stk_code;
		
		return downstock;
	}
	
	public static int downfile163(String stk_code) {
		//待下载文件地�?
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
		   //初始化连�?
		   URL url=new URL(fileUrl);
		   conn = (HttpURLConnection) url.openConnection();
		   conn.setDoInput(true);
		   conn.setDoOutput(true);

		   //获取文件�?
		   String disposition=conn.getHeaderField("Content-Disposition");
		   if(disposition!=null&&!"".equals(disposition)){
		    //从头中获取文件名
		   // fileName=disposition.split(";")[1].split("=")[1].replaceAll("\"","");
		   }else{
		    //从地�?中获取文件名
		    fileName=fileUrl.substring(fileUrl.lastIndexOf("/")+1);
		   }

		   if(fileName!=null&&!"".equals(fileName)){
		    //文件名解�?
		    fileName=URLDecoder.decode(fileName, "utf-8");
		   }else{
		    //如果无法获取文件名，则随机生成一�?
		    fileName="file_"+(int)(Math.random()*10);
		   }

		   //读取数据
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
	

	
	
	/*
	
	  public static String insertK_day_Yahoo(String code) {
		  
		  String Mysql_Driver = "com.mysql.jdbc.Driver";
		  String url= "jdbc:mysql://120.24.51.100:3306/bstockdev";
		  Connection conn = null;
		 
	    	try { 
	    		DailyStockMarket a_k =new DailyStockMarket();
	    		  Class.forName(Mysql_Driver);
				  conn = DriverManager.getConnection(url, "root", "");
	    		
	    		File csv = new File(LOCAL_PATH_YAHOO+code+".csv"); // CSV文件

	    		BufferedReader br = new BufferedReader(new FileReader(csv));

	    		// 读取直到�?后一�? 
	    		String line = ""; 
	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
	    		br.readLine();
	    		while ((line = br.readLine()) != null) { 
	    		// 把一行数据分割成多个字段 
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
					//String name =new String(items[2],"utf8")�?
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
//	    		// 每一行的多个字段用TAB隔开表示 
//	    		System.out.print(st.nextToken() + "\t"); 
//	    		} 
	    		
					
					
						  Statement st = conn.createStatement();
						  st.execute(sql);
						 
						  
						 
	    		
	    		} 
	    		
	    		
	    		conn.close();
	    		br.close();

	    		} catch (IOException e) { 
	    		// 捕获File对象生成时的异常 
	    		e.printStackTrace(); 
	    		} catch (Exception e) { 
	    		// 捕获BufferedReader对象关闭时的异常 
	    		e.printStackTrace(); 
	    		} 
	  	  return "0";
	    		} 
*/
	
// public static String insertK_day163(String code) {
//		  
//		  String Mysql_Driver = "com.mysql.jdbc.Driver";
//		  String url= "jdbc:mysql://127.0.0.1:3306/bstockV2";
//		  Connection conn = null;
//		 
////			if("1A0001".equals(code))
////				code="000001";
////         
////			if("2A01".equals(code))
////				code="399001";
////		
////			if("399006".equals(code))
////				code="399006";
//		  
//		//  String downstock=transfor(code);
//		  
//	    	try { 
//	    		DailyStockMarket a_k =new DailyStockMarket();
//	    		  Class.forName(Mysql_Driver);
//				  conn = DriverManager.getConnection(url, "root", "");
//	    		
//	    		File csv = new File(LOCAL_PATH+code+".csv"); // CSV文件
//
//	    		BufferedReader br = new BufferedReader(new FileReader(csv));
//
//	    		// 读取直到�?后一�? 
//	    		String line = ""; 
//	    		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");   
//	    		br.readLine();
//	    		while ((line = br.readLine()) != null) { 
//	    		// 把一行数据分割成多个字段 
//	    			String[] items =line.split(",");
//	    			System.out.println("--"+items[0]);
//	    			try {
//						a_k.time =sdf.parse(items[0]);
//					} catch (ParseException e) {
//						// TODO Auto-generated catch block
//						return "-1";
//					    
//					};
//					
//					if(Float.parseFloat(items[12])==0.00){
//						continue;
//					}
//					
////					try {
////						a_k.time =sdf.parse("2013-12-11");
////					} catch (ParseException e) {
////						// TODO Auto-generated catch block
////						e.printStackTrace();
////					}
////					String sql = "insert into bstock.daily_k(symbol,name,time,high,close,low,open,volume,amount)"
////							+ " values(:symbol,:name,:time,:high,:close,:low,:open,:volume,:amount)"; 
//					//String name =new String(items[2],"utf8")�?
//					String sql = "insert into daily_k(symbol,name,time,high,close,low,open,volume,amount)"
//							+ " values('"+code+"','"+items[2]+"','"+items[0]+"',"+Float.parseFloat(items[4])
//							+ ","+Float.parseFloat(items[3])+","+Float.parseFloat(items[5])+","+Float.parseFloat(items[6])+","+Float.parseFloat(items[11])+","+Float.parseFloat(items[12])
//							+ ")"; 
//			
//					
//					System.out.println("sql:"+sql);
////			int j=		Ebean.createSqlUpdate(sql).setParameter("symbol",items[1].substring(1,items[2].length()))
////					.setParameter("name",items[2])
////					.setParameter("time",a_k.time)
////					.setParameter("high",Float.parseFloat(items[4]))
////					.setParameter("close",Float.parseFloat(items[3]))
////					.setParameter("low",Float.parseFloat(items[5]))
////					.setParameter("open",Float.parseFloat(items[6]))
////					.setParameter("volume",Float.parseFloat(items[11]))
////					.setParameter("amount",Float.parseFloat(items[12]))
////					.execute();
//					
////	    			a_k.symbol ="600030";//items[1].substring(1,items[2].length());
////	    			a_k.name = "aa";//items[2];
////	    			a_k.high =(float) 0.01;//Float.parseFloat(items[4]);
////	    			a_k.close =(float) 0.01;//Float.parseFloat(items[3]);
////	    			a_k.low =(float) 0.01;//Float.parseFloat(items[5]);
////	    			a_k.open =(float) 0.01;//Float.parseFloat(items[6]);
////	    			a_k.volume =(float) 0.01;//Float.parseFloat(items[11]);
////	    			a_k.amount =(float) 0.01;//Float.parseFloat(items[12]);
////	    			a_k.save();			
//	    			//StringTokenizer st = new StringTokenizer(line, ",");
//
////	    		while (st.hasMoreTokens()) { 
////	    		// 每一行的多个字段用TAB隔开表示 
////	    		System.out.print(st.nextToken() + "\t"); 
////	    		} 
//	    		
//					
//					
//						  Statement st = conn.createStatement();
//						  st.execute(sql);
//						 
//						  
//						 
//	    		
//	    		} 
//	    		
//	    		
//	    		conn.close();
//	    		br.close();
//
//	    		} catch (IOException e) { 
//	    		// 捕获File对象生成时的异常 
//	    		e.printStackTrace(); 
//	    		} catch (Exception e) { 
//	    		// 捕获BufferedReader对象关闭时的异常 
//	    		e.printStackTrace(); 
//	    		} 
//	  	  return "0";
//	    		} 			
}

