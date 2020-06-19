<template>
  <FilterResult :request="'search/' + this.$route.params.query"/>
</template>

<script>
  import FilterResult from './FilterResult'

  export default {
    name: 'Serp',
    components: {
      FilterResult
    }
  }
</script>

<style scoped>

</style>
