<template>
  <div class="quantity" @click.stop.prevent="() => null">
    <button
      class="quantity__btn"
      type="button"
      title="убавить"
      data-action="reduce"
      :disabled="minDisabled"
      v-bind="$attrs"
    >
      <UIIcon icon-name="mdi-minus" class-name="quantity__btn-icon" width="16px" height="16px" />
    </button>
    <input
      ref="inputRef"
      class="quantity__input"
      :value="value"
      type="number"
      tabindex="-1"
      @input="handleInput($event)"
      @blur="handleBlur($event)"
      @keyup.enter="handleEnter"
    />
    <button
      class="quantity__btn"
      type="button"
      title="прибавить"
      data-action="increase"
      :disabled="value === maxValue"
      v-bind="$attrs"
    >
      <UIIcon icon-name="mdi-plus" class-name="quantity__btn-icon" width="16px" height="16px" />
    </button>
  </div>
</template>

<script>
export default {
  name: 'ProductQuantity',
  props: {
    value: {
      type: Number,
      required: true
    },
    maxValue: {
      type: Number,
      required: true
    },
    minDisabled: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    },
    maxDisabled: {
      type: Boolean,
      required: false,
      default() {
        return false
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="scss">
.quantity {
  padding: 10px;
  width: 104px;
  border: 1px solid $color-gray;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__btn {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    &:disabled {
      opacity: 0.2;
      cursor: default;
    }
  }

  &__input {
    width: 100%;
    max-width: 32px;
    overflow: hidden;
    text-align: center;
  }
}
</style>
