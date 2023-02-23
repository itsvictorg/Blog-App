const loginFormHandler = async (event) => {
    
    event.preventDefault();
  
    const firstName = document.getElementById('first-name-input').value.trim();
    const lastName = document.getElementById('last-name-input').value.trim();
    const username = document.getElementById('username-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    const email = document.getElementById('email-input').value.trim();
  
    if (username && password && lastName && email && firstName) {
      
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ password, username, email, firstName, lastName }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/homepage');
        alert('account created, please log in!')
      } else {
        alert('Please fill in all forms');
      }
    }
};
  
  document
    .getElementById('register')
    .addEventListener('click', loginFormHandler);
  

