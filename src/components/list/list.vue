<template>
    <ul>
        <li v-for="item in items" :key="item.key">
            <TODOItem :item="item" :edit="editItem" :remove="removeItem" :validation="validation" />
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import item from "../item/item.vue";

export default Vue.extend({
    props: {
        items: Array,
        removeItem: Function,
        editItem: Function,
        validation: Function
    },
    components: {
        TODOItem: item
    }
});
</script>

<style src="./list.css"></style>
