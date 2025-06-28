import { defineStore } from 'pinia'
import { User } from '@/models/entities/User'
import { jwtDecode, type JwtPayload } from 'jwt-decode'

export const useUser = defineStore('user', {
  state: () => ({
    user: null as User | null
  }),
  getters: {
    isAuthenticated(): boolean {
      if (this.user == null) return false
      if (this.user.token == null) return false

      const decoded: JwtPayload = jwtDecode(this.user.token)

      if (decoded === undefined || decoded.exp === undefined) {
        return false
      }

      const interval = new Date(decoded.exp * 1000).getTime() - new Date().getTime()

      if (interval > 0) {
        return true
      }

      return false
    }
  },
  actions: {
    setUser(newUser: User | null) {
      this.user = newUser
    }
  },
  persist: true
})
