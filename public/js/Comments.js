async function commentsFormHandler(event) {
  event.preventDefault();

  const comments_content = document.querySelector('textarea[name="comment-body"]').value.trim();

  const posts_content = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
  ];

  if (comments_content) {
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        posts_id,
        comments_content
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert(response.statusText);
    }
  }
};

document.querySelector('.comment-form').addEventListener('submit', commentsFormHandler);