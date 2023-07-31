export function setSessionUsers() {
    const users = {
        url: 'usuarios/',
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

export function setSessionCategories() {
    const categories = {
        url: 'categorias/',
        module: 'categoriesModule/',
        paramns: {
            index: 0,
            limit: 25,
        }
    }
    localStorage.setItem('Categories', JSON.stringify(categories));
}

export function setSessionPending() {
    const pending = {
        url: 'solicitacoes/',
        module: 'pendingModule/',
        paramns: {
            index: 0,
            limit: 25,
            start: '',
            end: '',
            user: '',
            status: 1
        }
    }
    localStorage.setItem('Pending', JSON.stringify(pending));
}

export function setSessionResolved() {
    const pending = {
        url: 'solicitacoes/',
        module: 'resolvedModule/',
        paramns: {
            index: 0,
            limit: 25,
            start: '',
            end: '',
            user: '',
            status: '2,3'
        }
    }
    localStorage.setItem('Resolved', JSON.stringify(pending));
}

