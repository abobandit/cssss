<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Список заказов</h2>
    <el-table :data="orders" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="customer_name" label="Имя клиента" />
      <el-table-column prop="customer_email" label="Email" />
      <el-table-column prop="status" label="Статус" />
      <el-table-column prop="total_price" label="Сумма" />
      <el-table-column label="Товары">
        <template #default="{ row }">
          <div v-for="item in row.products" :key="item.id">
            {{ item.name }} (x{{ item.quantity }})
          </div>
        </template>
      </el-table-column>
      <el-table-column label="Действия">
        <template #default="{ row }">
          <div class="grid grid-cols-1 items-start content-start align-top gap-4">
            <el-button
              type="danger"
              class="w-36"
              @click="cancelOrder(row.id)"
            >
              Отменить заказ
            </el-button>
            <el-button
              style="margin-left: 0"
              type="danger"
              class="w-36"
              @click="acceptOrder(row.id)"
            >
              Принять заказ
            </el-button>
          </div>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {aFetch, aFetchPost} from "@/axiosConfig.js";

const isEditModalVisible = ref(false); // Отвечает за видимость модалки
const currentItem = ref(null); // Хранит данные текущего редактируемого элемента

// Открыть модалку для редактирования
const openEditModal = (item) => {
  currentItem.value = { ...item }; // Копируем данные редактируемого элемента
  isEditModalVisible.value = true;
};

// Закрыть модалку
const closeEditModal = () => {
  isEditModalVisible.value = false;
  currentItem.value = null;
};

// Сохранить изменения
const saveChanges = async () => {
  // Здесь выполняется логика для обновления элемента
  // Например, отправка данных на сервер
  console.log('Saving item:', currentItem.value);
  closeEditModal();
};
const orders = ref([]);

const fetchOrders = async () => {
   // Использовать реальный API
  orders.value = await aFetch('orders');
};

const cancelOrder = async (orderId) => {
  await aFetchPost(`orders/${orderId}/status`, {});
  await fetchOrders(); // Перезагрузить список
};

const acceptOrder = async (orderId) => {
  await aFetchPost(`orders/${orderId}/status/accept`, {});
  await fetchOrders(); // Перезагрузить список
};

onMounted(() => {
  fetchOrders();
});
</script>
