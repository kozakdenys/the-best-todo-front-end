<template>
    <TODOInput
        v-if="editMode"
        :submit="editItem"
        :initial-value="item.name"
        button-text="Edit"
        :errors="item.errors"
        :id="`edit-task-form-${item.id}`"
    ></TODOInput>
    <div v-else class="item">
        <CustomCheckbox class="input__checkbox" :change="onCheck" :value="item.done" />
        <router-link :to="`/details/${item.id}`" :class="`item__text ${item.done ? 'strikethrough' : ''}`">
            {{ item.name }}
        </router-link>
        <button class="item__button item__button--remove" @click="onRemove">Remove</button>
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
        item: Object
    },
    data(): ComponentData {
        return {
            editMode: false
        };
    },
    methods: {
        onEditClick: function(): void {
            this.editMode = true;
        },
        onRemove: function(): void {
            this.$store.dispatch("items/removeItem", this.item.id);
        },
        onCheck: function(): void {
            this.$store.dispatch("items/editItem", {
                ...this.item,
                done: !this.item.done
            });
        },
        editItem: function(value: string): void {
            this.editMode = false;
            this.$store.dispatch("items/editItem", {
                ...this.item,
                name: value
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
