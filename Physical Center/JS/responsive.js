// JavaScript Dokument

// ######################################################################################
	// Responsive
	// ######################################################################################

	$(document).ready(function() {
        
		ud_resp_leistung();
		ud_resp_about();
		
		$(window).resize(function() {
         	ud_resp_leistung(); 
			ud_resp_about(); 
        });
		
		function ud_resp_about() {
		
			var UD_HEIGHT = $(window).height();
			var UD_WIDTH = $(window).width();
			
			if(UD_WIDTH > 800) {
				$('.ud_UberUns').css('height',(UD_HEIGHT-((UD_HEIGHT/100)*5)-240));
			} else {
				$('.ud_UberUns').css('min-height',150);
			}
		
		}
		
		function ud_resp_leistung() {
			
			var UD_HEIGHT = $(window).height();
			var UD_WIDTH = $(window).width();
			
			if(UD_WIDTH > 1150) {
				$('.ud_leistungen ul li').css('height',(UD_HEIGHT-((UD_HEIGHT/100)*5)-240));
			} else {
				$('.ud_leistungen ul li').css('min-height',350);
			}
			
		}
				
    });