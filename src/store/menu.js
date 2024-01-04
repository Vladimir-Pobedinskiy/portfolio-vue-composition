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
    }
  },
  actions: {
    toggleState({ commit }, payload) {
      commit('TOGGLE_STATE', payload)
    }
  },
  getters: {
    isOpen(state) {
      return state.isOpen
    }
  }
}
