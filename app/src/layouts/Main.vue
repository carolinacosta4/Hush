<script lang="ts">
import { ref, shallowRef } from 'vue';
import sidebarItems from './vertical-sidebar/sidebarItem';
import NavGroup from './vertical-sidebar/NavGroup/index.vue';
import NavItem from './vertical-sidebar/NavItem/index.vue';
import Logo from './logo/Logo.vue';
import { Icon } from '@iconify/vue';
import { useUsersStore } from '@/stores/users';
const sidebarMenu = shallowRef(sidebarItems);
const sDrawer = ref(true);

export default {
    components: {
        NavGroup,
        NavItem,
        Logo,
        Icon,
    },

    setup() {
        return {
            sidebarMenu,
            sDrawer,
        };
    },

    data() {
        return {
            usersStore: useUsersStore(),
        }
    },

    computed: {
        loggedUser() {
            return this.usersStore.getUserLogged;
        },
        loggedUserInfo() {
            return this.usersStore.getUserLoggedInfo
        },
    },

    async created() {
        if (this.loggedUser) {
            await this.usersStore.fetchUserLogged(this.loggedUser);
        }
    },
};
</script>

<template>
    <!------Sidebar-------->
    <v-navigation-drawer left elevation="0" app class="leftSidebar" v-model="sDrawer">
        <!---Logo part -->
        <div class="px-4 py-5">
            <Logo />
        </div>
        <!-- ---------------------------------------------- -->
        <!---Navigation -->
        <!-- ---------------------------------------------- -->
        <div>
            <perfect-scrollbar class="scrollnavbar">
                <v-list class="pa-4 pt-0">
                    <!---Menu Loop -->
                    <template v-for="(item, i) in sidebarMenu">
                        <!---Item Sub Header -->
                        <NavGroup :item="item" v-if="item.header" :key="item.title" />

                        <!---Single Item-->
                        <NavItem :item="item" v-else class="leftPadding" />
                        <!---End Single Item-->
                    </template>
                </v-list>
            </perfect-scrollbar>
        </div>

    </v-navigation-drawer>
    <v-app-bar elevation="0" height="50" class="bg-background">
        <div class="d-flex align-center justify-space-between w-100">
            <div>
                <v-btn class="hidden-lg-and-up text-muted" @click="sDrawer = !sDrawer" icon variant="flat" size="small">
                    <Icon icon="solar:hamburger-menu-outline" height="20"></Icon>
                </v-btn>
            </div>
            <div>
                <v-btn class="profileBtn custom-hover-primary" variant="text" icon @click="$router.push('/account')">
                    <v-avatar size="35">
                        <v-img :src="loggedUserInfo.profilePicture" alt="Profile Picture" aspect-ratio="1"
                            class="rounded-circle" />
                    </v-avatar>
                </v-btn>
            </div>
        </div>
    </v-app-bar>
</template>
