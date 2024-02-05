<template>
  <div class="product-preview-wrapper">
    <router-link class="product-preview hover-scale" :class="{ 'skeleton-box': isLoading }" :to="product.productUrl">
      <div class="product-preview__img-wrapper hover-scale-img-wrapper">
        <img class="product-preview__img hover-scale-img" :src="product.imgUrl" :alt="product.title">
      </div>
      <div class="product-preview__body">
        <span class="product-preview__title h3">{{ product.title }}</span>
        <div class="product-preview__content">
          <div class="product-preview__price-wrapper">
            <span class="product-preview__price p1">{{ priceFormatter(product.price) }}</span>
            <span v-if="product.oldPrice" class="product-preview__old-price price">{{ priceFormatter(product.oldPrice) }}</span>
            <span v-if="product.discount" class="product-preview__discount name-product">{{ product.discount }}%</span>
          </div>
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
    const incrementItem = (product) => store.dispatch('addItem', product)
    const decrementItem = (product) => store.dispatch('addItem', product)
    // const updateItemQuantity = (product) => store.dispatch('addItem', product)

    const isInCart = computed(() => {
      const foundProduct = items.value.find((item) => item.id === product.value.id)
      return Boolean(foundProduct)
    })

    const addToCart = () => {
      addItem(product.value)
    }

    const onQuantity = (event) => {
      switch (event.currentTarget.dataset.action) {
        case 'increase':
          incrementItem(product.value)
          break
        case 'reduce':
          if (this.product.quantity > 1) {
            decrementItem(product.value)
          } else {
            // this.onRemove()
          }
          break
        default:
          break
      }
    }

    // const onInput = (value) => {
    //   updateItemQuantity({ id: product.id, quantity: value })
    // }

    return {
      isLoading,
      priceFormatter,
      isInCart,
      addToCart,
      onQuantity
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

  &__content {
    margin: 0 auto 16px;
    width: 100%;
  }

  &__price-wrapper {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;
  }

  &__price {
    margin-right: 8px;

    @media (min-width:$desktop) {
      margin-right: 12px;
    }
  }

  &__old-price {
    margin-right: 8px;
    color: $color-gray-light;
    text-decoration-line: line-through;

    @media (min-width:$desktop) {
      margin-right: 12px;
    }
  }

  &__discount {
  }

  &__price {
  }

  &__body {
  }

  &__link.btn-secondary.btn-secondary-small {
    margin-top: auto;
    width: 100%;
  }
}
</style>
