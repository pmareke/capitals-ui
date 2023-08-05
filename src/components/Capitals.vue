<script>
import Header from './Header'
import Footer from './Footer'
import Twitter from './Twitter'
import { play, solve } from '../functions'

export default {
  components: {
    Header,
    Footer,
    Twitter
  },
  methods: {
    async play() {
      if (!this.ok) {
        this.hits = 0
        this.seconds = 0
        this.intervalId = setInterval(() => {this.seconds++}, 1000)
      }
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
        clearInterval(this.intervalId);
      }
    }
  },
  mounted () {
    this.ok = true
    this.play()
    this.intervalId = setInterval(() => {this.seconds++}, 1000)
  },
  data() {
      return {
        flag: null,
        country: null,
        capitals: [],
        answer: null,
        ok: false,
        hits: 0,
        seconds: 0
      }
    },
}
</script>

<style scoped>
  .game {
    position: relative;
  }
  .timer {
    position: absolute;
    top: -10px;
    right: auto;
  }
  .v-leave,
  .v-enter-to {
      position: relative;
      opacity: 1;
  }

  .v-enter,
  .v-leave-to {
      position: absolute;
      opacity: 0;
  }
  .v-enter-active,
  .v-leave-active {
    transition: opacity 0.5s ease;
  }

  .v-enter-from,
  .v-leave-to {
    opacity: 0;
  }
</style>

<template>
  <div class="flex flex-col max-w-sm max-h m-auto h-screen">
    <Header />
    <div v-if="ok" class="game flex flex-col items-center">
      <div class="timer flex items-baseline">
        <font-awesome-icon class="text-m mr-2" :icon="['far', 'clock']" />
        <p class="text-2xl font-bold">{{seconds}}s</p>
      </div>
      <h1 class="text-2xl font-bold mt-6">{{country}}</h1>
      <div class="m-8 mt-2">
        <Transition>
          <img :src="flag" :key="country" class="border-2 border-gray-300 p-1 object-cover"
        style="width:300px;height:200px"/>
        </Transition>
      </div>
      <div class="flex flex-col items-center w-2/3">
        <button class="w-full m-2 bg-transparent text-gray-700
          font-semibold py-2 px-4 border border-gray-400 rounded" @click="solve" v-for="capital in capitals">
          {{ capital }}
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center" v-else>
      <p class="text text-xl mb-8">You got <b>{{hits}} hits</b> in <b>{{seconds}} seconds</b>!</p>
      <p class="text-2xl mb-4 p-2">Sorry, but the capital of <b>{{country}}</b> is:</p>
      <p class="text-3xl font-bold mb-8">{{answer}}</p>
      <p class="text-xl italic p-2">You can know more about {{country}} <a
        class="font-bold" :href="'https://www.google.com/search?q=' +
        country">here</a>.</p>
      <div class="mt-8 flex flex-col">
        <Twitter class="mb-4" :hits="hits" :seconds="seconds" />
        <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" @click="play">Play again!</button>
      </div>
    </div>
    <Footer />
  </div>
</template>

