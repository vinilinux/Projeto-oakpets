
function acesso() {

    const data = {
        login: document.querySelector("#email").value,
        password: document.querySelector("#password").value
    }

    fetch("auth/login",{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)

    }).then(async function (response) {
        if (response.status === 200) {
            clearForm()
            const databack = await response.json()
            const {token} = databack
            localStorage.setItem('user', data.login)
            localStorage.setItem('token', token)
            localStorage.setItem('backoffice', 'true')
            window.location.href = '/home.html'
        }
    })
}


function clearForm () {
    document.querySelector('#email').value = ''
    document.querySelector('#password').value = ''
}
