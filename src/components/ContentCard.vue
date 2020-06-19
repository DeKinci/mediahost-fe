<template>
  <a :href="'/viewer/' + content.id" class="card div" style="display: inline-block">
    <img :src="content.fileUrl" alt="Card image" class="card-img-top"
         v-if="['jpg', 'png'].includes(content.contentType.type)">
    <img :src="content.fileUrl" alt="Card image" class="card-img-top"
         v-else-if="['gif'].includes(content.contentType.type)">
    <video :ref="content.id" class="card-img-top video-fluid z-depth-1" loop muted
           v-else-if="['mp4', 'webm'].includes(content.contentType.type)">
      <source :src="content.fileUrl" type="video/mp4"/>
    </video>
    <div class="card-body">
      <h4 class="card-title">{{ content.name }}</h4>
      <TagPane :tags="content.tagList"/>
    </div>
  </a>
</template>

<script>
  import TagPane from './TagPane'

  export default {
    name: 'ContentCard',
    props: {
      content: Object
    },
    components: {
      TagPane
    },
    mounted () {
      if (['mp4', 'webm'].includes(this.content.contentType.type)) {
        const vidElem = this.$refs[this.content.id]
        vidElem.onloadedmetadata = function () {
          vidElem.playbackRate = 10.0

          const startTime = Math.floor(Math.max(0, this.duration * 0.5 - 20))
          const endTime = Math.ceil(Math.min(this.duration * 0.5 + 20, this.duration))
          this.currentTime = startTime

          vidElem.onmouseover = function () {
            vidElem.currentTime = startTime
            vidElem.play()
          }
          vidElem.addEventListener('mouseover', function () {
            vidElem.currentTime = startTime
            vidElem.play()
          })

          vidElem.addEventListener('mouseout', function () {
            vidElem.currentTime = startTime
            vidElem.pause()
          })

          vidElem.addEventListener('timeupdate', function () {
            if (vidElem.currentTime >= endTime) {
              vidElem.currentTime = startTime
            }
          })

          vidElem.addEventListener('pause', function () {
            if (vidElem.currentTime >= endTime) {
              vidElem.currentTime = startTime
              vidElem.play()
            }
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>
