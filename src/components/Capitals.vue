<script>
import axios from 'axios'
import Twitter from './Twitter'

export default {
  components: {
    Twitter
  },
  methods: {
    async play() {
      if (!this.ok) {
        this.hits = 0
      }
      const response = await axios.get('https://capitals.onrender.com/api/v1/capitals/play')
      const data = response.data
      this.flag = data.country.flag.image
      this.country = data.country.name
      this.capitals = data.capitals
      this.ok = true
    },
    async solve(event) {
      const capital = event.srcElement.innerText
      const payload = {
        country: this.country,
        capital
      }
      const response = await axios.post('https://capitals.onrender.com/api/v1/capitals/solve', payload)
      const data = response.data
      this.ok = data.ok
      if (this.ok) {
        this.hits += 1
        this.play()
      } else {
        this.answer = data.capital
      }
    }
  },
  mounted () {
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
  <div class="grid max-w-sm max-h m-auto h-screen">
    <h1 class="text-4xl font-bold m-6 border-b-2">Capitals Quiz</h1>
    <div v-if="ok" class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mt-6">{{country}}</h1>
      <img :src="flag" style="width:300px" class="border-2 mt-2 mb-8"/>
      <div class="flex flex-col items-center">
        <button class="m-2 bg-transparent text-gray-700
          font-semibold py-2 px-4 border border-gray-400 rounded" @click="solve" v-for="capital in capitals">
          {{ capital }}
        </button>
      </div>
    </div>
    <div class="flex flex-col items-center" v-else>
      <p class="text-2xl mb-4">Sorry, but the correct capital was</p>
      <p class="text-3xl font-bold mb-8">{{answer}}</p>
      <p class="text text-xl">You got <b>{{hits}}</b> in a row!</p>
      <div class="mt-8 flex flex-col">
        <Twitter class="mb-4" :hits="hits" />
        <button class="bg-green-500 text-white font-bold py-2 px-4 rounded" @click="play">Play again!</button>
      </div>
    </div>
    <p class="text-sm font-bold mt-10">Made with love by <a
       class="underline"
       href="http://www.pmareke.com">@pmareke</a> </p>
  </div>
</template>
