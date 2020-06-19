<template>
  <div class="card-group">
    <div :key="tag.name" class="card" v-for="tag in tags">
      <div class="card-body">{{tag.tagSpace.name}}: {{tag.name}}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TagPane',
    props: {
      tags: Array
    }
  }
</script>

<style scoped>

</style>
