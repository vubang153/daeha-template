var menu = {
	toggleButton : '.toggle-menu',
	menuName: '.navigation',
	overlayName: '#overlay',
	init: function(){
		this.toggle();
	},
	toggle: function() {
		$(this.toggleButton).click(function(e) {
			e.preventDefault();
			$(".menu, #overlay").toggleClass('active');
		})
	}
}
var overlay = {
	init: function(){
		this.closeMenu();
	},
	closeMenu: function(){
		$('#overlay').click(function(){
			$(".menu, #overlay").toggleClass('active');
		});
	},
	active: function(){
		$("#overlay").toggleClass('active');
	}

}
var page = {
	init: function() {
		page.toggleScrollButton(500);
		page.scrollToTop();
	},
	toggleScrollButton: function(pixel) {
		$(document).scroll(function(){
			let currentScroll = $(window).scrollTop();
			if (currentScroll > pixel) {
				$('#scrollUp').css('display', 'inline-block');
			}
			else {
				$('#scrollUp').css('display', 'none');
			}
		})
	},
	scrollToTop: function(){
		$('#scrollUp').click(function(e){
			e.preventDefault();
			$(document).scrollTop({top:0, behavior: 'smooth'});
		})
	}


}
var navigation = {
	character: "<span class='fw-bold fs-4 _show'>+</span>",
	init: function(){
		navigation.renderArrow();
		navigation.toggleArrow();
	},
	renderArrow: function(){
		var list = $('.menu ul li');
		$.each( list, function( key, value ) {
  			var childCount = $(this).find('ul').length;
  			if (childCount > 0) {
  				$(this).append(navigation.character);
  			}
		});
	},
	toggleArrow: function(){
		$('.menu ._show').click(function(){
			var _this = $(this);
			_this.toggleClass('active');
			if (_this.hasClass('active')) {
				_this.text('-');
			}
			else {
				_this.text('+');
			}
			_this.prev().toggle('fadein');
		})
	},

}
var header = {
	init: function(){
		header.scaleLogo();
	},
	scaleLogo: function(){
		let headerOuterHeight = $('header').outerHeight();
		console.log(headerOuterHeight);
	}
}
var product = {
	init: function(){
		product.showDetail();
		product.hideDetail();
		product.itemActive();
		product.nextSlide();
		product.previousSlide();
	},
	showDetail: function(){
		$('.item>._img-wrapper').click(function(e){
			e.preventDefault();
			$('.show-detail-prd').toggleClass('active');
		});
	},
	hideDetail: function(){
		$('.show-detail-prd ._slider ._btn-close').click(function(e){
			$('.show-detail-prd').toggleClass('active');
		});
	},
	itemActive: function(){
		$('.show-detail-prd ._tab-index > ._img-link').click(function(e){
			e.preventDefault();
			$(this).siblings().removeClass('active');
			$(this).addClass('active');
			product.setCurrentActiveItem();
		})
	},
	getActiveItem: function(){
		 return $('.show-detail-prd ._tab-index ._img-link.active ._img').attr('tab-index');

	},
	setCurrentActiveItem: function(){
		let srcImg = $('.show-detail-prd ._tab-index ._img-link.active > ._img').attr('src');
		$('.show-detail-prd ._slider ._picture > ._img ').attr('src', srcImg);
	},
	getLengthSlider: function(){
		return $('.show-detail-prd ._tab-index').children().length;
	},
	nextSlide: function(){
		$('.show-detail-prd ._buttons ._btn-next').click(function(e){
			e.preventDefault();
			let tabIndex = product.getActiveItem();
			var nextTabIndex = 0;
			if (tabIndex >= product.getLengthSlider()) {
				nextTabIndex = 1;
			}
			else
			{
				nextTabIndex = ++tabIndex;
			}
			$('.show-detail-prd ._tab-index > ._img-link').siblings().removeClass('active');
			$(`.show-detail-prd ._tab-index ._img-link > ._img[tab-index='${nextTabIndex}']`).parent().addClass('active');
			product.setCurrentActiveItem();
		});
	},
	previousSlide: function(){
		$('.show-detail-prd ._buttons ._btn-previous').click(function(e){
			e.preventDefault();
			let tabIndex = product.getActiveItem();
			var nextTabIndex = 0;
			if (tabIndex <= 1) {
				nextTabIndex = product.getLengthSlider();
			}
			else
			{
				nextTabIndex = --tabIndex;
			}
			$('.show-detail-prd ._tab-index > ._img-link').siblings().removeClass('active');
			$(`.show-detail-prd ._tab-index ._img-link > ._img[tab-index='${nextTabIndex}']`).parent().addClass('active');
			product.setCurrentActiveItem();
		});
	}
}

$(document).ready(function(){
	menu.init();
	overlay.init();
	page.init();
	navigation.init();
	header.init();
	product.init();
});

