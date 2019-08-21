<template>
    <h1>{{ grating }}</h1>
</template>

<script lang="ts">
import Vue from "vue";

interface ComponentData {
    grating: string;
}

export default Vue.extend({
    data(): ComponentData {
        return {
            grating: "Hello World"
        };
    }
});
</script>

<style src="./style.css"></style>
