import axios from 'axios'

const API_URL = 'https://capitals.onrender.com/api/v1/capitals'

export const play = async () => {
  const response = await axios.get(`${API_URL}/play`)
  const { country, capitals } = response.data
  const { name, flag } = country
  return { flag: flag.image, country: name, capitals }
}

export const solve = async (country, capital) => {
  const payload = { country, capital }
  const response = await axios.post(`${API_URL}/solve`, payload)
  const { ok, answer } = response.data
  return { ok, answer }
}
