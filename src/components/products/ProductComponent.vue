<template>
  <div>
    <h2 class="text-center">{{ title }}</h2>
    <hr>

    <div class="d-flex justify-content-between">
      <router-link to="product/create" class="btn btn-info">Cadastrar Produto</router-link>
      <ProductSearchComponent @search="searchProduct"></ProductSearchComponent>
    </div>
    <div class="text-right mt-4">
      <p>Total de Ítens: <span class="badge badge-success">{{ products.total }}</span></p>
    </div>

    <div class="alert alert-danger text-center mt-2" v-if="confirmDelete == true">
      <h2>Deseja realmente deletar?</h2>
      <hr>
      <button class="btn btn-secondary btn-sm" @click.prevent="cancelDeleteProduct">Cancelar</button>
      <button class="btn btn-success btn-sm" @click.prevent="deleteProduct">Confirmar</button>
    </div>

    <table class="table table-striped">
      <thead class="table-dark">
        <tr>
          <th>#id</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th width="200">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(product, index) in products.data" :key="index">
          <td>{{ product.id }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.description }}</td>
          <td>
            <router-link :to="{ name: 'product.edit', params: { id: product.id }}"
              class="btn btn-warning btn-sm">Editar</router-link>
            <a href="#" @click.prevent="confirmDeleteProduct(product.id)" class="btn btn-danger btn-sm">Excluir</a>
          </td>
        </tr>
      </tbody>
    </table>

    <preloader-component :preloader="preloader"></preloader-component>

    <ul class="pagination">
      <li v-if="products.current_page - 1 >= 1">
        <a href="#" @click.prevent="pagination(products.current_page - 1)" class="badge badge-primary"> Voltar </a>
      </li>
      <li v-if="products.current_page + 1 <= products.last_page">
        <a href="#" @click.prevent="pagination(products.current_page + 1)" class="badge badge-primary ml-2"> Próxima Página </a>
      </li>
    </ul>

  </div>
</template>

<script>
import PreloaderComponent from "../general/PreloaderComponent";
import ProductSearchComponent from "./ProductSearchComponent";

  export default {
    data () {
      return {
        title: 'Lista de Produtos',
        products: {
          current_page: 1,
          last_page: 1,
          total: 0,
          per_page: 10,
          from: 0,
          to: 0,
          data: []
        },
        preloader: false,
        confirmDelete: false,
        idProductDelete: 0,
        filter: ''
      }
    },
    created() {
      this.getProducts();
    },
    methods: {
      getProducts () {
        this.preloader = true;

        this.$http.get(`http://127.0.0.1:8000/api/v1/products?page=${this.products.current_page}&filter=${this.filter}`)
          .then(response => {
            console.log(response.body)
            this.products = response.body;
          }, error => {
            console.log(error);
          })
          .finally(() => this.preloader = false);
      },
      confirmDeleteProduct (id) {
        this.confirmDelete = true;

        this.idProductDelete = id;
      },
      deleteProduct (id) {
        this.preloader = true;

        this.$http.delete(`http://127.0.0.1:8000/api/v1/products/${this.idProductDelete}`)
          .then(response => {
            this.confirmDelete = false;
            this.idProductDelete = 0;

            this.getProducts();
          }, error => {
            console.log(error);
          })
          .finally(() => this.preloader = false);
      },
      cancelDeleteProduct () {
        this.confirmDelete = false;
        this.idProductDelete = 0;
      },
      searchProduct (filter) {
        this.filter = filter;

        this.getProducts();
      }
    },
    components: {
      PreloaderComponent,
      ProductSearchComponent
    }
  }
</script>

<style scoped>

</style>
