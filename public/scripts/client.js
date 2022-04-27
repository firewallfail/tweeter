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

  const createTweetElement = function(tweet) {
    return $(`<article class="tweet">
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
        <i id="flag" class="fa-solid fa-flag"></i>
        <i id="retweet" class="fa-solid fa-share"></i>
        <i id="heart" class="fa-solid fa-heart"></i>
      </div>
    </footer>
  </article>`);
  };

  const renderTweets = function(tweets) {
    return null;
  };

  // const $tweet = createTweetElement(tweetData);
  $('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.
});