package tools;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;

public  class Op_csv {
	
    public static List read(String filename,String code) {
    	List rowcsv=new ArrayList<>();
	try {
		
		   BufferedReader reader = new BufferedReader(new FileReader(filename+code+".csv"));//鎹㈡垚浣犵殑鏂囦欢鍚� 
	        reader.readLine();//绗竴琛屼俊鎭紝涓烘爣棰樹俊鎭紝涓嶇敤,濡傛灉闇�瑕侊紝娉ㄩ噴鎺� 
	        String line = null;  
	        int count=100;
	        while((line=reader.readLine())!=null&&count-->0){  
	        	
	        	rowcsv.add(line);
	           // String item[] = line.split(",");//CSV鏍煎紡鏂囦欢涓洪�楀彿鍒嗛殧绗︽枃浠讹紝杩欓噷鏍规嵁閫楀彿鍒囧垎 
	              
	           // String last = item[item.length-1];//杩欏氨鏄綘瑕佺殑鏁版嵁浜� 
	            //int value = Integer.parseInt(last);//濡傛灉鏄暟鍊硷紝鍙互杞寲涓烘暟鍊� 
	            System.out.println(line);  
        }  
    } catch (Exception e) {  
        e.printStackTrace();  
    }
	return rowcsv;  
}  
//	public static void main(String[] args) {
//		// TODO Auto-generated method stub
//		Op_csv.read("D:\\zzc\\HQ_ALL\\hq\\fileKLine\\");
//	}

}
