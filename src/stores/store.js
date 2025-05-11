import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: JSON.parse(localStorage.getItem('cartItems') || '[]'),
    discount: JSON.parse(localStorage.getItem('cartDiscount') || '0'),
    discountCode: localStorage.getItem('cartCode') || ''
  }),

  getters: {
    subtotal: (state) =>
      state.items.reduce((total, item) => {
        const price = parseFloat(item.preco.replace('R$', ''))
        return total + price * item.quantity
      }, 0),

    totalPrice: (state) =>
      state.subtotal * (1 - state.discount)
  },

  actions: {
    save() {
      localStorage.setItem('cartItems', JSON.stringify(this.items))
      localStorage.setItem('cartDiscount', JSON.stringify(this.discount))
      localStorage.setItem('cartCode', this.discountCode)
    },

    addItem(item) {
      const existing = this.items.find(i => i.id === item.id)
      if (existing) {
        existing.quantity++
      } else {
        this.items.push({ ...item, quantity: 1 })
      }
      this.save()
    },

    removeItem(id) {
      this.items = this.items.filter(i => i.id !== id)
      this.save()
    },

    updateQuantity(id, qty) {
      const item = this.items.find(i => i.id === id)
      if (item) item.quantity = qty
      this.save()
    },

    applyCoupon(code) {
      if (code === 'Kennedy10') {
        this.discount = 0.1
        this.discountCode = code
      } else if (code === 'Eduardo20') {
        this.discount = 0.2
        this.discountCode = code
      }
      this.save()
    },

    removeCoupon() {
      this.discount = 0
      this.discountCode = ''
      this.save()
    }
  }
})