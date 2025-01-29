<script lang="ts">
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            username: '',
            password: '',
            checkbox: true,
            usersStore: useUsersStore(),
            error: ''
        }
    },
    methods: {
        async submit() {
            try {
                await this.usersStore.login(this.username, this.password)
                if (this.usersStore.getToken != null) {
                    this.$router.push({ name: "Dashboard" })
                }
            } catch (error: any) {
                this.error = error
            }
        }
    }
}
</script>

<template>
    <form @submit.prevent="submit">
        <v-row class="d-flex mb-3">
            <v-col cols="12">
                <v-label class="font-weight-semibold mb-1">Username</v-label>
                <v-text-field variant="outlined" v-model="username" density="compact" hide-details
                    color="secondary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-semibold mb-1">Password</v-label>
                <v-text-field variant="outlined" v-model="password" density="compact" type="password" hide-details
                    color="secondary"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-alert v-if="error" type="error" dense elevation="0">{{ error }}</v-alert>
            </v-col>
            <v-col cols="12" class="pt-0">
                <div class="d-flex flex-wrap align-center">
                    <v-checkbox v-model="checkbox" color="secondary" hide-details>
                        <template v-slot:label class="text-body-1">Remember this Device</template>
                    </v-checkbox>
                    <div class="ml-sm-auto">
                        <RouterLink to="/"
                            class="text-secondary text-decoration-none text-body-1 opacity-1 font-weight-medium">Forgot
                            Password ?</RouterLink>
                    </div>
                </div>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Sign in</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
