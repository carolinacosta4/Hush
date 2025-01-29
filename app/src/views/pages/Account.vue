<script lang="ts">
import { useUsersStore } from '@/stores/users';
import type { Achievement } from '@/types/dashboard';

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
        loggedUserInfo(): { username: string, email: string, profilePicture: string, achievements: Achievement[] } {
            return this.usersStore.getUserLoggedInfo
        },

        loggedUserEdit() {
            return {
                username: this.loggedUserInfo.username,
                email: this.loggedUserInfo.email,
                profilePicture: this.loggedUserInfo.profilePicture,
            }
        }
    },

    methods: {
        logout() {
            this.usersStore.logout();
            this.$router.push('/login');
        },

        async saveEdit() {
            if (this.loggedUser) {
                await this.usersStore.editProfile(this.loggedUser, this.loggedUserEdit);
                await this.usersStore.fetchUserLogged(this.loggedUser);
            }
        },

        deleteUser() {
            if (this.loggedUser) {
                this.usersStore.deleteUser(this.loggedUser);
                this.$router.push('/register');
            }
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
            </div>

            <v-divider class="my-4"></v-divider>

            <v-row class="px-6">
                <v-col cols="12" sm="4">
                    <v-avatar size="120" class="mx-auto">
                        <v-img :src="loggedUserInfo.profilePicture" alt="Profile Picture" aspect-ratio="1"
                            class="rounded-circle" />
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
                                <v-text-field variant="outlined" v-model="loggedUserEdit.username" density="compact"
                                    hide-details color="secondary"></v-text-field>
                            </v-col>
                            <v-col cols="12">
                                <v-label class="font-weight-semibold mb-1">Email</v-label>
                                <v-text-field variant="outlined" v-model="loggedUserEdit.email" density="compact"
                                    hide-details color="secondary"></v-text-field>
                            </v-col>
                        </v-row>
                    </div>

                    <v-btn class="mt-4" color="red" @click="saveEdit">
                        Save
                    </v-btn>
                    <v-btn class="mt-4" color="red" @click="deleteUser">
                        Delete account
                    </v-btn>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>

    <v-card elevation="10" style="margin-top: 20px;">
        <v-card-item>
            <div class="px-6">
                <v-card-title class="text-h5 mb-1">Achievements</v-card-title>
            </div>

            <v-divider class="my-4"></v-divider>

            <v-row>
                <v-col cols="12" sm="12">
                    <div class="user-info">
                        <v-row v-if="loggedUserInfo.achievements.length > 0">
                            <v-col cols="3" class="my-2" v-for="achievement in loggedUserInfo.achievements" :key="achievement._id"
                                style="display: flex; flex-direction: column; align-items: center;">
                                <v-img :src="achievement.image" alt="Achievement" aspect-ratio="1" width="100" height="100" />
                                <p style="text-align: center;">{{ achievement.name }}</p>
                            </v-col>
                        </v-row>
                        <v-row v-else>
                            <v-col cols="12" class="my-2" style="text-align: center;">
                                <p>No achievements yet.</p>
                            </v-col>
                        </v-row>
                    </div>
                </v-col>
            </v-row>
        </v-card-item>
    </v-card>
</template>
