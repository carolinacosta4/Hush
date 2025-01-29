<script lang="ts">
import { useRoute } from 'vue-router';
import { ref, onMounted } from 'vue';
import { BlogCardData } from '@/data/Dashboard';
import type { BlogCards } from '@/types/dashboard/index';
import { useTipsStore } from '@/stores/tips';
import { format } from 'date-fns';

export default {
    data() {
        return {
            tipsStore: useTipsStore()
        }
    },

    async created() {
        if (typeof this.$route.params.id === "string") {
            await this.tipsStore.fetchTip(this.$route.params.id);
        }
    },
    computed: {
        tip() {
            return this.tipsStore.getTip 
        },
        formatDate() {
            return (date: string | number) => {
                console.log('Received date:', date);
                const dateObj = new Date(date);
                console.log('Date object:', dateObj); 

                if (isNaN(dateObj.getTime())) {
                    return 'Data inválida';
                }
                return format(dateObj, 'MMMM dd, yyyy');
            };
        }
    },
};
</script>

<template>
    <v-container v-if="tip">
        <v-card elevation="10" rounded="md" class="pa-6">
            <v-card-title class="text-h4 font-weight-bold">
                {{ tip.title }}
            </v-card-title>
            <v-card-text class="mt-4">
                {{ formatDate(tip.publishDate) }} 
            </v-card-text>
            <v-card-text class="mt-4">
                {{ tip.description }}
            </v-card-text>
        </v-card>
    </v-container>
    <v-container v-else>
        <p>Tip não encontrada.</p>
    </v-container>
</template>
