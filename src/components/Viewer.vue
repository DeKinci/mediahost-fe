<template>
  <div>
    <div>
      <div class="embed-responsive embed-responsive-16by9" v-if="['mp4', 'webm'].includes(content.contentType.type)">
        <iframe :src="content.fileUrl" allowfullscreen
                class="embed-responsive-item"></iframe>
      </div>
      <div style="width:80%; height:0; padding-bottom:30%"
           v-else-if="['jpg', 'png'].includes(content.contentType.type)">
        <img :alt="content.name" :src="content.fileUrl" class="img-fluid"/>
      </div>
      <div style="width:80%; height:0; padding-bottom:30%" v-else-if="['gif'].includes(content.contentType.type)">
        <img :alt="content.name" :src="content.fileUrl" class="img-fluid"/>
      </div>
      <div v-else-if="loaded">
        <h1>{{content.contentType.type}} content type is not supported</h1>
      </div>
    </div>
  </div>
</template>

<script>
  import ApiService from '../js/ApiService'

  export default {
    name: 'Viewer',
    data () {
      return {
        loaded: false,
        content: Object,
        isEmpty: false
      }
    },
    methods: {
      getContent () {
        ApiService.getContent(this.$route.params.id).then((data) => {
          this.content = data.data
          this.loaded = true
        })
      }
    },
    mounted () {
      this.getContent()
    }
  }
</script>

<style scoped>

</style>
