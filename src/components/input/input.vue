<template>
    <form :id="id" @submit="onSubmit" class="input-form">
        <div class="input-form__input-container">
            <input type="text" v-model="value" ref="input" class="text-input input-form__input" />
            <button class="input-form__button" type="submit">{{ buttonText }}</button>
        </div>
        <ul v-if="errors.length || internalErrors.length" class="validation_list">
            <li :key="index" class="error" v-for="(error, index) in [...errors, ...internalErrors]">
                {{ error || error.message }}
            </li>
        </ul>
    </form>
</template>

<script lang="ts">
import Vue from "vue";

interface ComponentData {
    value: string;
    internalErrors: Error[];
}

export default Vue.extend({
    props: {
        submit: {
            type: Function,
            required: true
        },
        initialValue: String,
        id: String,
        buttonText: {
            type: String,
            default: "Add"
        },
        errors: Array
    },
    data(): ComponentData {
        return {
            value: this.initialValue || "",
            internalErrors: []
        };
    },

    methods: {
        onSubmit: function(e: Event): void {
            e.preventDefault();

            this.internalErrors = [...this.internalValidation(this.value)];
            if (!this.internalErrors.length || this.initialValue === this.value) {
                this.submit(this.value);
                this.value = "";
            }
        },
        internalValidation: function(value: string): Error[] {
            const errors = [];

            if (!value) {
                errors.push(new Error("Please, add the task name!"));
            }
            return errors;
        }
    },
    mounted: function() {
        (this.$refs.input as HTMLElement).focus();
    }
});
</script>

<style src="./input.css"></style>
