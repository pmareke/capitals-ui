<script>
import Twitter from './Twitter'
import { play, solve } from '../functions'

export default {
  components: {
    Twitter
  },
  methods: {
    async play() {
      if (!this.ok) this.hits = 0
      const {flag, country, capitals, ok} = await play()
      this.flag = flag
      this.country = country
      this.capitals = capitals
      this.ok = true
    },
    async solve(event) {
      const capital = event.srcElement.innerText
      const { ok, answer } = await solve(this.country, capital)
      this.ok = ok
      if (ok) {
        this.hits += 1
        this.play()
      } else {
        this.answer = answer
      }
    }
  },
  mounted () {
    this.ok = true
    this.play()
  },
  data() {
      return {
        flag: null,
        country: null,
        capitals: [],
        answer: null,
        ok: false,
        hits: 0
      }
    },
}
</script>

<template>
  <div class="flex flex-col max-w-sm max-h m-auto h-screen">
    <div class="flex justify-center items-center m-6 pb-2 border-b-2">
      <a class="mr-2 text-4xl font-bold" href="/">Capitals Quiz</a>
      <font-awesome-icon class="text-3xl" :icon="['far', 'flag']" />
    </div>
    <div v-if="ok" class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mt-6">{{country}}</h1>
      <div class="m-8 mt-2">
        <img :src="flag" class="border-2 border-gray-300 p-1 object-cover"
        style="width:300px;height:200px"/>
      </div>
      <div class="flex flex-col items-center w-2/3">
        <button class="w-full m-2 bg-transparent text-gray-700
          font-semibold py-2 px-4 border border-gray-400 rounded" @click="solve" v-for="capital in capitals">
          {{ capital }}
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center" v-else>
      <p class="text-2xl mb-4">Sorry, but the correct capital was</p>
      <p class="text-3xl font-bold mb-8">{{answer}}</p>
      <p class="text-xl mb-8 italic">You can know more about {{country}} <a class="font-bold" :href="'https://www.google.com/search?q=' + country">here</a></p>
      <p class="text text-xl">You got <b>{{hits}}</b> in a row!</p>
      <div class="mt-8 flex flex-col">
        <Twitter class="mb-4" :hits="hits" />
        <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" @click="play">Play again!</button>
      </div>
    </div>
    <div class="grow flex items-start justify-center mt-6">
      <p class="text-m font-bold italic">Made by <a class="underline" href="http://www.pmareke.com">@pmareke</a> </p>
    </div>
  </div>
</template>
