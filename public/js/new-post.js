async function newFormHandler(event) {
    event.preventDefault();
  
    console.log(document.getElementById('new-post-title'))
    const title = document.getElementById('new-post-title').value;
    const post_text = document.getElementById('new-post-input').value;
  
    const response = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
      alert('new post made')
    } else {
      alert(response.statusText);
    }
  }
  
  document.getElementById('new-post').addEventListener('click', newFormHandler);