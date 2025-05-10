import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
    discount: 0,
    discountCode: ''
  }),

  getters: {
    subtotal: (state) => {
      let total = 0
      for (const item of state.items) {
        const price = parseFloat(item.preco.replace('R$', ''))
        total += price * item.quantity
      }
      return total
    },

    totalPrice: (state) => {
      const subtotal = state.subtotal
      if (state.discount > 0) {
        return subtotal * (1 - state.discount)
      } else {
        return subtotal
      }
    },
  },

  actions: {
    addItem(item) {
      const existingItem = this.items.find(i => i.id === item.id)
      if (existingItem) {
        existingItem.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
    },

    removeItem(itemId) {
      this.items = this.items.filter(item => item.id !== itemId)
    },

    updateQuantity(itemId, newQuantity) {
      const item = this.items.find(i => i.id === itemId)
      if (item) {
        item.quantity = newQuantity
      }
    },
    
    applyCoupon(code) {
      if (code === 'Kennedy10') {
        this.discount = 0.1
        this.discountCode = code
      } else if (code === 'Eduardo20') {
        this.discount = 0.2
        this.discountCode = code
      }
    },

    removeCoupon() {
      this.discount = 0
      this.discountCode = ''
    }
  }
}) 