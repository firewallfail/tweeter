/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //remove html from user post to prevent cross-site scripting
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //Takes in one tweet object returning HTML with values inserted
  const createTweetElement = function(tweet) {
    return $(`
    <article class="tweet">
    <header>
      <div>
        <img src="${escape(tweet.user.avatars)}" alt="Profile picture">
        <div>${escape(tweet.user.name)}</div>
      </div>
      <div class="username">${escape(tweet.user.handle)}</div>
    </header>
    <p>
      ${escape(tweet.content.text)}
    </p>
    <footer>
      <div>${timeago.format(escape(tweet.created_at))}</div>
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
      })
      .catch((err) => console.log(err));
  };
  loadTweets();

  //Send new tweet to db if tweet is a valid length
  //alert user if not valid length
  //reload tweets from db
  const sendTweet = function(event) {
    event.preventDefault();
    $('#submit-error').slideUp(500);
    const counter = Number($(this).find('.counter').text());
    if (counter >= 140) {
      $('#submit-error').text('Tweet cannot be empty');
      $('#submit-error').slideDown(500);
      return;
    } else if (counter < 0) {
      $('#submit-error').text('Tweet is too long');
      $('#submit-error').slideDown(500);
      return;
    }
    const formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      data: formData,
      url: '/tweets',
    })
      .then(() => {
        loadTweets();
      })
      .catch((err) => console.log(err));
  };
  $('form').submit(sendTweet);

  $('.tweet-toggle').on('click', function() {
    $(document).find('.tweet-section').slideToggle(500);
    $('#tweet-text').select();
  })
});