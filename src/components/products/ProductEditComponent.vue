<template>
  <div>
    <h1 v-text="title"></h1>

    <form @submit.prevent="updateProduct">
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
        <button class="btn btn-success">Atualizar</button>
      </div>
    </form>

    <preloader-component :preloader="preloader"></preloader-component>

  </div>
</template>

<script>
import PreloaderComponent from "../general/PreloaderComponent";

export default {
  props: {
    id: {
      required: true,
      default: '',
    }
  },
  data() {
    return {
      title: 'Editar Produto',
      product: {
        name: '',
        description: ''
      },
      errorsValidation: '',
      preloader: false
    }
  },
  created() {
    this.getProduct();
  },
  methods: {
    getProduct() {
      this.preloader = true;

      this.$http.get(`http://127.0.0.1:8000/api/v1/products/${this.id}`)
        .then(response => {
          console.log(response.body);

          this.product = response.body;
        }, error => {
          if (error.status === 404) {
            alert('Produto não encontrado!')

            this.$router.push('/products')
          }
          console.log(error);
        })
        .finally(() => this.preloader = false);
    },
    updateProduct() {
      this.preloader = true;

      this.$http.put(`http://127.0.0.1:8000/api/v1/products/${this.id}`, this.product)
        .then(response => {
          this.$router.push('/products')
        }, error => {
          if (error.status === 422)
            this.errorsValidation = error.body.errors;

          console.log(error);
        })
        .finally(() => this.preloader = false);
    }
  }
  ,
  components: {
    PreloaderComponent
  }
}
</script>

<style scoped>

</style>
