<template>
  <label class="control-label" :class="{ disabled: isLoading || option.disabled }">
    <input
      v-model="model"
      :value="option.value"
      class="control-input visually-hidden"
      :class="{'selected': option.selected}"
      type="checkbox"
      name=""
      :disabled="isLoading || option.disabled"
    />
    <span class="control-icon-span">
      <UIIcon class="control-icon-span-icon" icon-name="mdi-check" class-name="icon-close" width="8px" height="8px" />
    </span>
    <span class="control-title hf1">{{ option.title }}</span>
  </label>
</template>

<script>
import { mapGetters } from 'vuex'
import { parse, stringify } from 'qs'
export default {
  name: 'CatalogFiltersOption',
  props: {
    groupName: {
      type: String,
      required: true
    },
    option: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters(['isLoading']),
    model: {
      get() {
        return this.option.selected
      },
      set(newValue) {
        let parsedQuery = parse(this.$route.query, { comma: true })
        let requestObject = null
        let optionsArray = null

        if (parsedQuery.page) delete parsedQuery.page

        if (this.groupName in parsedQuery) {
          if (typeof parsedQuery[this.groupName] === 'string') {
            optionsArray = Array(parsedQuery[this.groupName])
          } else {
            optionsArray = parsedQuery[this.groupName]
          }

          const index = optionsArray.indexOf(this.option.value)

          if (index > -1) {
            optionsArray.splice(index, 1)
          } else {
            optionsArray.push(this.option.value)
          }

          requestObject = { [this.groupName]: optionsArray }
        } else if (newValue) {
          requestObject = { [this.groupName]: [this.option.value] }
        }

        parsedQuery = Object.assign({}, parsedQuery, { ...requestObject })

        this.$router.push(`?${stringify(parsedQuery, { arrayFormat: 'comma', encode: false })}`)
      }
    }
  }
}
</script>

<style lang="scss">
.control-label {
  margin-bottom: 8px;
  padding-left: 32px;
  width: fit-content;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  cursor: pointer;

  &.disabled {
    cursor: default;
    opacity: 0.5;
  }

}

.control-input {

  &.selected+.control-icon-span {
    background-color: $color-gray-dark;
    border-color: $color-gray-dark;
    transition: background-color 0.3s ease, border-color 0.3s ease;
  }

  &.selected+.control-icon-span svg {
    transform: scale(1);
    transition: transform 0.3s ease;
  }

  &:disabled+.control-icon-span {
    opacity: 0.8;
    background-color: $color-gray-disabled;
    border-color: $color-gray-disabled;
    color: $color-gray-disabled;
    transition: background-color 0.3s ease, border-color 0.3s ease;
    cursor: default;
  }

}

.control-icon-span {
  top: 50%;
  transform: translateY(-50%);
  position: absolute;
  left: 0;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid $color-gray-light;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.control-icon-span svg {
  transform: scale(0);
  width: 16px;
  height: 16px;
  color: $color-white;
  transition: transform 0.3s ease;
}

</style>
