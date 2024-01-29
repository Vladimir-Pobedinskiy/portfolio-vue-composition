<template>
  <div class="product-preview-wrapper">
    <router-link class="product-preview hover-scale" :class="{ 'skeleton-box': isLoading }" :to="product.productUrl">
      <div class="product-preview__img-wrapper hover-scale-img-wrapper">
        <img class="product-preview__img hover-scale-img" :src="product.imgUrl" :alt="product.title">
      </div>
      <div class="product-preview__body">
        <span class="product-preview__title h3">{{ product.title }}</span>
        <div class="product-preview__price-wrapper">
          <span class="product-preview__lvl p1">level:{{ product.level}}</span>
          <span class="product-preview__price p1">{{ priceFormatter(product.cost) }}</span>
        </div>
      </div>
      <button
        v-if="!isInCart"
        key="off"
        class="product-preview__link s4"
        type="button"
        @click.stop.prevent="isInCart = true"
      >
        Добавить в корзину
      </button>
      <button
        v-else
        key="on"
        class="product-preview__link s4"
        type="button"
        @click.stop.prevent="$router.push('/cart/')"
      >
        Перейти в корзину
      </button>
    </router-link>
  </div>
</template>

<script>
import { priceFormatter } from '@/utils/utils'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'ProductPreview',
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  setup() {
    const store = useStore()
    const isLoading = computed(() => store.getters.isLoading)
    const isInCart = ref(false)

    return {
      isLoading,
      priceFormatter,
      isInCart
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
      height: 320px;
    }
  }

  &__img {
    width: 100%;
    height: 100%;
    object-fit: contain;
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

  &__lvl {
  }

  &__price {
  }

  &__body {
  }

  &__link {
    display: block;
    margin-top: auto;
    padding: 8px 16px;
    width: 100%;
    border: 1px solid $color-orange;
    border-radius: 16px;
    background-color: $color-orange;
    color: $color-white;
    transition: background-color 0.3s ease, border-color 0.3s ease;

    @media (min-width:$desktop) {

      &:hover {
        border-color: $color-orange-hover;
        background-color: $color-orange-hover;
        transition: background-color 0.3s ease, border-color 0.3s ease;
      }
    }
  }
}
</style>
