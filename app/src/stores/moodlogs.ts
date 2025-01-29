import { defineStore } from 'pinia';
import { createMoodLog, updateMoodLog, removeMoodLog, getMoodsValue } from '@/api/queries';

export const useMoodLogsStore = defineStore('moodLog', {
    state: () => ({
        moodOptions: [] as string[],
    }),
    actions: {
        async createLog(logInfo: { date: string; mood: string; notes: string }) {
            await createMoodLog(logInfo);
            
        },

        async editLog(id: string, logInfo: { date?: string; mood?: string; notes?: string }) {
            await updateMoodLog(id, logInfo);
        },

        async deleteLog(id: string) {
            await removeMoodLog(id);
        },

        async fetchMoodsValue(){
            return await getMoodsValue();
        }
    }
});
