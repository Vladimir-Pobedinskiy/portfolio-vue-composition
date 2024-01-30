/**
  isOnlyOneOpen (true) - открывается один item, остальные закрываются
  initItemOpen - задает какой item будет открытым при rendering страницы (варианты: index, all(все открыты)),
    если ничего не задано то все items закрыты
*/
<template>
  <UIAccordion>
    <UIAccordionItem
      v-for="(item, i) in accordionList"
      :key="i"
      :item="item"
      :accordion-list="accordionList"
      :is-only-one-open="true"
      init-item-open="0"
    >
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
    }
  }
}
</script>

<style lang="scss">
  .accordion-item-title {
    margin-right: 15px;
  }
</style>
