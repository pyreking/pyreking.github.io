var maxLength = 900;
$('textarea').keyup(function() {
  var length = $(this).val().length;
  var length = maxLength-length;
  $('#remaining').text(length);
});
