export const menu = {
  state: {
    isOpen: null
  },
  mutations: {
    TOGGLE_STATE(state, payload) {
      if (state.isOpen === payload) {
        state.isOpen = null
      } else {
        state.isOpen = payload
      }
    },
    CLOSE_MENU(state) {
      state.isOpen = null
    }
  },
  actions: {
    toggleState({ commit }, payload) {
      commit('TOGGLE_STATE', payload)
    },
    closeMenu({ commit }) {
      commit('CLOSE_MENU')
    }
  },
  getters: {
    isOpen(state) {
      return state.isOpen
    }
  }
}
