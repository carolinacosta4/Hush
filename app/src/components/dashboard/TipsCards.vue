<script lang="ts">
import type { BlogCards } from '@/types/dashboard/index';
import { useTipsStore } from '@/stores/tips';
import { format } from 'date-fns';

export default {
    data() {
        return {
            tipsStore: useTipsStore()
        }
    },
    computed: {
        tips():BlogCards[]{ 
            return this.tipsStore.getTips
        },
        formattedTips() {
            return this.tips.map(tip => ({
                ...tip,
                formattedDate: tip.publishDate ? format(new Date(Number(tip.publishDate)), 'dd/MM/yyyy') : 'Data inválida'
            }));
        }
    },
    async created() {
        await this.tipsStore.fetchAllTips();
    },
};
</script>

<template>
    <v-row>
        <v-col cols="12" md="4" sm="6" v-for="card in formattedTips" :key="card._id">
            <v-card elevation="10" rounded="md" class="card-hover pa-4"  style="cursor: pointer;" @click="$router.push({name: 'TipPage', params:{id:card._id}})">
                <v-card-item>
                    <img src="@/assets/images/blog/night-mode.png" alt="Card Image" class="card-img-top" style="width: 100%; object-fit: cover;">
                    <div class="text-h6 font-weight-bold text-left" style="white-space: normal;">
                        {{ card.title }}
                    </div>
                    <div class="text-body-2 text-left text-grey-darken-1 mt-1">
                        {{ card.formattedDate }}
                    </div>
                </v-card-item>
            </v-card>
        </v-col>
    </v-row>
</template>
