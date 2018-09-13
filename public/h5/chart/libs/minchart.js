     var canvasDivId,canvasId;
     var minQueue=[],pClose;
	 var limits=[999999,0],vLimits=[];
	 var canvas;
	 var ctx;
	 var _width=0,_height=0;
	 var _top=25,_bottom=10,_left=50,_right=10,_scalex;
	 var _timeH=20,_priceH=0,_volumeH=0;
	 var columnNum=4;
	 var rowNum=4;
	 var time=[],close=[],avg=[],volume=[],value=[];
	 var dif=[],dea=[],macd=[];
	 var drag=false;
	 var xx=0,yy=0;
	 var indType="VOLUME";
	 var hLine,vLine,tCursor,pCursor,cCursor,loadingDiv,mInfoFields=[],pyFields=[],cyFields=[],iyFields=[],timeFields=[];
	 var canvasRect;
	 var vIndex=-1,hMouseX=0,hMouseY=0;
	 var tradeTimes=[[930,1130],[1300,1500]];
	 var timeList=[];
	 var symbol="",name="";
	 var decimal=4;
	 var logoImg,logoDiv;
	 var httpServer="http://120.24.51.100:9000";
	 var authorizeFlag=true;
	 
	 window.onload= function(){
	    drawMinChart('chartDiv','chart');
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
		   var size=timeList.length;
		   if(vIndex<=0)
		   {
		      vIndex=0;
		   }
		   if(vIndex>=size)
		   {
		       vIndex=size-1;
		   }
		    //alert(hMouseX+","+hMouseY);
		   	createMoveLine(hMouseX,hMouseY);
			createTip(hMouseX,hMouseY);
			createTCursor(hMouseX,hMouseY);
			createPCursor(hMouseX,hMouseY);
		}
		else if(keyCode==37)
		{
		   vIndex--;
		   if(vIndex<=0)
		   {
		      vIndex=0;
		   }
		   if(vIndex>=size)
		   {
		       vIndex=size-1;
		   }
		   	createMoveLine(hMouseX,hMouseY);
			createTip(hMouseX,hMouseY);
			createTCursor(hMouseX,hMouseY);
			createPCursor(hMouseX,hMouseY);
		}
	 }
	 window.onresize = function(){
	 	return ;
	 	// 下面的代码会导致canvas拉伸
         if(canvas)
		 {
		    canvas.width=document.documentElement.clientWidth-5;
		    canvas.height=document.documentElement.clientHeight;
			_width=canvas.width;
		    _height=canvas.height;
			paintComponent();
		 }
    }
	function GetQueryString(name) {
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
                var r = window.location.search.substr(1).match(reg);
                if (r != null)
                    return unescape(r[2]);
                return null;
      }
	 function drawMinChart(canvasDivId,canvasId)
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
		 canvas.width=document.documentElement.clientWidth-2;
		 canvas.height=document.documentElement.clientHeight-2;
		 this.addEventListener('mousemove', doMouseMove,false);
		 this.addEventListener('click', doMouseClick,false);
		 //canvas.addEventListener('mouseout', doMouseOut,false);
		 this.addEventListener('touchstart', onTouchStart, false);
         this.addEventListener('touchmove', onTouchMove, false);
         this.addEventListener('touchend', onTouchEnd, false);
		 //alert(canvas);
		 canvasRect=canvas.getBoundingClientRect();
		 ctx=canvas.getContext("2d"); 
		 _width=canvas.width;
		 _height=canvas.height;
		 
		 init();
		 
		 paintComponent();
		 
		 createLoadingDiv();
		 
		 //Ajax.get("http://115.29.77.191/AuthorizeServer/HtmlDemoServlet?exec=authorize",onAuthorizeRecvData,canvasId,false);
		 $.ajax({
             type: "get",
             async: false,
             url: httpServer+"/ycf/trend/real_line1?stkCode="+symbol+"&r="+Math.random(),
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onMinRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 //alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
		 //Ajax.get(httpServer+"/FreeHQWebServer/MinuteResource?symbol="+symbol,onMinRecvData,this.canvasId,false);
		 
		 setInterval("onTimer()",1000*8);
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
			 var indCodes=["VOLUME","MACD"];
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
	 function onTimer()
	 {
	    
		 $.ajax({
             type: "get",
             async: false,
             url: httpServer+"/ycf/trend/real_line1?stkCode="+symbol+"&r="+Math.random(),
             dataType: "jsonp",
             jsonp: "callback",//传递给请求处理程序或页面的，用以获得jsonp回调函数名的参数名(一般默认为:callback)
             jsonpCallback:"onMinRecvData",//自定义的jsonp回调函数名称，默认为jQuery自动生成的随机函数名，也可以写"?"，jQuery会自动为你处理数据
             success: function(json){
                 //alert(json);
             },
             error: function(){
                 //alert('fail');
             }
         });
			 
	 }

	 function onMinRecvData(client)
	 {
	      dispalyLoadingDiv();
	     
		  var rs=client.data;
		  //alert(rs.length);
		  name=client.n;
		  pClose=parseFloat(client.p);
		  
	      //alert(rs.length);
		  minQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i];
			 
			  var item = {
				time:parseInt(parseInt(cts.t)),
                close: parseFloat(cts.c),
                volume: parseFloat(cts.v),
                value: parseFloat(cts.a)
               };
			  minQueue[i]=item;
			  
		  }
		  var size=minQueue.length;
		  /*
		  if(size>0)
		  {
		  //alert(minQueue[minQueue.length-1].time);
		  var endTime=parseInt(parseInt(minQueue[minQueue.length-1].time)/100)*100+100;
		 
		  var startTime=endTime-400;
		  if(startTime<0)
			{
				tradeTimes=[[2400-Math.abs(startTime),2400],[0,endTime]];
			}
			else
			{
				tradeTimes=[[startTime,endTime]];
			}
			//alert(tradeTimes);
		  }
		   */
		   timeList=createTimes(tradeTimes);
		   
		   mendDatas();
           initMinData();
		   vIndex= time.length-1;
		   paintComponent();
	 }
	 
	 function onMinUpdRecvData(client)
	 {
	      dispalyLoadingDiv();
	      var xmlDoc = client.responseXML;
		  var strResult = unescape(client.responseText);
		  var rs=strResult.split("\n");
		  //alert(rs.length);
		  name=rs[1];
		  pClose=parseFloat(rs[2]);
		  
		  if(rs.length>=3)
				rs=rs.slice(3,rs.length);
	      //alert(rs.length);
		  minQueue=[];
		  for(var i=0;i<rs.length;i++)
		  {
		      var cts=rs[i].split(",");
			  if(cts.length<3)
			  continue;
			  //alert(cts.length);
			  var item = {
				time:parseInt(parseInt(cts[0])),
                close: parseFloat(cts[1]),
                volume: parseFloat(cts[2]),
                value: 0
               };
			  minQueue[i]=item;
			  
		  }
		  var size=minQueue.length;
		  /*
		  if(size>0)
		  {
		  //alert(minQueue[minQueue.length-1].time);
		  var endTime=parseInt(parseInt(minQueue[minQueue.length-1].time)/100)*100+100;
		 
		  var startTime=endTime-400;
		  if(startTime<0)
			{
				tradeTimes=[[2400-Math.abs(startTime),2400],[0,endTime]];
			}
			else
			{
				tradeTimes=[[startTime,endTime]];
			}
			//alert(tradeTimes);
		  }
		   */
		   timeList=createTimes(tradeTimes);
		   
		   mendDatas();
           initMinData();
		   //vIndex= time.length-1;
		   paintComponent();
	 }
	 function reset()
	 {
	     	time=[];
			close=[];
			avg=[];
			volume=[];
			value=[];
			vIndex=-1;
			
	 }
	 
	
	 function init()
	 {
	      /*
	      var endTime=parseInt(parseInt(getHHmm(new Date()))/100)*100+100;
		  //alert(getHHmm(new Date()));
		  var startTime=endTime-400;
		  if(startTime<0)
			{
				tradeTimes=[[2400-Math.abs(startTime),2400],[0,endTime]];
			}
			else
			{
				tradeTimes=[[startTime,endTime]];
			}
			*/
		  //alert(endTime+"||"+startTime);
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
	 

	 function mendDatas()
	 {
	    //alert(timeList);
        for (var i = 0; i < minQueue.length && i >= 0; i++) {
            var minuteData={} ;
            //alert(minQueue[i].time);
			if(timeList[i]==null)
			{
			  minQueue.splice(i,1);
              i--;
			}
			if(minQueue[i].time==1131)
			{
			  //alert(minQueue[i].time+"||"+timeList[i]);
			}
            if (timeList[i] < (minQueue[i].time)) {
                //alert(minQueue[i].time+"||"+timeList[i])
                if (i == 0) {
                    minuteData.time = timeList[i];
                    minuteData.close = pClose;
                    minuteData.volume = 0;
                } else {
                    minuteData.time = timeList[i];
                    minuteData.close = minQueue[i - 1].close;
                    minuteData.volume = 0;
                }
				//alert(minuteData.time+"||")
				minQueue.splice(i,0,minuteData);
                //minQueue.add(i, minuteData);
            } else if (timeList[i] >  (minQueue[i].time)) {
			    /*
                if ((minQueue[i].time) > timeList[0]) {
                    if (i == 0) {
                        minuteData.time = timeList[i];
                        minuteData.close = pClose;
                        minuteData.volume = 0;
                    } else {
                        minuteData.time = timeList[i];
                        minuteData.close = minQueue[i-1].close;
                        minuteData.volume = 0;
                    }
					minQueue.splice(i,0,minuteData);
                   // minQueue.add(i, minuteData);
                } else 
				*/
				{
				    //alert('s');
					minQueue.splice(i,1);
                    i--;
                }
            }
        }
		  //alert(minQueue);
		  //alert(minQueue[minQueue.length-1].time);
	 }
	 function initMinData()
	 {

	    for (var i = 0; i < minQueue.length; i++) {
		      var item=minQueue[i];
		  	  time[i]=parseInt(item.time);
			  close[i]=parseFloat(item.close);
			  volume[i]=parseFloat(item.volume);
			  value[i]=0;
            var total = 0;
            for (var j = 0; j <= i; j++) {
                total += close[j];
            }
            avg[i] = total / (i + 1);
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
		  if(eventType==1)
		  {
		  if(time.length<=0)
		   return;
	      var x = event.touches[0].pageX;  
          var y = event.touches[0].pageY;  
	      
		  var point=getPointOnCanvas(canvas,x,y);

		   if(point.x>_left&&point.x<(_width-_right)&&point.y>_top&&point.y<(_height-_bottom))
		   {
		     //dalert("doMouseMove");
		     vIndex=parseInt((x-canvasRect.left-_left)/_scalex);
			 if((vIndex)<this.time.length)
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
	 function onTouchEnd(event)
	 {
	     //alert("onTouchEnd");
	 }
	 function doMouseMove(event)
	 {
	      if(time.length<=0)
		   return;
	      var x = event.pageX;  
          var y = event.pageY;  
	      
		  var point=getPointOnCanvas(canvas,x,y);
          //point.x=x;
		  //point.y=y;
		   if(point.x>_left&&point.x<(_width-_right)&&point.y>_top+canvas.offsetTop&&point.y<(_height-_bottom+canvas.offsetTop))
		   {
		     //alert("doMouseMove");
		     vIndex=parseInt((x-canvasRect.left-_left+_scalex/2)/_scalex);
			 if((vIndex)<this.time.length)
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
	 function createTip(x,y)
	 {      
	 
	       var last=this.close[vIndex];
		   var time=this.time[vIndex];
		   var avg=this.avg[vIndex];
		   var volume=this.volume[vIndex];
		   var timeStr=formatHHmm(completeByBefore(time,4,"0"));
		   var lastStr=formatNumber(last,2);
		   var avgStr=formatNumber(avg,2);
		   var volumeStr=formatNumber(volume,0);
		   var change=last-pClose;
		   var diffRateStr=""+formatNumber(change/pClose*100,2)+"%";
		   
		   var values=["时:",timeStr,"价:",lastStr,"量:",volumeStr,"涨幅:",diffRateStr];
	       var colors=[lableColor,lableColor,lableColor,getColor(change,0),lableColor,lableColor,lableColor,getColor(change,0)];
	       var h=18;
		   var w=0;
		   var top=3+canvas.offsetTop;
		   var left=5+canvas.offsetLeft;
		   var field;
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   for(var i=0;i<values.length;i++)
		   {
		       field=mInfoFields[i];
			   if(field==null)
			   {
				   field = document.createElement('DIV');
				   document.body.appendChild(field);
				   mInfoFields[i]=field;
			   }
			   var metrics = ctx.measureText(values[i]);
		       var textWidth = metrics.width+3;
			   field.style.display = 'block';
			   field.style.position = 'absolute';
			   field.style.height = h+'px';
			   field.style.width = textWidth+'px';
			   field.style.left =left+'px';
			   field.style.top = top+'px';
			   //field.style.background = '#ffffff';
			   //field.style.border='solid 1px #ffffff';
			   field.style.filter='alpha(Opacity=100)';
			   field.style.opacity='1';
			   var innerHtml='<div class=\'min_toptip\' ><font color=\"'+colors[i]+'\">'+values[i]+'</font></div>';
			   // field.innerHTML=innerHtml; //暂时去掉
			   field.innerHTML = '';
			   if(i%2==0)
			   {
			      left+=textWidth+4;
			   }
			   else{
			       left+=textWidth;
			   }
			   
			   
		   }

		   
		   

	 }
	 

	 
	 function createMoveLine(x,y)
	 {
	       	if(hLine==null)
		   {
		       hLine = document.createElement('DIV');
			   document.body.appendChild(hLine);
			   hLine.style.zIndex="998"; 
               hLine.style.position = 'absolute';
		       hLine.style.width = '1px';
		       hLine.style.background = cursorLineColor;
		   }
		   hLine.style.display = 'block';
           hLine.style.height = (_height-_top-_bottom)+'px';
           hLine.style.left =canvas.offsetLeft+ _left+vIndex*_scalex+_scalex/2+'px';
           hLine.style.top = canvas.offsetTop+_top+'px';
          
		    
		   if(vLine==null)
		   { 
		       vLine = document.createElement('DIV');
			   document.body.appendChild(vLine);
			   vLine.style.zIndex="998"; 
               vLine.style.position = 'absolute';
               vLine.style.height = '1px';
			   vLine.style.background = cursorLineColor;
		   }
		   vLine.style.display = 'block';
           vLine.style.width = _width-_left-_right+'px';
           vLine.style.left =canvas.offsetLeft+_left+1+'px';
           vLine.style.top = y+'px';
           
	 }
	 function createTCursor(x,y)
	 {
	       var tStr=formatHHmm(completeByBefore(this.time[vIndex],4,"0"));
	       	
		   var metrics = ctx.measureText(tStr);
		   var textWidth = metrics.width;
		   if(tCursor==null)
		   {
		       tCursor = document.createElement('DIV');
			   document.body.appendChild(tCursor);
			   tCursor.style.zIndex="999"; 
			   
			   tCursor.style.position = 'absolute';
			   tCursor.style.height = _timeH+'px';
			   tCursor.style.width = '50px';
			   tCursor.style.background = cursorLineColor;
		   }
           tCursor.style.display = 'block';
		   var xx=(canvas.offsetLeft+ _left+vIndex*_scalex+_scalex/2-(50)/2);
		   if((xx+50)>(_width-_right))
		   {
		      xx=canvas.offsetLeft+_width-_right-(50)+1;
		   }
		   else if(xx<_left)
		   {
		     xx=canvas.offsetLeft+_left;
		   }
           tCursor.style.left =xx+'px';
           tCursor.style.top = canvas.offsetTop+_top+_priceH+'px';
           
		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+tStr+'</font></div>';
		   tCursor.innerHTML=innerHtml;
	 }
	 
    function createPCursor(x,y)
	 {
	       if(y>canvasRect.top+_top+_priceH)
		   {
		      if(pCursor!=null)
			  {
			     pCursor.style.display = 'none';
			  }
			  if(cCursor!=null)
			  {
			     cCursor.style.display = 'none';
			  }
			  return ;
		   }
	       var py =pLimits[1]-(y-canvasRect.top-_top-1)*(pLimits[1]-pLimits[0])/_priceH;
	       var priceStr=formatNumber(py,2);
		   var metrics = ctx.measureText(priceStr);
		   var textWidth = metrics.width;
		   if(pCursor==null)
		   {
		       pCursor = document.createElement('DIV');
			   document.body.appendChild(pCursor);
			   
			   pCursor.style.position = 'absolute';
			   pCursor.style.height = '20px';
			   pCursor.style.width ='50px';
			   pCursor.style.background = cursorLineColor;
		   }

           pCursor.style.left =(_left-50)+'px';
           pCursor.style.top = (y-9)+'px';
           pCursor.style.display = 'block';
		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+priceStr+'</font></div>';
		   pCursor.innerHTML=innerHtml;
		   
		   
	       var py =pLimits[1]-(y-canvasRect.top-_top-1)*(pLimits[1]-pLimits[0])/_priceH;
	       var priceStr=formatNumber(((py-pClose)/pClose)*100,2)+"%";
		   var metrics = ctx.measureText(priceStr);
		   var textWidth = metrics.width;
		   if(cCursor==null)
		   {
		       cCursor = document.createElement('DIV');
			   document.body.appendChild(cCursor);
			   cCursor.style.position = 'absolute';
			   cCursor.style.height = '20px';
			   cCursor.style.width ='50px';
			   cCursor.style.background = cursorLineColor;
		   }

           cCursor.style.left =(_width-_right+1)+'px';
           cCursor.style.top = (y-9)+'px';
           cCursor.style.display = 'block';
		   var innerHtml='<div class=\'cursortxt\' ><font color=\"#ffffff\">'+priceStr+'</font></div>';
		   cCursor.innerHTML=innerHtml;
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
		   
		   	if(pCursor!=null)
		   {
		       pCursor.style.display = 'none';
		   }
		   if(tCursor!=null)
		   {
		       tCursor.style.display = 'none';
		   }
		   if(cCursor!=null)
		   {
		       cCursor.style.display = 'none';
		   }
		   
	 }
	 function paintComponent()
	 {
	       drawBasic(); 
		   //drawLogo(); 
		   drawChart();
		   if(vIndex>=0)
		   {
		       //alert(vIndex);
		       createTip(0,0);
		   }
	 }
	 function drawBasic()
	 {
	        _priceH=(_height-_top-_bottom-_timeH)*7/10;
			_volumeH=(_height-_top-_bottom-_timeH)*3/10;
			//(_priceH+"||_volumeH:"+_volumeH);
			
			timeList=createTimes(tradeTimes);
			_scalex=(_width - _right - _left) / timeList.length;
	        ctx.clearRect(0,0,_width,_height);
			ctx.save();
			
		   ctx.lineWidth=1;
		   ctx.strokeStyle=boderColor; 
		   ctx.rect(convertXY(_left),convertXY(_top),parseInt(_width-_left-_right),parseInt(_priceH)); 
		   ctx.stroke();
		   
		   ctx.rect(convertXY(_left),convertXY(_top+_priceH+_timeH),parseInt(_width-_left-_right),parseInt(_volumeH)); 
		   ctx.stroke();
		   
		   var top=_top;
		   var avgH=_priceH/rowNum;
		    ctx.strokeStyle = "#eeeeee";  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<rowNum-1;i++)
		   {
		       top+=avgH;
		       ctx.moveTo(convertXY(_left),convertXY(top));
			   ctx.lineTo(convertXY(_width-_right),convertXY(top));
		   }           	   
           ctx.stroke(); 
		   
		    ctx.strokeStyle =boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
			ctx.moveTo(convertXY(_left),convertXY(_top+_priceH/2));
			ctx.lineTo(convertXY(_width-_right),convertXY(_top+_priceH/2));
           	ctx.stroke();   
			
		   
		   
		   var top=_top+_priceH+_timeH;
		   var avgH=_volumeH/2;
		    ctx.strokeStyle = boderColor;  
            ctx.lineWidth = 1;  
			ctx.beginPath();
		   for(var i=0;i<2-1;i++)
		   {
		       top+=avgH;
		       ctx.moveTo(convertXY(_left),convertXY(top));
			   ctx.lineTo(convertXY(_width-_right),convertXY(top));
		   }           	   
           ctx.stroke();  
		   
		   var d1 = 30;
           var d2 = 0;
		   var idx=0;
		   var timePeriod = 60;
		   
		   for (var i = 0; i < timeList.length; i++) {
            var flag = false;
            idx++;
            for (var j = 0; j < tradeTimes.length; j++) {
                if (timeList[i] == tradeTimes[j][0] || timeList[i] == tradeTimes[j][1]) {
                    flag = true;
                    idx = 0;
                }
            }
            if (idx == timePeriod && (timeList[i] % 100 == d1 || timeList[i] % 100 == d2) && !flag) {
                idx = 0;
				ctx.strokeStyle = boderColor;  
				ctx.lineWidth = 1;  
				ctx.beginPath();
				ctx.moveTo(convertXY(i * _scalex + _left),convertXY(_top));
				ctx.lineTo(convertXY(i * _scalex + _left),convertXY(_top+_priceH));
				ctx.moveTo(convertXY(i * _scalex + _left),convertXY(_top + _priceH + _timeH));
				ctx.lineTo(convertXY(i * _scalex + _left),convertXY(_height-_bottom));
				ctx.stroke();   
            } else if (idx == timePeriod) {
                idx = 0;
            }
			
        }
		
		 for (var i = 0; i < tradeTimes.length; i++) {
		        var tt=tradeTimes[i];
				var ntt=tradeTimes[i+1];
				if(tt!=null&&ntt!=null)
				{
					var tindex=0;
					for(var j=0;j<=i;j++)
					{
						tindex+=tradeTimes[j][1]-tradeTimes[j][0];
						tindex-=(tradeTimes[j][1]/100-tradeTimes[j][0]/100)*40;
					}
					
					ctx.strokeStyle = boderColor;  
					ctx.lineWidth = 1;  
					ctx.beginPath();
					ctx.moveTo(convertXY(tindex * _scalex + _left),convertXY(_top));
					ctx.lineTo(convertXY(tindex * _scalex + _left),convertXY(_top+_priceH));
					ctx.moveTo(convertXY(tindex * _scalex + _left),convertXY(_top + _priceH + _timeH));
					ctx.lineTo(convertXY(tindex * _scalex + _left),convertXY(_height-_bottom));
					ctx.stroke();  
				
            }
        }
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
		  /*
		  if(logoImg==null)
		  { 
			logoImg=new Image();
			logoImg.src = 'img/logo.png';
			logoImg.onload = function()
			 {
				ctx.drawImage(logoImg,_width-_right-logoImg.width-10,_top+_priceH-logoImg.height-10);
				ctx.beginPath(); 
			 }
		  }
		  else{
		   if(logoImg!=null)
		   {
				ctx.drawImage(logoImg,_width-_right-logoImg.width-10,_top+_priceH-logoImg.height-10);
				ctx.beginPath(); 
		   }
		  }
		  */
	 }
	 
	function drawChart()
	 {
	      
	      if(time.length<=0)
		   return;
		   
		  
		   drawMinPrice();
		   drawXAxisTime();
		   if(indType=="VOLUME")
		   drawVolume();
		   else if(indType=="MACD")
		   drawMACD();
	 }
	 function drawMinPrice()
	 {
		   var size=time.length;
		   calPriceLimit();
		   drawYAxisPrice();
		   
		   var top=_top;
		   var x,y,x1=0,y1=0,x2=0,y2=0;
		   for (var i = 0; i < size; i++) {
		        x =  _left + _scalex * i+_scalex/2;
				
				y = (top + (pLimits[1] - close[i]) / (pLimits[1] - pLimits[0]) * _priceH);
				
				if(x1!=0&&y1!=0)
				{
					  ctx.strokeStyle = minCurColor;  	 
					  ctx.lineWidth = 1.5;  
					  ctx.beginPath();
					  ctx.moveTo((x),(y));
					  ctx.lineTo((x1),(y1));
					  ctx.stroke(); 
					  
				}
				x1=x;
				y1=y;
				y = (top + (pLimits[1] - avg[i]) / (pLimits[1] - pLimits[0]) * _priceH);
				if(x2!=0&&y2!=0)
				{
					  ctx.strokeStyle = minAvgColor  
					  ctx.lineWidth = 1.5;  
					  ctx.beginPath();
					  ctx.moveTo((x),(y));
					  ctx.lineTo((x2),(y2));
					  ctx.stroke(); 
				}
				x2=x;
				y2=y;
		   }
		   
	 }
	 function calPriceLimit()
	 {
	       var size = time.length;
		   pLimits = calLimit(0, size-1,[close]);
		   var change=0;
		   if (size != 0) {
            var change1 = (pLimits[1] - pClose) * 100 / pClose;
            var change2 = (pLimits[0] - pClose) * 100 / pClose;
            var maxChange = Math.max(Math.abs(change1), Math.abs(change2));
            change = maxChange;
			
			}
			if (change <= 0.5) {
				change = 0.5;
			} else if (change > 0.5 && change < 1) {
				change = 1;
			} else if (change >= 8 && change < 10) {
				change = 10;
			} else if (change >= 10) {
				change = change;
			} else {
				change += 0.5;
			}
			
			pLimits[1] = pClose + pClose * change / 100;
			pLimits[0] = pClose - pClose * change / 100;
			
			
	 }
	 function drawXAxisTime()
	 {     
	       var top = _top + _priceH+canvas.offsetTop;
		   var dStr="";
		   var x;
		   //ctx.fillStyle=lableColor;
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   var field;
		   var h=18;
		   var w=60;
		   var textWidth;
		   var count=0;
		   for (var  i = 0; i < tradeTimes.length; i++) {
		         if (i == 0) {
		            dStr =formatHHmm(completeByBefore(tradeTimes[i][0]+"",4,"0"));
				    var metrics = ctx.measureText(dStr);
					textWidth = metrics.width+5;
					x = _left-textWidth/2;
					x = _left-2;
					x+=canvas.offsetLeft;
					field=timeFields[count];
					if(field==null)
					{
						field= document.createElement('DIV');
						document.body.appendChild(field);
						timeFields[count]=field;
						field.style.display = 'block';
					    field.style.position = 'absolute';
						field.style.filter='alpha(Opacity=100)';
					    field.style.opacity='1';
					}
					  
					field.style.height = h+'px';
					field.style.width = textWidth+'px';
					field.style.left =x+'px';
					field.style.top = top+'px'; 
					var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
					field.innerHTML=innerHtml;
					count++;
				 }
				  if (i ==(tradeTimes.length-1)) {
		            dStr =formatHHmm(completeByBefore(tradeTimes[i][1]+"",4,"0"));
				    var metrics = ctx.measureText(dStr);
					textWidth = metrics.width+5;
					x =_width-_right-textWidth/2;
					x =_width-_right-textWidth+2;
					x+=canvas.offsetLeft;
					field=timeFields[count];
					if(field==null)
					{
						field= document.createElement('DIV');
						document.body.appendChild(field);
						timeFields[count]=field;
						field.style.display = 'block';
					    field.style.position = 'absolute';
						field.style.filter='alpha(Opacity=100)';
					    field.style.opacity='1';
					}
					  

					field.style.height = h+'px';
					field.style.width = textWidth+'px';
					field.style.left =x+'px';
					field.style.top = top+'px'; 
					var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
					field.innerHTML=innerHtml;
					count++;
				 }
				 if ((i + 1) < tradeTimes.length) {
					var idx = 0;
					
					for (var j = 0; j <= i; j++) {
						idx += tradeTimes[i][1] - tradeTimes[i][0];
						idx -= (tradeTimes[i][1] / 100 - tradeTimes[i][0] / 100) * 40;
					}
					
					if (_width <= 400) {
						dStr = formatHHmm(completeByBefore(tradeTimes[i][0]+"",4,"0"));;
					} else {
						dStr = formatHHmm(completeByBefore(tradeTimes[i][1]+"",4,"0"))+ "/" + formatHHmm(completeByBefore(tradeTimes[i+1][0]+"",4,"0"));
					}
					var metrics = ctx.measureText(dStr);
					textWidth = metrics.width+5;
					x = _left + (idx * _scalex)-textWidth/2;
					x+=canvas.offsetLeft;
					field=timeFields[count];
					if(field==null)
					{
						field= document.createElement('DIV');
						document.body.appendChild(field);
						timeFields[count]=field;
						field.style.display = 'block';
					    field.style.position = 'absolute';
						field.style.filter='alpha(Opacity=100)';
					    field.style.opacity='1';
					}
					
					field.style.height = h+'px';
					field.style.width = textWidth+'px';
					field.style.left =x+'px';
					field.style.top = top+'px'; 
					var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
					field.innerHTML=innerHtml;
					count++;
					
               }

			   
		   }
		   
		   var d1 = 30;
           var d2 = 0;
		   var idx=0;
		   var timePeriod = 60;
		   
		   for (var i = 0; i < timeList.length; i++) {
            var flag = false;
            idx++;
            for (var j = 0; j < tradeTimes.length; j++) {
                if (timeList[i] == tradeTimes[j][0] || timeList[i] == tradeTimes[j][1]) {
                    flag = true;
                    idx = 0;
					
                }
            }
            if (idx == timePeriod && (timeList[i] % 100 == d1 || timeList[i] % 100 == d2) && flag==false) {
			//if ( flag==true) {
                idx = 0;
				
				var dStr = formatHHmm(completeByBefore(timeList[i]+"",4,"0"));;
				
				var metrics = ctx.measureText(dStr);
				var textWidth = metrics.width+5;
				x = _left + (i * _scalex)-textWidth/2;
				//ctx.fillText(dStr,x,top+14,textWidth); 
				field=timeFields[count];
				if(field==null)
				{
					field= document.createElement('DIV');
					document.body.appendChild(field);
					timeFields[count]=field;
					field.style.filter='alpha(Opacity=100)';
				    field.style.opacity='1';
					field.style.display = 'block';
				    field.style.position = 'absolute';
				}
				field.style.height = h+'px';
				field.style.width = textWidth+'px';
				field.style.left =x+'px';
				field.style.top = top+'px'; 

				var innerHtml='<div  class=\'cursortxt\' ><font color=\"'+lableColor+'\">'+dStr+'</font></div>';
				field.innerHTML=innerHtml;
				count++;
            } else if (idx == timePeriod) {
                idx = 0;
            }   
	     }
		 
	 }
	 
	 function drawYAxisPrice()
	 {
	      var num = rowNum;
		  var change = pLimits[1] - pLimits[0];
		  ctx.font="12px Arial";
		  ctx.textAlign = "right";
		  var left=0+canvas.offsetLeft;
		  var top=_top+canvas.offsetTop;
		  var x,y;
		  //ctx.fillStyle="#000000";
		  var field;
		  var color;
		  var h=20;
		  var w=_left-2;
		  for (var i = 0; i < num + 1; i++) {
		      var value = pLimits[1] - i * change / num;
			    if (i < num / 2) {
                   ctx.fillStyle="red";
				   color="red";
				} else if (i > num / 2) {
					ctx.fillStyle="green";
					color="green";
				} else {
					ctx.fillStyle="#000000";
					color="#000000";
				}
		      var metrics = ctx.measureText(formatNumber(value,2));
              var textWidth = metrics.width;
			  //alert(textWidth);
			   y=top;
			 
			  if(i==0)
			    y=top-2;
			  else if(i==(num))
			  {
			    y=top-15;
			    //alert(value);
			  }
			  else
			    y=top-10;
				
			  field=pyFields[i];
		      if(field==null)
			  {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				pyFields[i]=field;
				field.style.display = 'block';
                field.style.position = 'absolute';
				field.style.filter='alpha(Opacity=100)';
		        field.style.opacity='1';
			  }
              field.style.height = h+'px';
              field.style.width = w+'px';
              field.style.left =x+'px';
              field.style.top = y+'px';
			  var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"'+color+'\">'+formatNumber(value,2)+'</font></div>';
		      field.innerHTML=innerHtml;
			  top+=_priceH/rowNum;
		   }
		   var c2 = change/num * 100 / pClose;
		   var value;
		   top=_top+canvas.offsetTop;
		   ctx.font="12px Arial";
		   ctx.textAlign = "left";
		   x=_width-_right+2+canvas.offsetLeft;
		   	for (var i = 0; i < num + 1; i++) {
			    if (i < num / 2) {
                   ctx.fillStyle="red";
				   value = formatNumber((num / 2 - i) * c2, 2);
				    color="red";
				} else if (i > num / 2) {
					ctx.fillStyle="green";
					value = "-" +formatNumber((i - num / 2) * c2, 2);
					 color="green";
				} else {
					ctx.fillStyle="#000000";
					value = "0";
					 color="#000000";
				}
		      var metrics = ctx.measureText(value+"%");
              var textWidth = metrics.width;
			   y=top;
			 
			  if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-15;
			  else
			    y=top-10;
			  field=cyFields[i];
		      if(field==null)
			  {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				cyFields[i]=field;
			  }
			  field.style.display = 'block';
              field.style.position = 'absolute';
              field.style.height = h+'px';
              field.style.width = w+'px';
              field.style.left =(x-textWidth-5)+'px';
              field.style.top = y+'px';
		      field.style.filter='alpha(Opacity=100)';
		      field.style.opacity='1';
			  var innerHtml='<div  class=\'min_cyfields\' ><font color=\"'+color+'\">'+value+"%"+'</font></div>';
		      field.innerHTML=innerHtml;
		      
			  top+=_priceH/rowNum;
		   }
	 }
	function drawVolume()
	{
	       var size = time.length;
		   vLimits=calLimit(0,size,[volume]);
		   if(vLimits[1]>0)
		   {
		    vLimits[1]*=1.1;
		   }
		   drawVolumeYAxis(vLimits, 0);
		   var top=_top+_priceH+_timeH;
		   var x,y;
		  
		   for (var i = 0; i < size; i++) {
		        x =  _left + _scalex * i+_scalex/2;
				y = (top + (vLimits[1] - volume[i]) / (vLimits[1] - vLimits[0]) * _volumeH);
				      ctx.strokeStyle = "#0087d3";  
					  if(i==0)
					  {
					      if(close[i]>pClose)
						  {
						      ctx.strokeStyle = "red";  
						  }
						  else
						  {
						       ctx.strokeStyle = "green";  
						  }
					  }
					  else
					  {    
					        if(close[i]>close[i-1])
							 {
							     ctx.strokeStyle = "red";  
							 }
							 else
							 {
							      ctx.strokeStyle = "green";  
							 }
					  }
					  ctx.lineWidth = 0.7;  
					  ctx.beginPath();
					  ctx.moveTo(convertXY(x),convertXY(y));
					  ctx.lineTo(convertXY(x),convertXY(_height-_bottom));
					  ctx.stroke(); 
				
			}
			
	}
	function drawVolumeYAxis(limits,decimal)
	 {  
	      var num = 2;
		  var change = limits[1] - limits[0];
		  ctx.font=" 12px Arial";
		  ctx.textAlign = "right";
		  var left=0+canvas.offsetLeft;
		  var top=_top+_priceH+_timeH+canvas.offsetTop;
		  var x,y;
		  var field;
		  var h=20;
		  var w=_left-2;
		  //ctx.fillStyle=minYAxisVolumeColor;
		  for (var i = 0; i < num + 1; i++) {
		      var value = limits[1] - i * change / num;
		      var metrics = ctx.measureText(formatNumber(value,decimal));
              var textWidth = metrics.width;
			  //alert(textWidth);
			  x=0;
			  if(i==0)
			    y=top-2;
			  else if(i==num)
			    y=top-20;
			  else
			    y=top-10;
		      //ctx.fillText(formatNumber(value,decimal),x,y);
			  top+=_volumeH/num;
			  field=iyFields[i];
		      if(field==null)
			  {
			    field= document.createElement('DIV');
			    document.body.appendChild(field);
				iyFields[i]=field;
			  }
			  
			  field.style.display = 'block';
              field.style.position = 'absolute';
              field.style.height = h+'px';
              field.style.width = w+'px';
              field.style.left =x+'px';
              field.style.top = y+'px';
              field.style.background = '#ffffff';
		      field.style.border='solid 1px #ffffff';
		      field.style.filter='alpha(Opacity=100)';
		      field.style.opacity='1';
			  var innerHtml='<div  class=\'kline_pyfields\' ><font color=\"'+minYAxisVolumeColor+'\">'+formatNumber(value,decimal)+'</font></div>';
		      field.innerHTML=innerHtml;
		   }
	 }
	 function drawMACD()
	 {     
	       
	       calMACDDatas();
		   
		   var size=time.length;
		   var vLimits=calLimit(0,size,[dif,dea,macd]);
		   
		   drawVolumeYAxis(vLimits, 3);
		   var top=_top+_timeH+_priceH;
		   var x=0,y=0,x1=0,y1=0,x2=0,y2=0,x3=0,y3=0;
		   var off=0;
		   var height=_volumeH;
		   
		   for(var i=0;i<size;i++)
		   {
		     
			x =  _left + _scalex * i+_scalex/2;
            y = (top + (vLimits[1] - dif[i]) / (vLimits[1] - vLimits[0]) * height);
			if(x1!=0&&y1!=0)
			{
			      ctx.strokeStyle = klineMacdColor1;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x1),(y1));
				  ctx.stroke(); 		  
			}
			x1=x;
			y1=y;
			y = (top + (vLimits[1] - dea[i]) / (vLimits[1] - vLimits[0]) * height);
			if(x2!=0&&y2!=0)
			{
			      ctx.strokeStyle = klineMacdColor2;  
                  ctx.lineWidth = 1;  
				  ctx.beginPath();
				  ctx.moveTo((x),(y));
			      ctx.lineTo((x2),(y2));
				  ctx.stroke(); 		  
			}
			x2=x;
			y2=y;
			if (macd[i] != 0) {
                if (macd[i] > 0) {
                    ctx.strokeStyle = kUpFillColor;  
					ctx.fillStyle=kUpFillColor;
                } else {
                    ctx.strokeStyle = kDownFillColor;  
					ctx.fillStyle=kDownFillColor;
                }
                var a = top + (vLimits[1]) * height / (vLimits[1] - vLimits[0]);
                var b = top + (vLimits[1]) * height / (vLimits[1] - vLimits[0]) - macd[i] * _volumeH / (vLimits[1] - vLimits[0]);
                //ctx.lineWidth = 1;  
				//ctx.beginPath();
				//ctx.fillRect(convertXY(x+1),convertXY(Math.min(a,b)),convertXY(1),convertXY(Math.abs(a-b))); 
				
				//ctx.strokeStyle =boderColor;  
				ctx.lineWidth = 1;  
				ctx.beginPath();
				ctx.moveTo(convertXY(x),convertXY(a));
				ctx.lineTo(convertXY(x),convertXY(b));
				ctx.stroke();   	
            }
			
		   }
		   
		   
	 }
	 function calMACDDatas()
	 {
	       var ema12_close =EMA(close, 12);
           var ema26_close =EMA(close, 26);
           var dif =[];
		   var size=time.length;
           for (var i = 0; i < size; i++) {
               dif[i] = ema12_close[i] - ema26_close[i];
           }
           var dea = EMA(dif, 9);
           var macd = [];
           for (var i = 0; i < size; i++) {
               macd[i] = 2 * (dif[i] - dea[i]);
           }
		   this.dif=dif;
		   this.dea=dea;
		   this.macd=macd;
		   
	 }
	 
	function convertXY(xy)
	 {
	      var temp=parseInt(xy);
		  temp+=0.5;
		  return temp;
	 }
	 function createTimes(tradeTimes)
	 {
	       var timeList=[];
		   var num=0,t=0;
		   for (var i = 0; i < tradeTimes.length; i++) {
		        num = 0;
				for (var j = tradeTimes[i][0]; j < tradeTimes[i][1]; j++) {
					if (j % 100 < 60) {
						num++;
					}
				}	
			    t = tradeTimes[i][0];
				for (var j = 0; j <= num; j++) {
					if (t == 2400) {
						t++;
						continue;
					}
					timeList.push(t);
					t++;
					if (t % 100 >= 60) {
						t += 40;
					}
				}
		   }
		   return timeList;
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