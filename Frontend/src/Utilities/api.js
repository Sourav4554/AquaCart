import axios from 'axios'

const api=axios.create({
baseURL:` http://localhost:4000/api/user/`
})

export const googleAuth=(code)=>api.get(`/google?code=${code}`)