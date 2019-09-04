<template>
    <form :id="id" @submit="onSubmit">
        <input type="text" v-model="value" ref="input" />
        <button type="submit">{{ buttonText }}</button>
        <ul v-if="errors.length">
            <li :key="error" class="validation-error" v-for="error in errors">{{ error }}</li>
        </ul>
    </form>
</template>

<script lang="ts">
import Vue from "vue";

interface ComponentData {
    value: string;
    errors: string[];
}

export default Vue.extend({
    props: {
        submit: {
            type: Function,
            required: true
        },
        validation: Function,
        initialValue: String,
        id: String,
        buttonText: {
            type: String,
            default: "Add"
        }
    },
    data(): ComponentData {
        return {
            value: this.initialValue || "",
            errors: []
        };
    },
    methods: {
        onSubmit: function(e: Event): void {
            e.preventDefault();

            this.errors = [...this.internalValidation(this.value)];
            if (this.validation) {
                this.errors.push(...this.validation(this.value));
            }
            if (!this.errors.length || this.initialValue === this.value) {
                this.submit(this.value);
                this.value = "";
            }
        },
        internalValidation: function(value: string): string[] {
            const errors = [];

            if (!value) {
                errors.push("Please, add the task name!");
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
