<script lang="ts">
import { tableActionData } from '@/data/Dashboard';
import { useUsersStore } from "@/stores/users";
import type { SleepLog } from '@/types/dashboard';
import { format } from 'date-fns';

export default {
    data() {
        return {
            usersStore: useUsersStore(),
            tableActionData: tableActionData || [],
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
    }
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
                                                    :key="list.listtitle" hide-details min-height="38">
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
</template>