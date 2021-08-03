$(document).ready(function () {
	console.log("aqui ready menu.js");
		
	//Cerramos todos los submenús
	/*function closeMenu(){
		$('.menu > li').has('ul').addClass('closed');
		$('.menu > li').find('ul').removeClass('show')
		
		//window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
		
	};*/
	
	//closeMenu();
	
	//Codigo que muestra y oculta menú al hacer clic
	/*$(document).on('click', '.menu li', function(){
		//var dady = $(this).parent();
		var dady = $(this);
		
	    if($(dady).is('.closed')){
	    	closeMenu();
	      	$(dady).removeClass('closed');
			$(dady).find('ul').addClass('show');
			window.scrollTo(0, 0);
	    } else {
	    	closeMenu();
			$(dady).find('ul').removeClass('show');
	    }
		
	});*/
	
	/*$(document).on('click', '.menu li ul > li', function(){
		console.log(".menu li ul li > ul");
		
		if( $('.menu li ul li > ul').css("visibility") == "hidden"){
			$('.menu li ul li > ul').css("visibility", "visible");
			$('.menu li ul > li').removeClass('closed');
		}else{
			$('.menu li ul li > ul').css("visibility", "hidden");
		}
		
	});*/
	
	/*$(document).on('mouseover', '.menu > li', function(){
		var dady = $(this);
		
	    if($(dady).is('.closed')){
	    	closeMenu();
	      	$(dady).removeClass('closed');
			$(dady).find('ul').addClass('show');
			window.scrollTo(0, 0);
	    } else {
	    	closeMenu();
			$(dady).find('ul').removeClass('show');
	    }
	});
	
	$(document).on('mouseover', '.menu > li a', function(){
		var dady = $(this);
		
	    if($(dady).is('.closed')){
	    	closeMenu();
	      	$(dady).removeClass('closed');
			$(dady).find('ul').addClass('show');
			window.scrollTo(0, 0);
	    } else {
	    	closeMenu();
			$(dady).find('ul').removeClass('show');
	    }
	});*/
	
	/*$('html').click(function() {
		$('.collapse').hide();
	});*/
});  




