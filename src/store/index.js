import { createStore } from 'vuex'

import { navLinks } from './navLinks'
import { menu } from './menu'

export const store = createStore({
  state: {
    isLoading: false
  },
  mutations: {
    START_LOADING(state) {
      state.isLoading = true
    },
    END_LOADING(state) {
      state.isLoading = false
    }
  },
  actions: {
    startLoading({ commit }) {
      commit('START_LOADING')
    },
    endLoading({ commit }) {
      commit('END_LOADING')
    }
  },
  getters: {
    isLoading(state) {
      return state.isLoading
    }
  },
  modules: {
    navLinks, menu
  }
})
