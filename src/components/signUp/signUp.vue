<template>
    <section class="container header header--auth">
        <div class="row">
            <h1>Sign Up</h1>
            <AuthForm :submit="signUp" :errors="errors" buttonText="Sign Up" />
            <router-link to="/login">Login</router-link>
        </div>
    </section>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import AuthForm from "../authForm/authForm.vue";

export default Vue.extend({
    components: {
        AuthForm
    },
    computed: mapState({
        errors: (state: State) => state.auth.authErrors
    }),
    methods: {
        ...mapActions("auth", ["signUp"])
    }
});
</script>

<style src="./signUp.css"></style>
