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
  mounted() {
    this.initAccordion()
  },
  methods: {
    initAccordion() {
      const accordionItemRefsContent = this.$refs.accordionItem
      this.accordionList.forEach((elem, index) => {
        accordionItemRefsContent.forEach((itemRef, i) => {
          if (index === i && i === Number(this.initItemOpen)) {
            elem.selected = true
            itemRef.$refs.content.style.maxHeight = `${itemRef.$refs.content.scrollHeight}px`
          } else if (index === i && this.initItemOpen === 'all') {
            elem.selected = true
            itemRef.$refs.content.style.maxHeight = `${itemRef.$refs.content.scrollHeight}px`
          }
        })
      })
    },
    onAccordionItem([item, currentContentRef]) {
      if (!this.isOnlyOneOpen) {
        if (!item.selected) {
          item.selected = true
          currentContentRef.style.maxHeight = `${currentContentRef.scrollHeight}px`
        } else {
          item.selected = false
          currentContentRef.style.maxHeight = null
        }
      } else {
        const accordionItemRefsContent = this.$refs.accordionItem
        if (!item.selected) {
          this.accordionList.forEach((elem) => {
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
  }
}
</script>

<style lang="scss">
  .accordion-item-title {
    margin-right: 15px;
  }
</style>
