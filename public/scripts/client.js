/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  //Takes in one tweet object returning HTML with values inserted
  const createTweetElement = function(tweet) {
    return $(`
    <article class="tweet">
    <header>
      <div>
        <img src="${tweet.user.avatars}" alt="Profile picture">
        <div>${tweet.user.name}</div>
      </div>
      <div class="username">${tweet.user.handle}</div>
    </header>
    <p>
      ${tweet.content.text}
    </p>
    <footer>
      <div>${timeago.format(tweet.created_at)}</div>
      <div>
        <i id="flag" class="fa-solid fa-flag fa-xs"></i>
        <i id="retweet" class="fa-solid fa-share fa-xs"></i>
        <i id="heart" class="fa-solid fa-heart fa-xs"></i>
      </div>
    </footer>
  </article>
  `);
  };

  //Takes in an array of tweets passing an individual tweet to createTweetElement
  //then prepend it to #tweets-container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').prepend(createTweetElement(tweet));
    }
  };

  //Display all tweets in the db after emptying the container then reset input field
  const loadTweets = function() {
    $.ajax('/tweets', { method: 'GET' })
      .then(function(res) {
        $('#tweets-container').empty();
        $('#tweet-text').val('');
        $('.counter').text('140');
        renderTweets(res);
      });
  };
  loadTweets();

  //Send new tweet to db if tweet is a valid length
  //alert user if not valid length
  //reload tweets from db
  const sendTweet = function(event) {
    event.preventDefault();
    const counter = Number($(this).find('.counter').text());
    if (counter >= 140) {
      return alert('Tweet cannot be empty');
    } else if (counter < 0) {
      return alert('Tweet is too long');
    }
    const formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      data: formData,
      url: '/tweets',
    })
      .then(() => {
        loadTweets();
      });
  };
  $('form').submit(sendTweet);
});