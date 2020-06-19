<template>
  <div class="circle">
    <div class="circle-text-body">
      <span :class="legendClass" class="legend-text"></span>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  var $ = require('jquery-easing')
  export default {
    props: {
      progress: Number,
      scale: {
        type: Number,
        required: false,
        default: 100
      },
      precision: {
        type: Number,
        required: false,
        default: 0
      },
      size: {
        type: Number,
        required: false,
        default: 150
      },
      startAngle: Number,
      thickness: Number,
      legendClass: String,
      animation: {
        required: false,
        default: function () {
          return { duration: 1200, easing: 'circleProgressEasing' }
        }
      },
      animationStartValue: {
        type: Number,
        required: false,
        default: 0.0
      },
      reverse: {
        type: Boolean,
        default: false
      },
      lineCap: {
        type: String,
        default: 'butt'
      },
      fill: Object,
      emptyFill: String,
      insertMode: String,
      showPercent: {
        type: Boolean,
        default: true
      },
      showLegend: {
        type: Boolean,
        default: true
      }
    },
    mounted () {
      require('jquery-circle-progress')
      let vm = this
      $(vm.$el)
        .on('circle-inited', function (event) {
          renderCircleBody(this, (vm.progress / vm.scale))
          vm.$emit('vue-circle-init', event)
        })
        .circleProgress({
          value: this.convertedProgress(vm.progress),
          size: vm.size,
          startAngle: vm.startAngle,
          reverse: vm.reverse,
          lineCap: vm.lineCap,
          fill: vm.fill,
          emptyFill: vm.emptyFill,
          animation: vm.animation,
          animationStartValue: vm.animationStartValue,
          insertMode: vm.insertMode,
          thickness: vm.thickness
        })
        .on('circle-animation-progress', function (event, progress, stepValue) {
          renderCircleBody(this, stepValue)
          vm.$emit('vue-circle-progress', event, progress, stepValue * 100)
        })
        .on('circle-animation-end', function (event) {
          vm.$emit('vue-circle-end', event)
        })

      function renderCircleBody (self, value) {
        value = !value ? value : vm.progress
        if (!vm.showLegend) {
        } else if (vm.showLegend && vm.showPercent) {
          $(self).find('span.legend-text').html(Math.floor(value * 100 / vm.scale) + '%')
        } else if (vm.showLegend && !vm.showPercent) {
          $(self).find('span.legend-text').html((value * 100 / vm.scale).toFixed(vm.precision))
        }
      }
    },
    methods: {
      convertedProgress (progress) {
        return progress / this.scale
      },
      updateFill: function (fill) {
        let circle = $(this.$el).data('circle-progress')
        circle.fill = fill
        circle.initFill()
      }
    },
    watch: {
      progress: function (val) {
        $(this.$el).circleProgress('value', this.convertedProgress(val))
      }
    },
    beforeDestroy: function () {
      $(this.$el).remove()
    }
  }
</script>

<style scoped>
  .circle {
    position: relative;
    display: inline-block;
  }

  .circle-text-body {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
</style>
