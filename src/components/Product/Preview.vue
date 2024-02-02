<template>
  <div class="product-preview-wrapper">
    <router-link class="product-preview hover-scale" :class="{ 'skeleton-box': isLoading }" :to="product.productUrl">
      <div class="product-preview__img-wrapper hover-scale-img-wrapper">
        <img class="product-preview__img hover-scale-img" :src="product.imgUrl" :alt="product.title">
      </div>
      <div class="product-preview__body">
        <span class="product-preview__title h3">{{ product.title }}</span>
        <div class="product-preview__price-wrapper">
          <span class="product-preview__level p1">level:{{ product.level}}</span>
          <span class="product-preview__price p1">{{ priceFormatter(product.cost) }}</span>
        </div>
      </div>
      <button
        v-if="!isInCart"
        key="off"
        class="product-preview__link btn-orange s4"
        type="button"
        @click.stop.prevent="addToCart"
      >
        Добавить в корзину
      </button>
      <button
        v-else
        key="on"
        class="product-preview__link btn-secondary btn-secondary-small s4"
        type="button"
        @click.stop.prevent="$router.push('/cart/')"
      >
        Перейти в корзину
      </button>
    </router-link>
  </div>
</template>

<script>
import { toRefs, computed } from 'vue'
import { useStore } from 'vuex'
import { priceFormatter } from '@/utils/utils'
export default {
  name: 'ProductPreview',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup(props) {
    const { product } = toRefs(props)
    const store = useStore()
    const isLoading = computed(() => store.getters.isLoading)
    const items = computed(() => store.getters.items)
    const addItem = (product) => store.dispatch('addItem', product)

    const isInCart = computed(() => {
      const foundProduct = items.value.find((item) => item.id === product.value.id)
      return Boolean(foundProduct)
    })

    const addToCart = () => {
      addItem(product.value)
    }

    return {
      isLoading,
      priceFormatter,
      isInCart,
      addToCart
    }
  }
}
</script>

<style lang="scss">
.product-preview {
  padding: 16px;
  width: 100%;
  height: 100%;
  max-width: 442px;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  text-align: center;
  border: 1px solid rgb(227, 221, 221);

  &__img-wrapper {
    width: 100%;
    max-width: 442px;
    height: 140px;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    overflow: hidden;

    @media (min-width:$tablet) {
      height: 200px;
    }

    @media (min-width:$desktop-big) {
      height: 290px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    mix-blend-mode: multiply;
  }

  &__title {
    margin: 24px 0 8px;
    display: block;
  }

  &__price-wrapper {
    margin: 0 auto 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    max-width: 205px;
    text-align: center;
  }

  &__price {
  }

  &__body {
  }

  &__link.btn-secondary.btn-secondary-small {
    width: 100%;
  }
}
</style>
