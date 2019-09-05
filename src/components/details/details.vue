<template>
    <div class="main">
        <section class="container">
            <div class="row">
                {{ details && details.value }}
            </div>
        </section>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapState } from "vuex";

export default Vue.extend({
    computed: mapState({
        details: (state: State) => state.details.details
    }),
    created() {
        this.$store.dispatch("details/getDetails", +this.$route.params.key);
    }
});
</script>

<style src="./details.css"></style>
