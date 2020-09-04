<template>
  <div>
    <h1 v-text="title"></h1>

    <form @submit.prevent="createProduct">
      <div class="form-group">
        <input type="text"
               class="form-control"
               placeholder="Nome: "
               v-model="product.name">
        <div v-if="errorsValidation.name" class="has-error">
          <p v-for="(error, index) in errorsValidation.name" :key="index" v-text="error" class="text-danger"></p>
        </div>
      </div>
      <div class="form-group">
        <textarea type="text"
                  class="form-control"
                  placeholder="Descrição: "
                  v-model="product.description"></textarea>
      </div>
      <div class="form-group">
        <button class="btn btn-success">Cadastrar</button>
      </div>
    </form>

    <preloader-component :preloader="preloader"></preloader-component>

  </div>
</template>

<script>
import PreloaderComponent from "../general/PreloaderComponent";

export default {
  data () {
    return {
      title: 'Cadastrar Novo Produto',
      product: {
        name: '',
        description: ''
      },
      errorsValidation: '',
      preloader: false
    }
  },
  methods: {
    createProduct () {
      this.preloader = true;

      this.$http.post('http://127.0.0.1:8000/api/v1/products', this.product)
        .then(response => {
          this.$router.push('/products')
        }, error => {
          if (error.status === 422)
            this.errorsValidation = error.body.errors;

          console.log(error);
        })
        .finally(() => this.preloader = false);
    }
  },
  components: {
    PreloaderComponent
  }
}
</script>

<style scoped>

</style>
