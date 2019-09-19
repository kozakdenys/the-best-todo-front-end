<template>
    <label class="checkbox">
        <input type="checkbox" v-bind="$props" @change="change" />
        <span class="checkmark"></span>
    </label>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
    props: {
        checked: Boolean,
        change: Function
    }
});
</script>

<style src="./customCheckbox.css"></style>
