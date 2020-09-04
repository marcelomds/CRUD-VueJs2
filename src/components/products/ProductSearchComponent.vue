<template>
  <div>
    <form class="form form-inline ml-2" @submit.prevent="search">
      <input type="text" class="form-control" placeholder="Procurar: " v-model="filter">
      <button class="btn btn-success ml-1">Buscar</button>
    </form>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        filter: '',
      }
    },
    methods: {
      search () {
        this.$emit('search', this.filter);
      }
    }
  }
</script>

<style scoped>

</style>
