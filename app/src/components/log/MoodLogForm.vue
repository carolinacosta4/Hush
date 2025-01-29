<script lang="ts">
import { useMoodLogsStore } from '@/stores/moodlogs';
export default {

    data() {
        return {
            mood: '',
            date: new Date(),
            notes: '',
            moodLogsStore: useMoodLogsStore(),
            moodOptions: ["Happy", "Sad", "Excited", "Tired", "Stressed", "Calm", "Motivated", "Relaxed", "Neutral"]
        };
    },
    methods: {
        submitForm() {
            console.log('Mood:', this.mood);
            console.log('Description:', this.date);
    
            if (this.mood === '' || this.date === null) {
                alert('Please fill all fields');
                return;
            }
            this.moodLogsStore.createLog({
                date: this.date,
                mood: this.mood,
                notes: this.notes,
            });
            console.log('aqui');
            
        },
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
