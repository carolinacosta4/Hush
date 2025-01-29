import { defineStore } from 'pinia';
import { createSleepLog, updateSleepLog, removeSleepLog } from '@/api/queries';

export const useSleepLogsStore = defineStore('sleepLog', {
    actions: {
        async createLog(logInfo: { date: string; bedTime: string; wakeTime: string; sleepQuality: number }) {
            logInfo.sleepQuality = Number(logInfo.sleepQuality);
            await createSleepLog(logInfo);
        },

        async editLog(id: string, logInfo: { bedTime?: string; wakeTime?: string; sleepQuality?: number }) {
            if (logInfo.sleepQuality) logInfo.sleepQuality = Number(logInfo.sleepQuality);            
            await updateSleepLog(id, logInfo);
        },

        async deleteLog(id: string) {
            await removeSleepLog(id);
        }
    }
});
