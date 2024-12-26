<script setup>
import {ref} from "vue";

const customer = ref({
  name:null,
  email:null,
  phone:null,
  address:null
})
const createOrder  = async () =>{
  try {
    const orderData = {
      name: customer.value.name,
      email: customer.value.email,
      phone: customer.value.phone,
      address: customer.value.address,
      cart: this.cartItems.map(item => ({
        product_id: item.product.id,
        quantity: item.quantity,
        price: item.product.price
      }))
    };

    const response = await axios.post('/order', orderData);
    this.$message.success(response.data.message);
  } catch (error) {
    this.$message.error('Ошибка при создании заказа');
  }
},

async getOrders(customerId) {
  try {
    const response = await axios.get(`/orders/${customerId}`);
    this.orders = response.data;
  } catch (error) {
    this.$message.error('Ошибка при получении заказов');
  }
}
</script>

<template>

</template>

<style scoped>

</style>
