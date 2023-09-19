import axios from 'axios';

const Auth = {
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
    },
    
    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
    },

    auth: () => localStorage.getItem('user') !== null,

    guest: () => localStorage.getItem('user') === null,
};

export default Auth;