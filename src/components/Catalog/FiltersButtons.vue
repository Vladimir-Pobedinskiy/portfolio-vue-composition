<template>
  <div class="filters-buttons">
    <button
      v-if="isShowReset"
      class="filters-buttons__btn-clear btn-secondary"
      type="button"
      :disabled="isLoading"
      @click="resetFilters"
    >
      Очистить фильтры
    </button>
    <button
      v-if="!isDesktop"
      class="filters-buttons__btn-show-more btn"
      type="button"
      :disabled="isLoading"
      @click="toggleState(isOpen)"
    >
      {{ productsQuantity }}
    </button>
  </div>
</template>

<script>
import { ref, toRefs, computed, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
import { screens, declOfNum } from '@/utils/utils'
export default {
  name: 'CatalogFiltersButtons',
  props: {
    productsAmount: {
      type: Number,
      default: -1
    }
  },
  setup(props) {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const { productsAmount } = toRefs(props)
    const isDesktop = ref(null)
    const isLoading = computed(() => store.getters.isLoading)
    const isOpen = computed(() => store.getters.isOpen)
    const toggleState = (value) => { store.dispatch('toggleState', value) }

    const isShowReset = computed(() => {
      const words = Object.keys(route.query)
      const indexToDelete = words.findIndex((word) => word === 'page')
      if (indexToDelete > -1) {
        words.splice(indexToDelete, 1)
      }
      return words.length > 0
    })

    const productsQuantity = computed(() => {
      if (productsAmount.value > 0) {
        return `Показать ${productsAmount.value} ${declOfNum(productsAmount.value, ['товар', 'товара', 'товаров'])}`
      } else {
        return 'Нет товаров'
      }
    })

    const resetFilters = () => {
      for (const key of Object.keys(route.query)) {
        if (key !== 'page') {
          router.push('')
        }
      }
    }

    const isDesktopHandler = () => {
      window.innerWidth >= parseInt(screens.desktop) ? isDesktop.value = true : isDesktop.value = false
    }

    onMounted(() => {
      isDesktopHandler()
      window.addEventListener('resize', isDesktopHandler)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', isDesktopHandler)
    })

    return {
      isLoading,
      isOpen,
      toggleState,
      isDesktop,
      isShowReset,
      productsQuantity,
      resetFilters
    }
  }

}
</script>

<style lang="scss">
.filters-buttons {
  width: 100%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  &__btn-clear.btn-secondary{
    margin-bottom: 16px;
    width: 100%;
  }

  &__btn-show-more.btn {
    width: 100%;
  }
}
</style>
