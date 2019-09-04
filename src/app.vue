<template>
    <main class="main">
        <section class="header container">
            <div class="row">
                <h1>Every DEV should have TODO!</h1>
                <TODOInput
                    class="input-form--header"
                    :submit="addItem"
                    :validation="validation"
                    id="task-form"
                ></TODOInput>
            </div>
        </section>
        <section class="list container">
            <div class="row">
                <TODOList
                    :items="items"
                    :removeItem="removeItem"
                    :editItem="editItem"
                    :validation="validation"
                ></TODOList>
            </div>
        </section>
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
    done: boolean;
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
                key: hashCode(value),
                done: false
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
                    return item;
                }
            });
        }
    }
});
</script>

<style src="./app.css"></style>
