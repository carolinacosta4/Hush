<script lang="ts">
import { format, parseISO } from 'date-fns';
import { useUsersStore } from "@/stores/users";
import type { SleepLog } from '@/types/dashboard';

export default {
    data() {
        return {
            sleepTime: '',
            wakeTime: '',
            sleepQuality: '',
            date: new Date(),
            selectedMonth: "Show All",
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

        loggedUserInfo(): { sleepLogs: SleepLog[] } {
            return this.usersStore.getUserLoggedInfo
        },

        groupedSleepLog() {
            const groups = this.loggedUserInfo.sleepLogs.reduce((acc: { [key: string]: SleepLog[] }, log) => {
                const month = format(parseISO(log.date), 'MMMM yyyy');
                if (!acc[month]) {
                    acc[month] = [];
                }
                acc[month].push(log);
                return acc;
            }, {});
            return groups;
        },

        months() {
            return ["Show All", ...Object.keys(this.groupedSleepLog)];
        },

        areachartOptions() {
            const annotations: { xaxis: { x: string; borderColor: string; label: { style: { color: string; background: string; }; text: string; }; }[] } = { xaxis: [] };
            if (this.months.length === 2) {
                const month = this.months[1];
                annotations.xaxis = [
                    {
                        x: month,
                        borderColor: '#805BB5',
                        label: {
                            style: {
                                color: '',
                                background: ''
                            },
                            text: ''
                        }
                    }
                ];
            }

            return {
                chart: {
                    height: 305,
                    fontFamily: 'inherit',
                    foreColor: '#adb0bb',
                    fontSize: '12px',
                    offsetX: 0,
                    offsetY: 10,
                    animations: {
                        speed: 500
                    },
                    toolbar: {
                        show: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 0,
                        inverseColors: false,
                        opacityFrom: 0.4,
                        opacity: 0.3,
                        stops: [100],
                        colorStops: [
                            {
                                offset: 0,
                                color: '#805BB520',
                                opacity: 0.9
                            },
                            {
                                offset: 100,
                                color: '#805BB520',
                                opacity: 0.9
                            }
                        ]
                    }
                },
                grid: {
                    show: true,
                    strokeDashArray: 3,
                    borderColor: '#90A4AE50'
                },
                stroke: {
                    curve: 'smooth',
                    width: 2,
                    colors: ['#805BB5']
                },
                xaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false
                    }
                },
                yaxis: {
                    tickAmount: 3
                },
                legend: {
                    show: false
                },
                tooltip: {
                    theme: 'dark'
                },
                annotations: annotations
            };
        },

        areaChart() {
            const data = [];
            if (this.selectedMonth === "Show All") {
                const monthlyData = this.loggedUserInfo.sleepLogs.reduce((acc: { [key: string]: { total: number, count: number } }, log) => {
                    const month = format(parseISO(log.date), 'MMMM yyyy');
                    if (!acc[month]) {
                        acc[month] = { total: 0, count: 0 };
                    }
                    acc[month].total += Number(log.sleepQuality);
                    acc[month].count += 1;
                    return acc;
                }, {});

                for (const month in monthlyData) {
                    const avgQuality = monthlyData[month].total / monthlyData[month].count;
                    data.push({ x: month, y: Math.round(avgQuality) });
                }

            } else {
                this.groupedSleepLog[this.selectedMonth].forEach(log => {
                    data.push({ x: format(parseISO(log.date), 'dd/MM/yyyy'), y: log.sleepQuality });
                });
            }

            data.sort((a, b) => new Date(a.x).getTime() - new Date(b.x).getTime());

            return {
                series: [
                    {
                        type: 'area',
                        name: 'Sleep Quality',
                        data: data
                    }
                ]
            };
        }
    },
};
</script>

<template>
    <v-card elevation="10">
        <v-card-item>
            <div class="d-flex justify-space-between align-center mb-mb-0 mb-3">
                <v-card-title class="text-h5">Sleep Log</v-card-title>
                <div>
                    <v-select v-model="selectedMonth" :items="months" density="compact" rounded="pill" elevation="0"
                        class="text-body-1" hide-details></v-select>
                </div>
            </div>
            <div class="ms-n4">
                <apexchart type="area" height="305" :options="areachartOptions" :series="areaChart.series"> </apexchart>
            </div>
        </v-card-item>
    </v-card>
</template>