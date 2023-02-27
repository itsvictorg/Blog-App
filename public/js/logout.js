

const logout = async () => {
    // TODO: Add a comment describing the functionality of this expression
    const response = await fetch('/api/users/logout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      // TODO: Add a comment describing the functionality of this statement
      document.location.replace('/');
      alert('You have been logged out')
    } else {
      alert('Not logged in');
    }
  };
  
  document.getElementById('logout').addEventListener('click', logout);