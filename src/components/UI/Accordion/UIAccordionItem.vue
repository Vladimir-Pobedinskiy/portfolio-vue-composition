<template>
  <div ref="accordionItem" class="accordion-item" :class="{ 'active': item.selected }">
    <div class="accordion-item__header h4" @click="onAccordionItem(item, $refs.content)">
      <slot name="header" />
      <div class="accordion-item__header-icon-wrapper">
        <UIIcon icon-name="mdi-close" class-name="accordion-item__header-icon icon-close" width="32px" height="32px" />
      </div>
    </div>

    <div v-if="$slots.content" ref="content" class="accordion-item__content">
      <slot name="content" />
    </div>
  </div>
</template>
<script>
/*eslint-disable*/
import { ref, toRefs, onMounted } from 'vue'
export default {
  name: 'UIAccordionItem',
  props: {
    item: {
      type: Object,
      required: true
    },
    accordionList: {
      type: Array,
      required: true
    },
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
    const { accordionList, isOnlyOneOpen, initItemOpen } = toRefs(props)
    const accordionItem = ref(null)
    const content = ref(null)

    const initAccordion = () => {
      const accordionItemContents = accordionItem.value.parentElement.querySelectorAll('.accordion-item__content')
      accordionList.value.forEach((elem, index) => {
        accordionItemContents.forEach((el, i) => {
          if (index === i && i === Number(initItemOpen.value)) {
            elem.selected = true
            el.style.maxHeight = `${el.scrollHeight}px`
          } else if (index === i && initItemOpen.value === 'all') {
            elem.selected = true
            el.style.maxHeight = `${el.scrollHeight}px`
          }
        })
      })
    }
    onMounted(() => {
      if (accordionList.value) initAccordion()
    })

    const onAccordionItem = (item, accordionItemContent) => {
      if (!isOnlyOneOpen.value) {
        if (!item.selected) {
          item.selected = true
          accordionItemContent.style.maxHeight = `${accordionItemContent.scrollHeight}px`
        } else {
          item.selected = false
          accordionItemContent.style.maxHeight = null
        }
      } else {
        if (!item.selected) {
          accordionList.value.forEach((elem) => {
            elem.selected = false
          })
          const accordionItemContents = accordionItem.value.parentElement.querySelectorAll('.accordion-item__content')
          accordionItemContents.forEach((elem) => {
            elem.style.maxHeight = null
          })
          item.selected = true
          accordionItemContent.style.maxHeight = `${accordionItemContent.scrollHeight}px`
        } else {
          item.selected = false
          accordionItemContent.style.maxHeight = null
        }
      }
    }

    return {
      accordionItem,
      content,
      onAccordionItem
    }
  }
}
</script>

<style lang="scss">

.accordion-item {
  padding-top: 24px;
  padding-bottom: 6px;
  border-bottom: 1px solid $color-black;

  &:first-child {
    border-top: 1px solid $color-gray-medium;
  }

  &.active {
    .accordion-item__header-icon{
      transform: rotate(0);
      transition: transform 0.4s ease;
    }
  }

  &__header {
    margin-bottom: 16px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-transform: uppercase;

    @media (min-width:$desktop) {
      margin-bottom: 20px;
      cursor: pointer;
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    max-height: 0;
    will-change: max-height;
    transition: max-height 0.4s ease-in-out;
  }

  &__header-icon {
    transform: rotate(-45deg);
    transition: transform 0.4s ease;
  }
}
</style>
