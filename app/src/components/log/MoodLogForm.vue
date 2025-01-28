<script lang="ts">
export default {
    data() {
        return {
            mood: '',
            date: new Date(),
            moodOptions: ['Alegre', 'Cansado', 'Irritado', 'Neutro'],
        };
    },
    methods: {
        submitForm() {
            console.log('Mood:', this.mood);
            console.log('Description:', this.date);
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
        <v-col cols="12" class="pt-0">
            <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Create</v-btn>
        </v-col>
    </form>
</template>
