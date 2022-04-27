/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  //test data
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ]

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
      <div>${tweet.created_at}</div>
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
  //then appends it to #tweets-container
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $('#tweets-container').append(createTweetElement(tweet));
    }
  };

  renderTweets(data);

  const tweetRefresh = function(event) {
    event.preventDefault();
    const formData = $(this).serialize();
    $.ajax({
      method: 'POST',
      data: formData,
      url: '/tweets',
    })
  };

  $('form').submit(tweetRefresh);

});