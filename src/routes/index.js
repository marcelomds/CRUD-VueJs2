import HomeComponent from "../components/home/HomeComponent";
import ProductComponent from "../components/products/ProductComponent";
import ProductCreateComponent from "../components/products/ProductCreateComponent";
import ProductEditComponent from "../components/products/ProductEditComponent";

export default [
  { path: '/', component: HomeComponent },
  { path: '/products', component: ProductComponent },
  { path: '/product/create', component: ProductCreateComponent },
  { path: '/product/:id/edit', component: ProductEditComponent, name: 'product.edit', props: true },
]
