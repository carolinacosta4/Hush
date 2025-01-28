<script lang="ts">
import { Icon } from '@iconify/vue';
import { useUsersStore } from "@/stores/users";
import type { MoodLog, SleepLog } from '@/types/dashboard';
import { format, parseISO } from 'date-fns';

export default {
    components: {
        Icon
    },
    data() {
        return {
            today: new Date().toISOString().split('T')[0],
            yesterday: (() => {
                const date = new Date();
                date.setDate(date.getDate() - 1);
                return date.toISOString().split('T')[0];
            })(),
            usersStore: useUsersStore(),
        };
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },

        loggedUserInfo(): { moodLogs: MoodLog[]; sleepLogs: SleepLog[] } {
            return this.usersStore.getUserLoggedInfo
        },

        todaySleepLog() {         
            return this.loggedUserInfo.sleepLogs.find(log => format(parseISO(log.date), 'yyyy-MM-dd') === this.today);
        },

        yesterdaySleepLog() {
            return this.loggedUserInfo.sleepLogs.find(log => format(parseISO(log.date), 'yyyy-MM-dd') === this.yesterday);
        },

        dailyDifference() {
            if (this.todaySleepLog && this.yesterdaySleepLog) {
                const difference = ((this.todaySleepLog.sleepQuality - this.yesterdaySleepLog.sleepQuality) / this.yesterdaySleepLog.sleepQuality) * 100;
                return difference.toFixed(2);
            }
            return 'N/A';
        },
        timeAsleep() {
            if (this.todaySleepLog) {
                const sleepTime = this.todaySleepLog.bedTime;
                const wakeTime = this.todaySleepLog.wakeTime;

                const sleepDate = new Date(`1970-01-01T${sleepTime}:00`);
                const wakeDate = new Date(`1970-01-01T${wakeTime}:00`);

                if (wakeDate < sleepDate) {
                    wakeDate.setDate(wakeDate.getDate() + 1);
                }

                const timeAsleepMs = wakeDate.getTime() - sleepDate.getTime();
                const hours = Math.floor(timeAsleepMs / (1000 * 60 * 60));
                const minutes = Math.floor((timeAsleepMs % (1000 * 60 * 60)) / (1000 * 60));

                return `${hours}h ${minutes}m`;
            }
            return 'N/A';
        },
    },
};
</script>

<template>
    <v-card elevation="10" class="bg-lighterror">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-mb-0 mb-3">
                <div class="d-flex ga-3 align-center">
                    <div class="rounded-pill d-inline-flex px-4 py-2 align-center py-0 bg-error">
                        <Icon icon="solar:sleeping-circle-outline" width="25" height="25" class="text-white" />
                    </div>
                    <v-card-title class="text-h6 textSecondary font-weight-medium mb-0">Your sleep today</v-card-title>
                </div>
            </div>
            <h2 class="text-h2 mb-3"></h2>
            <div v-if="todaySleepLog" class="py-4 px-2 bg-dark rounded-lg shadow-md text-white">
                <v-row class="d-flex align-center mb-2">
                    <v-col cols="auto" class="d-flex justify-center">
                        <Icon icon="solar:moon-sleep-outline" width="24" height="24" class="text-white" />
                    </v-col>
                    <v-col>
                        <p class="mb-0 font-weight-bold">Time Asleep</p>
                        <p class="text-sm text-light mb-0">{{ timeAsleep }}</p>
                    </v-col>
                </v-row>
                <v-row class="d-flex align-center">
                    <v-col cols="auto" class="d-flex justify-center">
                        <Icon icon="solar:heart-pulse-outline" width="24" height="24" class="text-white" />
                    </v-col>
                    <v-col>
                        <p class="mb-0 font-weight-bold">Sleep Quality</p>
                        <p class="text-sm text-light mb-0">{{ todaySleepLog.sleepQuality }}/10</p>
                    </v-col>
                </v-row>
                <span
                    class="text-12 rounded-pill px-2 py-1 lh-normal text-muted light-chip border border-muted font-weight-medium">{{
                        dailyDifference }}%
                    yesterday</span>
            </div>
            <div v-else class="py-8 px-4 text-center rounded-lg shadow-md text-muted">
                <v-row class="d-flex justify-center mb-4">
                    <Icon icon="solar:bed-outline" width="48" height="48" class="textSecondary" />
                </v-row>
                <p class="mb-2 font-weight-bold">No Sleep Log Found</p>
                <v-btn color="primary" class="mt-4" @click="$router.push('/createLog')">
                    Add Sleep Log
                </v-btn>
            </div>
        </v-card-item>
    </v-card>
</template>
