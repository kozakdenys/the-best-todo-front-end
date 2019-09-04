<template>
    <TODOInput
        v-if="editMode"
        :submit="editItem"
        :initial-value="item.value"
        button-text="Edit"
        :validation="validation"
        :id="`edit-task-form-${item.key}`"
    ></TODOInput>
    <div v-else class="item">
        <CustomCheckbox class="input__checkbox" :change="onCheck" :value="item.done" />
        <span :class="`item__text ${item.done ? 'strikethrough' : ''}`">{{ item.value }}</span>
        <button class="item__button item__button--remove" @click="onRemoveClick">Remove</button>
        <button class="item__button item__button--edit" @click="onEditClick">Edit</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import input from "../input/input.vue";
import CustomCheckbox from "../customCheckbox/customCheckbox.vue";

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
        onCheck: function(): void {
            this.edit({
                ...this.item,
                done: !this.item.done
            });
        },
        editItem: function(value: string): void {
            this.editMode = false;
            this.edit({
                ...this.item,
                value
            });
        }
    },
    components: {
        TODOInput: input,
        CustomCheckbox
    }
});
</script>

<style src="./item.css"></style>
