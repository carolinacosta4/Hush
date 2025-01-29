import { defineStore } from 'pinia';
import { login as loginUser, findUserById, listUserSleepLogs, listUsersMoodLogs, createUser, removeUser } from '@/api/queries';

export const useUsersStore = defineStore('user', {
    state: () => ({
        loggedUserInfo: { id: '', username: '', email: '', sleepLogs: [], moodLogs: [] },
        token: localStorage.getItem('authToken') || null,
        loggedUser: localStorage.getItem('user') || null
    }),
    getters: {
        getToken: (state) => state.token,
        getUserLogged: (state) => state.loggedUser,
        getUserLoggedInfo: (state) => state.loggedUserInfo
    },
    actions: {
        async fetchUserLogged(userID: string) {
            try {
                this.loggedUserInfo = { id: '', username: '', email: '', sleepLogs: [], moodLogs: [] };
                const responseUser = await findUserById(userID);
                const responseSleepLog = await listUserSleepLogs(userID);               
                const responseMoodLog = await listUsersMoodLogs(userID);
                this.loggedUserInfo = {
                    id: responseUser._id,
                    username: responseUser.username,
                    email: responseUser.email,
                    sleepLogs: responseSleepLog,
                    moodLogs: responseMoodLog
                };
            } catch (error) {
                console.error(error);
            }
        },

        async login(username: string, password: string) {
            const response = await loginUser(username, password);
            this.token = response.accessToken;
            this.loggedUser = response.userID;
            localStorage.setItem('authToken', response.accessToken);
            localStorage.setItem('user', response.userID);
        },

        async logout() {
            this.token = null;
            this.loggedUser = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        },

        async register(newUser: { username: string; email: string; password: string }) {
            await createUser(newUser);
            loginUser(newUser.username, newUser.password);
        },

        async deleteUser(id: string) {
            await removeUser(id);
            this.token = null;
            this.loggedUser = null;
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
    }
});
