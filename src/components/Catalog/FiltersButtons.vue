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
    <button class="filters-buttons__btn-show-more btn" type="button" :disabled="isLoading" @click="toggleState(isOpen)">
      {{ productsQuantity }}
    </button>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { declOfNum } from '@/utils/utils'

export default {
  name: 'CatalogFiltersReset',
  props: {
    productsAmount: {
      type: Number,
      default: -1
    }
  },

  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      isOpen: 'isOpen'
    }),

    isShowReset() {
      const words = Object.keys(this.$route.query)
      const indexToDelete = words.findIndex((word) => word === 'page')
      if (indexToDelete > -1) {
        words.splice(indexToDelete, 1)
      }

      return words.length > 0
    },

    productsQuantity() {
      if (this.productsAmount > 0) {
        return `Показать ${this.productsAmount} ${declOfNum(
          this.productsAmount,
          ['товар', 'товара', 'товаров']
        )}`
      } else {
        return 'Нет товаров'
      }
    }
  },
  methods: {
    ...mapActions({
      toggleState: 'toggleState'
    }),

    resetFilters() {
      for (const key of Object.keys(this.$route.query)) {
        if (key !== 'page') {
          this.$router.push('')
        }
      }
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

  &__btn-clear.btn-secondary {
    margin-bottom: 16px;
    width: 100%;
  }

  &__btn-show-more.btn {
    width: 100%;
  }
}
</style>
