{
  //method to submit form data for new post using AJAX
  let createPost = function () {
    let newPostform = $("#new-post-form");
    newPostform.submit(function (e) {
      e.preventDefault();

      $.ajax({
        type: "post",
        url: "/posts/create",
        data: newPostform.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data.post);
          $("#post-list-container>ul").prepend(newPost);
          deletePost($(" .delete-post-button", newPost));
        },
        error: function (error) {
          console.log(error.reponseText);
        },
      });
    });
  };

  //method to create post in DOM
  let newPostDom = function (post) {
    return $(`<li id="post-${post._id}">
    <p>
      <li>${post.content}</li>
      <li>${post}</li>

      <li>${post.user.name}</li>
      
      <a class="delete-post-button" href="/posts/delete/${post._id}">Delete post</a>
      
    </p>
  </li>
  <div class="post-comment">
    <form action="comments/create" method="POST">
      <input
        type="text"
        name="content"
        placeholder="type here to add comment..."
      />
      <input type="hidden" name="post" value="${post._id}" />
      <input type="submit" value="Add comment" />
    </form>

    <div class="post-comment-list">
      <ul id="post-comment-${post._id}">
      </ul>
    </div>
  </div>
  `);
  };

  let deletePost = function (deleteLink) {
    console.log(deleteLink);
    $(deleteLink).click(function(e) {
      // console.log("hello");
      e.preventDefault();

      $.ajax({
        type: 'get',
        url: $(deleteLink).prop("href"),
        success: function (data) {
          $(`#post-${data.data.post_id}`).remove();
        },
        error: function (error) {
          console.log(error.reponseText);
        },
      });
    });
  };

  createPost();
}
