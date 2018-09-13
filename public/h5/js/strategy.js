(function(){

	// 先更新本地数据
	//render(data.business.stockWebStrategyDetail);
	var chartUrl = 'chart/linechart.html?t='+ (+ new Date()) +'&symbol=';

	var strategyId = getQueryString('strategyId');

	if (!strategyId) {
		$('.header-cont').html('对不起，没有(strategyId)参数');
		return ;
	}

	$('#d-chart-day iframe').attr('src', chartUrl + strategyId);

	
	var circleTime = getQueryString('circleTime') * 1000 || 5 * 1000;
	var timerIdrequest = null,
	    request = true,
		headerTpl = $('#header-cont_tpl').html(),
		contTpl = $('#footer-cont_tpl').html();

	get();
	function get () {
		if (!request) {
			return;
		}
		request = false;
		$.ajax({
			url: 'http://120.25.123.226:9000/ycf/get_web_strategy_detail',
			data: {mid: 'test', strategyId: strategyId},
			dataType: 'jsonp',
			success: function(rt){
				request = true;
				if (rt.errCode === 0 && rt.business) {
					render(rt.business.stockWebStrategyDetail);
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

	

	function render(stockWebStrategyDetail){
		// header部分
		var htmls = tmpl(headerTpl, stockWebStrategyDetail);
		$('.header-cont').html(htmls);

		htmls = tmpl(contTpl, stockWebStrategyDetail);
		$('.content-footer').html(htmls);
	}

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null)
		    return unescape(r[2]);
		return null;
	}

})();