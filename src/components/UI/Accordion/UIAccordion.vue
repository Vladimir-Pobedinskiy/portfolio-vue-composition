/**
  isOnlyOneOpen (true) - открывается один item, остальные закрываются
  initItemOpen - задает какой item будет открытым при rendering страницы (варианты: index, all(все открыты)),
    если ничего не задано то все items закрыты
*/
<template>
  <div class="accordion">
    <slot />
  </div>
</template>

<script>
import { toRefs, provide } from 'vue'
export default {
  name: 'UIAccordion',
  props: {
    isOnlyOneOpen: {
      type: Boolean,
      default: true
    },
    initItemOpen: {
      type: String,
      required: true
    }
  },
  setup(props) {
    const { isOnlyOneOpen, initItemOpen } = toRefs(props)

    provide('isOnlyOneOpen', isOnlyOneOpen.value)
    provide('initItemOpen', initItemOpen.value)
  }
}
</script>
