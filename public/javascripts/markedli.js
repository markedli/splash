$(document).ready(function(){
	//  Focus formfocus fields
	//$('.formfocus:first').focus();

	//  Initialize formhint fields
	$('INPUT.formhint, TEXTAREA.formhint').focus(function(){
		if($(this).val() == $(this).attr('title')){
			$(this).val('');
			$(this).removeClass('formhint');
		}
	});

	$('INPUT.formhint, TEXTAREA.formhint').blur(function(){
		if($(this).val() == '' && $(this).attr('title') != ''){
			$(this).val($(this).attr('title'));
			$(this).addClass('formhint');
		}
	});

/*	$('INPUT.formhint, TEXTAREA.formhint').each(function(){
		if($(this).attr('title') == ''){ return; }
		if($(this).val() == ''){ $(this).val($(this).attr('title')); }
		else { $(this).removeClass('formhint'); }
	});*/
	/* clear the form of default text on submit */
	$('form').submit(function(){
		$('.formhint').each(function(){
			if($(this).attr('title') == $(this).val()){
			$(this).val('');
			}
		});
	});

/* signup form stuff */
      $(".submit").click(function(e){
      var that = $(this);
      e.preventDefault();

      if ( $('#signup').attr('submitted') ){
        return;
      }

      if ( $('.textinput').val().length < 1 ){
        $('.holder').effect('shake', { times: 4, distance: 3}, 40);
        return;
      }

      $.ajax({
        type: 'post',
        url: '/subscribe',
        data: $('#signup').serialize(),
        datatype: 'json',
        success: function(data){
          $("<div id=\"thanks\">Thanks! We'll update you through " + 
            data.type + "!</div>")
              .hide()
              .appendTo('h4')
              .slideDown('fast');

          $('.textinput').attr('disabled', true);
          $('#signup').attr('submitted', true);
        },
        error: function(data){
          $("<div id=\"yikes\">Yikes! Something messed up, try again.</div>")
              .hide()
              .appendTo('h4')
              .slideDown('fast');
        },
      });
    });
});
