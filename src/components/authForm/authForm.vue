<template>
    <form id="auth-form" @submit="onSubmit" class="auth-form">
        <label class="auth-form__label" for="name">
            Name
        </label>
        <input id="name" type="text" v-model="name" ref="name" class="text-input auth-form__input" />
        <label class="auth-form__label" for="password">
            Password
        </label>
        <input id="password" type="password" v-model="password" ref="password" class="text-input auth-form__input" />
        <ul v-if="errors.length || internalErrors.length" class="validation_list">
            <li :key="index" class="error" v-for="(error, index) in [...errors, ...internalErrors]">
                {{ error || error.message }}
            </li>
        </ul>
        <button class="auth-form__submit" type="submit">{{ buttonText }}</button>
    </form>
</template>

<script lang="ts">
import Vue from "vue";

interface ComponentData {
    name: string;
    password: string;
    internalErrors: Error[];
}

export default Vue.extend({
    props: {
        submit: {
            type: Function,
            required: true
        },
        buttonText: {
            type: String,
            default: "Login"
        },
        errors: Array
    },
    data(): ComponentData {
        return {
            name: "",
            password: "",
            internalErrors: []
        };
    },

    methods: {
        onSubmit: function(e: Event): void {
            e.preventDefault();

            this.submit({
                name: this.name,
                password: this.password
            });
        }
    },
    mounted: function() {
        (this.$refs.name as HTMLElement).focus();
    }
});
</script>

<style src="./authForm.css"></style>
