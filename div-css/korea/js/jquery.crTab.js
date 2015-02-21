// JavaScript Document
(function($){
	var isShow = false;
	
	$.fn.crTab = function(options) {
		this.opts = $.extend({}, $.fn.crTab.defaults, options);
		this._init();
	}
	
	$.fn.crTab.prototype = {
		_init: function() {
			var _this = this;
			if($(_this.opts.tabList).length > 0) {
				$(_this.opts.tabList).each(function(index){
					//alert(_this.opts.eventType);
					$(this).bind(_this.opts.eventType, function(){
						if((!isShow) && $(this).attr('class').indexOf(_this.opts.tabActiveCls) == -1) {
							//callback
							if (_this.opts.startCallback) {
								_this.opts.startCallback(index);
							}
							
							$(_this.opts.tabList).removeClass(_this.opts.tabActiveCls);
							$(this).addClass(_this.opts.tabActiveCls);
							_this._showContent(index);
						}
					});
				});
			}
		},
		
		_showContent: function(index) {
			isShow = true;
			var _this = this;
			switch (_this.opts.showType) {
				case 'show' :
					$(_this.opts.contentList + ':visible').hide();
					
					if (_this.opts.hideCallback) {
						_this.opts.hideCallback(index);
					}
					
					$(_this.opts.contentList).eq(index).show();
					
					if (_this.opts.showCallback) {
						_this.opts.showCallback(index);
					}
					isShow = false;
					break;
					
				case 'fade' :
					$(_this.opts.contentList + ':visible').fadeOut(_this.opts.showSpeed, function(){
						
						if(_this.opts.hideCallback) {
							_this.opts.hideCallback(index);
						}
						
						$(_this.opts.contentList).eq(index).fadeIn(function() {
							if(_this.opts.showCallback) {
								_this.opts.showCallback(index);
							}
							isShow = false;
						});
					});
					break;
					
				case 'slide' :
					$(_this.opts.contentList + ':visible').slideUp(_this.opts.showSpeed, function() {
						
						if(_this.opts.hideCallback) {
							_this.opts.hideCallback(index);
						}
						
						$(_this.opts.contentList).eq(index).slideDown(function() {
							if (_this.opts.showCallback) {
								_this.opts.showCallback(index);
							}
							isShow = false;
						});
					});
					break;
			}
		}
	}
	
	$.fn.crTab.defaults = {
		tabList       : '',
		contentList   : '',
		tabActiveCls  : 'active',
		tabDisableCls : 'disable',
		eventType     : 'click',
		showType      : 'show',
		showSpeed     : 10,
		startCallback : null,
		hideCallback  : null,
		showCallback  : null
	};
})(jQuery)