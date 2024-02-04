export const scrollController = {
  scrollPosition: 0,
  paddingOffset: 0,
  disableScroll() {
    scrollController.scrollPosition = window.scrollY
    scrollController.paddingOffset = window.innerWidth - document.documentElement.clientWidth
    document.body.classList.add('lock')
    document.body.style.cssText = `
      top: -${scrollController.scrollPosition}px;
      padding-right: ${scrollController.paddingOffset}px;
    `
  },
  enableScroll() {
    document.body.classList.remove('lock')
    document.body.style.cssText = `
      padding-right: '0px';
    `
    window.scroll({
      top: scrollController.scrollPosition
    })
  }

}
