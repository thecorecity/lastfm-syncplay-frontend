<script setup>
import {inject} from "vue";

/** @type {ApiClient} */
const api = inject("$api");

function connect() {
  api.connect();
}
</script>

<template>
  <v-form>
    <v-btn @click="connect">Try Connecting</v-btn>
  </v-form>
</template>
