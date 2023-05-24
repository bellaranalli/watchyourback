/*fetch('http://localhost:8080/private.html', {
  method: 'GET',
  credentials: 'include' // Incluye las cookies en la solicitud
})
  .then(response => response.json())
  .then(data => {
    // Actualiza los elementos HTML con la información del usuario
    document.getElementById('first_name').textContent = data.firstName;
    document.getElementById('last_name').textContent = data.lastName;
    document.getElementById('email').textContent = data.email;
  })
  .catch(error => {
    console.error('Error:', error);
  });*/