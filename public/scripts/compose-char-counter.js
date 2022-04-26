$(document).ready(function() {

  const maxTweetLength = 140;
  $('#tweet-text').on('input', function() {
    let lengthOfTweet = $(this).val().length;
    console.log(maxTweetLength - lengthOfTweet);
  })
});
