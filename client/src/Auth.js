import axios from 'axios';

const Auth = {
    login: user => {
        localStorage.setItem('user', JSON.stringify(user));
        axios.defaults.headers.common['Authorization'] = user.token;
    },
    
    init: () => {
        let user = JSON.parse(localStorage.getItem('user'));
        axios.defaults.headers.common['Authorization'] = user !== null ? user.token : '';
    },

    auth: () => localStorage.getItem('user') !== null,

    guest: () => localStorage.getItem('user') === null,
};

export default Auth;