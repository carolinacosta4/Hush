<script lang="ts">
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
        formattedDate() {
            if (this.tip.publishDate) {
                    return format(new Date(Number(this.tip.publishDate)), 'dd/MM/yyyy')
            }
            return '';
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
                {{ formattedDate }} 
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
