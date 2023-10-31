
function acesso() {

    const data = {
        login: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("api/usuarios/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    }).then(async function (response) {
        if (response.status === 200) {
            clearForm()
            const data = await response.json()
            const { user, token } = data
            console.log('user', user)
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', token)
            window.location.href = '/home.html'
        }
    })
}


function clearForm () {
    document.querySelector('#email').value = ''
    document.querySelector('#password').value = ''
}
