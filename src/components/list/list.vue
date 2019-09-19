<template>
    <ul class="list">
        <li v-for="item in items" :key="item.id">
            <TODOItem :item="item" />
        </li>
    </ul>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";
import item from "../item/item.vue";

export default Vue.extend({
    computed: mapState({
        items: (state: State) => state.items.all
    }),
    components: {
        TODOItem: item
    }
});
</script>

<style src="./list.css"></style>
