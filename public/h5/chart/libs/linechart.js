     var hQueue=[];
     var canvasDivId,canvasId;
	 var limits=[999999,0];
	 var canvas;
	 var ctx;
	 var _width=0,_height=0;
	 var _top=25,_bottom=5,_left=38,_right=10,_scalex;
	 var _timeH=25,_priceH=0;
	 var columnNum=3;
	 var rowNum=3;
	 var start=0;defaultNum=60,end=0;
	 var date=[],value=[];
	 var drag=false;
	 var xx=0,yy=0;
	 var canvas1=null;
	 var hLine,vLine,tip,tCursor,pCursor,loadingDiv,pyFields=[],iyFields=[],timeFields=[],kInfoFields=[],kTipFields=[];
	 var canvasRect;
	 var vIndex=-1;
	 var period="100",hPeriod="100";
	 var symbol="300150",name="";
	 var decimal=2;
	 var tx1=0,ty1=0,tx2=0,ty2=0,hMouseX=0,hMouseY=0;
	 var logoImg,logoDiv;
	 var httpServer="http://115.29.77.191:80";
	 
	 window.onload= function(){
	    drawKline('chartDiv','chart');
	 }
	 
	 window.onkeydown=function(event){
	      var keyCode=event.keyCode;
		  if(event.ctrlKey==true) 
		  { 
			return;
		  }
		  if(keyCode==39)
		  {
		     vIndex++;
			 var num=end-start;
			 if(vIndex>=num)
			 {
			   start++;
			   end++;
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   if((start+num)>(size))
			   {
					start=size-defaultNum;
					end=size;
			   }
			   paintComponent();
			 }
			 
			 if(vIndex>=num)
			 {
			   vIndex=num-1;
			 }
			 
			 createMoveLine(hMouseX,hMouseY);
			 createTip(hMouseX,hMouseY);
			 createTCursor(hMouseX,hMouseY);
			 createPCursor(hMouseX,hMouseY);
		  }
		  else if(keyCode==37)
		  {
		     vIndex--;
			 if(vIndex<0&&start>0)
			 {
			   start--;
			   end--;
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   var num=end-start;
			   if((start+num)>(size))
			   {
					start=size-defaultNum;
					end=size;
			   }
			   
			   paintComponent();
			 }
			 
			 if(vIndex<0)
			 { 
			   vIndex=0;
			 }
			 createMoveLine(hMouseX,hMouseY);
			 createTip(hMouseX,hMouseY);
			 createTCursor(hMouseX,hMouseY);
			 createPCursor(hMouseX,hMouseY);
		  }
		  else if(keyCode==40)
		  {
		      var num=end-start;
		      var extent=num+20;
			   
			   start-=20;
			   
			   var size=date.length;
			   if(extent>=size)
			   {
			     extent=size;
			   }
			   if (start <= 0) {
					start = 0;
			   } 
			   
			   if((start+extent)>(size))
			   {
					start=size-extent;
					end=size;
			   }
			   if(start<0)
			   {
				start=0;
				end=size;
			   }
			   if(vIndex<0)
			   { 
				   vIndex=0;
			   }
			   if(vIndex>=extent)
			   { 
				   vIndex=extent-1;
			   }
			   
			   vIndex=-1;
			   hideCursor();
			   paintComponent();
			   
			   
			   /*
			   createMoveLine(hMouseX,hMouseY);
			   createTip(hMouseX,hMouseY);
			   createTCursor(hMouseX,hMouseY);
			   createPCursor(hMouseX,hMouseY);
			   */
			 
		  }
		  else if(keyCode==38)
		  {
		     var num=end-start;
		     var extent=num-20;
			 
			 if(extent>20)
			 {
			   start+=20;
			   if(extent>=size)
			   {
			     extent=size;
			   }
			   var size=date.length;
			   if (start <= 0) {
					start = 0;
			   } 
			   if((start+extent)>(size))
			   {
					start=size-extent;
					end=size;
			   }
			   if(start<0)
			   {
				start=0;
				end=size;
			   }
			   if(vIndex<0)
			   { 
				   vIndex=0;
			   }
			   if(vIndex>=extent)
			   { 
				   vIndex=extent-1;
			   }
			   //_scalex=(_width - _right - _left) / defaultNum;
			   //alert(vIndex);
			   vIndex=-1;
			   hideCursor();
			   paintComponent();
			   /*
			   createMoveLine(hMouseX,hMouseY);
			   createTip(hMouseX,hMouseY);
			   createTCursor(hMouseX,hMouseY);
			   createPCursor(hMouseX,hMouseY);
			   */
			 }
			
		  }
		  event.returnValue = false;
		  //return 0;
	      alert(e.keyCode);
		  
	 }
	 
	 window.onresize = function(){
         if(canvas)
		 {
		   //canvas.width=document.body.clientWidth-5;
		   //canvas.height=document.body.clientHeight-5;
		    canvas.width=document.documentElement.clientWidth-5;
		    canvas.height=document.documentElement.clientHeight-5;
			_width=canvas.width;
		    _height=canvas.height;
			/*
			if(_width<_height)
			{
			    defaultNum=100;
				columnNum=3;
			}
			else
			{  
			     defaultNum=60;
				 columnNum=4;
			}
			defaultNum=150;
			*/
			//updateRange();
			paintComponent();
		 }
    }

	 function setDebugMsg(msg)
	 {
	       var debug=document.getElementById('debug');
		   debug.style.height = '200px';
           debug.style.width = '200px';
           debug.style.left =canvasRect.left+canvasRect.width+'px';
           debug.style.top = '1px';
		   debug.innerHTML=msg;
	 }
	 function reset()
	 {
	     	//ctx.clearRect(0,0,_width,_height);
			//ctx.save();
			//date=[];
			//time=[];
			//open=[];
			//high=[];
			//low=[];
			//close=[];
			//volume=[];
			//value=[];
			vIndex=-1;
			
	 }
	 function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
      }
	 
     function drawKline(canvasDivId,canvasId)
	 {
	     this.canvasDivId=canvasDivId;
		 this.canvasId=canvasId;
		 this.symbol=GetQueryString("symbol");
		 if(symbol==null||symbol=="")
		 {
		    symbol="300150";
		 }
		 this.decimal=GetQueryString("decimal");
		 if(decimal==null||decimal=="")
		 {
		    decimal=2;
		 }
		 
	     canvas=document.getElementById(this.canvasId);
		 canvas.width=document.documentElement.clientWidth;
		 canvas.height=document.documentElement.clientHeight;
		 var browser_Agent=navigator.userAgent;
		
		 this.addEventListener("mousedown",doMouseDown,false);
		 this.addEventListener('mouseup',  doMouseUp, false);
		 this.addEventListener('mousemove', doMouseMove,false);
		 this.addEventListener('click', doMouseClick,false);
		 canvas.addEventListener('mouseout', doMouseOut,false);
		 this.addEventListener('touchstart', onTouchStart, false);
         this.addEventListener('touchmove', onTouchMove, false);
         this.addEventListener('touchend', onTouchEnd, false);
		 //alert(document.documentElement.clientHeight);
		 canvasRect=canvas.getBoundingClientRect();
		 ctx=canvas.getContext("2d"); 
		 _width=canvas.width;
		 _height=canvas.height;
		 
		 defaultNum=30;
		 columnNum=2;
			
			
		 createLoadingDiv();
		 
		 	$.ajax({
             type: "get",
             async: false,
             //url: "http://115.29.77.191/HZStockWebServer/LineResource1",
             url: 'http://120.25.123.226:9000/ycf/trend/k_win?mid=1&sid='+ symbol +'&kType='+ period +'&len=60',
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onLineRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 //alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
		 
		 setInterval("onTimer()",1000*8);
		 
		 if(hLine==null)
		   {
		       hLine = document.createElement('DIV');
			   document.body.appendChild(hLine);
			   hLine.zIndex="998"; 
		   }
		   if(vLine==null)
		   {
		       vLine = document.createElement('DIV');
			   document.body.appendChild(vLine);
			   vLine.zIndex="998"; 
		   }
	 }
	 function onLineRecvData(client)
	 {
	      dispalyLoadingDiv();
		  
		  var rs=client.data;
		  //alert(rs.length);
		  name=client.n;
		  //alert(name);
		  
		  var klineQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i];
			 
			  var item = {
                date: ""+cts.d,
                value: parseFloat(cts.v)
               };
			  
			  klineQueue[i]=item;
		  }

		       hQueue=klineQueue;
			   initKlineData();
			   resetRange();
		 
		  
		  vIndex=defaultNum-1;
		  if(vIndex>=date.length)
		  {
		    vIndex=(date.length-1);
		  }
		  _scalex=(_width - _right - _left) / defaultNum;
		  
		  
		  if(drag==false)
		  paintComponent();
	 }
	 
	 function onKLineUpdRecvData(client)
	 {
	      dispalyLoadingDiv();
	      var xmlDoc = client.responseXML;
		  var strResult = unescape(client.responseText);
		  //alert(strResult);
		  var rs=strResult.split("\n");
		  //alert(rs.length);
		  name=rs[1];
		  if(rs.length>=2)
				rs=rs.slice(2,rs.length);
	      //alert(rs.length);
		  var klineQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i].split(",");
			  if(cts.length<5)
			  continue;
			  //alert(cts.length);
			  var item = {
                date: cts[0],
				time:cts[1],
                open: parseFloat(cts[2]),
                high: parseFloat(cts[3]),
                low: parseFloat(cts[4]),
                close: parseFloat(cts[5]),
                volume: parseFloat(cts[6]),
                value: parseFloat(cts[7])
               };
			  klineQueue[i]=item;
		  }
		 
		  
		  
		  if(hPeriod==period)
		  {
		     if(hQueue.length==0)
			 {
			   hQueue=klineQueue;
			   initKlineData();
			   resetRange();
			 }
		     else if((end==hQueue.length)||(end==hQueue.length-1))
			 {
			   //alert('1');
			   hQueue=klineQueue;
			   initKlineData();
			   //resetRange();
			   var size=date.length;
			   end=size;
			 }
			 else
			 {
			    //alert('2');
			    var num=klineQueue.length-hQueue.length;
				if(num<=0)
				num=0;
				//alert(start+"||"+end);
				start+=num;
				end+=num;
                
				//alert(start+"||"+end);
				
			    hQueue=klineQueue;
				var size=hQueue.length;
				if((start+defaultNum)>(size))
				 {
				    start=size-defaultNum;
					end=size;
				 }
				 if(start<0)
				{  
				   
				   start=0;
				   end=defaultNum;
				 }
				initKlineData();
			 }
		     
			 
		  }
		  else
		  {
		       
		       hQueue=klineQueue;
			   initKlineData();
			   resetRange();
		  }
		  
		  hPeriod=period;
		  
		  //vIndex=defaultNum-1;
		  if(vIndex>=time.length)
		  {
		    vIndex=(time.length-1);
		  }
		  _scalex=(_width - _right - _left) / defaultNum;
		  if(drag==false)
		  paintComponent();
	 }
	 
	 function initKlineData()
	 {
	 		date=[];
			value=[];
	      var klineData;
	      for(var i=0;i<hQueue.length;i++)
		  {
		      klineData=hQueue[i];
		      date[i]=klineData.date;
			  value[i]=klineData.value;
		  }
		  
	 }
	 
	 function onTimer()
	 {
			 //Ajax.get(httpServer+"/FreeHQWebServer/KLineResource1?symbol="+symbol+"&num=300&period="+period+"&r="+Math.random(),onKLineUpdRecvData,canvasId,false);
			$.ajax({
             type: "get",
             async: false,
             //url: "http://120.25.123.226:9000/ycf/trend/k_line1?mid=1&stkCode="+symbol+"&kType="+period+"&len=200",
             url: 'http://120.25.123.226:9000/ycf/trend/k_win?mid=1&sid='+ symbol +'&kType='+ period +'&len=60',
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onLineRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 //alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
	 }
	 	 
	 function createLoadingDiv()
	 {
	       
		   if(loadingDiv==null)
		   {
		       loadingDiv = document.createElement('DIV');
			   document.body.appendChild(loadingDiv);
		   }
		  
		   loadingDiv.style.display = 'block';
           loadingDiv.style.position = 'absolute';
           loadingDiv.style.height = '36px';
           loadingDiv.style.width = '36px';
		   
		   var xx=canvasRect.left+_width/2-36/2;
		    
           loadingDiv.style.left =xx+'px';
           loadingDiv.style.top = canvasRect.top+_height/2+'px';
           //loadingDiv.style.background = cursorLineColor;
		   var innerHtml='<img src=\"img/loading.gif\"/>';
		   loadingDiv.innerHTML=innerHtml;
		  
	 }
	 
	 function dispalyLoadingDiv()
	 {
	         if(loadingDiv!=null)
			 {
			   loadingDiv.style.display = 'none';
			 }
	 }
	 
	 function doMouseDown(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseDown"+x+","+y);
		  var point=getPointOnCanvas(canvas,x,y);
		  //alert("doMouseDown"+x+","+y+"||"+"x"+point.x+","+point.y);
		  if(date.length<=0)
		   return;
		  if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		  drag=true;
		  xx=x;
		  yy=y;

		  }
	 }
	 function doMouseUp(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseUp");
		  //var point=getPointOnCanvas(canvas,x,y);
		  drag=false;
		  xx=0;
		  yy=0;
		  var chartDiv=document.getElementById(canvasDivId);
		  chartDiv.style.cursor='';
	 }
	 function doMouseOut(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseOut");
		  //var point=getPointOnCanvas(canvas,x,y);
		  drag=false;
		  xx=0;
		  yy=0;
	 }
	 function doMouseClick(event)
	 {
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseOut");
          
		  var point=getPointOnCanvas(canvas,x,y);
		  //point.x=x;
		  //point.y=y;
	      if(point.x>_left&&point.x<(_width-_right)&&point.y>(_top+_priceH+_timeH+canvas.offsetTop)&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		     //alert("2");
		     //indType="CCI";
			 var indCodes=["VOLUME","MACD","BOLL","KDJ","RSI","CCI"];
			 var idx=indCodes.indexOf(indType);
			 if(idx>=0)
			 {
			     idx++;
				 if(idx>=indCodes.length)
				 {
				    idx=0;
				 }
				 indType=indCodes[idx];
			 }
			 paintComponent();
		  }
	 }
	 
	 
	 function doMouseMove(event)
	 {
	      //event.preventDefault();
	      if(date.length<=0)
		   return;
	      var x = event.pageX;  
          var y = event.pageY;  
	      //alert("doMouseMove");
		  var point=getPointOnCanvas(canvas,x,y);
		  //alert(x+","+y+","+point.x+","+point.y);
		  //point.x=x;
		  //point.y=y;
		  if(drag)
		  { 
		     if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+_priceH+_timeH+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
			 {
			 var chartDiv=document.getElementById(canvasDivId);
		     chartDiv.style.cursor='w-resize';//cursor:w-resize;
		     hideCursor();
		     var size=date.length;
		     if(xx!=0)
			 {
			    if((x-xx)>1)
				{
				  start--;
				  end--;
				}
				if((x-xx)<1)
				{
				  start++;
				  end++;
				}
				 var num=end-start;
				 if((start+num)>(size))
				 {
				    start=size-num;
					end=size;
				 }
				 if(start<0)
				{
				   start=0;
				 }
				 //alert(start);
				 paintComponent();
				 xx=x;
				 yy=y;
				 }
			 }
		     return;
		  }
		  else
		  {
		  
		   if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
		   {
		    
		     vIndex=parseInt((x-canvasRect.left-_left)/_scalex);
			 if((vIndex+start)<this.date.length)
			 {
			 hMouseX=x;
			 hMouseY=y;
		     createMoveLine(x,y);
			 createTip(x,y);
			 createTCursor(x,y);
			 createPCursor(x,y);
			 }
			 else
			 {
			   hideCursor();
			  }
		   }
		   else
		   {
		      hideCursor();
		   }
		  }
	 }
	 

	 function createTip(x,y)
	 {      
	       var xx;
		   var yy=canvas.offsetTop+_top+15;
		   //alert(canvasRect.top);
		   var h=46,w=105;
		   if((canvasRect.left+ _left+vIndex*_scalex+_scalex/2)>(canvasRect.left+_left+(_width-_right-_left)/2))
		   {
		       xx=canvasRect.left+ _left+vIndex*_scalex+_scalex/2-(w+15);
			   xx=canvasRect.left+_left+15;
		   }
		   else
		   {
		       xx=canvasRect.left+ _left+vIndex*_scalex+_scalex/2+15;
			   xx=_width-_right-15-w;
		   }
	       if(tip==null)
		   {
		       tip = document.createElement('DIV');
			   document.body.appendChild(tip);
			   tip.style.position = 'absolute';
			   tip.style.background = '#ffffff';
			   tip.style.border='solid 1px #bbbbbb';
			   tip.style.filter='alpha(Opacity=100)';
			   tip.style.opacity='1';
			   tip.style.zIndex="999";  
			   tip.style.overflow='hidden';
			   tip.style.wordBreak='keep-all';
			   tip.style.whiteSpace='nowrap';
			   tip.style.height = h+'px';
			   tip.style.width = w+'px';
			   tip.style.top = yy+'px';
		   }
		   
           tip.style.display = 'block';
           tip.style.left =xx+'px';
           
		   var off=vIndex+start;
		   
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   var dStr=formatDate(this.date[off]);
		   var values=[];
		   values[0]=dStr;
		  
		   values[1]=formatNumber(this.value[off],decimal);
		  
		   
		   var colors=[];
		   colors[0]=lableColor;
		   colors[1]=lableColor;
		   
		   
		   var names=["日期:","值:"];
		   
		   var field;
		   var h=18;
		   var w=60;
		   //alert(canvas.offsetTop);
		   var top=0;
		   var left=5;
		  
		   for(var i=0;i<values.length;i++)
		   {
		      field=kTipFields[i];
			  if(field==null)
			  {
			     	field= document.createElement('DIV');
					tip.appendChild(field);
					kTipFields[i]=field;
					field.style.display = 'block';
					field.style.position = 'absolute';
					field.style.height = h+'px';
					field.style.background = '#ffffff';
					field.style.border='solid 1px #ffffff';
					field.style.filter='alpha(Opacity=100)';
					field.style.opacity='1';
					field.style.top = top+'px'; 
					field.style.left =left+'px';
			  }
			   var metrics = ctx.measureText(names[i]+values[i]);
		       var textWidth = metrics.width+5;
				field.style.width = textWidth+'px';
				var innerHtml='<div  class=\'kline_toptip\' >'+names[i]+'<font color=\"'+colors[i]+'\">'+values[i]+'</font></div>';
				field.innerHTML=innerHtml;
				
				top+=18;
		   }
			
		   
		   
	 }

	 function createMoveLine(x,y)
	 {
	       	if(hLine==null)
		   {
		       hLine = document.createElement('DIV');
			   document.body.appendChild(hLine);
		   }
		   hLine.style.zIndex="999"; 
		   hLine.style.display = 'block';
           hLine.style.position = 'absolute';
           hLine.style.height = (_height-_top-_bottom-_timeH)+'px';
           hLine.style.width = '1px';
           hLine.style.left =canvasRect.left+ _left+vIndex*_scalex+_scalex/2+'px';
           hLine.style.top = canvas.offsetTop+_top+1+'px';
           hLine.style.background = cursorLineColor;
		   
		   if(vLine==null)
		   {
		       vLine = document.createElement('DIV');
			   document.body.appendChild(vLine);
		   }
		   vLine.style.zIndex="999"; 
		   vLine.style.display = 'block';
           vLine.style.position = 'absolute';
           vLine.style.height = '1px';
           vLine.style.width = _width-_left-_right+'px';
           vLine.style.left = canvasRect.left+_left+1+'px';
           vLine.style.top = y+'px';
           vLine.style.background = cursorLineColor;
	 }
	 
	 function createTCursor(x,y)
	 {
	       if(true)
		   return;
		   var dStr=formatDate(date[vIndex+start]);
			  
		   var metrics = ctx.measureText(dStr);
		   var textWidth = metrics.width;
		   if(tCursor==null)
		   {
		       tCursor = document.createElement('DIV');
			   document.body.appendChild(tCursor);
			   tCursor.style.zIndex="999"; 
			   tCursor.style.display = 'block';
			   tCursor.style.position = 'absolute';
			   tCursor.style.height = _timeH+'px';
			   tCursor.style.top =canvas.offsetTop+_top+_priceH+'px';
               tCursor.style.background = cursorLineColor;
		   }

           tCursor.style.width = textWidth+5+'px';
		   var xx=(canvasRect.left+ _left+vIndex*_scalex+_scalex/2-(textWidth+5)/2);
		   if((xx+textWidth)>(_width-_right))
		   {
		      xx=canvasRect.left+_width-_right-(textWidth+5)+1;
		   }
		   else if(xx<_left)
		   {
		       xx=canvasRect.left+_left;
		   }
		   //alert(canvasRect.top+","+canvas.offsetTop+","+canvas.getBoundingClientRect().top);
           tCursor.style.left =xx+'px';

		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+dStr+'</font></div>';
		   tCursor.innerHTML=innerHtml;
	 }
	 
	 function createPCursor(x,y)
	 {
	 	   if(true)
		   return;
	       if(y>canvasRect.top+_top+_priceH)
		   {
		      if(pCursor!=null)
			  {
			     pCursor.style.display = 'none';
			  }
			  return ;
		   }
	       var py =pLimits[1]-(y-canvasRect.top-_top-1)*(pLimits[1]-pLimits[0])/_priceH;
	       var priceStr=formatNumber(py,decimal);
		   var metrics = ctx.measureText(priceStr);
		   
		   var textWidth = metrics.width;
		   if(pCursor==null)
		   {
		       pCursor = document.createElement('DIV');
			   document.body.appendChild(pCursor);
			   pCursor.style.display = 'block';
			   pCursor.style.position = 'absolute';
			   pCursor.style.height = '20px';
			   pCursor.style.width =_left-2+'px';
			   pCursor.style.left =(2)+'px';
			   pCursor.style.background = cursorLineColor;
		   }
           pCursor.style.top = (y-9)+'px';
           
		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+priceStr+'</font></div>';
		   pCursor.innerHTML=innerHtml;
	 }
	 
	 
	 
	 function hideCursor()
	 {
	       
	       if(hLine!=null)
		   {
		       hLine.style.display = 'none';
		   }
		   if(vLine!=null)
		   {
		       vLine.style.display = 'none';
		   }
		   if(tip!=null)
		   {
		       tip.style.display = 'none';
		   }
		   if(pCursor!=null)
		   {
		       pCursor.style.display = 'none';
		   }
		   if(tCursor!=null)
		   {
		       tCursor.style.display = 'none';
		   }
		   
		   
	 }
	 
	 function onTouchStart(event)
	 {
	     //alert("onTouchStart");
		  //event.preventDefault(); 
		  var x = event.touches[0].pageX;;  
          var y = event.touches[0].pageY;  
	      //alert("onTouchStart"+x+","+y);
		  drag=true;
		  xx=x;
		  yy=y;
	 }
	 function onTouchMove(event)
	 {
	      //event.preventDefault();
		  var eventType=event.touches.length;
		  //alert(eventType);
		  var size=date.length;
		  if(eventType==1)
		  {
		     var x = event.touches[0].pageX;  
             var y = event.touches[0].pageY; 
		  	 var point=getPointOnCanvas(canvas,x,y);
			 point.x=x;
		     point.y=y;
             if(point.x>_left&&point.x<(_width-_right)&&point.y+canvas.offsetTop>_top+_priceH+_timeH&&point.y<(_height-_bottom+canvas.offsetTop))
		  {
		      		  
		      
		   	   if((x-xx)>0.3)
				{
				  start-=1;
				  end-=1;
				}
				
				if((x-xx)<0.3)
				{
				  start+=1;
				  end+=1;
				}
				var num=end-start;
				//alert(start+"||"+end);
				 if((start+num)>(size))
				 {
				    start=size-num;
					end=size;
				 }
				 if(start<0)
				{
				   
				   start=0;
				   //end=defaultNum;
				 }
				 xx=x;
		         yy=y;
				 paintComponent();
		  }
		  else
		  {
	 		if(point.x>_left&&point.x<(_width-_right)&&point.y+canvas.offsetTop>_top&&point.y<(_height-_bottom+canvas.offsetTop))
		   {
		    
		      vIndex=parseInt((x-canvasRect.left-_left)/_scalex);
			 if((vIndex+start)<this.date.length)
			 {
		     createMoveLine(x,y);
			 createTip(x,y);
			 createTCursor(x,y);
			 createPCursor(x,y);
			 }
			 else
			 {
			   hideCursor();
			  }
		   }
		   else
		   {
		      hideCursor();
		   }
		  }
		  }
		  else{
		    
		    var x1 = event.touches[0].pageX;  
            var y1 = event.touches[0].pageY; 
			var x2 = event.touches[1].pageX;  
            var y2 = event.touches[1].pageY; 
			
			//alert("x1:"+x1+"y1:"+y1+"x2:"+x2+"y2:"+y2);
			if(tx1!=0&&ty1!=0&&tx2!=0&&ty2!=0)
			{
			      if((x1-tx1)<0&&(x2-tx2)>0)
				  {
				     defaultNum+=5;
					 if(defaultNum>=200)
					 {
					   defaultNum=200;
					 }
					 if(defaultNum<=25)
					 {
					   defaultNum=25;
					 }
					 var size=date.length;
					 end = size;
					 start = end - defaultNum;
					 if (start <= 0) {
						start = 0;
					 } 
					 if((start+defaultNum)>(size))
					 {
						start=size-defaultNum;
						end=size;
					 }
					 if(start<0)
					{
					   
					   start=0;
					   end=defaultNum;
					 }
					 paintComponent();
					 tx1=0;
					 ty1=0;
					 tx2=0;
					 ty2=0;
					 return;
				  }
				  if((x1-tx1)>0&&(x2-tx2)<0)
				  {
				     defaultNum-=5;
					 if(defaultNum>=200)
					 {
					   defaultNum=200;
					 }
					 if(defaultNum<=25)
					 {
					   defaultNum=25;
					 }
					 var size=date.length;
					 end = size;
					 start = end - defaultNum;
					 if (start <= 0) {
						start = 0;
					 }
					 if((start+defaultNum)>(size))
					 {
						start=size-defaultNum;
						end=size;
					 }
					 if(start<0)
					{
					   
					   start=0;
					   end=defaultNum;
					 }
					 paintComponent();
					 tx1=0;
					 ty1=0;
					 tx2=0;
					 ty2=0;
					 return;
				  }
			}
			
			tx1=x1;
			ty1=y1;
			tx2=x2;
			ty2=y2;
			
		  }
		  
	 }
	 function onTouchEnd(event)
	 {
	     //alert("onTouchEnd");
	 }
	 
	function getPointOnCanvas(canvas, x, y) {  
       var bbox = canvas.getBoundingClientRect();  
	    return { x: x,  
            y: y  
            };  
	   /*
       return { x: x - bbox.left * (canvas.width  / bbox.width),  
            y: y - bbox.top  * (canvas.height / bbox.height)  
            };  
	   */
     } 
	 
	 
	 
	 function paintComponent()
	 {
	       //setDebugMsg('7788');
	       drawBasic(); 
		   //drawLogo(); 
		   drawChart();
		   if(vIndex>=0&&drag==false)
		   {
		       //alert(vIndex);
		   }
	 }
	 
	 
	 function drawBasic()
	 {
	        _priceH=(_height-_top-_bottom-_timeH)*10/10;
			
			_scalex=(_width - _right - _left) / (end-start);
			//alert('1');
			
			
			//(_priceH+"||_volumeH:"+_volumeH);
	        ctx.clearRect(0,0,_width,_height);
			ctx.save();
			
		   ctx.lineWidth=1;
		   ctx.strokeStyle=boderColor; 
		   ctx.rect(convertXY(_left),convertXY(_top),parseInt(_width-_left-_right),parseInt(_priceH)); 
		   ctx.stroke();

		   
		   var top=_top;
		   var avgH=_priceH/rowNum;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<rowNum-1;i++)
		   {
		       top+=avgH;
		       ctx.moveTo(convertXY(_left),convertXY(top));
			   ctx.lineTo(convertXY(_width-_right),convertXY(top));
		   }           	   
           ctx.stroke();  
		   
  
		   
		   var left=_left;
		   var avgW=(_width-_right-_left)/columnNum;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<columnNum-1;i++)
		   {
		       left+=avgW;
		       ctx.moveTo(convertXY(left),convertXY(_top));
			   ctx.lineTo(convertXY(left),convertXY(_top+_priceH));
			   
		   }           	   
           ctx.stroke();  
		   
	 }
	 function drawLogo()
	 {
	        ctx.fontSize=12;
			ctx.font="宋体";
	        var value="联系QQ:350952803";
	      	var metrics = ctx.measureText(value);
		    var textWidth = metrics.width+20;
			textWidth=115;
			if(logoDiv==null)
			{
			   logoDiv = document.createElement('DIV');
			   document.body.appendChild(logoDiv);
			}
			var h=25; 
			var left=_width-_right-textWidth-5+canvas.offsetLeft;
			var top=_top+_priceH-30+canvas.offsetTop;
			logoDiv.style.display = 'block';
			logoDiv.style.position = 'absolute';
			logoDiv.style.height = h+'px';
			logoDiv.style.width = textWidth+'px';
			logoDiv.style.left =left+'px';
			logoDiv.style.top = top+'px'; 
			//logoDiv.style.background = '#ffffff';
			//logoDiv.style.border='solid 1px #ffffff';
			logoDiv.style.filter='alpha(Opacity=100)';
			logoDiv.style.opacity='1';
			var innerHtml='<div  class=\'kline_toptip\' ><font color=\"0x333\">'+value+'</font></div>';
			logoDiv.innerHTML=innerHtml;
	 }
	 
	 
	 function convertXY(xy)
	 {
	      var temp=parseInt(xy);
		  temp+=0.5;
		  return temp;
	 }
	 
	 function updateRange()
	 {
	    var size=date.length;
		start = end-defaultNum;
        if (start <= 0) {
            start = 0;
        }
		if(end>size&&size>defaultNum)
		{
		   //end=size-1;
		}
	 }
	 
	 function resetRange()
	 {
	    var size=date.length;
		end = size;
		start = 0;
        if (start <= 0) {
            start = 0;
        }
	 }
	 
	 
	 function drawChart()
	 {
	    
		if(date.length<=0)
		   return;
		
        drawLine();
		drawXAxisDate();
		
		
	 }

	 function drawLine()
	 {
	 
		 
	     var size=date.length;
		 pLimits=calLimit(start,end,[value]);
		
	     var change=pLimits[1]-pLimits[0];
		 if(change==0)
		 {
		   pLimits[0]-=(pLimits[0])/15;
		   pLimits[1]+=(pLimits[0])/15;
		 }
		 else{
		   pLimits[0]-=(change)/15;
		   pLimits[1]+=(change)/15;
		  }
		 drawPriceYAxis(pLimits, decimal);
	      
		  
		   var top=_top;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0,x4=0,y4=0;
		   var off=0;
		   for(var i=0;i<(end - start);i++)
		   {
		     off = start + i;
            if (off >= size) {
                continue;
            }
			//alert(ma5[off]);
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (pLimits[1] - value[off]) / (pLimits[1] - pLimits[0]) * _priceH);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineYAxisPriceColor;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 
				  //alert(x1+","+y1+","+x+","+y);				  
			}
			x1=x;
			y1=y;
		   }
		   
	 }

	 function drawXAxisDate()
	 {
	     
	      var top = _top + _priceH+canvas.offsetTop+1;
		  var size = date.length;
		  
		  var str = "";
		  var off=0;
		  var num=(end-start);
		  var cnum = num /columnNum;
		  var x;
		  var field;
		  var h=18;
		  var w=60;
          ctx.font="12px Arial";
		  ctx.textAlign = "left";
		  var count=0;
		  
		  //alert(columnNum);
		  
		  for (var i = 0; i <num; i++) {
		       off = start + i;
				if (off >= size) {
					continue;
				}
			    var flag = false;
				
				if (i == 0 || (i == (num - 1) && size >= defaultNum)) {
                flag = true;
                }
				for (var j = 0; j < cnum; j++) {
				
                if (parseInt(j * (cnum)) == i) {
                    flag = true;
                    break;
                }
				 }
				 
				if (flag==true) {
				   var dStr="";
				   if(period=="100"||period=="200"||period=="300"||period=="400")
				   {
				      
				       dStr=formatDate(date[off]);
				   }
				   else
				   {
				      dStr=formatmmdd(date[off])+" "+formatHHmm(completeByBefore(time[off],4,'0'));
				   }
				   	
		            var metrics = ctx.measureText(dStr);
		            var textWidth = metrics.width+5;
				   x = _left + (_scalex * i)+_scalex/2-textWidth/2-1;
				   if ((x+textWidth ) >= _width) {
                    x = canvasRect.left+_width-textWidth;
                   } else if (x < 0) {
                    x = 0;
                   }
				   x+=canvas.offsetLeft;
				   field=timeFields[count];
				  if(field==null)
				  {
					field= document.createElement('DIV');
					document.body.appendChild(field);
					timeFields[count]=field;
					
				    field.style.position = 'absolute';
				    field.style.height = h+'px';
				    field.style.background = '#ffffff';
				    field.style.border='solid 1px #ffffff';
				    field.style.filter='alpha(Opacity=100)';
				    field.style.opacity='1';
				  }
				field.style.display = 'block';
				field.style.top = top+'px'; 
				field.style.width = textWidth+'px';
				field.style.left =x+'px';

				var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
				field.innerHTML=innerHtml;
				   
				   count++;
				   
				 }
           
		  }
		  
		  //alert(count);
		 
	 }
	 
	 function drawPriceYAxis(limits,decimal)
	 {    
	      var num = rowNum;
		  var change = limits[1] - limits[0];
		  var left=0;
		  var top=_top+canvas.offsetTop;
		  var x=canvas.offsetLeft,y;
		  var field;
		  var h=20;
		  var w=_left-2;
		  //alert(pyFields.length);
		  for (var i = 0; i < num + 1; i++) {
		     var value = limits[1] - i * change / num;
			 field=pyFields[i];
			 if(field==null)
			 {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				pyFields[i]=field;
				field.style.display = 'block';
                field.style.position = 'absolute';
				field.style.background = '#ffffff';
				field.style.border='solid 1px #ffffff';
				field.style.filter='alpha(Opacity=100)';
				field.style.opacity='1';
				field.style.height = h+'px';
                field.style.width = w+'px';
                field.style.left =x+'px';
			 }
			 
			 y=top;
			 if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-20;
			  else
			    y=top-10;
				
            field.style.top = y+'px';
			//field.style.z-index='0';
			var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"#'+klineYAxisPriceColor+'\">'+formatNumber(value,decimal)+'</font></div>';
		    field.innerHTML=innerHtml;
			top+=_priceH/rowNum;
		  }

	 }

	 function getColor(price1,price2)
	 {
	        var color="#000000";
	        if(price1>price2)
			   color="red";
			else if(price1<price2)
			   color="green";
			
			return color;
	 }
