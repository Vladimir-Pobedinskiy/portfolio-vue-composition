<template>
  <div class="task-tag-list" :class="{'not-preview': !isPreview }">
    <TaskTagListItem
      v-for="tag in tags" :key="tag"
      :tag="tag"
      :is-preview="isPreview"
      @handleSelectedTag="handleSelectedTag"
    />
  </div>
</template>

<script>
import TaskTagListItem from '@/components/Tasks/TaskTagListItem'
export default {
  name: 'TaskTagList',
  components: { TaskTagListItem },
  props: {
    tags: {
      type: Array,
      required: true
    },
    isPreview: {
      type: Boolean,
      default: false
    }
  },
  emits: ['handleSelectedTags'],
  data() {
    return {
      selectedTags: []
    }
  },
  methods: {
    handleSelectedTag(selectedTag) {
      this.tags.forEach((item) => {
        if (item.title === selectedTag) {
          if (!item.selected) {
            item.selected = true
            this.selectedTags.push({
              title: selectedTag
            })
            this.$emit('handleSelectedTags', this.selectedTags)
          } else {
            item.selected = false
            const selectedIndex = this.selectedTags.findIndex(tag => tag.title === selectedTag)
            if (selectedIndex !== -1) {
              this.selectedTags.splice(selectedIndex, 1)
              this.$emit('handleSelectedTags', this.selectedTags)
            }
          }
        }
      })
    }
  }
}
</script>

<style lang="scss">
.task-tag-list {
  display: flex;
  align-items: center;
}

.task-tag-list.not-preview {
  margin: 16px 0;
  width: 100%;
  max-width: 290px;

  @media (min-width:$desktop) {
    margin: 20px 0 16px;
  }
}
</style>
