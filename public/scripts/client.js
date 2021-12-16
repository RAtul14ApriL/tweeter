$(document).ready(() => {

$.ajax({
  url: 'http://localhost:8080/tweets',
  method: 'GET'
})
.then((response)=> {
  response.forEach((user) => {
    $("#old-tweet").append(`
    <div class="previous-tweets">
      <section class="profile-identifier">
        <div class="avatar-fullname">
          <img class="avatar" src="${user.user.avatars}">
          <h2 class="name">${user.user.name}</h2>
        </div>
        <h3 class="profile-name">${user.user.handle}</h3>
      </section>
      <section>
        <div class="create-tweeter-post">
        <div class="prev-tweets">
          <h2>${user.content.text}</h2></div>
          <hr>
        </div>
        <div class="tweet-btn-counter">
          <span class="time-till-tweet">
            <p>${timeago.format(user.created_at)}</p>
          </span>
          <span class="react-icons">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </span>
        </div>
      </section>
    </div>`);
  })
})

// const $button = $(".tweeter-btn");
// $button.submit((event) => {
//   event.preventDefault();
//   console.log('hello')
// })
// $.ajax({
//   type: "POST",
//   url: "index.html"
// })

});

// $.ajax({
//   type: "POST",
//   url: "process.php",
//   data: formData,
//   dataType: "json",
//   encode: true,
// })