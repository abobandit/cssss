<template>
  <div>
<!--    <el-button type="primary" @click="openAddModal">Добавить пользователя</el-button>-->
    <el-table :data="users" style="width: 100%">
      <el-table-column prop="name" label="Имя" />
      <el-table-column prop="email" label="Email" />
      <el-table-column label="Действия">
        <template #default="{ row }">
          <el-button
            type="primary"
            size="small"
            @click="openEditModal(row)"
          >
            Редактировать
          </el-button>
        </template>
      </el-table-column>

    </el-table>

    <!-- Модалка для добавления и редактирования пользователя -->
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
          <el-input v-model="currentItem.email" />
        </el-form-item>
        <el-form-item label="Пароль">
          <el-input v-model="currentItem.password" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="closeModal">Отмена</el-button>
        <el-button type="primary" @click="saveUser">Сохранить</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import {onMounted, ref} from "vue";
import {aFetch, aFetchDelete, aFetchPost, aFetchPut} from "@/axiosConfig.js";

const users = ref([]);
const isEditModalVisible = ref(false); // Отвечает за видимость модалки

const currentItem = ref(null); // Хранит данные текущего редактируемого элемента

// Получить список пользователей
const fetchUsers = async ()=> {
  try {
    return await aFetch('users');
  } catch (error) {
    console.error('Ошибка при получении пользователей:', error);
  }
}

// Создать нового пользователя
const createUser = async (userData)=> {
  try {
    return await aFetchPost('users', userData);
  } catch (error) {
    console.error('Ошибка при создании пользователя:', error);
  }
}

// Обновить пользователя
const updateUser = async (userId, userData)=> {
  try {
    return await aFetchPut(`users/${userId}`, userData);
  } catch (error) {
    console.error('Ошибка при обновлении пользователя:', error);
  }
}

// Удалить пользователя
const removeUser = async (userId)=> {
  try {
    await aFetchDelete(`users/${userId}`);
  } catch (error) {
    console.error('Ошибка при удалении пользователя:', error);
  }
}

const deleteUser = (id) => {
  users.value = users.value.filter((user) => user.id !== id);
};

const openEditModal = (user) => {
  currentItem.value = { ...user }; // Заполнить форму данными пользователя
  isEditModalVisible.value = true;
};

const closeModal = () => {
  currentItem.value = {  }; // Заполнить форму данными пользователя
  isEditModalVisible.value = false;
};

const saveUser = async () => {
  if (currentItem.value.id) {
    await updateUser(currentItem.value.id, currentItem.value); // Обновить пользователя
  } else {
    await createUser(currentItem.value); // Создать нового пользователя
  }
  await fetchUsers(); // Перезагрузить список пользователей
  closeModal();
};

const handleDelete = async (userId) => {
  await deleteUser(userId); // Удалить пользователя
  await fetchUsers(); // Перезагрузить список пользователей
};

onMounted(async ()=>{
  users.value = await fetchUsers()
}); // Загрузить список пользователей при монтировании компонента
</script>
