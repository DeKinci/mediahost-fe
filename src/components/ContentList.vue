<template>
  <div>
    <div class="card-columns" v-if="!isEmpty">
      <ContentCard :content="content" v-bind:key="content.id" v-for="content in contentPieces"/>
    </div>
    <div v-else-if="isEmpty">
      <h1>Nobody here but us, chickens</h1>
    </div>
  </div>
</template>

<script>
  import ContentCard from './ContentCard'

  export default {
    name: 'ContentList',
    components: {
      ContentCard
    },
    data () {
      return {
        isEmpty: false
      }
    },
    props: {
      contentPieces: Array
    },
    mounted () {
      if (this.contentPieces.length) {
        this.isEmpty = true
      }
    }
  }
</script>

<style scoped>
  @media (min-width: 576px) {
    .card-columns {
      column-count: 2;
      max-width: 550px;
    }
  }

  @media (min-width: 768px) {
    .card-columns {
      column-count: 3;
      max-width: 760px;
    }
  }

  @media (min-width: 992px) {
    .card-columns {
      column-count: 4;
      max-width: 950px;
    }
  }

  @media (min-width: 1200px) {
    .card-columns {
      column-count: 5;
      max-width: 1150px;
    }
  }

  @media (min-width: 1400px) {
    .card-columns {
      column-count: 6;
      max-width: 1350px;
    }
  }
</style>
