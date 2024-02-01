import { scrollController } from '@/utils/utils'
export const menu = {
  state: {
    isOpen: null
  },
  mutations: {
    TOGGLE_STATE(state, payload) {
      if (state.isOpen === payload) {
        scrollController.enabledScroll()
        state.isOpen = null
      } else {
        scrollController.disabledScroll()
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
