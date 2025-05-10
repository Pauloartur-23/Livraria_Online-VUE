<script setup>
import { useCartStore } from '../stores/store'
import { RouterLink } from 'vue-router'

const cartStore = useCartStore()

const formatPrice = (price) => {
  return `R$${parseFloat(price).toFixed(2)}`
}

const updateQuantity = (itemId, newQuantity) => {
  if (newQuantity > 0) {
    cartStore.updateQuantity(itemId, newQuantity)
  } else {
    cartStore.removeItem(itemId)
  }
}

const calculateSubtotal = (item) => {
  const price = parseFloat(item.preco.replace('R$', ''))
  return formatPrice(price * item.quantity)
}

const applyCoupon = () => {
  const couponInput = document.querySelector('.coupon-section input')
  const couponCode = couponInput.value.trim()
  
  if (couponCode === 'Kennedy10') {
    cartStore.applyCoupon(couponCode)
  } else if (couponCode === 'Eduardo20') {
    cartStore.applyCoupon(couponCode)
  }
}

const removeCoupon = () => {
  cartStore.removeCoupon()
  document.querySelector('.coupon-section input').value = ''
}
</script>

<template>
  <main id="carrinho">
    <section id="carrinho-code">
      <h1>Carrinho</h1>
      <div v-if="cartStore.items.length === 0" class="empty-cart">
        <p>Seu carrinho está vazio</p>
        <RouterLink to="/" class="back-button">Voltar para loja</RouterLink>
      </div>
      <template v-else>
        <div class="cart-header">
          <p>Título</p>
          <p>Quantidade</p>
          <p>Subtotal</p>
        </div>
        <ul class="cart-items">
          <li v-for="item in cartStore.items" :key="item.id">
            <div class="item-info">
              <img :src="item.img" :alt="item.titulo">
              <div class="item-details">
                <h2>{{ item.titulo }}</h2>
                <p>{{ item.autor }}</p>
                <p><span>{{ item.preco }}</span></p>
              </div>
            </div>
            <div class="quantity-controls">
              <div class="quantity-controls-buttons">
                <button @click="updateQuantity(item.id, item.quantity - 1)">-</button>
                <p>{{ item.quantity }}</p>
                <button @click="updateQuantity(item.id, item.quantity + 1)">+</button>
              </div>
            </div>
            <p class="subtotal">{{ calculateSubtotal(item) }}</p>
          </li>
        </ul>
        <RouterLink to="/" class="back-button">Voltar para loja</RouterLink>
        <div class="cart-footer">
          <div class="coupon-section">
            <input 
              type="text" 
              placeholder="Código do cupom"
              :disabled="cartStore.discount > 0"
            >
            <button 
              v-if="!cartStore.discount" 
              @click="applyCoupon" 
              class="coupon-button"
            >
              Inserir Cupom
            </button>
            <button 
              v-else 
              @click="removeCoupon" 
              class="remove-coupon-button"
            >
              Remover Cupom
            </button>
          </div>
          <div class="total-section">
            <h2>Total da Compra</h2>
            <ul>
              <li>
                <p>Produtos:</p>
                <p>{{ formatPrice(cartStore.subtotal) }}</p>
              </li>
              <li>
                <p>Frete:</p>
                <p>Grátis</p>
              </li>
              <li v-if="cartStore.discount > 0">
                <p>Desconto ({{ cartStore.discountCode }}):</p>
                <p>-{{ formatPrice(cartStore.subtotal * cartStore.discount) }}</p>
              </li>
              <li class="total">
                <p>Total:</p>
                <p>{{ formatPrice(cartStore.totalPrice) }}</p>
              </li>
            </ul>
            <button class="checkout-button">Ir para o pagamento</button>
          </div>
        </div>
      </template>
    </section>
  </main>
</template>

<style scoped>
main {
  padding: 5vw 15vw;
  margin: 0 auto;
  background-color: white;
}

main #carrinho-code .empty-cart {
  text-align: center;
  padding: 2rem;
}

main #carrinho-code .empty-cart p {
  color: #4F4C57;
  margin-bottom: 1rem;
}

