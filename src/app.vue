<template>
    <main class="main">
        <section class="header container">
            <div class="row">
                <h1>Every DEV should have TODO!</h1>
                <TODOInput :submit="addItem" :errors="errors" class="input-form--header" id="task-form" />
            </div>
        </section>
        <section class="list container">
            <div class="row">
                <TODOList />
            </div>
        </section>
    </main>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import input from "./components/input/input.vue";
import list from "./components/list/list.vue";

export default Vue.extend({
    components: {
        TODOInput: input,
        TODOList: list
    },
    computed: mapState({
        errors: (state: State) => state.items.addItemErrors
    }),
    methods: {
        ...mapActions("items", ["addItem"])
    },
    created() {
        this.$store.dispatch("items/getItems");
    }
});
</script>

<style src="./app.css"></style>
