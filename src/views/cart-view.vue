<template>
  <template v-if="isLoading">
    <AppLoading :is-loading="isLoading" />
  </template>
  <template v-else>
    <section class="cart-page">
      <div class="cart-page__inner">
        <UIBreadcrumbs :breadcrumbs="breadcrumbs" />
        <h1 class="cart-page__title title h1">Корзина</h1>
        <template v-if="items.length > 0">
          <div class="cart-page__form">
            <div class="cart-page__left-side">
              <div class="cart-page__feed-wrapper">
                <CartFeed />
              </div>
            </div>
            <div class="cart-page__right-side">
              <div class="cart-page__aside-wrapper">
                <CartAside />
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <div class="cart-page__empty-wrapper">
            <div class="cart-page__empty">
              <p class="cart-page__empty-title s5">Корзина на данный момент пуста</p>
              <p class="cart-page__empty-text p2">Для того, чтобы добавить товары в корзину, перейдите на страницу каталога</p>
              <UILink link-class="btn" link-url="/catalog/">Перейти в каталог</UILink>
            </div>
          </div>
        </template>
      </div>
    </section>
  </template>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CartView',
  data() {
    return {
      breadcrumbs: []
    }
  },
  async getData() {
    try {
      const request = { cart: this.items }
      const response = await this.$axios.$post('/api/cart/', request)
      this.breadcrumbs = response.breadcrumbs
      this.updateItems(response.products)
    } catch (e) {
    }
  },
  computed: {
    ...mapGetters({
      isLoading: 'isLoading',
      items: 'cart/items'
    })
  },
  methods: {
    ...mapActions({
      updateItems: 'cart/updateItems',
      clear: 'cart/clear'
    })
  }
}
</script>

<style lang="scss">
.cart-page {
  margin: 0 auto;
  padding: 0 16px;
  height: 100%;
  width: 100%;
  max-width: 1392px;

  &__inner {
    height: 100%;
    position: relative;
  }

  &__form {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 40px;

    @media (min-width:$desktop-big) {
      grid-template-columns: repeat(12, 1fr);
      grid-gap: 8px;
    }
  }

  &__left-side {

    @media (min-width:$desktop-big) {
      grid-column: 7 span;
    }
  }

  &__right-side {

    @media (min-width:$desktop-big) {
      grid-column: 9 / -1;
    }
  }

  &__aside-wrapper {

    @media (min-width:$desktop) {
      position: sticky;
      left: 0;
      top: 105px;
    }
  }

  &__empty-wrapper {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 16px;

    @media (min-width:$mobile-big) {
      grid-template-columns: repeat(12, 1fr);
    }
  }

  &__empty {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    text-align: left;

    @media (min-width:$mobile-big) {
      grid-column: 7 span;
    }
  }

  &__empty-title {
    margin-bottom: 8px;
  }

  &__empty-text {
    margin-bottom: 32px;
  }

}

</style>
