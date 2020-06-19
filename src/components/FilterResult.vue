<template>
  <ContentList :contentPieces="contentPieces"/>
</template>

<script>
  import ApiService from '../js/ApiService'
  import ContentList from './ContentList'

  export default {
    name: 'FilterResult',
    components: {
      ContentList
    },
    props: {
      request: String
    },
    data () {
      return {
        contentPieces: [],
        currentPage: 0,
        isAll: false
      }
    },
    methods: {
      addContent () {
        console.log('add content is called')
        if (!this.isAll) {
          ApiService.getContentRequest(this.request, this.currentPage, 20).then(function (data) {
            console.log(this.currentPage)
            console.log(data.data)
            data.data.content.map(function (value) {
              this.contentPieces.push(value)
            }.bind(this))

            this.currentPage++
            this.isAll = data.data.last
          }.bind(this))
        }
      },

      checkScrolled () {
        let bottomOfWindow = Math.ceil(document.documentElement.scrollTop + window.innerHeight) >= document.documentElement.offsetHeight
        if (bottomOfWindow && !this.isAll) {
          this.addContent()
        }
      }
    },
    beforeMount () {
      // this.addContent()
    },
    mounted () {
      this.checkScrolled()
      window.onscroll = () => {
        this.checkScrolled()
      }
    }
  }
</script>

<style scoped>

</style>
