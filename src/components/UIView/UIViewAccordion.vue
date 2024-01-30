/**
  isOnlyOneOpen (true) - открывается один item, остальные закрываются
  initItemOpen - задает какой item будет открытым при rendering страницы (варианты: index, all(все открыты)),
    если ничего не задано то все items закрыты
*/
<template>
  <UIAccordion>
    <UIAccordionItem v-for="(item, i) in accordionList" :key="i" :item="item" ref="accordionItem" @onAccordionItem="onAccordionItem">
      <template #header>
        <span class="accordion-item-title h4">{{ item.title }}</span>
      </template>
      <template #content>
        <div v-dompurify-html="item.text" class="user-content p4"></div>
      </template>
    </UIAccordionItem>
  </UIAccordion>
</template>

<script>
import { ref, toRefs, onMounted } from 'vue'
import UIAccordion from '@/components/UI/Accordion/UIAccordion'
import UIAccordionItem from '@/components/UI/Accordion/UIAccordionItem'
export default {
  name: 'UIViewAccordion',
  components: { UIAccordion, UIAccordionItem },
  props: {
    accordionList: {
      type: Array,
      required: true
    },
    isOnlyOneOpen: {
      type: Boolean,
      default: false
    },
    initItemOpen: {
      type: String,
      required: false
    }
  },
  setup(props) {
    const { accordionList, isOnlyOneOpen, initItemOpen } = toRefs(props)
    const accordionItem = ref(null)

    const initAccordion = () => {
      const accordionItemRefsContent = accordionItem.value
      accordionList.value.forEach((elem, index) => {
        accordionItemRefsContent.forEach((itemRef, i) => {
          if (index === i && i === Number(initItemOpen.value)) {
            elem.selected = true
            itemRef.$refs.content.style.maxHeight = `${itemRef.$refs.content.scrollHeight}px`
          } else if (index === i && initItemOpen.value === 'all') {
            elem.selected = true
            itemRef.$refs.content.style.maxHeight = `${itemRef.$refs.content.scrollHeight}px`
          }
        })
      })
    }
    onMounted(() => {
      if (accordionList.value) initAccordion()
    })

    const onAccordionItem = ([item, currentContentRef]) => {
      if (!isOnlyOneOpen.value) {
        if (!item.selected) {
          item.selected = true
          currentContentRef.style.maxHeight = `${currentContentRef.scrollHeight}px`
        } else {
          item.selected = false
          currentContentRef.style.maxHeight = null
        }
      } else {
        const accordionItemRefsContent = accordionItem.value
        if (!item.selected) {
          accordionList.value.forEach((elem) => {
            elem.selected = false
          })
          accordionItemRefsContent.forEach((itemRef) => {
            itemRef.$refs.content.style.maxHeight = null
          })
          item.selected = true
          currentContentRef.style.maxHeight = `${currentContentRef.scrollHeight}px`
        } else {
          item.selected = false
          currentContentRef.style.maxHeight = null
        }
      }
    }

    return {
      accordionItem,
      onAccordionItem
    }
  }
}
</script>

<style lang="scss">
  .accordion-item-title {
    margin-right: 15px;
  }
</style>
