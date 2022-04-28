//Update the character counter changing red when numbers are negative
$(document).ready(function() {
  const maxTweetLength = 140;
  $('#tweet-text').on('input', function() {
    let remainingCharacters = maxTweetLength - $(this).val().length;
    let output = $(this).next().children('output');
    if (remainingCharacters < 0) {
      output.addClass('counter-red');
    }
    if (remainingCharacters >= 0) {
      output.removeClass('counter-red');
    }
    output.text(remainingCharacters);
  });
});
