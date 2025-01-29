<script lang="ts">
import { tableActionData } from '@/data/Dashboard';
import { useUsersStore } from "@/stores/users";
import type { MoodLog } from '@/types/dashboard/index';
import { format } from 'date-fns';
import { useMoodLogsStore } from '@/stores/moodlogs';

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            tableActionData: tableActionData || [],
            moodLogsStore: useMoodLogsStore(),
            dialog: false,
            currentLog: {} as MoodLog,
            moodOptions: ["Happy", "Sad", "Excited", "Tired", "Stressed", "Calm", "Motivated", "Relaxed", "Neutral"]
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

        loggedUserInfo(): { moodLogs: MoodLog[] } {
            return this.usersStore.getUserLoggedInfo
        },

        formatDate() {
            return (date: string) => format(new Date(date), 'MMMM dd, yyyy');
        }
    },

    methods: {
        handleAction(name: string, id: string, item: MoodLog) {
            if (name === 'Edit') {
                this.currentLog = { ...item }
                this.dialog = true;
            } else if (name === 'Delete') {
                this.moodLogsStore.deleteLog(id);
            }
        },

        saveEditedLog() {
            
            if (this.currentLog) {
                this.moodLogsStore.editLog(this.currentLog._id, {
                    date: this.currentLog.date,
                    mood: this.currentLog.mood,
                    notes: this.currentLog.notes,
                });
                this.dialog = false;
                location.reload()
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
                <v-card-title class="text-h5 mb-1">Mood Log</v-card-title>
                <v-card-subtitle class="text-body-1">Mood data for the week</v-card-subtitle>
            </div>
            <perfect-scrollbar style="height: 450px">
                <v-table class="revenue-table border-table">
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Date</th>
                                <th class="text-h6 font-weight-semibold text-no-wrap">Mood</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in loggedUserInfo.moodLogs" :key="item.date" class="month-item">
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
                                        {{ item.mood }}
                                    </h5>
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
            <v-card-title class="headline">Edit Mood Log</v-card-title>
            <v-card-text>
                <v-col cols="12">
                    <v-label class="font-weight-semibold mb-1">Mood</v-label>
                    <v-select :items="moodOptions" v-model="currentLog.mood" item-text="text" item-value="value"
                        variant="outlined" density="compact" hide-details color="secondary"></v-select>
                </v-col>
                <v-col cols="12">
                    <v-label class="font-weight-semibold mb-1">Notes</v-label>
                    <v-text-field v-model="currentLog.notes" variant="outlined" density="compact" color="secondary"
                        type="text" placeholder="Write about your feelings" />
                </v-col>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="closeDialog">Cancel</v-btn>
                <v-btn color="secondary" @click="saveEditedLog">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>