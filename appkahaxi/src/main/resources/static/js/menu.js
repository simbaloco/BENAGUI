$(document).ready(function () {
	console.log("aqui ready menu.js")	
	//Cerramos todos los submenús
	function closeMenu(){
		$('.menu > li').has('ul').addClass('closed');
		$('.menu > li').find('ul').removeClass('show')
		
		//window.scrollTo(0, document.body.scrollHeight || document.documentElement.scrollHeight);
		
	};
	
	//closeMenu();
	
	//Codigo que muestra y oculta menú al hacer clic
	$(document).on('click', '.menu > li', function(){
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
		
	});

});  




