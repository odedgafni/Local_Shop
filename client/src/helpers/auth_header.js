import axios from 'axios'

export const authHeader = () => {
  const token = localStorage.getItem('token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = token
  }
  else axios.defaults.headers.common['Authorization'] = ""
}