(function(){
    const formLogin = document.getElementById('form-register')
    const inputfirst_name = document.getElementById('first_name')
    const inputlast_name = document.getElementById('last_name')
    const inputMail = document.getElementById('email')
    const inputpassword = document.getElementById('password')
    const inputage = document.getElementById('age')

    formLogin.addEventListener('submit', async(event) => {
        event.preventDefault();

        const data = {
            first_name : inputfirst_name.value,
            last_name : inputlast_name.value,
            email: inputMail.value,
            password: inputpassword.value,
            age: inputage.value
        }

        fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            if(data){
                localStorage.setItem('token', data.access_token)
                
               window.location.href = 'login.html'
            }else{
                alert(data.message)
            }
        })
        .catch((error) => {
            console.log('Error', error);
        })
    })
})()