<script setup>

import {ArrowLeft} from "@element-plus/icons-vue";
import {ElPageHeader} from "element-plus";
import CartItems from "@/components/CartItems.vue";
import {ref} from "vue";
import {aFetchPost} from "@/axiosConfig.js";
const user = ref(localStorage.getItem('user'))
const logout = async () =>{
  try {
    const response = await aFetchPost('logout')
    localStorage.removeItem('token'); // Удаляем токен с клиента
    localStorage.removeItem('user'); // Удаляем токен с клиента
    localStorage.removeItem('role'); // Удаляем токен с клиента
    user.value = false
    alert('Вы успешно вышли из аккаунта');
  }catch (e) {
    console.error('Ошибка при выходе:', error.response?.data?.message || error.message);
    alert('Ошибка при выходе из аккаунта');
  }
}
// Функция для закрытия страницы корзины

</script>

<template>
  <el-page-header  :icon="ArrowLeft">
    <template #content>
      <div class="w-max flex p-6 align-mid justify-between items-center">
        <div>
          <RouterLink to="/"><span class="text-large font-600 mr-3"> Все товары</span></RouterLink>
          <RouterLink to="/categories"><span class="text-large font-600 mr-3"> Категории </span></RouterLink>
          <RouterLink to="/orders"><span class="text-large  font-600 mr-3"> Заказы</span></RouterLink>
          <button v-if="user ?? JSON.parse(user)" @click="logout"><span class="text-large  text-red-400 font-600 mr-3"> Выйти с аккаунта  </span></button >
          <RouterLink v-else to="/login"><span class="text-large  font-600 mr-3"> Войти</span></RouterLink>
        </div>

        <CartItems class="self-end"/>
      </div>

    </template>
  </el-page-header>
</template>

<style scoped>

</style>
