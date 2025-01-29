<script lang="ts">
import { useUsersStore } from "@/stores/users";

export default {
    data() {
        return {
            username: '',
            email: '',
            password: '',
            usersStore: useUsersStore(),
            error: ''
        }
    },
    methods: {
        async submit() {
            try {
                await this.usersStore.register({ username: this.username, email: this.email, password: this.password });

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
                <v-text-field v-model="username" variant="outlined" density="compact" hide-details
                    color="secondary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-semibold mb-1">Email</v-label>
                <v-text-field v-model="email" variant="outlined" density="compact" type="email" hide-details
                    color="secondary"></v-text-field>
            </v-col>
            <v-col cols="12">
                <v-label class="font-weight-semibold mb-1">Password</v-label>
                <v-text-field v-model="password" variant="outlined" type="password" density="compact" hide-details
                    color="secondary"></v-text-field>
            </v-col>
            <v-col cols="12" class="pt-0">
                <v-alert v-if="error" type="error" dense elevation="0">{{ error }}</v-alert>
            </v-col>
            <v-col cols="12">
                <v-btn rounded="md" color="secondary" size="large" block flat type="submit">Sign up</v-btn>
            </v-col>
        </v-row>
    </form>
</template>
