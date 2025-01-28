<script lang="ts">
import { combinedData } from '@/data/Dashboard';
import { format, parseISO } from 'date-fns';

export default {
    data() {
        return {};
    },
    computed: {
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
                    categories: combinedData.map(data => format(parseISO(data.date), 'yyyy-MM-dd'))
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
                    data: combinedData.map(data => data.mood)
                },
                {
                    name: 'Sleep Quality',
                    type: 'line',
                    data: combinedData.map(data => data.sleepQuality)
                }
            ];
        }
    }
};
</script>

<template>
    <apexchart type="line" height="350" :options="chartOptions" :series="series"></apexchart>
</template>