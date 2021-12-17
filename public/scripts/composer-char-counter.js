$(document).ready(() => {
  const $tweetPost = $("#tweet-text"); //Tweet text box
  const $count = $('.counter'); //Character counter
  const $alert = $('.alert-text'); //Alert message if the character limit crossed

  $tweetPost.on('keyup', () => {
    //To change the value of counter while typing the tweet
    $count.val(140 - $tweetPost.val().length);
    if ($tweetPost.val().length > 140) {
      $('.counter').css("color", "red");     //changes the color of the counter
      $alert.html(`× Oops! Tweets cannot be more than 140 characters ×`);  //show the alert
    } else if ($tweetPost.val().length <= 140) {
      $('.counter').css("color", "#545149");      //changes the color of the counter back to its original
      $alert.html("");                        //hides the alert
    }
  });
});