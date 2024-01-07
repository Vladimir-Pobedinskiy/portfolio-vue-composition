<template>
  <div class="modal-tags">
    <teleport to="body">
      <UIModal v-model="showModal" :modal-settings="modalSettings">
        <template #header>
          <span class="modal-tags-title s2">Выберите теги</span>
        </template>
        <template #body>
          <TaskTagList :tags="tags" @handleSelectedTags="handleSelectedTags" />
          <button class="modal-tags-btn-save btn btn-small" :disabled="!selectedTags.length" type="button" @click="editSelectedTags">
            Сохранить
          </button>
        </template>
      </UIModal>
    </teleport>

    <button :class="currentTags.length ? 'modal-tags-btn-open' : 'btn btn-small'" aria-label="Открыть модальное окно" @click="openModal">
      <UIIcon v-if="currentTags.length" icon-name="mdi-edit-outline" class-name="icon-edit" width="32px" height="32px" />
      <span v-else class="p3">Добавить теги</span>
    </button>
  </div>
</template>

<script>
import UIModal from '@/components/UI/Modal/UIModal'
import TaskTagList from '@/components/Tasks/TaskTagList'
export default {
  name: 'ModalTags',
  components: { UIModal, TaskTagList },
  props: {
    currentTags: {
      type: Array,
      required: true
    }
  },
  emits: ['editSelectedTags'],
  data() {
    return {
      showModal: false,
      modalSettings: {
        name: 'ModalTags',
        lockScroll: true, // Прокрутка body во время отображения модального окна
        clickToClose: true, // Закрытие модального окна при нажатии на наложение модального окна
        escToClose: true, // Нажмите esc, чтобы закрыть модальное окно
        hideOverlay: false // Скрытие отображения наложения
      },
      tags: [
        { title: 'home', selected: false },
        { title: 'travel', selected: false },
        { title: 'work', selected: false }
      ],
      selectedTags: []
    }
  },
  methods: {
    openModal() {
      this.showModal = true
    },
    handleSelectedTags(selectedTags) {
      this.selectedTags = selectedTags
    },
    editSelectedTags() {
      this.$emit('editSelectedTags', this.selectedTags)
      this.selectedTags.length = 0
      this.tags.forEach((item) => {
        item.selected = false
      })
      this.showModal = false
    }
  }
}
</script>

<style lang="scss">

.modal-tags-btn-open {
  margin-left: 20px;
}

.modal-tags-btn-open-icon {
  width: 23px;
  height: 23px;
}

.modal-tags-btn-open {
  width: 24px;
  height: 24px;
}

.modal-tags-btn-save.btn.btn-small {
  margin-top: 24px;
  width: 100%;
}

</style>
