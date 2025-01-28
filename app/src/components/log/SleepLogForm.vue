<script lang="ts">
export default {
    data() {
        return {
            sleepTime: '',
            wakeTime: '',
            sleepQuality: '',
            date: new Date(),
        };
    },
    methods: {
        submitForm() {
            console.log('Date:', this.date);
            console.log('Sleep Time:', this.sleepTime);
            console.log('Wake Time:', this.wakeTime);
            console.log('Sleep Quality:', this.sleepQuality);
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
            <v-text-field 
                v-model="sleepTime" 
                variant="outlined" 
                density="compact" 
                color="secondary" 
                placeholder="HH:mm" 
                type="time"
            />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Wake Time</v-label>
            <v-text-field 
                v-model="wakeTime" 
                variant="outlined" 
                density="compact" 
                color="secondary" 
                placeholder="HH:mm" 
                type="time"
            />
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Sleep Quality</v-label>
            <v-text-field 
                v-model="sleepQuality" 
                variant="outlined" 
                density="compact" 
                color="secondary" 
                type="number" 
                min="0" 
                max="10" 
                placeholder="Rate from 0 to 10"
            />
        </v-col>
        <v-col cols="12" class="pt-0">
            <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Create</v-btn>
        </v-col>
    </form>
</template>
