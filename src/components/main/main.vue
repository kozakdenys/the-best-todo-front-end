<template>
    <div class="main">
        <section class="container header">
            <TODONavbar class="row" />
            <div class="row">
                <h1>Every DEV should have TODO!</h1>
                <TODOInput :submit="addItem" :errors="errors" class="input-form--header" id="task-form" />
            </div>
        </section>
        <section class="container">
            <div class="row">
                <TODOList />
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState, mapActions } from "vuex";
import input from "../input/input.vue";
import list from "../list/list.vue";
import navbar from "../navbar/navbar.vue";

export default Vue.extend({
    components: {
        TODOInput: input,
        TODOList: list,
        TODONavbar: navbar
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

<style src="./main.css"></style>