main #carrinho-code h1 {
  color: #27ae60;
  font-size: 2.5rem;
  margin-bottom: 2rem;
  font-weight: bold;
}

main #carrinho-code .cart-header {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  padding: 1rem 0;
  border-bottom: 1px solid #27ae60;
  color: #333;
}

main #carrinho-code .cart-header p{
  font-size: 1.5rem;
  color: #382C2C;
  font-weight: bold;
}

main #carrinho-code .cart-items {
  list-style: none;
  padding: 0;
}

main #carrinho-code .cart-items li {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  align-items: center;
  padding: 2rem 0;
  border-bottom: 1px solid #27ae60;
}

main #carrinho-code .item-info {
  display: flex;
  gap: 1.5rem;
}

main #carrinho-code .item-info img {
  width: 100px;
  height: 150px;
  object-fit: cover;
}

main #carrinho-code .item-details h2 {
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #382C2C;
  font-weight: bold;
}

main #carrinho-code .item-details p {
  color: #4F4C57;
  margin: 0.25rem 0;
}

main #carrinho-code .item-details p span{
  font-weight: bold;
  color: #382C2C;
  font-size: 1.3rem;
}

main #carrinho-code .quantity-controls {
  display: flex;
  align-items: center;
  gap: 1rem;
}

main #carrinho-code .quantity-controls-buttons{
  display: flex;
  align-items: center;
  gap: 1rem;
  border: 1px solid #000000;
  border-radius: 4px;
}

main #carrinho-code .quantity-controls button {
  width: 40px;
  height: 60px;
  border: none;
  background: white;
  color: #000000;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  transition: all .3s ease;
}

main #carrinho-code .quantity-controls p {
  color: #000000;
  margin: 0;
  font-size: 1.1rem;
  min-width: 20px;
  text-align: center;
}

main #carrinho-code .subtotal {
  font-weight: bold;
  color: #382C2C;
  font-weight: bold;
  font-size: 1.3rem;
}

main #carrinho-code .back-button {
  display: inline-block;
  padding: 0.8rem 1.5rem;
  border: 1px solid #27ae60;
  color: #27ae60;
  text-decoration: none;
  margin: 2rem 0;
  border-radius: 4px;
  transition: all .3s ease;
}

main #carrinho-code .cart-footer {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-top: 2rem;
}

main #carrinho-code .coupon-section {
  display: flex;
  gap: 1rem;
}

main #carrinho-code .coupon-section input {
  flex: 1;
  padding: 0.8rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  width: 100%;
  height: 60px;
}

main #carrinho-code .coupon-section input:focus{
  outline: none;
}

main #carrinho-code .coupon-button {
  padding: 0.8rem 1.5rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s ease;
  height: 60px;
}

main #carrinho-code .remove-coupon-button {
  padding: 0.8rem 1.5rem;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all .3s ease;
  height: 60px;
}

main #carrinho-code .total-section {
  padding: 2rem;
  border-radius: 4px;
  border: 1px solid #000000;
}

main #carrinho-code .total-section h2 {
  margin-bottom: 1.5rem;
  color: #000000;
  font-weight: bold;
  font-size: 1.5rem;
}

main #carrinho-code .total-section ul {
  list-style: none;
  padding: 0;
}

main #carrinho-code .total-section li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 1vw;
  padding-top: 1vw;
  color: #000000;
  border-bottom: 1px solid #909090;
}

main #carrinho-code .total-section li.total {
  font-weight: bold;
  color: #000000;
  padding-top: 1rem;
  margin-top: 1rem;
  border-bottom: none;
}

main #carrinho-code .checkout-button {
  width: 100%;
  padding: 1rem;
  background: #27ae60;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 1.5rem;
  transition: all .3s ease;
}

main #carrinho-code .checkout-button:hover,
main #carrinho-code .coupon-button:hover {
  background: #1d8046;
}

main #carrinho-code .remove-coupon-button:hover {
  background: #c0392b;
}

main #carrinho-code .back-button:hover {
  background: #1d8046;
  color: white;
}

main #carrinho-code .quantity-controls button:hover {
  background: #1d8046;
  color: white;
}
</style> 