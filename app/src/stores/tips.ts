import { defineStore } from 'pinia';
import { fetchAllTips, findTip } from '@/api/queries';
import type { BlogCards } from '@/types/dashboard/index';

export const useTipsStore = defineStore('tip', {
    state: () => ({
        tips: [],
        tip: {} as BlogCards
    }),
    getters: {
        getTips: (state) => state.tips,
        getTip: (state) => state.tip,
    },
    actions: {
        async fetchAllTips() {
            const response = await fetchAllTips();
            this.tips = response;
        },
        async fetchTip(id: string) {
            const response = await findTip(id);
            this.tip = response;
        },
    }
});
