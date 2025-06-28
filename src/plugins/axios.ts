import axios from 'axios'
import { useUser } from '@/stores/user'

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL
})

axiosInstance.interceptors.request.use(
  (config) => {
    const userStore = useUser()
    if (userStore?.user?.token) {
      config.headers['Authorization'] = `Bearer ${userStore.user.token_graph}`
    }

    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosInstance
