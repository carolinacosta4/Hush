<script setup lang="ts">
import { RouterView } from 'vue-router';
import MainView from './Main.vue';
</script>

<template>
    <v-locale-provider>
        <v-app class="bg-background">
            <MainView />
            <v-main class="mr-md-4 bg-background">
                <div class="mb-3 hr-layout bg-containerBg">
                    <v-container fluid class="page-wrapper bg-background pt-md-20 rounded-xl">
                        <RouterView />
                    </v-container>
                </div>
            </v-main>
        </v-app>
    </v-locale-provider>
</template>
