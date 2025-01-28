<script setup lang="ts">
</script>

<template>
    <v-row class="d-flex mb-3">
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Name</v-label>
            <v-text-field variant="outlined" density="compact" hide-details color="secondary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Email</v-label>
            <v-text-field variant="outlined" density="compact" type="email" hide-details color="secondary"></v-text-field>
        </v-col>
        <v-col cols="12">
            <v-label class="font-weight-semibold mb-1">Password</v-label>
            <v-text-field variant="outlined" type="password" density="compact"  hide-details color="secondary"></v-text-field>
        </v-col>
        <v-col cols="12" >
            <v-btn to="/" rounded="md" color="secondary" size="large" block   flat>Sign up</v-btn>
        </v-col>
    </v-row>
</template>
