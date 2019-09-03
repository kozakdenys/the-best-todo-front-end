<template>
    <form id="task-form" @submit="onSubmit">
        <label for="value">TODO</label>
        <input id="value" type="text" v-model="value" />
        <button type="submit">Add</button>
        <ul v-if="errors.length">
            <li :key="error" class="validation-error" v-for="error in errors">{{ error }}</li>
        </ul>
    </form>
</template>

<script lang="ts">
import Vue from "vue";

function hashCode(value: string): number {
    let hash = 0;
    for (let i = 0; i < value.length; i++) {
        const character = value.charCodeAt(i);
        hash = (hash << 5) - hash + character;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash;
}

interface ComponentData {
    value: string;
    errors: string[];
}

export default Vue.extend({
    props: {
        addItem: Function
    },
    data(): ComponentData {
        return {
            value: "",
            errors: []
        };
    },
    methods: {
        onSubmit: function(e: Event): void {
            e.preventDefault();
            if (this.checkForm()) {
                this.addItem({
                    value: this.value,
                    key: hashCode(this.value)
                });
                this.value = "";
            }
        },
        checkForm: function(): boolean {
            this.errors = [];

            if (!this.value) {
                this.errors.push("Please, add the task name!");
                return false;
            }
            return true;
        }
    }
});
</script>

<style src="./input.css"></style>
