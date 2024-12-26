<template>
  <div>
    <h2 class="text-lg font-bold mb-4">Список категорий</h2>
    <el-table :data="categories" border>
      <el-table-column prop="id" label="ID" width="60" />
      <el-table-column prop="name" label="Название" />
      <el-table-column prop="description" label="Описание" />
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
            @click="deleteCategory(row.id)"
          >
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
<!--    <el-button type="success" @click="createCategory">Добавить категорию</el-button>-->
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
        <el-form-item label="Описание">
          <el-input v-model="currentItem.description" />
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
import axios from 'axios';
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
  currentItem.value = {};
};

// Сохранить изменения
const saveChanges = async () => {
  // Здесь выполняется логика для обновления элемента
  // Например, отправка данных на сервер
  console.log('Saving item:', currentItem.value);
  await editCategory(currentItem.value);
  closeEditModal();
};
const categories = ref([]);

const fetchCategories = async () => {
  categories.value = await aFetch('categories');
};

const createCategory = async () => {
  // Добавить модалку для создания
};

const editCategory = async (category) => {
  await aFetchPost(`categories/${category.id}`, category);
  await fetchCategories();
};

const deleteCategory = async (categoryId) => {
  await axios.delete(`/api/categories/${categoryId}`);
  await fetchCategories();
};

onMounted(() => {
  fetchCategories();
});
</script>
