<script lang="ts">
import { useSleepLogsStore } from '@/stores/sleeplogs';

export default {
    data() {
        return {
            bedTime: '',
            wakeTime: '',
            sleepQuality: 0,
            date: new Date(),
            sleepLogStore: useSleepLogsStore(),
            error: ''
        };
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
                this.bedTime = '';
                this.wakeTime = '';
                this.sleepQuality = 0;
                this.date = new Date();
                this.$router.push('/');
            } catch (error: any) {
                this.error = error
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
