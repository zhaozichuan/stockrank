(function(){

	var symbol = getQueryString('symbol');

	if (!symbol) {
		$('.header-cont').html('对不起，没有个股(symbol)参数');
		return ;
	}

	// 初始化分时图
	var $minChat = $('#d-chart-min');
	changeIframe($('iframe', $minChat));


	var circleTime = getQueryString('circleTime') * 1000 || 5 * 1000;
	var timerIdrequest = null,
		request = true,
		headerTpl  = $('#content-header_tpl').html(),
		contentTpl  =$('#content-content_tpl').html(),
		masterTpl = $('#content-master_tpl').html();

	get();
	function get() {
		
		var sendData = {
			mid: 1,
			stockCode: symbol
		};

		if (!request) {
			return;
		}
		request = false;

		$.ajax({
			url: 'http://120.25.123.226:9000/ycf/get_stock_web_detail',
			dataType: 'jsonp',
			data: sendData,
			success: function (rt) {
				request = true;
				if (rt.errCode === 0) {
					render(getData(rt));
				}
			}
		});
	}

	requestS();
	function requestS(){
		request = true;
		clearInterval(timerIdrequest);
		timerIdrequest = setInterval(get, circleTime);
	}

	window.StartRequest = requestS;
	window.StopRequest = function(){
		clearInterval(timerIdrequest);
	};

	function getData (rt) {
		var stockWebDetail = rt.business.stockWebDetail;
		stockWebDetail.handicap = rt.business.handicap;
		stockWebDetail.handicap.otherItem = $.extend([],rt.business.otherItem);
		stockWebDetail.handicap.buyInItem = $.extend([],rt.business.buyInItem);
		stockWebDetail.handicap.sellItem = $.extend([],rt.business.sellItem);
		stockWebDetail.analyst = $.extend([],rt.business.analyst);

		for (var i = 0, len = stockWebDetail.handicap.otherItem.length; i < len, i < 14; i++) {
			if (!stockWebDetail.handicap.otherItem[i]) {
				stockWebDetail.handicap.otherItem.push(',,');
			}
		}

		for (var i = 0, len = stockWebDetail.handicap.buyInItem.length; i < len, i < 7; i++) {
			if (!stockWebDetail.handicap.buyInItem[i]) {
				stockWebDetail.handicap.buyInItem.push(',,');
			}
		}

		for (var i = 0, len = stockWebDetail.handicap.sellItem.length; i < len, i < 7; i++) {
			if (!stockWebDetail.handicap.sellItem[i]) {
				stockWebDetail.handicap.sellItem.push(',,');
			}
		}

		return rt;
	}


	function render(data){
		// 头部
		var htmls = tmpl(headerTpl, data.business.stockWebDetail);
		$('.header-cont').html(htmls);

		// 盘口模版
		htmls = tmpl(contentTpl, data.business.stockWebDetail.handicap);
		$('.handicap-cont').html(htmls);

		// 分析师
		htmls = tmpl(masterTpl, data.business.stockWebDetail.analyst);
		$('.master-cont').html(htmls);

	}

	// tab切换
	var timerId = null;
	$('body').on('touchstart', '.d-tab-item', function(){
		var $this = $(this),
			type = $this.attr('id').split('-')[2];

		// 重置
		$('.d-tab-item').removeClass('active').removeClass('hover');
		//$('.chart-item').removeClass('active').find('iframe').removeAttr('src');
		$('.chart-item').removeClass('active');

		// 加入
		$this.addClass('active');
		var $curChart = $('#d-chart-'+type);
		if (type !== 'handicap') {
			changeIframe($curChart.find('iframe'));
		}
		$curChart.addClass('active');

		// 点击变色情况
		clearTimeout(timerId);
		$this.addClass('hover');
		timerId = setTimeout(function(){
			$this.removeClass('hover');
		}, 120);
		return false;
	});

	function changeIframe($iframe){
		var params = {
				symbol: symbol,
				t: +(new Date())
			};
		var src = $iframe.parent('.chart-item').data('src');
		if (!$iframe.attr('src')) {
			$iframe.attr('src', src+$.param(params));
		}
	}

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
		    return unescape(r[2]);
		return null;
	}
})();