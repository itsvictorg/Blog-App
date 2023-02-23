

async function updateButtonHandler(event, route, fields) {
  event.preventDefault();

  let requestBody = {};
  for (let jsonKey of Object.keys(fields)) {
    let elementId = fields[jsonKey];
    console.log(`lookign for #${elementId} to build body (key=${jsonKey})...`);
    
    let valueUserTyped = document.getElementById(elementId).value.trim();
    // only send the value if the user actually typed something
     if (valueUserTyped !== "") {
       requestBody[jsonKey] = valueUserTyped;
     } 
     
     
 

  const response = await fetch(`/api/put-request/${route}`, {
    method: 'PUT',
    body: JSON.stringify(requestBody),
    headers: { 'Content-Type': 'application/json' },
  });

 
 

   if (response.ok) {
    alert('information updated!')
  } else {
    alert('Failed to update');
    
  }
}
}


/* document
  .getElementById('update')
  .addEventListener('click', lFHandler */





