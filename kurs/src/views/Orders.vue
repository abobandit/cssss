<template>
  <div class="container mx-auto my-8">
    <h1 class="text-3xl font-semibold mb-6">Заказы</h1>

    <el-table
      v-loading="loading"
      :data="orders"
      style="width: 100%"
      border
      stripe
    >
      <el-table-column prop="id" label="ID заказа" width="100" />
      <el-table-column prop="customer_name" label="Имя клиента" />
      <el-table-column prop="customer_email" label="Email" />
      <el-table-column prop="status" label="Статус" />
      <el-table-column prop="total_price" label="Сумма" />
      <el-table-column label="Товары">
        <template #default="scope">
          <ul>
            <li
              v-for="item in scope.row.products"
              :key="item.id"
              class="text-sm"
            >
              {{ item.name }} (x{{ item.quantity }}) - {{ item.price }} ₽
            </li>
          </ul>
        </template>
      </el-table-column>
      <el-table-column label="Действия" width="120">
        <template #default="scope">
          <el-button
            v-if="scope.row.status !== 'canceled'"
            type="danger"
            size="small"
            @click="cancelOrder(scope.row.id)"
          >
            Отменить
          </el-button>
          <span v-else class="text-gray-500 text-sm">Отменен</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {aFetch, aFetchDelete} from "@/axiosConfig.js";

const orders = ref([]);
const loading = ref(false);
const user = localStorage.getItem('user')
const fetchOrders = async () => {
  loading.value = true;
  try {
    if (!user){
      const response = await aFetch('customer/' + localStorage.getItem('customer'));
      localStorage.setItem('customerItem', JSON.stringify(response))
      console.log( JSON.stringify(response))
      orders.value = await aFetch('orders/' + response.email);
    }else {
      orders.value = await aFetch('orders/' + (JSON.parse(user)).email);
    }
  } catch (error) {
    console.error('Ошибка при загрузке заказов:', error);
  } finally {
    loading.value = false;
  }
};
const cancelOrder = async (orderId) => {
  try {
    const response = await aFetchDelete(`orders/${orderId}/cancel`);
    if (response.status >= 400){
      console.error('Ошибка при отмене заказа:', error);
      return
    }
    console.log(response)
    await fetchOrders(); // Обновить список заказов
  } catch (error) {
    console.error('Ошибка при отмене заказа:', error);
    alert(error.response?.data?.message || 'Не удалось отменить заказ');
  }
};
onMounted(() => {
  fetchOrders();
});
</script>

<style scoped>
.container {
  padding: 0 2rem;
}
</style>
