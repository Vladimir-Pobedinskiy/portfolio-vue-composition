<script>
import { ref } from 'vue'

export default {
  setup() {
    const scrollPosition = ref(null)
    const paddingOffset = ref(null)

    const disableScroll = () => {
      scrollPosition.value = window.scrollY
      paddingOffset.value = window.innerWidth - document.documentElement.clientWidth
      document.body.classList.add('lock')
      document.body.style.cssText = `
        top: -${scrollPosition.value}px;
        padding-right: ${paddingOffset.value}px;
      `
    }

    const enableScroll = () => {
      document.body.classList.remove('lock')
      document.body.style.cssText = `
        padding-right: '0px';
      `
      window.scroll({
        top: scrollPosition.value
      })
    }

    return { disableScroll, enableScroll }
  }
}
</script>
