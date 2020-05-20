<template>
  <v-app>
    <v-app-bar fixed app color="white">
      <v-app-bar-nav-icon class="ml-3">
        <v-img src="https://www.cryptokitties.co/icons/logo.svg"></v-img>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="title">CryptoKitties Contest</v-toolbar-title>
    </v-app-bar>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
