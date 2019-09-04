<template>
    <TODOInput
        v-if="editMode"
        :submit="editItem"
        :initial-value="item.value"
        button-text="Edit"
        :validation="validation"
        :id="`edit-task-form-${item.key}`"
    ></TODOInput>
    <div v-else>
        <span>{{ item.value }}</span>
        <button @click="onRemoveClick">Remove</button>
        <button @click="onEditClick">Edit</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import input from "../input/input.vue";

interface ComponentData {
    editMode: boolean;
}

export default Vue.extend({
    props: {
        item: Object,
        remove: Function,
        edit: Function,
        validation: Function
    },
    data(): ComponentData {
        return {
            editMode: false
        };
    },
    methods: {
        onRemoveClick: function(): void {
            this.remove(this.item.key);
        },
        onEditClick: function(): void {
            this.editMode = true;
        },
        editItem: function(value: string): void {
            this.editMode = false;
            this.edit({
                key: this.item.key,
                value: value
            });
        }
    },
    components: {
        TODOInput: input
    }
});
</script>

<style src="./item.css"></style>
