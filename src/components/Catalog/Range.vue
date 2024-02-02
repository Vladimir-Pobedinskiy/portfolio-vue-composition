<template>
  <div class="range-wrapper">
    <div class="slider-container">
      <div id="slider-range" ref="sliderRange"></div>
    </div>
    <div class="label-wrapper">
      <label class="input-label">
        <input
          v-model="minRange"
          class="control-input-small input-small"
          type="number"
          name="from"
          placeholder=" "
          :disabled="isLoading"
          @change="updateSlider"
        />
      </label>

      <label class="input-label">
        <input
          v-model="maxRange"
          class="control-input-small input-small"
          type="number"
          name="from"
          placeholder=" "
          :disabled="isLoading"
          @change="updateSlider"
        />
      </label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import debounce from 'lodash.debounce'
import noUiSlider from 'nouislider'
import 'nouislider/dist/nouislider.css'
import { parse, stringify } from 'qs'

export default {
  name: 'CatalogRange',
  props: {
    range: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      rangeSlider: null,
      minRange: null,
      maxRange: null,
      slider: {
        startMin: 25,
        startMax: 75,
        min: 0,
        max: 100,
        start: 40,
        step: 1
      }
    }
  },
  computed: {
    ...mapGetters(['isLoading'])
  },
  watch: {
    isLoading: {
      handler(value) {
        if (value) {
          this.$refs.sliderRange.setAttribute('disabled', true)
        } else {
          this.$refs.sliderRange.removeAttribute('disabled')
        }
      }
    },
    range: {
      handler(value) {
        this.rangeSlider.destroy()
        this.initSlider()
      },
      deep: true
    }
  },
  mounted() {
    this.initSlider()
  },
  methods: {
    debouncedHandler: debounce(function () {
      let parsedQuery = parse(this.$route.query, { comma: true })
      const requestObject = { minPrice: this.minRange, maxPrice: this.maxRange }

      if (parsedQuery.page) delete parsedQuery.page

      parsedQuery = Object.assign({}, parsedQuery, { ...requestObject })

      this.$router.push(`?${stringify(parsedQuery, { arrayFormat: 'comma' })}`)
    }, 100),
    initSlider() {
      this.slider.min = Number(this.range[0].minValue)
      this.slider.max = Number(this.range[1].maxValue)

      this.slider.startMin = Number(this.range[0].value)
      this.slider.startMax = Number(this.range[1].value)

      this.rangeSlider = noUiSlider.create(this.$refs.sliderRange, {
        start: [this.slider.startMin, this.slider.startMax],
        step: this.slider.step,
        connect: true,
        range: {
          min: this.slider.min,
          max: this.slider.max
        }
      })

      this.$refs.sliderRange.noUiSlider.on('update', (values, handle) => {
        this[handle ? 'maxRange' : 'minRange'] = parseInt(values[handle])
      })

      this.rangeSlider.on('set', (values, handle) => {
        this.debouncedHandler()
      })
    },
    updateSlider() {
      this.$refs.sliderRange.noUiSlider.set([this.minRange, this.maxRange])
    }
  }
}
</script>

<style lang="scss">

.range-wrapper {
  padding: 12px 0 12px;
}

.label-wrapper {
  margin-bottom: 8px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 4px;
}

.control-input-small {
  width: 100%;
  padding: 10px 16px;
  outline: transparent;
  border: 1px solid $color-gray-dark;
  border-radius: 4px;
  background-color: $color-gray-lighter;
}

.slider-container {
  margin-bottom: 28px;

  @media (min-width:$desktop) {
    margin-bottom: 30px;
  }
}

#slider-range.noUi-target {
  border: none;
  border-radius: 2px;
  background-color: $color-gray-light;
  box-shadow: none;
}

#slider-range[disabled='true'] {
  opacity: 0.6;
}

#slider-range.noUi-target.noUi-horizontal {
  height: 2px;
}

#slider-range.noUi-target.noUi-horizontal .noUi-base {
  width: calc(100% - 24px);
  transform: translateX(7px);
}

#slider-range.noUi-target.noUi-horizontal .noUi-connect {
  background-color: $color-gray-dark;
}

#slider-range .noUi-handle {
  border: 2px solid $color-gray-dark;
  border-radius: 100%;
  width: 24px;
  height: 24px;

  cursor: pointer;

  &::before,
  &::after {
    display: none;
  }
}

.noUi-touch-area {
  width: 48px;
  height: 48px;
  transform: translate(-25%, -25%);
  outline: transparent;
}

#slider-range.noUi-horizontal .noUi-handle {
  top: -12px;
}

#slider-range.noUi-horizontal .noUi-handle.noUi-active {
  border-color: $color-gray-dark;
}
</style>
