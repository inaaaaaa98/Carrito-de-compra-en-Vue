// app.js

// Componente de Vue para representar un elemento de producto en la tienda
Vue.component('product-item', {
  props: ['product', 'currency'],
  data() {
    return {
      quantity: 1,
    };
  },
  template: `
    <div class="product-item">
      <div class="product-info">
        <!-- Añade el atributo loading aquí -->
        <img :src="product.image" alt="Imagen del NFT" class="product-image" loading="lazy">
        <div class="description">
          <h3>{{ product.name }}</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
      <p class="price">{{ product.price }} {{ currency }}</p>
      <input v-model="quantity" type="number" min="1" />
      <button @click="addToCart">Añadir al carrito</button>
    </div>
  `,
  methods: {
    // Método para agregar el producto actual al carrito
    addToCart() {
      this.$emit('add-to-cart', this.product, this.quantity);
    },
  },
});

// Componente de Vue para representar el modal del carrito de compras
Vue.component('cart-modal', {
  props: ['cart', 'currency'],
  template: `
    <div class="cart-modal">
      <div class="modal-content">
        <span class="close" @click="$emit('close-modal')">&times;</span>
        <h2>Carrito de Compras</h2>
        <div v-if="cart.length === 0">Carrito vacío</div>
        <div v-else>
          <!-- Itera sobre los elementos del carrito y muestra la información -->
          <div v-for="item in cart" :key="item.product.id" class="cart-item">
            <img :src="item.product.image" alt="Product Image" loading="lazy">
            <div>
              <p>{{ item.product.name }}</p>
              <p class="price">{{ item.product.price }} {{ currency }}</p>
              <p>Unidades: {{ item.quantity }}</p>
              <p>Subtotal: {{ item.subtotal }} {{ currency }}</p>
            </div>
          </div>
          <p class="total">Total: {{ total }} {{ currency }}</p>
        </div>
      </div>
    </div>
  `,
  computed: {
    // Calcula el total del carrito sumando los subtotales de cada elemento
    total() {
      return this.cart.reduce((acc, item) => acc + item.subtotal, 0);
    },
  },
});

// Instancia principal de Vue que representa la aplicación
new Vue({
  el: '#app',
  data() {
    // Datos iniciales de la aplicación
    return {
      products: [
        // Lista de productos con sus detalles
        { id: 1, name: "NFT Real Madrid 2021", image: "img/carletto.jpg", description: "Edición limitada del Real Madrid", price: 50 },
        { id: 2, name: "NFT Real Madrid Legends", image: "img/gorraygafas.jpg", description: "Colección de leyendas del Real Madrid", price: 75 },
        { id: 3, name: "NFT Real Madrid Moments", image: "img/coronay gafas.jpg", description: "Momentos épicos en la historia del Real Madrid", price: 60 },
        // Agrega más NFTs según sea necesario
      ],
      cart: [], // Lista para almacenar los elementos del carrito de compras
      showCart: false, // Variable para controlar la visibilidad del modal del carrito
      currency: "EUR", // Moneda utilizada para mostrar los precios
    };
  },
  methods: {
    // Método para agregar un producto al carrito
    addToCart(product, quantity) {
      const existingItem = this.cart.find((item) => item.product.id === product.id);

      if (existingItem) {
        // Si el producto ya está en el carrito, aumenta la cantidad
        existingItem.quantity += quantity;
      } else {
        // Si el producto no está en el carrito, añádelo
        this.cart.push({
          product,
          quantity,
          subtotal: product.price * quantity,
        });
      }
    },
    // Método para mostrar/ocultar el modal del carrito
    toggleCart() {
      this.showCart = !this.showCart;
    },
  },
});
