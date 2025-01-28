<script lang="ts">
import { useUsersStore } from '@/stores/users';

export default {
    data() {
        return {
            usersStore: useUsersStore(),
        }
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },
        loggedUserInfo() {
            return this.usersStore.getUserLoggedInfo
        },
    },

    methods: {
        logout() {
            this.usersStore.logout();
            this.$router.push('/login');
        },

        editProfile(){
            console.log('Edit Profile');
        },

        saveEdit(){
            console.log('Save edit Profile');
        }
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },
};
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="px-6">
                <v-card-title class="text-h5 mb-1">User Profile</v-card-title>
                <v-card-subtitle class="text-body-1">Your personal details and settings</v-card-subtitle>
            </div>

            <v-divider class="my-4"></v-divider>

            <v-row class="px-6">
                <v-col cols="12" sm="4">
                    <v-avatar size="120" class="mx-auto">
                        <!-- <img :src="loggedUserInfo.profileImage" alt="Profile Image" /> -->
                         <img src="https://cdn.vuetifyjs.com/images/john.jpg" alt="Profile Image" />
                    </v-avatar>
                </v-col>

                <v-col cols="12" sm="8">
                    <div class="user-info">
                        <v-row>
                            <v-col cols="12" class="my-2">
                                <span class="font-weight-semibold">Username:</span> {{ loggedUserInfo.username }}
                            </v-col>

                            <v-col cols="12" class="my-2">
                                <span class="font-weight-semibold">Email:</span> {{ loggedUserInfo.email }}
                            </v-col>
                        </v-row>
                    </div>

                    <v-btn class="mt-4" color="red" @click="logout">
                        Logout
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>

    <v-card elevation="10" style="margin-top: 20px;">
        <v-card-item>
            <v-row class="px-6">
                <v-col cols="12" sm="8">
                    <div class="user-info">
                        <v-row>
                            <v-col cols="12">
                                <v-label class="font-weight-semibold mb-1">Username</v-label>
                                <v-text-field variant="outlined" v-model="loggedUserInfo.username" density="compact" hide-details
                                    color="secondary"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label class="font-weight-semibold mb-1">Email</v-label>
                                <v-text-field variant="outlined" v-model="loggedUserInfo.email" density="compact" hide-details
                                    color="secondary"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-btn class="mt-4" color="red" @click="saveEdit">
                        Save
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
