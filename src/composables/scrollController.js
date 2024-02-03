import { screens } from '@/utils/utils'

export function scrollController(closeMenuUsingEsc) {
  let scrollPosition = 0
  let paddingOffset = '0px'

  const isDesktopSmall = () => window.innerWidth >= parseInt(screens.desktopSmall)

  const handleEsc = (event) => {
    if (event.key === 'Escape' && isDesktopSmall()) {
      closeMenuUsingEsc()
      enableScroll()
    }
  }

  const disableScroll = () => {
    scrollPosition = window.scrollY
    paddingOffset = window.innerWidth - document.documentElement.clientWidth

    document.body.style.cssText = `
      position: fixed;
      padding-right: ${paddingOffset}px;
      top: -${scrollPosition}px;
      left: 0;
      width: 100%;
      overflow: hidden;
    `
    window.addEventListener('keydown', handleEsc)
  }

  const enableScroll = () => {
    document.body.style.cssText = ''
    window.scroll({
      top: scrollPosition,
      left: 0
    })
    window.removeEventListener('keydown', handleEsc)
  }

  return { disableScroll, enableScroll }
}
