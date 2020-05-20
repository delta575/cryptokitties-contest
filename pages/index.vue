<template>
  <div>
    <div class="d-flex">
      <v-text-field
        v-model="kittyId"
        solo
        hide-details
        clearable
        prefix="#"
        append-icon="mdi-magnify"
        label="Kitty ID"
      ></v-text-field>
      <v-btn
        v-if="random"
        class="ml-3"
        color="primary"
        height="48"
        @click="resetKitties"
        >contest</v-btn
      >
      <v-btn class="ml-3" color="primary" height="48" @click="getRandomKitties">
        random kitties!
        <v-icon right>mdi-cat</v-icon>
      </v-btn>
    </div>

    <v-row>
      <v-col v-if="kittyId">
        <KittyCard
          :id="kittyId"
          :votes="kittyVotes(kittyId)"
          hover
          max-width="600"
        ></KittyCard>
      </v-col>
      <v-col
        v-for="kitty in kitties"
        v-else
        :key="kitty.id"
        cols="12"
        sm="6"
        md="4"
        lg="3"
        xl="2"
      >
        <KittyCard
          :id="kitty.id"
          :votes="kitty.votes"
          class="fill-height"
          hover
        ></KittyCard>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import KittyCard from '~/components/KittyCard'

const getRandomArbitrary = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min

export default {
  components: {
    KittyCard,
  },
  async fetch() {
    this.dbKitties = await this.fetchKitties()
    this.kittySupply = await this.$kitties().totalSupply().call()

    this.updateKitties(this.dbKitties)
  },
  data() {
    return {
      kittyId: null,
      dbKitties: [],
      kitties: [],
      kittySupply: null,
      random: false,
    }
  },
  methods: {
    generateRandomKitty() {
      return { id: getRandomArbitrary(1, this.kittySupply) }
    },
    getRandomKitties() {
      this.kitties = [...new Array(8)].map(this.generateRandomKitty)
      this.random = true
    },
    resetKitties() {
      this.updateKitties(this.dbKitties)
      this.random = false
    },
    updateKitties(kitties) {
      this.kitties = kitties
    },
    kittyVotes(id) {
      const kitty = this.kitties.find((kitty) => kitty.id === parseInt(id))
      return kitty && kitty.votes
    },
    async fetchKitties() {
      const { data } = await this.$axios.get('/api/kitties')
      return data
    },
  },
}
</script>
