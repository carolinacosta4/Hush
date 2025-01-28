<script setup lang="ts">
import MoodLogForm from '@/components/log/MoodLogForm.vue';
import SleepLogForm from '@/components/log/SleepLogForm.vue';
</script>

<template>
    <div>
        <v-container fluid class="pa-3">
            <v-row class="h-100vh d-flex justify-center align-center">
                <v-col cols="12" lg="6" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <h3 class="text-center">Add Mood Log</h3>
                            <MoodLogForm />
                        </v-card-item>
                    </v-card>
                </v-col>
                <v-col cols="12" lg="6" class="d-flex align-center">
                    <v-card rounded="md" elevation="10" class="px-sm-1 px-0 mx-auto" max-width="500">
                        <v-card-item class="pa-sm-8">
                            <h3 class="text-center">Add Sleep Log</h3>
                            <SleepLogForm />
                        </v-card-item>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>
