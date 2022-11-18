<script setup>
import {inject} from "vue";

/** @type {ApiClient} */
const api = inject("$api");

let isLoggedIn = $ref(api.connected);
let userId = $ref(api.userId);

function connect() {
  api.connect();

  api.on('open', event => {
    api.onMessage('hello', event => {
      userId = event.detail.userId;
      isLoggedIn = true;
    });

    api.on('close', event => {
      isLoggedIn = false;
    });
  });
}
</script>

<template>
  <div>
    <v-card max-width="800px" class="mx-auto my-2">
      <v-card-title>Connection</v-card-title>
      <v-card-text>
        <v-list lines="two">
          <v-list-item v-if="!isLoggedIn">
            <template v-slot:prepend>
              <v-avatar color="primary">
                <v-icon icon="mdi-account"></v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>User</v-list-item-title>
            <v-list-item-subtitle>Not connected</v-list-item-subtitle>
          </v-list-item>
          <v-list-item v-else>
            <template v-slot:prepend>
              <v-avatar color="primary">
                <v-icon icon="mdi-account"></v-icon>
              </v-avatar>
            </template>
            <v-list-item-title>User</v-list-item-title>
            <v-list-item-subtitle>{{ userId }}</v-list-item-subtitle>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-actions>
        <v-btn v-if="!isLoggedIn" color="success" variant="flat" @click="connect">Connect</v-btn>
      </v-card-actions>
    </v-card>
    <v-card max-width="800px" class="mx-auto my-2">
      <v-card-title>Rooms Browser</v-card-title>
      <v-card-actions>
        <v-btn color="primary" :disabled="!isLoggedIn" to="/room/new">Create Room</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>
