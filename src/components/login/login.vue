<template>
    <section class="container header header--auth">
        <div class="row">
            <h1>Login</h1>
            <AuthForm :submit="login" :errors="errors" buttonText="Login" />
            <router-link to="/signup">Sign Up</router-link>
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
        ...mapActions("auth", ["login"])
    }
});
</script>

<style src="./login.css"></style>
