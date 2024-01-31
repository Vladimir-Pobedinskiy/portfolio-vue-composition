<template>
  <div class="catalog-filters">

    <div v-if="!isDesktop" class="catalog-filters__btn-wrapper">
      <button class="catalog-filters__btn btn btn-small" type="button" @click="toggleState('filters')">
        Открыть фильтры
      </button>
    </div>

    <div ref="filtersContent" class="catalog-filters__content" :class="{ 'active': isOpen === 'filters' && !isDesktop }">
      <div class="catalog-filters__content-inner">
        <div v-if="!isDesktop" class="catalog-filters__content-top">
          <p class="catalog-filters__content-title h4">Все фильтры</p>
          <button class="catalog-filters__close-btn" aria-label="Закрыть фильтры" @click="toggleState('filters')">
            <UIIcon icon-name="mdi-close" class-name="icon-close" width="32px" height="32px" />
          </button>
        </div>
        <div class="catalog-filters__filters-inner">
          <UIAccordion key="filtersAccordion" :is-only-one-open="false" init-item-open="all" :isCaretIcon="true">
            <CatalogFiltersGroup v-for="(filtersGroup, i) in filters" :key="i" :filters="filtersGroup" />
          </UIAccordion>
        </div>
      </div>
      <!-- <div class="catalog-filters__filters-btns-wrapper">
        <CatalogFiltersButtons :products-amount="productsAmount" />
      </div> -->
    </div>
  </div>
</template>

<script>
/*eslint-disable*/
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useStore } from 'vuex'
import { useRoute } from 'vue-router'
import { screens, scrollController } from '@/utils/utils'
import Hammer from 'hammerjs'
import UIAccordion from '@/components/UI/Accordion/UIAccordion'
import CatalogFiltersGroup from '@/components/Catalog/FiltersGroup'
export default {
  name: 'CatalogFilters',
  components: { UIAccordion, CatalogFiltersGroup },
  props: {
    filters: {
      type: Array,
      required: true
    }
    // productsAmount: {
    //   type: Number,
    //   default: -1
    // }
  },
  setup() {
    const store = useStore()
    const filtersContent = ref(null)
    const mc = ref(null)
    const isDesktop = ref(null)
    const isOpen = computed(() => store.getters.isOpen)
    const toggleState = (value) => { store.dispatch('toggleState', value) }

    // watch(isOpen, (value) => {
    //   if (value === 'filters') {
    //     scrollController.disabledScroll()
    //   } else {
    //     scrollController.enabledScroll()
    //   }
    // })

    const setupHammer = () => {
      const hammer = new Hammer.Manager(filtersContent.value)
      hammer.add(new Hammer.Swipe({ direction: Hammer.DIRECTION_HORIZONTAL }))
      hammer.on('swipeleft', () => {
        toggleState(isOpen.value)
      })
      mc.value = hammer
    }

    const handleWindowResize = () => {
      if (window.innerWidth >= parseInt(screens.desktop)) {
        mc.value.set({ enable: false })
      } else {
        mc.value.set({ enable: true })
      }
    }

    const isDesktopHandler = () => {
      window.innerWidth >= parseInt(screens.desktop) ? isDesktop.value = true : isDesktop.value = false
    }

    onMounted(() => {
      setupHammer()
      handleWindowResize()
      isDesktopHandler()
      window.addEventListener('resize', isDesktopHandler)
      window.addEventListener('resize', handleWindowResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', isDesktopHandler)
      window.removeEventListener('resize', handleWindowResize)
    })

    return {
      isOpen,
      filtersContent,
      isDesktop,
      isDesktopHandler,
      toggleState
    }
  }
}
</script>

<style lang="scss">
.catalog-filters {

  &__btn-wrapper {

    @media (min-width:$tablet) {

    }
  }

  &__btn {
  }

  &__content {
    background-color: $color-white;

    @media (max-width:$desktop-for-maxWidth){
      position: fixed;
      left: 0;
      top: 0;
      padding: 98px 16px 120px;
      width: 100%;
      height: 100%;
      transform: translateX(-100%);
      opacity: 0;
      visibility: hidden;
      overflow: auto;
      transition: transform 0.2s ease, opacity 0.1s ease, visibility 0.1s ease;
    }

    &.active {
      transform: translateX(0);
      opacity: 1;
      visibility: visible;
      z-index: 997;
      pointer-events: all;
      transition: transform 0.4s ease, opacity 0.3s ease, visibility 0.3s ease;
    }

  }

  &__content-inner {
    width: 100%;
    height: 100%;
  }

  &__content-top {
    margin-bottom: 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__content-title {
    text-transform: uppercase;
  }

  &__close-btn {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 998;
  }

}
</style>
