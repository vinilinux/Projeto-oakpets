function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('backoffice');
    localStorage.removeItem('user');
    window.location.href = 'login.html'
}