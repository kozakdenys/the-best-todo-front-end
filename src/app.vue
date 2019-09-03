<template>
    <main>
        <TODOInput :addItem="addItem"></TODOInput>
        <TODOList :items="items" :removeItem="removeItem" :editItem="editItem"></TODOList>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import input from "./components/input/input.vue";
import list from "./components/list/list.vue";

interface ComponentData {
    items: Item[];
    value: string;
}

interface Item {
    key: number;
    value: string;
}

export default Vue.extend({
    data(): ComponentData {
        return {
            items: [],
            value: ""
        };
    },
    components: {
        TODOInput: input,
        TODOList: list
    },
    methods: {
        addItem: function(item: Item): void {
            this.items.unshift(item);
        },
        removeItem: function(key: number): void {
            this.items = this.items.filter(item => item.key !== key);
        },
        editItem: function(key: number): void {
            this.items = this.items.filter(item => item.key !== key);
        }
    }
});
</script>

<style src="./app.css"></style>
