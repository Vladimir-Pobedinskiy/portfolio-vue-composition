<template>
  <router-link class="cart" to="/cart/" aria-label="Корзина">
    <div class="count-container">
      <transition name="bounce" mode="out-in">
        <div v-if="count > 0" class="count marker">
          <span>{{ count }}</span>
        </div>
      </transition>
    </div>
    <UIIcon icon-name="mdi-cart" class-name="cart__icon icon-close" width="32px" height="32px" />
  </router-link>
</template>

<script>
import { computed } from 'vue'
import { useStore } from 'vuex'
export default {
  name: 'UICart',
  setup() {
    const store = useStore()
    const count = computed(() => store.getters.count)

    return {
      count
    }
  }
}
</script>

<style lang="scss">

.cart {
  position: relative;

  &:hover {
    .cart__icon {
      color: $color-white;
      transition: color 0.3s ease;
    }
    color: $color-vue;
  }

  .cart__icon {
    width: 28px;
    height: 28px;
    transition: color 0.3s ease;
  }

  .count-container {
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(calc(100% - 2.5px), calc(-100% + 5px));

    @media (min-width:$desktop) {
      transform: translate(calc(100% - 2.5px), calc(-100% + 2.5px));
    }
  }

  .count {
    padding: 2px;
    height: 20px;
    min-width: 20px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $color-vue;
    background-color: $color-white;
  }
}
</style>
