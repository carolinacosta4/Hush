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

        todayMoodLog() {
            return this.loggedUserInfo.moodLogs.find(log => format(parseISO(log.date), 'yyyy-MM-dd') === this.today);
        },
        yesterdayMoodLog() {
            return this.loggedUserInfo.moodLogs.find(log => format(parseISO(log.date), 'yyyy-MM-dd') === this.yesterday);
        }
    }
};
</script>

<template>
    <v-card elevation="10" class="bg-lightsecondary">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-mb-0 mb-3">
                <div class="d-flex ga-3 align-center">
                    <div class="rounded-pill d-inline-flex px-4 py-2 align-center py-0 bg-secondary">
                        <Icon icon="solar:smile-circle-outline" width="25" height="25" class="text-white" />
                    </div>
                    <v-card-title class="text-h6 textSecondary font-weight-medium mb-0">Your mood today</v-card-title>
                </div>
            </div>
            <h2 class="text-h2 mb-3"></h2>
            <div v-if="todayMoodLog" class="py-4 px-2 bg-dark rounded-lg shadow-md text-white">
                <p class="text-20 text-light font-weight-bold mb-0">{{ todayMoodLog.mood }}</p>
                <div v-if="yesterdayMoodLog">
                    <span
                        class="text-12 rounded-pill px-2 py-1 lh-normal text-muted light-chip border border-muted font-weight-medium">Yesterday
                        you were {{ yesterdayMoodLog.mood }}</span>
                </div>
            </div>
            <div v-else class="py-8 px-4 text-center rounded-lg shadow-md text-muted">
                <v-row class="d-flex justify-center mb-4">
                    <Icon icon="solar:sticker-smile-circle-2-outline" width="48" height="48" class="textSecondary" />
                </v-row>
                <p class="mb-2 font-weight-bold">No Mood Log Found</p>
                <v-btn color="primary" class="mt-4" @click="$router.push('/createLog')">
                    Add Mood Log
                </v-btn>
            </div>
        </v-card-item>
    </v-card>
</template>
