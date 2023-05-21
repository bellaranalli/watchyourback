(function() {
  const formLogin = document.getElementById('form-login');
  const inputMail = document.getElementById('email');
  const inputPassword = document.getElementById('password');
  const githubLoginButton = document.getElementById('github-login');

  formLogin.addEventListener('submit', async (event) => {
    event.preventDefault();

    const data = {
      email: inputMail.value,
      password: inputPassword.value
    };

    // Verificar si el correo electrónico es adminCoder@coder.com
    const isAdmin = (data.email === 'adminCoder@coder.com');

    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          localStorage.setItem('token', data.access_token);

          // Crear el rol de administrador si el correo electrónico es adminCoder@coder.com
          if (isAdmin) {
            createAdminRole();
          }

          // Determinar el estado del usuario (activo o inactivo)
          const userStatus = (data.isLoggedIn) ? 'activo' : 'inactivo';

          // Guardar el estado del usuario en el local storage
          localStorage.setItem('userStatus', userStatus);

          window.location.href = 'private.html';
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.log('Error', error);
      });
  });

  githubLoginButton.addEventListener('click', () => {
    window.location.href = '/auth/github';
  });

  function createAdminRole() {
    console.log('Se ha creado el rol de administrador');
  }


})();