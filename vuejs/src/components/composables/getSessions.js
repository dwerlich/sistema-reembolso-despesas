export function setSessionUsers() {
    const users = {
        url: 'usuarios',
        module: 'usersModule/',
        paramns: {
            index: 0,
            limit: 25,
            email: '',
            name: '',
        }
    }
    localStorage.setItem('Users', JSON.stringify(users));
}

