const createTweetElement = (tweet) => {
  const newTweet = $("#old-tweet").append(`
    <div class="previous-tweets">
      <section class="profile-identifier">
        <div class="avatar-fullname">
          <img class="avatar" src="${tweet.user.avatars}">
          <h2 class="name">${tweet.user.name}</h2>
        </div>
        <h3 class="profile-name">${tweet.user.handle}</h3>
      </section>
      <section>
        <div class="create-tweeter-post">
        <div class="prev-tweets">
          <h2>${tweet.content.text}</h2></div>
          <hr>
        </div>
        <div class="tweet-btn-counter">
          <span class="time-till-tweet">
            <p>${timeago.format(tweet.created_at)}</p>
          </span>
          <span class="react-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </div>
      </section>
    </div>      
  `);
  return newTweet;
};

const renderTweets = (tweetData) => {
  $("#old-tweet").empty();
  tweetData.forEach((tweet) => {
    $("#old-tweet").append(createTweetElement(tweet));
  })
};

$(document).ready(() => {
  fetchTweets();
  $("#tweet-form").submit((event) => {
    event.preventDefault();

    const tweetData = $(this).serialize();
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/tweets/",
      data: tweetData,
      success: () => {
        fetchTweets();
      },
    });
  });
});

const fetchTweets = () => {
  $.ajax({
    type: "GET",
    url: "http://localhost:8080/tweets/",
    success: (data) => {
      renderTweets(data);
    },
  });
};