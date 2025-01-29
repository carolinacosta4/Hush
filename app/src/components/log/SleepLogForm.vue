<script lang="ts">
import { useSleepLogsStore } from '@/stores/sleeplogs';
import { useUsersStore } from '@/stores/users';
import type { Achievement, SleepLog } from '@/types/dashboard';

export default {
    data() {
        return {
            bedTime: '',
            wakeTime: '',
            sleepQuality: 0,
            date: new Date(),
            sleepLogStore: useSleepLogsStore(),
            usersStore: useUsersStore(),
            error: ''
        };
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },
        loggedUserInfo(): { username: string, email: string, profilePicture: string, achievements: Achievement[], sleepLogs: SleepLog[]; } {
            return this.usersStore.getUserLoggedInfo
        },
    },

    methods: {
        async submitForm() {
            if (this.bedTime === '' || this.wakeTime === '' || this.sleepQuality === 0) {
                this.error = 'Please fill all fields';
                return;
            }
            try {
                await this.sleepLogStore.createLog({
                    date: this.date.toISOString(),
                    bedTime: this.bedTime,
                    wakeTime: this.wakeTime,
                    sleepQuality: this.sleepQuality,
                });
                if (this.loggedUser) {
                    const lastThreeLogs = [...this.loggedUserInfo.sleepLogs.slice(-2), { bedTime: this.bedTime, wakeTime: this.wakeTime }];
                    if (lastThreeLogs.length === 3) {

                    const allHaveSevenHours = lastThreeLogs.every(log => {
                        const sleepDuration = this.calculateSleepDuration(log);
                        return sleepDuration >= 7;
                    });

                    if (allHaveSevenHours) {
                        await this.usersStore.unlockAchievement(this.loggedUser, '679a4b87398f9f488b106083');
                    }}

                    await this.usersStore.unlockAchievement(this.loggedUser, '679a4be7398f9f488b106085');
                    const hoursDay = this.calculateSleepDuration({ bedTime: this.bedTime, wakeTime: this.wakeTime });

                    if (hoursDay >= 8) {
                        await this.usersStore.unlockAchievement(this.loggedUser, '679a4c06398f9f488b106086');
                    }
                }
                this.bedTime = '';
                this.wakeTime = '';
                this.sleepQuality = 0;
                this.date = new Date();
                this.$router.push('/');
            } catch (error: any) {
                this.error = error
            }
        },

        calculateSleepDuration(log: { bedTime: string; wakeTime: string; }) {
            const sleepTime = log.bedTime;
            const wakeTime = log.wakeTime;

            const sleepDate = new Date(`1970-01-01T${sleepTime}:00`);
            const wakeDate = new Date(`1970-01-01T${wakeTime}:00`);

            if (wakeDate < sleepDate) {
                wakeDate.setDate(wakeDate.getDate() + 1);
            }

            const timeAsleepMs = wakeDate.getTime() - sleepDate.getTime();
            const hours = Math.floor(timeAsleepMs / (1000 * 60 * 60));
            return hours;
        },

        async created() {
            if (this.loggedUser) {
                await this.usersStore.fetchUserLogged(this.loggedUser);
            }
        },
    },
};
</script>

<template>
    <form @submit.prevent="submitForm">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Date</v-label>
            <v-date-picker v-model="date" variant="outlined" density="compact" color="secondary" />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Sleep Time</v-label>
            <v-text-field v-model="bedTime" variant="outlined" density="compact" color="secondary" placeholder="HH:mm"
                type="time" />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Wake Time</v-label>
            <v-text-field v-model="wakeTime" variant="outlined" density="compact" color="secondary" placeholder="HH:mm"
                type="time" />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Sleep Quality</v-label>
            <v-text-field v-model="sleepQuality" variant="outlined" density="compact" color="secondary" type="number"
                min="0" max="10" placeholder="Rate from 0 to 10" />
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-alert v-if="error" type="error" dense elevation="0">{{ error }}</v-alert>
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Create</v-btn>
        </v-col>
    </form>
</template>
