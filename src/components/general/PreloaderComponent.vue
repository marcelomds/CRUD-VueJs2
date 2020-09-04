<template>
  <div class="text-center" v-if="preloader">
    <img src="../../assets/preloader.gif" alt="Preloader" class="preloader">
  </div>
</template>

<script>
export default {
  props: {
    preloader: {
      type: Boolean,
      required: true,
      default: false
    }
  }
}
</script>

<style scoped>

</style>
