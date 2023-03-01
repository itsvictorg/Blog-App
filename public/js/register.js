const loginFormHandler = async (event) => {
    
    event.preventDefault();
  
    
    const username = document.getElementById('username-input').value.trim();
    const password = document.getElementById('password-input').value.trim();
    
  
    if (username && password) {
      
      const response = await fetch('/api/users/register', {
        method: 'POST',
        body: JSON.stringify({ password, username }),
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
  

