<script lang="ts">
import { useUsersStore } from '@/stores/users';

export default {
    data() {
        return {
            userStore: useUsersStore(),
        }
    },

    methods: {
        logout() {
            this.userStore.logout();
            this.$router.push('/login');
        }
    }
};

</script>

<template>
    <div>
        <v-btn color="primary" class="mt-4" @click="logout">
            Logout
        </v-btn>
    </div>
</template>
