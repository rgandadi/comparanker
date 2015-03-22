$(function() {
	$('.player').on('click', function() {
		$('input[name="result"]').val($(this).find('input').val());
		$('form')
			.attr('action', '/update')
			.submit();
	});
});