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
});