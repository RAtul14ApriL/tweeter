$('.alert-text-over').hide();
$('.alert-text-blank').hide();

$(document).ready(() => {
  const escape = (str) => {
    let div = document.createElement("h2");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  const createTweetElement = (tweet) => {
    const newTweet = $("#old-tweet").append(`
      <div class="previous-tweets">
        <section class="profile-identifier">
          <div class="avatar-fullname">
            <img class="avatar" src="${tweet.user.avatars}">
            <h5 class="name">${tweet.user.name}</h5>
          </div>
          <h5 class="profile-name">${tweet.user.handle}</h5>
        </section>
        <section>
          <div class="create-tweeter-post">
            <div class="prev-tweets">
              <h5>${escape(tweet.content.text)}</h5>
            </div>
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
    for (let i = tweetData.length - 1; i >= 0; i--) {
      const tweetText = createTweetElement(tweetData[i]);
      $("#old-tweet").prepend(tweetText);
    }
  };

  const loadTweets = () => {
    $.ajax({
      type: "GET",
      url: "http://localhost:8080/tweets/",
      success: (data) => {
        renderTweets(data);
      },
    });
  };

  $('.alert-text-over').hide();
  $('.alert-text-blank').hide();
  loadTweets();

  $("#tweet-form").submit((event) => {
    event.preventDefault();
    const tweetPost = document.forms[0][0].value;
    const $alertOver = $('.alert-text-over')
    const $alertBlank = $('.alert-text-blank');
    if (tweetPost.length > 140) {
      $alertOver.show();
      setTimeout(() => {
        $alertOver.fadeOut('fast');
      }, 2000);
      return;
    } else if (!tweetPost) {
      $alertBlank.show();
      setTimeout(() => {
        $alertBlank.fadeOut('fast');
      }, 2000);
      return;
    } else {
      const serializedText = $("#tweet-form").serialize();
      $.post('/tweets', serializedText, (response) => {
        loadTweets();
        $('.new-tweet').hide();
        $("#tweet-text").val("");
        $(".counter").text("140");
      });
    };
  });
  $('.new-tweet').hide();
  $("#show-hide").on('click', () => {
    $('.new-tweet').toggle('slow', () => {
      $("#tweet-text").focus();
    });
  })

  //Scroll-to-top button
  $(window).scroll(() => {
    if ($(this).scrollTop()) {
      $('#to-top-btn').fadeIn();
    } else {
      $('#to-top-btn').fadeOut();
    }
  });

  $("#to-top-btn").on('click', () => {
    $(window).scrollTop(0);
  });
});