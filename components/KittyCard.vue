<template>
  <v-card v-bind="$attrs">
    <v-card-title class="align-start">
      <div v-if="$fetchState.pending" style="min-height: 54px;">
        Fetching Kitty... pspspsps
      </div>
      <div v-else class="d-block" style="width: 100%; min-height: 54px;">
        <div class="d-flex">
          <div>#{{ kitty.id }}</div>
          <v-chip outlined class="ml-auto my-1" small>
            Gen {{ kitty.eth.generation }}
          </v-chip>
        </div>
        <div class="subtitle-2 text--secondary">{{ kitty.name }}</div>
      </div>
    </v-card-title>
    <v-img
      v-if="$fetchState.pending"
      src="https://www.cryptokitties.co/images/loader.gif"
      aspect-ratio="1.5"
      contain
    ></v-img>
    <v-img v-else :src="kitty.image_url" aspect-ratio="1.5" fill>
      <v-avatar
        v-if="kitty.votes !== null"
        class="ma-3 elevation-3"
        color="accent"
        size="48"
      >
        <span class="font-weight-bold headline">{{ kitty.votes }}</span>
      </v-avatar>
    </v-img>
    <v-expand-transition>
      <div v-if="!$fetchState.pending">
        <v-card-text class="py-2">
          <div class="d-flex">
            <v-icon small class="mr-1">mdi-dna</v-icon>
            <div class="caption text--primary">Genes</div>
          </div>
          <div class="overline">
            {{ kitty.eth.genes }}
          </div>

          <div class="d-flex pt-2">
            <v-icon small class="mr-1 pb-1">mdi-cake</v-icon>
            <div class="caption text--primary">Cakeday</div>
          </div>
          <div class="overline">
            {{ parseBirthTime(kitty.eth) }}
          </div>
        </v-card-text>
        <v-card-actions>
          <v-btn
            v-if="kitty.votes !== null"
            text
            small
            color="primary"
            @click="voteForKitty"
          >
            Vote for me
            <v-icon right small>mdi-paw</v-icon>
          </v-btn>
          <v-btn v-else text small color="primary" @click="addKitty">
            Add to contest
          </v-btn>
        </v-card-actions>
      </div>
    </v-expand-transition>
  </v-card>
</template>

<script>
export default {
  props: {
    id: { type: [String, Number], required: true, default: 1 },
    votes: { type: Number, default: null },
  },
  async fetch() {
    const [apiKitty, ethKitty] = await Promise.all([
      this.$axios.$get(`https://api.cryptokitties.co/kitties/${this.id}`),
      this.$kitties().getKitty(this.id).call(),
    ])
    this.kitty = { ...this.kitty, ...apiKitty, eth: ethKitty }
  },
  data() {
    return {
      kitty: {
        votes: this.votes,
        eth: {},
      },
      kittiesContract: null,
    }
  },
  watch: {
    id: '$fetch',
    votes: 'updateVotes',
  },
  methods: {
    parseBirthTime({ birthTime }) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' }
      if (birthTime)
        return new Date(birthTime * 1000).toLocaleString('en', options)
    },
    updateVotes(votes) {
      this.kitty.votes = votes
    },
    async addKitty() {
      const { votes } = await this.$axios.$post('/api/kitties', {
        id: this.kitty.id,
      })
      this.updateVotes(votes)
    },
    async voteForKitty() {
      const { votes } = await this.$axios.$post(
        `/api/kitties/${this.kitty.id}/vote`
      )
      this.updateVotes(votes)
    },
  },
}
</script>
