<template>
    <main>
        <h1>TODO</h1>
        <TODOInput :submit="addItem" :validation="validation" id="task-form"></TODOInput>
        <TODOList :items="items" :removeItem="removeItem" :editItem="editItem" :validation="validation"></TODOList>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import input from "./components/input/input.vue";
import list from "./components/list/list.vue";

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
        validation: function(value: string): string[] {
            const errors = [];
            const duplicateItem = this.items.find(item => item.value === value);
            if (duplicateItem) {
                errors.push("Such TODO already exists");
            }
            return errors;
        },
        addItem: function(value: string): void {
            const item = {
                value: value,
                key: hashCode(value)
            };
            this.items.unshift(item);
        },
        removeItem: function(key: number): void {
            this.items = this.items.filter(item => item.key !== key);
        },
        editItem: function(item: Item): void {
            this.items = this.items.map(oldItem => {
                if (oldItem.key !== item.key) {
                    return oldItem;
                } else {
                    return {
                        value: item.value,
                        key: oldItem.key
                    };
                }
            });
        }
    }
});
</script>

<style src="./app.css"></style>
