$(document).ready(function() {

  const maxTweetLength = 140;
  $('#tweet-text').on('input', function() {
    let remainingCharacters = maxTweetLength - $(this).val().length;
    $(this).next('.tweet-footer').children('.counter').text(remainingCharacters);
  })
});
