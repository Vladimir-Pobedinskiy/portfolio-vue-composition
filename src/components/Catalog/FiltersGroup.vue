<template>
  <div class="filters-group">
    <div class="filters-title h4">{{ filters.title }}</div>
    <CatalogFiltersOption
      v-for="(option, j) in filters.options" :key="j"
      class="option-wrapper"
      :option="option"
      :group-name="filters.name"
    />
  </div>
</template>

<script>
import CatalogFiltersOption from '@/components/Catalog/FiltersOption'
export default {
  name: 'CatalogFiltersGroup',
  components: { CatalogFiltersOption },
  props: {
    filters: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss">
</style>
