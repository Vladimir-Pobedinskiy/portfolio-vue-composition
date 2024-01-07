<template>
  <template v-if="isLoading">
    <AppLoading :isLoading="isLoading" />
  </template>
  <template v-else>
    <div class="heroes-view offset-page-br">
      <div class="container">
        <UIBreadcrumbs :breadcrumbs="breadcrumbs" />
        <h1 class="heroes-view__title title h1">{{ description.title }}</h1>

        <ul class="description-list">
          <li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
        </ul>

        <HeroSlider :hero-list="heroList" />
      </div>
    </div>
  </template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import AppLoading from '@/components/App/AppLoading'
import axios from 'axios'
import HeroSlider from '@/components/Hero/HeroSlider'

export default {
  components: { AppLoading, HeroSlider },
  name: 'HeroesView',
  data() {
    return {
      breadcrumbs: [],
      description: {},
      heroList: []
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading'
    })
  },
  created() {
    this.getData()
  },
  methods: {
    ...mapActions({
      startLoading: 'startLoading',
      endLoading: 'endLoading'
    }),
    async getData() {
      try {
        this.startLoading()
        const response = await axios.get('/api/heroes/')
        this.breadcrumbs = response.data.breadcrumbs
        this.description = response.data.description
        this.heroList = response.data.heroList
        this.endLoading()
      } catch (error) {
        this.endLoading()
        this.$vfm.open('ModalError')
        console.error('Error fetching heroes:', error)
      }
    }
  }
}
</script>
