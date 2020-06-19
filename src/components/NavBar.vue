<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-light bg-light fixed-top">
      <button class="navbar-toggler" data-target="#navbar5" data-toggle="collapse" type="button">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="add-super-button">
        <CircleProgress
          :animation="{
             function(){
              return { duration: 10, easing: 'circleProgressEasing' };
            }
        }"
          :animation-start-value="0.0"
          :progress="uploadPercentage"
          :reverse="false"
          :scale="1000"
          :show-percent="true"
          :showPercent="true"
          :size="70"
          :start-angle="Math.PI / 2"
          :thickness="5"
          class="progress-circle"
          empty-fill="rgba(0, 0, 0, .1)"
          insert-mode="append"
          line-cap="round"
          ref="progress">
        </CircleProgress>
        <span>
        <button class="btn btn-info btn-circle btn-m add-button" v-if="!uploading" v-on:click="openFileUploads()">
          <font-awesome-icon icon="plus" size="2x"></font-awesome-icon>
        </button>
        </span>
      </div>
      <div class="navbar-collapse collapse" id="navbar5">
        <ul class="navbar-nav">
          <li :class="{ 'nav-item': true , active : (route.path === current)}" :key="route.name"
              v-for="route in routes">
            <a class="nav-link" v-bind:href="route.path">{{route.name}}</a>
          </li>
        </ul>
        <form :action="'/search/' + encodeURIComponent(query) " class="mx-2 my-auto d-inline w-100" method="get">
          <div class="input-group">
            <input class="form-control border border-right-0" placeholder="Search..." type="text" v-model="query">
            <span class="input-group-append">
                <button class="btn btn-outline-secondary border border-left-0" type="submit">
                  <font-awesome-icon icon="search" size="1x"></font-awesome-icon>
                </button>
              </span>
          </div>
        </form>
        <ul class="navbar-nav">
          <li class="nav-item dropdown">
            <a aria-expanded="false" aria-haspopup="true" class="nav-link" data-toggle="dropdown" href="#"
               id="navbarDropdownMenuLink">
              <font-awesome-icon icon="cog" size="1x"></font-awesome-icon>
            </a>
            <div aria-labelledby="navbarDropdownMenuLink" class="dropdown-menu dropdown-menu-right">
              <a class="dropdown-item" href="#">Looking for something?</a>
            </div>
          </li>
        </ul>
        <input ref="fileInput" style="display: none" type="file" v-on:change="handleFileUploads()"/>
      </div>
    </nav>
  </div>
</template>

<script>
  import { routes } from '../router/index'
  import ApiService from '../js/ApiService'
  import CircleProgress from './CircleProgress'

  export default {
    name: 'NavBar',
    components: { CircleProgress },
    data () {
      return {
        files: '',
        uploadPercentage: 0,
        uploading: false,
        query: '',
        routes: routes.filter(x => {
          return x.inNavBar
        })
      }
    },
    props: {
      current: String
    },
    methods: {
      openFileUploads () {
        this.$refs.fileInput.click()
      },
      handleFileUploads () {
        this.files = this.$refs.fileInput.files
        this.submitFiles()
      },
      submitFiles () {
        let formData = new FormData()
        let fileNames = []

        for (var i = 0; i < this.files.length; i++) {
          let file = this.files[i]
          fileNames.push(file.name)
          formData.append('file', file)
        }
        this.uploading = true
        ApiService.postContent(formData, function (progressEvent) {
          let prevVal = this.uploadPercentage
          let newVal = Math.round((progressEvent.loaded * 1000) / progressEvent.total)
          if (prevVal !== newVal) {
            this.uploadPercentage = newVal
          }
        }.bind(this)).then((res) => {
          console.log('res is')
          console.log(res.data)
          for (var i = 0; i < res.data.length; i++) {
            ApiService.addContent(fileNames[i], res.data[i].fileMetaTypeName, res.data[i].id).then((d) => console.log(d))
          }

          this.uploading = false
          this.uploadPercentage = 0
          this.$router.go()
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../assets/css/main";

  .navbar {
    padding: 0.1rem 1rem;
  }

  .add-super-button {
    position: relative;
    margin: 0 0 -40px 0;
  }

  .add-button {
    margin: 5px 0 0 -65px;
    position: absolute;
  }

  .progress-circle {
    padding: 0;
    background-color: $light;
    border-radius: 80px;
    font-size: 24px;
    line-height: 0;
  }

  .btn-circle.btn-m {
    width: 60px;
    height: 60px;
    padding: -20px 0  -20px -20px;
  }

  .add-plus {
    font-size: 50px;
  }
</style>
