<script>
import axios from 'axios'
import Twitter from './Twitter'

export default {
  components: {
    Twitter
  },
  methods: {
    async play() {
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
  <div>
    <div v-if="ok">
      <h1>Hits: {{hits}}</h1>
      <h1>{{country}}</h1>
      <img :src="flag" style="width:300px"/>
      <hr>
      <button @click="solve" v-for="capital in capitals">
        {{ capital }}
      </button>
    </div>
    <div v-else>
      <p>Sorry, but the correct capital was {{answer}}</p>
      <p>You did a strike of {{hits}} hits!</p>
      <Twitter :hits="hits" />
      <button @click="play">Play again!</button>
    </div>
  </div>
</template>
