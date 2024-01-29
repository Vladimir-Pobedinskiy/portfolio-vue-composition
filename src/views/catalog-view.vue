<template>
  <template v-if="isLoading">
    <AppLoading :is-loading="isLoading" />
  </template>
  <template v-else>
    <div class="catalog-page offset-page-br">
      <div class="container">
        <UIBreadcrumbs :breadcrumbs="breadcrumbs" />
        <h1 class="catalog-page__title title h1">{{ description.title }}</h1>
        <ul class="description-list">
          <li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
        </ul>

        <section class="catalog-page__content">
          <div class="catalog-page__content-top">
            <h2 class="catalog-page__content-title h2">Каталог героев</h2>
            <div class="catalog-page__sort-wrapper sort-wrapper">
              <CatalogSort :sort="sort" @handleSort="handleSort" />
            </div>
          </div>
          <div class="catalog-page__left-side"></div>
          <div class="catalog-page__right-side">
            <template v-if="isLoadingLocal">
              <AppLoading :is-loading-local="isLoadingLocal" />
            </template>
            <template v-else>
              <CatalogFeed :products="products" />
            </template>
          </div>
        </section>
      </div>
    </div>
  </template>
</template>

<script>
import AppLoading from '@/components/App/AppLoading'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import axios from 'axios'
import { useVfm } from 'vue-final-modal'
import CatalogFeed from '@/components/Catalog/Feed'
import CatalogSort from '@/components/Catalog/Sort'
import { parse, stringify } from 'qs'
import { useRoute } from 'vue-router'

export default {
  name: 'CatalogView',
  components: { AppLoading, CatalogFeed, CatalogSort },
  setup() {
    const route = useRoute()
    const store = useStore()
    const breadcrumbs = ref([])
    const description = ref({})
    const sort = ref([])
    const products = ref([])
    const vfm = useVfm()
    const isLoadingLocal = ref(false)
    const isLoading = computed(() => store.getters.isLoading)
    const startLoading = () => store.dispatch('startLoading')
    const endLoading = () => store.dispatch('endLoading')

    const getDataCatalogProducts = async () => {
      try {
        isLoadingLocal.value = true

        const parsedQuery = parse(route.query, { comma: true })
        const stringifiedParams = stringify(
          { ...parsedQuery },
          { arrayFormat: 'comma', encode: false }
        )

        const response = await axios.get(`/api/catalog-products/?${stringifiedParams}`)
        products.value = response.data
      } catch (error) {
        vfm.open('ModalError')
        console.error('Error fetching heroes:', error)
      } finally {
        isLoadingLocal.value = false
      }
    }

    const getDataCatalog = async () => {
      try {
        startLoading()
        const response = await axios.get('/api/catalog/')
        breadcrumbs.value = response.data.breadcrumbs
        description.value = response.data.description
        sort.value = response.data.sort
      } catch (error) {
        vfm.open('ModalError')
        console.error('Error catalog-view:', error)
      } finally {
        endLoading()
        await getDataCatalogProducts()
      }
    }
    getDataCatalog()

    const handleSort = () => {
      getDataCatalogProducts()
    }

    return {
      breadcrumbs,
      description,
      sort,
      products,
      isLoading,
      isLoadingLocal,
      handleSort
    }
  }
}
</script>

<style lang="scss">
  .catalog-page {

  &__content {
  }

  &__content-top {
    display: flex;
    flex-direction: column;
    margin-bottom: 32px;

    @media (min-width:$tablet) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
  }

  &__content-title {
    padding: 32px 0 24px;
    text-transform: uppercase;

    @media (min-width:$desktop) {
      padding: 60px 0 40px;
    }
  }

  &__left-side {
  }

  &__right-side {
  }
}
</style>
