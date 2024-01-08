<template>
  <UIMarquee :marquee-settings="marqueeSettings">
    <div v-for="item in marqueeImages" :key="item" class="hero-img-wrapper">
      <img :src="`${item.imgUrl}`" :alt="`${item.title}`" />
    </div>
  </UIMarquee>
</template>

<script>
import UIMarquee from '@/components/UI/Marquee/UIMarquee'
export default {
  name: 'UIViewMarquee',
  components: { UIMarquee },
  props: {
    marqueeImages: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      marqueeSettings: {
        duration: 40,
        pauseOnHover: true,
        direction: 'right',
        loop: 0, // 0 - бесконечно
        gradient: true,
        gradientColor: [240, 250, 230],
        gradientLength: '30px'
      }
    }
  }
}
</script>

<style lang="scss">
.hero-img-wrapper {
  padding: 10px;
  width: 250px;
  will-change: transform;

  @media (min-width:$mobile-big) {
    width: 300px;
  }

  @media (min-width:$tablet) {
    width: 350px;
  }

  @media (min-width:$tablet-big) {
    padding: 15px;
    width: 25%;
  }

  @media (min-width:$two-K-Display) {
    width: 35%;
  }
}
</style>
