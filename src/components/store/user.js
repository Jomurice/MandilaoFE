import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: null,
    user: null,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
    userInfo: (state) => state.user || {},
    fullName: (state) => state.user?.fullName || '',
  },

  actions: {
    login({ token }) {
      this.token = token
      localStorage.setItem('token', token)
    },

    setUser(user) {
      this.user = user
      localStorage.setItem('user', JSON.stringify(user))
    },

    loadFromStorage() {
      this.token = localStorage.getItem('token')

      const userStr = localStorage.getItem('user')
      if (userStr) {
        try {
          this.user = JSON.parse(userStr)
        } catch (e) {
          console.error("Lỗi parse user từ localStorage:", e)
          this.user = null
        }
      }
    },

    clearUser() {
      this.token = null
      this.user = null
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    }
  }
})
