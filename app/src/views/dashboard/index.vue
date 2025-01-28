<script lang="ts">
import SleepToday from '@/components/dashboard/SleepToday.vue';
import MoodToday from '@/components/dashboard/MoodToday.vue';
import SleepLog from '@/components/dashboard/SleepLog.vue';
import SleepLogCard from '@/components/dashboard/SleepLogCard.vue';
import MoodLog from '@/components/dashboard/MoodLog.vue';
import MoodSleepChart from '@/components/dashboard/MoodSleepChart.vue';
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            usersStore: useUsersStore(),
        }
    },

    components: {
        SleepToday,
        MoodToday,
        SleepLog,
        SleepLogCard,
        MoodLog,
        MoodSleepChart,
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },
        loggedUserInfo() {
            return this.usersStore.getUserLoggedInfo
        },
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },
}
</script>

<template>
    <v-row>
        <v-col cols="12" md="12">
            <SleepLogCard />
        </v-col>
        <v-col cols="12" md="6">
            <SleepToday class="mb-6" />
        </v-col>
        <v-col cols="12" md="6">
            <MoodToday />
        </v-col>
        <v-col cols="12" md="12">
            <MoodSleepChart />
        </v-col>

        <v-col cols="12" lg="12">
            <SleepLog />
        </v-col>
        <v-col cols="12" lg="12">
            <MoodLog />
        </v-col>
    </v-row>
</template>
