
export const navLinks = {
  state: {
    navLinks: [
      {
        title: 'Главная',
        url: '/'
      },
      {
        title: 'Обо мне',
        url: '/about'
      }
    ]
  },
  mutations: {
    SET_NAV_LINKS(state, payload) {
      state.navLinks = payload
    }
  },
  actions: {
    // async getNavLinks({ commit }) {
    //   try {
    //     const response = await axios.get('/api/main/')
    //     commit('SET_NAV_LINKS', response.data.navLinks)
    //   } catch (error) {
    //     console.error('Error fetching navLinks:', error)
    //   }
    // }
  },
  getters: {
    navLinks(state) {
      return state.navLinks
    }
  }
}
