import { defineStore } from 'pinia';

export const useUsersStore = defineStore('user', {
    state: () => ({
        token: localStorage.getItem('authToken') || null,
        loggedUser: localStorage.getItem('user') || null
    }),
    getters: {
        getToken: (state) => state.token,
        getUserLogged: (state) => state.loggedUser
    },
    actions: {
        async login(username: string, password: string) {
            this.token = '123';
            this.loggedUser = username;
            localStorage.setItem('authToken', this.token);
            localStorage.setItem('user', this.loggedUser);
        },

        async logout() {
            this.token = null;
            this.loggedUser = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        },

        async register(newUser: { username: string; email: string; password: string }) {
            this.token = '123';
            this.loggedUser = newUser.username;
            localStorage.setItem('authToken', this.token);
            localStorage.setItem('user', this.loggedUser);
        }
    }
});
