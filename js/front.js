(function($){
	
	"use strict";

	window.themeFrontCore = {
	
		/**
			Constructor
		**/
		initialize: function() {

			var self = this;

			$(document).ready(function(){
				self.build();
				self.events();
			});

		},
		/**
			Build page elements, plugins init
		**/
		build: function() {
			
			var self = this;
			
			// Setup body classes
			this.setupDocumentClasses();
			
			// page preloader
			this.initPreloader();
			
			// Add additional markup for form inputs
			this.wrapFormInputs();
			
			// Headroom
			this.setupHeader();
			
			// Setup home sections
			this.setupHomeSections();
			
			// Setup animations
			this.setupAnimations();
			
			// Create a slider
			this.setupSlider();
			
			// Setup hero sections
			this.setupHeroSections();
			
			// Setup menus
			this.setupMenu();
			
			// Setup carousels
			this.setupCarousels();
			
			// Setup tabs
			this.setupTabs();
			
			// Setup footer
			this.setupFooter();
			
			// Setup one-page scrolling
			this.setupOnePage();
			
			// Go Top link
			this.setupGoTop();
			
			// Lazy YouTube videos
			this.setupVideos();
			
			// Portfolio Galleries
			this.setupPortfolio();
			
			// Init Lightbox
			this.setupLightbox();
			
			// Contact form sender
			this.bindContactForm();
			
		},
		/**
			Set page events
		**/
		events: function() {
			
			var self = this;

			// Force page scroll position to top at page refresh
			$(window).on('beforeunload', function(){
			  $(window).scrollTop(0);
			});

			// Re-init some sections of window resize
			$( window ).on( 'resize', function() {
				self.setupHeroSections();
				self.setupFooter();			
				self.setupHomeSections();	
			});

			// Skip intro
			$('#skip-intro').on( 'click', function() {
				$('html, body').animate({
					scrollTop: $("#content").offset().top - 80
				}, 800);
				return false;
			});

			// Comment reply link
			$('.reply-link').on( 'click', function() {
				$('html, body').animate({
					scrollTop: $("#comment-form").offset().top
				}, 2000);
				return false;
			});
			
		},
		/**************************************************************************************************************************************************/
		/** init preloader **/
		initPreloader: function() {
			
			// Close preloader
			$(window).on( 'load', function() {
				
				if( $('body.preloader').length ) {
					
					$('body').waitForImages({
						waitForAll: true,
						finished: function() {
							$('#preloader').fadeOut( 1200, function() {
								$('body.preloader').removeClass('preloader');
								$(this).remove();
							});
							
						}
					});
					
					if( $('.ie7, .ie8, .ie9, .ie10').length ) {
						$('#preloader').remove();
						$('body').removeClass('preloader');
					}
					
				}
			});
			
		},
		/** setup documents classes **/
		setupDocumentClasses: function() {
		
			$('html').removeClass('no-js');
			
			// Detect mobile browser
			if( (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) || (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.platform)) ) {
				$('html').addClass('mobile');
			}
			
			// Detect MAC
	    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Mac') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
	      $('html').addClass('mac');
	    }
			
			// Detect IE
			if (navigator.appName == "Microsoft Internet Explorer") {
    		var ie = true;
    		var ua = navigator.userAgent;
    		var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
    		if (re.exec(ua) != null) {
    	    var ieVersion = parseInt(RegExp.$1);
        	$('html').addClass('ie' + ieVersion );
    		}
			} 
			
		},
		/** wrap inputs with additional markup **/
		wrapFormInputs: function() {
			
			var $inputs = $('input[type=text], input[type=number], input[type=password], input[type=email], input[type=search], input[type=tel], input[type=url], textarea, select');
			
			$inputs.wrap('<div class="input-wrapper"></div>');
			
			$inputs.on( 'focus', function() {
				$(this).parents('.input-wrapper').addClass('hovered');
			});
			
			$inputs.on( 'focusout', function() {
				$(this).parents('.input-wrapper').removeClass('hovered');
			});
			
		},
		/** sticky header **/
		setupHeader: function() {
			
			$(".fixed-header #header, .transparent-header #header").headroom({
			  "offset": 200,
			  "tolerance": 0,
			  "classes": {
			    "initial": "animated",
			    "pinned": "headroom--pinned",
			    "unpinned": "headroom--unpinned"
			  }
			});
			
		},
		/** home slider **/
		setupSlider: function() {
			
			$("#slider").sequence({
        pagination: true
    	});
    	
    	$('.skip-slider').on( 'click', function() {
				$('html, body').animate({
					scrollTop: $(window).height()
				}, 800);
    		return false;
    	});
			
		},
		/** fix slider height **/
		setupHomeSections: function() {
			
			var windowHeight = $(window).height();
			$(".home .section").css('min-height', windowHeight + 'px' );
			
		},
		/** animations **/
		setupAnimations: function() {
			
		  var wow = new WOW({
				boxClass:     'wow',
				animateClass: 'animated',
				offset:       0,
				mobile:       true,
				live:         true,
				callback:     function(box) {
					
					var $box = $(box);
					
					if( $box.hasClass('animationNuminate') ) {
						$box.each( function() {
							var $item = $(this);
							var to = $item.data('to');
							
							$item.numinate({ format: '%counter%', from: 1, to: to, runningInterval: 2000, stepUnit: 5});
						});
					}
					
				}
			});
			
		  wow.init();
			
		},
		/** hero sections **/
		setupHeroSections: function() {
			
			var $hero = $('#hero');
			
			if( $hero.length ) {
			
				var heroHeight = $hero.height(),
				$heroText = $hero.find('.intro-text'),
				heroTextHeight = $heroText.height();
				
				$heroText.css( 'margin-top', '-' + heroTextHeight / 2 + 'px' );
				
			}
			
		},
		/** mobile responsive header menu **/
		setupMenu: function() {
			
			// Mobile menu effects
			var $menu = $( '#header-nav' );
			$menu.dlmenu({
				'backLabel' : $menu.data('back-label')
			});
			
		},
		/** setup carousels **/
		setupCarousels: function() {
			
			// Swiper carousel, news posts
			$('.news-carousel').swiper({
				loop: true,
				pagination: '.swiper-pagination',
				freeMode: true,
				spaceBetween: 30,
				slidesPerView: 'auto',
				paginationClickable: true
			});
			
			// Swiper carousel, screenshots
			$('.screenshots-carousel').swiper({
				loop: true,
				spaceBetween: 0,
				centeredSlides: true,
				slidesPerView: 'auto'
			});
			
			// OWL carousel
			$('.owl-carousel').owlCarousel({
		    items: 1,
		    navigation: true,
		    navigationText: ['', ''],
		    singleItem: true,
		    autoHeight: true,
		    transitionStyle: 'fade'
			});
			
			setInterval(function(){
			 $(".owl-carousel").each( function(){
			    $(this).data('owlCarousel').updateVars();
			 });
			},1500);
			
			// Team members carousel
			var teamCarousel = $('#team .items').owlCarousel({
		    items: 1,
		    singleItem: true,
		    transitionStyle: 'fade',
		    afterAction: function( carousel ) {
		    	
		    	var newBg = carousel.find('.item').eq( this.owl.currentItem ).data('bg'),
					$parentSection = carousel.parents('.section').css('background-image', 'url(' + newBg + ')');
		    	
					$('#team .team-pagination a').removeClass('current');
					$('#team .team-pagination a').eq( this.owl.currentItem ).addClass('current');

		    }
			}).data('owlCarousel');
			
			// Team carousel custom pagination
			$('#team .team-pagination a').on( 'click', function() {
				
				var slideNum = $('#team .team-pagination a').index( $(this) );
				teamCarousel.goTo( slideNum );
				
				return false;
			});
			
		},
		/** tabs script **/
		setupTabs: function() {
			
			$('.services').each( function() {
				
				var $tabs = $(this);
				var $pagination = $tabs.next('.services-pagination').find('.tab-link');
				
				$pagination.on( 'click', function() {
					
					var target = $(this).attr('href');
					var $target = $( target );
					$tabs.find('.service-item').hide().removeClass('selected');
					
					var bgImg = $target.data('image');
					
					$target.fadeIn(300, function() {
						$target.addClass('selected');
						
						$('html, body').animate({
							scrollTop: $target.offset().top - 20
						}, 800);
						
					});
					
					$pagination.removeClass('selected');
					
					$(this).addClass('selected');
					
					return false;
				});
				
			});
			
		},
		/** setup footer **/
		setupFooter: function() {
			
			var self = this;
			
			if( $( window ).width() < 992 ) {
				$('div.section').last().css('margin-bottom', '0px');
			} else {
				
				if( $('body').hasClass('parallax-footer') && $( window ).width() >= 992 ) {
					var $footer = $('#footer');
					
					$footer.waitForImages({
						waitForAll: true,
						finished: function() {
							
							$('#content-wrapper').css( 'margin-bottom', $footer.height() + 'px' );
							
						}
					});	
					
				}
				
			}
			
		},
		/** setup one-page scroller **/
		setupOnePage: function() {
			
			var self = this;
			
			// Preload images
			if( $('body.home-agency').length ) {
				
				self.preloadImages([
			    'images/demo-images/home_1_slider_1.jpg',
			    'images/demo-images/home_1_slider_2.jpg',
			    'images/demo-images/home_1_slider_3.jpg',
			    'images/demo-images/home_1_slider_4.jpg',
			    'images/demo-images/home_1_slider_5.jpg'
				]);
				
			}
			
			// One-page navigation
			if( $('body.one-page').length ) {
			
				$('body.one-page #header-menu').singlePageNav({
					currentClass: 'current-link',
					updateHash: true,
					offset: 50,
					speed: 1100,
					filter: ':not(.external)',
					easing: 'easeOutBack'
				});
				
			}
			
		},
		/** go top link **/
		setupGoTop: function() {
		  $.scrollUp({
		    scrollName: 'scrollUp',
		    topDistance: '1000',
		    topSpeed: 100,
		    animation: 'slide', // Fade, slide, none
		    animationInSpeed: 500, // Animation in speed (ms)
		    animationOutSpeed: 500, // Animation out speed (ms)
		    scrollText: '', // Text for element
		    activeOverlay: false, // Set CSS color to display scrollUp active point, e.g '#00FFFF'
		  });
		},
		/** lazy YouTube videos **/
		setupVideos: function() {
			
			var $videos = $('.lazy-video');
			
			$videos.each( function() {
				$(this).lazyYT();
			});
			
		},
		/** Portfolio galleries **/
		setupPortfolio: function() {
			
			$('.portfolio').each( function() {
				
				var $portfolio = $(this);
				var $galleryElem = $portfolio.find('.portfolio-gallery');
				var gallery = $galleryElem.justifiedGallery({
					sizeRangeSuffixes: {},
					rowHeight: 400,
					maxRowHeight: 200,
					margins: 0,
					captionSettings: {
						visibleOpacity: 0.9,
						animationDuration: 300,
						nonVisibleOpacity: 0.0
					},
					captions: true
				});
				
				$portfolio.find('.portfolio-header .filters a').on( 'click touchstart', function() {

					$portfolio.find('.portfolio-header .filters a').removeClass('selected');
					
					$(this).addClass('selected');
					
					var filterClass = $(this).data('filter');
					
					$galleryElem.justifiedGallery({
						'filter': filterClass
					});
					
					return false;
				});
				
			});
			
		},
		/** setup LightBox **/
		setupLightbox: function() {
			
			// init lightbox
			if( $('.lightbox').length ) {
				$('.lightbox').nivoLightbox({
					effect: 'fadeScale'
				});				
			}
			
		},
		/** send a contact form **/
		bindContactForm: function() {
			
			var self = this;
			
			$('#contact-form').submit( function() {
				
				var form = $(this);
				
				var nameInput = $('#input-name');
				var name = nameInput.val();
		
				var emailInput = $('#input-email');
				var email = emailInput.val();
				
				var phoneInput = $('#input-phone');
				var phone = phoneInput.val();
				
				var subject = $('#input-subject').val();
				
				var messageInput = $('#input-message');
				var message = messageInput.val();
				
				if( $.trim( name ) == '' ) {
					nameInput.focus();
					return false;
				} 
					
				if( $.trim( email ) == '' || !self.isValidEmailAddress( email ) ) {
					emailInput.focus();
					return false;
				} 
					
				if( $.trim( message ) == '' ) {
					messageInput.focus();
					return false;
				} 
					
				$.ajax({
					url: 'contact-form.php',
					type: "POST",
					data: {
						'name' : name,
						'email' : email,
						'phone' : phone,
						'subject' : subject,
						'message' : message
					},
					beforeSend: function() {
						$('#contact-form input, #contact-form textarea, #contact-form button').attr('disabled', 'disabled');
						$('#contact-form').fadeTo(500, '0.7');
					},
					success: function() {
				
						form.html( '<h4>Your message has been sent. Thank you!</h4>' ).css('opacity', '1');
				
					}
				});
				
				return false;
			});
			
		},
		/**************************************************************************************************************************
			Utils
		**************************************************************************************************************************/
		/**
			Check email address
		**/
		isValidEmailAddress: function( emailAddress ) {
			var pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
 			return pattern.test( emailAddress );
		},
		preloadImages: function(arrayOfImages) {
	    $(arrayOfImages).each(function(){
        $('<img/>')[0].src = this;
	    });
		}

	}

	window.themeFrontCore.initialize();

})( window.jQuery );