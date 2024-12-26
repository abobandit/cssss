<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Список товаров</h2>
    <el-table :data="products" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Название" />
      <el-table-column prop="price" label="Цена" />
      <el-table-column prop="quantity" label="Количество" />
      <el-table-column label="Действия">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openEditModal(row)"
          >
            Редактировать
          </el-button>
          <el-button
            type="danger"
            size="small"
            @click="deleteProduct(row.id)"
          >
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-button type="success" @click="createProduct">Добавить товар</el-button>-->
    <el-dialog
      v-model="isEditModalVisible"
      title="Редактировать элемент"
      :close-on-click-modal="false"
      width="500px"
    >
      <el-form :model="currentItem" label-width="120px">
        <!-- Пример полей -->
        <el-form-item label="Название">
          <el-input v-model="currentItem.name" />
        </el-form-item>
        <el-form-item label="Цена" v-if="currentItem.price !== undefined">
          <el-input v-model="currentItem.price" />
        </el-form-item>
        <el-form-item label="Статус" v-if="currentItem.status !== undefined">
          <el-select v-model="currentItem.status">
            <el-option label="Pending" value="pending" />
            <el-option label="Completed" value="completed" />
            <el-option label="Canceled" value="canceled" />
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeEditModal">Отмена</el-button>
        <el-button type="primary" @click="saveChanges">Сохранить</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {aFetch, aFetchDelete, aFetchPost} from "@/axiosConfig.js";

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
  currentItem.value = {};
};

// Сохранить изменения
const saveChanges = async () => {
  // Здесь выполняется логика для обновления элемента
  // Например, отправка данных на сервер
  console.log('Saving item:', currentItem.value);
  await editProduct( currentItem.value);
  closeEditModal();
};
const products = ref([]);

const fetchProducts = async () => {
  products.value = await aFetch('products');
};

const createProduct = async () => {
  // Добавить модалку для создания
};

const editProduct = async (product) => {
  await aFetchPost(`products/${product.id}`, product);
  await fetchProducts();
};

const deleteProduct = async (productId) => {
  await aFetchDelete(`products/${productId}`);
  await fetchProducts();
};

onMounted(async () => {
  await fetchProducts();
});
</script>
