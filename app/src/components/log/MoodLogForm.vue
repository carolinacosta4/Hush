<script lang="ts">
import { useMoodLogsStore } from '@/stores/moodlogs';
import {useUsersStore} from '@/stores/users';
import type { MoodLog } from '@/types/dashboard';

export default {

    data() {
        return {
            mood: '',
            date: new Date(),
            notes: '',
            moodLogsStore: useMoodLogsStore(),
            usersStore: useUsersStore(),
            moodOptions: ["Happy", "Sad", "Excited", "Tired", "Stressed", "Calm", "Motivated", "Relaxed", "Neutral"]
        };
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },
        loggedUserInfo(): { username: string, email: string, profilePicture: string, moodLogs: MoodLog[]; } {
            return this.usersStore.getUserLoggedInfo
        },
    },

    methods: {
        async submitForm() {    
            if (this.mood === '' || this.date === null) {
                alert('Please fill all fields');
                return;
            }
            await this.moodLogsStore.createLog({
                date: this.date.toISOString(),
                mood: this.mood,
                notes: this.notes,
            });
            
            if(this.loggedUser) {
                const lastThreeLogs = [...this.loggedUserInfo.moodLogs.slice(-2), { mood: this.mood }];
                if (lastThreeLogs.length === 3) {
                    const allHavePositiveMood = lastThreeLogs.every(log => {
                        return log.mood === 'Happy' || log.mood === 'Excited' || log.mood === 'Motivated';
                    });
                    if (allHavePositiveMood) await this.usersStore.unlockAchievement(this.loggedUser, '679a4bc4398f9f488b106084');
                }
            }

            this.mood = '';
            this.notes = '';
            this.date = new Date();
            window.location.href = '/';
            setTimeout(() => {
                window.location.reload();
            }, 100);
        },
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Mood</v-label>
            <v-select :items="moodOptions" v-model="mood" item-text="text" item-value="value" variant="outlined"
                density="compact" hide-details color="secondary"></v-select>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Date</v-label>
            <v-date-picker v-model="date" variant="outlined" density="compact" color="secondary"></v-date-picker>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Notes</v-label>
            <v-text-field placeholder="Write about your feelings" v-model="notes"></v-text-field>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Create</v-btn>
        </v-col>
    </form>
</template>
