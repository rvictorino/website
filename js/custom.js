// pre-loader fadeout animation
$(window).load(function(){
	$('.preloader-wrapper').fadeOut();
});


// hero height
var winH = $(window).height();		
$('.hero-height').height(winH);			
$(window).resize(function() {				
	var winH = $(window).height();
	$('.hero-height').height(winH);				
});


$(document).ready(function(){
	if(!device.tablet() && !device.mobile()){
		//parallax effect
		$('section[data-type="parallax-section"]').each(function(){
			$(this).parallax("50%", 0.3);
		});
		
		//fixed background for parallax section on desktop
		$('section[data-type="parallax-section"]').each(function(){
			$(this).css({'background-attachment': 'fixed'});
		});
	}
	
	
	// wow effect plugin
	var wow = new WOW(
	    {
			boxClass:'wow',
			animateClass:'animated',
			offset:150,
			mobile:false,
			live:true
	    }
	);
	wow.init();
	
	
	// menubar animation
	$('.menubar').on('click', function(){
		$(this).toggleClass('menubar-active');
		$('.nav-wrapper').toggleClass('nav-wrapper-active');
	});
	
	$('.menu-overlay').on('click', function(){
		$('.menubar').toggleClass('menubar-active');
		$('.nav-wrapper').toggleClass('nav-wrapper-active');
	});
	
	// nav menu reveal
	$('.main-nav a').on('click', function(){
		$('.nav-wrapper').removeClass('nav-wrapper-active');
		$('.menubar').removeClass('menubar-active');
	});
	
	
	// animatescroll
	$('.animatescroll-link').on('click', function(){
		return false;
	});
		
		

	$('.progress-bar > span').each(function(){
		var $this = $(this);
		var width = $(this).data('percent');
		$this.css({
			'transition' : 'width 2s'
		});
		
		setTimeout(function() {
			$this.appear(function() {
					$this.css('width', width + '%');
			});
		}, 500);
	});
	
	
	
	// isotope filter portfolio
	$('.portfolio-items').imagesLoaded(function(){
		$('.portfolio-items').show();
		$('.portfolio-items').isotope({
			filter:'*',
			layoutMode:'masonry',
			animationOptions:{
				duration:750,
				easing:'linear'
			}
		});
	});	
	$('.filter').find('a').click(function(){
			$('.portfolio-items').isotope({ 
				filter	: $(this).attr('data-filter'),
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});
		return false;
	});	
	$(window).resize(function(){
			$('.portfolio-items').isotope({ 
				filter	: $('.filter').find('a.active').attr('data-filter'),
				animationOptions: {
					duration: 750,
					easing: 'linear',
					queue: false,
				}
			});
		return false;
	});
	$('.filter a').click(function(){
		if (!$(this).hasClass('active')){
			$('.filter a').removeClass('active');
			$(this).addClass('active');
		}
	});
	
	
	// portfolio pop-up
	$('.portfolio-mfp').magnificPopup({
		type: 'image',
		gallery: {
			enabled: true
		}
	});
	
	
	// fun facts counter
	$('.fun-fact-counter').counterUp({
		delay: 10,
		time: 1500
	});
	
	
	// testimonial carousel
	$(".testimonial-carousel").owlCarousel({
		items: 1,
		loop: true,
		margin: 0,
		autoplay: true,
		nav: true,
		navText: ['<i class="fa fa-chevron-left"></i>', '<i class="fa fa-chevron-right"></i>'],
		autoplayTimeout: 7000,
		autoplayHoverPause: false,
		dots: false
	});

	function formSubmit(form){
        alert('submit');
        $.ajax({
            type: "POST",
            url: "inc/contact-form.php",
            data: {
                "name": $("#cname").val(),
                "email": $("#cemail").val(),
                "subject": $("#csubject").val(),
                "message": $("#cmessage").val(),
                "g-recaptcha-response": $("#g-recaptcha-response").val()
            },
            dataType: "json",
            success: function(data){
                alert('success');
                alert(data);
				$('.thank-message').slideDown();
				$('.csubmit').attr("disabled", "disabled");
				$('.thank-message-remove').click(function(){
					$("#cname").val("");
					$("#cemail").val("");
					$("#csubject").val("");
					$("#cmessage").val("");
					$('.thank-message').slideUp();
					$('.csubmit').removeAttr("disabled");
				});
            }
        });
        return false;
    }
	// contact form validation
    $(".cform").validate({
        submitHandler: function(form){formSubmit(form)}
    });
	
	
	// custom google map
/*
	var latitude = 51.5255069,
		longitude = -0.0836207,
		map_zoom = 14;
	var is_internetExplorer11= navigator.userAgent.toLowerCase().indexOf('trident') > -1;
	var marker_url = ( is_internetExplorer11 ) ? 'img/marker.png' : 'img/marker.svg';
	var	main_color = '#000000',
		saturation_value= -100,
		brightness_value= 20;
	var style= [ 
		{
			elementType: "labels",
			stylers: [
				{saturation: saturation_value}
			]
		},  
		{
			featureType: "poi",
			elementType: "labels",
			stylers: [
				{visibility: "off"}
			]
		},
		{
			featureType: 'road.highway',
			elementType: 'labels',
			stylers: [
				{visibility: "off"}
			]
		}, 
		{ 	
			featureType: "road.local", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"} 
			] 
		},
		{ 
			featureType: "road.arterial", 
			elementType: "labels.icon", 
			stylers: [
				{visibility: "off"}
			] 
		},
		{
			featureType: "road",
			elementType: "geometry.stroke",
			stylers: [
				{visibility: "off"}
			]
		}, 
		{ 
			featureType: "transit", 
			elementType: "geometry.fill", 
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "poi",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.government",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.sport_complex",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.attraction",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "poi.business",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "transit.station",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "landscape",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]						
		},
		{
			featureType: "road",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		},
		{
			featureType: "road.highway",
			elementType: "geometry.fill",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}, 
		{
			featureType: "water",
			elementType: "geometry",
			stylers: [
				{ hue: main_color },
				{ visibility: "on" }, 
				{ lightness: brightness_value }, 
				{ saturation: saturation_value }
			]
		}
	];
	var map_options = {
		center: new google.maps.LatLng(latitude, longitude),
		zoom: map_zoom,
		panControl: false,
		zoomControl: false,
		mapTypeControl: false,
		streetViewControl: false,
		mapTypeId: google.maps.MapTypeId.ROADMAP,
		scrollwheel: false,
		styles: style,
	}
	var map = new google.maps.Map(document.getElementById('google-container'), map_options);			
	var marker = new google.maps.Marker({
		position: new google.maps.LatLng(latitude, longitude),
		map: map,
		visible: true,
		icon: marker_url,
	});
	function CustomZoomControl(controlDiv, map) {
		var controlUIzoomIn= document.getElementById('g-map-zoom-in'),
			controlUIzoomOut= document.getElementById('g-map-zoom-out');
		controlDiv.appendChild(controlUIzoomIn);
		controlDiv.appendChild(controlUIzoomOut);
		google.maps.event.addDomListener(controlUIzoomIn, 'click', function() {
			map.setZoom(map.getZoom()+1)
		});
		google.maps.event.addDomListener(controlUIzoomOut, 'click', function() {
			map.setZoom(map.getZoom()-1)
		});
	}
	var zoomControlDiv = document.createElement('div');
	var zoomControl = new CustomZoomControl(zoomControlDiv, map);
	map.controls[google.maps.ControlPosition.LEFT_TOP].push(zoomControlDiv);
*/
});


// header reveal animation
$(window).scroll(function(){
	var scroll_top = $(document).scrollTop();
	if(scroll_top >= 100){
		$('.header').removeClass('header-hidden');
		$('.header').addClass('header-visible');
	}else if(!$('.nav-wrapper').hasClass('nav-wrapper-active')){
		$('.header').removeClass('header-visible');
		$('.header').addClass('header-hidden');
	}
});
	
	
// back to top button
$(window).scroll(function(){
	if($(this).scrollTop() > 100){
		$('.back-to-top').addClass('back-to-top-visible');
		$('.back-to-top').removeClass('back-to-top-hidden');
	}else{
		$('.back-to-top').removeClass('back-to-top-visible');
		$('.back-to-top').addClass('back-to-top-hidden');
	}
});