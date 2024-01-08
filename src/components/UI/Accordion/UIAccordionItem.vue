<template>
  <div ref="accordionItem" class="accordion-item" :class="{ 'active': item.selected }">
    <div class="accordion-item__header h4" @click="onAccordionItem">
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
export default {
  name: 'UIAccordionItem',
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  emits: ['onAccordionItem'],
  methods: {
    onAccordionItem() {
      this.$emit('onAccordionItem', [this.item, this.$refs.content])
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
