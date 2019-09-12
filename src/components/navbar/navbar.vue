<template>
    <div class="navbar">
        <p v-if="user">Hello, {{ user.name }}</p>
        <button class="navbar__logout" @click="logout">Logout</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";

export default Vue.extend({
    computed: mapState({
        user: (state: State) => state.auth.user
    }),
    methods: {
        ...mapActions("auth", ["logout"])
    }
});
</script>

<style src="./navbar.css"></style>
