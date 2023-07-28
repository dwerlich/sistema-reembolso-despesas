export function setSessionUsers() {
    const users = {
        url: 'usuarios',
        module: 'usersModule/',
        paramns: {
            index: 0,
            limit: 25,
            email: '',
            name: '',
            category: ''
        }
    }
    localStorage.setItem('Users', JSON.stringify(users));
}

