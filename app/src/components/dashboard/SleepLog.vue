<script lang="ts">
import { tableActionData } from '@/data/Dashboard';
import { useUsersStore } from "@/stores/users";
import type { SleepLog } from '@/types/dashboard';
import { format } from 'date-fns';
import { useSleepLogsStore } from '@/stores/sleeplogs';

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            tableActionData: tableActionData || [],
            sleepLogsStore: useSleepLogsStore(),
            dialog: false,
            currentLog: {} as SleepLog,
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

        formatDate() {
            return (date: string) => format(new Date(date), 'MMMM dd, yyyy');
        }
    },

    methods: {
        async handleAction(name: string, id: string, item: SleepLog) {
            if (name === 'Edit') {               
                this.currentLog = item 
                this.dialog = true;
            } else if (name === 'Delete' && this.loggedUser) {
                await this.sleepLogsStore.deleteLog(id);
                await this.usersStore.fetchUserLogged(this.loggedUser);
            }
        },

        saveEditedLog() {
            if (this.currentLog) {
                this.sleepLogsStore.editLog(this.currentLog._id, {
                    bedTime: this.currentLog.bedTime,
                    wakeTime: this.currentLog.wakeTime,
                    sleepQuality: this.currentLog.sleepQuality,
                });
                this.dialog = false;
            }
        },

        closeDialog() {
            this.dialog = false;
        }
    },
};
</script>

<template>
    <v-card elevation="10">
        <v-card-item class="px-0">
            <div class="px-6">
                <v-card-title class="text-h5 mb-1">Sleep Log</v-card-title>
            </div>
            <perfect-scrollbar style="height: 450px">
                <v-table class="revenue-table border-table">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Date</th>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Sleep Time</th>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Wake Time</th>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Sleep Quality</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in loggedUserInfo.sleepLogs" :key="item.date" class="month-item">
                                <td>
                                    <div class="d-flex align-center overflow-hidden">
                                        <div class="mx-4" style="min-width: 250px">
                                            <h6 class="text-body-1 font-weight-semibold truncate-2">
                                                {{ formatDate(item.date) }}
                                            </h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <h5 class="text-h6 font-weight-semibold text-no-wrap mb-1 text-no-wrap">
                                        {{ item.bedTime }}
                                    </h5>
                                </td>
                                <td>
                                    <h5 class="text-h6 font-weight-semibold text-no-wrap mb-1 text-no-wrap">
                                        {{ item.wakeTime }}
                                    </h5>
                                </td>
                                <td>
                                    <v-chip size="x-small" color="secondary">{{ item.sleepQuality }}</v-chip>
                                </td>
                                <td class="text-right">
                                    <v-btn size="30" icon variant="flat" class="grey100">
                                        <v-avatar size="22">
                                            <DotsVerticalIcon size="20" color="grey100" />
                                        </v-avatar>
                                        <v-menu activator="parent">
                                            <v-list elevation="10">
                                                <v-list-item value="action" v-for="list in tableActionData"
                                                    :key="list.listtitle" hide-details min-height="38"
                                                    @click="handleAction(list.listtitle, item._id, item)">
                                                    <v-list-item-title>
                                                        <v-avatar size="20" class="mr-2">
                                                            <component :is="list.icon" stroke-width="2" size="20" />
                                                        </v-avatar>
                                                        {{ list.listtitle }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-list>
                                        </v-menu>
                                    </v-btn>
                                </td>
                            </tr>
                        </tbody>
                    </template>
                </v-table>
            </perfect-scrollbar>
        </v-card-item>
    </v-card>

    <v-dialog v-model="dialog" max-width="600px">
        <v-card>
            <v-card-title class="headline">Edit Sleep Log</v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-label class="font-weight-semibold mb-1">Sleep Time</v-label>
                    <v-text-field v-model="currentLog.bedTime" variant="outlined" density="compact" color="secondary"
                        placeholder="HH:mm" type="time" />
                </v-col>
                <v-col cols="12">
                    <v-label class="font-weight-semibold mb-1">Wake Time</v-label>
                    <v-text-field v-model="currentLog.wakeTime" variant="outlined" density="compact" color="secondary"
                        placeholder="HH:mm" type="time" />
                </v-col>
                <v-col cols="12">
                    <v-label class="font-weight-semibold mb-1">Sleep Quality</v-label>
                    <v-text-field v-model="currentLog.sleepQuality" variant="outlined" density="compact" color="secondary"
                        type="number" min="0" max="10" placeholder="Rate from 0 to 10" />
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog">Cancel</v-btn>
                <v-btn color="secondary" @click="saveEditedLog">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
