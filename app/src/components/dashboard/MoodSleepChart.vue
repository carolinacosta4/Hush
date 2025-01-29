<script lang="ts">
import { format, parseISO } from 'date-fns';
import { useUsersStore } from "@/stores/users";
import type { MoodLog, SleepLog } from '@/types/dashboard';

const moodMapping: { [key: string]: number } = {
    Happy: 10,
    Excited: 8,
    Calm: 6,
    Motivated: 7,
    Relaxed: 9,
    Stressed: 1,
    Sad: 3,
    Tired: 2,
    Neutral: 5
};

export default {
    data() {
        return {
            usersStore: useUsersStore(),
        };
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },

        loggedUserInfo(): { moodLogs: MoodLog[]; sleepLogs: SleepLog[] } {
            return this.usersStore.getUserLoggedInfo
        },

        combinedData() {
            const combinedData = this.loggedUserInfo.moodLogs.map((moodLog) => {
                const sleepLog = this.loggedUserInfo.sleepLogs.find((sleepLog) => format(parseISO(sleepLog.date), 'yyyy-MM-dd') === format(parseISO(moodLog.date), 'yyyy-MM-dd'))
                return {
                    date: moodLog.date,
                    mood: moodMapping[moodLog.mood],
                    sleepQuality: sleepLog ? sleepLog.sleepQuality : null
                };
            });
            return combinedData;
        },

        chartOptions() {
            return {
                chart: {
                    height: 350,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth'
                },
                title: {
                    text: 'Mood and Sleep Quality Over Time',
                    align: 'left'
                },
                xaxis: {
                    type: 'datetime',
                    categories: this.combinedData.map(data => format(parseISO(data.date), 'yyyy-MM-dd'))
                },
                yaxis: [
                    {
                        title: {
                            text: 'Mood'
                        }
                    },
                    {
                        opposite: true,
                        title: {
                            text: 'Sleep Quality'
                        }
                    }
                ],
                colors: ['#391E8A', '#7754DE'],
                tooltip: {
                    shared: true,
                    intersect: false
                }
            };
        },
        series() {
            return [
                {
                    name: 'Mood',
                    type: 'line',
                    data: this.combinedData.map(data => data.mood)
                },
                {
                    name: 'Sleep Quality',
                    type: 'line',
                    data: this.combinedData.map(data => data.sleepQuality)
                }
            ];
        }
    }
};
</script>

<template>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
</template>