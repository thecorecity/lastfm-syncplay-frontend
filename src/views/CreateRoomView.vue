<script setup>
import {inject} from "vue";
import router from "@/router";
import CreateRoomRequestMessage from "@/modules/api/messages/out/CreateRoomRequestMessage";

/** @type {ApiClient} */
const api = inject("$api");

let usePassword = $ref(false);
let password = $ref("");
let isLoading = $ref(false);

if (!api.connected)
  router.push('/home');

async function createRoom() {
  isLoading = true;

  api.send(new CreateRoomRequestMessage({
    password: usePassword ? password : null
  }));

  setTimeout(() => {
    isLoading = false;
  }, 5000);

  api.onMessage("roomCreated", event => {
    router.push(`/room/${event.detail.roomId}`);
  });
}
</script>

<template>
  <v-form @submit.prevent="createRoom" :disabled="isLoading">
    <v-card max-width="800px" class="mx-auto py-2">
      <v-card-title>Create New Room</v-card-title>
      <v-card-text>
        <v-checkbox v-model="usePassword" label="Protect room by password"></v-checkbox>
        <v-text-field v-if="usePassword" v-model="password" type="password" required label="Password"></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn type="submit" color="primary" :loading="isLoading">Create</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>