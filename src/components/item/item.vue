<template>
    <div>
        <span>{{ item.value }}</span>
        <button @click="onRemoveClick">Remove</button>
        <button @click="onEditClick">Edit</button>
    </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        item: Object,
        remove: Function,
        edit: Function
    },
    methods: {
        onRemoveClick: function(): void {
            this.remove(this.item.key);
        },
        onEditClick: function(): void {
            this.edit(this.item.key);
        }
    }
});
</script>

<style src="./item.css"></style>
