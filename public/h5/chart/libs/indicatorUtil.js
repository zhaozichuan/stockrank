	 function calLimit(start,end,args)
	 {
	     var limits=[999999,-999999];
		 var off;
		 
		 for(var i=0;i<(end-start);i++)
		 {
		     off=i+start;
			 
		     for(var j=0;j<args.length;j++)
			 {   
			     //alert(args[j][off]);
			     if(args[j]!=null&&args[j][off]!=null&&!isNaN(args[j][off]))
				 {
				    	limits[0]=Math.min(limits[0],args[j][off]);
						limits[1]=Math.max(limits[1],args[j][off]);
				 }
			 }
		 }
		 
		 if(isNaN(limits[0]))
				limits[0]=0;
		 if(isNaN(limits[1]))
				limits[1]=0;
		 if(limits[0]>limits[1])
				limits=[0,0];
				
		 return limits;
	 }
	 
	 function MA(datas,p)
	 {
	     var outdatas=[];
		 for (var i = 0; i < datas.length; i++) {
		         if (i > p) {
                    var sum = 0;
                    for (var j = 0; j < p; j++) {
                        sum +=parseFloat(datas[i - j]);
                    }
                    outdatas[i] = sum / p;
					
                }
		 }
		  return outdatas;
	 }
	 function EMA(datas,p)
	 {
	      var outdatas=[];
		  
		  var k1,k2;
		  k1 = 2 / (p + 1);
          k2 = 1 - k1;
		  outdatas[0] = datas[0];
		  for (var i = 1; i < datas.length; i++) {
            outdatas[i] = k1 * datas[i] + k2 * outdatas[i - 1];
        }
		
        return outdatas;
	 }
	 function LLV(datas,p)
	 {
	      var outdatas=[];
		  var size = datas.length;
		  var min;
		  for (var i = 0; i < datas.length; i++) {
		      if (i > p) {
                min = 99999999;
                for (var j = 0; j < p; j++) {
                    min = Math.min(min, datas[i - j]);
                }
                outdatas[i] = min;
            }
		  }
		  return outdatas;
	 }
	 function HHV(datas,p)
	 {
	      var outdatas=[];
		  var size = datas.length;
		  var max;
		  for (var i = 0; i < datas.length; i++) {
		      if (i > p) {
                max = -99999999;
                for (var j = 0; j < p; j++) {
                    max = Math.max(max, datas[i - j]);
                }
                outdatas[i] = max;
            }
		  }
		  return outdatas;
	 }
	 function SMA(datas,p1,p2)
	 { 
	      
	      var outdatas=[];
		  outdatas[0] = datas[0];
		  for (var i = 1; i < datas.length; i++) {
		    if(outdatas[i - 1]!=null)
			{
              outdatas[i] = (p2 * datas[i] + (p1 - p2) * outdatas[i - 1]) / p1;
			}
			else
			{
			   outdatas[i]=datas[i];
			}
          }
		 
        return outdatas;
	 }
	 function REF(datas,p)
	 {
	       var outdatas=[];
		  for (var i = 0; i < datas.length; i++) {
            if (i >= p) {
                outdatas[i] = datas[i - p];
            } else {
                outdatas[i] = datas[i];
            }
          }
        return outdatas;
	 }
	 function STD(datas,p)
	 {
	      var outdatas=[];
		  var datas_ma=MA(datas,p);
		  var size=datas.length;
		  for (var i = 0; i <size; i++) {
		      if (i > p&&datas_ma[i]!=null) {
                var sum = 0;
                var count = 0;
                for (var j = 0; j < p; j++) {
				    
                    count++;;
                    sum += Math.pow((datas[i - j] - datas_ma[i]), 2);
                }
                outdatas[i] = Math.sqrt(sum / (count - 1));
              }
		  }
		  return outdatas;
	 }
	 
	 function AVEDEV(datas,p)
	 {
	       var outdatas=[];
		   var size=datas.length;
		   for (var i= 0; i < size; i++) {
		        if (i > p) {
                var avg = 0;
                for (var j = 0; j < p; j++) {
                    avg += datas[i - (p - j)];
                }
                avg /= p;
                var total = 0;
                for (var j = 0; j < p; j++) {
				    
                    total += Math.abs(datas[i - (p - j)] - avg);
                }
                outdatas[i] = total / p;
				
				if(i==222)
			 {
			 //alert(total+"||"+p);
			  
			 }
				
				if(isNaN(outdatas[i]))
				{
				  outdatas[i]=0;
				}
               }
		   }
		   
		   return outdatas;
	 }
	
	 