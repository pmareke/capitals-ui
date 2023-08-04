<script>
import axios from 'axios'

export default {
  methods: {
    async play() {
      const data = (await axios.get('https://capitals.onrender.com/api/v1/capitals/play')).data
      this.flag = data.country.flag.image
      this.country = data.country.name
      this.capitals = data.capitals
    },
    async solve(event) {
      const capital = event.srcElement.innerText
      const payload = {
        country: this.country,
        capital
      }
      const data = (await axios.post('https://capitals.onrender.com/api/v1/capitals/solve', payload)).data
      this.ok = data.ok
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
        ok: false
      }
    },
}
</script>

<template>
  <div>
    <h1>{{country}}</h1>
    <img :src="flag" style="width:300px"/>
    <hr>
    <button @click="solve" v-for="capital in capitals">
      {{ capital }}
    </button>
    <div v-if="ok">CORRECTA!!!</div>
  </div>
</template>
