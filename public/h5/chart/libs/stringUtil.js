	 function formatVolume(value)
	 {
	      var str;
		  var B=100000000;
		  var M = 10000;
		  if (value > B) {
            value /= B;
            str = formatNumber(value, 1);
            str += "вк";
        } else if (value > M) {
            value /= M;
            str = formatNumber(value, 1);
            str += "Эђ";
        } else {
            str = formatNumber(value, 0);
        }
	      
		  return str;
	 }
	 function formatNumber(value,n)
	 {
	      if(isNaN(value))
		    return "0";
	      var s = parseFloat(value + "").toFixed(n) + "";  
		  return s;
	 }
	 
	 function formatPrice(value,n)
	 {
	      if(isNaN(value))
		    return "--";
	      var s = parseFloat(value + "").toFixed(n) + "";  
		  return s;
	 }
	 
	 function formatDate(date)
     {
            return date.substring(0, 4)+"-"+date.substring(4, 6)+"-"+date.substring(6, 8);
			//return date.substring(0, 4)+"-"+date.substring(4, 6)+"-";
     }
	 function formatTime(time)
     {
	        var time=time+"";
            return time.substring(0, 2)+":"+time.substring(2, 4)+":"+time.substring(4, 6);
     }
	 function formatHHmm(time)
     {      
	        var time=time+"";
            return time.substring(0, 2)+":"+time.substring(2, 4);
     }
	 function formatmmdd(date)
     {
            return date.substring(4, 6)+"-"+date.substring(6, 8);
     }
	 function getHHmm(date)
	 {
	     if(date==null)
		 {
		     date=new Date();
		 }
		 return completeByBefore(date.getHours()+"",2,"0")+completeByBefore(date.getMinutes()+"",2,"0");
	 }
	 function completeByBefore(str,len,addStr)
	 {
	    str=""+str;
	    var num = len - str.length;
        var tmp = "";
        for (var i = 0; i < num; i++) {
            tmp += addStr;
        }
        str = tmp + str;
        return str;
	 }