<script lang="ts">
import { useRouter } from 'vue-router';
import { BlogCardData } from '@/data/Dashboard';
import type { BlogCards } from '@/types/dashboard/index';
import { useTipsStore } from '@/stores/tips';

export default {
    data() {
        return {
            tipsStore: useTipsStore()
        }
    },
    computed: {
        tips():BlogCards[]{ 
            return this.tipsStore.getTips
        }
    },
    async created() {
        await this.tipsStore.fetchAllTips();
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="4" sm="6" v-for="card in tips" :key="card._id">
            <v-card elevation="10" rounded="md" class="card-hover pa-4"  style="cursor: pointer;" @click="$router.push({name: 'TipPage', params:{id:card._id}})">
                <v-card-item>
                    <div class="text-h6 font-weight-bold text-left" style="white-space: normal;">
                        {{ card.title }}
                    </div>
                    <div class="text-body-2 text-left text-grey-darken-1 mt-1">
                        {{ card.publishDate }}
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
